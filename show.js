import * as Cesium from './CesiumUnminified';
import { getCylinderPrimitive } from './tool/primitive'

/**
 * 圆锥自动旋转
 * @export
 */
export function coneRotation(viewer) {
  var ellipsoid = viewer.scene.globe.ellipsoid;
  // 将(经度, 纬度, 高度) 转换为笛卡尔表示,高度是贴着地面
  var positionEllipsoid = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-105.0, 40.0));

  const conePrimitive = getCylinderPrimitive({
    topRadius: 0,
    bottomRadius: 200000.0,
    length: 400000.0,
    modelMatrix: Cesium.Matrix4.IDENTITY,
    color:'#00ff00'
  })
  viewer.scene.primitives.add(conePrimitive)
  const axis = new AxisByPrimitive(viewer, primitive)

  var counter = 90;
  setInterval( () => {
    if (counter >= 360) {
      counter = 0;
    }
    var angleRad = 3.14 * counter / 180;
    var rotMatrix = new Cesium.Matrix3.fromRotationY(angleRad);
    var modelMatrix = Cesium.Matrix4.multiply(
      Cesium.Transforms.eastNorthUpToFixedFrame(positionEllipsoid),
      Cesium.Matrix4.fromRotationTranslation(rotMatrix, new Cesium.Cartesian3(0.0, 0.0, length * 0.5)),
      new Cesium.Matrix4());
    conePrimitive.modelMatrix = modelMatrix;
    counter += 5;

    axis.update()
  }, 100);
}
