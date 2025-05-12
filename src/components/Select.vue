<template>
  <div
    :class="wrapperClass"
    @click="toggleDropdown"
    tabindex="0"
    @blur="closeDropdown"
  >
    <div class="my-select__tags" v-if="multiple && selectedOptions.length">
      <span
        class="my-select__tag"
        v-for="opt in selectedOptions"
        :key="opt.value"
      >
        {{ opt.label }}
        <span class="my-select__tag-close" @click.stop="removeTag(opt.value)"
          >&times;</span
        >
      </span>
    </div>
    <span
      v-else-if="!multiple && selectedOptions.length"
      class="my-select__selected"
      >{{ selectedOptions[0].label }}</span
    >
    <span v-else class="my-select__placeholder">{{ placeholder }}</span>
    <my-icon
      v-if="clearable && selectedOptions.length"
      name="deletePlain"
      size="14"
      class="my-select__clear"
      @click.stop="clearSelect"
    />
    <my-icon
      :name="dropdownOpen ? 'arrow-right' : 'arrow-right'"
      :style="{ transform: dropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }"
      size="16"
      class="my-select__arrow"
    />
    <div v-if="dropdownOpen" class="my-select-dropdown">
      <div v-if="remote || searchable" class="my-select__search">
        <input
          v-model="searchQuery"
          :placeholder="searchPlaceholder"
          class="my-select__search-input"
          @click.stop
        />
      </div>
      <template v-for="(group, gidx) in groupedOptions">
        <div
          v-if="group.label"
          class="my-select__group-label"
          :key="'g' + gidx"
        >
          {{ group.label }}
        </div>
        <div
          v-for="opt in group.options"
          :key="opt.value"
          :class="[
            'my-select__option',
            {
              'is-selected': isSelected(opt.value),
              'is-disabled': opt.disabled,
            },
          ]"
          @click.stop="selectOption(opt)"
        >
          <span>{{ opt.label }}</span>
          <my-icon
            v-if="multiple && isSelected(opt.value)"
            name="check"
            size="14"
            style="margin-left: 4px"
          />
        </div>
      </template>
      <div v-if="!groupedOptions.length" class="my-select__empty">
        {{ emptyText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import MyIcon from "./Icon.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  remoteMethod: {
    type: Function,
    default: null,
  },
  searchPlaceholder: {
    type: String,
    default: "搜索...",
  },
  groupBy: {
    type: String,
    default: "",
  },
  emptyText: {
    type: String,
    default: "无数据",
  },
  searchable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change", "search"]);

const dropdownOpen = ref(false);
const searchQuery = ref("");
const internalValue = ref(
  props.multiple ? [].concat(props.modelValue) : props.modelValue
);

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = props.multiple ? [].concat(val) : val;
  }
);

watch(searchQuery, (val) => {
  if (props.remote && props.remoteMethod) {
    props.remoteMethod(val);
    emit("search", val);
  }
});

function toggleDropdown() {
  if (props.disabled) return;
  dropdownOpen.value = !dropdownOpen.value;
}
function closeDropdown() {
  dropdownOpen.value = false;
}
function selectOption(opt) {
  if (opt.disabled) return;
  if (props.multiple) {
    let arr = Array.isArray(internalValue.value)
      ? [...internalValue.value]
      : [];
    const idx = arr.indexOf(opt.value);
    if (idx > -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(opt.value);
    }
    internalValue.value = arr;
    emit("update:modelValue", arr);
    emit("change", arr);
  } else {
    internalValue.value = opt.value;
    emit("update:modelValue", opt.value);
    emit("change", opt.value);
    dropdownOpen.value = false;
  }
}
function isSelected(val) {
  if (props.multiple) {
    return (
      Array.isArray(internalValue.value) && internalValue.value.includes(val)
    );
  }
  return internalValue.value === val;
}
function removeTag(val) {
  if (!props.multiple) return;
  let arr = Array.isArray(internalValue.value) ? [...internalValue.value] : [];
  const idx = arr.indexOf(val);
  if (idx > -1) arr.splice(idx, 1);
  internalValue.value = arr;
  emit("update:modelValue", arr);
  emit("change", arr);
}
function clearSelect() {
  internalValue.value = props.multiple ? [] : "";
  emit("update:modelValue", internalValue.value);
  emit("change", internalValue.value);
}

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.options
      .flatMap((opt) => (opt.options ? opt.options : [opt]))
      .filter(
        (opt) =>
          Array.isArray(internalValue.value) &&
          internalValue.value.includes(opt.value)
      );
  } else {
    return props.options
      .flatMap((opt) => (opt.options ? opt.options : [opt]))
      .filter((opt) => internalValue.value === opt.value);
  }
});

