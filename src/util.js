/**
 * 获取鼠标当前的屏幕坐标位置的三维Cesium坐标
 * @param {*} scene
 * @param {*} position 二维屏幕坐标位置
 * @param {*} noPickEntity 排除的对象（主要用于绘制中，排除对自己本身的拾取）
 */
export function getCurrentMousePosition(scene, position, noPickEntity) {
  var cartesian;
  // 模型上提取坐标
  var pickedObject = scene.pick(position);
  if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
    // pickPositionSupported: 判断是否支持深度拾取
    if (
      noPickEntity == null ||
      (noPickEntity &&
        pickedObject.id !== noPickEntity &&
        pickedObject.primitive !== noPickEntity)
    ) {
      var cartesian = scene.pickPosition(position);
      if (Cesium.defined(cartesian)) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var height = cartographic.height; // 模型高度
        if (height >= 0) {
          return cartesian;
        }
        // 不是entity时，支持3dtitles地下
        if (!Cesium.defined(pickedObject.id) && height >= -500) {
          return cartesian;
        }
      }
    }
  }
  //测试scene.pickPosition和globe.pick的适用场景 https://zhuanlan.zhihu.com/p/44767866
  //1. globe.pick的结果相对稳定准确，不论地形深度检测开启与否，不论加载的是默认地形还是别的地形数据；
  //2. scene.pickPosition只有在开启地形深度检测，且不使用默认地形时是准确的。
  //注意点： 1. globe.pick只能求交地形； 2. scene.pickPosition不仅可以求交地形，还可以求交除地形以外其他所有写深度的物体。
  //提取鼠标点的地理坐标
  if (scene.mode === Cesium.SceneMode.SCENE3D) {
    // 三维模式下
    var pickRay = scene.camera.getPickRay(position);
    cartesian = scene.globe.pick(pickRay, scene);
  } else {
    // 二维模式下
    cartesian = scene.camera.pickEllipsoid(position, scene.globe.ellipsoid);
  }
  return cartesian;
}
