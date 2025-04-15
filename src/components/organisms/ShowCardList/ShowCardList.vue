<script setup lang="ts">
interface Props {
  genre: string;
}

defineProps<Props>();
</script>

<template>
  <div class="mb-8">
    <h2
      class="text-xl text-neutral-200 font-semibold mb-2"
      :id="`genre-heading-${genre}`"
    >
      Top {{ genre.toLocaleLowerCase() }}
    </h2>
    <div
      class="flex space-x-4 p-2 overflow-x-auto"
      :aria-labelledby="`genre-heading-${genre}`"
    >
      <slot />
    </div>
  </div>
</template>
