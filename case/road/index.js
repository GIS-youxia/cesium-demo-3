import RoadNetwork from '../../src/lines/RoadNetwork'
import Primitives from '../../src/Primitive'
import { setCamera } from '../../tool/camera';

export class Road {
  constructor(viewer) {
    const primitives = new Primitives(viewer)
    primitives.init();

    // 公路效果
    const GRoadNetwork = new RoadNetwork(viewer, 'road')
    GRoadNetwork.init()

    setCamera(viewer, "beiJing", 10000)
  }
}
