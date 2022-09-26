import * as Cesium from 'cesium';

export class Tile {
  constructor(viewer) {
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: "./res/tileset.json",
      })
    );


    tileset.readyPromise.then(function (tileset) {
      viewer.zoomTo(tileset)
    });
    window.tileset = tileset;

    tileset.tileVisible.addEventListener(function (tile) {
      if (tile.content instanceof Cesium.Model3DTileContent) {
        console.log('A 3D model tile is visible.');
      }
    });
  }
}
