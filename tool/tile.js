import * as Cesium from '../CesiumUnminified';

const info = {
  "code": 1,
  "msg": "",
  "time": "1663565656",
  "data": [
    {
      "id": 4,
      "name": "深圳南山区大街道",
      "url": "https:\/\/mapv-data.oss-cn-hangzhou.aliyuncs.com\/titleset\/sz_ns2\/tileset.json",
      "offset_x": 0,
      "offset_y": 0,
      "offset_z": 0,
      "onswitch": 1,
      "flytoswitch": 1,
      "color": "rgba(255, 255, 255, 1)",
      "effectswitch": 1,
      "height": 260,
      "effect_color": "#df16f1",
      "createtime": 1626347087,
      "updatetime": 1637372783
    }
  ]
}


export function addOne3dTitleset(viewer) {
  const tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: info.data[0].url,
    shadows: 4,
    maximumScreenSpaceError: 1,
    maximumNumberOfLoadedTiles: 1e3
  }));

  tile.readyPromise.then( a=> {
    // i.update3dtilesMaxtrix(a, e),
    viewer.zoomTo(a);
    a.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [["true", "color('".concat(info.color, "')")]]
      }
    })
    // (1 === e.effectswitch || n) && i.makeEffect(a, e, t, n)
  });
}


export function addOne3dTitleset2(viewer) {
  // var t = "https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"
  //   , n = new Cesium.Cesium3DTileset({
  //     url: t
  //   });
  // var modalPrimitives = viewer.scene.primitives.add(n);
    // viewer.scene.camera.setView({
    //   destination: {
    //     x: -2395783.5309640486,
    //     y: 5392694.777928539,
    //     z: 2424816.601754499
    //   },
    //   orientation: {
    //     heading: .42631000693466764,
    //     pitch: -.8022459306450823,
    //     roll: .4179249271708612
    //   },
    //   duration: 1
    // })
}
