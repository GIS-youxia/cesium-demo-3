
import * as Cesium from 'cesium';

import { addGaode } from '../../../tool/provider';
import { addCSS } from '../../ui/helper';
import { CesiumDrawingTool } from './cesium-drawing-tool'

addCSS("./webgis-src/demo/draw/cesium-drawing-tool.css")
const DrawState = {
  "NONE": "none",
  "MARKER": "marker",
  "POLYLINE": "polyline",
}
export class DrawDemo {
  constructor(viewer) {
    this.viewer = viewer
    // addGaode(viewer)
    this.iconPath = "./res/pic/marker.png"
    this.setCamera(viewer)
    this.drawState = DrawState.NONE;
    // let cesiumDrawingTool = new CesiumDrawingTool(
    //   viewer, // cesium viewer object
    //   'cesiumContainer', // viewer DOM id
    //   './webgis-src/demo/draw/pin.png' // location pin image uri
    // );
    // cesiumDrawingTool.init();

    this.positions = [];
    this.cesiumContainer = document.querySelector("#cesiumContainer")
    this.initEvent();
    this.initPoint();
    this.initPolyline();
  }

  initPoint() {
    const dom = document.querySelector(".leaflet-pm-icon-marker")
    const meun = document.querySelector(".marker-menu");

    dom.addEventListener("click", () => {
      meun.style.display = "block"
      this.drawState = DrawState.MARKER;

      if (!this.shape) {
        this.shape = this.getMarker()
      }
      this.shape.show = true;
      this.shape.position = this.lastPosition;
    })


    meun.addEventListener("click", () => {
      meun.style.display = "none"
      this.drawState = DrawState.NONE;
      this.shape.show = false;
      this.shape = null;
    })
  }

  initPolyline() {
    const dom = document.querySelector(".leaflet-pm-icon-polyline")
    const meun = document.querySelector(".polyline-menu");

    dom.addEventListener("click", () => {
      meun.style.display = "block"
      this.drawState = DrawState.POLYLINE

      // if (!this.shape) {
      //   this.shape = this.getMarker()
      // }
      // this.shape.show = true;
      // this.shape.position = this.lastPosition;
    })


    meun.addEventListener("click", () => {
      meun.style.display = "none"
      this.drawState = DrawState.NONE;
      this.shape.show = false;
      this.shape = null;
    })
  }

  setCamera(viewer) {

    cesiumContainer.style.opacity = 0;
    let info = {};
    info.lon = 116.4715397068917;
    info.lat = 39.9945712104195;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(info.lon, info.lat, 10000.0),
      duration: 2,
      complete: () => {
        cesiumContainer.style.opacity = 1;
      }
    })
  }

  getMarker() {
    return this.viewer.entities.add({
      position: this.lastPosition,
      billboard: {
        image: this.iconPath,
        scale: 0.5,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    });
  }

  getPositions() {
    return this.positions;
  }
  initEvent() {
    var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    handler.setInputAction(event => {
      this.lastPosition = this.viewer.scene.camera.pickEllipsoid(event.endPosition);

      if (this.drawState === DrawState.MARKER) {
        if (this.shape) {
          this.shape.position = this.lastPosition;
        }
      }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(event => {

      if (this.drawState === DrawState.MARKER) {
        if (this.shape) {
          this.shape = this.getMarker()
          this.shape.position = this.lastPosition
        }
      } else if (this.drawState === DrawState.POLYLINE) {
        this.positions.push(this.lastPosition);
        if (!this.shape) {
          this.shape = this.viewer.entities.add({
            polyline: {
              positions: new Cesium.CallbackProperty(this.getPositions, false),
              clampToGround: true,
              width: 300,
              material: Cesium.Color.RED
            }
          });
        }

      }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}
