/**
 * @Author: Caven
 * @Date: 2021-01-13 20:52:47
 */

// import { Cesium } from '@dc-modules/namespace'
import * as Cesium from 'cesium';
import { IMG_PARTICLES } from '../../../misc/ImageParticles'
import MaterialProperty from '../MaterialProperty';
// import MaterialProperty from '../../MaterialProperty'
// const IMG = require('@dc-modules/images/lighting.png')

export class PolylineLightingTrailMaterialProperty extends MaterialProperty {
  constructor(options = {}) {
    super(options)
    this._image = undefined
    this._imageSubscription = undefined
    this.image = IMG_PARTICLES
  }

  getType(time) {
    return Cesium.Material.PolylineLightingTrailType
  }

  getValue(time, result) {
    if (!result) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrUndefined(this._color, time)
    result.image = Cesium.Property.getValueOrUndefined(this._image, time)
    result.speed = this._speed
    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineLightingTrailMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._speed, other._speed))
    )
  }
}

Object.defineProperties(PolylineLightingTrailMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed'),
  image: Cesium.createPropertyDescriptor('image')
})
