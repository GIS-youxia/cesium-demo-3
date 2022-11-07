import * as Cesium from 'cesium'

// 裁剪区域
const planClip = {
  positions: [
    [117.22648, 31.827441],
    [117.210341, 31.830612],
    [117.211311, 31.842438],
    [117.226091, 31.842885]
  ],
  clipOutSide: true // 外裁剪
}

export function getInverseMatrix(tile) {
  const center = tile.boundingSphere.center
  const mat = Cesium.Transforms.eastNorthUpToFixedFrame(center)
  return Cesium.Matrix4.inverseTransformation(mat, new Cesium.Matrix4())
}

function createPlaneByLine(mat, start, end) {
  if (Cesium.Cartesian3.distance(start, end) < 0.1) return null;

  const p1 = Cesium.Matrix4.multiplyByPoint(mat, start, new Cesium.Cartesian3())
  const p2 = Cesium.Matrix4.multiplyByPoint(mat, end, new Cesium.Cartesian3())

  const line = Cesium.Cartesian3.subtract(p2, p1, new Cesium.Cartesian3())
  const up = new Cesium.Cartesian3(0x0, 0x0, 0xa)

  let normal = new Cesium.Cartesian3.cross(line, up, new Cesium.Cartesian3())
  normal = new Cesium.Cartesian3.normalize(normal, normal)
  const plane = new Cesium.Plane.fromPointNormal(p1, normal)
  return plane;
}

function getClipPlanes(tile) {
  const positions = []
  for (let i = 0; i < planClip.positions.length; i++) {
    const item = planClip.positions[i];
    positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
  }
  const mat = getInverseMatrix(tile);
  const planes = [];

  for (let index = 0; index < positions.length; index++) {
    const preIndex = (index + 1) % positions.length;
    const plane = createPlaneByLine(mat, positions[index], positions[preIndex])
    if (plane) {
      planes.push(plane);
    }
  }
  console.error(planes);
  return planes;
}


export function aaa(tile, isShowPlane = false) {
  const planes = getClipPlanes(tile)
  const clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes: planes,
    edgeWidth: 0,
    edgeColor: Cesium.Color.RED,
    unionClippingRegions: true
  })

  tile.clippingPlanes = clippingPlanes;

  if (isShowPlane) {
    this['_graphicLayer'][_0x250133(0x14f4)]();
    const radius = tile.boundingSphere.radius;
    for (let i = 0x0; i < planes.length; ++i) {
      const plane = planes[i];
      // const entity = new PlaneEntity({
      //     'position': this[_0x250133(0x11a9)],
      //     'style': {
      //       'dimensions': new Cesium__namespace[(_0x250133(0x434))](radius, radius),
      //       'color': Cesium__namespace[_0x250133(0x129b)]['WHITE'][_0x250133(0x11ec)](0.2),
      //       'editColor': Cesium__namespace[_0x250133(0x129b)][_0x250133(0x7a7)]['withAlpha'](0.5),
      //       'outline': !![],
      //       'outlineColor': Cesium__namespace[_0x250133(0x129b)]['WHITE'],
      //       ...this[_0x250133(0x377)][_0x250133(0x42e)] || {},
      //       'plane': new Cesium__namespace[(_0x250133(0x6c7))](createPlaneUpdateFunction(plane), ![])
      //     }
      //   });
      // this[_0x250133(0x23c)][_0x250133(0x69f)](_0x15321d);
    }
  }
}
