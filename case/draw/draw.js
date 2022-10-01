import * as Cesium from 'cesium';
import { getPrimitive } from '../../tool/primitive'
import { colorMaterial, customMaterial } from '../../tool/material'
import { CustormAppearance } from './CustomAppearance'
import { getImageTexture } from '../../tool/tool'

export class Draw {
  constructor(viewer) {
    this.addPlane(viewer)
  }

  addPlane(viewer) {
    const beijing = {
      lon: 116.4715397068917,
      lat: 39.9945712104195,
    }
    const geometry = this.getPlaneGeometry(1000);
    const position = Cesium.Cartesian3.fromDegrees(beijing.lon, beijing.lat, 10);
    const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

    const planePrimitive = getPrimitive({
      geometry,
      modelMatrix,
      // appearance: this.getCustomAppearance()
      appearance: new Cesium.MaterialAppearance({
         flat : true,
         translucent : false
     }),
    });
    // getImageTexture(viewer, './res/pic/background.png').then(texture => {
    //   planePrimitive.appearance.uniforms.myImage = texture;
    // })

    // 更改材质
    planePrimitive.appearance.material = customMaterial({ color :"#ff0000"});

    viewer.scene.primitives.add(planePrimitive)
    viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(position, 1000), {
      duration: 0,
    });
  }

  // 使用内置的外观
  getSystemAppearance() {
    const appearance = new Cesium.MaterialAppearance({
      material: Cesium.Material.fromType('Image', {
        image: './res/pic/background.png'
      }),
      //faceForward : true // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
      closed: false // 是否为封闭体，实际上执行的是是否进行背面裁剪
    })
    return appearance;
  }

  getCustomAppearance() {
    return new CustormAppearance({
      //faceForward : true // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
      closed: true, // 是否为封闭体，实际上执行的是是否进行背面裁剪
      translucent: false,
      uniforms: {
        myImage: viewer.scene.context.defaultTexture
      }
    });
  }

  /**
   *绘制一个平面
   *
   * @param {number} [length=1000]
   * @return {*}
   * @memberof Draw
   */
  getPlaneGeometry(length=1000) {
    /**
     * [3]----------[2]
     *  |            |
     *  |            |
     *  |            |
     * [0]----------[1]
     */
    const rawVertex = [
      -0.5, -0.5, 0,
      0.5, -0.5, 0,
      0.5, 0.5, 0,
      -0.5, 0.5, 0,
    ];

    const boxVertex = rawVertex.map(v=>{
      return v * length;
    });
    const positions = new Float64Array(boxVertex);
    const normals = new Float32Array([
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]);

    const sts = new Float32Array([
      0, 0,
      1, 0,
      1, 1,
      0, 1,
    ]);

    const indices = new Uint16Array([
      0, 1, 2,
      0, 2, 3
    ]);

    const geometry = new Cesium.Geometry({
      attributes: {
        position: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: positions
        }),
        normal: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: normals
        }),
        st: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: sts
        }),
      },
      indices: indices,
      primitiveType: Cesium.PrimitiveType.TRIANGLES,
      boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
    });
    return geometry;
  }
}
