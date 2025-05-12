<template>
  <div class="my-watermark" ref="watermarkRef" :style="watermarkStyle">
    <slot />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "Watermark",
  },
  font: {
    type: String,
    default: "16px Arial",
  },
  color: {
    type: String,
    default: "rgba(0,0,0,0.15)",
  },
  rotate: {
    type: Number,
    default: -20,
  },
  gap: {
    type: Number,
    default: 120,
  },
  opacity: {
    type: Number,
    default: 0.3,
  },
  width: {
    type: Number,
    default: 240,
  },
  height: {
    type: Number,
    default: 120,
  },
});

const dataUrl = ref("");
const watermarkRef = ref();
let observer = null;

function drawWatermark() {
  const canvas = document.createElement("canvas");
  canvas.width = props.width;
  canvas.height = props.height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, props.width, props.height);
  ctx.globalAlpha = props.opacity;
  ctx.font = props.font;
  ctx.fillStyle = props.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.save();
  ctx.translate(props.width / 2, props.height / 2);
  ctx.rotate((props.rotate * Math.PI) / 180);
  ctx.fillText(props.text, 0, 0);
  ctx.restore();
  dataUrl.value = canvas.toDataURL();
}

onMounted(() => {
  drawWatermark();
  nextTick(() => {
    const wm = watermarkRef.value;
    const parent = wm?.parentNode || document.body;
    observer = new MutationObserver(() => {
      if (!parent.contains(wm)) {
        parent.appendChild(wm);
      }
    });
    observer.observe(parent, { childList: true, subtree: true });
  });
});

watch(
  () => [
    props.text,
    props.font,
    props.color,
    props.rotate,
    props.opacity,
    props.width,
    props.height,
  ],
  drawWatermark
);

const watermarkStyle = computed(() => ({
  backgroundImage: `url(${dataUrl.value})`,
  backgroundRepeat: "repeat",
  backgroundPosition: `0 0`,
  backgroundSize: `${props.gap + props.width}px ${props.gap + props.height}px`,
  width: "100%",
  height: "100%",
  position: "relative",
}));

onUnmounted(() => {
  observer && observer.disconnect();
});
</script>

<style scoped>
.my-watermark {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
