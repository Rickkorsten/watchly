import type { Show } from '../types/Show';

export function sortShowsByGenre(shows: Show[], genres: string[]): Record<string, Show[]> {
    const grouped: Record<string, Show[]> = {};
    const assignedShows = new Set<number>();

    genres.forEach((genre) => {
        grouped[genre] = shows
            .filter(show => show.genres.includes(genre) && !assignedShows.has(show.id))
            .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));

        grouped[genre].forEach(show => assignedShows.add(show.id));
    });

    return grouped;
}
