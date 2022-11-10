import * as Cesium from 'cesium'
const highGlsl = require("./a.glsl")
const blurGlsl = require("./b.glsl")
const c = require("./c.glsl")
const dGlsl = require("./d.glsl")


export class BloomTarget {
  constructor(viewer) {
    this._viewer = viewer;

    const config = {
      "contrast": 119,
      "brightness": 0.05,
      "blurSamples": 32,
      "delta": 0.9,
      "sigma": 3.78,
      "stepSize": 5,
      "ratio": 2,
      "threshold": 0,
      "smoothWidth": 0.01,
      "eventType": "click",
      "color": {
        "red": 1, "green": 0, "blue": 0, "alpha": 1
      }
    }
    const high = new Cesium.PostProcessStage({
      name: "a",
      fragmentShader: highGlsl,
      uniforms: {
        marsColor: Cesium.Color.BLACK,
        marsOpacity: 1,
        smoothWidth: config.smoothWidth,
        threshold: config.threshold,
      }
    })

    const blur_x = new Cesium.PostProcessStage({
      name: "blur_x",
      fragmentShader: blurGlsl,
      uniforms: {
        delta: config.delta,
        sigma: config.sigma,
        stepSize: config.stepSize,
        direction: 0
      },
      sampleMode: Cesium.PostProcessStageSampleMode.LINEAR
    })

    const blur_y = new Cesium.PostProcessStage({
      name: "blur_y",
      fragmentShader: blurGlsl,
      uniforms: {
        delta: config.delta,
        sigma: config.sigma,
        stepSize: config.stepSize,
        direction: 1
      },
      sampleMode: Cesium.PostProcessStageSampleMode.LINEAR
    })

    const blur = new Cesium.PostProcessStageComposite({
      name: "blur",
      stages: [blur_x, blur_y]
    })

    const blur_comp = new Cesium.PostProcessStageComposite({
      name: "blur_comp",
      stages: [high, blur]
    })

    const contrast_bias = new Cesium.PostProcessStage({
      name: "contrast_bias",
      fragmentShader:c,
      uniforms: {
        contrast: config.contrast,
        brightness: config.brightness,
      }
    })

    const contrast_bias_blur = new Cesium.PostProcessStageComposite({
      name: "contrast_bias_blur",
      stages: [contrast_bias, blur_comp]
    })

    const generate_composite = new Cesium.PostProcessStage({
      name: "generate_composite",
      fragmentShader: dGlsl,
      uniforms: {
        bloomTexture: "contrast_bias_blur",
        ratio: config.ratio,
        color: config.color,
      }
    })


    const postProcessStage = new Cesium.PostProcessStageComposite({
      stages: [contrast_bias_blur, generate_composite],
      inputPreviousStageTexture: false
    })
    postProcessStage.enabled = true;
    this.postProcessStage = postProcessStage;

    this._viewer.scene.postProcessStages.add(postProcessStage)
    // this.postProcessStage.selected = [];
  }

  // get selected() {
  //   return this.postProcessStage.selected
  // }

  // set selected(v) {
  //   // this.postProcessStage.selected = v;
  // }
}
