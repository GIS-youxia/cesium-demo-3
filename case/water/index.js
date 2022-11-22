import { centerAt } from "../../tool/camera";
import { waterMaterial } from "../../tool/waterMaterial";

export class WatherDemo {
  constructor() {
    var promise = Cesium.GeoJsonDataSource.load("./res/hedao_wai.json");
    promise.then(dataSource => {
      this.shuiyuWai = this.showWater(dataSource.entities.values, 4);
    }).catch(error => {
      console.error(error);
    });

    var promise = Cesium.GeoJsonDataSource.load("./res/hedao_nei.json");
    promise.then(dataSource=> {
      this.shuiyuNei = this.showWater(dataSource.entities.values, 3.5, {
        frequency: 200,
        animationSpeed: 0.01,
        amplitude: 1,
        specularIntensity: 0.2,
        // color: '#058be9'
      });
    }).catch(error=> {
      console.error(error);
    });

    centerAt({ viewer,"x": 121.480207, "y": 29.792675, "z": 190.8, "heading": 196.1, "pitch": -49, "roll": 359.9 });
  }

  isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
  }

  getPositions(entity) {
    var arr = entity.polygon.hierarchy._value;

    if (arr.positions && this.isArray(arr.positions))
      return arr.positions;
    return arr;
  }

  showWater(entities, height, waterParam) {
    var arrPositions = [];
    var arrWater = [];
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];

      var arr = this.getPositions(entity);

      //水效果
      var polygon = new Cesium.PolygonGeometry({
        height: height || 3.5,  //水面高度,默认3.5米
        extrudedHeight: 3,
        //注释掉此属性水面就贴地了
        // perPositionHeight: true,
        polygonHierarchy: new Cesium.PolygonHierarchy(arr),
      });
      var water = waterMaterial.apply(viewer, new Cesium.GeometryInstance({ geometry: polygon }), waterParam);

      arrPositions.push(arr);
      arrWater.push(water);
    }

    return {
      positions: arrPositions,
      water: arrWater
    };
  }
}
