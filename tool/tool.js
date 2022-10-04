import * as Cesium from 'cesium';


// https://zhuanlan.zhihu.com/p/41794242
// 解决Cesium显示画面模糊的问题
export function updateResolutionScale(viewer) {
  //判断是否支持图像渲染像素化处理
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }

  // 自动调整分辨率
  // if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
  //   var vtxf_dpr = window.devicePixelRatio;
  //   // 适度降低分辨率
  //   while (vtxf_dpr >= 2.0) {
  //     vtxf_dpr /= 2.0;
  //   }
  //   //alert(dpr);
  //   viewer.resolutionScale = vtxf_dpr;
  // }

  // 开启抗锯齿
  // viewer.scene.fxaa = true;
  // viewer.scene.postProcessStages.fxaa.enabled = true;
}


/**
 * @description: 获取当前鼠标点击位置坐标，并添加到图上显示
 * @param {*} _viewer
 * @return {*}
 */
export function getClickPointAdd(_viewer,cb) {
  // 注册屏幕点击事件
  let handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);

  handler.setInputAction( event=> {
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


// http://map.217dan.com/addons/cesiummapv#/
export function getCurCenterlonLat(view) {
  var t = view.camera.pickEllipsoid(new Cesium.Cartesian2(e.canvas.clientWidth / 2, e.canvas.clientHeight / 2))
  var info = Cesium.Ellipsoid.WGS84.cartesianToCartographic(t);
  var lon = 180 * info.longitude / Math.PI;
  var lat = 180 * info.latitude / Math.PI;

  return {
    lon: lon,
    lat: lat
  }
}

  // 获取当前视图的中心经纬度
export function changeImageryProviderColors(view) {
  var t = view.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    var a = "gl_FragColor = finalColor;\n}\n#ifdef GROUND_ATMOSPHERE\n";
    var o = a;
    -1 !== i.indexOf(a) && (t[n] = t[n].replace(a, o))
  }
}

 // 消除锯齿
  export function removeJagged (e) {
    e.scene.postProcessStages.fxaa.enabled = !1,
      e.scene.fxaa = !1;
    var t = e.cesiumWidget._supportsImageRenderingPixelated;
    if (t) {
      var n = window.devicePixelRatio;
      while (n >= 2)
        n /= 2;
      e.resolutionScale = n
    }
  }


export function flyTo(view) {
  view.scene.camera.flyTo({
    // setView
    destination: {
      x: cartesianXYZ.x,
      y: cartesianXYZ.y,
      z: cartesianXYZ.z,
    },
    orientation: {
      direction: new Cesium.Cartesian3(
        parseFloat(FirstMapView.value.direction_x),
        parseFloat(FirstMapView.value.direction_y),
        parseFloat(FirstMapView.value.direction_z)
      ),
      up: new Cesium.Cartesian3(
        parseFloat(FirstMapView.value.up_x),
        parseFloat(FirstMapView.value.up_y),
        parseFloat(FirstMapView.value.up_z)
      ),
    },
    duration: FirstMapView.value.duration, // 延迟秒数
  })
}

// 添加点
export function addPoint(viewer, position, pixelSize=10) {
  viewer.entities.add({
    position,
    point: {
      pixelSize,
      color: Cesium.Color.YELLOW,
    }
  })
}

/**
 * 加载图片纹理
 *
 * @export
 * @param {*} viewer
 * @param {*} imageUri
 * @return {*}
 */
export function getImageTexture(viewer, imageUri) {
  return new Promise((resolve, reject) => {
    Cesium.Resource.createIfNeeded(imageUri).fetchImage().then(function (image) {
      console.log('image loaded!');
      var texture;
      var context = viewer.scene.context;
      if (Cesium.defined(image.internalFormat)) {
        texture = new Cesium.Texture({
          context: context,
          pixelFormat: image.internalFormat,
          width: image.width,
          height: image.height,
          source: {
            arrayBufferView: image.bufferView
          }
        });
      } else {
        texture = new Cesium.Texture({
          context: context,
          source: image
        });
      }

      // myAppearance.uniforms.myImage = texture;
      resolve(texture);
    });
  })
}


export function screenToWorld(viewer, screenPos){
  return viewer.scene.globe.pick(viewer.camera.getPickRay(new Cesium.Cartesian2(screenPos.x, screenPos.y)), viewer.scene);
  // let clickPosition = viewer.scene.camera.pickEllipsoid(screenPos);
  // return clickPosition
}

export function worldToWGS84(viewer, worldPos){
  var cartographic = Cesium.Cartographic.fromCartesian(worldPos);
  var lat = Cesium.Math.toDegrees(cartographic.latitude);
  var lng = Cesium.Math.toDegrees(cartographic.longitude);
  var alt = cartographic.height;
  return { lng, lat, alt };
}
