
import * as Cesium from './CesiumUnminified';
import { coneRotation } from './show'
// window.Cesium = Cesium;

import { setCamera, } from './tool/camera'
import { addGaode } from './tool/provider'

import { updateResolutionScale, getClickPointAdd, addPoint } from './tool/tool'
import Tileset from './src/Titleset'
import Primitives from './src/Primitive'
import Manager from './src/effects/Manager'
import RoadNetwork from './src/lines/RoadNetwork'

import { addAxisGlobe } from './tool/axis'

window.CESIUM_BASE_URL = "./CesiumUnminified/";
Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;

const viewOptions = {
  //-------------------------- UI控件 --------------------
  //动画
  animation: false,
  // 图层选择
  baseLayerPicker: false,
  // 全屏
  fullscreenButton: false,
  infoBox: false,
  // 2d/3d切换
  sceneModePicker:false,
  selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
  shouldAnimate: false,
  imageryProvider: undefined,
}

var viewer = new Cesium.Viewer("cesiumContainer", viewOptions);
window.viewer = viewer;

// addGaode(viewer)
// setCamera(viewer, "beiJing")

// 解决模糊
updateResolutionScale(viewer)

// 显示帧率
viewer.scene.debugShowFramesPerSecond = true;

// 开启拾取
getClickPointAdd(viewer, pos => {
  // addAxis(viewer, pos);
});

viewer.scene.globe.show = false;
viewer.scene.globe.enableLighting = false;
viewer.shadows = false;
viewer.scene.sun.show = false;
viewer.scene.moon.show = false;
viewer.scene.skyAtmosphere.show = false;
viewer.scene.fog.enable = false;

// 添加地球坐标轴
addAxisGlobe(viewer)
coneRotation(viewer);

// Cesium.M
// Cesium.
// Cesium.Ma
Cesium.Mat
