
import * as Cesium from 'cesium';

import { addGaode, addDebug } from '../../../tool/provider';
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
    window.aaa = this;
    // addGaode(viewer)
    addDebug(viewer)
    this.iconPath = "./res/pic/marker.png"
    this.polylinePath = "./res/pic/circle.png"
    this.setCamera(viewer)
    this.drawState = DrawState.NONE;
    this.getPositions = this.getPositions.bind(this)
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

    //     cursor: pointer;default;crosshair
    dom.addEventListener("click", () => {
      meun.style.display = "block"
      this.cesiumContainer.style.cursor = "pointer"
      this.drawState = DrawState.POLYLINE
      if (!this.polylineMarker) {
        this.polylineMarker = this.getPolylineMarker()
      }
      this.polylineMarker.position = this.lastPosition;

      this.polylineMarker = this.viewer.entities.add({
        polyline: {
          positions: new Cesium.CallbackProperty(this.getPositions, false),
          clampToGround: true,
          width: 5,
          material: Cesium.Color.RED
        }
      });
      // if (!this.shape) {
      //   this.shape = this.getMarker()
      // }
      // this.shape.show = true;
      // this.shape.position = this.lastPosition;
    })


    meun.addEventListener("click", () => {
      meun.style.display = "none"
      this.cesiumContainer.style.cursor = "default"
      this.drawState = DrawState.NONE;
      // this.shape.show = false;
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

  getPolylineMarker() {
    return this.viewer.entities.add({
      position: this.lastPosition,
      billboard: {
        image: this.polylinePath,
        scale: 1,
        width: 14,
        height: 14
        // verticalOrigin: Cesium.VerticalOrigin.CENTER
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
      } else if (this.drawState === DrawState.POLYLINE) {
        if (this.polylineMarker) {
          this.polylineMarker.position = this.lastPosition;
        }

        if (this.polylineMarker && this.positions.length>=1) {
          this.positions[this.positions.length - 1] = this.lastPosition;
          // this.shape.position = this.lastPosition;
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
        this.polylineMarker = this.getPolylineMarker();
        // if (!this.polylineMarker) {
          // var dynamicPositions = new Cesium.CallbackProperty((function () {
          //   return this.positions;
          // }).bind(this), false);

          // this.polylineMarker = this.viewer.entities.add({
          //   polyline: {
          //     positions: new Cesium.CallbackProperty(this.getPositions,false),
          //     clampToGround: true,
          //     width: 5,
          //     material: Cesium.Color.RED
          //   }
          // });
        // }

      }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}
