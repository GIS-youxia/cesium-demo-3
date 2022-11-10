import * as Cesium from 'cesium'

/**
 * 物体描边
 */
export class OutLineEffect{
  constructor() {
    const stages = viewer.scene.postProcessStages;
    const silhouette = Cesium.PostProcessStageLibrary.createSilhouetteStage()
    silhouette.enabled = true;
    stages.add(silhouette);

    silhouette.uniforms.color = Cesium.Color.LIME;
    this.silhouette = silhouette;
    this.silhouette.selected = [];
  }

  handleClick(pickedObject) {
    if (Cesium.defined(pickedObject)) {
      const selected = []
      pickedObject.primitive._pickIds.forEach(item => {
        selected.push({
          pickId: item
        })
      })
      this.silhouette.selected = selected;
    } else {
      this.silhouette.selected = [];
    }
  }
}
