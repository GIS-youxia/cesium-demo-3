import * as Cesium from '../CesiumUnminified';
import { getCylinderEntity } from './entity'
import { getCylinderPrimitive } from './primitive'

/**
 * 添加地球的坐标轴
 * @param {*} viewer
 */
export function addAxisGlobe(viewer) {
  const width = 40000;
  const length = 6000*500;

  const lineX = getCylinderEntity({
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    length,
    topRadius: width,
    bottomRadius: width,
    color: '#ff0000',
    position: new Cesium.Cartesian3(1, 0, 0)
  })
  viewer.entities.add(lineX)

  const lineY = getCylinderEntity({
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    length,
    topRadius: width,
    bottomRadius: width,
    color: '#00ff00',
    position: new Cesium.Cartesian3(0, 1, 0)
  })
  viewer.entities.add(lineY)

  const lineZ = getCylinderEntity({
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    length,
    topRadius: width,
    bottomRadius: width,
    color: '#0000ff',
    position: new Cesium.Cartesian3(0, 0, 1)
  })
  viewer.entities.add(lineZ)
}


/**
 * 绑定在图元的坐标轴
 * @export
 * @class AxisByPrimitive
 */
export class AxisByPrimitive {
  /**
   * Creates an instance of AxisByPrimitive.
   * @param {*} viewer
   * @param {*} targetPrimitive 目标图元
   * @memberof AxisByPrimitive
   */
  constructor(viewer, targetPrimitive) {
    this.viewer = viewer;
    this.linePrimitives = []
    this.targetPrimitive = targetPrimitive;

    this._floowPrimitive = false;
    this.init()
  }

  get floowPrimitive() {
    return this._floowPrimitive;
  }

  /**
   * 旋转跟随目标图元
   */
  set floowPrimitive(v) {
    this._floowPrimitive = v;
  }

  init() {
    const { viewer } = this;
    const length = 2000000;
    const width = 10000;

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
      this.linePrimitives.push(linePrimitive)
      viewer.scene.primitives.add(linePrimitive)
    }
  }

  update() {
    const modelMatrixTarget = this.targetPrimitive.modelMatrix;
    const translate = new Cesium.Cartesian3()
    Cesium.Matrix4.getTranslation(modelMatrixTarget, translate)

    const rotation = new Cesium.Cartesian3(1,0,0)
    if (this.floowPrimitive) {
      Cesium.Matrix4.getRotation(modelMatrixTarget, rotation)
    } else {
      Cesium.Matrix4.getRotation(Cesium.Matrix4.IDENTITY, rotation)
    }

    for (let i = 0; i < this.linePrimitives.length; i++){
      const line = this.linePrimitives[i];

      Cesium.Matrix4.multiply(
        Cesium.Matrix4.IDENTITY,
        Cesium.Matrix4.fromRotationTranslation(rotation, new Cesium.Cartesian3(translate.x, translate.y, translate.z)),
        line.modelMatrix);
    }
  }
}
