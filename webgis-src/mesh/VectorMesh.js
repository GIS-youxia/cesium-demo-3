import * as Cesium from 'cesium';
import { getCylinderPrimitive } from '../misc/primitive';
import { Matrix3Tool } from '../math/Matrix3Tool';
import {
  getHeadingPitchRollByRotationMatrix,
  getRotationTransformSrcToDestByAxisAngle
} from '../math/math';


/**
 * 方向向量网格
 */
export class VectorMesh{

  /**
   * @param {*} options
   * @param { Cesium.Viewer } options.viewer
   * @param { Cesium.Cartesian3 } options.direction
   * @param { Cesium.Cartesian3 } options.position
   * @param { number } options.length 默认 1
   * @param { number } options.width 默认 10
   * @param { string } options.color 默认 "#FF0000"
   * @param { boolean } options.show 默认 true
   */
  constructor(options) {
    const { viewer, direction, position,from } = options;
    const color = options.color !== undefined ? options.color : "#ff0000";
    const length = options.length !== undefined ? options.length : 1;
    const width = options.width !== undefined ? options.width : 10;
    const show = options.show !== undefined ? options.show : true;

    this._debugger = false;


    const mat4 = getRotationTransformSrcToDestByAxisAngle(Cesium.Cartesian3.UNIT_Z, direction);
    if (this._debugger) {
      this.checkResult(zToStartMat4, Cesium.Cartesian3.UNIT_Z, direction);
    }

    const rotation = Matrix3Tool.setFromMatrix4(mat4, new Cesium.Matrix3())

    // const length = Cartesian3Tool.length(direction);
    this.primitive = getCylinderPrimitive({
      color,
      length: length,
      geometryInstancesModelMatrix: Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.IDENTITY, new Cesium.Cartesian3(0, 0, 0)),
      topRadius: width,
      bottomRadius: width,
    })

    Cesium.Matrix4.multiply(
      Cesium.Matrix4.IDENTITY,
      Cesium.Matrix4.fromRotationTranslation(rotation, position),
      this.primitive.modelMatrix);

    this._show = show;
    this.primitive.show = show;
    viewer.scene.primitives.add(this.primitive);
  }

  get show() {
    return this._show;
  }

  set show(v) {
    this._show = v;
    this.entity.show = v;
  }

  /**
   * 验证变换矩阵
   * @param {Cesium.Matrix4} mat4 变换矩阵
   * @param {Cesium.Cartesian3} from
   * @param {Cesium.Cartesian3} dest
   */
  checkResult(mat4, from, dest) {
    const rotation = Matrix3Tool.setFromMatrix4(mat4, new Cesium.Matrix3())
    console.error("from", from);
    console.error("step", getHeadingPitchRollByRotationMatrix(rotation));
    console.error("dest", dest);

    const result = Cesium.Matrix3.multiplyByVector(rotation, from, new Cesium.Cartesian3())
    console.error("result", result);
  }
}
