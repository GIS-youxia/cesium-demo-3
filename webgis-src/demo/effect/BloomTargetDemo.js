import * as Cesium from 'cesium'
import { BloomTarget } from '../../effect/BloomTarget'
import { BoxPrimitive } from '../../primitive/BoxPrimitive';
import { EllipsoidPrimitive } from '../../primitive/EllipsoidPrimitive';
export class BloomTargetDemo {
  constructor(viewer) {
    const bloom = new BloomTarget(viewer)
    bloom.postProcessStage.selected = [];

    const pos = Cesium.Cartesian3.fromDegrees(117.076033, 31.663258, 0.3);
    const boxGreen = new BoxPrimitive({
      position: pos,
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#00ff00"
    })
    viewer.scene.primitives.add(boxGreen.primitive)

    const sphere = new EllipsoidPrimitive({
      position: Cesium.Cartesian3.fromDegrees(117.078423, 31.664305, 30.8),
      radius: 50.0,
      color: "#00ffff"
    })
    console.error(sphere.primitive);
    window.sphere = sphere;
    viewer.scene.primitives.add(sphere.primitive)

    // 关闭时间对于模型亮度的影响
    viewer.scene.light = new Cesium.DirectionalLight({
      direction: new Cesium.Cartesian3(1, -0.890918, -0.283358),
      intensity: 1,
    })

    // graphicLayer.addGraphic(graphic4)

    // box.primitive.readyPromise.then(() => {
    //   let arr = [];
    //   box.primitive._pickIds.forEach(item => {
    //     arr.push({
    //       pickId: item
    //     })
    //   })
    //   bloom.postProcessStage.selected = arr;
    // })


    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(117.076033, 31.663258, 1000.3),
      duration: 0
    });
  }

}
