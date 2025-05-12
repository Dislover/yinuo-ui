<template>
  <div :class="wrapperClass">
    <slot name="prefix"></slot>
    <input
      v-if="type !== 'textarea'"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :class="inputClass"
      v-model="inputValue"
      @input="onInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <textarea
      v-else
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :rows="rows"
      :class="inputClass"
      v-model="inputValue"
      @input="onInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <slot name="suffix">
      <my-icon
        v-if="clearable && inputValue"
        name="deletePlain"
        size="14"
        class="my-input-clear"
        @click="inputValue = ''"
      ></my-icon>
    </slot>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
    validator: (value) =>
      ["text", "number", "dight", "date", "color", "password"].includes(value),
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: [Number, String],
    default: undefined,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [Number, String],
    default: 3,
  },
});

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);

function onInput(e) {
  emit("update:modelValue", e.target.value);
  emit("input", e);
}

const wrapperClass = computed(() => [
  "my-input-wrapper",
  {
    "is-plain": props.plain,
    "is-round": props.round,
    "is-disabled": props.disabled,
  },
]);

const inputClass = computed(() => [
  "my-input",
  {
    "is-plain": props.plain,
    "is-disabled": props.disabled,
  },
]);
</script>

<style scoped>
.my-input-wrapper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  background: var(--background-white);
  padding: 0 8px;
  transition: border-color 0.2s;
}
.my-input-wrapper.is-plain {
  background: var(--background-primary);
  border-color: var(--border-light-color);
}
.my-input-wrapper.is-round {
  border-radius: var(--border-radius-round);
}
.my-input-wrapper.is-disabled {
  background: var(--disabled-bg-color);
  border-color: var(--disabled-border-color);
  cursor: not-allowed;
}
.my-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: var(--text-primary);
  padding: 8px 0;
  flex: 1;
}
.my-input.is-disabled {
  color: var(--disabled-text-color);
  cursor: not-allowed;
}
.my-input-wrapper:focus-within {
  border-color: var(--primary-color);
}
</style>
