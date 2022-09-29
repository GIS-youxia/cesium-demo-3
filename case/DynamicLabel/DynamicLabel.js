import * as Cesium from 'cesium';
import { setCamera } from '../../tool/camera';
import { addCSS } from '../../tool/helper'
import { addPoint } from '../../tool/tool';

export class DynamicLabel {
  constructor(viewer, [x, y, z], label) {
    addCSS("./case/DynamicLabel/dynamicLabel.css");

    this.viewer = viewer;

    this.position = Cesium.Cartesian3.fromDegrees(x, y, z);
    addPoint(viewer, this.position)
    this.divInstance = this.createDiv(label);

    this.show = true;

    this.addPostRender();
    // setComeraPosition(viewer, {
    //   longitude: x,
    //   latitude: y,
    //   height: z,
    // })
    setCamera(viewer, "beiJing", 10000)
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



  addPostRender() {

    this.viewer.scene.postRender.addEventListener(this.postRender, this);

  }



  postRender() {

    if (this.divInstance && this.show) {

      const cartesian2 = new Cesium.Cartesian2();

      Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, cartesian2);
      const { offsetWidth,offsetHeight } = this.divInstance.firstChild;
      this.divInstance.style.top = `${cartesian2.y - offsetHeight/2}px`;
      this.divInstance.style.left = `${cartesian2.x - offsetWidth/2}px`;
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
