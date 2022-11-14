import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()

// import { AxesDemo } from './demo/tool/AxesDemo';
import { EntityDemo } from './demo/entity/EntityDemo';
import { RoadLineDemo } from './demo/entity/RoadLineDemo'
import { ConeGlowDemo } from './demo/primitive/ConeGlowDemo'
// import { UseDemo } from './demo/UseDemo'
// import { getClickPoint } from './misc';
// import { ObjectEffectDemo } from './demo/effect/ObjectEffectDemo'
import { cusotom } from './demo/primitive/cuostom'
import { groundSkybox } from './demo/primitive/groundSkybox';
import { RingPrimitive } from './primitive/RingPrimitive';

var origin = Cesium.Cartesian3.fromDegrees(106, 26, 0)
const ring = new RingPrimitive({
  viewer,
  center: origin
})
// // viewer.zoomTo(viewer.entities);
let flyToOpts = {
  destination: Cesium.Cartesian3.fromDegrees(106, 26, 5000),
  orientation: {
    heading: 0,
    pitch: -Math.PI/2,
    roll: 6.283185307179586,
  },
  duration: 0
};
viewer.scene.camera.flyTo(flyToOpts);

// getClickPoint({ viewer: viewer })
// window.demo = new ObjectEffectDemo(viewer);
// cusotom(viewer)
// groundSkybox(viewer)
// new EntityDemo(viewer)
// new ConeGlowDemo(viewer)
// var origin = Cesium.Cartesian3.fromDegrees(106, 26)
// let position1 = Cesium.Cartesian3.fromDegrees(116.0429564025542, 39.86676447095689, 300);
// let position2 = Cesium.Cartesian3.fromDegrees(116.0429564025542, 39.86676447095689, 300);
// let position3 = Cesium.Cartesian3.fromDegrees(116.0429564025542, 39.86676447095689, 300);




// viewer.entities.add({
//   'position': position2,
//   'ellipse': {
//     'heightReference': 1,
//     'semiMinorAxis': 60,
//     'semiMajorAxis': 60,
//     material: Cesium.Color.fromCssColorString("rgba(255,255,0,0.6)"),
//     zIndex: 2
//   }
// })

// viewer.entities.add({
//   'position': position3,
//   'ellipse': {
//     'heightReference': 1,
//     'semiMinorAxis': 30,
//     'semiMajorAxis': 30,
//     material: Cesium.Color.fromCssColorString("rgba(255,0,0,0.6)"),
//     zIndex: 3
//   },
// })

// viewer.entities.add({
//   'position': position1,
//   'ellipse': {
//     'heightReference': 1,
//     'semiMinorAxis': 90,
//     'semiMajorAxis': 90,
//     material: Cesium.Color.fromCssColorString("rgba(0,255,0,0.6)"),
//     zIndex: 1
//   },
// })

