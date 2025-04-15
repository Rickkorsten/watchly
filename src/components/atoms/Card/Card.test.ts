import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

describe("Card.vue", () => {
  it("renders image with correct src and alt", () => {
    const wrapper = mount(Card, {
      props: {
        image: "https://example.com/image.jpg",
        name: "Example Show",
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/image.jpg");
    expect(img.attributes("alt")).toBe("Poster of Example Show");
  });

  it("shows hover class when hasHover is true (default)", () => {
    const wrapper = mount(Card);
    const overlay = wrapper.get('[id="overlay"]');
    expect(overlay.classes()).toContain("opacity-0");
    expect(overlay.classes()).toContain("group-hover:opacity-100");
  });

  it("shows full opacity when hasHover is false", () => {
    const wrapper = mount(Card, {
      props: {
        hasHover: false,
        image: "https://example.com/image.jpg",
        name: "Example Show",
      },
    });

    const overlay = wrapper.get('[id="overlay"]');
    expect(overlay.classes()).toContain("opacity-100");
    expect(overlay.classes()).not.toContain("group-hover:opacity-100");
  });

  it("renders slot content", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "<p>Slot content</p>",
      },
    });

    expect(wrapper.text()).toContain("Slot content");
  });
});
