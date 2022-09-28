import * as Cesium from 'cesium';
import './src/Cesium_EX'
// @ts-ignore
window.Cesium = Cesium;
// @ts-ignore
console.log(Cesium.VERSION);


/*--------------------------------------- tool ------------------------------------------ */
import { addAxisGlobe } from './tool/axis'
import { updateResolutionScale, getClickPointAdd, addPoint } from './tool/tool'
import { setCamera, setComeraPosition } from './tool/camera'
import { addGaode } from './tool/provider';

/*--------------------------------------- case ------------------------------------------ */
import { coneRotation } from './show'
import { MjqGrid } from './case/mjq/mjq_grid'
import { Tile } from './case/tile/index'
import { Draw } from './case/draw/draw'
import { Radar } from './case/radar/index'


// @ts-ignore
window.CESIUM_BASE_URL = "./node_modules/cesium/Build/CesiumUnminified";
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
viewer.shadows = false;
// @ts-ignore
window.viewer = viewer;


// addGaode(viewer)
// setCamera(viewer, "beiJing")

// 解决模糊
updateResolutionScale(viewer)

// 显示帧率
// @ts-ignore
viewer.scene.debugShowFramesPerSecond = true;

// 开启拾取
// getClickPointAdd(viewer, pos => {
//   // addAxis(viewer, pos);
// });

// @ts-ignore
// viewer.scene.globe.show = false;
// @ts-ignore
viewer.scene.globe.enableLighting = false;
// @ts-ignore
viewer.shadows = false;
// @ts-ignore
viewer.scene.sun.show = false;
// @ts-ignore
viewer.scene.moon.show = false;
// @ts-ignore
viewer.scene.skyAtmosphere.show = false;
// @ts-ignore
viewer.scene.fog.enable = false;
viewer.scene.globe.enableLighting = false;

// 添加地球坐标轴
// addAxisGlobe(viewer)
// coneRotation(viewer);

// setComeraPosition(viewer, {
//   longitude: 116.4715397068917,
//   latitude: 39.9945712104195,
//   height: 100000,
// })


// fnLoadKML(viewer, "./res/daolubiaozhu.kml")
// window.mjq = new MjqGrid(viewer)
// window.case = new Tile(viewer)
window.case = new Radar(viewer)
