import * as Cesium from 'cesium'
window.Cesium = Cesium;
import { setCamera, } from './tool/camera'
import { addGaode, } from './tool/map'

window.CESIUM_BASE_URL = "/node_modules/cesium/Source";


Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;

const arcgis = new Cesium.ArcGisMapServerImageryProvider({
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
})
var viewer = new Cesium.Viewer("cesiumContainer", {
  // imageryProvider: false,
  // baseLayerPicker: false,
  timeline: false,
  infoBox: false,
  // navigationHelpButton: false,
  // fullscreenButton: false,
  // animation: false,
  // geocoder: false,
  // homeButton: false,
  // sceneModePicker: false,
  // imageryProvider: arcgis,
  // terrainProvider: new Cesium.CesiumTerrainProvider({
  //   url: Cesium.IonResource.fromAssetId(3957),
  //   requestVertexNormals: true,
  //   requestWaterMask: true
  // }),
});
window.viewer = viewer;

// 开启抗锯齿
if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
  viewer.resolutionScale = window.devicePixelRatio
}
// viewer.scene.postProcessStages.fxaa.enabled = true

// setCamera(viewer)
//全球影像中文注记服务
// viewer.imageryLayers.addImageryProvider(
//   new Cesium.WebMapTileServiceImageryProvider({
//     url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=93d1fdef41f93d2211deed6d22780c48",
//     layer: "tdtAnnoLayer",
//     style: "default",
//     format: "image/jpeg",
//     tileMatrixSetID: "GoogleMapsCompatible",
//     show: false
//   })
// );


// const tileset = viewer.scene.primitives.add(
//   new Cesium.Cesium3DTileset({
//     url: Cesium.IonResource.fromAssetId(96188),
//   })
// );

// // 陆家嘴
// viewer.camera.setView({
//   destination: new Cesium.Cartesian3.fromDegrees(121.49, 31.23, 3000),
//   orientation: {
//     heading: 0,
//     pitch: 90,
//     roll: 0
//   }
// })

addGaode(viewer)
