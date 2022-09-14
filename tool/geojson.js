import * as Cesium from '../CesiumUnminified';

export function addGeoJson(viewer, url) {
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url))
}
