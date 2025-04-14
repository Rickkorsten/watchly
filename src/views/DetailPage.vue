<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShowDetails } from "../composables/useShowDetails";
import EpisodeCard from "../components/EpisodeCard/EpisodeCard.vue";
import CastCard from "../components/CastCard/CastCard.vue";
import Skeleton from "../components/Skeleton/Skeleton.vue";
import ShowDetailsInfo from "../components/ShowDetailsInfo/ShowDetailsInfo.vue";

const route = useRoute();
const showId = route.params.id as string;

const { data, isLoading, error } = useShowDetails(showId);

// Track how many cast members to show
const visibleCount = ref(8);

// Computed visible cast
const cast = computed(() => data.value?._embedded?.cast || []);
const visibleCast = computed(() => cast.value.slice(0, visibleCount.value));

const loadMore = () => {
  visibleCount.value += 8;
};

const allCastLoaded = computed(() => visibleCast.value.length >= cast.value.length);
</script>

<template>
  <div class="detail-page p-4">
    <!-- Back Button -->
    <RouterLink
        to="/"
        class="flex items-center w-fit mb-4 px-2 py-2 text-white text-bold rounded hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
      </svg>
      <span class="ml-2">Back</span>
    </RouterLink>

    <div v-if="isLoading" class="space-y-6" role="status" aria-busy="true">
      <!-- Skeleton for Show Details -->
      <div class="flex flex-col lg:flex-row gap-8">
        <Skeleton type="image" />
        <div class="flex-1 space-y-4">
          <Skeleton type="title" />
          <Skeleton type="text" />
          <Skeleton type="text" />
          <Skeleton type="text" />
        </div>
      </div>

      <!-- Skeleton for Cast Section -->
      <div>
        <Skeleton type="title" />
        <div class="grid grid-cols-2 mt-4 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <Skeleton v-for="n in 4" :key="n" type="card" />
        </div>
      </div>

      <!-- Skeleton for Episodes Section -->
      <div>
        <Skeleton type="title" />
        <div class="flex space-x-4 p-2 mt-4 overflow-x-auto">
          <Skeleton v-for="n in 4" :key="n" type="image" />
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else>
      <!-- Show Details -->
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="flex-shrink-0">
          <img
              v-if="data?.image?.original"
              :src="data?.image.original"
              :alt="data?.name"
              class="rounded-lg shadow-lg w-full max-h-80 sm:max-h-64 object-cover"
          />
        </div>
        <div class="flex-1">
          <ShowDetailsInfo
              :name="data?.name"
              :summary="data?.summary"
              :genres="data?.genres"
              :rating="data?.rating?.average"
              :language="data?.language"
              :premiered="data?.premiered"
              :status="data?.status"
              :runtime="data?.runtime"
              :network="data?.network?.name"
          />
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-3xl font-bold mb-6">Cast</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <CastCard
              v-for="member in visibleCast"
              :key="member.person.id"
              :image="member.person.image?.medium"
              :name="member.person.name"
              :character="member.character.name"
          />
        </div>

        <button
            v-if="!allCastLoaded"
            @click="loadMore"
            class="flex mt-4 px-4 py-2 justify-self-center text-purple-500 rounded hover:text-purple-800"
        >
          Load More
        </button>
      </div>

      <div class="mt-12">
        <h2 class="text-3xl font-bold text-neutral-200 mb-4">Episodes</h2>
        <div class="flex space-x-4 p-2 overflow-x-auto">
          <EpisodeCard
              v-for="episode in data?._embedded?.episodes"
              :key="episode.id"
              :id="episode.id"
              :image="episode.image?.original ?? data?.image?.original"
              :name="episode.name"
              :season="episode.season"
              :number="episode.number"
              :airdate="episode.airdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
