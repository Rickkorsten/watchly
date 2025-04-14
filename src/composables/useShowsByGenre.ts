import { useQuery } from '@tanstack/vue-query';
import { type Show } from '../types/Show';

const genres = ['Anime', 'Comedy', 'Thriller', 'Drama', 'Fantasy', 'Nature'];

export function useShowsByGenre() {
    return useQuery<Record<string, Show[]>>({
        queryKey: ['shows-by-genre'],
        queryFn: async () => {
            const allShows: Show[] = [];

            // Fetch a few pages (e.g., first 5)
            for (let page = 0; page < 5; page++) {
                const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
                const data: Show[] = await res.json();
                allShows.push(...data);
            }

            const grouped: Record<string, Show[]> = {};
            const assignedShows = new Set<number>(); // Track assigned show IDs

            genres.forEach((genre) => {
                grouped[genre] = allShows
                    .filter(show => show.genres.includes(genre) && !assignedShows.has(show.id))
                    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));

                // Mark shows as assigned
                grouped[genre].forEach(show => assignedShows.add(show.id));
            });

            return grouped;
        },
    });
}
