import * as Cesium from 'cesium';

/*
 * @Description:
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2021-07-24 20:36:11
 * @LastEditors: Hawk
 * @LastEditTime: 2021-08-23 14:49:56
 */
import Effect from './Effect'
import { init } from './MaterialProperty/CircleWaveMaterialProperty'

// 水波纹
class CircleWave extends Effect {
 /**
  * Creates an instance of CircleWave.
  * @param {*} viewer
  * @param {string} id
  * @memberof CircleWave
  */
 constructor(viewer , id ) {
    super(viewer, id)
  }

  /**
   *
   *
   * @param {number} d
   * @memberof CircleWave
   */
  change_duration(d ) {
    super.change_duration(d)
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._ellipse._material.duration = d
  }

  /**
   *
   *
   * @param {number} d
   * @memberof CircleWave
   */
  change_waveCount(d ) {
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._ellipse._material.count = d
  }

  /**
   *
   *
   * @param {*} position
   * @param {string} color
   * @param {number} maxRadius
   * @param {number} duration
   * @param {boolean} [isedit=false]
   * @param {number} [count=3]
   * @memberof CircleWave
   */
  add(position , color , maxRadius , duration , isedit = false, count = 3) {
    init()
    super.add(position, color, maxRadius, duration, isedit)
    const _this = this
    this.count = count
    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        // height: position[2],
        semiMinorAxis: new Cesium.CallbackProperty(function(n ) {
          return _this.maxRadius
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(function(n ) {
          return _this.maxRadius
        }, false),
        material: new Cesium.CircleWaveMaterialProperty({
          duration: duration,
          gradient: 0,
          color: new Cesium.Color.fromCssColorString(color),
          count: count,
        }),
      },
    })
  }
}
export default CircleWave
