import * as Cesium from 'cesium';
import { Tower } from './Tower'
import { setCamera, setComeraPosition } from '../../tool/camera';

function generateCurve (start, end) {
  var _0x2918f7 = new Cesium['Cartesian3']();
  Cesium['Cartesian3']['add'](start, end, _0x2918f7);

  var _0x15348a = new Cesium[('Cartesian3')]();
  Cesium['Cartesian3']['divideByScalar'](_0x2918f7, 2, _0x15348a);

  (_0x2918f7 = Cesium['Cartographic']['fromCartesian'](_0x15348a))['height'] = 0.98 * _0x2918f7['height'] - 0.05 * Cesium['Cartesian3']['distance'](start, end);

  _0x15348a = new Cesium[('Cartesian3')]();
  Cesium.Ellipsoid['WGS84']['cartographicToCartesian'](_0x2918f7, _0x15348a);

  var spline = new Cesium.CatmullRomSpline({
    'times': [0x0, 0.5, 0x1],
    'points': [start, _0x15348a, end]
  })
  var points = [];

  const number = 64;
  for (var i = 0x0; i < number; i++) {
    points['push'](spline.evaluate(i / number))
  }

  return points;
}

export class PowerDemo {
  constructor(viewer) {
    this.viewer = viewer;
    viewer.terrainProvider = Cesium.createWorldTerrain();
    this.loadData()
    this.addLabels();
  }

  loadData() {
    fetch("./res/tower.json").then(res => {
      return res.json();
    }).then(res => {
      let data = res.data;
      this.handleData(data);

      this.viewer.flyTo(this.viewer.entities, {
        duration: 0
      });
      // setComeraPosition(viewer, {
      //   longitude: 119.93102740257223,
      //   latitude: 29.67703736855376,
      //   height: 500
      // })
    })
  }

  //处理数据
  handleData(points) {
    let polylines1 = [];
    let polylines2 = [];

    for (let i = 0; i < points.length; i++) {
      const item = points[i];
      let position = Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.height);
      const tower = new Tower(this.viewer, position, item.degree);

      let linkedPoints = tower.getLinkedPositions();

      let offsetP1 = linkedPoints[0];
      let offsetP2 = linkedPoints[1];

      if (i === 0) {
        polylines1.push(offsetP1);
        polylines2.push(offsetP2);
      } else {
        let positions = generateCurve(polylines1[polylines1.length - 1], offsetP1);
        polylines1 = polylines1.concat(positions);

        positions = generateCurve(polylines2[polylines2.length - 1], offsetP2);
        polylines2 = polylines2.concat(positions);
      }
    }

    // 绘制路线
    this.drawGuideLine(polylines1, "#ff0000");
    this.drawGuideLine(polylines2, "#00ff00");
  }

  //绘制电线
  drawGuideLine(positions, color) {
    this.viewer.entities.add({
      polyline: {
        positions: positions,
        width: 3.0,
        material: Cesium.Color.fromCssColorString(color)
      }
    });
  }

  //标注
  addLabels() {
    let labelDatas = [{
      label: "施",
      point: [119.70208254814844, 29.377938800541294, 0]
    }, {
      label: "塔",
      point: [119.7027118669936, 29.376628336566117, 0]
    }, {
      label: "塘",
      point: [119.70329016684632, 29.375251011862954, 0]
    }];

    labelDatas.forEach(item => {
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(item.point[0], item.point[1], item.point[2]),
        label: {
          text: item.label,
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          scale: 0.4,
          font: 'normal 80px MicroSoft YaHei',
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, 0),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
        }
      })
    })

  }
}
