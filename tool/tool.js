import * as Cesium from '../CesiumUnminified';


// https://zhuanlan.zhihu.com/p/41794242
// 解决Cesium显示画面模糊的问题
export function updateResolutionScale(viewer) {
  //判断是否支持图像渲染像素化处理
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }

  // 自动调整分辨率
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    var vtxf_dpr = window.devicePixelRatio;
    // 适度降低分辨率
    while (vtxf_dpr >= 2.0) {
      vtxf_dpr /= 2.0;
    }
    //alert(dpr);
    viewer.resolutionScale = vtxf_dpr;
  }

  // 开启抗锯齿
  viewer.scene.fxaa = true;
  // viewer.scene.postProcessStages.fxaa.enabled = true;
}


/**
 * @description: 获取当前鼠标点击位置坐标，并添加到图上显示
 * @param {*} _viewer
 * @return {*}
 */
export function getClickPointAdd(_viewer) {
  // 注册屏幕点击事件
  let handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);

  handler.setInputAction(function (event) {
    // 转换为不包含地形的笛卡尔坐标
    let clickPosition = _viewer.scene.camera.pickEllipsoid(event.position);
    // 转经纬度（弧度）坐标
    let radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
    // 转角度
    console.log("经度：" + Cesium.Math.toDegrees(radiansPos.longitude) + ", 纬度：" + Cesium.Math.toDegrees(radiansPos.latitude));

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
