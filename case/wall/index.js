import * as Cesium from 'cesium';
import { WallImageTrailProperty } from './WallImageTrailProperty'
import { WallTrailMaterialProperty } from './WallTrailMaterialProperty'

export class WallDemo {
  constructor(viewer) {
    this.addRegion(viewer);
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
}
