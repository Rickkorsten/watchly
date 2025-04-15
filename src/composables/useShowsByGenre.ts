import { useQuery } from "@tanstack/vue-query";
import { type Show } from "../types/Show";
import { fetchShowsByGenre } from "../api/shows.ts";

export function useShowsByGenre(genres: string[]) {
  return useQuery<Record<string, Show[]>>({
    queryKey: ["shows-by-genre"],
    queryFn: () => fetchShowsByGenre(genres, 5),
  });
}
