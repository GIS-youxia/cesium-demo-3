import * as Cesium from 'cesium';
import { PolylineTrailMaterialProperty } from '../../src/lines/MaterialProperty/PolylineTrailMaterialProperty';
import { aaa } from '../../tool/ClipPlaneHelp';
import { addGeoJson } from '../../tool/geojson';
import { addArcgis, addGaode } from '../../tool/provider';
import { GeoJsonToGraphics } from '../../tool/tool';
import { DIVLabel } from './DIVLabel'

const glsl = require("./frag.glsl");

export function getPureColor() {
  var customShader = new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: glsl,
  });

  return customShader;
}

export class SmartDemo {
  constructor(viewer) {
    this.viewer = viewer;
    this.init(viewer);
  }

  async init(viewer) {
    // 加载底图
    // addGaode(viewer)
    await addArcgis(viewer);
    // 加载3d tileset 数据
    this.addFace()
    this.addTile(viewer);
    this.setView();
  }

  addTile(viewer) {
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // classificationType: Cesium.ClassificationType.TERRAIN,
        // 离线数据
        url: "./res/tileset2.json",
        // url: "http://data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
        // 在线数据
        // url: "https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"
        // url: "http://211.149.185.229:8081/data/country_build/chengdu_ajust_clip/tileset.json"
      })
    );


    tileset.readyPromise.then(function (tileset) {
      // viewer.flyTo(tileset, {
      //   duration: 0
      // });
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
      aaa(viewer, tileset)
    });
  }

  setView() {
    const pos = Cesium.Cartesian3.fromDegrees(113.92938415637772, 22.4835217567296, 2000)
    this.viewer.scene.camera.flyTo({
      duration: 0,
      destination: pos,
      orientation: {
        heading: 0.,
        pitch: -Math.PI/4,//-Math.PI/2,
        roll: 0
      }
    });
  }

  addFace() {
    // const url = "http://data.mars3d.cn/file/geojson/hefei-shequ.json";
    const url = "./res/smart2.json";
    Cesium.Resource.fetchJson(url).then(res => {
      const { polygon } = GeoJsonToGraphics(res)
      // console.error(polygon);

      polygon.forEach(item => {
        const { attributes: { color, name }, geometry } = item;

        const positions = []
        geometry.rings[0].forEach(pos => {
          positions.push(Cesium.Cartesian3.fromDegrees(pos[0], pos[1], pos[2]))
        })

        const polygonEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            material: Cesium.Color.fromCssColorString(color).withAlpha(0.15),
            perPositionHeight: true,
          }
        });

        this.viewer.entities.add({
          polyline: {
            positions,
            clampToGround: false,
            width: 2,
            closure: true,
            material: new PolylineTrailMaterialProperty({
              speed: 2,
              color: new Cesium.Color.fromCssColorString(color),
              percent: 0.8, // 尾巴拖多少长
              // gradient: 0.01, // 变化率
            }),
          },
        });

        const aPos = polygonEntity.polygon.hierarchy._value.positions;
        var iX = 0, iY = 0, iZ = 0;
        for (var j = 0; j < aPos.length; j++) {
          iX = aPos[j].x + iX;
          iY = aPos[j].y + iY;
          iZ = aPos[j].z + iZ;
        }
        iX = iX / aPos.length;
        iY = iY / aPos.length;
        iZ = iZ / aPos.length;
      const center = new Cesium.Cartesian3(iX, iY, iZ);
      new DIVLabel(this.viewer, center, name)
    })

    // this.viewer.flyTo(this.viewer.entities, {
    //   duration: 0
    // });
  })

}
}
