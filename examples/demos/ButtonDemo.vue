<template>
  <div class="demo-section">
    <h2>Button Component</h2>
    <!-- 基础按钮 -->
    <h3>Basic Buttons</h3>
    <div class="demo-block">
      <my-button>Default</my-button>
      <my-button type="primary">Primary</my-button>
      <my-button type="success">Success</my-button>
      <my-button type="warning">Warning</my-button>
      <my-button type="danger">Danger</my-button>
    </div>
    <!-- 朴素按钮 -->
    <h3>Plain Buttons</h3>
    <div class="demo-block">
      <my-button plain>Plain</my-button>
      <my-button type="primary" plain>Primary Plain</my-button>
      <my-button type="success" plain>Success Plain</my-button>
      <my-button type="warning" plain>Warning Plain</my-button>
      <my-button type="danger" plain>Danger Plain</my-button>
    </div>
    <!-- 圆角按钮 -->
    <h3>Round Buttons</h3>
    <div class="demo-block">
      <my-button round>Round</my-button>
      <my-button type="primary" round>Primary Round</my-button>
      <my-button type="success" round>Success Round</my-button>
      <my-button type="warning" round>Warning Round</my-button>
      <my-button type="danger" round>Danger Round</my-button>
    </div>
    <!-- 禁用状态 -->
    <h3>Disabled Buttons</h3>
    <div class="demo-block">
      <my-button disabled>Disabled</my-button>
      <my-button type="primary" disabled>Primary Disabled</my-button>
    </div>
    <!-- 不同尺寸 -->
    <h3>Different Sizes</h3>
    <div class="demo-block">
      <my-button size="small">Small</my-button>
      <my-button>Default</my-button>
      <my-button size="large">Large</my-button>
    </div>
    <div class="demo-block">
      <my-button size="small" type="primary">Small</my-button>
      <my-button type="primary">Default</my-button>
      <my-button size="large" type="primary">Large</my-button>
    </div>
    <!-- 图标按钮 -->
    <h3>Icon Buttons</h3>
    <div class="demo-block">
      <my-button icon="edit" type="primary">Edit</my-button>
      <my-button icon="delete" type="danger">Delete</my-button>
      <my-button icon="check" type="success">Confirm</my-button>
      <my-button icon="info" type="warning">Info</my-button>
    </div>
    <div class="demo-block">
      <my-button icon="edit" type="primary" size="small">Edit</my-button>
      <my-button icon="edit" type="primary">Edit</my-button>
      <my-button icon="edit" type="primary" size="large">Edit</my-button>
    </div>
  </div>
</template>

<script setup>
import MyButton from "../../src/components/Button.vue";
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
</style>
