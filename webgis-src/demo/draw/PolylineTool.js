import * as Cesium from 'cesium';
import { PolylineEntity } from './PolylineEntity';

export class PolylineTool {
  constructor(viewer) {
    this._viewer = viewer

    // 当前指示的marker
    this._activeMarker = null;
    this._markers = [];
    this._iconPath = "./res/pic/circle.png"

    this._enable = false;

    // 虚线数组
    this._dashPositions = [];

    // 虚线
    this._polylineDash = this._viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          return this._dashPositions
        }, false),
        clampToGround: true,
        width: 2,
        material: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.RED,
          dashLength: 20 //短划线长度
        })
      }
    });

    this._activePolyline = null;
    this._polylines = [];
  }

  get enable() {
    return this._enable;
  }

  set enable(v) {
    this._enable = v;

    if (v) {
      this._polylineDash.show = true;
      this._activePolyline = new PolylineEntity(this._viewer)
    }
  }

  cancle() {
    this._dashPositions = [];
    this._polylineDash.show = false;
    this._markers.forEach(marker => {
      this._viewer.entities.remove(marker);
    });
    this._activePolyline.dispose();
    this._activePolyline = null;
    this._activeMarker = null;
  }

  finish() {
    this._dashPositions = [];
    this._polylineDash.show = false;
    this._markers.forEach(marker => {
      this._viewer.entities.remove(marker);
    });

    this._polylines.push(this._activePolyline)
    this._activePolyline = null;
    this._activeMarker = null;
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

    if (this._dashPositions[0]) {
      this._dashPositions[1] = position
    }
    if (!this._activeMarker) {
      this._activeMarker = this._addMarker(position);
    } else {
      this._activeMarker.position = position;
    }

  }

  mouseClick(position) {
    if (!this._enable) return;

    this._activeMarker = this._addMarker(position);
    this._dashPositions[0] = position;
    this._activePolyline.positions.push(position);
  }
}
