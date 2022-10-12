import * as Cesium from 'cesium';
import { getCylinderPrimitive } from '../misc/primitive';
import { Cartesian3Tool } from '../math/Cartesian3Tool'
import { addPoint, pickEntity } from '../misc';
import { Matrix4Tool } from '../math/Matrix4Tool';



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
    const { viewer, direction, position } = options;
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
    Cesium.Cartesian3.multiplyByScalar(direction, length, direction)

    // Matrix4Tool.
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
      Cesium.Matrix4.fromRotationTranslation(rotMatrix, position),
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
