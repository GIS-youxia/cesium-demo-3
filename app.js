import * as Cesium from 'cesium';
import './src/Cesium_EX'
// @ts-ignore
window.Cesium = Cesium;
// @ts-ignore
console.log(Cesium.VERSION);


/*--------------------------------------- tool ------------------------------------------ */
import { addAxisGlobe } from './tool/axis'
import { updateResolutionScale, getClickPointAdd, addPoint } from './tool/tool'
import { addCSS } from './tool/helper';
import { addGaode } from './tool/provider';

/*--------------------------------------- case ------------------------------------------ */
import { coneRotation } from './show'
// import { MjqGrid } from './case/mjq/mjq_grid'
import { Tile } from './case/tile/index'
import { Draw } from './case/draw/draw'
import { Radar } from './case/radar/index'
// import { Road } from './case/road/index'
import { DomLabelDemo } from './case/DynamicLabel/index'
import { FlowLine } from './case/VertiicalFlowLinePrimitive/index'
import { RiverDemo } from './case/river/index'
import { PowerDemo } from './case/power/index'
import { WallDemo } from './case/wall';
import { S3MDemo } from './case/s3m/index'
import { CircleDemo } from './case/circle/index'
import { StatelliteDemo } from './case/satellite/index'
import { StretchGeogsonDemo } from './case/stretchGeogson/index'
import { POIDemo } from './case/poi';
import { KFCDemo } from './case/kfc/index'
import { PersonDemo } from './case/person/index'
import { TdtDemo } from './case/tdt/index'

// @ts-ignore
window.CESIUM_BASE_URL = "./node_modules/cesium/Build/CesiumUnminified";
Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;
addCSS("./node_modules/cesium/Build/CesiumUnminified/Widgets/widgets.css")

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
  shouldAnimate: true,
  imageryProvider: undefined,
}

var viewer = new Cesium.Viewer("cesiumContainer", viewOptions);
viewer.shadows = false;
// @ts-ignore
window.viewer = viewer;

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

// 添加高德底图
// addGaode(viewer);

// 添加地球坐标轴
// addAxisGlobe(viewer)

// window.case = new MjqGrid(viewer)
// window.case = new Tile(viewer)
// window.case = new Radar(viewer)
// window.case = new Road(viewer)
// window.case = new Draw(viewer)
// window.case = new FlowLine(viewer);
// window.case = new DomLabelDemo(viewer);
// window.case = new RiverDemo(viewer);
// window.case = new PowerDemo(viewer);
// window.case = new WallDemo(viewer);
// window.case = new S3MDemo(viewer);
// window.case = new CircleDemo(viewer);
// window.case = new StatelliteDemo(viewer);
// window.case = new StretchGeogsonDemo(viewer);
// window.case = new POIDemo(viewer);
// window.case = new KFCDemo(viewer);
// window.case = new PersonDemo(viewer);
window.case = new TdtDemo(viewer);
