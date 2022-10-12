import * as Cesium from 'cesium';
// https://github.com/cesiumlab/cesium-custom-primitive/

const idManager = {
  cylinder: 0,
}

/**
 * 获取圆柱图元
 * @param {number} options
 * @param {Cesium.Matrix4} options.geometryInstancesModelMatrix 几何体的模型矩阵, 默认单位矩阵
 * @param {Cesium.Matrix4} options.modelMatrix 图元的模型矩阵, 默认单位矩阵
 * @param {number} options.topRadius 默认 200000
 * @param {number} options.bottomRadius 默认 200000
 * @param {number} options.length 默认 200000
 * @param { string } options.color 默认 '#ff0000'
 * @returns {Cesium.Primitive}
 */
export function getCylinderPrimitive(options) {
  options = options || {};
  const { modelMatrix, geometryInstancesModelMatrix } = options;

  const topRadius = options.topRadius !== undefined ? options.topRadius: 200000;
  const bottomRadius = options.bottomRadius !== undefined ? options.bottomRadius: 200000;
  const length = options.length !== undefined ? options.length : 400000;
  const color = options.color !== undefined ? options.color : '#ff0000';

  idManager.cylinder += 1;

 const coneGeometry = new Cesium.CylinderGeometry({
    length,
    topRadius,
    bottomRadius,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  });

  const cesiumColor = Cesium.Color.fromCssColorString(color);
  const coneGeometryInstance = new Cesium.GeometryInstance({
    modelMatrix: geometryInstancesModelMatrix || Cesium.Matrix4.IDENTITY,
    id: 'cylinder_'+idManager.cylinder,
    geometry: coneGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor)
    }
  });

  return new Cesium.Primitive({
    geometryInstances: coneGeometryInstance,
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: true,
      translucent: false
    }),
    modelMatrix: modelMatrix || Cesium.Matrix4.IDENTITY,
    asynchronous: false
  });
}


export function getPrimitive(options) {
  options = options || {};

  const { modelMatrix, geometry, appearance } = options;

  const geometryInstances = new Cesium.GeometryInstance({
    geometry,
    modelMatrix,
  });

  return new Cesium.Primitive({
    appearance,
    geometryInstances,
    asynchronous: false
  });
}
