import { findByAttr, setup } from "helper/testHelper";
import React from "react";
import RoomPage from "./RoomPage";

describe("Room Page Componnet", () => {
  let component;
  beforeEach(() => {
    component = setup(<RoomPage />);
  });
  it("should render Room Page without error", () => {
    const wrapper = findByAttr(component, "room-container");
    expect(wrapper.length).toBe(1);
  });
});
