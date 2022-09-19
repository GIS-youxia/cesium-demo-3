import * as Cesium from '../CesiumUnminified';

export function setCamera(camera) {
  // 北京
  const position = getChinaPostion(); //new Cesium.Cartesian3.fromDegrees(116.23, 39.54, 100)
  camera.setView({
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
  return Cesium.Cartesian3.fromDegrees(116.4715397068917, 39.9945712104195, 15000.0);
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

// Cesium 获取当前场景坐标范围
// https://blog.csdn.net/chenguizhenaza/article/details/116783045?spm=1001.2014.3001.5502
export function getCesiumViewerExtend() {
  debugger;
  let params = {};
  let extend = window.cesiumViewer.camera.computeViewRectangle();
  if (typeof extend === "undefined") {
    //2D下会可能拾取不到坐标，extend返回undefined,所以做以下转换
    let canvas = window.cesiumViewer.scene.canvas;
    let upperLeft = new Cesium.Cartesian2(0, 0); //canvas左上角坐标转2d坐标
    let lowerRight = new Cesium.Cartesian2(canvas.clientWidth, canvas.clientHeight); //canvas右下角坐标转2d坐标

    let ellipsoid = window.cesiumViewer.scene.globe.ellipsoid;
    let upperLeft3 = window.cesiumViewer.camera.pickEllipsoid(upperLeft, ellipsoid); //2D转3D世界坐标

    let lowerRight3 = window.cesiumViewer.camera.pickEllipsoid(lowerRight, ellipsoid); //2D转3D世界坐标

    let upperLeftCartographic = window.cesiumViewer.scene.globe.ellipsoid.cartesianToCartographic(upperLeft3); //3D世界坐标转弧度
    let lowerRightCartographic = window.cesiumViewer.scene.globe.ellipsoid.cartesianToCartographic(lowerRight3); //3D世界坐标转弧度

    let minx = Cesium.Math.toDegrees(upperLeftCartographic.longitude); //弧度转经纬度
    let maxx = Cesium.Math.toDegrees(lowerRightCartographic.longitude); //弧度转经纬度

    let miny = Cesium.Math.toDegrees(lowerRightCartographic.latitude); //弧度转经纬度
    let maxy = Cesium.Math.toDegrees(upperLeftCartographic.latitude); //弧度转经纬度

    console.log("经度：" + minx + "----" + maxx);
    console.log("纬度：" + miny + "----" + maxy);

    params.minx = minx;
    params.maxx = maxx;
    params.miny = miny;
    params.maxy = maxy;
  } else {
    //3D获取方式
    params.maxx = Cesium.Math.toDegrees(extend.east);
    params.maxy = Cesium.Math.toDegrees(extend.north);

    params.minx = Cesium.Math.toDegrees(extend.west);
    params.miny = Cesium.Math.toDegrees(extend.south);
  }
  return params; //返回屏幕所在经纬度范围
}
