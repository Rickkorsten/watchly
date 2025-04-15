import { describe, it, expect, vi, beforeEach } from "vitest";
import { useShowsByGenre } from "../useShowsByGenre";
import { fetchShowsByGenre } from "../../api/shows";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import type { Show } from "../../types/Show.ts";

vi.mock("../../api/shows", () => ({
  fetchShowsByGenre: vi.fn(),
}));

const mockShows: Record<string, Show[]> = {
  Drama: [
    {
      id: 1,
      url: "https://example.com/show/1",
      name: "Breaking Bad",
      type: "Scripted",
      language: "English",
      genres: ["Drama"],
      status: "Ended",
      runtime: 60,
      schedule: {
        time: "21:00",
        days: ["Sunday"],
      },
      rating: {
        average: 9.5,
      },
      weight: 100,
      network: {
        id: 1,
        name: "AMC",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: {
        tvrage: null,
        thetvdb: 81189,
        imdb: "tt0903747",
      },
      image: {
        medium: "https://example.com/image.jpg",
        original: "https://example.com/original.jpg",
      },
      summary:
        "A high school chemistry teacher turned methamphetamine producer.",
      updated: 1620000000,
      _links: {
        self: {
          href: "https://api.example.com/shows/1",
        },
      },
    },
  ],
  Comedy: [
    {
      id: 2,
      url: "https://example.com/show/2",
      name: "Brooklyn Nine-Nine",
      type: "Scripted",
      language: "English",
      genres: ["Comedy"],
      status: "Ended",
      runtime: 30,
      schedule: {
        time: "20:00",
        days: ["Thursday"],
      },
      rating: {
        average: 8.4,
      },
      weight: 90,
      network: {
        id: 2,
        name: "NBC",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: {
        tvrage: null,
        thetvdb: 269586,
        imdb: "tt2467372",
      },
      image: {
        medium: "https://example.com/image2.jpg",
        original: "https://example.com/original2.jpg",
      },
      summary: "A comedy about detectives in a New York precinct.",
      updated: 1620000001,
      _links: {
        self: {
          href: "https://api.example.com/shows/2",
        },
      },
    },
  ],
};

describe("useShowsByGenre", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.mocked(fetchShowsByGenre).mockResolvedValue(mockShows);
  });

  it("fetches shows grouped by genre", async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { data, isSuccess } = useShowsByGenre(["Drama", "Comedy"]);
          return () =>
            h(
              "div",
              isSuccess.value ? JSON.stringify(data.value) : "Loading..."
            );
        },
      }),
      {
        global: {
          plugins: [[VueQueryPlugin, { queryClient }]],
        },
      }
    );

    expect(wrapper.html()).toContain("Loading...");

    // Wait for data to populate
    while (!wrapper.html().includes("Breaking Bad")) {
      await nextTick();
    }

    expect(wrapper.html()).toContain("Breaking Bad");
    expect(wrapper.html()).toContain("Brooklyn Nine-Nine");
    expect(fetchShowsByGenre).toHaveBeenCalledWith(["Drama", "Comedy"], 5);
  });
});
