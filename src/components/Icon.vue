<template>
  <i
    :class="[
      'my-icon',
      customClass,
      {
        'is-spin': spin,
        'is-flip-horizontal': flip === 'horizontal',
        'is-flip-vertical': flip === 'vertical',
        'is-flip-both': flip === 'both',
      },
    ]"
    :style="styles"
  >
    <svg
      :class="svgClass"
      :style="svgStyle"
      aria-hidden="true"
      v-html="svgContent"
      :viewBox="viewBox"
    ></svg>
  </i>
</template>

<script>
import { defineComponent, computed } from "vue";

// 图标集合
export const iconMap = {
  "arrow-right": {
    path: `<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>`,
    viewBox: "0 0 24 24",
  },
  close: {
    path: `<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>`,
    viewBox: "0 0 24 24",
  },
  check: {
    path: `<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>`,
    viewBox: "0 0 24 24",
  },
  info: {
    path: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>`,
    viewBox: "0 0 24 24",
  },
  warning: {
    path: `<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>`,
    viewBox: "0 0 24 24",
  },
  error: {
    path: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>`,
    viewBox: "0 0 24 24",
  },
  success: {
    path: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>`,
    viewBox: "0 0 24 24",
  },
  loading: {
    path: `<path d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8z"></path>`,
    viewBox: "0 0 24 24",
  },
  edit: {
    path: `<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>`,
    viewBox: "0 0 24 24",
  },
  delete: {
    path: `<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>`,
    viewBox: "0 0 24 24",
  },
  github: {
    path: `<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>`,
    viewBox: "0 0 496 512",
  },
  search: {
    path: `<path d="M 24 2.8886719 C 12.365714 2.8886719 2.8886719 12.365723 2.8886719 24 C 2.8886719 35.634277 12.365714 45.111328 24 45.111328 C 29.036552 45.111328 33.664698 43.331333 37.298828 40.373047 L 52.130859 58.953125 C 52.130859 58.953125 55.379484 59.435984 57.396484 57.333984 C 59.427484 55.215984 58.951172 52.134766 58.951172 52.134766 L 40.373047 37.298828 C 43.331332 33.664697 45.111328 29.036548 45.111328 24 C 45.111328 12.365723 35.634286 2.8886719 24 2.8886719 z M 24 7.1113281 C 33.352549 7.1113281 40.888672 14.647457 40.888672 24 C 40.888672 33.352543 33.352549 40.888672 24 40.888672 C 14.647451 40.888672 7.1113281 33.352543 7.1113281 24 C 7.1113281 14.647457 14.647451 7.1113281 24 7.1113281 z"></path>`,
    viewBox: "0 0 64 64",
  },
  deletePlain: {
    path: `<path d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>`,
    viewBox: "0 0 48 48",
  },
};

export default defineComponent({
  name: "MyIcon",
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => Object.keys(iconMap).includes(value),
    },
    size: {
      type: [String, Number],
      default: "1em",
    },
    color: {
      type: String,
      default: "currentColor",
    },
    customClass: {
      type: String,
      default: "",
    },
    spin: {
      type: Boolean,
      default: false,
    },
    flip: {
      type: String,
      default: "",
      validator: (value) =>
        ["", "horizontal", "vertical", "both"].includes(value),
    },
    duration: {
      type: [String, Number],
      default: 2,
    },
  },
  setup(props) {
    const svgContent = computed(() => iconMap[props.name]?.path || "");
    const viewBox = computed(() => iconMap[props.name]?.viewBox || "0 0 24 24");

    const sizeValue = computed(() => {
      if (typeof props.size === "number") {
        return `${props.size}px`;
      }
      return props.size;
    });

    const styles = computed(() => ({
      fontSize: sizeValue.value,
      color: props.color,
      width: sizeValue.value,
      height: sizeValue.value,
      "--icon-spin-duration": `${props.duration}s`,
    }));

    const svgClass = computed(() => ["my-icon__svg", `my-icon-${props.name}`]);

    const svgStyle = computed(() => ({
      width: "1em",
      height: "1em",
    }));

    return {
      svgContent,
      viewBox,
      styles,
      svgClass,
      svgStyle,
    };
  },
});
</script>

<style scoped>
.my-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  vertical-align: middle;
}

.my-icon__svg {
  fill: currentColor;
  overflow: hidden;
}

.my-icon.is-spin {
  animation: icon-spin var(--icon-spin-duration) linear infinite;
}

.my-icon.is-flip-horizontal {
  transform: scaleX(-1);
}

.my-icon.is-flip-vertical {
  transform: scaleY(-1);
}

.my-icon.is-flip-both {
  transform: scale(-1);
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
