import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()

import { AxesDemo } from './demo/tool/AxesDemo';

window.demo = new AxesDemo(viewer);
