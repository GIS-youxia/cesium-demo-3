import * as Cesium from 'cesium';

export function onMouseWheel(viewer, cb) {
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(movement => {
    cb(movement)
   }, Cesium.ScreenSpaceEventType.WHEEL)
}
