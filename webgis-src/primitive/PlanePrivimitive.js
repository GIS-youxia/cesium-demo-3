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
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });
    const planeGeometry = Cesium.PlaneGeometry.createGeometry(plane)

    var planeGeometryInstance = new Cesium.GeometryInstance({
      geometry: planeGeometry,
      modelMatrix: planeModelMatrix,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 0.0, 0.0, 0.5))
      }
    });

    var primitive = new Cesium.Primitive({
      geometryInstances: planeGeometryInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
      }),
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
