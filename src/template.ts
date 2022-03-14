import renderKeys from "./renderKeys";
import { BlackKey, KeyboardChartLayout, WhiteKey } from "./types";

type RenderOptions = {
  format?: KeyboardChartLayout;
  highlightKeys?: Array<WhiteKey | BlackKey>;
  size?: number;
  startFrom?: WhiteKey;
};

const whiteKeyWidth = 23;

function render(options?: RenderOptions) {
  let height = 65;

  const format: KeyboardChartLayout = options?.format || "compact";
  const size: number = options?.size || 14;
  const width: number = size * whiteKeyWidth;

  if (format === "exact") {
    height = 120;
  }

  const defaultContent = `${renderKeys(
    format,
    options?.highlightKeys || [],
    size,
    options?.startFrom || "C"
  )}<rect y="-1" width="${width}" height="3"></rect>`;

  const template = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="${width + 1}" height="${
    height + 1
  }" viewBox="0 0 ${width} ${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${defaultContent}
  </svg>`;

  return template;
}

const template = render();

export { render };
export default template;
