import * as Cesium from 'cesium';
import source from './WallImageTrailMaterial.glsl'

export class WallImageTrailProperty{
  constructor() {
    this._definitionChanged = new Cesium.Event()
  }

  get definitionChanged() {
    return this._definitionChanged;
  }

  getType() {
    return WallImageTrailProperty.type;
  }

  equals() {
    return ''
  }

  getValue() {
    return ''
  }

  static get type() {
    return "WallImageTrail"
  }
}

Cesium.Material._materialCache.addMaterial(WallImageTrailProperty.type, {
  fabric: {
    type: WallImageTrailProperty.type,
    uniforms: {
      image: './res/pic/arrow.png',
      color: Cesium.Color.YELLOW,
      repeat: { x: 50, y: 1 },
      speed: 10
    },
    source: source
  },
  translucent: true
})
