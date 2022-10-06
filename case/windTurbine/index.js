import * as Cesium from 'cesium';





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
    const position = Cesium.Cartesian3.fromDegrees(123.54, 47.19);

    const euler = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(90), 0, 0)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, euler)

    const entity = viewer.entities.add({
      position,
      orientation,
      name: "",
      model: {
        uri: './res/glb/windTurbine.glb',
        scale: 20,
      }
    });

    this.arround(viewer, entity);
  }


  /**
   * 绕点旋转
   * @param {*} viewer
   * @param {*} entity
   * @memberof WindTurbineDemo
   */
  arround(viewer, entity) {
    let initialHeading = 0;
    // 步长
    let step = 0.05;

    setInterval(intervalFn, step);

    // 定义轮询函数
    function intervalFn() {
      if (initialHeading > 360) {
        initialHeading = 0;
      }
      var offset = new Cesium.HeadingPitchRange(
        Cesium.Math.toRadians(initialHeading), // 水平方向的旋转角 0-360度
        -Cesium.Math.toRadians(30),// 垂直平面俯仰角 // 0-90度
        1000  // 相机距离地球球心的距离
      );
      viewer.zoomTo(entity, offset);
      initialHeading += step;
    }
  }
}
