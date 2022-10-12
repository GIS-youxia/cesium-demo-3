
import * as Cesium from 'cesium'
import * as MathUtils from './MathUtils.js';

export class Cartesian3Tool {

  /**
   * 模长
   * @param {Cesium.Cartesian3} v
   * @returns {number}
   */
  static length(v) {
    return Math.sqrt(this.lengthSquared(v));
  }

  /**
   * 模长平方
   * @param {Cesium.Cartesian3} v
   * @returns {number}
   */
  static lengthSquared(v) {
    return v.x * v.x + v.y * v.y + v.z * v.z;
  }

  /**
  * 两个向量的点积
  * @param {Cesium.Cartesian3} left
  * @param {Cesium.Cartesian3} right
  * @returns
  */
  static dot(left, right) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }

  /**
   * 两个向量的夹角
   * @param {Cesium.Cartesian3} left
   * @param {Cesium.Cartesian3} right
   * @returns
   */
  static angleTo(left, right) {
    const denominator = Math.sqrt(this.lengthSquared(left) * this.lengthSquared(right));
    if (denominator === 0) return Math.PI / 2;
    const theta = this.dot(left, right) / denominator;
    return Math.acos(MathUtils.clamp(theta, - 1, 1));
  }

  static subVectors(left, right, result) {
    if (!result) result = new Cesium.Cartesian3();
    result.x = left.x - right.x;
    result.x = left.y - right.y;
    result.x = left.z - right.z;
    return result;
  }
}
