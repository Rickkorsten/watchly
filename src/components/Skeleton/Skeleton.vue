<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['text', 'image', 'card', 'title'].includes(value),
  },
});
</script>

<template>
  <div v-if="type === 'title'" class="animate-pulse bg-neutral-700 h-6 w-1/3 rounded"></div>
  <div v-if="type === 'text'" class="animate-pulse bg-neutral-700 h-6 w-full rounded"></div>
  <div v-else-if="type === 'image'" class="animate-pulse bg-neutral-700 h-48 w-32 sm:h-48 sm:w-32 md:h-64 md:w-40 lg:h-80 lg:w-48 rounded-lg"></div>
  <div v-else-if="type === 'card'" class="animate-pulse bg-neutral-700 h-24 w-full rounded-lg"></div>
</template>

