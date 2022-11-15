import * as Cesium from 'cesium';
import { RingPrimitive } from '../primitive/RingPrimitive';
import { Circle } from '../math/Circle';

/**
 * 是否相交
 * @param {*} t
 * @param {*} r
 * @return {*}
 */
function isIntersect(bounds, r) {
  for (var i = 0; i < bounds.length; i++) {
    var o = bounds[i];
    if (Cesium.BoundingRectangle.intersect(o, r) == Cesium.Intersect.INTERSECTING)
      return true;
  }
  return false;
}

export class RangeMesh {
  constructor(options) {
    const { radiusArr = [], colorArr = [], center, viewer } = options;
    this._viewer = viewer;
    this.labels = [];

    for (let i = 0; i < radiusArr.length - 1; i++) {
      console.error(123);

      const innerRadius = radiusArr[i]
      const outerRadius = radiusArr[i + 1]
      const color = colorArr[i];

      new RingPrimitive({
        color,
        innerRadius,
        outerRadius,
        center,
        viewer,
      });
      this.addLabel(center, outerRadius + "米", outerRadius)
    }

    this.updateLabel = this.updateLabel.bind(this)
  }

  updateLabel() {
    const scene = this._viewer.scene;
    const r = scene.mapProjection.ellipsoid;
    const i = scene.camera.positionWC;
    const n = new Cesium.EllipsoidalOccluder(r, i);
    const labelCollection = this._viewer.dataSourceDisplay._defaultDataSource._visualizers[2]._cluster

    var l = [];

    for (let i = 0; i < this.labels.length; i++) {
      const entity = this.labels[i];
      const label = labelCollection.getLabel(entity)

      var pos = label.computeScreenSpacePosition(scene);
      const bound = Cesium.Label.getScreenSpaceBoundingBox(
        label,
        pos,
        new Cesium.BoundingRectangle()
      );
      const cartesian2 = new Cesium.Cartesian2();
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, entity.position._value, cartesian2);

      const dom = document.querySelector(`.test${i+1}`);
      // dom.style.width = bound.width + "px"
      // dom.style.height = bound.height + "px"
      dom.style.top = cartesian2.y - bound.height / 2  + "px"
      dom.style.left = cartesian2.x - bound.width / 2 + "px"


      if (isIntersect(l, bound)) {
        entity.show = false;
      } else {
        entity.show = true;
        l.push(Cesium.BoundingRectangle.clone(bound));
      }
    }
  }

  addLabel(center, text, outerRadius) {
    const centerRadians = Cesium.Cartographic.fromCartesian(center);
    const labelDegrees = Circle.getCirclePoint(
      Cesium.Math.toDegrees(centerRadians.longitude),
      Cesium.Math.toDegrees(centerRadians.latitude),
      90,
      outerRadius
    );
    const position = Cesium.Cartesian3.fromDegrees(
      labelDegrees[0],
      labelDegrees[1],
      10);

    const label = this._viewer.entities.add({
      position,
      label: {
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        text,
        scale: 0.5,
        font: '34px Helvetica',
        pixelOffset: new Cesium.Cartesian2(0, 0),
        eyeOffset: new Cesium.Cartesian3(0, 0, -100),
        fillColor: Cesium.Color.WHITE,        //字体颜色
        style: Cesium.LabelStyle.FILL,        //label样式
        outlineWidth: 2,
        showBackground: true,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 50000),
      }
    });

    this.labels.push(label);
  }
}
