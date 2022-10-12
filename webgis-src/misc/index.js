import * as Cesium from 'cesium';


// https://zhuanlan.zhihu.com/p/41794242
// 解决Cesium显示画面模糊的问题
export function updateResolutionScale(viewer) {
  //判断是否支持图像渲染像素化处理
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }
}

export function addPoint(options) {
  const { viewer, position } = options;
  const pixelSize = options.pixelSize !== undefined ? options.pixelSize : 10;
  const color = options.color !== undefined ? options.color : "#ff0";

  // 添加点
  viewer.entities.add({
    position,
    point: {
      pixelSize,
      color: Cesium.Color.fromCssColorString(color),
    }
  })
}

/**
 * @description: 获取当前鼠标点击位置坐标，并添加到图上显示
 * @param {*} viewer
 * @return {*}
 */
export function getClickPoint(options) {
  const { viewer } = options
  const putPoint = options.putPoint !== undefined ? options.putPoint : true;

  // 注册屏幕点击事件
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  handler.setInputAction(event => {
    // 拾取椭球表面
    let clickPosition = viewer.scene.camera.pickEllipsoid(event.position);

    // 转经纬度（弧度）坐标
    let radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);

    // 转角度
    const lon = Cesium.Math.toDegrees(radiansPos.longitude);
    const lat = Cesium.Math.toDegrees(radiansPos.latitude);
    console.log(`{
      longitude: ${lon},
      latitude: ${lat},
    }`);

    const position = Cesium.Cartesian3.fromDegrees(lon, lat)
    console.log("position", position);


    // cb && cb(clickPosition);
    putPoint && addPoint({
      viewer: viewer,
      position: clickPosition
    })

  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export function pickEntity({ viewer }) {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    var pick = viewer.scene.pick(movement.position);
    console.error(pick);


    // Cesium.Matrix4.getTranslation(modelMatrix, new Cesium.Cartesian3());
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
