<script setup lang="ts">
defineProps<{
  searchQuery: string;
}>();

const emit = defineEmits<{
  (e: "update:searchQuery", value: string): void;
  (e: "esc-pressed"): void;
}>();

const updateInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:searchQuery", value);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("esc-pressed");
  }
};
</script>

<template>
  <div class="relative w-xs md:w-md lg:w-lg">
    <input
      :value="searchQuery"
      @input="updateInput"
      @keydown="handleKeydown"
      type="text"
      placeholder="Search..."
      class="w-full px-4 py-2 pr-10 bg-neutral-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      aria-label="Search for shows"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white"
      role="img"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>
