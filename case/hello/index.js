import * as Cesium from 'cesium';
import { GUI } from 'dat.gui';
import { AxisByObject, CoordinateSystem, addAxisGlobe } from '../../tool/axis'

export class HelloDemo {
  constructor(viewer) {
    const redPlane = viewer.entities.add({
      name: "Red plane with black outline",
      position: Cesium.Cartesian3.fromDegrees(0, 0.0, 0.0),
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
        dimensions: new Cesium.Cartesian2(4000000.0, 3000000.0),
        material: Cesium.Color.RED.withAlpha(0.5),
        // outline: true,
        // outlineColor: Cesium.Color.BLACK,
      },
    });
    window.redPlane = redPlane;
    const axis = new AxisByObject(viewer, redPlane);
    axis.coordinateSystem = CoordinateSystem.ENU;
    // axis.floow = true;
    axis.update();
    this.axis = axis;
    // viewer.extend(Cesium.viewerCesiumInspectorMixin);
    this.initGui()

    // 添加地球坐标轴
    this.axisGlobe = addAxisGlobe(viewer)
    // viewer.zoomTo(redPlane);
  }

  initGui() {
    // 保存希望被GUI改变的属性
    let controls = {
      '可见': true,
      "坐标系": CoordinateSystem.ENU,
    }
    // 实例化GUI
    const gui = new GUI()
    const axis = gui.addFolder("实体坐标轴")
    axis.open();
    axis.add(controls, '可见').onChange(value => {
      this.axis.show = value;
    })
    axis.add(controls, '坐标系', [CoordinateSystem.ECEF, CoordinateSystem.ENU]).onChange(value => {
      this.axis.coordinateSystem = value
    })

    let controls2 = {
      '可见': true,
    }
    const axisGlobe = gui.addFolder("大地坐标轴")
    axisGlobe.open();
    axisGlobe.add(controls2, '可见').onChange(value => {
      this.axisGlobe.show = value;
    })
  }
}
