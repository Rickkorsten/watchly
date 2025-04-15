<script setup lang="ts">
import Skeleton from "../../atoms/Skeleton/Skeleton.vue";
</script>

<template>
  <!-- Skeleton for Show Details -->
  <div class="flex flex-col lg:flex-row gap-8">
    <Skeleton type="image" />
    <div class="flex-1 space-y-4">
      <Skeleton type="title" />
      <Skeleton type="text" />
      <Skeleton type="text" />
      <Skeleton type="text" />
    </div>
  </div>
  <!-- Skeleton for Cast Section -->
  <div>
    <Skeleton type="title" />
    <div class="grid grid-cols-2 mt-4 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      <Skeleton v-for="n in 4" :key="n" type="card" />
    </div>
  </div>
  <!-- Skeleton for Episodes Section -->
  <div>
    <Skeleton type="title" />
    <div class="flex space-x-4 p-2 mt-4 overflow-x-auto">
      <Skeleton v-for="n in 4" :key="n" type="image" />
    </div>
  </div>
</template>

