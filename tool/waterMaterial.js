import * as Cesium from 'cesium';
const glsl = require("./waterMaterialShader.glsl");

const waterMaterial = {
  waters: [],
  //水正常扰动的法线图
  normalMapUrl: './res/pic/waterNormals.jpg',
  //自定义区域的动态水效果,使用方法： geometryInstance 用于限定动态水域的范围
  apply: function (viewer, geometryInstance, waterParam = {}) {
    const color = waterParam.color || "#006ab4";
    var water = viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances: geometryInstance,
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        aboveGround: false,
        material: new Cesium.Material({
          fabric: {
            type: 'Water',
            uniforms: {
              normalMap: this.normalMapUrl,//水正常扰动的法线图。
              frequency: waterParam.frequency || 1000.0,     //控制波数的数字。
              animationSpeed: waterParam.animationSpeed || 0.01,   //控制水的动画速度的数字。
              amplitude: waterParam.amplitude || 5.0,         //控制水波振幅的数字。
              specularIntensity: waterParam.specularIntensity || 0.5,  //控制镜面反射强度的数字。
              baseWaterColor: new Cesium.Color.fromCssColorString(color), //rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
              blendColor: new Cesium.Color.fromCssColorString("#00baff")      //从水中混合到非水域时使用的rgba颜色对象。
            }
          }
        }),
        fragmentShaderSource: glsl
      }),
      show: true
    }));
    this.waters.push(water);

    return water;
  },
  //移除动态水效果, 使用方法：
  remove: function (water) {
    viewer.scene.primitives.remove(water);
  },
  removeAll: function (viewer) {
    for (var i = 0; i < this.waters.length; i++) {
      viewer.scene.primitives.remove(this.waters[i]);
    }
    this.waters = [];
  },
};

export { waterMaterial };
