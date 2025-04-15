<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type: "text" | "image" | "card" | "title";
}

const props = defineProps<Props>();

const skeletonClass = computed(() => {
  switch (props.type) {
    case "title":
      return "h-6 w-1/3 rounded";
    case "text":
      return "h-6 w-full rounded";
    case "image":
      return "h-48 w-32 sm:h-48 sm:w-32 md:h-64 md:w-40 lg:h-80 lg:w-48 rounded-lg";
    case "card":
      return "h-24 w-full rounded-lg";
    default:
      return "";
  }
});
</script>

<template>
  <div
    v-if="skeletonClass"
    v-bind="$attrs"
    class="animate-pulse bg-neutral-700"
    :class="skeletonClass"
  />
</template>
