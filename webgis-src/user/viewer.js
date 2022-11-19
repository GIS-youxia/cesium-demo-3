import * as Cesium from 'cesium';
import { addCSS } from '../ui/helper';
import { updateResolutionScale } from '../misc/index'
// @ts-ignore
console.log(Cesium.VERSION);

export function getViewer() {

  // @ts-ignore
  window.CESIUM_BASE_URL = "./node_modules/cesium/Build/CesiumUnminified";
  Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;
  addCSS("./node_modules/cesium/Build/CesiumUnminified/Widgets/widgets.css")

  const viewOptions = {
    scene3DOnly: true,
    //如果为true并且配置支持它，则使用顺序无关的半透明性
    orderIndependentTranslucency: false,

    //-------------------------- UI控件 --------------------
    homeButton: false,
    //动画
    animation: false,
    // 图层选择
    baseLayerPicker: false,
    // 全屏
    fullscreenButton: false,
    geocoder: false,
    infoBox: false,
    // 2d/3d切换
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    shouldAnimate: true,
    // imageryProvider: new Cesium.SingleTileImageryProvider({
    //   url: "./res/pic/earth_4.jpeg",
    // }),
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //     url: "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A"
    //   })
  }

  var viewer = new Cesium.Viewer("cesiumContainer", viewOptions);
  // viewOptions.imageryProvider.defaultBrightness = 0.01;
  viewer.shadows = false;
  // @ts-ignore
  window.viewer = viewer;

  // 显示帧率
  // @ts-ignore
  // viewer.scene.debugShowFramesPerSecond = true;

  // @ts-ignore
  // viewer.scene.globe.show = false;
  viewer.scene.skyBox.show = false
  //去cesium logo
  // viewer.cesiumWidget.creditContainer.style.display = "none";
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
    // viewer.extend(Cesium.viewerCesiumInspectorMixin);

  // 解决模糊
  updateResolutionScale(viewer)
  return viewer;
}
