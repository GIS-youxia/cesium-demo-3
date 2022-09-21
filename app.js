
import * as Cesium from './CesiumUnminified';
window.Cesium = Cesium;

import { setCamera, } from './tool/camera'
import { addGaode } from './tool/provider'
import { updateResolutionScale, getClickPointAdd, addPoint } from './tool/tool'
// import { addGeoJson } from './tool/geojson'
// import { addOne3dTitleset } from './tool/tile'
import Tileset from './src/Titleset'
import Primitives from './src/Primitive'
import Manager from './src/effects/Manager'
import RoadNetwork from './src/lines/RoadNetwork'
import { addAxis, addAxisGlobe } from './tool/axis'
import {getCylinderPrimitive} from './tool/primitive'
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

// addAxisGlobe(viewer)
// 添加坐标轴
// addAxis(viewer, position);

// addGeoJson(viewer, "./res/buildings.geojson");

// 自定义流动纹理材质
// let material = new Cesium.PolylineFlowMaterialProperty({
//   color: Cesium.Color.ORANGE,
//   duration: 200
// })
// addGeoJson(viewer, "./res/wangjingRoad.geojson");

// addOne3dTitleset(viewer);
// const tile = new Tileset(viewer)
// tile.init()

// const primitives = new Primitives(viewer)
// primitives.init();


// const GManager = new Manager(viewer)
// GManager.init()

// 公路效果
// const GRoadNetwork = new RoadNetwork(viewer, 'road')
// GRoadNetwork.init()
// window.GRoadNetwork = GRoadNetwork;

// viewer.dataSources.add(
//   Cesium.GeoJsonDataSource.load("./res/buildings.geojson")
// );

// viewer.dataSources.add(
//   Cesium.GeoJsonDataSource.load("./res/roads.geojson")
// );

// viewer.dataSources.add(
//   Cesium.GeoJsonDataSource.load("./res/points.geojson")
// );
// // openstreetmap(viewer)
// // arcgis(viewer)




// let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
// handler.setInputAction(function(event) {
//   let cartesian = viewer.camera.pickEllipsoid(event.position);
//   let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
//   let lng = Cesium.Math.toDegrees(cartographic.longitude); // 经度
//   let lat = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
//   let alt = cartographic.height; // 高度，椭球面height永远等于0
//   let coordinate = {
//     longitude: Number(lng.toFixed(6)),
//     latitude: Number(lat.toFixed(6)),
//     altitude: Number(alt.toFixed(2))
//   };
//   console.log(coordinate);
// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


// viewer.camera.setView({
//   destination: Cesium.Cartesian3.fromDegrees(116.53718, 39.758061, 800.0),
//   orientation: {
//     heading: Cesium.Math.toRadians(0),
//     pitch: Cesium.Math.toRadians(-90),
//     roll: 0
//   }
// })


// const entities = viewer.entities;


// const redCorridor = viewer.entities.add({
//   name: "Red corridor on surface with rounded corners",
//   corridor: {
//     positions: Cesium.Cartesian3.fromDegreesArray([
//       -100.0,
//       40.0,

//       -105.0,
//       40.0,

//       -100.0,
//       39.0,
//     ]),
//     width: 100000.0,
//     material: Cesium.Color.RED.withAlpha(0.5),
//   },
// });

// const greenCorridor = viewer.entities.add({
//   name: "Green corridor at height with mitered corners and outline",
//   corridor: {
//     positions: Cesium.Cartesian3.fromDegreesArray([
//       -90.0,
//       40.0,

//       -95.0,
//       40.0,

//       -90.0,
//       39.0,
//     ]),
//     height: 100000.0,
//     width: 100000.0,
//     cornerType: Cesium.CornerType.ROUNDED,

//     material: Cesium.Color.GREEN,
//     outline: false, // height required for outlines to display
//   },
// });



// viewer.zoomTo(viewer.entities);

const length = 400000.0;
const primitive = getCylinderPrimitive({
  length,
  topRadius:0,
  bottomRadius: 200000.0,
});
viewer.scene.primitives.add(primitive);
