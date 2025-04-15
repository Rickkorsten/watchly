<script setup lang="ts">
import Skeleton from "../../atoms/Skeleton/Skeleton.vue";
</script>

<template>
  <div
      v-for="n in 3"
      :key="n"
      class="mb-8"
  >
    <Skeleton type="title"/>
    <div class="flex space-x-4 p-2 mt-4 overflow-x-auto">
      <Skeleton type="image" v-for="i in 5" :key="i" aria-hidden="true" />
    </div>
  </div>
</template>
