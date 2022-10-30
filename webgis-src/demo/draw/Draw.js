
import * as Cesium from 'cesium';

import { addGaode, addDebug } from '../../../tool/provider';
import { addCSS } from '../../ui/helper';
import { CesiumDrawingTool } from './cesium-drawing-tool'
import { PolylineTool } from './PolylineTool'
import { MarkerTool } from './MarkerTool'
import { PolygonTool } from './PolygonTool'
import { ImportExport } from './ImportExport'


// addCSS("./webgis-src/demo/draw/cesium-drawing-tool.css")

const DrawState = {
  "NONE": "none",
  "MARKER": "marker",
  "POLYLINE": "polyline",
  "POLYGON": "polygon",
  "RECORD": "record",
  "READ": "read",
}

export class DrawDemo {
  constructor(viewer) {
    this._viewer = viewer
    window.aaa = this;
    addGaode(viewer)
    // addDebug(this._viewer)
    this.drawState = DrawState.NONE;

    this._messageDom = document.querySelector(".message")
    this._markerTool = new MarkerTool(this._viewer);
    this._polylineTool = new PolylineTool(this._viewer)
    this._polygonTool = new PolygonTool(this._viewer);
    this._cesiumContainer = document.querySelector("#cesiumContainer");

    this._toolMap = {
      markerTool: this._markerTool,
      polylineTool: this._polylineTool,
      polygonTool: this._polygonTool,
    };

    this._lastCilckEntity = null;
    this._lastClickEntityColor = null;
    this._importExport = new ImportExport(this._viewer, this._toolMap);
    this._activeTool = null;
    this._userDataDom = document.querySelector(".setUserData");
    document.querySelector(".setUserData .confirm").addEventListener("click", () => {
      this._lastCilckEntity.userData = document.querySelector(".setUserData textarea").value;
      this._userDataDom.style.display = "none"
     })
    document.querySelector(".setUserData .cancle").addEventListener("click", () => {
      this._userDataDom.style.display = "none"
    })

    this._setCamera()
    this._initEvent();
    this._initToolUI();

    this._initReadFile()
    this._initDownload()
  }

  _showText(text) {
    this._messageDom.innerText = text;
    this._messageDom.classList.add("show")
    setTimeout(() => {
      this._messageDom.classList.remove("show")
      this._messageDom.classList.add("hide")
    }, 1000);
  }

  _initDownload() {
    const marker = document.querySelector(".downloadMarker")
    const polyline = document.querySelector(".downloadPolyline")
    const polygon = document.querySelector(".downloadPolygon")

    function handleExport(name) {
      const tool = this._toolMap[name]
      if (tool.children.length < 1) {
        this._showText("导出失败,无内容...")
        return
      }
      this._importExport.toGeoJson(tool)
    }
    handleExport = handleExport.bind(this);

    marker.addEventListener('click', () => {
      handleExport("markerTool")
    })

    polyline.addEventListener('click', () => {
      handleExport("polylineTool")
    })

    polygon.addEventListener('click', () => {
      handleExport("polygonTool")
    })
  }

  _initReadFile() {
    const input = document.querySelector('input[type=file]')

    input.addEventListener('change', () => {
      const reader = new FileReader()

      const patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
      //获得文件扩展名
      const suffix = input.files[0].name.match(patternFileExtension);
      if (!suffix || suffix[0] !== ".geojson") {
        this._showText("只支持 .geojson格式的文件...")
        document.querySelector("input").value = ''
        return;
      }

      reader.readAsText(input.files[0], 'utf8')
      reader.onload = () => {
        this._importExport.fromGeoJson(reader.result);
        document.querySelector("input").value = ''
      }
    }, false)

  }

  _disableAllTool() {
    for (let i in this.allToolDom) {
      this.allToolDom[i].classList.remove('tool-btn-active');
    }
    this._messageDom.classList.remove("show")
    this._messageDom.classList.add("hide")
   }

