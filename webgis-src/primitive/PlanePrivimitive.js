import * as Cesium from 'cesium'

export class PlanePrimitive {
  constructor(options) {
    const {
      dimensions = new Cesium.Cartesian2(1000, 1000),
      position,
      viewer,
      outline = true
    } = options;

    this._viewer = viewer;

    var translateMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    var scaleMatrix = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(dimensions.x, dimensions.y, 1));
    var planeModelMatrix = new Cesium.Matrix4();
    Cesium.Matrix4.multiply(translateMatrix, scaleMatrix, planeModelMatrix);

    // 创建平面
    var plane = new Cesium.PlaneGeometry({
      // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      vertexFormat: Cesium.MaterialAppearance.MaterialSupport.BASIC.VERTEX_FORMAT
    });
    const planeGeometry = Cesium.PlaneGeometry.createGeometry(plane)

    var planeGeometryInstance = new Cesium.GeometryInstance({
      geometry: planeGeometry,
      modelMatrix: planeModelMatrix,
      // attributes: {
      //   color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 0.0, 0.0, 0.5))
      // }
    });

    var primitive = new Cesium.Primitive({
      geometryInstances: planeGeometryInstance,
      appearance: new Cesium.MaterialAppearance({
        renderState: {
          depthTest: { enabled: false }, //深度测试
          depthMask: true
        },
        // 自定义纹理
        material: new Cesium.Material({
          fabric: {
            uniforms: {
              colorllll: new Cesium.Color(0.2, 1.0, 0.0, 1.0), //放射颜色
            },
            source: `
                uniform vec4 colorllll;
                czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    material.diffuse = colorllll.rgb;
                    material.alpha = colorllll.a;
                    return material;
                }
            `,
          },
          translucent: true,
        }),
        faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
        closed: true, // 是否为封闭体，实际上执行的是是否进行背面裁剪
      }),
      // appearance: new Cesium.PerInstanceColorAppearance({
      //   closed: true
      // }),
      asynchronous: false,
    });

    this._viewer.scene.primitives.add(primitive)

    if (outline) {
      this._createOutline(planeModelMatrix);
    }

    this.primitive = primitive;
    this.geometry = planeGeometry;
  }

  _createOutline(planeModelMatrix) {
    const scene = this._viewer.scene;

    // 创建平面外轮廓
    var planeOutlineGeometry = new Cesium.PlaneOutlineGeometry({});

    var planeOutlineGeometryInstance = new Cesium.GeometryInstance({
      geometry: planeOutlineGeometry,
      modelMatrix: planeModelMatrix,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 1.0, 1.0, 1.0))
      }
    });

    const primitive = new Cesium.Primitive({
      geometryInstances: planeOutlineGeometryInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        renderState: {
          lineWidth: Math.min(2.0, scene.maximumAliasedLineWidth)
        }
      })
    });

    scene.primitives.add(primitive);
  }
}
