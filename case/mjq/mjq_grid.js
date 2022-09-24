import * as Cesium from 'cesium';
import { addGeoJson } from '../../tool/geojson'
import { fnLoadKML } from '../../tool/kml'
import { updateLabelShow } from '../../src/Cesium_EX'
import { DOM } from './DOM'
import { GUI } from 'dat.gui'
import { addGaode, removeGaode } from '../../tool/provider';

const rootPath = "./case/mjq/"

//添加mark
function insertMarker(objEntity, oEntities) {
  /*objEntity含有一下成员markid,name,description,x,y,z,iconPath, iconSize, FontName, r, g, b,FontSize,markType,mediaUrl
   * markid:标注id
   * name:标注显示的文字
   * des:描述，（description是原对象属性值，规避用des）
   * x,y,z：坐标（可以移动，本版本暂不支持修改）
   * iconPath:图标地址
   * iconSize:图标大小（暂定固定大小，若设置需两个值）
   * FontName:字体（）需和FontSize一同使用，'30px sans-serif'
   * r/g/b:new Cesium.Color(red, green, blue, alpha)(目前默认白色，启用则可以有甚多)
   * FontSize：如FontName
   * markType:标注类型
   * mediaUrl：媒体链接
   * oEntities:是标注挂载在哪个集合下面
   */

  var iconUrl;
  if (location.href.indexOf("/mobile/") > -1) {
    iconUrl = "../" + objEntity.iconPath;
  } else {
    iconUrl = objEntity.iconPath;
  }
  var oEntityCollection = viewer.entities;
  if (!!oEntities) {
    oEntityCollection = oEntities
  }
  var oNewMark = oEntityCollection.add({
    name: objEntity.name,
    position: new Cesium.Cartesian3(objEntity.x, objEntity.y, objEntity.z),
    //文字标签
    label: {
      text: objEntity.name,
      font: (parseInt(objEntity.FontSize) * 2) + "px " + objEntity.FontName,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e5, 0.0),
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直方向以底部来计算标签的位置
      pixelOffset: new Cesium.Cartesian2(20, 0),  //偏移量
      disableDepthTestDistance: 1000000000,//优先级
      scale: 0.5
    },
    billboard: { //图标
      image: iconUrl,
      width: 64,
      height: 64,
      disableDepthTestDistance: 1000000000,
      scale: 0.4,
      translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e5, 0.0)
    },
    id: objEntity.markid,
    des: objEntity.description,
    markerType: objEntity.markType,
    mediaUrl: objEntity.mediaUrl
  });
  return oNewMark;
}

//删除mark
function deleteMark(markid) {
  var allEntities = viewer.entities;
  if (markid == "All") {
    allEntities.removeAll();
  } else {
    allEntities.removeById(markid);
  }
}

/**
 */
function fnObjShowHide(obj, type, bshow) {

  var entities = obj.entities.values;
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    if (!!entity[type]) {
      // entity.originShow = bshow;
      entity.show = bshow;
    } else if ("marker" == type) {
      if (!!entity.billboard || !!entity.label) {
        // entity.originShow = bshow;
        entity.show = bshow;
      }
    }
  }
}

/**
 * 处理网格颜色
 * @param {*} datasource
 * @param {*} ellipsoid
 * @param {*} labelOpacity
 */
function fnHandleGrid(datasource, ellipsoid, labelOpacity) {

  var oGridDataSource = datasource;
  var entities = oGridDataSource.entities.values;
  for (var i = 0; i < entities.length; i++) {

    var entity = entities[i];
    if (!!entity.polygon) {
      entity.grid = "grid";
      entity.originShow = true;

      entity.polygon.outline = false;
      entity.polygon.material = new Cesium.Color.fromCssColorString(entity.properties["颜色值"]._value).withAlpha(labelOpacity);

      //计算中心点
      if (!!entity.polygon.hierarchy._value.positions) {
        var aPos = entity.polygon.hierarchy._value.positions;
      } else {
        var aPos = entity.polygon.hierarchy._value;
      }

      var iX = 0, iY = 0, iZ = 0;
      for (var j = 0; j < aPos.length; j++) {
        iX = aPos[j].x + iX;
        iY = aPos[j].y + iY;
        iZ = aPos[j].z + iZ;
      }
      iX = iX / aPos.length;
      iY = iY / aPos.length;
      iZ = iZ / aPos.length;

      var WorlsPos = new Cesium.Cartesian3(iX, iY, iZ);
      var oDegree = ellipsoid.cartesianToCartographic(WorlsPos);
      var lat = Cesium.Math.toDegrees(oDegree.latitude);
      var lng = Cesium.Math.toDegrees(oDegree.longitude);
      var alt = oDegree.height;
      if (i < 3) { alt = -15; }
      var oLabelEntity = {
        name: entity.properties["名称"],
        position: Cesium.Cartesian3.fromDegrees(lng, lat, 0),
        id: "label" + entity.id,
        label: {
          text: entity.properties["名称"],
          translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
          font: '28px Helvetica',
          // fillColor: Cesium.Color.WHEAT,
          // outlineColor: Cesium.Color.BLACK,
          outlineWidth: 20,
          disableDepthTestDistance: 1000000000,
          scale: 0.5,
          showBackground: true,
          // backgroundColor: new Cesium.Color.fromCssColorString("rgba(255, 255, 255, 1)"),
          backgroundPadding: new Cesium.Cartesian2(14, 10)
        }
      };
      oGridDataSource.entities.add(oLabelEntity);
    }
  }
}

