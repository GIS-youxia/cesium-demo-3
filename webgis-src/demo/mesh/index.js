import { RangeMesh } from "../../mesh/RangeMesh";
import * as Cesium from 'cesium'
import { onMouseWheel } from "../../event";


function fly(viewer, dist) {
  let flyToOpts = {
    destination: dist,
    orientation: {
      heading: 0,
      pitch: -Math.PI / 3,
      roll: 6.283185307179586,
    },
    duration: 0
  };
  viewer.scene.camera.flyTo(flyToOpts);
}

export function addRangeMesh(viewer) {
  var position = Cesium.Cartesian3.fromDegrees(106, 26, 0);

  const range = new RangeMesh({
    viewer,
    center: position,
    // 半径范围
    radiusArr: [
      0,
      50,
      // 90,
      // 150
    ],
    // 范围颜色
    colorArr: [
      "rgba(255,0,0,0.5)",
      "rgba(0,255,0,0.5)",
      "rgba(0,0,255,0.5)"
    ]
  })

  onMouseWheel(viewer, range.updateLabel)
  fly(viewer, Cesium.Cartesian3.fromDegrees(106, 26, 5000));
}
