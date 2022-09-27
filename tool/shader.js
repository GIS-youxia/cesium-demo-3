import * as Cesium from 'cesium';

export function getPureColor() {
  var customShader = new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: `
                    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                        // 物体的基础高度，需要修改成一个合适的建筑基础高度
                        float _baseHeight = 0.0;

                        // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange) 默认是 0-60米
                        float _heightRange = 60.0;

                        // float _glowRange = 300.0; // 光环的移动范围(高度)
                        float _glowRange = 0.0; // 光环的移动范围(高度)

                        float vtxf_height = fsInput.attributes.positionMC.z - _baseHeight;

                        float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 1.;

                        float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;

                        material.diffuse *= vec3(vtxf_a12);
                        float vtxf_a13 = fract(czm_frameNumber / 360.0);
                        float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);

                        vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
                        float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
                        material.diffuse += material.diffuse * (1.0 - vtxf_diff);
                    }
                    `,
  });

  return customShader;
}


export function createBuildingShader(){
  return new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    varyings: {
      v_normalMC: Cesium.VaryingType.VEC3
    },
    uniforms: {
      u_texture: {
        value: new Cesium.TextureUniform({
          url: './res/pic/wall.png'
        }),
        type: Cesium.UniformType.SAMPLER_2D
      }
    },
    vertexShaderText: `
void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
  v_normalMC = vsInput.attributes.normalMC;
}`,
    fragmentShaderText: `
     void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  vec3 positionMC = fsInput.attributes.positionMC;
  float width = 75.0;
  float height = 75.0;
  if (dot(vec3(0.0, 0.0, 1.0), v_normalMC) > 0.95) {
    material.diffuse = vec3(0.079, 0.107, 0.111);
  } else {
    float textureX = 0.0;
    float dotYAxis = dot(vec3(0.0, 1.0, 0.0), v_normalMC);
    // cos(45deg) 约等于 0.71
    if (dotYAxis > 0.71 || dotYAxis < -0.71) {
      textureX = mod(positionMC.x, width) / width;
    } else {
      textureX = mod(positionMC.y, width) / width;
    }

    float textureY = mod(positionMC.z, height) / height;
    vec3 rgb = texture2D(u_texture, vec2(textureX, textureY)).rgb;
    material.diffuse = rgb;
  }
}
    `
  })
}
