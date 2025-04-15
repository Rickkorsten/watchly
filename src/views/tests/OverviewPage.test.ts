import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import OverviewPage from "../OverviewPage.vue";
import { useShowsByGenre } from "@/composables/useShowsByGenre";

// Mock the composable
vi.mock("@/composables/useShowsByGenre");

describe("OverviewPage.vue", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders loading skeleton while loading", () => {
    (useShowsByGenre as ReturnType<typeof vi.fn>).mockReturnValue({
      data: ref(null),
      isLoading: ref(true),
      error: ref(null),
    });

    const wrapper = mount(OverviewPage);
    expect(wrapper.html()).toContain('aria-busy="true"');
  });

  it("shows error message if error occurs", () => {
    (useShowsByGenre as ReturnType<typeof vi.fn>).mockReturnValue({
      data: ref(null),
      isLoading: ref(false),
      error: ref(new Error("Fetch failed")),
    });

    const wrapper = mount(OverviewPage);
    expect(wrapper.text()).toContain("Could not load TV shows");
  });

  it("renders show list when data is loaded", () => {
    (useShowsByGenre as ReturnType<typeof vi.fn>).mockReturnValue({
      data: ref({
        Anime: [
          {
            id: 1,
            name: "Naruto",
            image: { original: "https://example.com/naruto.jpg" },
            rating: { average: 8.7 },
          },
        ],
        Comedy: [
          {
            id: 2,
            name: "Brooklyn Nine-Nine",
            image: { original: "https://example.com/b99.jpg" },
            rating: { average: 8.3 },
          },
        ],
      }),
      isLoading: ref(false),
      error: ref(null),
    });

    const wrapper = mount(OverviewPage);

    // Check for genre headers and show names
    expect(wrapper.text()).toContain("TV Shows");
    expect(wrapper.text()).toContain("Naruto");
    expect(wrapper.text()).toContain("Brooklyn Nine-Nine");

    // Check for images
    const images = wrapper.findAll("img");
    expect(images.length).toBeGreaterThan(0);
  });
});