function fnHandleCheck(datasource) {
  var entities = datasource.entities.values;
  for (var i = entities.length - 1; i >= 0; i--) {
    var entity = entities[i];

    //存储
    var entitiesProperties = entity.properties;
    var oPosition = entity.position._value;
    var oText = entitiesProperties["名称"];
    var oId = entity.id;
    var oPos = {
      markid: oId + "marker",
      name: "检测点",
      description: "",
      x: oPosition.x,
      y: oPosition.y,
      z: oPosition.z,
      iconPath: rootPath+'check.png',
      iconSize: 16,
      FontName: 'Microsoft YaHei',
      r: 256, g: 256, b: 256,
      FontSize: 16,
      mediaUrl: ''
    };
    var oNewEntity = insertMarker(oPos, datasource.entities);
    oNewEntity.properties = entitiesProperties;
    oNewEntity.show = false;
  }
}

//去除高亮
function fnRemoveLight(oGridDataSource, polygonid, labelOpacity) {
  var oColor = oGridDataSource.entities.getById(polygonid).polygon.material.color._value;
  oGridDataSource.entities.getById(polygonid).polygon.material = Cesium.Color.fromCssColorString("rgb(" + 255 * oColor.red + "," + 255 * oColor.green + "," + 255 * oColor.blue + ")").withAlpha(labelOpacity);
}

// 移除所有高亮
function fnRemoveAllLight(oGridDataSource, labelOpacity) {
  oGridDataSource.entities.values.forEach(item => {
    item.grid ==="grid" && fnRemoveLight(oGridDataSource, item.id, labelOpacity);
  })

}

/**
 * 马驹桥智慧社区
 *
 * @export
 * @class MjqGrid
 */
export class MjqGrid {
  constructor(viewer) {
    this.labelLayerShow = false;
    this.labelOpacity = 0.5;
    this.viewer = viewer;

    this.dom = new DOM(document.querySelector("#UIContainer"));
    this.ellipsoid = viewer.scene.globe.ellipsoid;

    this.init();
  }

  async init() {
    // 网格数据源
    this.gridDataSource = await addGeoJson(viewer, {
      url: rootPath+"mjq.geojson",
    });
    fnHandleGrid(this.gridDataSource, this.ellipsoid, this.labelOpacity);

    // 检测分布数据源
    this.checkDataSource = await addGeoJson(viewer, {
      url: rootPath+"check.geojson",
      // 不显示默认点
      markerSize: 0,
    });
    fnHandleCheck(this.checkDataSource)
    await this.initCamera();

    this.initEvent();
    this.initGUI();
    this.loop();

    setTimeout(() => {
      this.labelLayerShow = true;
    }, 10);
  }

  initCamera() {
    return new Promise((resolve, reject) => {
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.53659, 39.755686, 1200.0),
        duration: 1,
        complete: () => {
          resolve()
        }
      })
    })
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    if (this.gridDataSource) {
      if (!this.superUpdate) {
        // labal自带的更新机制
        this.superUpdate = this.gridDataSource._visualizers[2].update.bind(this.gridDataSource._visualizers[2]);
      }

      if (this.labelLayerShow == true) {
        // labal 的更新机制替换为自定义, 避让功能
        this.gridDataSource._visualizers[2].update = ()=> {}
      } else{
        // 替换为labal自带的更新机制
        this.gridDataSource._visualizers[2].update = this.superUpdate;
      }

      updateLabelShow(this.gridDataSource._entityCluster._labelCollection, this.gridDataSource._entityCluster)
    }
  }

  initEvent() {
    //事件柄
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    const oGridDataSource = this.gridDataSource;
    const oCheckDataSource = this.checkDataSource;
    this.handler.setInputAction(movement=> {
      // var Pos = viewer.scene.pickPositionWorldCoordinates(movement.position);
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
              fnRemoveAllLight(oGridDataSource, this.labelOpacity);

              //如果是标签
              sId = pick.id.id.replace("label", "");
              oEntity = oGridDataSource.entities.getById(sId);

              //对应的面高亮
              var oColor = oEntity.polygon.material.color._value;
              oEntity.polygon.material = Cesium.Color.fromCssColorString("rgb(" + 255 * oColor.red + "," + 255 * oColor.green + "," + 255 * oColor.blue + ")").withAlpha(0.9);

              this.dom.createInfo({
                title: oEntity.properties["名称"]._value,
                person: oEntity.properties["姓名"]._value,
                phone: oEntity.properties["电话"]._value,
                color: oEntity.properties["颜色值"]._value,
                closeCallback: () => {
                  fnRemoveLight(oGridDataSource, sId, this.labelOpacity)
                }
              })
            } else {
              sId = pick.id.id;
              oEntity = pick.id;
            }
          }

          if ((oCheckDataSource && oCheckDataSource.entities.contains(pick.id))) {
            const id = pick.id.id;
            var oEntity = oCheckDataSource.entities.getById(id);
            this.dom.createCheck({
              time: oEntity.properties["time"]._value,
              id: oEntity.properties["name"]._value,
            })
          }

        } else {
          console.log(pick.id);
        }
      }
      return false;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }


  initGUI() {
    // 保存希望被GUI改变的属性
    let controls = {
      '网格图层': true,
      '标签图层': true,
      '检测点图层': false,
      '高德图层': false,
    }
    // 实例化GUI
    const gui = new GUI()
    gui.add(controls, '网格图层').onChange(value => {
      fnObjShowHide(this.gridDataSource, "polygon", value);
    })
    gui.add(controls, '标签图层').onChange(value => {
      this.labelLayerShow = value
      fnObjShowHide(this.gridDataSource, "marker", value);
    })
    gui.add(controls, '检测点图层').onChange(value => {
      fnObjShowHide(this.checkDataSource, "marker", value);
    })
    gui.add(controls, '高德图层').onChange(value => {
      if (value) {
        addGaode(viewer)
      } else {
        removeGaode(viewer);
      }
    })
  }
}
