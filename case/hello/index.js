import * as Cesium from 'cesium';
import { AxisByObject } from '../../tool/axis'

export class HelloDemo {
  constructor(viewer) {
    const redPlane = viewer.entities.add({
      name: "Red plane with black outline",
      position: Cesium.Cartesian3.fromDegrees(0, 0.0, 0.0),
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0),
        dimensions: new Cesium.Cartesian2(4000000.0, 3000000.0),
        material: Cesium.Color.RED.withAlpha(0.5),
        // outline: true,
        // outlineColor: Cesium.Color.BLACK,
      },
    });
    window.redPlane = redPlane;
    // const axis = new AxisByObject(viewer, redPlane)
    // axis.update();

    // viewer.zoomTo(redPlane);
  }
}
