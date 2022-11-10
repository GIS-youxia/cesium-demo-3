import * as Cesium from 'cesium'
import { BloomTargetEffect } from '../../effect/BloomTargetEffect'
import { OutLineEffect } from '../../effect/OutlineEffect';
import { BoxPrimitive } from '../../primitive/BoxPrimitive';
import { EllipsoidPrimitive } from '../../primitive/EllipsoidPrimitive';

export class ObjectEffectDemo {
  constructor(viewer) {
    const bloom = new BloomTargetEffect(viewer)
    const outline = new OutLineEffect(viewer)
    this.effect = outline;

    this.addMesh(viewer)
    this.addMouseOver(viewer)

    viewer.camera.flyTo({
      destination: { "x": -2473994.447849224, "y": 4839441.4421547055, "z": 3328342.424308095 },
      duration: 0,
      orientation: {
        heading: 0.03412961843945439,
        pitch: -Math.PI/4,
        roll: 6.2831850130093905
      }
    });
  }

  addMesh(viewer) {
    const pos = Cesium.Cartesian3.fromDegrees(117.076033, 31.663258, 0.3);
    const boxGreen = new BoxPrimitive({
      position: pos,
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#ff0000"
    })
    viewer.scene.primitives.add(boxGreen.primitive)

    const sphere = new EllipsoidPrimitive({
      position: Cesium.Cartesian3.fromDegrees(117.078423, 31.664305, 30.8),
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#00ffff"
    })
    window.sphere = sphere;
    viewer.scene.primitives.add(sphere.primitive)
  }

  addMouseOver(viewer) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(movement => {
      const pickedObject = viewer.scene.pick(movement.position);
      this.effect.handleClick(pickedObject)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

}
