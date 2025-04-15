import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ShowDetailsInfo from "./ShowDetailsInfo.vue";

describe("ShowDetailsSection", () => {
  const defaultProps = {
    name: "Breaking Bad",
    summary: "<p>A high school chemistry teacher turned meth kingpin.</p>",
    genres: ["Drama", "Crime", "Thriller"],
    rating: 9.5,
    language: "English",
    premiered: "2008-01-20",
    status: "Ended",
    runtime: 47,
    network: "AMC",
  };

  it("renders the show name", () => {
    const wrapper = mount(ShowDetailsInfo, {
      props: defaultProps,
    });
    expect(wrapper.text()).toContain("Breaking Bad");
  });

  it("renders the summary as HTML", () => {
    const wrapper = mount(ShowDetailsInfo, {
      props: defaultProps,
    });
    expect(wrapper.html()).toContain(
      "<p>A high school chemistry teacher turned meth kingpin.</p>"
    );
  });

  it("renders genres correctly", () => {
    const wrapper = mount(ShowDetailsInfo, {
      props: defaultProps,
    });
    const genreTags = wrapper.findAll("span");
    expect(genreTags).toHaveLength(3);
    expect(genreTags.map((tag) => tag.text())).toEqual([
      "Drama",
      "Crime",
      "Thriller",
    ]);
  });

  it("renders fallback text for missing values", () => {
    const wrapper = mount(ShowDetailsInfo, {
      props: {
        name: "No Info Show",
      },
    });
    expect(wrapper.text()).toContain("Rating: N/A");
    expect(wrapper.text()).toContain("Language: N/A");
    expect(wrapper.text()).toContain("Premiered: N/A");
    expect(wrapper.text()).toContain("Status: N/A");
    expect(wrapper.text()).toContain("Runtime: N/A");
    expect(wrapper.text()).toContain("Network: N/A");
  });
});
