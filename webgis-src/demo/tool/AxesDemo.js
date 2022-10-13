import * as Cesium from 'cesium';
import { GUI } from 'dat.gui';
import { CoordinateSystem } from '../../enum/CoordinateSystem';
import {
  getHeadingPitchRoll,
  setHeadingPitchRoll,
  getDirectionVectorByEntity,
} from '../../math/math';
import { AxesHelperGlobe } from '../../mesh/AxesHelperGlobe'
import { AxesHelperObject } from '../../mesh/AxesHelperObject';
import { VectorMesh } from '../../mesh/VectorMesh';

export class AxesDemo {
  constructor(viewer) {
    const position = Cesium.Cartesian3.fromDegrees(0, 0, 0.0);
    const redPlane = viewer.entities.add(new Cesium.Entity({
      name: "Red plane with black outline",
      position: new Cesium.CallbackProperty(() => {
        return position;
        }, false),
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
        dimensions: new Cesium.Cartesian2(4000000.0, 3000000.0),
        material: new Cesium.ImageMaterialProperty({
          image: "./res/pic/text.png"
        })
      },
    }));

    const euler = new Cesium.HeadingPitchRoll(0, 0, 0)
    const quaternion = Cesium.Transforms.headingPitchRollQuaternion(position, euler);
    redPlane.orientation = new Cesium.CallbackProperty(() => {
      return quaternion;
    }, false)

    window.redPlane = redPlane;
    this.redPlane = redPlane;

    // 实体坐标轴
    this.entityAxis = new AxesHelperObject({
      viewer,
      target: redPlane,
      scale: 2,
      coordinateSystem: CoordinateSystem.ENU
    } );
    this.entityAxis.update()

    // 添加地球坐标轴
    this.axisGlobe = new AxesHelperGlobe({viewer,show:false})

    this.translatePosition = this.translatePosition.bind(this);
    // 初始化UI
    this.initGui()
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

    const that = this;
    // 实体
    const euler = getHeadingPitchRoll(this.redPlane);
    let controls3 = {
      'heading': +Cesium.Math.toDegrees(euler.heading),
      'pitch': +Cesium.Math.toDegrees(euler.pitch),
      'roll': +Cesium.Math.toDegrees(euler.roll),
      '平移X+': function () { that.translatePosition('平移X+') },
      '平移X-': function () { that.translatePosition('平移X-') },
      '平移Y+': function () { that.translatePosition('平移Y+') },
      '平移Y-': function () { that.translatePosition('平移Y-') },
      '平移Z+': function () { that.translatePosition('平移Z+') },
      '平移Z-': function () { that.translatePosition('平移Z-') },
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

    entity.add(controls3, '平移X+');
    entity.add(controls3, '平移X-');
    entity.add(controls3, '平移Y+');
    entity.add(controls3, '平移Y-');
    entity.add(controls3, '平移Z+');
    entity.add(controls3, '平移Z-');
  }

  /**
   * 平移变换
   * @param {*} name
   */
  translatePosition(name) {
    const { heading, pitch, roll } = getDirectionVectorByEntity(
      {
        target: this.redPlane,
        floow: this.entityAxis.floow,
        coordinateSystem: this.entityAxis.coordinateSystem
      })
    let flag = name[name.length - 1] === "+" ? 1 : -1;
    let deriction;
    const offset = 100000;

    if (name.includes("X")) {
      deriction = roll.clone()
    } else if (name.includes("Y")) {
      deriction = pitch.clone()
    } else {
      deriction = heading.clone()
    }
    Cesium.Cartesian3.multiplyByScalar(deriction, offset * flag, deriction);

    const position = this.redPlane.position.getValue(Cesium.JulianDate)
    const newPosition = Cesium.Cartesian3.add(position, deriction, new Cesium.Matrix3())

    this.redPlane.position = new Cesium.CallbackProperty(() => {
      return newPosition;
    }, false)
    this.entityAxis.update()
  }

  // 添加方向向量
  addDircionVector(viewer) {

    const { heading, pitch, roll } = getDirectionVectorByEntity({ target: this.redPlane })
    const position = this.redPlane.position.getValue(Cesium.JulianDate)

    const length = 1000000;
    const width = 80000;
    new VectorMesh({
      viewer,
      position,
      length,
      width,
      direction: roll,
      color: "#ff0000"
    })

    new VectorMesh({
      viewer,
      length,
      width,
      position,
      direction: pitch,
      color: "#00ff00"
    })

    new VectorMesh({
      viewer,
      position,
      length,
      width,
      direction: heading,
      color: "#0000ff",
    })
  }
}
