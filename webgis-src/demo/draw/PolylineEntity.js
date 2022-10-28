import * as Cesium from 'cesium';

export class PolylineEntity {
  constructor(viewer) {
    this._viewer = viewer;
    this._getPositions = this._getPositions.bind(this);
    this.positions = [];

    this._entity = this._viewer.entities.add({
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
