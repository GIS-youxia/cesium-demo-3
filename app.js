
import * as Cesium from './CesiumUnminified';

import { setCamera, } from './tool/camera'
import { addGaode } from './tool/provider'
import { updateResolutionScale, getClickPointAdd } from './tool/tool'
import { addGeoJson } from './tool/geojson'


window.CESIUM_BASE_URL = "./CesiumUnminified/";

Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;

const viewOptions = {
  //动画控件
  animation: false,
  // 图层选择控件
  baseLayerPicker: false,
  // geocoder: false,
  // homeButton: false,
  infoBox: false,
  // 2d/3d切换
  // sceneModePicker: false,
  // selectionIndicator: false,
  timeline: false,
  // navigationHelpButton: false,
  // navigationInstructionsInitiallyVisible: false,
  // creditContainer: undefined,
  shouldAnimate: false
}

var viewer = new Cesium.Viewer("cesiumContainer", viewOptions);
addGaode(viewer)
setCamera(viewer.camera)

// 解决模糊
updateResolutionScale(viewer)

// 显示帧率
viewer.scene.debugShowFramesPerSecond = true;

// 开启拾取
getClickPointAdd(viewer);

// addGeoJson(viewer, "./res/buildings.geojson");
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
