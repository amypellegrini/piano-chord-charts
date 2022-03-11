type KeyboardChartFormat = "compact" | "exact";

export type WhiteKey = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type BlackKey =
  | "C#"
  | "D#"
  | "F#"
  | "G#"
  | "A#"
  | "Db"
  | "Eb"
  | "Gb"
  | "Ab"
  | "Bb";

type RenderOptions = {
  format?: KeyboardChartFormat;
  highlightKeys?: Array<WhiteKey | BlackKey>;
};

type OffsetKey = "C" | "D" | "F" | "G" | "A";

type OffsetKeyMap = {
  [key in OffsetKey]: number;
};

const keyNames = ["C", "D", "E", "F", "G", "A", "B"];

function renderWhiteKeys(height: number, highlightKeys?: WhiteKey[]) {
  const amount = 14;
  const width = 23;

  let keyX = 0;
  let result = "";
  let highlightIdx = 0;

  for (let count = 0; count < amount; count++) {
    const keyName = keyNames[count] || keyNames[count - 7];

    let colour = "#fafafa";

    if (highlightKeys) {
      if (
        highlightIdx < highlightKeys.length &&
        highlightKeys[highlightIdx] === keyName
      ) {
        colour = "#a0c6e8";
        highlightIdx += 1;
      }
    }

    keyX = count * width;

    result = result.concat(
      `<rect style="fill:${colour};stroke:black" x="${keyX}" y="0" width="23" height="${height}" ry="3"></rect>\n`
    );
  }

  return result;
}

function renderBlackKeys(height: number, highlightKeys?: BlackKey[]) {
  const whiteKeysAmount = 14;
  const whiteKeyWidth = 23;

  const offsetFromWhiteKeyMap: OffsetKeyMap = {
    C: 14.33333,
    D: 18.66666,
    F: 13.25,
    G: 16.25,
    A: 19.75,
  };

  const flatToSharpMap: { [key: string]: string } = {
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
    Ab: "G#",
    Bb: "A#",
  };

  let result = "";
  let highlightIdx = 0;

  for (let count = 0; count < whiteKeysAmount; count++) {
    const keyName = keyNames[count] || keyNames[count - 7];
    const blackKeyName = keyName + "#";

    let colour = "black";
    let highlightKeyName = (highlightKeys && highlightKeys[highlightIdx]) || "";

    if (highlightKeyName.match(/b/)) {
      highlightKeyName = flatToSharpMap[highlightKeyName];
    }

    if (keyName in offsetFromWhiteKeyMap) {
      if (highlightKeys && blackKeyName === highlightKeyName) {
        colour = "#a0c6e8";
        highlightIdx++;
      }

      const offset = offsetFromWhiteKeyMap[keyName as OffsetKey];
      const keyX = count * whiteKeyWidth + offset;

      result = result.concat(
        `<rect style="fill:${colour};stroke:black" x="${keyX}" y="0" width="13" height="${height}" ry="1"></rect>\n`
      );
    }
  }

  return result;
}

function render(options?: RenderOptions) {
  let height = 65;
  let blackKeyHeight = 40;

  const format: KeyboardChartFormat = options?.format || "compact";

  if (format === "exact") {
    height = 120;
    blackKeyHeight = 80;
  }

  const highlightWhiteKeys = options?.highlightKeys?.filter((key) => {
    return !!key.match(/(A|B|C|D|E|F|G)$/);
  });

  const highlightBlackKeys = options?.highlightKeys?.filter((key) => {
    return !!key.match(/(A#|C#|D#|F#|G#)$/);
  });

  const defaultContent = `${renderWhiteKeys(
    height,
    highlightWhiteKeys as WhiteKey[]
  )}${renderBlackKeys(
    blackKeyHeight,
    highlightBlackKeys as BlackKey[]
  )}<rect y="0" width="322" height="3"></rect>`;

  const template = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="322" height="120" viewBox="0 0 322 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${defaultContent}
  </svg>`;

  return template;
}

const template = render();

export { render, renderWhiteKeys, renderBlackKeys };
export default template;
