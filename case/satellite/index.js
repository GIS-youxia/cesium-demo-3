import satellite from "./lib/satellite.min.js";
import * as Cesium from 'cesium';

export class StatelliteDemo{
  constructor(viewer) {
    const object = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(0, 0,),
      model: {
        uri: "./res/glb/weixin.gltf",
        minimumPixelSize: 128,
        maximumScale: 20000,
      }
    });

    const tleLine1 = '1 25544U 98067A   19156.50900463  .00003075  00000-0  59442-4 0  9992';
    const tleLine2 = '2 25544  51.6433  59.2583 0008217  16.4489 347.6017 15.51174618173442';

    // Initialize a satellite record
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    viewer.clock.multiplier = 1000; // speed of the simulation

    const earthRotation = false;

    // https://stackoverflow.com/questions/64485298/is-there-a-way-to-configure-cesium-entities-to-be-displayed-as-icrf

    const viewInInertial = true;

    function updateCamera(time) {
      const camera = viewer.scene.camera;

      const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);

      if (icrfToFixed) {
        const offset = Cesium.Cartesian3.clone(camera.position);
        const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);

        if (earthRotation) {
          camera.lookAtTransform(transform, offset);
        }
      }
    }

    function onPreRender(scene, time) {
      updateCamera(time);
      updatePosition(time);
    }

    function updatePosition(julianDate) {
      const date = Cesium.JulianDate.toDate(julianDate);

      const positionAndVelocity = satellite.propagate(satrec, date);

      const gmst = satellite.gstime(date);

      const positionEci = positionAndVelocity.position;
      const positionGd = satellite.eciToGeodetic(positionEci, gmst);

      const longitude = positionGd.longitude;
      const latitude = positionGd.latitude;
      const height = positionGd.height;

      const positionInFixed = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(longitude), Cesium.Math.toDegrees(latitude), height);

      if (viewInInertial) {
        const fixedToIcrf = Cesium.Transforms.computeFixedToIcrfMatrix(julianDate);

        let positionInInertial = new Cesium.Cartesian3();

        if (Cesium.defined(fixedToIcrf)) {
          positionInInertial = Cesium.Matrix3.multiplyByVector(fixedToIcrf, positionInFixed, positionInInertial);
        }

        object.position.setValue(positionInInertial);
      } else {
        object.position.setValue(positionInFixed);
      }
    }

    viewer.scene.preRender.addEventListener(onPreRender);  // enable Earth rotation
  }
}
