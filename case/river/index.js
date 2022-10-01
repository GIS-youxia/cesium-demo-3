import * as Cesium from 'cesium';
import glsl from './source.glsl'

export class RiverDemo {
  constructor(viewer) {
    this.viewer = viewer;
    this.addData();
    this.setView();
  }
  //初始化viewer
  initViewer(el) {
    this.viewer = new Cesium.Viewer(el, {
      infoBox: false,
      selectionIndicator: false,
      navigation: false,
      animation: false,
      shouldAnimate: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url: "http://data.marsgis.cn/terrain",
        requestWaterMask: true,
        requestVertexNormals: true
      }),
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A"
      })
    });

    //是否开启抗锯齿
    this.viewer.scene.fxaa = true;
    this.viewer.scene.postProcessStages.fxaa.enabled = true;
  }

  //添加数据
  addData() {
    this.addPolygon();
    this.addPlyline();
    this.addLabels();
  }

  //添加流域面
  addPolygon() {
    let url = "./res/blj_liuyu.json";
    new Cesium.GeoJsonDataSource().load(url, {
      stroke: Cesium.Color.HOTPINK,
      fill: Cesium.Color.fromCssColorString("#caca1345"),
      strokeWidth: 3,
      clampToGround: true, //贴地
    }).then(geoJsonDataSource => {
      this.viewer.dataSources.add(geoJsonDataSource);
    })
  }

  //添加流域线
  addPlyline() {
    let url = "./res/gsssx_dq.json";
    new Cesium.GeoJsonDataSource().load(url, {
      stroke: Cesium.Color.fromCssColorString("#0000ffeb"),
      strokeWidth: 4,
      clampToGround: true, //贴地
    }).then(geoJsonDataSource => {
      this.viewer.dataSources.add(geoJsonDataSource);
    })

    this.addZhugandao();
  }

  //添加主干道效果
  addZhugandao() {
    let url = "./res/gsssx_dq.json";
    fetch(url).then(res => {
      return res.json();
    }).then(res => {
      res.features.forEach(feature => {
        let positions;
        if (feature.properties.NAME == "白龙江") {
          positions = [];
        }
        if (feature.properties.NAME == "岷江") {
          positions = [];
        }
        if (positions) {
          feature.geometry.coordinates.forEach(point => {
            positions.push(Cesium.Cartesian3.fromDegrees(point[0], point[1], 0));
          });
          this.addZhugandaoToMap(positions);
        }
      })
    })

  }

  getMaterial() {
    let mat;
    mat = new Cesium.ImageMaterialProperty({
      color: Cesium.Color.fromCssColorString("#ff0000"),
      transparent: false
    })

    // mat = new Cesium.Material({
    //   fabric: {
    //     type: 'RiverType',
    //     uniforms: {
    //       color: Cesium.Color.RED,
    //       image: "./res/pic/spriteline2.png",
    //       time: 0x14,
    //       count: 3
    //     },
    //     source: glsl
    //   },
    //   translucent: true
    // });
    return mat;
  }
  //主干道
  addZhugandaoToMap(positions) {
    const material = this.getMaterial();
    const polyline = {
      polyline: {
        material,//
        positions: positions.reverse(),
        width: 10,
        clampToGround: true,
      }
    };
    this.viewer.entities.add(polyline)
  }

  //标注
  addLabels() {
    let labelDatas = [{
      label: "岷",
      point: [104.26062694197869, 34.12571898733611, 0]
    }, {
      label: "江",
      point: [104.5092620131343, 33.95737123461645, 0]
    }, {
      label: "白",
      point: [103.60533129631136, 33.98398737285986, 0]
    }, {
      label: "龙",
      point: [104.02193681205009, 33.93532263381305, 0]
    }, {
      label: "江",
      point: [104.31488419701762, 33.79516038532741, 0]
    }, {
      label: "白",
      point: [104.58932278375232, 33.64211494251952, 0]
    }, {
      label: "龙",
      point: [104.9184750105182, 33.41276498896774, 0]
    }, {
      label: "江",
      point: [104.99607133247369, 33.137824085943095, 0]
      }
    ];

    labelDatas.forEach(item => {
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(item.point[0], item.point[1], item.point[2]),
        label: {
          text: item.label,
          fillColor: Cesium.Color.WHITE,
          scale: 0.3,
          font: 'normal 80px MicroSoft YaHei',
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 500000),
        }
      })
    })

  }

  //默认视角
  setView() {
    this.viewer.scene.camera.flyTo({
      duration: 1,
      destination: {
        x: -1453715.846638391,
        y: 5480116.837807385,
        z: 3480759.393983982
      },
      orientation: {
        heading: 0.03412961843945439,
        pitch: -1.0008516446152012,
        roll: 6.2831850130093905
      }
    });
  }

  destroy() {
    this.viewer.entities.removeAll();
    this.viewer.imageryLayers.removeAll(true);
    this.viewer.destroy();
  }
}
