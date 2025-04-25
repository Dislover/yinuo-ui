<template>
  <div class="container">
    <h1>My UI Components</h1>

    <!-- 按钮组件示例 -->
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

    <!-- 图标组件示例 -->
    <div class="demo-section">
      <h2>Icon Component</h2>

      <!-- 基础图标 -->
      <h3>Basic Icons</h3>
      <div class="demo-block">
        <my-icon name="arrow-right" :size="24"></my-icon>
        <my-icon name="github" :size="24"></my-icon>
        <my-icon name="close" :size="24" color="var(--danger-color)"></my-icon>
        <my-icon name="check" :size="24" color="var(--success-color)"></my-icon>
        <my-icon name="info" :size="24" color="var(--primary-color)"></my-icon>
        <my-icon
          name="warning"
          :size="24"
          color="var(--warning-color)"
        ></my-icon>
        <my-icon name="error" :size="24" color="var(--danger-color)"></my-icon>
        <my-icon
          name="success"
          :size="24"
          color="var(--success-color)"
        ></my-icon>
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
        <my-icon name="loading" ::size="24" spin></my-icon>
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MyButton from "../src/components/Button.vue";
import MyIcon from "../src/components/Icon.vue";

export default defineComponent({
  name: "App",
  components: {
    MyButton,
    MyIcon,
  },
});
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin: 20px 0;
}

.demo-block {
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

h1 {
  color: var(--text-primary);
  margin-bottom: 40px;
}

h2 {
  color: var(--text-secondary);
  margin: 20px 0;
}

h3 {
  color: var(--text-regular);
  margin: 16px 0 8px;
  font-size: var(--font-size-medium);
}

.ml-2 {
  margin-left: var(--spacing-small);
}

.mr-2 {
  margin-right: var(--spacing-small);
}
</style>
