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
    const labelCollection = this._viewer.dataSourceDisplay._defaultDataSource._visualizers[2]._cluster
    var l = [];
    const cartesian2 = new Cesium.Cartesian2();

    for (let i = 0; i < this.labels.length; i++) {
      const entity = this.labels[i];
      const label = labelCollection.getLabel(entity)
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, entity.position._value, cartesian2);
      const pos = label.computeScreenSpacePosition(scene);
      const bound = Cesium.Label.getScreenSpaceBoundingBox(
        label,
        pos,
        new Cesium.BoundingRectangle()
      );

      if (!entity.ueserData && bound.height !== -Infinity) {
        entity.ueserData = {};
        entity.ueserData.bound = Cesium.BoundingRectangle.clone(bound);
      }

      if (!entity.ueserData) continue;

      // const dom = document.querySelector(`.test${i+1}`);
      // dom.style.width = bound.width + "px"
      // dom.style.height = bound.height + "px"
      // dom.style.top = cartesian2.y - bound.height / 2  + "px"
      // dom.style.left = cartesian2.x - bound.width / 2 + "px"

      entity.ueserData.bound.x = cartesian2.x;
      entity.ueserData.bound.y = cartesian2.y;

      if (isIntersect(l, entity.ueserData.bound)) {
        entity.show = false;
      } else {
        entity.show = true;
        l.push(Cesium.BoundingRectangle.clone(entity.ueserData.bound));
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
      0);

    const label = this._viewer.entities.add({
      position,
      label: {
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        text,
        scale: 0.5,
        font: '700 50px 微软雅黑',
        pixelOffset: new Cesium.Cartesian2(0, 0),
        eyeOffset: new Cesium.Cartesian3(0, 0, -100),
        fillColor: Cesium.Color.WHITE,        //字体颜色
        style: Cesium.LabelStyle.FILL,        //label样式
        outlineWidth: 2,
        outlineColor: Cesium.Color.BLACK,
        showBackground: false,
        // backgroundColor: new Cesium.Color(0,0,0,0.4),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 50000),
      }
    });
    // label

    this.labels.push(label);
  }
}
