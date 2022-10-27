import * as Cesium from 'cesium';
import { getViewer } from './user/viewer';

const viewer = getViewer()

import { AxesDemo } from './demo/tool/AxesDemo';
import { DrawDemo } from './demo/draw/Draw'

window.demo = new DrawDemo(viewer);
