import { MyPrimitive } from "../../primitive/MyPrimitive";
import * as Cesium from 'cesium'

export function cusotom(viewer) {
  viewer.scene.globe.depthTestAgainstTerrain = true;

  var origin = Cesium.Cartesian3.fromDegrees(106, 26, 250000 / 2)
  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin)

  var primitive = new MyPrimitive(modelMatrix);
  viewer.scene.primitives.add(primitive)
}
