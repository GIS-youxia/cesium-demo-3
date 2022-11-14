import * as Cesium from 'cesium'
import { MyPrimitive } from "../../primitive/MyPrimitive";
import { PlanePrimitive } from '../../primitive/PlanePrivimitive';
import { RingPrimitive } from '../../primitive/RingPrimitive';

export function addHelloPrimitive(viewer) {
  viewer.scene.globe.depthTestAgainstTerrain = true;

  var origin = Cesium.Cartesian3.fromDegrees(106, 26, 250000 / 2)
  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin)

  var primitive = new MyPrimitive(modelMatrix);
  viewer.scene.primitives.add(primitive)
}


function fly(viewer, dist) {
  let flyToOpts = {
    destination: dist,
    orientation: {
      heading: 0,
      pitch: -Math.PI / 2,
      roll: 6.283185307179586,
    },
    duration: 0
  };
  viewer.scene.camera.flyTo(flyToOpts);
}

export function addPlanePrimitive(viewer) {
  var origin = Cesium.Cartesian3.fromDegrees(106, 26, 0);
  new PlanePrimitive({
    viewer: viewer,
    position: origin,
    dimensions: new Cesium.Cartesian2(4000000, 3000000)
  });

  fly(viewer, Cesium.Cartesian3.fromDegrees(106, 26, 5000));
}


export function addRingPrimitive(viewer) {
  var origin = Cesium.Cartesian3.fromDegrees(106, 26, 0);
  new RingPrimitive({
    viewer: viewer,
    center: origin,
    innerRadius: 50000,
    outerRadius: 100000,
  });

  fly(viewer, Cesium.Cartesian3.fromDegrees(106, 26, 5000));
}
