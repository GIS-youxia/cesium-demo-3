import * as Cesium from '../CesiumUnminified';

// 获取圆柱图元
export function getCylinderPrimitive(options) {
  options = options || {};
  const topRadius = options.topRadius !== undefined ? options.topRadius: 2000;
  const bottomRadius = options.bottomRadius !== undefined ? options.bottomRadius: 2000;
  const length = options.length !== undefined ? options.length: 2000;

 const coneGeometry = new Cesium.CylinderGeometry({
    length,
    topRadius,
    bottomRadius,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  });

  const coneGeometryInstance = new Cesium.GeometryInstance({
    id: 'RedCone',
    geometry: coneGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
    }
  });

  const primitive = new Cesium.Primitive({
    geometryInstances: coneGeometryInstance,
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: true,
      translucent: false
    })
  });

  return primitive;
}
