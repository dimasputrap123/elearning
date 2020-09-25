import { shallow, mount, render } from "enzyme";

export const setup = (component, method = "shallow") => {
  const func = {
    shallow,
    mount,
    render,
  };
  const result = func[method](component);
  return result;
};

export const findByAttr = (component, attrib) => {
  const wrapper = component.find(`[data-test='${attrib}']`);
  return wrapper;
};
