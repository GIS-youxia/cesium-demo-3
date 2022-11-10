import * as Cesium from 'cesium'
import { getRotationMatrixByHeadingPitchRoll } from '../math/math';

var a = {
  "dimensions": { "x": 100, "y": 100, "z": 100 },
  "color": "#3388ff",
  "closed": true,
  "materialType": "Color"
}

export class BoxPrimitive {

  constructor(options) {
    const { color, dimensions, position, heading, pitch, roll } = options;
    this._hpr = new Cesium.HeadingPitchRoll(heading || 0, pitch || 0, roll || 0);
    this._position = position || new Cesium.Cartesian3();
    this._dimensions = dimensions || { x: 100, y: 100, z: 100 };
    this._color = color || "#ff0000";
    this.primitive = this._createPrimite();
  }

  _getModelMatrix() {
    const rotMatrix = getRotationMatrixByHeadingPitchRoll(this._hpr)
    return Cesium.Matrix4.multiply(
      Cesium.Matrix4.IDENTITY,
      Cesium.Matrix4.fromRotationTranslation(rotMatrix, this._position),
      new Cesium.Matrix4());
  }

  _createGeometryInstance() {
    const cesiumColor = Cesium.Color.fromCssColorString(this._color);

    return new Cesium.GeometryInstance({
      geometry: Cesium.BoxGeometry.fromDimensions({
        dimensions: this._dimensions,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      }),
      modelMatrix: this._getModelMatrix(),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor),
      },
    })
  }

  _createPrimite() {
    return new Cesium.Primitive({
      geometryInstances: this._createGeometryInstance(),
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
        translucent: false
      }),
      modelMatrix: Cesium.Matrix4.IDENTITY,
    });
  }
}
