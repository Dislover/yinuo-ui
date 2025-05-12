<template>
  <div class="demo-section">
    <h2>Table Component</h2>

    <h3>Basic Table</h3>
    <div class="demo-block">
      <my-table :data="tableData" :columns="columns"></my-table>
    </div>

    <h3>Bordered Table</h3>
    <div class="demo-block">
      <my-table :data="tableData" :columns="columns" bordered></my-table>
    </div>

    <h3>Striped Table</h3>
    <div class="demo-block">
      <my-table :data="tableData" :columns="columns" striped></my-table>
    </div>

    <h3>Hoverable Table</h3>
    <div class="demo-block">
      <my-table :data="tableData" :columns="columns" hoverable></my-table>
    </div>
    <h3>Aligan-center Table</h3>
    <div class="demo-block">
      <my-table :data="tableData" :columns="columns" center></my-table>
    </div>
    <h3>Slot Table</h3>
    <div class="demo-block">
      <my-table :data="tableData" :columns="columns2" center>
        <template #header-name="{ column }">
          <span style="color: blue">{{ column.title }}</span>
        </template>

        <template #cell-operator="{ row }">
          <my-button type="primary" plain>{{ row.name }}</my-button>
        </template>
      </my-table>
    </div>
    <h3>Select Table</h3>
    <div class="demo-block">
      <my-table
        :data="tableData"
        :columns="columns"
        selectable
        v-model:selected-keys="selectedRows"
        @select="handleSelect"
        @select-all="handleSelectAll"
      ></my-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyTable from "../../src/components/Table.vue";
import MyButton from "../../src/components/Button.vue";

const columns = [
  { title: "Name", key: "name" },
  { title: "Age", key: "age" },
  { title: "Address", key: "address" },
];
const columns2 = [
  { title: "Name", key: "name" },
  { title: "Age", key: "age" },
  { title: "Address", key: "address" },
  { title: "Operator", key: "operator" },
];

const tableData = ref([
  { name: "John", age: 25, address: "New York" },
  { name: "Jane", age: 30, address: "London" },
  { name: "Bob", age: 28, address: "Paris" },
]);
function handleSelectAll(row) {
  console.log(row);
}
function handleSelect(row) {
  console.log(row);
}
</script>

<style scoped>
.demo-section {
  margin: 20px 0;
}
.demo-block {
  margin: 16px 0;
}
</style>