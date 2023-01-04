import * as Cesium from 'cesium';
import source from './Serrated.glsl'
import vs from './SerratedVS.glsl'
import fs from './SerratedFS.glsl'

export class SerratedWall {
  constructor(options) {
    this.wallHeight = options.wallHeight || 200;
    this.direction = options.direction || 1;
    this.speed = options.speed || 1;
    this.height = Cesium.defaultValue(this.wallHeight, 500)
    this.color = options.color || Cesium.Color.YELLOW;
    this.viewer = options.viewer;
    this.points = options.points;
    this.addPrimitive(this.points);
  }

  addPrimitive(points) {
    const geometryInstance = this.createGeometry(points);
    this.primitive = new Cesium.Primitive({
      geometryInstances: geometryInstance,
      appearance: new Cesium.MaterialAppearance({
        material: new Cesium.Material({
          translucent: true,
          fabric: {
            uniforms: {
              u_color: this.color,
              speed: this.speed,
              direction: this.direction
            },
            source: source,
          }
        }),
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
      }),
      asynchronous: false,
    })
    this.viewer.scene.primitives.add(this.primitive);
  }

  createGeometry(points) {
    const normal = [];
    const st = [];
    const indices = [];
    const position = [];

    for (let i = 0; i < points.length; i++) {
      const index = i;
      let nextIndex = i + 1;
      if (nextIndex === points.length) {
        nextIndex = 0;
      }
      position.push(points[index].x, points[index].y, points[index].z);
      position.push(points[nextIndex].x, points[nextIndex].y, points[nextIndex].z);
      position.push(points[nextIndex].x, points[nextIndex].y, points[nextIndex].z);
      position.push(points[index].x, points[index].y, points[index].z);

      normal.push([0x0, 0x0, 0x1]);
      normal.push([0x0, 0x0, 0x1]);
      normal.push([0x0, 0x0, 0x1]);
      normal.push([0x0, 0x0, 0x1]);

      const i0 = 0x4 * index;
      const i1 = 0x1 + i0;
      const i2 = 0x2 + i0;
      const i3 = 0x3 + i0;
      indices.push([i0, i1, i2, i2, i3, i0]);

      st.push([0x0, 0x0, 0x1, 0x0, 0x1, 0x1, 0x0, 0x1]);
    }

    const vertex = new Float64Array(position);
    return new Cesium.GeometryInstance({
      'geometry': new Cesium.Geometry({
        'attributes': {
          'position': new Cesium.GeometryAttribute({
            'componentDatatype': Cesium.ComponentDatatype.DOUBLE,
            'componentsPerAttribute': 0x3,
            'values': vertex,
          }),
          'normal': new Cesium.GeometryAttribute({
            'componentDatatype': Cesium.ComponentDatatype.FLOAT,
            'componentsPerAttribute': 0x3,
            'values': new Float32Array(normal)
          }),
          'st': new Cesium.GeometryAttribute({
            'componentDatatype': Cesium['ComponentDatatype'].FLOAT,
            'componentsPerAttribute': 0x2,
            'values': new Float32Array(st)
          })
        },
        'indices': new Uint16Array(indices),
        'primitiveType': Cesium.PrimitiveType.TRIANGLES,
        'boundingSphere': Cesium.BoundingSphere.fromVertices(vertex)
      })
    });
  }
}
