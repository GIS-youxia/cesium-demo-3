// add 土地规划使用颜色块

//http://server.mars3d.cn/arcgis/rest/services/mars/guihua/MapServer/0/query?f=json&inSr=4326&outSR=4326&outFields=*&returnGeometry=true&where=%E7%94%A8%E5%9C%B0%E5%90%8D%E7%A7%B0++like+%27%25%25%27+&spatialRel=esriSpatialRelIntersects&geometry=%7B%22rings%22:[[[117.275465,31.844017,0],[117.275563,31.843946,0],[117.295393,31.844255,0],[117.296038,31.834229,0],[117.273831,31.834436,0],[117.274107,31.836638,0],[117.275032,31.838355,0],[117.275748,31.839397,0],[117.275656,31.840987,0],[117.275465,31.844017,0]]],%22hasZ%22:true,%22spatialReference%22:%7B%22wkid%22:4326%7D%7D&geometryType=esriGeometryPolygon

import * as turf from '@turf/turf'
import * as Cesium from 'cesium';

// 规划面着色配置
const styleFieldOptions = {
  A1: {
    // 行政办公用地
    color: "rgba(255,127,159,0.9)"
  },
  A2: {
    // 文化设施用地
    color: "rgba(255,159,127,0.9)"
  },
  A22: {
    // 文化活动用地
    color: "rgba(255,159,127,0.9)"
  },
  A3: {
    // 教育科研用地
    color: "rgba(255,127,191,0.9)"
  },
  A31: {
    // 高等院校用地
    color: "rgba(255,127,191,0.9)"
  },
  A32: {
    // 中等专业学校用地
    color: "rgba(255,127,191,0.9)"
  },
  A33: {
    // 中小学用地
    color: "rgba(255,255,127,0.9)"
  },
  A34: {
    // 特殊教育用地
    color: "rgba(255,127,191,0.9)"
  },
  A35: {
    // 科研用地
    color: "rgba(255,127,191,0.9)"
  },
  A4: {
    // 体育用地
    color: "rgba(255,127,0,0.9)"
  },
  A41: {
    // 体育场馆用地
    color: "rgba(255,127,0,0.9)"
  },
  A5: {
    // 医疗卫生用地
    color: "rgba(255,127,127,0.9)"
  },
  A51: {
    // 医院用地
    color: "rgba(255,127,127,0.9)"
  },
  A52: {
    // 卫生防疫用地
    color: "rgba(255,127,127,0.9)"
  },
  A59: {
    // 其他医疗卫生用地
    color: "rgba(255,127,127,0.9)"
  },
  A6: {
    // 社会福利用地
    color: "rgba(165,82,103,0.9)"
  },
  A7: {
    // 文物古迹用地
    color: "rgba(165,41,0,0.9)"
  },
  A9: {
    // 宗教用地
    color: "rgba(165,82,103,0.9)"
  },
  B: {
    // 商业服务业设施用地
    color: "rgba(255,0,63,0.9)"
  },
  B1: {
    // 商业用地
    color: "rgba(255,0,63,0.9)"
  },
  B11: {
    // 零售商业用地
    color: "rgba(255,0,63,0.9)"
  },
  B12: {
    // 批发市场用地
    color: "rgba(255,0,63,0.9)"
  },
  B13: {
    // 餐饮用地
    color: "rgba(255,0,63,0.9)"
  },
  B14: {
    // 旅馆用地
    color: "rgba(255,0,63,0.9)"
  },
  B2: {
    // 商务用地
    color: "rgba(255,0,63,0.9)"
  },
  B21: {
    // 金融保险用地
    color: "rgba(255,0,63,0.9)"
  },
  B29: {
    // 其他商务用地
    color: "rgba(255,0,63,0.9)"
  },
  B3: {
    // 娱乐康体用地
    color: "rgba(255,159,127,0.9)"
  },
  B31: {
    // 娱乐用地
    color: "rgba(255,159,127,0.9)"
  },
  B32: {
    // 康体用地
    color: "rgba(255,159,127,0.9)"
  },
  B4: {
    // 公用设施营业网点用地
    color: "rgba(255,159,127,0.9)"
  },
  B41: {
    // 加油加气站用地
    color: "rgba(255,159,127,0.9)"
  },
  B9: {
    // 其他服务设施用地
    color: "rgba(255,159,127,0.9)"
  },
  BR: {
    // 商住混合用地
    color: "rgba(255,0,63,0.9)"
  },
  E1: {
    // 水域
    color: "rgba(127,255,255,0.9)"
  },
  E2: {
    // 农林用地
    color: "rgba(41,165,0,0.9)"
  },
  E9: {
    // 其他非建设用地
    color: "rgba(127,127,63,0.9)"
  },
  G: {
    // 绿地与广场用地
    color: "rgba(0,127,0,0.9)"
  },
  G1: {
    // 公园绿地
    color: "rgba(0,255,63,0.9)"
  },
  G2: {
    // 防护绿地
    color: "rgba(0,127,0,0.9)"
  },
  G3: {
    // 广场用地
    color: "rgba(128,128,128,0.9)"
  },
  H: {
    // 建设用地
    color: "rgba(165,124,0,0.9)"
  },
  H1: {
    // 城乡居民点建设用地
    color: "rgba(165,124,0,0.9)"
  },
  H14: {
    // 村庄建设用地
    color: "rgba(165,165,82,0.9)"
  },
  H2: {
    // 区域交通设施用地
    color: "rgba(192,192,192,0.9)"
  },
  H21: {
    // 铁路用地
    color: "rgba(192,192,192,0.9)"
  },
  H22: {
    // 公路用地
    color: "rgba(192,192,192,0.9)"
  },
  H23: {
    // 港口用地
    color: "rgba(192,192,192,0.9)"
  },
  H3: {
    // 区域公共设施用地
    color: "rgba(82,165,82,0.9)"
  },
  H4: {
    // 特殊用地
    color: "rgba(47,76,38,0.9)"
  },
  H41: {
    // 军事用地
    color: "rgba(47,76,38,0.9)"
  },
  H42: {
    // 安保用地
    color: "rgba(47,76,38,0.9)"
  },
  H9: {
    // 其他建设用地
    color: "rgba(165,165,82,0.9)"
  },
  M: {
    // 工业用地
    color: "rgba(127,95,63,0.9)"
  },
  M1: {
    // 一类工业用地
    color: "rgba(127,95,63,0.9)"
  },
  M2: {
    // 二类工业用地
    color: "rgba(76,57,38,0.9)"
  },
  M4: {
    // 农业服务设施用地
    color: "rgba(153,38,0,0.9)"
  },
  R: {
    // 居住用地
    color: "rgba(255,255,0,0.9)"
  },
  R1: {
    // 一类居住用地
    color: "rgba(255,255,127,0.9)"
  },
  R2: {
    // 二类居住用地
    color: "rgba(255,255,0,0.9)"
  },
  R21: {
    // 住宅用地
    color: "rgba(255,255,0,0.9)"
  },
  R22: {
    // 服务设施用地
    color: "rgba(255,255,0,0.9)"
  },
  RB: {
    // 商住混合用地
    color: "rgba(255,191,0,0.9)"
  },
  S: {
    // 道路与交通设施用地
    color: "rgba(128,128,128,0.9)"
  },
  S2: {
    // 城市轨道交通用地
    color: "rgba(128,128,128,0.9)"
  },
  S3: {
    // 交通枢纽用地
    color: "rgba(192,192,192,0.9)"
  },
  S4: {
    // 交通场站用地
    color: "rgba(128,128,128,0.9)"
  },
  S41: {
    // 公共交通场站用地
    color: "rgba(128,128,128,0.9)"
  },
  S42: {
    // 社会停车场用地
    color: "rgba(128,128,128,0.9)"
  },
  S9: {
    // 其他交通设施用地
    color: "rgba(63,111,127,0.9)"
  },
  U: {
    // 公用设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U1: {
    // 供应设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U11: {
    // 供水用地
    color: "rgba(0,95,127,0.9)"
  },
  U12: {
    // 供电用地
    color: "rgba(0,95,127,0.9)"
  },
  U13: {
    // 供燃气用地
    color: "rgba(0,95,127,0.9)"
  },
  U14: {
    // 供热用地
    color: "rgba(0,95,127,0.9)"
  },
  U15: {
    // 通信用地
    color: "rgba(0,95,127,0.9)"
  },
  U2: {
    // 环境设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U21: {
    // 排水用地
    color: "rgba(0,95,127,0.9)"
  },
  U22: {
    // 环卫用地
    color: "rgba(0,95,127,0.9)"
  },
  U3: {
    // 安全设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U4: {
    // 环境设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U9: {
    // 其他公用设施用地
    color: "rgba(0,95,127,0.9)"
  },
  W: {
    // 仓储用地
    color: "rgba(159,127,255,0.9)"
  }
}

