export function setCamera(viewer) {
  // 北京
  const position = getChinaPostion(); //new Cesium.Cartesian3.fromDegrees(116.23, 39.54, 100)
  viewer.camera.setView({
    destination: position,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0
    }
  })
}


/** 中国坐标 */
export function getChinaPostion() {
  return Cesium.Cartesian3.fromDegrees(116.435314, 40.960521, 1000000.0);
}


/**
 *  初始定位中国
 * */
export function flytoChina(viewer) {
  viewer.camera.flyTo({
    destination: getChinaPostion(),
    duration: 8
  });
}
