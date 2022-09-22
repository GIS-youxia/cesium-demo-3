/*
 * @Description:
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2021-07-26 18:23:10
 * @LastEditors: Hawk
 * @LastEditTime: 2021-08-23 15:02:45
 */
import * as Cesium from 'cesium';

import Effect from './Effect'
import { init } from './MaterialProperty/HexagonSpreadMaterialProperty'

/**
 *
 *
 * @class HexagonSpread
 * @extends {Effect}
 */
class HexagonSpread extends Effect {

  /**
   * Creates an instance of HexagonSpread.
   * @param {*} viewer
   * @param {string} id
   * @memberof HexagonSpread
   */
  constructor(viewer , id ) {
    super(viewer, id)
  }

  /**
   *
   *
   * @param {*} position
   * @param {string} color
   * @param {number} maxRadius
   * @param {number} duration
   * @param {boolean} [isedit=false]
   * @memberof HexagonSpread
   */
  add(position , color , maxRadius , duration , isedit = false) {
    init()
    super.add(position, color, maxRadius, duration, isedit)
    const _this = this
    let currentRadius = 1
    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        semiMajorAxis: new Cesium.CallbackProperty(function(n ) {
          currentRadius += (1000 / _this.duration) * 50
          if (currentRadius > _this.maxRadius) {
            currentRadius = 1
          }
          return currentRadius
        }, false),
        semiMinorAxis: new Cesium.CallbackProperty(function(n ) {
          return currentRadius
        }, false),
        material: new Cesium.HexagonSpreadMaterialProperty(
          new Cesium.Color.fromCssColorString(color)
        ),
      },
    })
  }
}
export default HexagonSpread
