import * as Cesium from 'cesium';

export class PolygonEntity {
  constructor(viewer) {
    this._viewer = viewer;
    this._getPositions = this._getPositions.bind(this);
    this.positions = [];

    this._entity = this._viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => {
          return new Cesium.PolygonHierarchy(this.positions)
        }, false),
        material: new Cesium.Color.fromCssColorString('rgba(255,0,0,0.5)'),
        outline: false,
        perPositionHeight: false
      }
    });

    this._polylineEntity = this._viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(this._getPositions, false),
        clampToGround: true,
        width: 2,
        material: Cesium.Color.RED
      }
    });
  }


  _getPositions() {
    return this.positions
  }

  dispose() {
    this._viewer.entities.remove(this._entity);
  }
}
