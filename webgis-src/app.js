import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()
addGaode(viewer,"elec")
modifyMap(viewer, {
  invertColor: true, // 反向颜色 color.r = 1.0 - color.r
  brightness: 0.6,
  contrast: 1.8,
  gamma: 0.3,
  hue: 1,
  saturation: 0,
  filterRGB: [78, 112, 166],
  // filterRGB: [0, 100, 200],
});

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
