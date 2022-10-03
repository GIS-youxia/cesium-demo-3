import * as Cesium from 'cesium';
import { CircleWaveProperty } from './CircleWaveProperty'

export class CircleDemo {
  constructor(viewer) {
    viewer.entities.add({
      name: "",
      position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 0),
      ellipse: {
        height: 0,
        semiMinorAxis: 1000000,
        semiMajorAxis: 1000000,
        material: new CircleWaveProperty({
          duration: 6000,
          gradient: 0,
          color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
          count: 1
        })
      }
    });

    viewer.zoomTo(viewer.entities);
  }
}
