/*
 * @Description: 大型路网
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2021-08-26 10:48:22
 * @LastEditors: Hawk
 * @LastEditTime: 2021-09-28 16:28:17
 */
/* eslint-disable no-debugger */
// import { getLinesEffectList } from '@/api/effect'
import * as Cesium from '../../CesiumUnminified';

import { init } from './MaterialProperty/PolylineTrailMaterialProperty'
import { init as init2 } from './MaterialProperty/Spriteline1MaterialProperty'

import * as turf from '@turf/turf'

function getLinesEffectList() {
  return {
    "code": 1,
      "msg": "",
        "time": "1663572990",
          "data": [
            // {
            //   "id": 1,
            //   "type": "FlyLines",
            //   "width": 2,
            //   "geojsonfile": "",
            //   "effectimage": "",
            //   "setup_param": "{\"color\":\"#A932B4\",\"height\":3000,\"speed\":6,\"percent\":0.1,\"gradient\":0.1,\"random\":300,\"startPoint_lng\":113.8918,\"startPoint_lat\":22.4818,\"endPoint_ing\":113.96858,\"endPoint_lat\":22.5692}",
            //   "showswitch": 1,
            //   "createtime": 1632365596,
            //   "updatetime": 1632817818
            // },
            // {
            //   "id": 3,
            //   "type": "RoadPic",
            //   "width": 1.7,
            //   "geojsonfile": "./res/nanshan-road1.geojson",
            //   "effectimage": "./res/pic/spriteline1.png",
            //   "setup_param": "{\"time\":3600}",
            //   "showswitch": 1,
            //   "createtime": 1632812901,
            //   "updatetime": 1632814947
            // },
            // {
            //   "id": 4,
            //   "type": "RoadPic",
            //   "width": 2,
            //   "geojsonfile": "./res/nanshan-road2.geojson",
            //   "effectimage": "./res/pic/spriteline2.png",
            //   "setup_param": "{\"time\":3000}",
            //   "showswitch": 1,
            //   "createtime": 1632815020,
            //   "updatetime": 1632815020
            // },
            // {
            //   "id": 5,
            //   "type": "RoadPic",
            //   "width": 1.6,
            //   "geojsonfile": "./res/nanshan-road3.geojson",
            //   "effectimage": "./res/pic\/spriteline3.png",
            //   "setup_param": "{\"time\":600}",
            //   "showswitch": 1,
            //   "createtime": 1632815053,
            //   "updatetime": 1632815053
            // },
            {
              "id": 5,
              "type": "RoadPic",
              "width": 4.6,
              "geojsonfile": "./res/wangjingRoad.geojson",
              "effectimage": "./res/pic\/spriteline2.png",
              "setup_param": "{\"time\":2500}",
              "showswitch": 0,
              "createtime": 1632815053,
              "updatetime": 1632815053
            }
          ]
  }
}

class RoadNetwork {
  // viewer
  // id
  // FlyLinesEntities
  // BusLinesEntities
  // RoadPicEntities

  /**
   * Creates an instance of RoadNetwork.
   * @param {*} viewer
   * @param {string} id
   * @memberof RoadNetwork
   */
  constructor(viewer , id ) {
    this.viewer = viewer
    this.id = id
    this.FlyLinesEntities = []
    this.BusLinesEntities = []
    this.RoadPicEntities = []
  }

  async init() {
    // 首先从数据中 获取需要展示的数据
    const res  = await getLinesEffectList()
    const _this = this
    if (res.data) {
      res.data.forEach((element , index ) => {
        let setup_param = JSON.parse(element.setup_param)
        for (let key in setup_param) {
          if (key !== 'color') {
            setup_param[key] = parseFloat(setup_param[key])
          }
        }
        if (element.type === 'FlyLines') {
          this.addFlyLines([setup_param.startPoint_lng, setup_param.startPoint_lat, setup_param.endPoint_ing, setup_param.endPoint_lat]
            , setup_param.color, element.width, setup_param.height, setup_param.speed, setup_param.percent, setup_param.gradient, setup_param.random)
        }
        else if (element.type === 'BusLines') {
          this.addBusLines(element.geojsonfile,
            setup_param.color, element.width, setup_param.speed, setup_param.percent, setup_param.gradient
          )
        }
        else if (element.type === 'RoadPic') {
          this.addRoadPic(element.geojsonfile, element.effectimage, element.width, setup_param.time)
        }
      })
    }
  }

  /**
   *
   *
   * @param {string} type
   * @param {number} val
   * @memberof RoadNetwork
   */
  changeLinesPercent(type , val ) {
    let entityC = null
    if (type === 'FlyLines') {
      entityC = this.FlyLinesEntities
    }
    if (type === 'BusLines') {
      entityC = this.BusLinesEntities
    }
    entityC.forEach((item ) => {
      item.polyline.material.percent = val
    })
  }

  /**
   *
   *
   * @param {string} type
   * @param {number} val
   * @memberof RoadNetwork
   */
  changeLinesSpeed(type , val ) {
    let entityC = null
    if (type === 'FlyLines') {
      entityC = this.FlyLinesEntities
    }
    if (type === 'BusLines') {
      entityC = this.BusLinesEntities
    }
    entityC.forEach((item ) => {
      item.polyline.material.speed = val
    })
  }

