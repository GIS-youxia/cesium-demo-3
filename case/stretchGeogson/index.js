import { addGeoJson } from '../../tool/geojson'
import * as Cesium from 'cesium';
import { addGaode } from '../../tool/provider';
import { loadZipFile } from '../../tool/zip'

// 加载面状要素geojson, 根据建筑物楼层信息, 动态生成建筑物的立体拉伸。
// 颜色随高度变化,可以自定义
// 基于cesium 1.97 + 原生js

const colorHash = {
  10: "#ACD6FF",
  15: "#97CBFF",
  20: "#84C1FF",
  25: "#66B3FF",

  30: "#46A3FF",
  35: "#2894FF",
  40: "#0080FF",
  45: "#0072E3",
  50: "#0066CC",

  55: "#005AB5",
  1000: "#004B97",
}

export class StretchGeogsonDemo {
  constructor(viewer) {
    addGaode(viewer, "cva");
    this.init(viewer)
  }

  async init(viewer) {
    const geojson = await loadZipFile({
      url: "./res/buildings-hf.zip",
      name: "buildings-hf.json"
    });

    const dataSource = await addGeoJson(viewer, {
      url: JSON.parse(geojson),
    });

    let entities = dataSource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      const height = (entity.properties['floor'].getValue() ||1) * 6;
      const color = this.getColor(height);
      entity.polygon.material = new Cesium.Color.fromCssColorString(color);
      entity.polygon.outline = false;
      entity.polygon.extrudedHeight = height;
    }
    viewer.flyTo(dataSource);
  }

  getColor(height) {
    for (var key in colorHash) {
      if (height <= parseInt(key)) {
        return colorHash[key];
      }
    }
    return colorHash[10]
  }
}
