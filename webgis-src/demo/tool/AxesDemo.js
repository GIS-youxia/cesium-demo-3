import * as Cesium from 'cesium';
import { GUI } from 'dat.gui';
import { CoordinateSystem } from '../../enum/CoordinateSystem';
import { getHeadingPitchRoll, setHeadingPitchRoll, getRotationMatrixByEntity, getDirectionVectorByEntity } from '../../math/math';
import { AxesHelperGlobe } from '../../mesh/AxesHelperGlobe'
import { AxesHelperObject } from '../../mesh/AxesHelperObject';
import { VectorEntity } from '../../mesh/VectorEntity';

export class AxesDemo {
  constructor(viewer) {
    const position = Cesium.Cartesian3.fromDegrees(0, 0.0, 0.0);
    const redPlane = viewer.entities.add(new Cesium.Entity({
      name: "Red plane with black outline",
      position,
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
        dimensions: new Cesium.Cartesian2(4000000.0, 3000000.0),
        material: new Cesium.ImageMaterialProperty({
          image: "./res/pic/text.png"
        })
      },
    }));

    const euler = new Cesium.HeadingPitchRoll(0,0,0)
    redPlane.orientation = Cesium.Transforms.headingPitchRollQuaternion(position, euler)
    window.redPlane = redPlane;
    this.redPlane = redPlane;

    const { heading } = getDirectionVectorByEntity({ target: redPlane })
    new VectorEntity({
      viewer,
      direction: heading,
      position: position,
      scale: 100,
      width: 100
    })
    // 实体坐标轴
    // this.entityAxis = new AxesHelperObject({
    //   viewer,
    //   target: redPlane,
    //   scale: 2
    // } );
    // this.entityAxis.update()

    // 添加地球坐标轴
    this.axisGlobe = new AxesHelperGlobe({viewer,show:false})

    // 初始化UI
    // this.initGui()
  }

  initGui() {
    // 模型坐标轴
    let controls = {
      '可见': this.entityAxis.show,
      "坐标系": this.entityAxis.coordinateSystem,
      '跟随': this.entityAxis.floow
    }
    const gui = new GUI()
    const axis = gui.addFolder("实体坐标轴")
    axis.open();
    axis.add(controls, '可见').onChange(value => {
      this.entityAxis.show = value;
    })
    axis.add(controls, '跟随').onChange(value => {
      this.entityAxis.floow = value;
    })
    axis.add(controls, '坐标系', [CoordinateSystem.ECEF, CoordinateSystem.ENU]).onChange(value => {
      this.entityAxis.coordinateSystem = value
    })

    // 地球坐标轴
    let controls2 = {
      '可见': this.axisGlobe.show,
    }
    const axisGlobe = gui.addFolder("大地坐标轴")
    axisGlobe.add(controls2, '可见').onChange(value => {
      this.axisGlobe.show = value;
    })

    const euler = getHeadingPitchRoll(this.redPlane);
    // const position = getPosition(this.redPlane)
    // 实体
    let controls3 = {
      'heading': +Cesium.Math.toDegrees(euler.heading),
      'pitch': +Cesium.Math.toDegrees(euler.pitch),
      'roll': +Cesium.Math.toDegrees(euler.roll),
      // 'x': position.x,
      // 'y': position.y,
      // 'z': position.z,
    }
    const entity = gui.addFolder("实体")
    entity.open();
    entity.add(controls3, 'heading', 0, 360,).step(0.1).onChange(value => {
      setHeadingPitchRoll(this.redPlane, {
        pitch: euler.pitch,
        roll: euler.roll,
        heading: Cesium.Math.toRadians(value)
      });
      this.entityAxis.update()
    })
    entity.add(controls3, 'pitch', 0, 360).step(0.1).onChange(value => {
      setHeadingPitchRoll(this.redPlane, {
        roll: euler.roll,
        heading: euler.heading,
        pitch: Cesium.Math.toRadians(value),
      })
      this.entityAxis.update()
    })
    entity.add(controls3, 'roll', 0, 360).step(0.1).onChange(value => {
      setHeadingPitchRoll(this.redPlane, {
        pitch: euler.pitch,
        heading: euler.heading,
        roll: Cesium.Math.toRadians(value),
      })
      this.entityAxis.update()
    })

    // entity.add(controls3, 'x', -100, 100).step(0.1).onChange(value => {
    //   this.this.axis.update()
    // })
    // entity.add(controls3, 'y', -100, 100).step(0.1).onChange(value => {
    //   this.this.axis.update()
    // })
    // entity.add(controls3, 'z', -100, 100).step(0.1).onChange(value => {
    //   this.this.axis.update()
    // })
  }
}
