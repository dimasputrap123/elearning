import { findByAttr, setup } from "helper/testHelper";
import React from "react";
import NoVideo from "./NoVideo";

describe("No Video component", () => {
  describe("have props", () => {
    let component;
    it("should render with connected=true", () => {
      component = setup(<NoVideo connected={true} />);
      const wrapper = findByAttr(component, "connecting-text");
      expect(wrapper.length).toBe(1);
    });
    it("should render with connected=false", () => {
      component = setup(<NoVideo connected={false} />);
      const wrapper = findByAttr(component, "connecting-text");
      expect(wrapper.length).toBe(0);
    });
  });
  describe("have no props", () => {
    let component;
    it("should render without error", () => {
      component = setup(<NoVideo />);
      const wrapper = findByAttr(component, "connecting-text");
      expect(wrapper.length).toBe(0);
    });
  });
});
