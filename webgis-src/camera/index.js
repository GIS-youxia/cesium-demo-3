import { Transform } from "../../src/transform/Transform";
import * as Cesium from 'cesium'

export class CameraManager {
  constructor(viewer) {
    this._viewer = viewer;
  }

  /**
  *
  * @private
  */
  _bindEvent() {
    this._viewer.clock.onTick.addEventListener(this._onLoop, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.clock.onTick.removeEventListener(this._onLoop, this)
  }

  _onLoop() {
    if (this._type === "ArroundPoint") {
      this._viewer.camera.lookAt(
        this._options.targetPosition,
        new Cesium.HeadingPitchRange(
          Cesium.Math.toRadians(this._options.heading || 0),
          Cesium.Math.toRadians(this._options.pitch || 0),
          Cesium.Math.toRadians(this._options.range || 0),
        )
      )
    } else if (this._type === "AroundView") {
      const pitch = this._options.pitch ? Cesium.Math.toRadians(this._options.pitch) : this._viewer.camera.pitch;
      const roll = this._options.roll ? Cesium.Math.toRadians(this._options.roll) : this._viewer.camera.roll;

      this._viewer.camera.setView({
        orientation: {
          heading: Cesium.Math.toRadians(this._options.heading),
          pitch,
          roll
        }
      })
    }

    this._options.heading += 0.1;
  }

  // 配置参数
  setConfig(options) {
    const { type } = options;
    this._type = type;
    this._options = options;

    if (this._type == "AroundView") {
      const pitch = this._options.pitch ? Cesium.Math.toRadians(this._options.pitch) : this._viewer.camera.pitch;
      const roll = this._options.roll ? Cesium.Math.toRadians(this._options.roll) : this._viewer.camera.roll;
      this._viewer.camera.setView({
        destination: this._options.cameraPosition,
        orientation: {
          heading: Cesium.Math.toRadians(this._options.heading),
          pitch,
          roll
        }
      })
    }
  }

  start() {
    this._bindEvent();
  }

  stop() {
    this._unbindEvent();
  }
}
