import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Task from "./Task.vue";

describe("Test.vue", () => {
  it("Рендерится как надо", () => {
    const wrapper = mount(Task, {
      props: { name: "xyz", comment: "i am comment for xyz" },
    });

    expect(wrapper.find('[data-testid="name"]').text()).toMatchInlineSnapshot(`"xyz"`);
    expect(
      wrapper.find('[data-testid="comment"]').text()
    ).toMatchInlineSnapshot(`"i am comment for xyz"`);
  });
});
