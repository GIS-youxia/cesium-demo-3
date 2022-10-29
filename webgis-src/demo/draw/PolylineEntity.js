import * as Cesium from 'cesium';

export class PolylineEntity {
  constructor(viewer, lineWidth = 1) {
    this._viewer = viewer;
    this._getPositions = this._getPositions.bind(this);
    this.positions = [];

    this.entity = this._viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(this._getPositions, false),
        clampToGround: true,
        width: lineWidth,
        material: Cesium.Color.RED,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 800*10000)
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
