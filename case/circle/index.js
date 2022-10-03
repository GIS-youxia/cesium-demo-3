import * as Cesium from 'cesium';
import { CircleWaveProperty } from './CircleWaveProperty'
import { RadarWaveProperty } from './RadarWaveProperty'
import { RadarLineProperty } from './RadarLineProperty'

/**
 * @description: 旋转材质
 * @param {*} instance ：实体
 * @param {*} _stRotation : 初始材质旋转角度
 * @param {*} _amount ：旋转角度变化量
 */
function rotateMaterial(instance, _stRotation, _amount) {
  instance.stRotation = new Cesium.CallbackProperty(function () {
    _stRotation += _amount;
    if (_stRotation >= 360 || _stRotation <= -360) {
      _stRotation = 0;
    }
    return Cesium.Math.toRadians(_stRotation);
  }, false)
}

export class CircleDemo {
  constructor(viewer) {
    this.addWave(viewer);
    this.addScan(viewer);
    this.addRadarWave(viewer);
    this.addRadarLine(viewer);
    viewer.zoomTo(viewer.entities);
  }

  addWave(viewer) {
    viewer.entities.add({
      name: "1",
      position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 0),
      ellipse: {
        height: 0,
        semiMinorAxis: 100000,
        semiMajorAxis: 100000,
        material: new CircleWaveProperty({
          duration: 6000,
          gradient: 0,
          color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
          count: 1
        })
      }
    });
  }

  addScan(viewer) {
    // 图片雷达
    const rader = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(119.4074, 39.9042),
      name: '图片雷达',
      ellipse: {
        semiMajorAxis: 100000.0,
        semiMinorAxis: 100000.0,
        material: new Cesium.ImageMaterialProperty({
          image: './res/pic/circleScan.png',
          color: new Cesium.Color(1.0, 1.0, 0.0, 0.7),
        }),
        // 不设置高度则无法渲染外框线
        height: 1.0,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        outline: true,
        outlineColor: new Cesium.Color(1.0, 1.0, 0.0, 1.0)
      }
    })

    rotateMaterial(rader.ellipse, 0, -3);
  }

  addRadarWave(viewer) {
    // 波纹雷达
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(117.3236839, 42.9028061),
      name: '波纹雷达',
      ellipse: {
        semiMajorAxis: 100000.0,
        semiMinorAxis: 100000.0,
        material: new RadarWaveProperty({
          color: new Cesium.Color(0.0, 1.0, 0.0, 0.7),
          speed: 10.0
        })
      }
    })
  }

  addRadarLine() {
    // 雷达线
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(120.9236839, 42.528061),
      name: '雷达线',
      ellipse: {
        semiMajorAxis: 100000.0,
        semiMinorAxis: 100000.0,
        material: new RadarLineProperty({
          color: new Cesium.Color(1.0, 1.0, 0.0, 0.7),
          speed: 20.0
        })
      }
    })
  }
}
