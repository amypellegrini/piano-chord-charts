import template, { render, renderWhiteKeys, WhiteKey } from "../template";

describe("default chart template", () => {
  it("renders correctly", () => {
    expect(template).toMatchSnapshot();
  });
});

describe("renderWhiteKeys", () => {
  it("renders white keys default SVG content with a given height", () => {
    expect(renderWhiteKeys(120)).toMatchSnapshot();
  });

  it("highlights specific white keys from left to right", () => {
    const highlightKeys: WhiteKey[] = ["C", "E", "G"];
    expect(renderWhiteKeys(120, highlightKeys)).toMatchSnapshot();
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
      highlightKeys: ["C", "E", "G"] as WhiteKey[],
    });

    expect(result).toMatchSnapshot();
  });
});
