import * as Cesium from 'cesium';

/**
 * 添加地球的坐标轴,ECEF
 * @param { Object } options
 * @param { Cesium.Viewer } options.viewer
 * @param { boolean } options.show 默认true
 */
export class AxesHelperGlobe {
  constructor(options) {
    this._show = options.show !== undefined ? options.show : true;

    this._lines = [];
    this._addLine(options.viewer);
  }

  get show() {
    return this._show;
  }

  /**
   * @param {boolean} 显示
   */
  set show(v) {
    if (this._show === v) return;

    this._show = v;
    this._lines.forEach(line => {
      line.show = v;
    })
  }

  _addLine(viewer) {
    const xAxis = viewer.entities.add({
      name: 'X axis',
      polyline: {
        positions: [new Cesium.Cartesian3(0.000001, 0, 0), new Cesium.Cartesian3(10000000, 0, 0)],
        width: 10,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED),
        depthFailMaterial: new Cesium.PolylineArrowMaterialProperty(new Cesium.Color(1.0, 0, 0, 0.2))
      }
    });

    const yAxis = viewer.entities.add({
      name: 'Y axis',
      polyline: {
        positions: [new Cesium.Cartesian3(0, 0.000001, 0), new Cesium.Cartesian3(0, 10000000, 0)],
        width: 10,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GREEN),
        depthFailMaterial: new Cesium.PolylineArrowMaterialProperty(new Cesium.Color(0, 1, 0, 0.2))
      }
    });

    const zAxis = viewer.entities.add({
      name: 'Z axis',
      polyline: {
        positions: [new Cesium.Cartesian3(0, 0, 0.000001), new Cesium.Cartesian3(0, 0, 10000000)],
        width: 10,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.BLUE),
        depthFailMaterial: new Cesium.PolylineArrowMaterialProperty(new Cesium.Color(0, 0, 1, 0.2))
      }
    });

    xAxis.show = this._show;
    yAxis.show = this._show;
    zAxis.show = this._show;
    this._lines.push(xAxis, yAxis, zAxis);
  }
}
