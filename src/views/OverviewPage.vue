<script setup lang="ts">
import { useShowsByGenre } from "../composables/useShowsByGenre";
import ShowCard from "../components/molecules/ShowCard/ShowCard.vue";
import ShowCardList from "../components/organisms/ShowCardList/ShowCardList.vue";
import OverviewPageSkeleton from "../components/templates/OverviewPageSkeleton/OverviewPageSkeleton.vue";

const genres = ["Anime", "Comedy", "Thriller", "Drama", "Fantasy", "Nature"];
const { data, isLoading, error } = useShowsByGenre(genres);
</script>

<template>
  <div class="p-4">
    <div v-if="isLoading" aria-live="polite" aria-busy="true">
      <OverviewPageSkeleton />
    </div>
    <div
      v-else-if="error"
      class="h-svh flex items-center justify-center"
      role="alert"
      aria-live="assertive"
    >
      <p class="text-lg text-red-500">
        Could not load TV shows, please try again later.
      </p>
    </div>
    <div v-else>
      <h1 class="text-5xl text-neutral-200 font-extrabold mb-6">TV Shows</h1>
      <ShowCardList v-for="(shows, genre) in data" :key="genre" :genre="genre">
        <ShowCard
          v-for="show in shows"
          :key="show?.id"
          :id="show?.id"
          :image="show?.image?.original"
          :name="show?.name"
          :rating="show?.rating?.average"
        />
      </ShowCardList>
    </div>
  </div>
</template>
