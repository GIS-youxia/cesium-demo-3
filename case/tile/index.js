import * as Cesium from 'cesium';

export class Tile {
  constructor(viewer) {
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: "./res/tileset.json",
      })
    );


    tileset.readyPromise.then(function (tileset) {
      viewer.zoomTo(tileset);
      tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ['true', 'rgba(0, 127.5, 255 ,1)']
          ]
        }
      });

      var customShader = new Cesium.CustomShader({
        lightingModel: Cesium.LightingModel.UNLIT,
        fragmentShaderText: `
                    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                        float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
                        float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
                        float _glowRange = 300.0; // 光环的移动范围(高度)
                        float vtxf_height = fsInput.attributes.positionMC.z-_baseHeight;
                        float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                        float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
                        material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
                        float vtxf_a13 = fract(czm_frameNumber / 360.0);
                        float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
                        vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
                        float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
                        material.diffuse += material.diffuse * (1.0 - vtxf_diff);
                    }
                    `,
      });
      tileset.customShader = customShader;
    });
    window.tileset = tileset;


  }
}
