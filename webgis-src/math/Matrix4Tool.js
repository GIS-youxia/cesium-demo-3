
import * as Cesium from 'cesium'
import { Cartesian3Tool } from "./Cartesian3Tool";

const _x = new Cesium.Cartesian3();
const _y = new Cesium.Cartesian3();
const _z = new Cesium.Cartesian3();

export class Matrix4Tool {

  /**
   *
   * @param {Cesium.Cartesian3} eye
   * @param {Cesium.Cartesian3} target
   * @param {Cesium.Cartesian3} up
   * @param {Cesium.Matrix4} result
   */
  static lookAt(eye, target, up, result) {
    if (!result) result = new Cesium.Matrix4();

    Cartesian3Tool.subVectors(eye, target, _z)
    if (Cartesian3Tool.lengthSq(_z) === 0) {
      // eye and target are in the same position
      _z.z = 1;
    }

    Cesium.Cartesian3.normalize(_z, _z)
    Cesium.Cartesian3.cross(up, _z, _x)

    if (Cartesian3Tool.lengthSq(_x) === 0) {
      // up and z are parallel
      if (Math.abs(up.z) === 1) {
        _z.x += 0.0001;
      } else {
        _z.z += 0.0001;
      }

      Cesium.Cartesian3.normalize(_z, _z)
      Cesium.Cartesian3.cross(up, _z, _x)
    }

    Cesium.Cartesian3.normalize(_x, _x)
    Cesium.Cartesian3.cross(_z, _x, _y)

    result[0] = _x.x; result[4] = _y.x; result[8] = _z.x;
    result[1] = _x.y; result[5] = _y.y; result[9] = _z.y;
    result[2] = _x.z; result[6] = _y.z; result[10] = _z.z;
    return result;
  }
}
