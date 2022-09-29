import PolylineFlowMaterial from './PolylineFlowMaterial.glsl'
import * as Cesium from 'cesium';

export class VertiicalFlowLinePrimitive {
  constructor(positions, width) {
    const ins = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: positions,
        width: width
      })
    });
    this.primitive = new Cesium.Primitive({
      asynchronous: false,
      geometryInstances: ins
    });
  }

  setStyle(style = {}) {
    const material =  new Cesium.Material({
      fabric: {
        type: 'MyCustomShader1',
        uniforms: {
          color: style.color||new Cesium.Color(1.0, 0.0, 0.0, 0.7),
          speed: style.speed||1,
          percent: style.percent||0.03,
          gradient: style.gradient|| 0.1
        },
        source: PolylineFlowMaterial
      }
    })

    this.primitive.appearance = new Cesium.PolylineMaterialAppearance({
      material,
    })
  }
}
