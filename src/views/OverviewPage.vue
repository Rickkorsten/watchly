<script setup lang="ts">
import { useShowsByGenre } from '../composables/useShowsByGenre';
import ShowCard from "../components/ShowCard/ShowCard.vue";
import ShowCardList from "../components/ShowCardList/ShowCardList.vue";
import Skeleton from "../components/Skeleton/Skeleton.vue";

const genres = ['Anime', 'Comedy', 'Thriller', 'Drama', 'Fantasy', 'Nature'];

const { data, isLoading, error } = useShowsByGenre(genres);
</script>

<template>
  <div class="p-4">
    <div v-if="isLoading" aria-live="polite" aria-busy="true">
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
