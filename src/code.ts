import { skew, rotate, translate, compose } from 'transformation-matrix';
import { directions, Direction } from './directions';
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { themeColors: true, height: 280 })

function moveOrigine(x: number, y: number, w: number, h: number, angle: number) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

function getOptions(type: string): Direction {
  return directions[type] || directions['rightUp'];
}

function transform(node: SceneNode, type: string) {

  if (!('rotation' in node)) {
    // display a message indicating : some selected node can't be rotated
    return node;
  }
  const { x, y } = node;
  const { angle, skewX, skewY, nodeRotation }: Direction = getOptions(type);
  const [nx, ny] = moveOrigine(x, y, node.width, node.height, nodeRotation * (Math.PI / 180));
  const { a, b, c, d, e, f } = compose(translate(x, y), rotate(angle), skew(skewX, skewY));
  // https://www.figma.com/plugin-docs/api/properties/nodes-relativetransform/
  // https://www.mathworks.com/discovery/affine-transformation.html
  node.relativeTransform = [
    [a, b, e],
    [c, d, f],
  ];
  node.rotation = nodeRotation;
  node.setPluginData("cx.ap.type", type);
  return node;
}

function oneLayerCheck() {
  if (figma.currentPage.selection.length == 0) {
    figma.ui.postMessage('SELECT_LAYER');
    return false;
    // figma.closePlugin("Choose one layer.")
  } else {
    return true
  }
}

oneLayerCheck();

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  const { type } = msg;

  if (oneLayerCheck()) {
    const nodes = figma.currentPage.selection;
    // const parents = []

    for (const node of nodes) {
      // const selection = figma.currentPage.selection
      const transformedNode = transform(node, type)
      //

    }
    // figma.currentPage.selection = parents;
    // figma.viewport.scrollAndZoomIntoView(nodes)
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (type === 'close') {
    figma.closePlugin();
  }
};
