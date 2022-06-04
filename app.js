import * as Cesium from 'cesium'
window.Cesium = Cesium;
window.CESIUM_BASE_URL = "/node_modules/cesium/Source";


Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;

var viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
  animation: false,
  timeline: false,
});

viewer.dataSources.add(Cesium.GeoJsonDataSource.load("./SampleData/ne_10m_us_states.topojson"))
