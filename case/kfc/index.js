import * as Cesium from 'cesium';
import { addPoint, screenToWorld, worldToWGS84 } from '../../tool/tool'
import { addGeoJson } from '../../tool/geojson'
import { addGaode, removeGaode } from '../../tool/provider';
import { updateLabelShow } from '../../src/Cesium_EX'
import { GUI } from 'dat.gui'

function fnHandleGrid(datasource, ellipsoid, labelOpacity) {
  var oGridDataSource = datasource;
  var entities = oGridDataSource.entities.values;
  const length = entities.length;
  for (var i = 0; i < length; i++) {
    var entity = entities[i];
    const position = entity.position._value;
    const address = entity.properties['address']._value;
    const name = entity.properties["name"]._value;
    entity.billboard.show = false

    const billboard = {
      position,
      billboard: {
        image: "./res/pic/circle.png",
        color: Cesium.Color.fromCssColorString("#Ef6140"),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scale: 2.0,
        width: 3,
        height: 3,
      },
    }
    oGridDataSource.entities.add(billboard);
  }
}

export class KFCDemo {
  constructor(viewer) {
    viewer.imageryLayers.get(0).show = false;
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#ffffff")
    this.viewer = viewer;
    this.init(viewer);
    this.setCamera(viewer);
    this.initGUI();
  }

  setCamera(viewer) {
    let info = {};
    info.lon = 116.4715397068917;
    info.lat = 39.9945712104195;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(info.lon,info.lat, 150000.0),
      duration: 2,
      complete: () => {
      }
    })
  }

  async init(viewer) {
    const road = await addGeoJson(viewer, {
      url: "./res/geojson/beijing_road2.geojson",
      strokeWidth: 0.5,
      stroke: Cesium.Color.fromCssColorString("#988aee")
    });

    const border = await addGeoJson(viewer, {
      url: "./res/geojson/beijing_border.geojson",
      strokeWidth: 2,
      stroke: Cesium.Color.fromCssColorString("#999"),
    });

    const kfc = await addGeoJson(viewer, {
      url: "./res/geojson/kfc.geojson",
      strokeWidth: 1,
      stroke: Cesium.Color.fromCssColorString("#aaaaaa"),
    });
    fnHandleGrid(kfc)
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
    layer.alpha = 0.4
      } else {
        removeGaode(this.viewer);
      }
    })
  }
}
