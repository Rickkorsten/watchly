<script setup lang="ts">
interface Props {
  image?: string;
  name: string;
  character: string;
}

defineProps<Props>();
</script>

<template>
  <div
      class="flex items-center gap-4 bg-neutral-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <img
        v-if="image"
        :src="image"
        :alt="`Image of ${name}`"
        class="w-16 h-16 rounded-full object-cover border-2 border-neutral-700"
    />
    <div>
      <p class="font-medium text-neutral-200 line-clamp-2 text-base sm:text-sm md:text-lg ">{{ name }}</p>
      <p class="text-xs md:text-sm text-neutral-400 line-clamp-2 md:line-clamp-3">as {{ character }}</p>
    </div>
  </div>
</template>
