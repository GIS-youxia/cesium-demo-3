import * as Cesium from 'cesium';
import { GUI } from 'dat.gui';
import { getRotation } from '../../math/math';
import { AxesHelperObject, CoordinateSystem, AxesHelperGlobe } from '../../mesh/axis'

export class AxesDemo {
  constructor(viewer) {

    const position = Cesium.Cartesian3.fromDegrees(0, 0.0, 0.0);
    const redPlane = viewer.entities.add(new Cesium.Entity({
      name: "Red plane with black outline",
      position,
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
        dimensions: new Cesium.Cartesian2(4000000.0, 3000000.0),
        material: Cesium.Color.RED.withAlpha(0.5),
      },
    }));

    const euler = new Cesium.HeadingPitchRoll(0.8, 0.7, 0.3)
    redPlane.orientation = Cesium.Transforms.headingPitchRollQuaternion(position, euler)
    window.redPlane = redPlane;
    this.redPlane = redPlane;

    const axis = new AxesHelperObject(viewer, redPlane);
    axis.coordinateSystem = CoordinateSystem.ENU;
    axis.floow = true;
    axis.update();
    this.axis = axis;

    // 添加地球坐标轴
    this.axisGlobe = new AxesHelperGlobe(viewer)
    // viewer.zoomTo(redPlane);

    this.initGui()
  }

  initGui() {
    // 模型坐标轴
    let controls = {
      '可见': true,
      "坐标系": CoordinateSystem.ENU,
    }
    const gui = new GUI()
    const axis = gui.addFolder("实体坐标轴")
    axis.open();
    axis.add(controls, '可见').onChange(value => {
      this.axis.show = value;
    })
    axis.add(controls, '坐标系', [CoordinateSystem.ECEF, CoordinateSystem.ENU]).onChange(value => {
      this.axis.coordinateSystem = value
    })

    // 地球坐标轴
    let controls2 = {
      '可见': this.axisGlobe.show,
    }
    const axisGlobe = gui.addFolder("大地坐标轴")
    axisGlobe.add(controls2, '可见').onChange(value => {
      this.axisGlobe.show = value;
    })

    const euler = getRotation(this.redPlane)
    // 实体
    let controls3 = {
      'heading': +Cesium.Math.toDegrees(euler.heading),
      'pitch': +Cesium.Math.toDegrees(euler.pitch),
      'roll': +Cesium.Math.toDegrees(euler.roll),
    }
    const entity = gui.addFolder("实体")
    entity.open();
    entity.add(controls3, 'heading',-360,360,).onChange(value => {
    })
    entity.add(controls3, 'pitch',-360, 360).onChange(value => {
    })
    entity.add(controls3, 'roll', -360, 360).onChange(value => {
    })
  }
}
