
import * as Cesium from 'cesium';

import { addGaode, addDebug } from '../../../tool/provider';
import { addCSS } from '../../ui/helper';
import { CesiumDrawingTool } from './cesium-drawing-tool'
import { PolylineTool } from './PolylineTool'
import { MarkerTool } from './MarkerTool'
import {PolygonTool} from './PolygonTool'
addCSS("./webgis-src/demo/draw/cesium-drawing-tool.css")

const DrawState = {
  "NONE": "none",
  "MARKER": "marker",
  "POLYLINE": "polyline",
}

export class DrawDemo {
  constructor(viewer) {
    this._viewer = viewer
    window.aaa = this;
    // addGaode(viewer)
    addDebug(viewer)
    this.drawState = DrawState.NONE;

    this._polylineTool = new PolylineTool(this._viewer)
    this._markerTool = new MarkerTool(this._viewer);
    this._polygonTool = new PolygonTool(this._viewer);
    this._cesiumContainer = document.querySelector("#cesiumContainer");

    this._setCamera()
    this._initEvent();
    this._initPointUI();
    this._initPolylineUI();
    this._initPolygonUI();
  }

  _initPointUI() {
    const dom = document.querySelector(".leaflet-pm-icon-marker")
    const meun = document.querySelector(".marker-menu");

    dom.addEventListener("click", () => {
      meun.style.display = "block"
      this.drawState = DrawState.MARKER;
      this._markerTool.enable = true;
    })


    meun.addEventListener("click", () => {
      meun.style.display = "none"
      this.drawState = DrawState.NONE;
      this._markerTool.enable = false;
    })
  }

  _initPolylineUI() {
    const dom = document.querySelector(".leaflet-pm-icon-polyline")
    const meun = document.querySelector(".polyline-menu");
    const finish = document.querySelector(".polyline-menu .action-finish");
    const cancel = document.querySelector(".polyline-menu .action-cancel");

    // cursor: pointer;default;crosshair
    dom.addEventListener("click", () => {
      meun.style.display = "block"
      this._cesiumContainer.style.cursor = "pointer"
      this.drawState = DrawState.POLYLINE
      this._polylineTool.enable = true;
    })


    finish.addEventListener("click", () => {
      meun.style.display = "none"
      this._cesiumContainer.style.cursor = "default"
      this.drawState = DrawState.NONE;
      this._polylineTool.enable = false;
      this._polylineTool.finish();
    })

    cancel.addEventListener("click", () => {
      meun.style.display = "none"
      this._cesiumContainer.style.cursor = "default"
      this.drawState = DrawState.NONE;
      this._polylineTool.enable = false;
      this._polylineTool.cancle();
    })
  }

  _initPolygonUI() {
    const dom = document.querySelector(".leaflet-pm-icon-polygon")
    const meun = document.querySelector(".polygon-menu");
    // const finish = document.querySelector(".polygon-menu .action-finish");
    const cancel = document.querySelector(".polygon-menu .action-cancel");

    // cursor: pointer;default;crosshair
    dom.addEventListener("click", () => {
      meun.style.display = "block"
      this._cesiumContainer.style.cursor = "pointer"
      this.drawState = DrawState.POLYLINE
      this._polygonTool.enable = true;
    })


    // finish.addEventListener("click", () => {
    //   meun.style.display = "none"
    //   this._cesiumContainer.style.cursor = "default"
    //   this.drawState = DrawState.NONE;
    //   this._polygonTool.enable = false;
    //   this._polygonTool.finish();
    // })

    cancel.addEventListener("click", () => {
      meun.style.display = "none"
      this._cesiumContainer.style.cursor = "default"
      this.drawState = DrawState.NONE;
      this._polygonTool.enable = false;
      this._polygonTool.cancle();
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
  }
}
