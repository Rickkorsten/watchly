<script setup lang="ts">
import { useShowsByGenre } from '../composables/useShowsByGenre';
import ShowCard from "../components/ShowCard.vue";
import ShowCardSkeleton from "../components/ShowCardSkeleton.vue";
import ShowCardListSkeleton from "../components/ShowCardListSkeleton.vue";
import ShowCardList from "../components/ShowCardList.vue";

const { data, isLoading, error } = useShowsByGenre();
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4" id="page-title">🎬 Watchly</h1>
    <div v-if="isLoading" aria-live="polite" aria-busy="true">
      <ShowCardListSkeleton
          v-for="n in 3"
          :key="n"
      >
        <ShowCardSkeleton v-for="i in 5" :key="i" aria-hidden="true" />
      </ShowCardListSkeleton>
    </div>
    <div v-else-if="error" class="text-center text-red-500" role="alert">
      Error: {{ error.message }}
    </div>
    <div v-else>
      <ShowCardList
          v-for="(shows, genre) in data"
          :key="genre"
          :genre="genre"
      >
        <ShowCard
            v-for="show in shows"
            :key="show.id"
            :id="show.id"
            :image="show?.image?.original"
            :name="show?.name"
            :rating="show?.rating?.average"
        />
      </ShowCardList>
    </div>
  </div>
</template>
