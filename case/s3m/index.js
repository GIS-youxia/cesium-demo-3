import * as Cesium from 'cesium';
import S3MTilesLayer from './S3MTiles/S3MTilesLayer.js';

export class S3MDemo {
  constructor(viewer) {
    let scene = viewer.scene;
    let layer = new S3MTilesLayer({
      context: scene._context,
      url: './res/CBD/cbd.scp'
      // url: "http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace/scenes/CBD.json"
    });

    scene.primitives.add(layer);

    layer.readyPromise.then(function () {
      viewer.flyTo(layer);
      // console.error(layer);
      scene.camera.setView({
        destination: new Cesium.Cartesian3(-2181968.890329965, 4385313.17843029, 4072712.8241634783),
        orientation: {
          heading: 3.1756648661534443,
          pitch: -0.3715184468182904
        }
      });
      // scene.camera.setView({
      //   destination: new Cesium.Cartesian3(-1583124.0816723537, 5317591.742892992, 3150766.314206999),
      //   orientation: {
      //     heading: 3.289678270609447,
      //     pitch: -0.5949627316377812,
      //     roll: 6.28317031625836
      //   }
      // });
    }).catch(function (error) {
      console.log(error);
    });
  }
}
