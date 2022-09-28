import * as Cesium from 'cesium'

export function colorMaterial(options) {
  options = options || {};
  const color = options.color !== undefined ? options.color : '#ffffff';
  const cesiumColor = Cesium.Color.fromCssColorString(color);

  return new Cesium.Material({
    fabric: {
      type: 'Color',
      uniforms: {
        color: cesiumColor
      },
      components: {
        diffuse: 'color.rgb',
        alpha: 'color.a'
      }
    },
    translucent: false
  });
}

export function imageMaterial(params) {
  return new Cesium.Material({
    fabric: {
      type: 'Image',
      uniforms: {
        image: '../../SampleData/models/CesiumBalloon/CesiumBalloonPrint_singleDot.png',
        repeat: new Cesium.Cartesian2(1.0, 1.0),
        color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
      },
      components: {
        diffuse: 'texture2D(image, fract(repeat * materialInput.st)).rgb * color.rgb',
        alpha: 'texture2D(image, fract(repeat * materialInput.st)).a * color.a'
      }
    },
    translucent: false
  });
}


export function compositeMaterial(params) {
  return new Cesium.Material({
    fabric: {
      type: 'OurMappedPlastic',
      materials: {
        diffuseMaterial: {
          type: 'DiffuseMap',
          uniforms: {
            image: '../../SampleData/models/CesiumBalloon/CesiumBalloonPrint_singleDot.png'
          }
        },
        alphaMap: {
          type: 'AlphaMap',
          uniforms: {
            image: '../../SampleData/models/CesiumBalloon/FlameGrate.png',
            channel: 'r'
          }
        }
      },
      components: {
        diffuse: 'diffuseMaterial.diffuse',
        // specular: 'specularMaterial.specular',
        // alpha: 'diffuseMaterial.diffuse.g',
        alpha: 'alphaMap.alpha * 3.0',
      },
    },
    translucent: function (material) {
      // return material.uniforms.color.alpha < 1.0;
      return false;
    }
  });
}

export function customMaterial(params) {
  return new Cesium.Material({
    fabric: {
      type: 'MyCustomShader1',
      uniforms: {
        image: '../../SampleData/models/CesiumBalloon/CesiumBalloonPrint_singleDot.png',
        color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
        cellAlpha: 0.3
      },
      source: `
        uniform vec4 color;
        uniform float cellAlpha;

        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
            czm_material material = czm_getDefaultMaterial(materialInput);

            vec2 st = materialInput.st;
            float aa = st.s * st.t;
            vec3 halfColor = color.rgb * aa + texture2D(image, materialInput.st).rgb * (1.0 - aa);
            halfColor *= 0.5;
            material.diffuse = halfColor;
            material.emission = halfColor;
            // material.alpha = color.a * aa;
            material.alpha = 1.0;

            return material;
        }
                            `
    },
    translucent: false
  });
}
