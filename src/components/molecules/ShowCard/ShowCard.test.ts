import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import ShowCard from "./ShowCard.vue";

describe("ShowCard.vue", () => {
  it("renders show data and links to the show page", () => {
    const wrapper = mount(ShowCard, {
      props: {
        id: 123,
        name: "Star Wars: The Clone Wars",
        image: "https://image.url",
        rating: 8.9,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const link = wrapper.getComponent(RouterLinkStub);
    expect(link.props().to).toBe("/show/123");

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("https://image.url");
    expect(img.attributes("alt")).toBe("Poster of Star Wars: The Clone Wars");

    expect(wrapper.text()).toContain("Star Wars: The Clone Wars");
    expect(wrapper.text()).toContain("8.9");
  });

  it("shows fallback when rating is missing", () => {
    const wrapper = mount(ShowCard, {
      props: {
        id: 456,
        name: "Star Wars: The Clone Wars",
        image: undefined,
        rating: null,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Star Wars: The Clone Wars");
    expect(wrapper.text()).toContain("No rating");
  });
});
