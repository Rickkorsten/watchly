<script setup lang="ts">
defineProps({
  id: {
    type: Number,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  season: {
    type: Number,
  },
  number: {
    type: Number,
  },
  airdate: {
    type: String,
  },
});
</script>

<template>
  <div
      class="relative flex-none text-center group block rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <img
        :src="image"
        :alt="`Poster of ${name}`"
        class="h-48 w-32 sm:h-48 sm:w-32 md:h-64 md:w-40 lg:h-80 lg:w-48 object-cover object-top rounded-lg shadow-md"
    />
    <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-2 text-sm flex flex-col justify-end rounded-lg"
    >
      <h3 class="font-medium text-lg text-neutral-200 line-clamp-3 md:line-clamp-4">{{ name }}</h3>
      <p class="text-sm text-neutral-400">
        Season {{ season }}, Episode {{ number }}
      </p>
      <p class="text-sm text-neutral-500">{{ airdate }}</p>
    </div>
  </div>
</template>
