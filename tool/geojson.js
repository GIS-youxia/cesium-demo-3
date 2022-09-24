import * as Cesium from 'cesium';

export function addGeoJson(viewer, options) {
  const { url, success, fail } = options;

  return new Promise((resolve, reject) => {
    Cesium.GeoJsonDataSource.load(url, options).then(source => {
      viewer.dataSources.add(source)
      success && success(source)
      resolve(source);
    }).catch(error => {
      fail && fail(error)
      reject(error);
    })
  })
}