  /**
   *
   *
   * @param {string} type
   * @param {number} val
   * @memberof RoadNetwork
   */
  changeLinesGradient(type , val ) {
    let entityC = null
    if (type === 'FlyLines') {
      entityC = this.FlyLinesEntities
    }
    if (type === 'BusLines') {
      entityC = this.BusLinesEntities
    }
    entityC.forEach((item ) => {
      item.polyline.material.gradient = val
    })
  }

  /**
   *
   *
   * @param {string} type
   * @param {string} color
   * @memberof RoadNetwork
   */
  changeLinesColor(type , color ) {
    let entityC = null
    if (type === 'FlyLines') {
      entityC = this.FlyLinesEntities
    }
    if (type === 'BusLines') {
      entityC = this.BusLinesEntities
    }
    entityC.forEach((item ) => {
      item.polyline.material.color = new Cesium.Color.fromCssColorString(color)
    })
  }

  /**
   *
   *
   * @param {string} type
   * @param {number} width
   * @memberof RoadNetwork
   */
  changeLinesWidth(type , width ) {
    let entityC = null
    if (type === 'FlyLines') {
      entityC = this.FlyLinesEntities
    }
    if (type === 'BusLines') {
      entityC = this.BusLinesEntities
    }
    if (type === 'RoadPic') {
      entityC = this.RoadPicEntities
    }
    entityC.forEach((item ) => {
      item.polyline.width = width
    })
  }

  /**
   *
   *
   * @param {string} type
   * @param {number} time
   * @memberof RoadNetwork
   */
  changeLinesTime(type , time ) {
    let entityC = this.RoadPicEntities
    entityC.forEach((item ) => {
      item.polyline.material.duration = time
    })
  }

  /**
   *
   *
   * @param {*} bbox
   * @param {string} color
   * @param {number} width
   * @param {number} height
   * @param {number} speed
   * @param {number} percent
   * @param {number} gradient
   * @param {number} random
   * @memberof RoadNetwork
   */
  remakeFlyLines(bbox , color , width , height , speed , percent , gradient , random ) {
    this.clearFlyLines()
    this.addFlyLines(bbox, color, width, height, speed, percent, gradient, random)
  }
  clearFlyLines() {
    const _this = this
    this.FlyLinesEntities.forEach((item) => {
      _this.viewer.entities.removeById(item.id)
    })
    this.FlyLinesEntities = []
  }

  /**
   *
   *
   * @param {*} bbox
   * @param {string} color
   * @param {number} width
   * @param {number} height
   * @param {number} speed
   * @param {number} percent
   * @param {number} gradient
   * @param {number} random
   * @memberof RoadNetwork
   */
  addFlyLines(bbox , color , width , height , speed , percent , gradient , random ) {
    init()
    const _this = this
    // 生成随机点
    let points = turf.randomPoint(random, {
      bbox: bbox,
    })
    let features = points.features
    let point
    let startPosition
    let endPosition
    features.forEach((item) => {
      point = item.geometry.coordinates
      startPosition = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
      endPosition = Cesium.Cartesian3.fromDegrees(
        point[0],
        point[1],
        height * Math.random()
      )
      _this.FlyLinesEntities.push(_this.viewer.entities.add({
        polyline: {
          positions: [startPosition, endPosition],
          width: width,
          material: new Cesium.PolylineTrailMaterialProperty({
            speed: speed * Math.random(),
            color: new Cesium.Color.fromCssColorString(color),
            percent: percent, // 尾巴拖多少长
            gradient: gradient, // 变化率
          }),
        },
      })
      )
    })
  }

  /**
   *
   *
   * @param {string} url
   * @param {string} color
   * @param {number} width
   * @param {number} speed
   * @param {number} percent
   * @param {number} gradient
   * @memberof RoadNetwork
   */
  addBusLines(url , color , width , speed , percent , gradient ) {
    init()
    const _this = this
    let promise = Cesium.GeoJsonDataSource.load(url)
    promise.then(function(dataSource ) {
      _this.viewer.dataSources.add(dataSource)
      _this.BusLinesEntities = dataSource.entities.values
      let del_list = []
      for (let i = 0; i < _this.BusLinesEntities.length; i++) {
        const entity = _this.BusLinesEntities[i]
        if (entity.polyline.positions._value.length > 6) { // 这里把街道复杂度小余6的进行筛除
          entity.polyline.width = width
          entity.polyline.material = new Cesium.PolylineTrailMaterialProperty({
            speed: speed * Math.random(),
            color: new Cesium.Color.fromCssColorString(color),
            percent: percent, // 尾巴拖多少长
            gradient: gradient, // 变化率
          })
        }
        else {
          del_list.push(entity.id)
        }
      }
      del_list.forEach((id ) => {
        dataSource.entities.removeById(id)
      })
    })
  }