  _initToolUI() {
    const markerDom = document.querySelector(".marker")
    const polylineDom = document.querySelector(".polyline")
    const polygonDom = document.querySelector(".polygon")
    const recordDom = document.querySelector(".record")
    // const readDom = document.querySelector(".read")

    this.allToolDom = {
      marker: markerDom,
      polyline: polylineDom,
      polygon: polygonDom,
      record: recordDom,
      // read: readDom,
    }

    const allToolMap = {
      marker: this._markerTool,
      polyline: this._polylineTool,
      polygon: this._polygonTool,
    }

    const drawStateMap = {
      marker: DrawState.MARKER,
      polyline: DrawState.POLYLINE,
      polygon: DrawState.POLYGON,
    }

    const messageMap = {
      marker: "点击放置,ESC退出",
      polyline: "点击放置, ESC退出, 点击最后一个点完成",
      polygon: "点击放置, ESC退出, 点击第一个点完成",
    }

    function _handleToolClick(name) {
      this._disableAllTool();
      this.allToolDom[name].classList.add("tool-btn-active")

      if (this._activeTool) {
        this._activeTool.enable = false;
      }
      this.drawState = drawStateMap[name];
      this._activeTool = allToolMap[name];
      this._activeTool.enable = true;

      this._messageDom.innerText = messageMap[name]
      this._messageDom.classList.add("show")
    }

    _handleToolClick = _handleToolClick.bind(this);

    markerDom.addEventListener("click", () => {
      _handleToolClick("marker")
    })

    polylineDom.addEventListener("click", () => {
      _handleToolClick("polyline")
    })

    polygonDom.addEventListener("click", () => {
      _handleToolClick("polygon")
    })

    recordDom.addEventListener("click", () => {
      this._disableAllTool();
      recordDom.classList.add("tool-btn-active")
      this.drawState = DrawState.RECORD
    })

    // readDom.addEventListener("click", () => {
    //   this._disableAllTool();
    //   readDom.classList.add("tool-btn-active")
    //   this.drawState = DrawState.READ
    // })
  }

  _setCamera() {
    this._cesiumContainer.style.opacity = 0;
    let info = {};
    info.lon = 116.4715397068917;
    info.lat = 39.9945712104195;
    this._viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(info.lon, info.lat, 10000.0),
      duration: 0,
      complete: () => {
        this._cesiumContainer.style.opacity = 1;
      }
    })
  }

  _setEntityColor(entity, color) {
    if (entity.billboard) {
      entity.billboard.color = color;
    } else if (entity.polyline) {
      entity.polyline.material = color;
    } else if (entity.polygon) {
      entity.polygon.material = color;
    }
  }

  _getEntityColor(entity) {
    if (entity.billboard) {
      return entity.billboard.color
    } else if (entity.polyline) {
      return entity.polyline.material
    } else if (entity.polygon) {
      return entity.polygon.material
    }
  }

  _initEvent() {
    var handler = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);
    handler.setInputAction(event => {
      if (this.drawState === DrawState.NONE) return;

      const position = this._viewer.scene.camera.pickEllipsoid(event.endPosition);
      this._polylineTool.mouseMove(position);
      this._markerTool.mouseMove(position);
      this._polygonTool.mouseMove(position);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(event => {
      const position = this._viewer.scene.camera.pickEllipsoid(event.position);


      if (this.drawState === DrawState.RECORD) {
        this._userDataDom.style.display = "none"

        if (this._lastCilckEntity) {
          this._setEntityColor(this._lastCilckEntity, this._lastClickEntityColor);
          this._lastCilckEntity = null;
        }
        const pick = this._viewer.scene.pick(event.position);
        if (Cesium.defined(pick)) {
          var oEntity = this._viewer.entities.getById(pick.id.id);
          // console.error(oEntity);
          this._lastClickEntityColor = this._getEntityColor(oEntity);
          this._setEntityColor(oEntity, Cesium.Color.RED)
          this._lastCilckEntity = oEntity;

          this._userDataDom.style.display = "block"
          if (oEntity.userData) {
            document.querySelector(".setUserData textarea").value = oEntity.userData
          } else {
            document.querySelector(".setUserData textarea").value = ""
          }
          // if (oEntity.b)
        }
      }

      if (this.drawState === DrawState.READ) {
        if (this._lastCilckEntity) {
          this._setEntityColor(this._lastCilckEntity, this._lastClickEntityColor);
          this._lastCilckEntity = null;
        }
        const pick = this._viewer.scene.pick(event.position);
        if (Cesium.defined(pick)) {
          var oEntity = this._viewer.entities.getById(pick.id.id);
          // console.error(oEntity);
          this._lastClickEntityColor = this._getEntityColor(oEntity);
          this._setEntityColor(oEntity, Cesium.Color.RED)
          this._lastCilckEntity = oEntity;

          this._showText(oEntity.userData || "")
        }
      }
      if (this.drawState === DrawState.NONE) return;
      this._polylineTool.mouseClick(position);
      this._markerTool.mouseClick(position);
      this._polygonTool.mouseClick(position);


    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        // esc,退出
        case 27:
          this._disableAllTool();
          if (this._activeTool) {
            this._activeTool.enable = false
            this._activeTool = null;
          }

          if (this._lastCilckEntity) {
            this._setEntityColor(this._lastCilckEntity, this._lastClickEntityColor);
            this._lastCilckEntity = null;
            this._userDataDom.style.display = "none"
          }
          this.drawState = DrawState.NONE;
          break;
      }
     })
  }
}
