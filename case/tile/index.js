import * as Cesium from 'cesium';
import { getPureColor } from '../../tool/shader'
import { addArcgis } from '../../tool/provider';

export class Tile {
  constructor(viewer) {
    this.init(viewer);
  }

  async init(viewer) {
    await addArcgis(viewer);
    this.addTile(viewer);
   }

  addTile() {
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // url: "./res/tileset.json",
        // url: "https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"
        url: "http://211.149.185.229:8081/data/country_build/chengdu_ajust_clip/tileset.json"
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

}
