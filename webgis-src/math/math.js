import * as Cesium from 'cesium';

/**
 * 获取实体ENU坐标系的旋转信息
 * @param {Cesium.Entity} target
 * @return {Cesium.HeadingPitchRoll}
 */
export function getRotation(target) {
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

export function getRotationDirction(target) {
  // const euler = getRotation(target);
}

/**
 * 设置实体的旋转
 * @param  {Cesium.Entity} target
 * @param {Object} options 弧度
 * @param {number} options.heading 绕 Z 轴旋转
 * @param {number} options.pitch  绕 Y 轴旋转
 * @param {number} options.roll  绕 X 轴旋转
 */
export function setRotation(target, options) {
  const { heading, pitch, roll } = options;
  const position = target.position.getValue(Cesium.JulianDate.now());

  const euler = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const quaternion = Cesium.Transforms.headingPitchRollQuaternion(position, euler)

  target.orientation = new Cesium.CallbackProperty(() => {
    return quaternion;
  }, false)
}

export function getPosition(target) {
  const modelMatrixTarget = target.computeModelMatrix(Cesium.JulianDate.now())
  const position = Cesium.Matrix4.getTranslation(modelMatrixTarget, new Cesium.Cartesian3())
  console.error(position);
  return position;
}
