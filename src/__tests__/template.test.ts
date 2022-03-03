import template, { render } from "../template";

describe("default chart template", () => {
  it("renders correctly", () => {
    expect(template).toMatchSnapshot();
  });
});

describe("render", () => {
  it("renders a default chart when no args are given", () => {
    const result = render();
    expect(result).toMatchSnapshot();
  });

  it("renders gvien content inside the template", () => {
    const result = render("text content");
    expect(result).toMatchSnapshot();
  });
});
