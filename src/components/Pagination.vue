<template>
  <div class="my-pagination">
    <button 
      class="my-pagination-prev" 
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
    >
      上一页
    </button>
    
    <template v-for="page in pages" :key="page">
      <button
        v-if="page === '...'"
        class="my-pagination-ellipsis"
        disabled
      >
        {{ page }}
      </button>
      <button
        v-else
        class="my-pagination-item"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </template>
    
    <button 
      class="my-pagination-next" 
      :disabled="currentPage >= pageCount"
      @click="changePage(currentPage + 1)"
    >
      下一页
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pagerCount: {
    type: Number,
    default: 7
  }
});

const emit = defineEmits(['update:currentPage', 'change']);

const pageCount = computed(() => Math.ceil(props.total / props.pageSize));

const pages = computed(() => {
  const current = props.currentPage;
  const pageCount = Math.ceil(props.total / props.pageSize);
  const pagerCount = props.pagerCount;
  
  if (pageCount <= pagerCount) {
    return range(1, pageCount);
  }
  
  const halfPagerCount = Math.floor(pagerCount / 2);
  let start = current - halfPagerCount;
  let end = current + halfPagerCount;
  
  if (start < 1) {
    start = 1;
    end = pagerCount;
  }
  
  if (end > pageCount) {
    end = pageCount;
    start = pageCount - pagerCount + 1;
  }
  
  const showPrevMore = start > 1;
  const showNextMore = end < pageCount;
  
  let pages = [];
  
  if (showPrevMore) {
    pages.push(1, '...');
  }
  
  pages.push(...range(start, end));
  
  if (showNextMore) {
    pages.push('...', pageCount);
  }
  
  return pages;
});

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

function changePage(page) {
  if (page < 1 || page > pageCount.value || page === props.currentPage) {
    return;
  }
  emit('update:currentPage', page);
  emit('change', page);
}
</script>

<style scoped>
.my-pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.my-pagination-prev,
.my-pagination-next,
.my-pagination-item {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  background: var(--background-white);
  cursor: pointer;
  transition: all 0.3s;
}

.my-pagination-prev:hover,
.my-pagination-next:hover,
.my-pagination-item:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.my-pagination-prev:disabled,
.my-pagination-next:disabled {
  color: var(--disabled-text-color);
  background: var(--disabled-bg-color);
  border-color: var(--disabled-border-color);
  cursor: not-allowed;
}

.my-pagination-item.active {
  color: var(--white);
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.my-pagination-ellipsis {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  background: transparent;
  cursor: default;
}
</style>