<script setup lang="ts">
defineProps({
  id: {
    type: Number,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  rating: {
    type: [Number, null],
    default: "",
    required: true,
  },
});
</script>

<template>
  <router-link
      :to="`/detail/${id}`"
      :aria-label="`View details for ${name}`"
      class="relative flex-none text-center group block rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <img
        :src="image"
        :alt="`Poster of ${name}`"
        class="h-80 w-48 object-cover object-top rounded-lg shadow-md"
    />
    <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-2 text-sm flex flex-col justify-end rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <p class="font-medium" aria-label="Show name">{{ name }}</p>
      <small class="text-gray-300" aria-label="Show rating">
        ⭐ {{ rating ?? 'N/A' }}
      </small>
    </div>
  </router-link>
</template>
