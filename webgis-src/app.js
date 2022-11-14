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
import { cusotom, addPlanePrimitive, addRingPrimitive } from './demo/primitive/cuostom'
import { groundSkybox } from './demo/primitive/groundSkybox';
import { RingPrimitive } from './primitive/RingPrimitive';

addRingPrimitive(viewer)


// getClickPoint({ viewer: viewer })
// window.demo = new ObjectEffectDemo(viewer);
// cusotom(viewer)
// groundSkybox(viewer)
// new EntityDemo(viewer)
// new ConeGlowDemo(viewer)
