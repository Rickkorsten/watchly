import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DetailPageSkeleton from "./DetailPageSkeleton.vue"; // adjust path as needed
import Skeleton from "../../atoms/Skeleton/Skeleton.vue";

describe("SkeletonLayout.vue", () => {
  it("renders all skeleton sections correctly", () => {
    const wrapper = mount(DetailPageSkeleton);
    const skeletons = wrapper.findAllComponents(Skeleton);

    expect(skeletons).toHaveLength(15);

    const types = skeletons.map((s) => s.props("type"));
    expect(types.filter((t) => t === "image")).toHaveLength(5);
    expect(types.filter((t) => t === "title")).toHaveLength(3);
    expect(types.filter((t) => t === "text")).toHaveLength(3);
    expect(types.filter((t) => t === "card")).toHaveLength(4);
  });
});
