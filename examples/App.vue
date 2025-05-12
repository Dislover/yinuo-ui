<template>
  <div class="container">
    <h1>My UI Components</h1>

    <!-- 锚点组件 -->
    <my-anchor :links="links"></my-anchor>

    <!-- 自动生成的组件示例 -->
    <div v-for="(demo,index) in demos" :id="demo.name.toLowerCase().replace('demo', '')" :key="index">
      <component :is="demo.component"></component>
    </div>
  </div>
</template>

<script>
import { defineComponent,defineAsyncComponent } from "vue";
import MyAnchor from '../src/components/Anchor.vue';

export default defineComponent({
  name: "App",
  components: {
    MyAnchor
  },
  setup() {
    // 自动导入所有demo组件
    const demos = Object.entries(import.meta.glob('./demos/*.vue')).map(([path, module]) => {
      const name = path.split('/').pop().replace('.vue', '')
      return {
        name,
        component: defineAsyncComponent(() => module())
      }
    })

    const links = demos.map(demo => ({
      href: demo.name.toLowerCase().replace('demo', ''),
      title: `${demo.name.replace('Demo', '')}组件`
    }));
    
    return {
      demos,
      links
    };
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

.anchor-container {
  position: fixed;
  right: 20px;
  top: 100px;
  background: var(--background-white);
  padding: 10px;
  border-radius: var(--border-radius-base);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.anchor-link {
  display: block;
  padding: 8px 12px;
  color: var(--text-regular);
  text-decoration: none;
  transition: all 0.3s;
}

.anchor-link:hover {
  color: var(--primary-color);
}
</style>
