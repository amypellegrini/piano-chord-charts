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

  describe("left edge", () => {
    const blackKeyXs = (svg: string) =>
      [...svg.matchAll(/fill:#222222;stroke:black" x="(-?[\d.]+)"/g)].map(
        (m) => Number(m[1])
      );

    // The black key left of the first white key overhangs the edge, so it shows partially,
    // like the black key right of the last white key does on the right edge.
    it.each([
      ["B", -23 + 19.75], // A#
      ["A", -23 + 16.25], // G#
      ["G", -23 + 13.25], // F#
      ["E", -23 + 18.66666], // D#
      ["D", -23 + 14.33333], // C#
    ])("draws the partial black key left of %s", (startFrom, x) => {
      const svg = renderKeys("compact", [], 5, startFrom as WhiteKey);
      expect(blackKeyXs(svg)[0]).toBeCloseTo(x);
      expect(blackKeyXs(svg).filter((bx) => bx < 0)).toHaveLength(1);
    });

    it.each(["C", "F"])(
      "draws no black key left of %s, which has none",
      (startFrom) => {
        const svg = renderKeys("compact", [], 5, startFrom as WhiteKey);
        expect(blackKeyXs(svg).filter((bx) => bx < 0)).toHaveLength(0);
      }
    );

    it("keeps the black keys in left-to-right order", () => {
      const xs = blackKeyXs(renderKeys("compact", [], 8, "B"));
      expect(xs).toEqual([...xs].sort((a, b) => a - b));
    });

    it("still highlights keys from the first white key on", () => {
      // The edge key is outside the chart: an A# highlight goes to the A# inside it.
      const svg = renderKeys("compact", ["A#"], 8, "B");
      const highlighted = [
        ...svg.matchAll(/fill:#a0c6e8;stroke:black" x="(-?[\d.]+)"/g),
      ].map((m) => Number(m[1]));
      expect(highlighted).toHaveLength(1);
      expect(highlighted[0]).toBeCloseTo(6 * 23 + 19.75);
    });
  });

  it("starts from a given white key", () => {
    const result = renderKeys("compact", ["F#", "F#", "C#"], 15, "F");
    expect(result).toMatchSnapshot();
  });
});
