import { KeyboardChartLayout } from "./types";

function renderKeys(layout: KeyboardChartLayout) {
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

  return `<rect style="fill:#fafafa;stroke:black" x="0" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="23" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="46" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="69" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="92" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="115" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="138" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="161" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="184" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="207" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="230" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="253" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="276" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:#fafafa;stroke:black" x="299" y="0" width="23" height="${layoutSettingsMap[layout].whiteKeyHeight}" ry="3"></rect>
  <rect style="fill:black;stroke:black" x="14.33333" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="41.66666" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="82.25" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="108.25" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="134.75" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="175.33333" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="202.66666" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="243.25" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="269.25" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>
  <rect style="fill:black;stroke:black" x="295.75" y="0" width="13" height="${layoutSettingsMap[layout].blackKeyHeight}" ry="1"></rect>`;
}

export default renderKeys;
