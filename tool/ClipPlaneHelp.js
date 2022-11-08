import * as Cesium from 'cesium'
import { addPoint } from './tool'

// 裁剪区域



const planClip = {
  // // mars3d
  // positions: [
  //   [117.22648, 31.827441],
  //   [117.210341, 31.830612],
  //   [117.211311, 31.842438],
  //   [117.226091, 31.842885]
  // ],

  // 顺时针拾取坐标点
  positions: [[113.92362861237427, 22.50469769431128], [113.9376492415442, 22.505100990665508], [113.93808537365808, 22.495671257198893], [113.91893804432563, 22.4941832585386]],
  clipOutSide: true // 外裁剪
}

let centerArr = []
export function getInverseMatrix(tile) {
  const center = tile.boundingSphere.center;
  // addPoint()
  const mat = Cesium.Transforms.eastNorthUpToFixedFrame(center)
  return Cesium.Matrix4.inverseTransformation(mat, new Cesium.Matrix4())
}

function createPlaneByLine(viewer, tileCenter, mat, start, end) {
  if (Cesium.Cartesian3.distance(start, end) < 0.1) return null;

  const p1 = Cesium.Matrix4.multiplyByPoint(mat, start, new Cesium.Cartesian3())
  const p2 = Cesium.Matrix4.multiplyByPoint(mat, end, new Cesium.Cartesian3())

  const line = Cesium.Cartesian3.subtract(p2, p1, new Cesium.Cartesian3())
  const up = new Cesium.Cartesian3(0x0, 0x0, 0xa)

  let normal = new Cesium.Cartesian3.cross(line, up, new Cesium.Cartesian3())
  normal = new Cesium.Cartesian3.normalize(normal, normal)
  const plane = new Cesium.Plane.fromPointNormal(p1, normal)

  // let center = Cesium.Cartesian3.add(start, end, new Cesium.Cartesian3())
  // Cesium.Cartesian3.multiplyByScalar(center, 0.5, center)
  // Cesium.Cartesian3.add(center, tileCenter, center)
  // addPoint(viewer, center)
  // centerArr.push(center);
  return plane;
}

function getClipPlanes(viewer, tile) {
  const center = tile.boundingSphere.center;
  // addPoint(viewer, center, 10, "#00ff00")

  const positions = []
  for (let i = 0; i < planClip.positions.length; i++) {
    const item = planClip.positions[i];
    positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
  }
  const mat = getInverseMatrix(tile);
  const planes = [];

  for (let index = 0; index < positions.length; index++) {
    const preIndex = (index + 1) % positions.length;
    const start = positions[index]
    const end = positions[preIndex]
    const plane = createPlaneByLine(viewer, center, mat, start, end)
    // // let center = Cesium.Cartesian3.add(start, end, new Cesium.Cartesian3())
    // // Cesium.Cartesian3.multiplyByScalar(center, 0.5, center)
    // // // addPoint(viewer, center)
    // centerArr.push(center);

    if (plane) {
      planes.push(plane);
    }
  }
  return { planes, positions };
}


export function aaa(viewer, tile, isShowPlane = false) {
  const { planes, positions } = getClipPlanes(viewer, tile)
  // console.error(planes);

  const clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes: planes,
    edgeWidth: 0,
    edgeColor: Cesium.Color.RED,
    unionClippingRegions: true
  })

  tile.clippingPlanes = clippingPlanes;

  if (isShowPlane) {
    viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(positions),
        material: Cesium.Color.fromCssColorString("#ff0000").withAlpha(0.4),
        perPositionHeight: true,
      }
    });

    const center = tile.boundingSphere.center;

    // const {radius,center} = tile.boundingSphere;
    for (let i = 0x0; i < planes.length; ++i) {
      const plane = planes[i];
      const entity = new Cesium.Entity({
        plane: {
          dimensions: {
            x: 500,
            y: 100
          },
          plane: plane,
          material: new Cesium.Color.fromCssColorString("#ff0000")
        }
      })
      viewer.entities.add(entity)
      let dir = Cesium.Cartesian3.multiplyByScalar(plane.normal, plane.distance
        , new Cesium.Cartesian3())
      Cesium.Cartesian3.add(dir, center, dir)
      entity.position = center//centerArr[i];
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
