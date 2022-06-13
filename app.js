import * as Cesium from 'cesium'
window.Cesium = Cesium;
import { setCamera, } from './tool/camera'
import { addGaode, } from './tool/map'

window.CESIUM_BASE_URL = "/node_modules/cesium/Source";


Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;

//Widget with ion imagery and Cesium World Terrain.
const widget2 = new Cesium.CesiumWidget('cesiumContainer', {
  scene3DOnly: true,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: "https://webst{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
    // "http://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7"
    subdomains: ["01", "02", "03", "04"] //多域名请求
  }),
  terrainProvider: Cesium.createWorldTerrain(),
  // Show Columbus View map with Web Mercator projection
  // sceneMode: Cesium.SceneMode.COLUMBUS_VIEW,
  // mapProjection: new Cesium.WebMercatorProjection()
});
window.widget2 = widget2

// const arcgis = new Cesium.ArcGisMapServerImageryProvider({
//   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
// })
// var viewer = new Cesium.Viewer("cesiumContainer", {
//   imageryProvider: false,
//   baseLayerPicker: false,
//   timeline: false,
//   infoBox: false,
//   // navigationHelpButton: false,
//   // fullscreenButton: false,
//   animation: false,
//   geocoder: false,
//   homeButton: false,
//   sceneModePicker: false,
//   // imageryProvider: arcgis,
//   // terrainProvider: new Cesium.CesiumTerrainProvider({
//   //   url: Cesium.IonResource.fromAssetId(3957),
//   //   requestVertexNormals: true,
//   //   requestWaterMask: true
//   // }),
// });
// window.viewer = viewer;

// // 开启抗锯齿
// if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
//   viewer.resolutionScale = window.devicePixelRatio
// }
// viewer.scene.postProcessStages.fxaa.enabled = true

// // setCamera(viewer)
// //全球影像中文注记服务
// // viewer.imageryLayers.addImageryProvider(
// //   new Cesium.WebMapTileServiceImageryProvider({
// //     url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=93d1fdef41f93d2211deed6d22780c48",
// //     layer: "tdtAnnoLayer",
// //     style: "default",
// //     format: "image/jpeg",
// //     tileMatrixSetID: "GoogleMapsCompatible",
// //     show: false
// //   })
// // );


// // const tileset = viewer.scene.primitives.add(
// //   new Cesium.Cesium3DTileset({
// //     url: Cesium.IonResource.fromAssetId(96188),
// //   })
// // );

// // // 陆家嘴
// // viewer.camera.setView({
// //   destination: new Cesium.Cartesian3.fromDegrees(121.49, 31.23, 3000),
// //   orientation: {
// //     heading: 0,
// //     pitch: 90,
// //     roll: 0
// //   }
// // })

// addGaode(viewer)
// // const tms = new Cesium.UrlTemplateImageryProvider({
// //   url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII') + '/{z}/{x}/{reverseY}.jpg',
// //   credit: '© Analytical Graphics, Inc.',
// //   tilingScheme: new Cesium.GeographicTilingScheme(),
// //   maximumLevel: 5
// // });
// // viewer.imageryLayers.addImageryProvider(tms);

// // viewer.scence.requestRender()
setCamera(widget2.scene.camera)
// tileCacheSize
// // 显示帧率
widget2.scene.debugShowFramesPerSecond = true;


// const base = new Cesium.UrlTemplateImageryProvider({
//   url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
//   // tilingScheme: new Cesium.GeographicTilingScheme(),
//   maximumLevel: 17,
//   defaultAlpha: 0,
// });
// var viewer = new Cesium.Viewer('cesiumContainer', {
//   imageryProvider: base,
//   // baseLayerPicker : false,
//   contextOptions: {
//     requestWebgl2: true,
//     webgl: {
//       alpha: false,
//       depth: true,
//       stencil: false,
//       antialias: true,
//       powerPreference: 'high-performance',
//       premultipliedAlpha: true,
//       preserveDrawingBuffer: false,
//       failIfMajorPerformanceCaveat: false,
//     },
//     allowTextureFilterAnisotropic: true,
//   },
// });


class A {
  constructor() {}
}
