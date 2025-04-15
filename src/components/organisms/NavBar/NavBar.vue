<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useShowsSearch } from "@/composables/useShowsSearch";
import NavBarSearchInput from "@/components/molecules/SearchInput/NavBarSearchInput.vue";
import SearchListItem from "@/components/molecules/SearchListItem/SearchListItem.vue";

const searchQuery = ref<string>("");
const { data } = useShowsSearch(searchQuery);

const dialogRef = ref<HTMLDialogElement | null>(null);

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    searchQuery.value = "";
  }
);

const handleClickOutside = (event: MouseEvent) => {
  if (dialogRef.value && !dialogRef.value.contains(event.target as Node)) {
    dialogRef.value.close();
    searchQuery.value = "";
  }
};

const handleEscapeKey = () => {
  dialogRef.value?.close();
  searchQuery.value = "";
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav class="h-18 flex items-center justify-between px-4">
    <RouterLink
      to="/"
      class="text-neutral-100 font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
      aria-label="Go to Home"
      aria-current="page"
    >
      🎬
    </RouterLink>
    <div class="relative flex items-center">
      <NavBarSearchInput v-model:searchQuery="searchQuery" />

      <dialog
        v-if="searchQuery && data?.length"
        ref="dialogRef"
        class="absolute flex flex-col top-full mt-2.5 left-0 w-xs md:w-md lg:w-lg bg-neutral-800 text-white rounded-lg shadow-lg z-10"
        @keydown.esc="handleEscapeKey"
        role="dialog"
        aria-labelledby="search-results-title"
        aria-live="polite"
      >
        <h2 id="search-results-title" class="sr-only">Search Results</h2>
        <SearchListItem
          v-for="result in data"
          :key="result?.show?.id"
          :id="result?.show?.id"
          :image="result?.show?.image?.medium"
          :name="result?.show?.name"
          :period="`${result?.show?.premiered} - ${result?.show?.ended ?? 'Still running'}`"
          :rating="result?.show?.rating?.average"
        />
      </dialog>
    </div>
  </nav>
</template>
