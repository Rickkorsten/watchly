<script setup lang="ts">
import NavBar from "../components/organisms/NavBar/NavBar.vue";
</script>

<template>
  <div class="bg-gray-950">
    <NavBar />
    <main>
      <router-view :key="$route.fullPath"/>
    </main>
  </div>
</template>
