import renderKeys from "../renderKeys";
import { BlackKey, KeyboardChartLayout, WhiteKey } from "../types";

describe("renderKeys", () => {
  it.each(["compact", "exact"])(
    "renders keys with the correct layout format",
    (layout) => {
      expect(
        renderKeys(layout as KeyboardChartLayout, [], 14, "C")
      ).toMatchSnapshot();
    }
  );

  it("highlights specific white keys from left to right", () => {
    const highlightKeys = ["C", "E", "G", "C"];
    const result = renderKeys(
      "compact",
      highlightKeys as Array<WhiteKey | BlackKey>,
      14,
      "C"
    );
    expect(result).toMatchSnapshot();
  });

  it("highlights sharp black keys from left to right", () => {
    const highlightKeys: BlackKey[] = ["C#", "D#", "F#"];
    expect(renderKeys("compact", highlightKeys, 14, "C")).toMatchSnapshot();
  });

  it("highlights flat black keys from left to right", () => {
    const highlightKeys: BlackKey[] = ["Db", "Eb", "Gb"];
    const result = renderKeys("compact", highlightKeys, 14, "C");
    expect(result).toMatchSnapshot();
  });

  it("supports custom size", () => {
    const result = renderKeys("compact", [], 5, "C");
    expect(result).toMatchSnapshot();
  });

  it("starts from a given white key", () => {
    const result = renderKeys("compact", ["F#", "F#", "C#"], 15, "F");
    expect(result).toMatchSnapshot();
  });
});
