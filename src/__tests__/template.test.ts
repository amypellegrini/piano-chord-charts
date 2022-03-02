import template, { render } from "../template";

describe("default chart template", () => {
  it("renders correctly", () => {
    expect(template).toMatchSnapshot();
  });
});

describe("render", () => {
  it("should render default chart when no args are given", () => {
    const result = render();
    expect(result).toMatchSnapshot();
  });
});
