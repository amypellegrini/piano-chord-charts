import renderKeys from "../renderKeys";
import { BlackKey, KeyboardChartLayout, WhiteKey } from "../types";

describe("renderKeys", () => {
  it.each(["compact", "exact"])(
    "renders keys with the correct layout format",
    (layout) => {
      expect(renderKeys(layout as KeyboardChartLayout, [])).toMatchSnapshot();
    }
  );

  it("highlights specific white keys from left to right", () => {
    const highlightKeys = ["C", "E", "G", "C"];
    const result = renderKeys(
      "compact",
      highlightKeys as Array<WhiteKey | BlackKey>
    );
    expect(result).toMatchSnapshot();
  });
});
