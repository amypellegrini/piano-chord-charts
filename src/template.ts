const defaultContent = `<rect style="fill:#fafafa;stroke:black" x="0" y="0" width="23" height="120" ry="3" id="A0"></rect>
<rect style="fill:#fafafa;stroke:black" x="23" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="46" y="0" width="23" height="120" ry="3" id="C1"></rect>
<rect style="fill:#fafafa;stroke:black" x="69" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="92" y="0" width="23" height="120" ry="3" id="E1"></rect>
<rect style="fill:#fafafa;stroke:black" x="115" y="0" width="23" height="120" ry="3" id="F1"></rect>
<rect style="fill:#fafafa;stroke:black" x="138" y="0" width="23" height="120" ry="3" id="G1"></rect>
<rect style="fill:#fafafa;stroke:black" x="161" y="0" width="23" height="120" ry="3" id="A1"></rect>
<rect style="fill:#fafafa;stroke:black" x="184" y="0" width="23" height="120" ry="3" id="B1"></rect>
<rect style="fill:#fafafa;stroke:black" x="207" y="0" width="23" height="120" ry="3" id="C2"></rect>
<rect style="fill:#fafafa;stroke:black" x="230" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="253" y="0" width="23" height="120" ry="3" id="E2"></rect>
<rect style="fill:#fafafa;stroke:black" x="276" y="0" width="23" height="120" ry="3" id="F2"></rect>
<rect style="fill:#fafafa;stroke:black" x="299" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="322" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="345" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="368" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:#fafafa;stroke:black" x="391" y="0" width="23" height="120" ry="3"></rect>
<rect style="fill:black;stroke:black" x="19.75" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="60.333330000000004" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="87.66666000000001" y="0" width="13" height="80" ry="1" id="D1E1"></rect>
<rect style="fill:black;stroke:black" x="128.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="154.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="180.75" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="221.33333" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="248.66666" y="0" width="13" height="80" ry="1" id="D2E2"></rect>
<rect style="fill:black;stroke:black" x="289.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="315.25" y="0" width="13" height="80" ry="1"></rect>
<rect style="fill:black;stroke:black" x="341.75" y="0" width="13" height="80" ry="1"></rect>
<rect y="-1" width="1196" height="3"></rect>`;

function render(content?: string) {
  const template = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="322" height="120" viewBox="46 0 322 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${defaultContent}
  </svg>`;

  return template.replace(/\s/g, "");
}

const template = render();

export { render };
export default template;
