import * as Cesium from 'cesium';

const idManager = {
  cylinder: 0,
}

// 获取一个圆柱实体
export function getCylinderEntity(options) {
  options = options || {};

  const topRadius = options.topRadius !== undefined ? options.topRadius : 10000;
  const bottomRadius = options.bottomRadius !== undefined ? options.bottomRadius : 10000;
  const length = options.length !== undefined ? options.length : 20000;
  const color = options.color !== undefined ? options.color : '#ffffff';
  const heightReference = options.heightReference !== undefined ? options.heightReference : Cesium.HeightReference.CLAMP_TO_GROUND

  idManager.cylinder += 1;

  return new Cesium.Entity({
    id: idManager.cylinder,
    name: 'cylinder',
    position: options.position,
    cylinder: {
      heightReference,
      topRadius,
      bottomRadius,
      length,
      material: new Cesium.ImageMaterialProperty({
        color: Cesium.Color.fromCssColorString(color),
        transparent: false
      })
    }
  })
}

// 旋转一个实体
// export function setEntityRotation(entity, rotationY) {
//   var rotMatrix = new Cesium.Matrix3.fromRotationY(rotationY);
//   const mat1 = Cesium.Transforms.eastNorthUpToFixedFrame(entity.position);
//   Cesium.Matrix4.fromRotationTranslation(rotMatrix, new Cesium.Cartesian3(0.0, 0.0, length * 0.5)
// }

function rotation(params) {

  // 1、由四元数计算三维旋转矩阵

  var mtx3 = Cesium.Matrix3.fromQuaternion(orientation, matrix3Scratch)

  // 2、计算四维转换矩阵：
  var mtx4 = Cesium.Matrix4.fromRotationTranslation(mtx3, position, new Cesium.Matrix4());

  // 3、计算角度：

  var hpr = Cesium.Transforms.fixedFrameToHeadingPitchRoll(mtx4, ellipsoid, fixedFrameTransform, new Cesium.HeadingPitchRoll());
  var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll));
}
