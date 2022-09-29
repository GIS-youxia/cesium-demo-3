import { VertiicalFlowLinePrimitive } from './VertiicalFlowLinePrimitive'
import { setCamera } from '../../tool/camera';
import { addPoint } from '../../tool/tool';
import * as Cesium from 'cesium';

function generatePosition(baseLng, baseLat, num, isAdd) {
  let list = []
  for (let i = 0; i < num; i++) {
    let lng = baseLng + Math.random() * 0.04 * (isAdd ? 1 : -1)
    let lat = baseLat + Math.random() * 0.04 * (isAdd ? 1 : -1)
    list.push({ lng, lat })
  }
  return list
}

export class FlowLine {

  constructor(viewer) {
    setCamera(viewer, "beiJing", 10000)
    const baseLng = 116.4715397068917;
    const baseLat = 39.9945712104195;
    let positions = generatePosition(baseLng, baseLat, 500, true)
    positions = positions.concat(generatePosition(baseLng, baseLat, 500, false));

    positions.forEach(item => {
      let start = Cesium.Cartesian3.fromDegrees(item.lng, item.lat, 0);
      let end = start.clone()
      end.z += 10000 * Math.random()

      let line = new VertiicalFlowLinePrimitive([start, end], 5)
      line.setStyle({
        speed: 2 * Math.random(),
        color: Cesium.Color.fromCssColorString("rgb(255,0,0)"),
        percent: 0.01,
        gradient: 0.01
      })
      // addPoint(viewer, end)
      viewer.scene.primitives.add(line.primitive)
    })

  }
}
