import renderKeys from "../renderKeys";
import { BlackKey, KeyboardChartLayout, WhiteKey } from "../types";

describe("renderKeys", () => {
  it.each(["compact", "exact"])(
    "renders keys with the correct layout format",
    (layout) => {
      expect(renderKeys(layout as KeyboardChartLayout)).toMatchSnapshot();
    }
  );
});
