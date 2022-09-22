import * as Cesium from 'cesium';

export function addGeoJson(viewer, url) {
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url))
}
