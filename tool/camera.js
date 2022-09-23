import * as Cesium from 'cesium';


/** 中国坐标 */
export function setCamera(view, name="beiJing", height=10000) {
  let info = {}

  switch (name) {
    // 北京
    case "beiJing":
      info.lon = 116.4715397068917;
      info.lat = 39.9945712104195;
      break;

    // 深圳
    case "shenZhen":
      info.lon = 114.05643562967782;
      info.lat = 22.54490159071341;
      break;

    default:
      break;
  }
  const position = Cesium.Cartesian3.fromDegrees(info.lon, info.lat, height);
  view.camera.setView({
    destination: position,
    orientation: {
      // 水平旋转
      heading: Cesium.Math.toRadians(0),
      // 垂直旋转
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    }
  })
  return { position, info };

  // view.scene.camera.flyTo({
  //   destination: new Cesium.Cartesian3(-2852038.506894064, 4656753.071879653, 3286786.358214652),
  //   orientation: {
  //     heading: 0.4417702951554947,
  //     pitch: -0.30187320702800813,
  //   },
  // });
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

export function setComeraPosition(viewer, options) {
  const { longitude, latitude, height } = options;

  const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
  viewer.camera.setView({
    destination: position,
    orientation: {
      // 水平旋转
      heading: Cesium.Math.toRadians(0),
      // 垂直旋转
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    }
  })
}
