<script setup lang="ts">
import { RouterLink } from 'vue-router';

type Props = {
  to: string;
}

defineProps<Props>()
</script>

<template>
  <RouterLink
      :to="to"
      class="flex items-center w-fit mb-4 px-2 py-2 text-white text-bold rounded hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      aria-label="Go back to the previous page"
  >
    <svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
      <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
    </svg>
    <span class="ml-2">
      <slot>Back</slot>
    </span>
  </RouterLink>
</template>
