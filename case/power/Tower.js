import * as Cesium from 'cesium';
import { AxisByObject } from '../../webgis-src/mesh/axis'

// 塔
export class Tower {
  constructor(viewer, position, angle) {
    this.viewer = viewer;
    this.models = [];
    this.position = position;
    this.updateAngle(angle);
    this.addModel();
  }

  updateAngle(angle) {
    this.angle = angle;
    const euler = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(angle-90), 0, 0)
    this.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.position, euler)
  }

  addModel() {
    const entity = this.viewer.entities.add({
      position: this.position,
      orientation: this.orientation,
      name: "",
      model: {
        uri: './res/glb/electric_pole.glb',
        colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
        color: Cesium.Color.WHITE,
        scale: 50,
      }
    });
    // const axis = new AxisByObject(this.viewer, entity, 0.00002)
    // axis.floow = true;
    // axis.update()
    this.models.push(entity);
  }

  getLinkedPositions(){
    const { angle, position } = this;

    const a = new Cesium.Cartesian3(-0.025005, -7.0, 46.0);
    const a1 = this.getPositionByOffsetAndAngle(position, a, angle);

    const b = new Cesium.Cartesian3(-0.024999, 7.0, 45.0);
    const b1 = this.getPositionByOffsetAndAngle(position, b, angle);
    return [a1, b1]
  }

  getPositionByOffsetAndAngle(position, offseCartesian3, angle) {
    var transormMatrix = Cesium['Transforms']['eastNorthUpToFixedFrame'](position);
    var transformOffset = Cesium['Matrix4']['multiplyByTranslation'](transormMatrix, offseCartesian3, new Cesium[('Matrix4')]());

    var offsetPosition = Cesium['Matrix4']['getTranslation'](transformOffset, new Cesium['Cartesian3']());
    transformOffset = Cesium['Matrix4']['inverse'](transormMatrix, new Cesium['Cartesian4']())
    transformOffset = Cesium['Matrix4']['multiplyByPoint'](transformOffset, offsetPosition, new Cesium['Cartesian3']())
    angle = Cesium['Matrix3']['fromRotationZ'](Cesium['Math']['toRadians'](-angle))
    transformOffset = Cesium['Matrix3']['multiplyByVector'](angle, transformOffset, new Cesium['Cartesian3']());
    return offsetPosition = Cesium['Matrix4']['multiplyByPoint'](transormMatrix, transformOffset, new Cesium['Cartesian3']());
  }
}
