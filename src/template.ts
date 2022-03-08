type KeyboardChartFormat = "compact" | "exact";

export type WhiteKey = "C" | "D" | "E" | "F" | "G" | "A" | "B";

type RenderOptions = {
  format?: KeyboardChartFormat;
  highlightKeys?: WhiteKey[];
};

function renderWhiteKeys(height: number, highlightKeys?: WhiteKey[]) {
  const amount = 14;
  const width = 23;
  const keyNames = ["C", "D", "E", "F", "G", "A", "B"];

  let keyX = 0;
  let result = "";
  let highlightIdx = 0;

  for (let count = 0; count < amount; count++) {
    let colour = "#fafafa";

    if (highlightKeys) {
      if (
        highlightIdx < highlightKeys.length &&
        highlightKeys[highlightIdx] === keyNames[count]
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

function render(options?: RenderOptions) {
  let height = 65;
  let blackKeyHeight = 40;

  const format: KeyboardChartFormat = options?.format || "compact";

  if (format === "exact") {
    height = 120;
    blackKeyHeight = 80;
  }

  const defaultContent = `${renderWhiteKeys(height, options?.highlightKeys)}
<rect style="fill:black;stroke:black" x="14.33333" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="41.66666" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="82.25" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="108.25" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="134.75" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="175.33333" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="202.66666" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="243.25" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="269.25" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect style="fill:black;stroke:black" x="295.75" y="0" width="13" height="${blackKeyHeight}" ry="1"></rect>
<rect y="0" width="322" height="3"></rect>`;

  const template = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="322" height="120" viewBox="0 0 322 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${defaultContent}
  </svg>`;

  return template;
}

const template = render();

export { render, renderWhiteKeys };
export default template;
