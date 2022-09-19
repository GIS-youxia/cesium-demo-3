
import * as Cesium from './CesiumUnminified';
import {GController} from './src/Controller'
import { zipObject, map, forIn } from 'lodash'

window.CESIUM_BASE_URL = "./CesiumUnminified/";

Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;


const mapConfig = {
  "code": 1,
  "msg": "",
  "time": "1663576817",
  "data": [
    {
      "id": 41,
      "name": "baseLayerPicker",
      "group": "map_config",
      "title": "基础影响图层选择器",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 42,
      "name": "navigationHelpButton",
      "group": "map_config",
      "title": "导航帮助按钮",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 43,
      "name": "animation",
      "group": "map_config",
      "title": "动画控件",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 44,
      "name": "timeline",
      "group": "map_config",
      "title": "时间控件",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 45,
      "name": "shadows",
      "group": "map_config",
      "title": "显示阴影",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 46,
      "name": "shouldAnimate",
      "group": "map_config",
      "title": "大气模型动画效果",
      "tip": "",
      "type": "switch",
      "value": "1",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 47,
      "name": "skyBox",
      "group": "map_config",
      "title": "天空盒",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 48,
      "name": "infoBox",
      "group": "map_config",
      "title": "信息提示框",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 49,
      "name": "fullscreenButton",
      "group": "map_config",
      "title": "是否显示全屏按钮",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 50,
      "name": "logo",
      "group": "map_config",
      "title": "显示cesiumLogo",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 51,
      "name": "homeButton",
      "group": "map_config",
      "title": "首页按钮",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 52,
      "name": "sceneModePicker",
      "group": "map_config",
      "title": "展示视角切换按钮",
      "tip": "",
      "type": "switch",
      "value": "1",
      "content": "",
      "rule": "",
      "extend": ""
    },
    {
      "id": 66,
      "name": "frontDebugger",
      "group": "map_config",
      "title": "是否为前端调试模式",
      "tip": "",
      "type": "switch",
      "value": "0",
      "content": "",
      "rule": "",
      "extend": ""
    }
  ]
}

const mapImageryList = {
  "code": 1,
  "msg": "",
  "time": "1663576818",
  "data": [
    {
      "id": 3,
      "name": "高德地图02",
      "type": "UrlTemplateImageryProvider",
      "classConfig": "{\"url\":\"https:\/\/webst02.is.autonavi.com\/appmaptile?style=6&x={x}&y={y}&z={z}\"}",
      "interfaceConfig": "{}",
      "offset": "0,0",
      "invertswitch": 0,
      // "filterRGB": "#ffffff",
      "showswitch": 1,
      "weigh": 0,
      "createtime": 1624346908,
      "updatetime": 1647395260
    },
    {
      "id": 14,
      "name": "高德地图01",
      "type": "UrlTemplateImageryProvider",
      "classConfig": "{\"url\":\"http:\/\/webst03.is.autonavi.com\/appmaptile?x={x}&y={y}&z={z}&style=7\"}",
      "interfaceConfig": "{\"saturation\":\"0.0\",\"brightness\":\"0.6\",\"contrast\":\"1.8\",\"hue\":\"1\",\"gamma\":\"0.3\"}",
      "offset": "0,0",
      "invertswitch": 0,
      // "filterRGB": "#4e70a6",
      "showswitch": 1,
      "weigh": 0,
      "createtime": 1624326728,
      "updatetime": 1646979297
    }
  ]
}

function getBaseMapConfig() {
  let res = mapConfig;
  res = res.data
  res = zipObject(map(res, 'name'), map(res, 'value'))
  forIn(res, (value, index) => {
    res[index] = value === '1'
  })
  return res
}

function getBaseMapImageryList() {
  let res = mapImageryList;
  res = res.data
  res.some((elem, index) => {
    res[index].classConfig = JSON.parse(elem.classConfig)
    res[index].interfaceConfig =
      elem.interfaceConfig === '' ? [] : JSON.parse(elem.interfaceConfig)
    forIn(res[index].interfaceConfig, (v, i) => {
      if (isNaN(parseFloat(v))) {
        res[index].interfaceConfig[i] = v === 'true'
      }
      else {
        res[index].interfaceConfig[i] = parseFloat(v)
      }
    })
  })

  return res
}

GController.init(getBaseMapConfig(), getBaseMapImageryList());
