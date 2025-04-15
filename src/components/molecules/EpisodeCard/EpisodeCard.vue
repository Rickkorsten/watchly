<script setup lang="ts">
import Card from "../../atoms/Card/Card.vue";

interface Props {
  id: number;
  image?: string;
  name?: string;
  episode?: string;
  airdate?: string;
}

defineProps<Props>();
</script>

<template>
  <div
      class="relative flex-none text-center group block rounded-lg"
  >
    <Card :image="image" :name="name" :has-hover="false">
      <template #default>
        <h3 class="font-medium text-lg text-neutral-200 line-clamp-3 md:line-clamp-4">{{ name }}</h3>
        <p class="text-sm text-neutral-400">
          {{ episode }}
        </p>
        <p class="text-sm text-neutral-500">{{ airdate }}</p>
      </template>
    </Card>
  </div>
</template>
