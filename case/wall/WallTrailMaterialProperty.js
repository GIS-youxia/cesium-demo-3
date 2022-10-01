import * as Cesium from 'cesium';
import source from './WallTrailMaterial.glsl'
// import source2 from './WallRippleMaterial.glsl'

export class WallTrailMaterialProperty {
  constructor() {
    this._definitionChanged = new Cesium.Event()
  }

  get definitionChanged() {
    return this._definitionChanged;
  }

  getType() {
    return WallTrailMaterialProperty.type;
  }

  equals() {
    return ''
  }

  getValue() {
    return ''
  }

  static get type() {
    return "WallTrail"
  }
}

Cesium.Material._materialCache.addMaterial(WallTrailMaterialProperty.type, {
  fabric: {
    type: WallTrailMaterialProperty.type,
    uniforms: {
      color: Cesium.Color.GREEN,
      speed: 2,
      count: 10,
      image: './res/pic/default.png',
    },
    source: source
  },
  translucent: true
})
