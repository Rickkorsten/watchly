import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import EpisodeCard from "./EpisodeCard.vue";
import Card from "@/components/atoms/Card/Card.vue";

describe("EpisodeCard.vue", () => {
  it("renders card with name, episode and airdate", () => {
    const wrapper = mount(EpisodeCard, {
      props: {
        id: 1,
        image: "https://example.com/image.jpg",
        name: "Episode Title",
        episode: "Season 1 - Episode 1",
        airdate: "2023-01-01",
      },
      global: {
        stubs: {
          Card: Card, // if you want to test slot rendering
        },
      },
    });

    const card = wrapper.getComponent(Card);
    expect(card.props("image")).toBe("https://example.com/image.jpg");
    expect(card.props("name")).toBe("Episode Title");
    expect(card.props("hasHover")).toBe(false);

    expect(wrapper.text()).toContain("Episode Title");
    expect(wrapper.text()).toContain("Season 1 - Episode 1");
    expect(wrapper.text()).toContain("2023-01-01");
  });
});
