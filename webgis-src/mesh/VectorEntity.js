import * as Cesium from 'cesium';

export class VectorEntity{

  /**
   * @param {*} options
   * @param { Cesium.Viewer } options.viewer
   * @param { Cesium.Cartesian3 } options.direction
   * @param { Cesium.Cartesian3 } options.position
   * @param { number } options.scale 默认 1
   * @param { number } options.width 默认 10
   * @param { string } options.color 默认 "#FF0000"
   * @param { boolean } options.show 默认 true
   */
  constructor(options) {
    const { viewer, direction, position } = options;
    const color = options.color !== undefined ? options.color : "#ff0000";
    const scale = options.width !== undefined ? options.scale : 1;
    const width = options.width !== undefined ? options.width : 10;
    const show = options.show !== undefined ? options.show : true;

    const translation = Cesium.Matrix4.fromTranslation(position, new Cesium.Matrix4());
    const positions = [
      new Cesium.Cartesian3(0, 0, 0),
      direction
    ];

    positions[1] = Cesium.Cartesian3.multiplyByScalar(positions[1], scale, positions[1])
    positions.forEach(point => {
      point = Cesium.Matrix4.multiplyByPoint(translation, point, point)
    })

    this.entity = viewer.entities.add({
      // name: 'vector',
      polyline: {
        positions,
        width,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(color)),
        depthFailMaterial: new Cesium.PolylineArrowMaterialProperty(new Cesium.Color(1.0, 0, 0, 0.2))
      }
    });

    this._show = show;
    this.entity.show = show;
  }

  get show() {
    return this._show;
  }

  set show(v) {
    this._show = v;
    this.entity.show = v;
  }
}
