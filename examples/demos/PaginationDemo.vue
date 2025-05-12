<template>
  <div class="demo-section">
    <h2>Pagination Component</h2>
    
    <div class="demo-block">
      <h3>Basic Usage</h3>
      <my-pagination 
        :total="100" 
        :page-size="10" 
        :current-page="currentPage"
        @change="handlePageChange"
      />
    </div>
    
    <div class="demo-block">
      <h3>With Pager Count</h3>
      <my-pagination 
        :total="100" 
        :page-size="10" 
        :current-page="currentPage"
        :pager-count="5"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyPagination from '../../src/components/Pagination.vue';

const currentPage = ref(1);

function handlePageChange(page) {
  currentPage.value = page;
  console.log('Current page:', page);
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