import * as Cesium from 'cesium';
import glsl from './odLine.glsl'

export function getMaterial(color) {
    const material = new Cesium.Material({
      fabric: {
        type:"ODLineMaterial",
        uniforms: {
          color_0_0: color,
          totoalFrameCount_1_1:  1000,
        },
        source: glsl
      }
    })

    return new Cesium.PolylineMaterialAppearance({
      material,
    })
  }
