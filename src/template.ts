const defaultContent = `<rect style="fill:#fafafa;stroke:black" x="0" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="23" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="46" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="69" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="92" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="115" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="138" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="161" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="184" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="207" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="230" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="253" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="276" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="299" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:black;stroke:black" x="14.33333" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="41.66666" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="82.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="108.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="134.75" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="175.33333" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="202.66666" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="243.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="269.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="295.75" y="0" width="13" height="80" ry="1"></rect>
<rect y="0" width="322" height="3"></rect>`;

type KeyboardChartFormat = "compact" | "exact";

type RenderOptions = {
  format?: KeyboardChartFormat;
};

function render(options?: RenderOptions) {
  let height = 65;
  let blackKeyHeight = 40;

  const format: KeyboardChartFormat = options?.format || "compact";

  if (format === "exact") {
    height = 120;
    blackKeyHeight = 80;
  }

  const defaultContent = `<rect style="fill:#fafafa;stroke:black" x="0" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="23" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="46" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="69" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="92" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="115" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="138" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="161" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="184" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="207" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="230" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="253" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="276" y="0" width="23" height="${height}" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="299" y="0" width="23" height="${height}" ry="3"></rect>
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

export { render };
export default template;
