import * as Cesium from '../CesiumUnminified';


export function addAxis(viewer) {

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
  // 将提供的制图转换为笛卡尔表示。
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


    counter += 5;

  }, 100);


}
