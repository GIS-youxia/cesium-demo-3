
import * as Cesium from 'cesium';
import { DataManager } from './DataManager'
import { addGaode, removeGaode } from '../../tool/provider';
import { DOM } from './DOM'
import { addCSS } from '../../tool/helper';
import { MouseDownView } from '../../src/MouseDownView/index'

/**
 * 是否相交
 * @param {*} t
 * @param {*} r
 * @return {*}
 */
function isIntersect(t, r) {
  for (var i = 0, n = t.length; i < n; i++) {
    var o = t[i];
    if (Cesium.BoundingRectangle.intersect(o, r) == Cesium.Intersect.INTERSECTING)
      return true;
  }
  return false;
}

function updateBillboardShow(collection, scene) {
  var bounds = [];

  for (let i = 0; i < collection.length; i++) {
    const billboard = collection.get(i);
    const position = billboard.computeScreenSpacePosition(scene);
    if (Cesium.defined(position)) {
      const bound = Cesium.Billboard.getScreenSpaceBoundingBox(billboard, position, new Cesium.BoundingRectangle());
      if (isIntersect(bounds, bound)) {
        billboard.show = false;
      } else {
        billboard.show = true;
        bounds.push(Cesium.BoundingRectangle.clone(bound));
      }
    }
  }
}

