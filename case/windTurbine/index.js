import * as Cesium from 'cesium';
import { CameraManager } from '../../webgis-src/camera';

export class WindTurbineDemo {
  constructor(viewer) {
    this.addModel(viewer);

    // 开启动画
    viewer.clockViewModel.shouldAnimate = true;

    // 关闭时间对于模型亮度的影响
    viewer.scene.light = new Cesium.DirectionalLight({
      direction: new Cesium.Cartesian3(1, -0.890918, -0.283358),
      intensity: 1,
    })
  }

  addModel(viewer) {
    const position = Cesium.Cartesian3.fromDegrees(123.54, 47.19, 0);
    const euler = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(90), 0, 0)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, euler)

    viewer.entities.add({
      position,
      orientation,
      name: "",
      model: {
        uri: './res/glb/windTurbine.glb',
        scale: 20,
      }
    });

    const pos = Cesium.Cartesian3.fromDegrees(123.54, 47.19, 300)

    const manager = new CameraManager(viewer)
    manager.setConfig({
      cameraPosition: pos,
      targetPosition: position,
      type: "ArroundPoint", // AroundView,ArroundPoint
      heading: 0,
      pitch: -30,
      range: 50000
    })
    manager.start();
  }
}
