import * as Cesium from 'cesium';
import { WallImageTrailProperty } from './WallImageTrailProperty'
import { WallTrailMaterialProperty } from './WallTrailMaterialProperty'
import { SerratedWall } from './SerratedWall'

export class WallDemo {
  constructor(viewer) {
    // this.addRegion(viewer);
    this.addWall(viewer);
  }


  //坐标转换
  coordinateToPositions(coordinates) {
    let positions = [];
    coordinates.map(c => {
      positions.push(Cesium.Cartesian3.fromDegrees(c[0], c[1], 50));
    });
    return positions;
  }

  addRegion(viewer) {
    fetch("./res/wangjing.geojson")
      .then(res => {
        return res.json();
      })
      .then(res => {
        viewer.entities.add({
          name: "wall1",
          wall: {
            positions: this.coordinateToPositions(res.features[0].geometry.coordinates[0]),
            material: new WallImageTrailProperty(),
            outline: true,
          },
        });

        viewer.entities.add({
          name: "wall2",
          wall: {
            positions: this.coordinateToPositions(res.features[1].geometry.coordinates[0]),
            material: new WallTrailMaterialProperty(),
            outline: true,
          },
        });

        viewer.flyTo(viewer.entities);
      });
  }

  addWall(viewer) {
    let ps = [];
    let lls = [
      [117.319966, 31.842082, 12.29],
      [117.330034, 31.835286, 11.07],
      [117.330576, 31.823452, 11.01],
      [117.311457, 31.821023, 17.11],
      [117.308954, 31.828975, 16.29]
    ];
    lls.forEach(item => {
      ps.push(Cesium.Cartesian3.fromDegrees(item[0], item[1], item[2]))
    })
    let serratedWall = new SerratedWall({
      viewer: viewer,
      points: ps,
      wallHeight: 500,
      direction: -1,
      speed: 10,
      color: Cesium.Color.fromCssColorString("#f33349")
    });

    //serratedWall.remove();
    let flyToOpts = {
      destination: {
        x: -2487153.036992519,
        y: 4823017.00791476,
        z: 3346002.0156240542
      },
      orientation: {
        heading: 1.558143791589158,
        pitch: -0.6614460944136646,
        roll: 0.0038082524218099323
      },
      duration: 1
    };
    viewer.scene.camera.setView(flyToOpts);
  }
}
