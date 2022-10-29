
import * as Cesium from 'cesium';

import { addGaode, addDebug } from '../../../tool/provider';
import { addCSS } from '../../ui/helper';
import { CesiumDrawingTool } from './cesium-drawing-tool'
import { PolylineTool } from './PolylineTool'
import { MarkerTool } from './MarkerTool'
import { PolygonTool } from './PolygonTool'
import { ImportExport } from './ImportExport'


addCSS("./webgis-src/demo/draw/cesium-drawing-tool.css")

const DrawState = {
  "NONE": "none",
  "MARKER": "marker",
  "POLYLINE": "polyline",
  "POLYGON": "polygon",
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

    this._importExport = new ImportExport(this._viewer, this._toolMap);
    this._activeTool = null;
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

    this.allToolDom = {
      marker: markerDom,
      polyline: polylineDom,
      polygon: polygonDom
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
      if (this.drawState === DrawState.NONE) return;

      const position = this._viewer.scene.camera.pickEllipsoid(event.position);
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
          break;
      }
     })
  }
}
