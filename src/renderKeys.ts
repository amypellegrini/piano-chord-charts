import { KeyboardChartLayout, BlackKey, WhiteKey } from "./types";

type OffsetKey = "C" | "D" | "F" | "G" | "A";

type OffsetKeyMap = {
  [key in OffsetKey]: number;
};

const keyNames = ["C", "D", "E", "F", "G", "A", "B"];
const whiteKeyWidth = 23;

const offsetFromWhiteKeyMap: OffsetKeyMap = {
  C: 14.33333,
  D: 18.66666,
  F: 13.25,
  G: 16.25,
  A: 19.75,
};

const layoutSettingsMap = {
  exact: {
    whiteKeyHeight: 120,
    blackKeyHeight: 80,
  },
  compact: {
    whiteKeyHeight: 65,
    blackKeyHeight: 40,
  },
};

function renderKeys(
  layout: KeyboardChartLayout,
  highlightKeys: Array<WhiteKey | BlackKey>
) {
  const size = 14;

  const whiteKeyHeight = layoutSettingsMap[layout].whiteKeyHeight;
  const blackKeyHeight = layoutSettingsMap[layout].blackKeyHeight;

  const highlightColour = "#a0c6e8";

  let whiteKeys = "";
  let blackKeys = "";
  let highlightIdx = 0;

  for (let count = 0; count < size; count++) {
    const keyNameIdx = count < 7 ? count : count % 7;
    const keyName = keyNames[keyNameIdx];
    const whiteKeyX = count * whiteKeyWidth;

    let whiteKeyColour = "#fafafa";

    if (highlightKeys) {
      if (
        highlightIdx < highlightKeys.length &&
        highlightKeys[highlightIdx] === keyName
      ) {
        whiteKeyColour = highlightColour;
        highlightIdx += 1;
      }
    }

    whiteKeys = whiteKeys.concat(
      `<rect style="fill:${whiteKeyColour};stroke:black" x="${whiteKeyX}" y="0" width="23" height="${whiteKeyHeight}" ry="3"></rect>\n`
    );

    if (offsetFromWhiteKeyMap[keyName as OffsetKey]) {
      const offset = offsetFromWhiteKeyMap[keyName as OffsetKey];
      const blackKeyX = count * whiteKeyWidth + offset;

      let blackKeycolour = "#222222";

      blackKeys = blackKeys.concat(
        `<rect style="fill:${blackKeycolour};stroke:black" x="${blackKeyX}" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>\n`
      );
    }
  }

  return `${whiteKeys}${blackKeys}`;
}

export default renderKeys;
