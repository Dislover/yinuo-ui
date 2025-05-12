<template>
  <div class="my-anchor">
    <div class="my-anchor-links">
      <a
        v-for="link in links"
        :key="link.href"
        :href="`#${link.href}`"
        :class="{ active: activeLink === link.href }"
        @click="handleClick(link.href, $event)"
      >
        {{ link.title }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  links: {
    type: Array,
    default: () => [],
    validator: (val) => val.every((item) => item.href && item.title),
  },
  offset: {
    type: Number,
    default: 0,
  },
});

const activeLink = ref('');
const scrollContainer = ref(window);

function handleClick(href, event) {
  event.preventDefault();
  activeLink.value = href;
  const target = document.getElementById(href);
  if (target) {
    window.scrollTo({
      top: target.offsetTop - props.offset,
      behavior: 'smooth',
    });
  }
}

function updateActiveLink() {
  const scrollTop = scrollContainer.value.scrollY || scrollContainer.value.scrollTop;
  const anchors = props.links.map((link) => {
    const target = document.getElementById(link.href);
    return {
      href: link.href,
      offsetTop: target ? target.offsetTop : 0,
    };
  });

  for (let i = anchors.length - 1; i >= 0; i--) {
    if (scrollTop >= anchors[i].offsetTop - props.offset) {
      activeLink.value = anchors[i].href;
      return;
    }
  }
  activeLink.value = '';
}

onMounted(() => {
  scrollContainer.value.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});

onUnmounted(() => {
  scrollContainer.value.removeEventListener('scroll', updateActiveLink);
});
</script>

<style scoped>
.my-anchor {
  position: relative;
  padding-left: 4px;
}

.my-anchor-links {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 160px;
}

.my-anchor-links a {
  display: block;
  padding: 8px 0 8px 16px;
  color: var(--text-regular);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all 0.3s;
}

.my-anchor-links a:hover {
  color: var(--primary-color);
}

.my-anchor-links a.active {
  color: var(--primary-color);
  border-left-color: var(--primary-color);
}
</style>