function getCircleImage(text, color) {
  const size = 128;
  const borderWidth = 10;
  const fontText = text;
  const backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]},0.8)`;
  const fillColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`;

  var canvas = document.createElement("canvas");
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';

  var scale = window.devicePixelRatio;
  canvas.width = size * scale;
  canvas.height = size * scale;
  var ctx = canvas.getContext('2d')

  // 背景
  ctx.beginPath()
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fillStyle = backgroundColor
  ctx.fill()

  // 小圆
  ctx.beginPath()
  ctx.arc(canvas.width / 2, canvas.height / 2, scale * (size - borderWidth) / 2, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fillStyle = fillColor
  ctx.fill()

  // 填充文字颜色
  const fontSize = 100;
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center"

  ctx.fillStyle = text < 120 ? `rgb(0, 0, 0)` : `rgb(255, 255, 255)`;
  ctx.fillText(fontText, canvas.height / 2, (canvas.height + fontSize / 1.5) / 2)

  // ctx.strokeStyle = "#000";
  // ctx.lineWidth = 8;
  // ctx.strokeText(fontText, canvas.height / 2, (canvas.height + fontSize / 1.5) / 2)

  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

export class AQIDemo {
  constructor(viewer) {
    new MouseDownView(viewer);
    this.viewer = viewer;
    this.onEvent(viewer)

    this.working = false;
    this.timeout = 1000;
    addGaode(viewer)
    this.lastBound = ""
    this.collection = new Cesium.BillboardCollection()
    viewer.scene.primitives.add(this.collection);
    this.imgData = this.processImageData();
    this.loop();
    this.setCamera(viewer)
    this.dataManager = new DataManager();

    addCSS("./case/aqi/style.css")
    this.dom = new DOM(document.querySelector("#UIContainer"));
    this.initEvent();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    // 分批渲染
    if (this.currentData && this.currentData.length > 0) {
      const len = Math.min(50, this.currentData.length);
      for (let i = 0; i < len; i++) {
        this.createGraphic(this.currentData[i]);
      }
      this.currentData.splice(0, len);
    }


    if (this.collection) {
      updateBillboardShow(this.collection, this.viewer.scene)
    //   this.gridDataSource._visualizers[2].update = () => { }
    //   updateLabelShow(this.gridDataSource._entityCluster._labelCollection, this.gridDataSource._entityCluster)
    }
  }

  onEvent(viewer) {
    viewer.camera.moveEnd.addEventListener(() => {
      const bounds = this.getCurrentExtent(viewer);
      const bbox = `${bounds[1]},${bounds[0]},${bounds[3]},${bounds[2]}`
      this.endTimestamp = new Date().getTime()

      if (this.working === false && this.lastBound !== bbox) {
        this.lastBound = bbox;
        this.startWorker(bbox)
      } else if (this.endTimestamp - this.startTimestamp > this.timeout) {
        this.worker.terminate();
        this.working = false;
      }

    });
  }

  //获取当前三维地图范围
  getCurrentExtent(viewer) {
    var rectangle = viewer.camera.computeViewRectangle();
    var extent = [rectangle.west / Math.PI * 180, rectangle.south / Math.PI * 180, rectangle.east / Math.PI * 180, rectangle.north / Math.PI * 180];
    return extent;
  }

  startWorker(bbox) {
    console.log("请求数据...");

    this.startTimestamp = new Date().getTime();
    this.endTimestamp = this.startTimestamp;

    this.worker = new Worker(`./case/aqi/aqiWorker.js`)
    this.worker.postMessage({
      bounds: bbox
    })

    this.worker.onmessage = event => {
      // Worker返回的结果。
      const currentData = event.data.entityTable;
      const currentDataMap = event.data.entityTableMap;
      const currTime = event.data.currTime;

      if (currentData.length !== 0 && currTime > this.startTimestamp) {
        // 找到不在最新渲染列表的数据, 添加到移除列表
        let removeList = [];
        this.collection._billboards.forEach(old => {
          if (!currentDataMap.has(old.id)) {
            removeList.push(old);
          }
        })

        // 移除不需要渲染的数据
        for (let i = 0; i < removeList.length; i++) {
          this.collection.remove(removeList[i]);
          this.dataManager.remove(removeList[i].id);
          removeList[i]._destroy();
        }
        removeList.length = 0;
        this.currentData = currentData;
      }

      // 终止 web worker
      this.worker.terminate()
      this.working = false;
    }
  }

  setCamera(viewer) {
    let info = {};
    info.lon = 116.4715397068917;
    info.lat = 39.9945712104195;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(info.lon, info.lat, 150000.0),
      duration: 2,
      complete: () => {
      }
    })
  }

  createGraphic(createInfo) {
    const chinaBound = {
      max: {
        lon: 135.05,
        lat: 53.55
      },
      min: {
        lon: 73.66,
        lat: 3.86
      }
    }
    if (createInfo.lon < chinaBound.min.lon) return;
    if (createInfo.lon > chinaBound.max.lon) return;
    if (createInfo.lat < chinaBound.min.lat) return;
    if (createInfo.lat > chinaBound.max.lat) return;

    if (this.dataManager.isInclude(createInfo.x)) return;
    this.dataManager.add(createInfo.x);

    const position = Cesium.Cartesian3.fromDegrees(createInfo.lon, createInfo.lat);
    const graphic = {
      id: createInfo.x,
      position,
      image: getCircleImage(createInfo.aqi, this.getColor(createInfo.aqi)),
      scale: 0.15,
    }
    const billboard = this.collection.add(graphic);
    billboard.userData = createInfo;
  }

  /**
   * 处理色卡,和空气质量对应
   * @return {*}
   * @memberof AQIDemo
   */
  processImageData() {
    var nWidth = 500
    var canvas = document.createElement("canvas")
    canvas.width = nWidth
    canvas.height = nWidth
    var ctx = canvas.getContext("2d")
    ctx.beginPath()
    /* 指定渐变区域 */
    var grad = ctx.createLinearGradient(0, 0, nWidth, 0)
    /* 指定几个颜色 */
    grad.addColorStop(0.05, "rgb(0, 228, 0)") // green
    grad.addColorStop(0.15, "rgb(256, 256, 0)") // yellow
    grad.addColorStop(0.25, "rgb(256, 126, 0)") // orange
    grad.addColorStop(0.35, "rgb(256, 0, 0)") // red
    grad.addColorStop(0.5, "rgb(153, 0, 76)") // purple
    grad.addColorStop(0.8, "rgb(126, 0, 35)") // maroon
    /* 将这个渐变设置为fillStyle */
    ctx.fillStyle = grad
    /* 绘制矩形 */
    ctx.rect(0, 0, nWidth, nWidth)
    ctx.fill()
    return ctx.getImageData(0, 0, nWidth, 1).data
  }

  getColor(aqi) {
    if (aqi > 500) {
      return [126, 0, 35]
    } else {
      return [this.imgData[aqi * 4 + 0], this.imgData[aqi * 4 + 1], this.imgData[aqi * 4 + 2]]
    }
  }

  initEvent() {
    //事件柄
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.handler.setInputAction(movement => {
      var pick = this.viewer.scene.pick(movement.position);

      if (Cesium.defined(pick) && pick.primitive && pick.primitive instanceof Cesium.Billboard) {
        const info = pick.primitive.userData;
            this.dom.createInfo({
              name: info.city,
              aqi: info.aqi,
              level: info.level,
            })
      }
      return false;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
}
