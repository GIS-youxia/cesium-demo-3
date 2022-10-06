import * as Cesium from 'cesium';
import { addCSS } from '../../tool/helper';

export class MouseDownView{
  constructor(viewer) {
    addCSS("./src/MouseDownView/mouse.css?"+new Date().getTime())
    this.enable = true;

    this.dom = this.getUI();
    viewer.cesiumWidget.container.appendChild(this.dom);
    this.endPosition = null;

    // 事件柄
    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.handler.setInputAction(movement => {
      this._mousWheelHandler(movement);
    }, Cesium.ScreenSpaceEventType.WHEEL);

    this.handler.setInputAction(movement => {
      this.endPosition = movement.endPosition;
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  getUI() {
    const dom = document.createElement("div");
    dom.classList.add("liborong-mousedownview")
    dom.innerHTML = `<div class="liborong-mousedownview-img"></div>`
    return dom;
  }


  _mousWheelHandler() {
    if (!this.endPosition) return;

    this.dom.classList.add("liborong-mousedownview-show");
    this.dom.style.top = this.endPosition.y+'px';
    this.dom.style.left = this.endPosition.x+'px';
    clearTimeout(this.timer);


    this.timer = setTimeout(() => {
      this.dom.classList.remove("liborong-mousedownview-show");
    }, 800);
  }
}
