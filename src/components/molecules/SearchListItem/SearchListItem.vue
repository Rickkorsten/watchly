<script setup lang="ts">

type Props = {
  id: number;
  image?: string;
  name: string;
  period: string;
  rating?: number;
}

defineProps<Props>();
</script>

<template>
  <RouterLink
      :to="`/show/${id}`"
      class="flex px-4 py-2 hover:bg-neutral-700 cursor-pointer"
  >
    <img
        :src="image"
        :alt="`Poster of ${name}`"
        class="flex h-16 w-12 bg-gray-200 rounded-md shadow-md mr-2"
    />
    <div>
      <h3 class="font-medium text-base text-neutral-200 line-clamp-1">
        {{ name }}
      </h3>
      <h4 class="font-medium text-xs text-neutral-400 line-clamp-1">
        {{ period }}
      </h4>
      <h4 class="font-medium text-xs text-neutral-400 line-clamp-1">
        ⭐ {{ rating ?? 'No rating' }}
      </h4>
    </div>
  </RouterLink>
</template>
