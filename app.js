
import * as Cesium from './CesiumUnminified';
import { updateResolutionScale, getClickPointAdd } from './tool/tool'
import { addGaode } from './tool/provider'
import Tileset from './src/Titleset'
import { setCamera, } from './tool/camera'


window.CESIUM_BASE_URL = "./CesiumUnminified/";
Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NTM5NzhjYy0yYzRjLTQwYWUtODA1NC1lMTRiMzIyOWFkZmYiLCJpZCI6NTU4NzksImlhdCI6MTYyMTM3Nzc5OX0.vqIWYzqg7zdA9ubxUBVY5bUCSQ3NnsSsaE8VI_A8ThU`;


const viewOptions = {
  animation: false,
  baseLayerPicker: false,
  infoBox: false,
  timeline: false,
  shouldAnimate: false
}


const viewer = new Cesium.Viewer("cesiumContainer", viewOptions);

// 添加底图
addGaode(viewer)

setCamera(viewer, "shenZhen", 10000)

// 解决模糊
updateResolutionScale(viewer)

// 开启拾取
getClickPointAdd(viewer);

// 添加白模数据
const tile = new Tileset(viewer)
tile.init()


