import * as Cesium from 'cesium';


/** 中国坐标 */
export function setCamera(view, name = "beiJing", height = 10000) {
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
  // console.error(position);

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



function name(params) {
  //监听地图移动完成事件
  viewer.camera.moveEnd.addEventListener(() => {
    //获取当前相机高度
    let height = Math.ceil(viewer.camera.positionCartographic.height);
    let zoom = this.heightToZoom(height);
    let bounds = this.getCurrentExtent();
    // console.log('地图变化监听事件', zoom, bounds);
    // this.handlePOI(bounds, viewer)
  });


  function heightToZoom(height) {
    var A = 40487.57;
    var B = 0.00007096758;
    var C = 91610.74;
    var D = -40467.74;
    return Math.round(D + (A - D) / (1 + Math.pow(height / C, B)));
  }

  /*
    *获取当前三维范围
    *extent,返回当前模式下地图范围[xmin,ymin,xmax,ymax]
    *extent,返回当前模式下地图范围{xmin,ymin,xmax,ymax}
  */
  function getCurrentExtent() {
    //获取当前三维地图范围
    var Rectangle = viewer.camera.computeViewRectangle();
    //地理坐标（弧度）转经纬度坐标
    var extent = [Rectangle.west / Math.PI * 180, Rectangle.south / Math.PI * 180, Rectangle.east / Math.PI * 180, Rectangle.north / Math.PI * 180];
    return extent;
  }
}

function getCameraView(viewer) {
  var camera = viewer.camera
  var a = camera.positionCartographic;
  var r = {};
  r.y = Cesium.Math.toDegrees(a.latitude) || 6;
  r.x = Cesium.Math.toDegrees(a.longitude) || 6;
  r.z = a.height || 2;
  r.heading = Cesium.Math.toDegrees(camera.heading || -90) || 1;
  r.pitch = Cesium.Math.toDegrees(camera.pitch || 0) || 1;
  r.roll = Cesium.Math.toDegrees(camera.roll || 0) || 1;
  return r;
}


/**
 * 开场动画
 * @param {Cesium.Viewer} viewer
 * @param {Object} options 参数集合
 * @param {number} options.longitude 经度
 * @param {number} options.latitude 维度
 * @param {number} options.height 高度
 * @param {number} options.heading 航向
 * @param {number} options.pitch 俯仰
 * @param {number} options.roll 横滚
 * @param {number} options.rotationDuration 水平旋转时间
 * @param {number} options.zoomDuration 缩放时间
 * @param {number} options.pitchDuration 倾角时间
 * @example
 * ````js
 * openFlyAnimation(viewer,{
 *  longitude: 116.39642393115915,
 *  latitude: 39.91666925151443,
 *  pitch: -45,
 * })
 * ```
 */
export function openFlyAnimation(viewer, options = {}) {
  const globeHeight = 16e6;
  // 目标位置
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(options.longitude, options.latitude, options.height || 10e4),
    orientation: {
      heading: Cesium.Math.toRadians(options.heading || 0),
      pitch: Cesium.Math.toRadians(options.pitch || 0),
      roll: Cesium.Math.toRadians(options.roll || 0)
    },
  });
  // 保存目标相机的参数
  const targetCameraParam = getCameraView(viewer);

  // 中国背面的位置
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-85.16, 13.71, globeHeight)
  });

  // 水平旋转动画
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(targetCameraParam.x, targetCameraParam.y, globeHeight),
    duration: options.rotationDuration !== undefined ? options.rotationDuration: 2,
    easingFunction: Cesium.EasingFunction.LINEAR_NONE,
    complete: function () {

      // 垂直缩放动画
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(targetCameraParam.x, targetCameraParam.y, targetCameraParam.z),
        duration: options.zoomDuration !== undefined ? options.zoomDuration : 4,
        complete: function () {

          // 相机倾角动画
          const center = Cesium.Cartesian3.fromDegrees(targetCameraParam.x, targetCameraParam.y);
          const heading = Cesium.Math.toRadians(targetCameraParam.heading);
          const pitch = Cesium.Math.toRadians(targetCameraParam.pitch);
          const range = targetCameraParam.z;
          viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(center, 0),
            {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: options.pitchDuration !== undefined ? options.pitchDuration : 2,
            },
          );
        }
      });
    }
  })
}


export function centerAt(options) {
  const center = Cesium.Cartesian3.fromDegrees(options.x, options.y);
  const heading = Cesium.Math.toRadians(options.heading);
  const pitch = Cesium.Math.toRadians(options.pitch);
  const range = options.z;
  options.viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(center, 0),
    {
      offset: new Cesium.HeadingPitchRange(heading, pitch, range),
      duration: options.duration !== undefined ? options.duration:1 ,
    },
  );
}
