import { featureEach } from '@turf/turf';
import * as Cesium from 'cesium';
import { addPoint, screenToWorld, worldToWGS84 } from '../../tool/tool'
import { addGeoJson } from '../../tool/geojson'
import { addGaode, removeGaode } from '../../tool/provider';
import { updateLabelShow } from '../../src/Cesium_EX'
import { DOM } from './DOM'
import { addCSS } from '../../tool/helper';

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
      var oLabelEntity = {
        name: name,
        position,
        id: "label" + entity.id,
        label: {
          text: name,
          translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
          font: '34px Helvetica',
          fillColor: Cesium.Color.BLACK,
          // outlineColor: Cesium.Color.BLACK,
          outlineWidth: 20,
          disableDepthTestDistance: 1000000000,
          scale: 0.5,
          showBackground: true,
          backgroundColor: new Cesium.Color.fromCssColorString("rgba(255, 255, 255, 0.7)"),
          backgroundPadding: new Cesium.Cartesian2(14, 10)
        }
      };
      oGridDataSource.entities.add(oLabelEntity);
  }
}

export class POIDemo {
  constructor(viewer) {
    this.viewer = viewer;
    this.init(viewer);
    addCSS("./case/poi/style.css")
    this.initEvent();
    this.loop();
    this.setCamera(viewer);
    this.dom = new DOM(document.querySelector("#UIContainer"));
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
    this.gridDataSource = await addGeoJson(viewer, {
      url: "./res/beijing_park.geojson",
    });
    fnHandleGrid(this.gridDataSource, null, 1)
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    if (this.gridDataSource) {
      this.gridDataSource._visualizers[2].update = () => { }
      updateLabelShow(this.gridDataSource._entityCluster._labelCollection, this.gridDataSource._entityCluster)
    }
  }

  initEvent() {
    //事件柄
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.handler.setInputAction(movement => {
      const oGridDataSource = this.gridDataSource;
      var pick = this.viewer.scene.pick(movement.position);

      if (Cesium.defined(pick)) {
        /*点击标注*/
        if (pick.id) {
          if ((oGridDataSource && oGridDataSource.entities.contains(pick.id))) {
            //网格
            var oEntity;
            //网格面的id
            var sId = "";
            if (pick.id.label) {

              //如果是标签
              sId = pick.id.id.replace("label", "");
              oEntity = oGridDataSource.entities.getById(sId);

              this.dom.createInfo({
                name: oEntity.properties["name"]._value,
                address: oEntity.properties["address"]._value,
              })
            } else {
              sId = pick.id.id;
              oEntity = pick.id;
            }
          }
        } else {
          console.log(pick.id);
        }
      }
      return false;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
}