  /**
   *
   *
   * @param {string} url
   * @param {string} Picurl
   * @param {number} width
   * @param {number} time
   * @memberof RoadNetwork
   */
  addRoadPic(url , Picurl , width , time ) {
    init2()
    const _this = this
    let promise = Cesium.GeoJsonDataSource.load(url)
    promise.then(function(dataSource ) {
      _this.viewer.dataSources.add(dataSource);
      _this.RoadPicEntities = dataSource.entities.values
      for (let i = 0; i < _this.RoadPicEntities.length; i++) {
        const entity = _this.RoadPicEntities[i];
        entity.polyline.width = width
        entity.polyline.material = new Cesium.Spriteline1MaterialProperty(time, Picurl)
      }
    })
  }

  // 飞线 [ 用于 测试 ]
  // 代码
  loadFlyLines() {
    init()
    const _this = this
    Cesium.Resource.fetchJson(
      'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/geojson/nanshan-road1.geojson'
    ).then(function(res ) {
      let bbox = turf.bbox(res)
      let points = turf.randomPoint(100, {
        bbox: bbox,
      }) // 生成随机点
      let features = points.features
      let point
      let startPosition
      let endPosition
      features.forEach((item) => {
        point = item.geometry.coordinates
        startPosition = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
        endPosition = Cesium.Cartesian3.fromDegrees(
          point[0],
          point[1],
          3000 * Math.random()
        )
        _this.viewer.entities.add({
          polyline: {
            positions: [startPosition, endPosition],
            width: 2,
            material: new Cesium.PolylineTrailMaterialProperty({
              speed: 6 * Math.random(),
              color: new Cesium.Color.fromCssColorString('#32B47E'),
              percent: 0.1, // 尾巴拖多少长
              gradient: 0.01, // 变化率
            }),
          },
        })
      })
    })
  }
  // 道路穿梭线
  loadRoadPicEffect() {
    init2()
    const _this = this
    let promise = Cesium.GeoJsonDataSource.load(
      'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/geojson/nanshan-road1.geojson'
    )
    promise.then(function(dataSource ) {
      _this.viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        entity.polyline.width = 3.0
        entity.polyline.material = new Cesium.Spriteline1MaterialProperty(
          1000,
          'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/pic/spriteline1.png'
        )
      }
    })

    promise = Cesium.GeoJsonDataSource.load(
      'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/geojson/nanshan-road2.geojson'
    )
    promise.then(function(dataSource ) {
      _this.viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        entity.polyline.width = 3.0
        entity.polyline.material = new Cesium.Spriteline1MaterialProperty(
          500,
          'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/pic/spriteline2.png'
        )
      }
    })

    promise = Cesium.GeoJsonDataSource.load(
      'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/geojson/nanshan-road3.geojson'
    )
    promise.then(function(dataSource ) {
      _this.viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        entity.polyline.width = 3.0
        entity.polyline.material = new Cesium.Spriteline1MaterialProperty(
          500,
          'https://mapv-data.oss-cn-hangzhou.aliyuncs.com/pic/spriteline3.png'
        )
      }
    })
  }
  loadShenZhengLinesData() {
    init()
    const _this = this
    let promise = Cesium.GeoJsonDataSource.load('https://mapv-data.oss-cn-hangzhou.aliyuncs.com/geojson/shenzhen-nanshan.geojson')
    promise.then(function(dataSource ) {
      _this.viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      let del_list = []
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        if (entity.polyline.positions._value.length > 6) {
          entity.polyline.width = 3.6
          entity.polyline.material = new Cesium.PolylineTrailMaterialProperty({
            speed: 12 * Math.random(),
            color: new Cesium.Color.fromCssColorString('#32B47E'),
            percent: 0.3, // 尾巴拖多少长
            gradient: 0.02, // 变化率
          })
        }
        else {
          del_list.push(entity.id)
        }
      }
      del_list.forEach((id ) => {
        dataSource.entities.removeById(id)
      })
    })
  }
  loadBeijingLinesData() {
    const _this = this
    Cesium.Resource.fetchJson('./res/bj-lines-bus.json').then(function(i ) {
      let t = []
      i.map(function(e , i ) {
        let n = []
        let s = []
        for (let a = 0; a < e.length; a += 2) {
          let r = [e[a], e[a + 1]]
          a > 0 && (r = [n[0] + r[0], n[1] + r[1]])
          n = r
          let o = r[0] / 1e4
          let c = r[1] / 1e4
          s.push(o)
          s.push(c)
        }
        t.push({
          positions: s,
          color: new Cesium.Color(
            0,
            0.8 * Math.random() + 0.2,
            0.5 * Math.random() + 0.5,
            1
          ),
          width: 2,
        })
      })
      _this.addLineDatas(t)
    })
  }
  addLineDatas(e ) {
    const _this = this
    e.forEach(function(e ) {
      _this.viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(e.positions),
          width: e.width,
          material: new Cesium.PolylineTrailMaterialProperty({
            speed: 30 * Math.random(),
            color: e.color,
            percent: 0.01,
            gradient: 0.1,
          }),
        },
      })
    })
  }
}
export default RoadNetwork
