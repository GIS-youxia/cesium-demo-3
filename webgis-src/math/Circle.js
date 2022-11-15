// https://github.com/ZhangyilinCN/cesium-ol-echart/blob/fd89815884d00fd3fbaad55f6a9e0bd5516a3822/src/junbiaoku/common/PlotBase/PolygonPlot/Circle/index.js

import * as Constants from './Constants';

export class Circle {
  constructor() {}

  generate() {
    var count = this.getPointCount();
    if (count < 2) {
      return;
    }
    var center = this.baseInfo.points[0];
    var radius = this.distance(center, this.baseInfo.points[1]);
    this.generatePositions(this.generateCirclePoints(center, radius));
  }

  //计算两个点的距离
  distance(lngLat1, lngLat2) {
    var radLat1 = lngLat1[1] * Math.PI / 180.0;
    var radLat2 = lngLat2[1] * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lngLat1[0] * Math.PI / 180.0 - lngLat2[0] * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10;
    return s
  }

  static getCirclePoint(lon, lat, angle, radius) {
    let dx = radius * Math.sin(angle * Math.PI / 180.0);
    let dy = radius * Math.cos(angle * Math.PI / 180.0);
    let ec = Constants.PRADIUS + (Constants.ERADIUS - Constants.PRADIUS) * (90.0 - lat) / 90.0;
    let ed = ec * Math.cos(lat * Math.PI / 180);
    let newLon = (dx / ed + lon * Math.PI / 180.0) * 180.0 / Math.PI;
    let newLat = (dy / ec + lat * Math.PI / 180.0) * 180.0 / Math.PI;
    return [newLon, newLat];
  }

  //获取一个圆的边缘坐标
  generateCirclePoints(center, radius) {
    let points = [];
    for (let i = 0; i < 360; i += 2) {
      points.push(this.getCirclePoint(center[0], center[1], i, radius))
    }
    return points;
  }
}
