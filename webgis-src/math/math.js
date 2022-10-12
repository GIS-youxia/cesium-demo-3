import * as Cesium from 'cesium';
import { CoordinateSystem } from '../enum/CoordinateSystem';

/**
 * 获取实体相对于当前位姿的俯仰角
 * @param {Cesium.Entity} target
 * @return {Cesium.HeadingPitchRoll}
 */
export function getHeadingPitchRoll(target) {
  const position = target.position.getValue(Cesium.JulianDate.now());
  const modelMatrixTarget = target.computeModelMatrix(Cesium.JulianDate.now())

  const transformMatrix4 = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  Cesium.Matrix4.setTranslation(transformMatrix4, new Cesium.Cartesian3(0, 0, 0), transformMatrix4);
  Cesium.Matrix4.inverse(transformMatrix4, transformMatrix4)

  // 相对于 ENU的旋转
  const relativeMat4 = Cesium.Matrix4.multiply(
    transformMatrix4,
    modelMatrixTarget,
    new Cesium.Matrix4());
  const rotationMat3 = Cesium.Matrix4.getRotation(relativeMat4, new Cesium.Matrix3())

  const quaternion = Cesium.Quaternion.fromRotationMatrix(rotationMat3, new Cesium.Quaternion())
  const euler = Cesium.HeadingPitchRoll.fromQuaternion(quaternion, new Cesium.HeadingPitchRoll())
  return euler;
}

/**
 * 设置实体的相对于当前位姿的俯仰角
 * @param {Object} options
 * @param  {Cesium.Entity} options.target
 * @param {number} options.heading 绕 Z 轴旋转
 * @param {number} options.pitch  绕 Y 轴旋转
 * @param {number} options.roll  绕 X 轴旋转
 */
export function setHeadingPitchRoll(target, options) {
  const { heading, pitch, roll } = options;
  const position = target.position.getValue(Cesium.JulianDate.now());

  const euler = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const quaternion = Cesium.Transforms.headingPitchRollQuaternion(position, euler)

  target.orientation = new Cesium.CallbackProperty(() => {
    return quaternion;
  }, false)
}

/**
 * 获取实体的旋转矩阵
 * @param {Object} options
 * @param {CoordinateSystem} options.coordinateSystem 坐标系, 默认 CoordinateSystem.ENU
 * @param {boolean} options.coordinateSystem 旋转跟随目标实体, 默认 false
 * @param {Cesium.Entity} options.target 实体对象
 * @returns {Cesium.Matrix3} 旋转矩阵
 */
export function getRotationMatrixByEntity(options) {
  const { target } = options;
  const coordinateSystem = options.coordinateSystem !== undefined ? options.coordinateSystem : CoordinateSystem.ENU;
  const floow = options.floow !== undefined ? options.floow : false;

  const modelMatrix = target.computeModelMatrix(Cesium.JulianDate.now())

  // 取出旋转
  const rotationMat3 = new Cesium.Matrix3();
  if (coordinateSystem === CoordinateSystem.ECEF) {
    Cesium.Matrix4.getRotation(Cesium.Matrix4.IDENTITY, rotationMat3)
  } else {
    Cesium.Matrix4.getRotation(modelMatrix, rotationMat3)
  }
  // 只使用东北天旋转信息
  if (floow === false && coordinateSystem === CoordinateSystem.ENU) {
    const transformMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(target.position._value);
    Cesium.Matrix4.getRotation(transformMatrix, rotationMat3)
  }
  return rotationMat3;
}

/**
 * 获取实体的方向向量
 * @param {*} options
 */
export function getDirectionVectorByEntity(options) {
  const { target } = options;

  const headingVector = new Cesium.Cartesian3(0,0,1);
  const pitchVector = new Cesium.Cartesian3(0,1,0);
  const rollVector = new Cesium.Cartesian3(1, 0, 0);
  const rotation = getRotationMatrixByEntity({ target })

  Cesium.Matrix3.multiplyByVector(rotation, headingVector, headingVector)
  Cesium.Matrix3.multiplyByVector(rotation, pitchVector, pitchVector)
  Cesium.Matrix3.multiplyByVector(rotation, rollVector, rollVector)
  return {
    heading: headingVector,
    pitch: pitchVector,
    roll: rollVector,
  }
}
