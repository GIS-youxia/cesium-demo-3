import * as Cesium from 'cesium'
import { getRotationMatrixByHeadingPitchRoll } from '../math/math';

export class EllipsoidPrimitive {
  constructor(options) {
    const { color, radius, position, heading, pitch, roll } = options;
    this._hpr = new Cesium.HeadingPitchRoll(heading || 0, pitch || 0, roll || 0);
    this._position = position || new Cesium.Cartesian3();
    this._radius = radius || 100;
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
      geometry: new Cesium.EllipseGeometry({
        center: this._position,
        semiMinorAxis: this._radius,
        semiMajorAxis: this._radius,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      }),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(cesiumColor),
      },
    })
  }

  _createPrimite() {
    return new Cesium.Primitive({
      geometryInstances: [this._createGeometryInstance()],
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
        translucent: false
      }),
      modelMatrix: Cesium.Matrix4.IDENTITY,
    });
  }
}
