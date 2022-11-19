import { addCSS } from "../../tool/helper"
import { addArcgis } from "../../tool/provider"
import { AnimatePoint } from "./CircleDom"
import * as Cesium from 'cesium'

addCSS("./case/dom/style.css")

export class Demo {
  constructor(viewer) {
    this.viewer = viewer
    this.addPoints()
    this.setView()
    addArcgis(viewer)
  }

  addPoints() {
    const colorArr = [
      "red",
      "yellow",
      "#00FFFF",
      "#FF4500",
      "#00FF7F",
      "yellow",
      "#00FFFF",
      "#FF4500",
      "yellow",
      "#00FFFF",
      "#FF4500",
      "#00FF7F",
      "#FF4500",
      "#00FF7F",
      "yellow",
      "#00FFFF",
      "#FF4500",
      "#00FF7F",
      "yellow",
      "#00FFFF",
      "#FF4500",
      "#00FF7F",
    ];

    const positionArr = [
      [118.76863731647465, 32.03512097607778, 0],
      [118.76817494128984, 32.02447122547427, 0],
      [118.7783698438655, 32.02845897724873, 0],
      [118.77537994415184, 32.026152656792725, 0],
      [118.77157318440851, 32.03289317935821, 0],
      [118.74890759423654, 32.03109579387391, 0],
      [118.74516535605585, 32.02297946549816, 0],
      [118.73336093648511, 32.02161115341518, 0],
      [118.73117914409475, 32.01350821591852, 0],
      [118.78266510838394, 32.01831322479276, 0],
      [118.79353366300343, 32.023114467024165, 0],
      [118.78674179849942, 32.03585783780932, 0],
      [118.77835389975753, 32.03802694033225, 0],
      [118.80180818469674, 32.03760642445973, 0],
      [118.81364240159637, 32.030921407616816, 0],
      [118.81102034053832, 32.024024544610924, 0],
      [118.80179202106636, 32.01780203241805, 0],
      [118.7559465612049, 32.005536508638755, 0],
      [118.7708646422748, 32.0017003568487, 0],
      [118.76245708549108, 31.99956230965992, 0],
      [118.79996374814571, 32.00261248185542, 0],
      [118.80085407482976, 32.0095036050158, 0],
    ]

    for (let i = 0; i < positionArr.length; i++) {
      // 创建动态效果点
      new AnimatePoint({
        viewer: viewer,
        // 位置
        position: positionArr[i],
        // 颜色
        color: colorArr[i],
        // 显示范围
        distanceDisplayCondition: new Cesium.Cartesian2(0, 2000)
      })
    }
  }

    setView() {
      let flyToOpts = {
        destination: {
          x: -2612268.519915958,
          y: 4754544.512538789,
          z: 3361850.637509779
        },
        orientation: {
          heading: 6.148772085654742,
          pitch: -0.8711563955617541,
          roll: 6.282556257303222
        },
        duration: 1
      };
      this.viewer.scene.camera.flyTo(flyToOpts);
    }
  }
