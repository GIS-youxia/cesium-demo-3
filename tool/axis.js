import * as Cesium from '../CesiumUnminified';
import { getCylinderEntity } from './entity'
import { getCylinderPrimitive } from './primitive'

export function addAxis3(viewer) {

  // const distance = 9000 * 1000;

  // const arrPoints = [
  //   {
  //     start: new Cesium.Cartesian3(0, 1, 0),
  //     end: new Cesium.Cartesian3(0, distance, 0),
  //     color: Cesium.Color.GREEN,
  //     name: "Y axes"
  //   }, {
  //     start: new Cesium.Cartesian3(1, 0, 0),
  //     end: new Cesium.Cartesian3(distance, 0, 0),
  //     color: Cesium.Color.RED,
  //     name: "X axes"
  //   }, {
  //     start: new Cesium.Cartesian3(0, 0, 1),
  //     end: new Cesium.Cartesian3(0, 0, distance),
  //     color: Cesium.Color.BLUE,
  //     name: "Z axes"
  //   }
  // ]

  // for (let i = 0; i < arrPoints.length; i++) {
  //   const item = arrPoints[i]
  //   viewer.entities.add({
  //     name: item.name,
  //     polyline: {
  //       positions: [item.start, item.end],
  //       width: 10,
  //       arcType: Cesium.ArcType.NONE,
  //       material: new Cesium.PolylineArrowMaterialProperty(item.color)
  //     }
  //   })
  // }

  // const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
  //   position,
  //   hprRollZero,
  //   Cesium.Ellipsoid.WGS84,
  //   converter
  // );
  // viewer.scene.primitives.add(
  //   new Cesium.DebugModelMatrixPrimitive({
  //     modelMatrix: modelMatrix,
  //     length: 300.0,
  //     width: 10.0,
  //   })
  // );

  var primitives = viewer.scene.primitives;
  var ellipsoid = viewer.scene.globe.ellipsoid;


  var length = 400000.0;
  // 将(经度, 纬度, 高度) 转换为笛卡尔表示,高度是贴着地面
  var positionEllipsoid = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-105.0, 40.0));

  //Create Geometry
  var coneGeometry = new Cesium.CylinderGeometry({
    length: length,
    topRadius: 0.0,
    bottomRadius: 200000.0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  });


  //Create Geometry Instance
  var coneGeometryInstance = new Cesium.GeometryInstance({
    id: 'RedCone',
    geometry: coneGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
    }
  });


  //Add geometry to scene
  var primitive;
  primitives.add(primitive = new Cesium.Primitive({
    geometryInstances: coneGeometryInstance,
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: true,
      translucent: false
    })
  }));

  const axis = new AxisByPrimitive(viewer, primitive )
  window.axis = axis;

  var counter = 90;
  setInterval(function () {

    if (counter >= 360) {
      counter = 0;
    }
    var angleRad = 3.14 * counter / 180;
    var rotMatrix = new Cesium.Matrix3.fromRotationY(angleRad);
    var modelMatrix = Cesium.Matrix4.multiply(
      Cesium.Transforms.eastNorthUpToFixedFrame(positionEllipsoid),
      Cesium.Matrix4.fromRotationTranslation(rotMatrix, new Cesium.Cartesian3(0.0, 0.0, length * 0.5)),
      new Cesium.Matrix4());
    primitive.modelMatrix = modelMatrix;
    axis.update()

    counter += 5;

  }, 100);
}

// export function addAxisByPosition(viewer, position) {
//   const hprRollZero = new Cesium.HeadingPitchRoll();
//   const converter = Cesium.Transforms.eastNorthUpToFixedFrame;
//   const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
//     position,
//     hprRollZero,
//     Cesium.Ellipsoid.WGS84,
//     converter
//   );

//   viewer.scene.primitives.add(
//     new Cesium.DebugModelMatrixPrimitive({
//       modelMatrix: modelMatrix,
//       length: 30000.0,
//       width: 1000.0,
//     })
//   );
// }


/**
 * 添加地球的坐标轴
 * @param {*} viewer
 */
export function addAxisGlobe(viewer) {
  const width = 40000;
  const length = 6000*500;

  const lineX = getCylinderEntity({
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    length,
    topRadius: width,
    bottomRadius: width,
    color: '#ff0000',
    position: new Cesium.Cartesian3(1, 0, 0)
  })
  viewer.entities.add(lineX)

  const lineY = getCylinderEntity({
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    length,
    topRadius: width,
    bottomRadius: width,
    color: '#00ff00',
    position: new Cesium.Cartesian3(0, 1, 0)
  })
  viewer.entities.add(lineY)

  const lineZ = getCylinderEntity({
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    length,
    topRadius: width,
    bottomRadius: width,
    color: '#0000ff',
    position: new Cesium.Cartesian3(0, 0, 1)
  })
  viewer.entities.add(lineZ)
}


/**
 * 绑定在图元的坐标轴
 * @export
 * @class AxisByPrimitive
 */
export class AxisByPrimitive {
  /**
   * Creates an instance of AxisByPrimitive.
   * @param {*} viewer
   * @param {*} targetPrimitive 目标图元
   * @memberof AxisByPrimitive
   */
  constructor(viewer, targetPrimitive) {
    this.viewer = viewer;
    this.linePrimitives = []
    this.targetPrimitive = targetPrimitive;

    this.init()
  }

  init() {
    const { viewer } = this;
    const length = 2000000;
    const width = 10000;

    const lineInfos = [
      {
        rotMatrix: new Cesium.Matrix3.fromRotationY(90 * Math.PI / 180),
        translate: { x: length / 2, y: 0, z: 0 },
        color: "#ff0000",
      },
      {
        rotMatrix: new Cesium.Matrix3.fromRotationX(90 * Math.PI / 180),
        translate: { x: 0, y: length / 2, z: 0 },
        color: "#00ff00",
      },
      {
        rotMatrix: new Cesium.Matrix3.fromRotationZ(90 * Math.PI / 180),
        translate: { x: 0, y: 0, z: length / 2 },
        color: "#0000ff",
      },
    ]

    for (let i = 0; i < lineInfos.length; i++) {
      const lineInfo = lineInfos[i];
      const { rotMatrix, translate, color } = lineInfo;

      const modelMatrix = Cesium.Matrix4.multiply(
        Cesium.Matrix4.IDENTITY,
        Cesium.Matrix4.fromRotationTranslation(rotMatrix, new Cesium.Cartesian3(translate.x, translate.y, translate.z)),
        new Cesium.Matrix4());

      const linePrimitive = getCylinderPrimitive({
        topRadius: width,
        bottomRadius: width,
        length,
        modelMatrix,
        color
      })
      this.linePrimitives.push(linePrimitive)
      viewer.scene.primitives.add(linePrimitive)
    }
  }

  update() {
    const modelMatrixTarget = this.targetPrimitive.modelMatrix;
    const translate = new Cesium.Cartesian3()
    Cesium.Matrix4.getTranslation(modelMatrixTarget, translate)

    for (let i = 0; i < this.linePrimitives.length; i++){
      const line = this.linePrimitives[i];

      const rotation = new Cesium.Cartesian3()
      Cesium.Matrix4.getRotation(line.modelMatrix, rotation)

      Cesium.Matrix4.multiply(
        Cesium.Matrix4.IDENTITY,
        Cesium.Matrix4.fromRotationTranslation(rotation, new Cesium.Cartesian3(translate.x, translate.y, translate.z)),
        line.modelMatrix);
    }
  }
}
