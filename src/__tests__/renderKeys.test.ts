import renderKeys from "../renderKeys";
import { KeyboardChartLayout } from "../types";

describe("renderKeys", () => {
  it.each(["compact", "exact"])(
    "renders keys with the correct layout format",
    (layout) => {
      expect(renderKeys(layout as KeyboardChartLayout)).toMatchSnapshot();
    }
  );
});
