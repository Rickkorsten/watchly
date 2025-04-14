<script setup lang="ts">
import { ref } from 'vue';
import {useShowsSearch} from "../../composables/useShowsSearch.ts";

// State for search query and results
const searchQuery = ref<string>('game of thrones');

const {data} = useShowsSearch(searchQuery);


const updateInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target)
  searchQuery.value = target.value;
};

function createDebounce() {
  let timeout: number | undefined = undefined;
  return function (callback: () => void, delayMs: number) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      callback();
    }, delayMs || 500);
  };
}

const debounce = createDebounce();

</script>

<template>
  <nav class="h-18 flex items-center justify-between px-4">
    <!-- Search Button -->
    <RouterLink to="/" class="text-neutral-100 font-bold text-2xl">
      🎬 Watchly
    </RouterLink>
    <div class="relative flex items-center">
      <div class="relative w-72">
        <input
            :value="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 pr-10 bg-neutral-800 text-white rounded-lg shadow-md"
            @input="(event) =>  {
              console.log(event?.target?.value)
              searchQuery = event?.target?.value
            }"

        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white"
        >
          <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
          />
        </svg>
      </div>

      <dialog
          v-if="searchQuery && data?.length"
          class="absolute flex flex-col top-full mt-2.5 left-0 w-72 bg-neutral-800 text-white rounded-lg shadow-lg z-10"
      >
        <RouterLink
            v-for="(result) in data"
            :key="result?.show?.id"
            :to="`/show/${result?.show?.id}`"
            class="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
        >
          <Image
              :src="result?.show?.image?.medium"
              :alt="`Poster of ${result?.show?.name}`"
              class="flex h-16 w-16 rounded-lg shadow-md mr-2" />
          <h3 class="font-medium text-md text-neutral-200 line-clamp-2">
          {{ result?.show?.name }}
          </h3>
        </RouterLink>
      </dialog>
    </div>
  </nav>
</template>

