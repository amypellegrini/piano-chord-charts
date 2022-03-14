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

  it("highlights specific white keys from left to right", () => {
    const result = render({
      highlightKeys: ["C", "E", "G"],
    });

    expect(result).toMatchSnapshot();
  });

  it("highlights specific black keys from left to right", () => {
    const result = render({
      highlightKeys: ["Db", "Eb", "G#"],
    });

    expect(result).toMatchSnapshot();
  });

  it("highlights a mix of different keys from left to right", () => {
    const result = render({
      highlightKeys: ["Db", "E", "G#", "B"],
    });

    expect(result).toMatchSnapshot();
  });

  it("supports a custom size", () => {
    const result = render({
      size: 5,
    });

    expect(result).toMatchSnapshot();
  });

  it("starts from a given white key", () => {
    const result = render({
      startFrom: "F",
    });

    expect(result).toMatchSnapshot();
  });
});
