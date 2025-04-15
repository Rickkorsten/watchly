<script setup lang="ts">
interface Props {
  image?: string;
  name?: string;
  hasHover?: boolean;
}

withDefaults(defineProps<Props>(), {
  hasHover: true,
});

</script>

<template>
  <img
      :src="image"
      :alt="`Poster of ${name}`"
      class="h-48 w-32 sm:h-48 sm:w-32 md:h-64 md:w-40 lg:h-80 lg:w-48 object-cover object-top rounded-lg shadow-md bg-neutral-700"
  />
  <div
      id="overlay"
      :class="{
      'opacity-0 group-hover:opacity-100': hasHover,
      'opacity-100': !hasHover,
    }"
      class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-2 text-sm flex flex-col justify-end rounded-lg transition-opacity duration-300"
  >
    <slot />
  </div>
</template>
