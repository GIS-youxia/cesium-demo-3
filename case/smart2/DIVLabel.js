import * as Cesium from 'cesium';
import { addCSS } from '../../tool/helper';
import { addPoint } from '../../tool/tool';
addCSS("./case/smart2/div.css");

export class DIVLabel {
  constructor(viewer, position, text) {
    this.viewer = viewer;
    this.position = position//Cesium.Cartesian3.fromDegrees(x, y, z);
    addPoint(viewer, this.position)
    this.divInstance = this.createDiv(text);

    this.show = true;
    this.addPostRender();
  }

  createDiv(text) {
    const div = document.createElement('div');
    div.className = 'mars3d-divGraphic';
    div.innerHTML = `
      <div class="mars3d-divBoderLabel">
        ${text}
      </div>`

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
      const offsetHeight = this.divInstance.clientHeight;

      const x = cartesian2.x - offsetWidth / 2;
      const y = cartesian2.y - offsetHeight / 2;
      // pointer - events: none;
      // display: block;
      // transform: matrix(1, 0, 0, 1, 2852.17, 2701.89);
      // transform - origin: left bottom 0px;
      // z - index: auto;
      // const transform =  //`matrix(1, 0, 0, 1, ${x}, ${y});`;
      // this.divInstance.style.transform = `matrix(1,0,0,1,${x},${y})`;
      // this.divInstance.style.transformOrigin = "left bottom 0px";
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
