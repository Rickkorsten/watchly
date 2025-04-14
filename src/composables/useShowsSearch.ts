import { useQuery } from '@tanstack/vue-query';
import type { SearchShow } from '../types/Show';
import { fetchShowsSearch} from "../api/shows.ts";
import type {Ref} from "vue";


export function useShowsSearch(searchQuery: Ref<string, string>) {
    return useQuery<SearchShow[]>({
        queryKey: ['shows-search', searchQuery],
        queryFn: () => fetchShowsSearch(searchQuery.value)
    });
}
