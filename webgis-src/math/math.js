import * as Cesium from 'cesium';

//Heading -> Z
// Pitch -> Y
// Roll -> X
export function getRotation(target) {
  // const position = target.position._value;

  // // 实体上的变换信息
  // if (target instanceof Cesium.Entity) {
  //   let orientation;
  //   if (target.orientation) {
  //     orientation = target.orientation._value;
  //   } else {
  //     const headingPitchRoll = new Cesium.HeadingPitchRoll(0, 0, 0);
  //     orientation = Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll, new Cesium.Quaternion());
  //   }
  //   // console.error(orientation);
  //   // const euler = ;
  //   let a = Cesium.HeadingPitchRoll.fromQuaternion(orientation, new Cesium.HeadingPitchRoll())
  //   console.error(a);

  //   const rotationMat3 = Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3())

  //   // 实体上挂载几何对象的变换信息
  //   const tempMat3 = new Cesium.Matrix3();
  //   const transformMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  //   Cesium.Matrix4.getRotation(transformMatrix, tempMat3);

  //   // 最后组合后的旋转
  //   Cesium.Matrix3.multiply(rotationMat3, tempMat3, rotationMat3)

  //   const quaternion = Cesium.Quaternion.fromRotationMatrix(rotationMat3, new Cesium.Quaternion())
  //   const euler = new Cesium.HeadingPitchRoll();
  //   Cesium.HeadingPitchRoll.fromQuaternion(quaternion)
  //   console.error(euler);

  //   return euler;
  let rotationMat3 = new Cesium.Matrix3();
  let modelMatrixTarget = target.computeModelMatrix(Cesium.JulianDate.now())
  Cesium.Matrix4.getRotation(modelMatrixTarget, rotationMat3)

      const quaternion = Cesium.Quaternion.fromRotationMatrix(rotationMat3, new Cesium.Quaternion())
    const euler = new Cesium.HeadingPitchRoll();
    Cesium.HeadingPitchRoll.fromQuaternion(quaternion)
    console.error(euler);

    return euler;

}
