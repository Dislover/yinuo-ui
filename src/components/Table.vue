<template>
  <div :class="wrapperClass">
    <table class="my-table">
      <thead>
        <tr>
          <th v-if="selectable" style="width: 50px">
            <input 
              type="checkbox" 
              :checked="isAllSelected"
              @change="toggleSelectAll"
            />
          </th>
          <th v-for="(column, index) in columns" :key="index">
            <slot :name="`header-${column.key}`" :column="column" :index="index">
              <slot name="header" :column="column" :index="index">
                {{ column.title }}
              </slot>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(row, rowIndex) in data" 
          :key="rowIndex"
          :class="{ 'is-selected': isSelected(row) }"
          @click="handleRowClick(row)"
        >
          <td v-if="selectable">
            <input 
              type="checkbox" 
              :checked="isSelected(row)"
              @click.stop
              @change="toggleSelect(row)"
            />
          </td>
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <slot :name="`cell-${column.key}`" :row="row" :column="column" :rowIndex="rowIndex" :colIndex="colIndex">
              <slot name="cell" :row="row" :column="column" :rowIndex="rowIndex" :colIndex="colIndex">
                {{ row[column.key] }}
              </slot>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  selectedKeys: {
    type: Array,
    default: () => [],
  },
});

const wrapperClass = computed(() => [
  "my-table-wrapper",
  {
    "is-bordered": props.bordered,
    "is-striped": props.striped,
    "is-hoverable": props.hoverable,
    "is-center":props.center,
  },
]);

const emit = defineEmits([
  "update:selectedKeys",
  "select",
  "select-all",
]);

const selectedRows = ref(props.selectedKeys);

const isSelected = (row) => selectedRows.value.includes(row);
const isAllSelected = computed(() => 
  props.data.length > 0 && props.data.every(isSelected)
);

function toggleSelect(row) {
  const index = selectedRows.value.indexOf(row);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
  emit("update:selectedKeys", selectedRows.value);
  emit("select", row, selectedRows.value);
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = [...props.data];
  }
  emit("update:selectedKeys", selectedRows.value);
  emit("select-all", selectedRows.value);
}

function handleRowClick(row) {
  if (props.selectable) {
    toggleSelect(row);
  }
}
</script>

<style scoped>
.my-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.my-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.my-table th,
.my-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-light-color);
}

.my-table th {
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--background-primary);
}

.my-table-wrapper.is-bordered .my-table,
.my-table-wrapper.is-bordered .my-table th,
.my-table-wrapper.is-bordered .my-table td {
  border: 1px solid var(--border-light-color);
}
.my-table-wrapper.is-center .my-table,
.my-table-wrapper.is-center .my-table th
,.my-table-wrapper.is-center .my-table td {
    text-align: center;
}

.my-table-wrapper.is-striped .my-table tr:nth-child(even) {
  background-color: var(--background-primary);
}

.my-table-wrapper.is-hoverable .my-table tr:hover {
  background-color: var(--background-secondary);
}

.my-table tr.is-selected {
  background-color: var(--primary-light-color);
}

.my-table tr.is-selected:hover {
  background-color: var(--primary-hover-color);
}
</style>