import * as Cesium from 'cesium'
import { GroundSkyBox } from '../../primitive/GroundSkyBox'

export function groundSkybox(viewer) {
  // 自定义的近地天空盒
  let groundSkybox = new GroundSkyBox({
    sources: {
      positiveX: "./res/pic/skybox/right.png",
      negativeX: "./res/pic/skybox/left.png",
      positiveY: "./res/pic/skybox/front.png",
      negativeY: "./res/pic/skybox/back.png",
      positiveZ: "./res/pic/skybox/top.png",
      negativeZ: "./res/pic/skybox/bottom.png"
    }
  })

  // 自带的默认天空盒
  let defaultSkybox = viewer.scene.skyBox;

  // 渲染前监听并判断相机位置
  viewer.scene.preUpdate.addEventListener(() => {
    let position = viewer.scene.camera.position;
    let cameraHeight = Cesium.Cartographic.fromCartesian(position).height;
    if (cameraHeight < 240000) {
      viewer.scene.skyBox = groundSkybox;
      viewer.scene.skyAtmosphere.show = false;
    } else {
      viewer.scene.skyBox = defaultSkybox;
      viewer.scene.skyAtmosphere.show = true;
    }
  })

  const camera = { lat: 31.830035, lng: 117.159801, alt: 409, heading: 41, pitch: 0 }
  const pos = Cesium.Cartesian3.fromDegrees(camera.lng, camera.lat, camera.alt);
  viewer.scene.camera.flyTo({
    destination: pos,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: 0,
    }
  })
}
