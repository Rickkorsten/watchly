<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useShowDetails } from "../composables/useShowDetails";
import EpisodeCard from "@/components/molecules/EpisodeCard/EpisodeCard.vue";
import CastCard from "@/components/molecules/CastCard/CastCard.vue";
import ShowDetailsInfo from "@/components/organisms/ShowDetailsInfo/ShowDetailsInfo.vue";
import DetailPageSkeleton from "@/components/templates/DetailPageSkeleton/DetailPageSkeleton.vue";
import BackButton from "@/components/atoms/BackButton/BackButton.vue";

const route = useRoute();
const showId = route.params.id as string;

const { data, isLoading, error } = useShowDetails(showId);

const visibleCount = ref(8);

const cast = computed(() => data.value?._embedded?.cast || []);
const visibleCast = computed(() => cast.value.slice(0, visibleCount.value));

const loadMore = () => {
  visibleCount.value += 8;
};

const allCastLoaded = computed(
  () => visibleCast.value.length >= cast.value.length
);
</script>

<template>
  <div class="detail-page p-4">
    <BackButton to="/" />

    <div v-if="isLoading" class="space-y-6" role="status" aria-busy="true">
      <DetailPageSkeleton />
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
      <div
        class="flex flex-col lg:flex-row"
        :class="{ 'gap-8': data?.image?.original }"
      >
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

      <div v-if="cast.length" class="mt-12">
        <h2 class="text-3xl text-neutral-200 font-bold mb-6">Cast</h2>
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
        <div
          class="flex space-x-4 p-2 overflow-x-auto focus:outline-none focus:ring-none focus:ring-purple-none"
        >
          <EpisodeCard
            v-for="episode in data?._embedded?.episodes"
            :key="episode?.id"
            :id="episode?.id"
            :image="episode?.image?.original ?? data?.image?.original"
            :name="episode?.name"
            :episode="`Season ${episode?.season}, Episode ${episode?.number}`"
            :airdate="episode?.airdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
