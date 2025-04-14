<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  name: {
    type: String,
  },
  summary: {
    type: String,
  },
  genres: {
    type: Array as () => string[],
  },
  rating: {
    type: Number,
  },
  language: {
    type: String,
  },
  premiered: {
    type: String,
  },
  status: {
    type: String,
  },
  runtime: {
    type: [Number, null, undefined],
  },
  network: {
    type: String,
    default: null,
  },
});
</script>

<template>
    <h1 class="text-5xl text-neutral-200 font-extrabold mb-6">{{ name }}</h1>
    <div class="flex flex-wrap gap-2 mb-6">
      <span
          v-for="genre in genres"
          :key="genre"
          class="px-4 py-2 border border-2 border-purple-500 text-purple-500 text-sm font-semibold rounded-full"
      >
        {{ genre }}
      </span>
    </div>
    <p v-html="summary" class="text-neutral-400 mb-6 leading-relaxed"></p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-200">
      <p><strong>Rating:</strong> {{ rating || 'N/A' }}</p>
      <p><strong>Language:</strong> {{ language }}</p>
      <p><strong>Premiered:</strong> {{ premiered }}</p>
      <p><strong>Status:</strong> {{ status }}</p>
      <p><strong>Runtime:</strong> {{ runtime || 'N/A' }} minutes</p>
      <p><strong>Network:</strong> {{ network || 'N/A' }}</p>
    </div>
</template>
