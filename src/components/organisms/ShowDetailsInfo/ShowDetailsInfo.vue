<script setup lang="ts">
interface Props {
  name?: string;
  summary?: string;
  genres?: string[];
  rating?: number;
  language?: string;
  premiered?: string;
  status?: string;
  runtime?: number | null;
  network?: string;
}

defineProps<Props>();
</script>

<template>
    <h1 class="text-5xl text-neutral-200 font-extrabold mb-6">{{ name }}</h1>
    <div v-if="genres?.length" class="flex flex-wrap gap-2 mb-6">
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
      <p><strong>Language:</strong> {{ language || 'N/A' }}</p>
      <p><strong>Premiered:</strong> {{ premiered || 'N/A' }}</p>
      <p><strong>Status:</strong> {{ status || 'N/A' }}</p>
      <p><strong>Runtime:</strong> {{ runtime ? `${runtime} minutes` : 'N/A' }}</p>
      <p><strong>Network:</strong> {{ network || 'N/A' }}</p>
    </div>
</template>
