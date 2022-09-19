/*
 * @Description:
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2021-08-23 13:39:41
 * @LastEditors: Hawk
 * @LastEditTime: 2021-09-28 16:43:54
 */
/* eslint-disable no-debugger */

import EllipsoidFade from './EllipsoidFade'
import HexagonSpread from './HexagonSpread'
import Scanline from './Scanline'
import CircleWave from './CircleWave'
import RaderScan from './RaderScan'
import SpreadWall from './SpreadWall'

function getPointsEffectList() {
  return {
    "code": 1,
    "msg": "",
    "time": "1663572990",
    "data": [
      {
        "id": 13,
        "effect_type": "CircleDiffusion",
        "lon": 113.94443512,
        "lat": 22.523283005,
        "height": 0,
        "onswitch": 1,
        "color": "rgba(247, 235, 8, 1)",
        "radius": 1400,
        "duration": 9500,
        "ext": "{\"waveCount\":3,\"step\":-0.01,\"height\":500,\"edgeCount\":5 }",
        "createtime": 1629702358,
        "updatetime": 1636531409
      },
      {
        "id": 14,
        "effect_type": "Scanline",
        "lon": 113.922744751,
        "lat": 22.536218643,
        "height": 0,
        "onswitch": 1,
        "color": "rgba(206, 19, 116, 0.91)",
        "radius": 1200,
        "duration": 6500,
        "ext": "{\"waveCount\":3,\"step\":-0.01,\"height\":500,\"edgeCount\":5 }",
        "createtime": 1629702548,
        "updatetime": 1629977652
      },
      {
        "id": 15,
        "effect_type": "CircleWave",
        "lon": 113.939323425,
        "lat": 22.511972427,
        "height": 0,
        "onswitch": 1,
        "color": "rgba(31, 168, 227, 0.59)",
        "radius": 400,
        "duration": 4500,
        "ext": "{\"waveCount\":4,\"step\":-0.01,\"height\":500,\"edgeCount\":5 }",
        "createtime": 1629702655,
        "updatetime": 1629977608
      },
      {
        "id": 16,
        "effect_type": "HexagonSpread",
        "lon": 113.91519165,
        "lat": 22.513103485,
        "height": 0,
        "onswitch": 1,
        "color": "rgba(255, 0, 183, 1)",
        "radius": 800,
        "duration": 3000,
        "ext": "{\"waveCount\":3,\"step\":-0.01,\"height\":360,\"edgeCount\":0 }",
        "createtime": 1629702824,
        "updatetime": 1629977887
      },
      {
        "id": 17,
        "effect_type": "CircleScan",
        "lon": 113.928703308,
        "lat": 22.505599976,
        "height": 0,
        "onswitch": 1,
        "color": "rgba(187, 0, 255, 1)",
        "radius": 1000,
        "duration": 3000,
        "ext": "{\"waveCount\":3,\"step\":-0.01,\"height\":500,\"edgeCount\":5 }",
        "createtime": 1629702906,
        "updatetime": 1632819276
      },
      {
        "id": 18,
        "effect_type": "HexagonSpread",
        "lon": 113.934036255,
        "lat": 22.552270889,
        "height": 0,
        "onswitch": 1,
        "color": "rgba(0, 153, 191, 1)",
        "radius": 1000,
        "duration": 7500,
        "ext": "{\"waveCount\":3,\"step\":-0.01,\"height\":500,\"edgeCount\":5 }",
        "createtime": 1629703112,
        "updatetime": 1636528352
      }
    ]
  }
}

/**
 *效果集合管理控制
 *
 * @class Manager
 */
class Manager {

  constructor(viewer) {
    this.viewer = viewer
    this.EffectsList = []
  }
  async init() {
    // 首先从数据中 获取需要展示的数据
    const res = await getPointsEffectList()
    const _this = this
    if (res.data) {
      res.data.forEach((element, index) => {
        _this.add(element, index)
      })
    }
  }

  /**
   *
   *
   * @param {*} ele
   * @param {number} index
   * @memberof Manager
   */
  add(ele, index) {
    let curEntityC = null
    let pe = [ele.lon, ele.lat, ele.height]
    let ext
    switch (ele.effect_type) {
      case 'CircleDiffusion':
        curEntityC = new EllipsoidFade(
          this.viewer,
          'effect-set-config' + ele.effect_type + index
        )
        curEntityC.add(pe, ele.color, ele.radius, ele.duration)
        break
      case 'Scanline':
        curEntityC = new Scanline(
          this.viewer,
          'effect-set-config' + ele.effect_type + index
        )
        curEntityC.add(pe, ele.color, ele.radius, ele.duration)
        break
      case 'CircleWave':
        curEntityC = new CircleWave(
          this.viewer,
          'effect-set-config' + ele.effect_type + index
        )
        ext = JSON.parse(ele.ext)
        curEntityC.add(pe, ele.color, ele.radius, ele.duration, false, ext.waveCount)
        break
      case 'HexagonSpread':
        curEntityC = new HexagonSpread(
          this.viewer,
          'effect-set-config' + ele.effect_type + index
        )
        curEntityC.add(pe, ele.color, ele.radius, ele.duration)
        break
      case 'CircleScan':
        curEntityC = new RaderScan(
          this.viewer,
          'effect-set-config' + ele.effect_type + index
        )
        ext = JSON.parse(ele.ext)
        curEntityC.add(pe, ele.color, ele.radius, ext.step)
        break
      case 'SpreadWall':
        curEntityC = new SpreadWall(
          this.viewer,
          'effect-set-config' + ele.effect_type + index
        )
        ext = JSON.parse(ele.ext)
        curEntityC.add(
          pe,
          ele.color,
          ele.radius,
          ele.duration,
          ext.height,
          ext.edgeCount
        )
        break
      default:
    }
    if (curEntityC) {
      this.EffectsList.push(curEntityC)
    }
  }
}
export default Manager
