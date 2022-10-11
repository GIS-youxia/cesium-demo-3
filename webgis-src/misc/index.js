// https://zhuanlan.zhihu.com/p/41794242
// 解决Cesium显示画面模糊的问题
export function updateResolutionScale(viewer) {
  //判断是否支持图像渲染像素化处理
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }
}


/**
 * @description: 获取当前鼠标点击位置坐标，并添加到图上显示
 * @param {*} _viewer
 * @return {*}
 */
export function getClickPointAdd(_viewer, cb) {
  // 注册屏幕点击事件
  let handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);

  handler.setInputAction(event => {
    // 拾取椭球表面
    let clickPosition = _viewer.scene.camera.pickEllipsoid(event.position);

    // 转经纬度（弧度）坐标
    let radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);

    // 转角度
    const lon = Cesium.Math.toDegrees(radiansPos.longitude);
    const lat = Cesium.Math.toDegrees(radiansPos.latitude);
    console.log(`{
      longitude: ${lon},
      latitude: ${lat},
    }`);

    cb && cb(clickPosition);

    // 添加点
    _viewer.entities.add({
      position: clickPosition,
      point: {
        color: Cesium.Color.YELLOW,
        pixelSize: 10
      }
    })
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
