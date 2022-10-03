import * as Cesium from 'cesium';
import source from './radarWave.glsl'

export class RadarWaveProperty {
  constructor(options) {
    this._definitionChanged = new Cesium.Event();
    this._color = options.color;
    this._speed = options.speed;
  };

  get isConstant() {
    return false;
  }

  get definitionChanged() {
    return this._definitionChanged;
  }

  static get type() {
    return "RadarWaveProperty"
  }

  getType(time) {
    return RadarWaveProperty.type;
  }

  getValue(time, result) {
    if (!Cesium.defined(result)) {
      result = {};
    }

    result.color = this._color
    result.speed = this._speed;
    return result
  }

  equals(other) {
    return (this === other ||
      (other instanceof RadarWaveProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Cesium.Material._materialCache.addMaterial(RadarWaveProperty.type, {
  fabric: {
    source,
    type: RadarWaveProperty.type,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
      speed: 10.0
    },
  },
  translucent: true
})
