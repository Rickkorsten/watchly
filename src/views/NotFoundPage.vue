<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-950 text-neutral-200 text-center">
    <h1 class="text-5xl font-extrabold mb-4">404 Not Found</h1>
    <p class="text-lg text-gray-400 mb-6">The page you are looking for does not exist.</p>
    <router-link
        to="/"
        class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
    >
      Go back to Home
    </router-link>
  </div>
</template>
