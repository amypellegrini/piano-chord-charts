import template, { render } from "../template";

describe("default chart template", () => {
  it("renders correctly", () => {
    expect(template).toMatchSnapshot();
  });
});

describe("render", () => {
  it("renders a default compact chart when no options are given", () => {
    const result = render();
    expect(result).toMatchSnapshot();
  });

  it("renders compact and exact versions of the keyboard", () => {
    const defaultRender = render();

    const withCompactOption = render({
      format: "compact",
    });

    const withExactOption = render({
      format: "exact",
    });

    expect(defaultRender).toEqual(withCompactOption);
    expect(defaultRender).not.toEqual(withExactOption);
    expect(withExactOption).toMatchSnapshot();
  });
});
