import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()

import { AxesDemo } from './demo/tool/AxesDemo';
import { EntityDemo } from './demo/entity/EntityDemo';

window.demo = new EntityDemo(viewer);
