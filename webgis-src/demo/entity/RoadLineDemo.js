import * as Cesium from 'cesium';

export class RoadLineDemo {
  constructor(viewer) {
    this.viewer = viewer;

    // 亮度设置
    var stages = this.viewer.scene.postProcessStages;
    this.viewer.scene.brightness = this.viewer.scene.brightness || stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
    this.viewer.scene.brightness.enabled = true;
    this.viewer.scene.brightness.uniforms.brightness = 2;

    // this.loadBuildData();
    this.loadLines();
  }

  //加载建筑物数据
  loadBuildData() {
    let tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: "http://www.xt3d.cn/data/country_build/chengdu_ajust_clip/tileset.json"
    }));

    tileset.readyPromise.then((tileset) => {
      let cs = new xt3d.BuildingEffects.CustomShaderEffect(this.viewer, tileset, {
        color: '0.2, 0.5, 1.0, 1.0', //颜色 rgba 浮点型
        glowRange: true, //是否显示光环
        glowRangeHeight: '100.0', //光环范围 浮点型
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  //加载线数据
  loadLines() {
    var promise = Cesium.GeoJsonDataSource.load('/data.xt3d.cn/assets/data/chendu-daolu.json');
    promise.then((dataSource) => {
      this.viewer.dataSources.add(dataSource);
      let values = dataSource.entities.values;

      for (var i = 0; i < values.length; i++) {
        var line = values[i];
        line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
          color: Cesium.Color.fromCssColorString('#FF4500'),
          glowPower: 0.2,
          opacity: 0.8,
        });
        line.polyline.width = 12;
      }
    }).otherwise(function (error) {
      console.log(error)
    });
  }

  //添加水体数据
  loadHelius() {
    fetch("/data.xt3d.cn/assets/data/chendu-heliu.json").then(res => {
      return res.json();
    }).then(res => {
      let features = res.features;
      let coordinates, positions;
      features.map(feature => {
        coordinates = feature.geometry.coordinates[0];
        positions = this.coordinatesToPositions(coordinates);
        this.addHeliu(positions);
      })
    })
  }

  //添加一条河流
  addHeliu(positions) {
    let waterPrimitive = new xt3d.PolygonObject.WaterPrimitive(positions, {
      baseWaterColor: Cesium.Color.AQUA.withAlpha(0.3),
      normalMap: '/data.xt3d.cn/assets/images/polygon/waterNormalsSmall.jpg',
      frequency: 1000.0,
      animationSpeed: 0.03,
      amplitude: 10.0,
      specularIntensity: 5,
    });
    this.viewer.scene.primitives.add(waterPrimitive); //添加到场景
  }

  //坐标串转为笛卡尔坐标数组
  coordinatesToPositions(coordinates) {
    let positions = [];
    coordinates.map(c => {
      positions.push(Cesium.Cartesian3.fromDegrees(c[0], c[1], 0))
    });
    return positions;
  }

  //设置视角
  setView() {
    this.viewer.scene.camera.setView({
      duration: 1,
      destination: {
        x: -1337790.7881094853,
        y: 5330396.094162445,
        z: 3231621.5380446212
      },
      orientation: {
        heading: 6.010538181825211,
        pitch: -0.6819480997380261,
        roll: 6.282163306739159,
      }
    });
  }

  destroy() {
    this.viewer.entities.removeAll();
    this.viewer.imageryLayers.removeAll(true);
    this.viewer.destroy();
  }
}
