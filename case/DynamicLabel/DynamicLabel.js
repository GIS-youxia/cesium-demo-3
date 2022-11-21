import * as Cesium from 'cesium';
import { addPoint } from '../../tool/tool';

export class DynamicLabel {
  constructor(viewer, [x, y, z], [text1,text2], style="style1") {
    this.viewer = viewer;
    this.position = Cesium.Cartesian3.fromDegrees(x, y, z);
    addPoint(viewer, this.position)

    if (style === "style1") {
      this.divInstance = this.createDiv([text1, text2]);
    } else if (style == "style2"){
      this.divInstance = this.createDivStyle2([text1, text2]);
    } else {
      this.divInstance = this.createDivStyle3([text1, text2]);
    }

    this.show = true;

    this.addPostRender();
  }

  createDiv(label) {
    const div = document.createElement('div');
    div.className = 'dynamiclabel-container dynamiclabel-container1';
    const div2 = document.createElement('div');
    div2.className = 'dynamiclabel-marker__boder';
    const span = document.createElement('span');
    span.className = 'dynamiclabel-marker__text';
    span.innerText = label;
    div2.appendChild(span);
    div.appendChild(div2);
    this.viewer.cesiumWidget.container.appendChild(div);
    return div;
  }

  createDivStyle2(text) {
    const div = document.createElement('div');
    div.className = 'hot-spot';
    div.innerHTML = `
      <div class="hot-spot-board hot-spot-board-medium">
        <h5> ${text[0]}</h5>
        <p>  ${text[1]}</p>
      </div>
      <div class="hot-spot-line hot-spot-line-medium"></div>
    `
    this.viewer.cesiumWidget.container.appendChild(div);
    return div;
  }

  createDivStyle3(text) {
    const div = document.createElement("div");
    div.className = "dynamiclabel-container"
    div.innerHTML = `
    <div class="mars3d-divGraphic" style="pointer-events: all;display: block;transform-origin: left bottom 0px;z-index: auto;"><div class="marsBlackPanel  animation-spaceInDown">
      <div class="marsBlackPanel-text" style="">
       <span class="temperature"> ${text[1]}</span>
      </div>
      </div>
      <div class="hot-spot2" style="top: -24px; left: -35px;">
    </div></div>`
    this.viewer.cesiumWidget.container.appendChild(div);
    return div;
  }

  addPostRender() {
    this.viewer.scene.postRender.addEventListener(this.postRender, this);
  }



  postRender() {
    if (this.divInstance && this.show) {
      const cartesian2 = new Cesium.Cartesian2();
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, cartesian2);
      const offsetWidth = this.divInstance.clientWidth;
      const offsetHeight = this.divInstance.clientHeight
      this.divInstance.style.top = `${cartesian2.y - offsetHeight /2}px`;
      this.divInstance.style.left = `${cartesian2.x - offsetWidth /2}px`;
    }
  }

  setVisible(v) {
    this.show = v;
    v ? this.divInstance.style.display = 'block' : this.divInstance.style.display = 'none';
  }

  destroy() {
    this.divInstance.style.display = 'none';
  }
}
