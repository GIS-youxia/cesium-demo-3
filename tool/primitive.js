import * as Cesium from 'cesium';
// https://github.com/cesiumlab/cesium-custom-primitive/

const idManager = {
  cylinder: 0,
}

// 获取圆柱图元
export function getCylinderPrimitive(options) {
  options = options || {};
  const topRadius = options.topRadius !== undefined ? options.topRadius: 200000;
  const bottomRadius = options.bottomRadius !== undefined ? options.bottomRadius: 200000;
  const length = options.length !== undefined ? options.length : 400000;
  const color = options.color !== undefined ? options.color : '#ffffff';
  const { modelMatrix } = options;

  idManager.cylinder += 1;

 const coneGeometry = new Cesium.CylinderGeometry({
    length,
    topRadius,
    bottomRadius,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  });

  const cesiumColor = Cesium.Color.fromCssColorString(color);
  const coneGeometryInstance = new Cesium.GeometryInstance({
    modelMatrix,
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
    modelMatrix: modelMatrix,
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
