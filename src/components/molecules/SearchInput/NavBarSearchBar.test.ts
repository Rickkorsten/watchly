import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavBarSearchInput from "./NavBarSearchInput.vue";

describe("SearchInput.vue", () => {
  it("emits update:searchQuery when typing", async () => {
    const wrapper = mount(NavBarSearchInput, {
      props: {
        searchQuery: "",
      },
    });

    const input = wrapper.get("input");
    await input.setValue("New Value");

    // assert emitted event
    expect(wrapper.emitted()["update:searchQuery"]).toBeTruthy();
    expect(wrapper.emitted()["update:searchQuery"]![0]).toEqual(["New Value"]);
  });

  it("emits esc-pressed when pressing Escape", async () => {
    const wrapper = mount(NavBarSearchInput, {
      props: {
        searchQuery: "",
      },
    });

    const input = wrapper.get("input");
    await input.trigger("keydown", { key: "Escape" });

    expect(wrapper.emitted()["esc-pressed"]).toBeTruthy();
  });
});
