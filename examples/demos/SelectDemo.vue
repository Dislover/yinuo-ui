<template>
  <div class="demo-section">
    <h2>Select Component</h2>
    <div style="margin-bottom: 12px; color: var(--text-secondary)">
      支持单选、多选、分组、本地/远程搜索、清除、禁用等功能。
    </div>
    <!-- 单选 -->
    <h3>Basic Single Select</h3>
    <div class="demo-block">
      <my-select
        v-model="select1"
        :options="selectOptions"
        placeholder="请选择一项"
      ></my-select>
    </div>
    <!-- 多选 -->
    <h3>Multiple Select</h3>
    <div class="demo-block">
      <my-select
        v-model="select2"
        :options="selectOptions"
        multiple
        clearable
        placeholder="请选择多项"
      ></my-select>
    </div>
    <!-- 分组 -->
    <h3>Grouped Select</h3>
    <div class="demo-block">
      <my-select
        v-model="select3"
        :options="groupedOptions"
        placeholder="请选择分组项"
      ></my-select>
    </div>
    <!-- 本地搜索 -->
    <h3>Local Search</h3>
    <div class="demo-block">
      <my-select
        v-model="select4"
        :options="selectOptions"
        searchable
        clearable
        placeholder="可搜索..."
        searchPlaceholder="输入关键字"
      ></my-select>
    </div>
    <!-- 远程搜索（模拟） -->
    <h3>Remote Search (Mock)</h3>
    <div class="demo-block">
      <my-select
        v-model="select5"
        :options="remoteOptions"
        :remote="true"
        :remoteMethod="remoteSearch"
        clearable
        placeholder="远程搜索..."
        searchPlaceholder="输入关键字"
      ></my-select>
    </div>
    <!-- 禁用状态 -->
    <h3>Disabled Select</h3>
    <div class="demo-block">
      <my-select
        v-model="select6"
        :options="selectOptions"
        disabled
        placeholder="禁用下拉框"
      ></my-select>
    </div>
    <div style="margin-top: 24px">
      <h3>Props</h3>
      <table
        border="1"
        cellpadding="4"
        style="border-collapse: collapse; font-size: 13px"
      >
        <tbody>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
          <tr>
            <td>modelValue</td>
            <td>绑定值</td>
            <td>string/number/array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>options</td>
            <td>选项列表</td>
            <td>array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>是否多选</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>占位符</td>
            <td>string</td>
            <td>请选择</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>可清除</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>remote</td>
            <td>远程搜索</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>remoteMethod</td>
            <td>远程搜索方法</td>
            <td>function</td>
            <td>null</td>
          </tr>
          <tr>
            <td>searchable</td>
            <td>本地搜索</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>searchPlaceholder</td>
            <td>搜索框占位</td>
            <td>string</td>
            <td>搜索...</td>
          </tr>
          <tr>
            <td>groupBy</td>
            <td>分组字段</td>
            <td>string</td>
            <td>''</td>
          </tr>
          <tr>
            <td>emptyText</td>
            <td>无数据提示</td>
            <td>string</td>
            <td>无数据</td>
          </tr>
        </tbody>
      </table>
      <h3 style="margin-top: 16px">Options 格式</h3>
      <pre style="background: #f8f8f8; padding: 8px">
[
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2, disabled: true },
  // 分组：
  { label: '分组A', options: [ { label: 'A-1', value: 'a1' }, ... ] }
]</pre
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MySelect from "../../src/components/Select.vue";

const select1 = ref("");
const select2 = ref([]);
const select3 = ref("");
const select4 = ref("");
const select5 = ref("");
const select6 = ref("");
const selectOptions = [
  { label: "苹果", value: "apple" },
  { label: "香蕉", value: "banana" },
  { label: "橙子", value: "orange", disabled: true },
  { label: "葡萄", value: "grape" },
];
const groupedOptions = [
  {
    label: "水果A",
    options: [
      { label: "苹果", value: "apple" },
      { label: "香蕉", value: "banana" },
    ],
  },
  {
    label: "水果B",
    options: [
      { label: "橙子", value: "orange" },
      { label: "葡萄", value: "grape" },
    ],
  },
];
const remoteOptions = ref([]);
function remoteSearch(query) {
  setTimeout(() => {
    remoteOptions.value = selectOptions.filter((opt) =>
      opt.label.includes(query)
    );
  }, 400);
}
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
