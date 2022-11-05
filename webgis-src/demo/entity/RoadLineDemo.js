import * as Cesium from 'cesium';
import { getMaterial } from '../../material/odLineMaterial'

export class RoadLineDemo {
  constructor(viewer) {
    this.viewer = viewer;

    // 亮度设置
    // var stages = this.viewer.scene.postProcessStages;
    // this.viewer.scene.brightness = this.viewer.scene.brightness || stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
    // this.viewer.scene.brightness.enabled = true;
    // this.viewer.scene.brightness.uniforms.brightness = 2;

    // this.viewer.imageryLayers._layers[0].defaultBrightness = 0.01;


    // this.loadBuildData();
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
      this.addLineDatas(busLines);
    });
  }

  //添加到场景
  addLineDatas(busLines) {
    let scene = this.viewer.scene;
    let color;

    busLines.forEach(line => {
      color = new Cesium.Color(Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.2, 0.0, 1.0);
      var appearance = getMaterial(color);
      var primitive = new Cesium.Primitive({
        appearance,
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(line.positions),
            width: 2.0,
          }),
        }),
      });
      scene.primitives.add(primitive);
    })
  }

  //设置默认视角
  setView() {
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
