<script setup lang="ts">
import Card from "../../atoms/Card/Card.vue";

interface Props {
  id: number;
  image?: string;
  name?: string;
  rating?: number | null;
}

defineProps<Props>();
</script>

<template>
  <router-link
    :to="`/show/${id}`"
    :aria-label="`View details for ${name}`"
    class="relative flex-none text-center group block rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <Card :image="image" :name="name">
      <template #default>
        <p class="font-medium" aria-label="Show name">{{ name }}</p>
        <small class="text-gray-300" aria-label="Show rating">
          ⭐ {{ rating ?? "No rating" }}
        </small>
      </template>
    </Card>
  </router-link>
</template>
