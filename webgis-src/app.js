import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()
// addGaode(viewer,"elec")
// modifyMap(viewer, {
//     //反色?
//     invertColor: false,
//     //滤镜值
//     filterRGB: [60, 145, 172],
// });

// import { AxesDemo } from './demo/tool/AxesDemo';
import { EntityDemo } from './demo/entity/EntityDemo';
import { RoadLineDemo } from './demo/entity/RoadLineDemo'
import { ConeGlowDemo } from './demo/primitive/ConeGlowDemo'
// import { UseDemo } from './demo/UseDemo'
// import { getClickPoint } from './misc';
// import { ObjectEffectDemo } from './demo/effect/ObjectEffectDemo'
import { cusotom, addPlanePrimitive, addRingPrimitive } from './demo/primitive/cuostom'
import { groundSkybox } from './demo/primitive/groundSkybox';
import { RingPrimitive } from './primitive/RingPrimitive';
import { addRangeMesh } from './demo/mesh';
import { getClickPointAdd } from '../tool/tool';
import { modifyMap } from '../tool/filterColor';
import { addGaode } from '../tool/provider';

addPlanePrimitive(viewer);
// addRingPrimitive(viewer)
// getClickPointAdd(viewer)

// getClickPoint({ viewer: viewer })
// window.demo = new ObjectEffectDemo(viewer);
// cusotom(viewer)
// groundSkybox(viewer)
// new EntityDemo(viewer)
// new ConeGlowDemo(viewer)
