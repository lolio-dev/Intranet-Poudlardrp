// @vitest-environment happy-dom
import { describe, it, expect } from "vitest"
import { createVuetify } from "vuetify"

import { mount } from "@vue/test-utils"
import View from "../views/View.vue";

describe("HelloWorld", () => {
  const vuetify = createVuetify()

  it("renders", () => {
    const wrapper = mount(View, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.text()).toContain("lorem");
  })
})
