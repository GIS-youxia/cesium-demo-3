import * as Cesium from 'cesium'

function getDom(color) {
  const html = `
      <div class="libora-animation-point" style="color: ${color};">
        <p></p>
      </div>
  `
  return html;
}

// 动态效果点
export class AnimatePoint {
  constructor(options) {
    const { viewer, position, color = "#ff0000", distanceDisplayCondition = new Cesium.Cartesian2(0, Infinity) } = options;

    this.htmlContainer = document.createElement("div");
    this.htmlContainer.style = 'position:absolute;pointer-events: none'
    this.htmlContainer.innerHTML = getDom(color);

    this.position = Array.isArray(position) ? Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2]) : position;
    this.postRender = this.postRender.bind(this);
    this.viewer = viewer;

    viewer.cesiumWidget.container.appendChild(this.htmlContainer);
    viewer.scene.postRender.addEventListener(this.postRender, this);
  }

  postRender() {
    const cartesian2 = new Cesium.Cartesian2();
    Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, cartesian2);
    const offsetWidth = this.htmlContainer.clientWidth;
    const offsetHeight = this.htmlContainer.clientHeight
    this.htmlContainer.style.top = `${cartesian2.y - offsetHeight / 2}px`;
    this.htmlContainer.style.left = `${cartesian2.x - offsetWidth / 2}px`;

    const ellipsoid = this.viewer.scene.globe.ellipsoid
    const cameraPosition = this.viewer.scene.camera.position;

    // 相机距离地面的距离
    const cameraToGroundDistance = ellipsoid.cartesianToCartographic(cameraPosition).height;
    // 相机距离地心的距离
    const cameraToCenterDistance = cameraToGroundDistance + ellipsoid.maximumRadius;

    // 地球背面
    if (Cesium.Cartesian3.distance(cameraPosition, this.position) > cameraToCenterDistance) {
      this.htmlContainer.style.display = "none"
    } else {
      this.htmlContainer.style.display = cameraToGroundDistance < 80000 ? "block" : "none";
    }
  }
}
