<template>
  <button
    :class="[
      'my-button',
      `my-button--${type}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-disabled': disabled,
        [`my-button--${size}`]: size,
      },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <my-icon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      class="my-button__icon"
    ></my-icon>
    <span v-if="$slots.default" :class="{ 'ml-2': icon }">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { defineComponent, computed } from "vue";
import MyIcon from "./Icon.vue";

export default defineComponent({
  name: "MyButton",
  components: {
    MyIcon,
  },
  props: {
    type: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "primary", "success", "warning", "danger"].includes(
          value
        );
      },
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    icon: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = (event) => {
      emit("click", event);
    };

    const iconSize = computed(() => {
      const sizeMap = {
        small: 14,
        medium: 16,
        large: 18,
      };
      return sizeMap[props.size] || 16;
    });

    return {
      handleClick,
      iconSize,
    };
  },
});
</script>

<style scoped>
.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  background: var(--button-bg);
  border: 1px solid var(--button-border-color);
  color: var(--button-text-color);
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
}

.my-button:hover,
.my-button:focus {
  color: var(--primary-color);
  border-color: var(--primary-hover-color);
  background-color: var(--primary-light-color);
  outline: none;
}

.my-button:active {
  color: var(--primary-active-color);
  border-color: var(--primary-active-color);
  outline: none;
}

/* Size variants */
.my-button--small {
  height: 24px;
  padding: 5px 11px;
  font-size: 12px;
  border-radius: 3px;
}

.my-button--medium {
  height: 32px;
  padding: 8px 15px;
  font-size: 14px;
}

.my-button--large {
  height: 40px;
  padding: 11px 19px;
  font-size: 16px;
  border-radius: 4px;
}

/* Type variants */
.my-button--primary {
  color: var(--text-white);
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.my-button--primary:hover,
.my-button--primary:focus {
  background: var(--primary-hover-color);
  border-color: var(--primary-hover-color);
  color: var(--white);
}

.my-button--primary:active {
  background: var(--primary-active-color);
  border-color: var(--primary-active-color);
  color: var(--white);
}

.my-button--success {
  color: var(--white);
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.my-button--success:hover,
.my-button--success:focus {
  background: var(--success-hover-color);
  border-color: var(--success-hover-color);
  color: var(--white);
}

.my-button--success:active {
  background: var(--success-active-color);
  border-color: var(--success-active-color);
  color: var(--white);
}

.my-button--warning {
  color: var(--white);
  background-color: var(--warning-color);
  border-color: var(--warning-color);
}

.my-button--warning:hover,
.my-button--warning:focus {
  background: var(--warning-hover-color);
  border-color: var(--warning-hover-color);
  color: var(--white);
}

.my-button--warning:active {
  background: var(--warning-active-color);
  border-color: var(--warning-active-color);
  color: var(--white);
}

.my-button--danger {
  color: var(--white);
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}

.my-button--danger:hover,
.my-button--danger:focus {
  background: var(--danger-hover-color);
  border-color: var(--danger-hover-color);
  color: var(--white);
}

.my-button--danger:active {
  background: var(--danger-active-color);
  border-color: var(--danger-active-color);
  color: var(--white);
}

/* Plain variants */
.my-button.is-plain {
  background: var(--white);
  border: 1px solid var(--border-color);
  color: var(--text-regular);
}

.my-button--primary.is-plain {
  color: var(--primary-color);
  background: var(--primary-light-color);
  border-color: var(--primary-light-color);
}

.my-button--primary.is-plain:hover,
.my-button--primary.is-plain:focus {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--white);
}

.my-button--success.is-plain {
  color: var(--success-color);
  background: var(--success-light-color);
  border-color: var(--success-light-color);
}

.my-button--success.is-plain:hover,
.my-button--success.is-plain:focus {
  background: var(--success-color);
  border-color: var(--success-color);
  color: var(--white);
}

.my-button--warning.is-plain {
  color: var(--warning-color);
  background: var(--warning-light-color);
  border-color: var(--warning-light-color);
}

.my-button--warning.is-plain:hover,
.my-button--warning.is-plain:focus {
  background: var(--warning-color);
  border-color: var(--warning-color);
  color: var(--white);
}

.my-button--danger.is-plain {
  color: var(--danger-color);
  background: var(--danger-light-color);
  border-color: var(--danger-light-color);
}

.my-button--danger.is-plain:hover,
.my-button--danger.is-plain:focus {
  background: var(--danger-color);
  border-color: var(--danger-color);
  color: var(--white);
}

/* Round variant */
.my-button.is-round {
  border-radius: 20px;
}

/* Disabled state */
.my-button.is-disabled,
.my-button.is-disabled:hover,
.my-button.is-disabled:focus,
.my-button.is-disabled:active {
  color: var(--disabled-text-color);
  cursor: not-allowed;
  background-image: none;
  background-color: var(--disabled-bg-color);
  border-color: var(--disabled-border-color);
}

/* Icon styles */
.my-button__icon {
  vertical-align: middle;
}

.ml-2 {
  margin-left: 8px;
}
</style>
