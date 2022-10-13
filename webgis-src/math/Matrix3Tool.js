import * as Cesium from 'cesium'

export class Matrix3Tool {

  /**
   * @param {Cesium.Matrix4} m
   * @param {Cesium.Matrix3} result
   */
  static setFromMatrix4(m, result) {
    if (!result) result = Cesium.Matrix3();
    const arr = [
      m[0], m[4], m[8],
      m[1], m[5], m[9],
      m[2], m[6], m[10]
    ];
    Cesium.Matrix3.fromRowMajorArray(arr, result);
    return result;
  }
}
