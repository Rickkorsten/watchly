import { useQuery } from '@tanstack/vue-query';
import {fetchShowDetails} from "../api/shows.ts";
import type {ShowDetails} from "../types/Show.ts";

export function useShowDetails(showId: string) {
    return useQuery<ShowDetails>({
        queryKey: ['show', showId],
        queryFn: () => fetchShowDetails(showId),
    });
}
