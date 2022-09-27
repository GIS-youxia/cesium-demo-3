import * as Cesium from 'cesium';
import { getPureColor, createBuildingShader } from '../../tool/shader'
export class Tile {
  constructor(viewer) {
    this.init(viewer);
  }

  async init(viewer) {
    // await this.addMap(viewer);
    this.addTile(viewer);
   }

  addTile() {
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: "./res/tileset.json",
        // url: "https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"
        // url: "http://211.149.185.229:8081/data/country_build/chengdu_ajust_clip/tileset.json"
      })
    );


    tileset.readyPromise.then(function (tileset) {
      viewer.flyTo(tileset, {
        duration: 0
      });
      tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ['true', 'rgba(0, 127, 255 ,1)'],
            // ['true', 'rgba(255, 255, 255 ,1)'],
          ]
        }
      });

      tileset.customShader = getPureColor();
    });
  }
  addMap(viewer) {
    return new Promise((resolve, reject) => {
      const imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        // url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
        // url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
      });
      viewer.imageryLayers.addImageryProvider(imageryProvider);
      // var options = {
      //   style: 'vec', // style: img vec normal dark
      //   crs: 'WGS84' // 使用84坐标系，默认为：BD09
      // }
      // var imageryProvider = new Cesium.BaiduImageryProvider(options)
      // viewer.imageryLayers.addImageryProvider(
      //   imageryProvider
      // )
      // resolve();
      imageryProvider.readyPromise.then(resolve)
    })

  }
}
