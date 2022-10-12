import { getCylinderPrimitive } from '../../tool/primitive'
import { CoordinateSystem } from '../enum/CoordinateSystem';
import { getRotationMatrixByEntity } from '../math/math';

/**
 * 绑定在对象的坐标轴
 * @export
 */
export class AxesHelperObject {
  /**
   * @param {Object} options
   * @param {Cesium.Entity}  options.target 目标对象
   * @param {CoordinateSystem}  options.coordinateSystem 默认 CoordinateSystem.ENU
   * @param {boolean}  options.show 显示, 默认true
   * @param {boolean}  options.floow 跟随, 默认true
   */
  constructor(options) {
    this.scale = options.scale !== undefined ? options.scale : 1;
    this._linePrimitives = [];
    this._target = options.target;
    this._coordinateSystem = options.coordinateSystem !== undefined ? options.coordinateSystem : CoordinateSystem.ENU;;
    this._show = options.show !== undefined ? options.show : true;
    this._floow = options.floow !== undefined ? options.floow : true;;

    this._group = new Cesium.PrimitiveCollection()
    options.viewer.scene.primitives.add(this._group)
    this._init();
  }

  get show() {
    return this._show;
  }

  set show(v) {
    this._show = v;
    this._group.show = v;
  }

  get coordinateSystem() {
    return this._coordinateSystem;
  }

  set coordinateSystem(v) {
    if (this._coordinateSystem === v) return;
    this._coordinateSystem = v;
    this.update();
  }

  get floow() {
    return this._floow;
  }

  /**
   * 旋转跟随目标对象,CoordinateSystem.ENU 时有效
   */
  set floow(v) {
    if (this._floow === v) return;
    this._floow = v;
    this.update();
  }

  _init() {
    const { viewer } = this;
    const length = 2000000 * this.scale;
    const width = 10000 * this.scale;

    const lineInfos = [
      {
        rotMatrix: new Cesium.Matrix3.fromRotationY(90 * Math.PI / 180),
        translate: { x: length / 2, y: 0, z: 0 },
        color: "#ff0000",
      },
      {
        rotMatrix: new Cesium.Matrix3.fromRotationX(90 * Math.PI / 180),
        translate: { x: 0, y: length / 2, z: 0 },
        color: "#00ff00",
      },
      {
        rotMatrix: new Cesium.Matrix3.fromRotationZ(90 * Math.PI / 180),
        translate: { x: 0, y: 0, z: length / 2 },
        color: "#0000ff",
      },
    ]

    for (let i = 0; i < lineInfos.length; i++) {
      const lineInfo = lineInfos[i];
      const { rotMatrix, translate, color } = lineInfo;

      const modelMatrix = Cesium.Matrix4.multiply(
        Cesium.Matrix4.IDENTITY,
        Cesium.Matrix4.fromRotationTranslation(rotMatrix, new Cesium.Cartesian3(translate.x, translate.y, translate.z)),
        new Cesium.Matrix4());

      const linePrimitive = getCylinderPrimitive({
        topRadius: width,
        bottomRadius: width,
        length,
        modelMatrix,
        color
      })
      this._linePrimitives.push(linePrimitive)
      this._group.add(linePrimitive)
    }
  }

  update() {
    const position = this._target.position.getValue(Cesium.JulianDate.now());
    const rotation = getRotationMatrixByEntity({
      target: this._target,
      floow: this.floow,
      coordinateSystem: this._coordinateSystem
    });

    for (let i = 0; i < this._linePrimitives.length; i++) {
      const line = this._linePrimitives[i];
      Cesium.Matrix4.multiply(
        Cesium.Matrix4.IDENTITY,
        Cesium.Matrix4.fromRotationTranslation(rotation, position),
        line.modelMatrix);
    }
  }
}
