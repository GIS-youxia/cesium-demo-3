import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()

import { AxesDemo } from './demo/tool/AxesDemo';
import { EntityDemo } from './demo/entity/EntityDemo';
import { RoadLineDemo } from './demo/entity/RoadLineDemo'

window.demo = new RoadLineDemo(viewer);
