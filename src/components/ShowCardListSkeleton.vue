<script setup lang="ts">
</script>

<template>
  <div class="mb-8">
    <h2
        class="text-xl font-semibold mb-2 bg-gray-300 h-6 w-1/3 rounded text-left"
        aria-hidden="true"
    />
    <div class="flex space-x-4 p-2 overflow-x-auto">
      <slot/>
    </div>
  </div>
</template>
