import * as Cesium from 'cesium';
import { RingPrimitive } from '../primitive/RingPrimitive';
import { Circle } from '../math/Circle';
export class RangeMesh {
  constructor(options) {
    const { radiusArr = [], colorArr = [], center, viewer } = options;
    this._viewer = viewer;

    for (let i = 0; i < radiusArr.length - 1; i++) {
      console.error(123);

      const innerRadius = radiusArr[i]
      const outerRadius = radiusArr[i + 1]
      const color = colorArr[i];

      new RingPrimitive({
        color,
        innerRadius,
        outerRadius,
        center,
        viewer,
      });
      this.addLabel(center, innerRadius+"米")
    }

  }

  addLabel(center, text, fillColor, innerRadius) {
    // var _0x546f62 = _0xa969f2;
    const centerDegrees = Cesium.Cartographic.fromCartesian(center);
    const labelDegrees = Circle.getCirclePoint(centerDegrees.longitude, centerDegrees.latitude, 90, innerRadius);
    const position = Cesium.Cartesian3.fromDegrees(labelDegrees[0], labelDegrees[1], 0);
    return this._viewer.entities.add({
      'position': position,
      'label': {
        'text': text,
        'fillColor': fillColor,
        'scale': 0.4,
        // 'font': _0x546f62(0x5c6),
        // 'verticalOrigin': Cesium[_0x546f62(0xbb7)][_0x546f62(0xafc)],
        // 'heightReference': Cesium[_0x546f62(0xbe8)][_0x546f62(0x7b8)],
        // 'pixelOffset': new Cesium['Cartesian2'](0x0, -0xa),
        // 'distanceDisplayCondition': new Cesium[(_0x546f62(0xa05))](0x0, 0x7a120)
      }
    });
  }
}
