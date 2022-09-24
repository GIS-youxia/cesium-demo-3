import * as Cesium from 'cesium';

export function fnLoadKML(viewer, kmlurl) {
  var options = {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas,
    clampToGround: false,
    attachPolygon: true
  };

  var promise = Cesium.KmlDataSource.load(kmlurl, options);
  promise.then(function (dataSource) {
    viewer.dataSources.add(dataSource);
  })
}
