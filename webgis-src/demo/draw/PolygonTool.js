import * as Cesium from 'cesium';
import { PolygonEntity } from './PolygonEntity';

export class PolygonTool {
  constructor(viewer) {
    this._viewer = viewer

    // 当前指示的marker
    this._activeMarker = null;
    this._markers = [];
    this._iconPath = "./res/pic/circle.png"

    this._enable = false;

    this._activePolygon = null;
    this._activePolygonPointCount = 0;
    this._polygons = [];
  }

  get enable() {
    return this._enable;
  }

  set enable(v) {
    this._enable = v;
  }

  get children() {
    return this._markers;
  }

  cancle() {
    this._dashPositions = [];
    // this._polylineDash.show = false;
    this._markers.forEach(marker => {
      this._viewer.entities.remove(marker);
    });
    this._activePolygon.dispose();
    this._activePolygon = null;
    this._activeMarker = null;
  }

  finish() {
    this._dashPositions = [];
    // this._polylineDash.show = false;
    this._markers.forEach(marker => {
      this._viewer.entities.remove(marker);
    });

    // this._activePolygon.positions.length = this._activePolygonPointCount
    this._polygons.push(this._activePolygon)
    this._activePolygon = null;
    this._activeMarker = null;
    this._activePolygonPointCount = 0
  }

  _addMarker(position) {
    const marker = this._viewer.entities.add({
      position,
      billboard: {
        image: this._iconPath,
        scale: 1,
        width: 14,
        height: 14
      }
    });
    this._markers.push(marker);
    return marker;
  }

  mouseMove(position) {
    if (!this._enable) return;

    if (!this._activePolygon) {
      this._activePolygon = new PolygonEntity(this._viewer)
    }

    this._activePolygon.positions[this._activePolygonPointCount] = position
    if (!this._activeMarker) {
      this._activeMarker = this._addMarker(position);
    } else {
      this._activeMarker.position = position;
    }

  }

  mouseClick(position) {
    if (!this._enable) return;

    this._activePolygon.positions[this._activePolygonPointCount] = position;
    this._activePolygonPointCount += 1

    const first = this._activePolygon.positions[0];

    if (this._activePolygon.positions.length >= 3 && Cesium.Cartesian3.distance(first, position) < 50) {
      this._activePolygon.positions[this._activePolygon.positions.length - 1] = first;
      this.finish();
      console.log("finish...");
      return;
    }
    this._activeMarker = this._addMarker(position);
  }
}
