import type {SearchShow, Show, ShowDetails} from '../types/Show'
import {sortShowsByGenre} from "../helpers/sortShowsByGenre.ts";

const BASE_URL = 'https://api.tvmaze.com';

export const fetchShowDetails = async (showId: string): Promise<ShowDetails> => {
    const res = await fetch(`${BASE_URL}/shows/${showId}?embed[]=episodes&embed[]=cast`);
    if (!res.ok) throw new Error('Failed to fetch show details');
    return res.json();
};

export async function fetchShowsByGenre(genres: string[], maxPages = 5): Promise<Record<string, Show[]>> {
    const allShows: Show[] = [];

    for (let page = 0; page < maxPages; page++) {
        const res = await fetch(`${BASE_URL}/shows?page=${page}`);
        const data: Show[] = await res.json();
        allShows.push(...data);
    }

    return sortShowsByGenre(allShows, genres);
}

export async function fetchShowsSearch(searchQuery:string): Promise<SearchShow[]> {
    const queryParams = new URLSearchParams();
    queryParams.append("q", searchQuery);
    const res = await fetch(`${BASE_URL}/search/shows?${queryParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch show details');
    return await res.json();
}




