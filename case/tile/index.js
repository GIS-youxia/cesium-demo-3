import * as Cesium from 'cesium';
import { getPureColor } from '../../tool/shader'
import { addArcgis } from '../../tool/provider';

export class Tile {
  constructor(viewer) {
    this.init(viewer);
  }

  async init(viewer) {
    // 加载底图
    await addArcgis(viewer);
    // 加载3d tileset 数据
    this.addTile(viewer);
   }

  addTile() {
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // 离线数据
        url: "./res/tileset.json",
        // 在线数据
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
            // 模型基础颜色
            ['true', 'rgba(0, 127, 255 ,1)'],
          ]
        }
      });

      // 根据模型高度改变颜色
      tileset.customShader = getPureColor();
    });
  }

}