const wrapperClass = computed(() => [
  "my-select-wrapper",
  {
    "is-disabled": props.disabled,
    "is-multiple": props.multiple,
    "is-open": dropdownOpen.value,
  },
]);

const groupedOptions = computed(() => {
  let opts = props.options;
  if (props.remote && searchQuery.value && props.remoteMethod) {
    // 远程搜索时，options由父组件控制
    opts = props.options;
  } else if (searchQuery.value) {
    // 本地搜索
    opts = opts.filter((opt) => {
      if (opt.options) {
        // 分组
        return opt.options.some((o) => o.label.includes(searchQuery.value));
      }
      return opt.label.includes(searchQuery.value);
    });
  }
  if (props.groupBy) {
    // 分组
    const groups = {};
    opts.forEach((opt) => {
      const group = opt[props.groupBy] || "";
      if (!groups[group]) groups[group] = [];
      groups[group].push(opt);
    });
    return Object.keys(groups).map((label) => ({
      label,
      options: groups[label],
    }));
  } else if (opts.some((opt) => opt.options)) {
    // 已经是分组结构
    return opts;
  } else {
    return [{ label: "", options: opts }];
  }
});
</script>

<style scoped>
.my-select-wrapper {
  display: inline-block;
  min-width: 180px;
  position: relative;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  background: var(--background-white);
  padding: 6px 32px 6px 12px;
  cursor: pointer;
  transition: border-color 0.2s;
  user-select: none;
}
.my-select-wrapper.is-disabled {
  background: var(--disabled-bg-color);
  border-color: var(--disabled-border-color);
  color: var(--disabled-text-color);
  cursor: not-allowed;
}
.my-select-wrapper.is-open {
  border-color: var(--primary-color);
}
.my-select__placeholder {
  color: var(--text-placeholder);
}
.my-select__selected {
  color: var(--text-primary);
}
.my-select__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.my-select__tag {
  background: var(--primary-light-color);
  color: var(--primary-color);
  border-radius: 2px;
  padding: 2px 6px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.my-select__tag-close {
  margin-left: 4px;
  cursor: pointer;
}
.my-select__clear {
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.my-select__arrow {
  position: absolute;
  right: 8px;
  top: 25%;
  transform: translateY(-50%);
  transition: transform 0.2s;
}
.my-select-dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  min-width: 100%;
  background: var(--background-white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  margin-top: 4px;
  max-height: 240px;
  overflow-y: auto;
}
.my-select__option {
  padding: 8px 12px;
  cursor: pointer;
  color: var(--text-primary);
  transition: background 0.2s;
  display: flex;
  align-items: center;
}
.my-select__option.is-selected {
  background: var(--primary-light-color);
  color: var(--primary-color);
}
.my-select__option.is-disabled {
  color: var(--disabled-text-color);
  cursor: not-allowed;
}
.my-select__group-label {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 4px 12px;
  background: var(--background-primary);
}
.my-select__empty {
  color: var(--text-placeholder);
  text-align: center;
  padding: 16px 0;
}
.my-select__search {
  padding: 8px 12px 0 12px;
}
.my-select__search-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--border-light-color);
  border-radius: var(--border-radius-base);
  font-size: 14px;
  outline: none;
}
</style>
