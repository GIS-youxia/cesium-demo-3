import * as Cesium from 'cesium';
import { getCylinderPrimitive } from '../misc/primitive';
import { Cartesian3Tool } from '../math/Cartesian3Tool'
import { addPoint, pickEntity } from '../misc';
import { Matrix4Tool } from '../math/Matrix4Tool';
import { Matrix3Tool } from '../math/Matrix3Tool';



export class VectorEntity{

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
    // addPoint({
    //   viewer,
    //   position
    // })
    // addPoint({
    //   viewer,
    //   position: new Cesium.Cartesian3(0,0,0)
    // })
    // Cesium.Cartesian3.multiplyByScalar(direction, length, direction)

    //
    const mat4ToStart = Matrix4Tool.lookAt(Cesium.Cartesian3.UNIT_Z, from, Cesium.Cartesian3.UNIT_Z, new Cesium.Matrix4())
    const mat42 = Matrix4Tool.lookAt(from, direction, Cesium.Cartesian3.UNIT_Z, new Cesium.Matrix4())
    // const mat4Y = Matrix4Tool.lookAt(Cesium.Cartesian3.UNIT_Y, direction, Cesium.Cartesian3.UNIT_Y, new Cesium.Matrix4())
    // const mat4Z = Matrix4Tool.lookAt(Cesium.Cartesian3.UNIT_Z, direction, Cesium.Cartesian3.UNIT_Y, new Cesium.Matrix4())
    const mat4 = Cesium.Matrix4.multiply(mat42, mat4ToStart, new Cesium.Matrix4());
    // Cesium.Matrix4.multiply(mat4Z, mat4, mat4);

    // Cesium.Cartesian3.multiplyByScalar(direction, length, direction)

    // const rotation = Cesium.Matrix3.fromM
    const rotation = Matrix3Tool.setFromMatrix4(mat4, new Cesium.Matrix3())
    const q = Cesium.Quaternion.fromRotationMatrix(rotation);
    const hpr = Cesium.HeadingPitchRoll.fromQuaternion(q);
    console.error(hpr);

    // const angle = Cartesian3Tool.angleTo(Cesium.Cartesian3.UNIT_Z, direction);
    // const rotMatrix = Cesium.Matrix3.fromRotationX(-angle, new Cesium.Matrix3());
    // const pitch = Cartesian3Tool.angleTo(Cesium.Cartesian3.UNIT_Y, direction);
    // const heading = Cartesian3Tool.angleTo(Cesium.Cartesian3.UNIT_Z, direction);
    // console.error(heading, pitch, roll);

    // const rotMatrix = Cesium.Matrix3.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(heading, pitch, roll), new Cesium.Matrix3())

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
    console.error(this.primitive);

  }

  get show() {
    return this._show;
  }

  set show(v) {
    this._show = v;
    this.entity.show = v;
  }
}
