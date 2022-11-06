import * as Cesium from 'cesium';
import { addArcgis } from '../../../tool/provider';
import { getMaterial } from '../../material/odLineMaterial'
import '../../material/type/polyline'

import { PolylineLightingTrailMaterialProperty } from '../../material/property/polyline/PolylineLightingTrailMaterialProperty';
import { PolylineTrailMaterialProperty } from '../../../src/lines/MaterialProperty/PolylineTrailMaterialProperty';
PolylineTrailMaterialProperty

export class RoadLineDemo {
  constructor(viewer) {
    this.viewer = viewer;
    this.loadLinesData();
    this.setView();
  }

  //加载数据
  loadLinesData() {
    let url = '/res/bj-lines-bus.json';
    Cesium.Resource.fetchJson(url).then((data) => {
      var busLines = [];
      data.map(function (busLine, idx) {
        var prevPt;
        var points = [];
        for (var i = 0; i < busLine.length; i += 2) {
          var pt = [busLine[i], busLine[i + 1]];
          if (i > 0) {
            pt = [
              prevPt[0] + pt[0],
              prevPt[1] + pt[1]
            ];
          }
          prevPt = pt;

          var longitude = pt[0] / 1e4;
          var latitude = pt[1] / 1e4;
          // points.push([longitude, latitude]);
          points.push(longitude);
          points.push(latitude);
        }

        busLines.push({
          positions: points,
          color: new Cesium.Color(Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.2, 0.0, 1.0),
          width: 2.0,
        });
      });
      // this.addLineDatasPrimitive(busLines);
      this.addLineDatasEntity(busLines);
    });
  }

  //添加到场景 Primitive 方式
  addLineDatasPrimitive(busLines) {
    let scene = this.viewer.scene;
    let color;

    busLines.forEach(line => {
      color = new Cesium.Color(0, Math.random() * 0.8 + 0.2, Math.random() * 0.5 + 0.5, 1.0);
      var appearance = getMaterial(color);
      var primitive = new Cesium.Primitive({
        appearance,
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(line.positions),
            width: 3.0,
          }),
        }),
      });
      scene.primitives.add(primitive);
    })
  }

  //添加到场景, entity 方式
  addLineDatasEntity(busLines) {
    busLines.forEach(line => {
      this.viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(line.positions),
          width: line.width,
          // material: new Cesium.PolylineGlowMaterialProperty({
          //   glowPower: 0.8,
          //   color: Cesium.Color.fromCssColorString("rgba(255,0,0,0.1)"),
          // })
          // material: new PolylineLightingTrailMaterialProperty({
          //   color: Cesium.Color.YELLOW,
          //   speed: .0
          // }),
          material: new PolylineTrailMaterialProperty({
            speed: 3 * Math.random(),
            color: line.color,
            percent: 0.01,
            gradient: 0.2,
          })
        }
      })
    })
  }

  //设置默认视角
  async setView() {
    await addArcgis(viewer);

    this.viewer.scene.camera.setView({
      destination: {
        x: -2264713.773444937,
        y: 4437097.6365463445,
        z: 4052169.8549779626
      },
      orientation: {
        heading: 5.625615618387119,
        pitch: -0.5513619022102629,
        roll: 0.00001297575603054213
      }
    });
  }

  destroy() {
    this.viewer.entities.removeAll();
    this.viewer.imageryLayers.removeAll(true);
    this.viewer.destroy();
  }
}
