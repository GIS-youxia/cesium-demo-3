import * as Cesium from 'cesium';
import S3MTilesLayer from './S3MTiles/S3MTilesLayer.js';

export class S3MDemo {
  constructor(viewer) {
    let scene = viewer.scene;
    let layer = new S3MTilesLayer({
      context: scene._context,
      url: './res/CBD/cbd.scp'
    });

    scene.primitives.add(layer);

    layer.readyPromise.then(function () {
      scene.camera.setView({
        destination: new Cesium.Cartesian3(-2182500.890329965, 4385313.17843029, 4072700.8241634783),
        orientation: {
          heading: 3.1756648661534443,
          pitch: -0.5
        }
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
}
