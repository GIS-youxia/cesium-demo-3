import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()

// import { AxesDemo } from './demo/tool/AxesDemo';
// import { EntityDemo } from './demo/entity/EntityDemo';
import { RoadLineDemo } from './demo/entity/RoadLineDemo'
// import { ConeGlowDemo } from './demo/primitive/ConeGlowDemo'
// import { UseDemo } from './demo/UseDemo'
// import { getClickPoint } from './misc';
import { BloomTargetDemo } from './demo/effect/BloomTargetDemo'

// getClickPoint({ viewer: viewer })
window.demo = new BloomTargetDemo(viewer);
