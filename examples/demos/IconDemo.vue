<template>
  <div class="demo-section">
    <h2>Icon Component</h2>
    <!-- 基础图标 -->
    <h3>Basic Icons</h3>
    <div class="demo-block">
      <my-icon
        v-for="name in iconNames"
        :key="name"
        :name="name"
        :size="24"
        style="margin-right: 8px"
      />
    </div>
    <!-- 新增图标 -->
    <h3>Additional Icons</h3>
    <div class="demo-block">
      <my-icon name="edit" :size="24" color="var(--primary-color)"></my-icon>
      <my-icon name="delete" :size="24" color="var(--danger-color)"></my-icon>
      <my-icon name="loading" :size="24" spin></my-icon>
    </div>
    <!-- 不同尺寸 -->
    <h3>Different Sizes</h3>
    <div class="demo-block">
      <my-icon name="info" :size="16"></my-icon>
      <my-icon name="info" :size="24"></my-icon>
      <my-icon name="info" :size="32"></my-icon>
      <my-icon name="info" :size="48"></my-icon>
    </div>
    <!-- 旋转动画 -->
    <h3>Spin Animation</h3>
    <div class="demo-block">
      <my-icon name="loading" :size="24" spin></my-icon>
      <my-icon name="loading" :size="24" spin duration="1"></my-icon>
      <my-icon name="success" :size="24" spin></my-icon>
      <my-icon name="arrow-right" :size="24" spin></my-icon>
    </div>
    <!-- 翻转效果 -->
    <h3>Flip Effects</h3>
    <div class="demo-block">
      <my-icon name="arrow-right" :size="24"></my-icon>
      <my-icon name="arrow-right" :size="24" flip="horizontal"></my-icon>
      <my-icon name="arrow-right" :size="24" flip="vertical"></my-icon>
      <my-icon name="arrow-right" :size="24" flip="both"></my-icon>
    </div>
    <!-- 按钮中使用图标 -->
    <h3>Icons in Buttons</h3>
    <div class="demo-block">
      <my-button type="primary">
        Next
        <my-icon name="arrow-right" class="ml-2"></my-icon>
      </my-button>
      <my-button type="danger">
        <my-icon name="delete" class="mr-2"></my-icon>
        Delete
      </my-button>
      <my-button type="primary">
        <my-icon name="loading" class="mr-2" spin></my-icon>
        Loading
      </my-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyIcon, { iconMap } from "../../src/components/Icon.vue";
import MyButton from "../../src/components/Button.vue";
const iconNames = Object.keys(iconMap);
</script>

<style scoped>
.demo-section {
  margin: 20px 0;
}
.demo-block {
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}
.ml-2 {
  margin-left: var(--spacing-small);
}
.mr-2 {
  margin-right: var(--spacing-small);
}
</style>
