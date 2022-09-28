export class Radar {
  constructor(viewer) {

    // 1 雷达位置计算
    // 1.1 雷达的高度
    var length = 400000.0;
    // 1.2 地面位置(垂直地面)
    var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(116.39, 39.9);
    // 1.3 中心位置
    var centerOnEllipsoid = Cesium.Cartesian3.fromDegrees(116.39, 39.9, length * 0.5);
    // 1.4 顶部位置(卫星位置)
    var topOnEllipsoid = Cesium.Cartesian3.fromDegrees(116.39, 39.9, length);
    // 1.5 矩阵计算
    var modelMatrix = Cesium.Matrix4.multiplyByTranslation(
      Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid),
      new Cesium.Cartesian3(0.0, 0.0, length * 0.5), new Cesium.Matrix4()
    );

    // 2 相机飞入特定位置
    viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(centerOnEllipsoid, length));

    // 3 创建卫星
    var billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection());
    billboards.add({
      image: './res/pic/radar.svg',
      position: topOnEllipsoid,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(-10, 10),
      scale: 0.3,
    });

    // 4 创建雷达放射波
    // 4.1 先创建Geometry
    var cylinderGeometry = new Cesium.CylinderGeometry({
      length: length,
      topRadius: 0.0,
      bottomRadius: length * 0.5,
      // vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
      vertexFormat: Cesium.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat
    });
    // 4.2 创建GeometryInstance
    var redCone = new Cesium.GeometryInstance({
      geometry: cylinderGeometry,
      modelMatrix: modelMatrix,
      // attributes : {
      // color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
      // }
    });
    // 4.3 创建Primitive
    var radar = viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances: [redCone],
      // appearance : new Cesium.PerInstanceColorAppearance({
      // closed : true,
      // translucent: false
      // })
      appearance: new Cesium.MaterialAppearance({
        // 贴图像纹理
        // material: Cesium.Material.fromType('Image', {
        // image: '../../SampleData/models/CesiumBalloon/CesiumBalloonPrint_singleDot.png'
        // }),

        // 贴棋盘纹理
        // material: Cesium.Material.fromType('Checkerboard'),

        // 自定义纹理
        material: new Cesium.Material({
          fabric: {
            type: 'VtxfShader1',
            uniforms: {
              color: new Cesium.Color(0.2, 1.0, 0.0, 1.0),
              repeat: 30.0,
              offset: 0.0,
              thickness: 0.3,
            },
            source: `
            uniform vec4 color;
            uniform float repeat;
            uniform float offset;
            uniform float thickness;

            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
            czm_material material = czm_getDefaultMaterial(materialInput);
            float sp = 1.0/repeat;
            vec2 st = materialInput.st;
            float dis = distance(st, vec2(0.5));
            float m = mod(dis + offset, sp);
            float a = step(sp*(1.0-thickness), m);

            material.diffuse = color.rgb;
            material.alpha = a * color.a;

            return material;
        }
        `
          },
          translucent: false
        }),
        faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
        closed: true // 是否为封闭体，实际上执行的是是否进行背面裁剪
      }),
    }));

    // 5 动态修改雷达材质中的offset变量，从而实现动态效果。
    viewer.scene.preUpdate.addEventListener(function () {
      var offset = radar.appearance.material.uniforms.offset;
      offset -= 0.001;
      if (offset > 1.0) {
        offset = 0.0;
      }
      radar.appearance.material.uniforms.offset = offset;
    })
  }
}
