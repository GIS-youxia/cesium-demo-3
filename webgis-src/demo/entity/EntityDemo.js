import * as Cesium from 'cesium';

let info = {};
info.lon = 116.4715397068917;
info.lat = 39.9945712104195;

export class EntityDemo {
  constructor(viewer) {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(info.lon, info.lat, 0),
      label: {
        text: "蜂鸟Abc 28px",
        font: '28px Helvetica',
        disableDepthTestDistance: 1000000000,
        scale: 1,
        showBackground: true,
        backgroundPadding: new Cesium.Cartesian2(10, 10)
      }
    });

    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(info.lon+0.01, info.lat, 0),
      label: {
        text: "蜂鸟Abc 14",
        font: '14px Helvetica',
        disableDepthTestDistance: 1000000000,
        scale: 1,
        showBackground: true,
        backgroundPadding: new Cesium.Cartesian2(10, 10)
      }
    });

    this._setCamera(viewer);
  }

  _setCamera(viewer) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(info.lon, info.lat, 10000.0),
      duration: 0,
    })
  }
}
