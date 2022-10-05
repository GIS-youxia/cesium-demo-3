import * as Cesium from 'cesium';
import { addGeoJson } from '../../tool/geojson'
import { addGaode, removeGaode } from '../../tool/provider';
import { GUI } from 'dat.gui'
import { updateLabelShow } from '../../src/Cesium_EX'

/**
 * 北京市第七次全国人口普查
 * http://www.beijing.gov.cn/gongkai/shuju/sjjd/202105/t20210519_2392886.html
 */
const beijingPersonInfo = [
  { name: '东城区', person: 708829 },
  { name: '西城区', person: 1106214 },
  { name: '朝阳区', person: 3452460 },
  { name: '丰台区', person: 2019764 },
  { name: '石景山区', person: 567851 },

  { name: '海淀区', person: 3133469 },
  { name: '门头沟区', person: 392606 },
  { name: '房山区', person: 1312778 },
  { name: '通州区', person: 1840295 },
  { name: '顺义区', person: 1324044 },

  { name: '昌平区', person: 2269487 },
  { name: '大兴区', person: 1993591 },
  { name: '怀柔区', person: 441040 },
  { name: '平谷区', person: 457313 },
  { name: '密云区', person: 527683 },

  { name: '延庆区', person: 345671 },
]



export class PersonDemo {
  constructor(viewer) {
    viewer.imageryLayers.get(0).show = false;
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#ffffff")
    this.viewer = viewer;
    this.processData();
    this.init(viewer);
    this.setCamera(viewer);
    this.initGUI();
    this.loop();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    if (this.gridDataSource) {
      this.gridDataSource._visualizers[2].update = () => { }
      updateLabelShow(this.gridDataSource._entityCluster._labelCollection, this.gridDataSource._entityCluster)
    }
  }

  getLabel(text, entityId, position) {
    return {
      name: text,
      position,
      id: "label" + entityId,
      label: {
        text: text,
        translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
        font: '34px Helvetica',
        fillColor: Cesium.Color.BLACK,
        outlineWidth: 20,
        disableDepthTestDistance: 1000000000,
        scale: 0.5,
        showBackground: true,
        backgroundColor: new Cesium.Color.fromCssColorString("rgba(255, 255, 255, 0.9)"),
        backgroundPadding: new Cesium.Cartesian2(14, 10)
      }
    };
  }

  fnHandleGrid(datasource) {
    var entities = datasource.entities.values;
    const length = entities.length;
    for (var i = 0; i < length; i++) {
      var entity = entities[i];
      const target = this.personMap.find(item => {
        return item.name === entity.name
      })

      const wgs84 = entity.properties['coordinates']._value;
      const position = Cesium.Cartesian3.fromDegrees(wgs84[0], wgs84[1])
      const label = this.getLabel(`${target.name} ${target.person/10000} 万`, entity.id, position);
      datasource.entities.add(label);
      entity.polygon.outline = true;
      entity.polygon.material = target.color.withAlpha(0.9);
    }
  }


  setCamera(viewer) {
    let info = {};
    info.lon = 116.4715397068917;
    info.lat = 39.9945712104195;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(info.lon, info.lat, 150000.0),
      duration: 2,
      complete: () => {
      }
    })
  }

  async init(viewer) {
    const district = await addGeoJson(viewer, {
      url: "./res/geojson/beijing_district.geojson",
      strokeWidth: 1,
      stroke: Cesium.Color.fromCssColorString("#999")
    });
    this.gridDataSource = district;
    this.fnHandleGrid(district);

    const border = await addGeoJson(viewer, {
      url: "./res/geojson/beijing_border.geojson",
      strokeWidth: 2,
      stroke: Cesium.Color.fromCssColorString("#999"),
    });
  }

  initGUI() {
    // 保存希望被GUI改变的属性
    let controls = {
      '高德图层': false,
    }
    // 实例化GUI
    const gui = new GUI()
    gui.add(controls, '高德图层').onChange(value => {
      if (value) {
        let layer = addGaode(this.viewer);
        // layer.alpha = 0.8
      } else {
        removeGaode(this.viewer);
      }
    })
  }

  handleColor() {
    let arr = {}
    const from = Cesium.Color.fromCssColorString("#ffdac8")
    const to = Cesium.Color.fromCssColorString("#d94600");

    this.personMap = this.personMap.sort((a,b) =>{
      return a.p - b.p
    })

    let p = 0;
    for (let i = 0; i < this.personMap.length; i++) {
      p += this.personMap[i].p/100;
      const r = (to.red - from.red) * p + from.red;
      const g = (to.green - from.green) * p + from.green;
      const b = (to.blue - from.blue) * p + from.blue;
      this.personMap[i].color = new Cesium.Color(r, g, b)
    }
  }

  processData() {
    let total = 0;
    const len = beijingPersonInfo.length;
    for (let i = 0; i < len; i++) {
      const item = beijingPersonInfo[i];
      total += item.person
    }

    this.personMap = []
    for (let i = 0; i < len; i++) {
      const item = beijingPersonInfo[i];

      this.personMap.push({
        name: item.name,
        p: +(item.person / total * 100).toFixed(1),
        person: item.person,
      })
    }

    this.colorMap = this.handleColor();
  }
}
