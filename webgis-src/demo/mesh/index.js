import { RangeMesh } from "../../mesh/RangeMesh";
import * as Cesium from 'cesium'
import { onMouseWheel } from "../../event";


function fly(viewer, dist) {
  let flyToOpts = {
    destination: dist,
    orientation: {
      heading: 0,
      pitch: -Math.PI / 2,
      roll: 6.283185307179586,
    },
    duration: 0
  };
  viewer.scene.camera.flyTo(flyToOpts);
}

// 添加辐射范围
export function addRangeMesh(viewer) {
  var position = Cesium.Cartesian3.fromDegrees(116.4715397068917, 39.9945712104195, 0);

  const range = new RangeMesh({
    viewer,
    // 圆心
    center: position,
    // 半径范围
    radiusArr: [0, 50, 90, 150],
    // 颜色
    colorArr: [
      "rgba(255,0,0,0.7)",
      "rgba(0,255,0,0.7)",
      "rgba(0,0,255,0.7)"
    ]
  });

  // onMouseWheel(viewer, range.updateLabel)
  viewer.scene.postRender.addEventListener(range.updateLabel, range);
  fly(viewer, Cesium.Cartesian3.fromDegrees(116.4715397068917, 39.9945712104195, 5000));
}