export class UseDemo {

  constructor(viewer) {
    this.viewer = viewer
    this.load();
    this.setView();
  }

  async load() {
    const result = await Cesium.Resource.fetchJson("/res/use.json");

    var features = [];
    for (let i = 0; i < result.features.length; i++) {
      const item = result.features[i]
      const newItem = {};
      newItem.properties = item.attributes;
      newItem.geometry = {};
      newItem.geometry.type = "Polygon";
      newItem.geometry.coordinates = item.geometry.rings;
      features.push(newItem);
    }

    result.geojson = {
      type: "FeatureCollection",
      features: features
    }

    Cesium.GeoJsonDataSource.load(result.geojson, {
      stroke: Cesium.Color.fromCssColorString("#0000ffeb"),
      strokeWidth: 1,
      clampToGround: false, //贴地
    }).then(dataSource => {
      this.viewer.dataSources.add(dataSource)
      this.fnHandleGrid(dataSource)
      // this.viewer.zoomTo(dataSource.entities)
    })
  }

  fnHandleGrid(dataSource) {
    var entities = dataSource.entities.values;
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (!entity.polygon) {
        continue;
      }

      const code = entity.properties["用地编号"]._value;
      const info = styleFieldOptions[code];
      entity.polygon.material = new Cesium.Color.fromCssColorString(info.color).withAlpha(0.95);
    }
  }

  //设置默认视角
  setView() {
    const position = Cesium.Cartesian3.fromDegrees(117.28532820822815, 31.838892817989315,4000 )
    this.viewer.scene.camera.setView({
      destination: position,
      orientation: {
        heading: 0,
        pitch: -Math.PI/2,
        roll: 0
      }
    });
  }
}
