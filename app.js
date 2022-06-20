import * as Cesium from 'cesium';
window.Cesium = Cesium;
import { setCamera, } from './tool/camera'
import { addGaode, openstreetmap,arcgis} from './tool/provider'

window.CESIUM_BASE_URL = "/node_modules/cesium/Source";

Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;


const DEF_OPTS = {
  animation: false, //Whether to create animated widgets, lower left corner of the meter
  baseLayerPicker: false, //Whether to display the layer selector
  imageryProvider: false, // Whether to display the default imagery
  fullscreenButton: false, //Whether to display the full-screen button
  geocoder: false, //To display the geocoder widget, query the button in the upper right corner
  homeButton: false, //Whether to display the Home button
  infoBox: false, //Whether to display the information box
  sceneModePicker: false, //Whether to display 3D/2D selector
  selectionIndicator: false, //Whether to display the selection indicator component
  timeline: false, //Whether to display the timeline
  navigationHelpButton: false, //Whether to display the help button in the upper right corner
  navigationInstructionsInitiallyVisible: false,
  creditContainer: undefined,
  shouldAnimate: true
}

var viewer = new Cesium.Viewer("cesiumContainer");


viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load("./res/buildings.geojson")
);

viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load("./res/roads.geojson")
);

viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load("./res/points.geojson")
);
// openstreetmap(viewer)
// arcgis(viewer)
addGaode(viewer)



let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(event) {
    let cartesian = viewer.camera.pickEllipsoid(event.position);
    let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    let lng = Cesium.Math.toDegrees(cartographic.longitude); // 经度
    let lat = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
    let alt = cartographic.height; // 高度，椭球面height永远等于0
    let coordinate = {
        longitude: Number(lng.toFixed(6)),
        latitude: Number(lat.toFixed(6)),
        altitude: Number(alt.toFixed(2))
    };
    console.log(coordinate);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.53718, 39.758061, 800.0),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0
    }
  })
