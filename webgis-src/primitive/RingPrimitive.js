import * as Cesium from 'cesium';

export class RingPrimitive {
  constructor(options) {
    const { viewer, center, radius=1000,color="rgba(255,0,0,0.5)" } = options;
    this._delegate = new Cesium.PrimitiveCollection()
    viewer.scene.primitives.add(this._delegate);

    this._center = center;
    this._radius = radius;
    this._color = Cesium.Color.fromCssColorString(color);
    this._updatePrimitives()
  }

  _updatePrimitives() {
    let ring = new Cesium.Primitive({
      geometryInstances: this._getRingGeometry(),
      asynchronous: false
    });
    ring.appearance = new Cesium.EllipsoidSurfaceAppearance({
      material: Cesium.Material.fromType(Cesium.Material.ColorType, {
        color: this._color
      })
    })
    this._delegate.add(ring)
  }

  _getRingGeometry(options) {
    let {
      innerRadius = 500,
      outerRadius = 1000,
      thetaSegments = 64,
      phiSegments = 1,
      thetaStart = 0,
      thetaLength = Math.PI * 2,
    } = options||{};
    thetaSegments = Math.max(3, thetaSegments);
    phiSegments = Math.max(1, phiSegments);

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // some helper variables
    let radius = innerRadius;
    const radiusStep = ((outerRadius - innerRadius) / phiSegments);
    const vertex = { x: 0, y: 0, z:0 }
    const uv = {x:0,y:0}

    const transformMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(this._center);

    // generate vertices, normals and uvs
    for (let j = 0; j <= phiSegments; j++) {
      for (let i = 0; i <= thetaSegments; i++) {
        // values are generate from the inside of the ring to the outside
        const segment = thetaStart + i / thetaSegments * thetaLength;
        // vertex
        vertex.x = radius * Math.cos(segment);
        vertex.y = radius * Math.sin(segment);
        const cartesian = new Cesium.Cartesian3(
          vertex.x + this._center.x,
          vertex.y + this._center.y,
          vertex.z + this._center.z
        );
        vertices.push(cartesian);
        // normal
        normals.push(0, 0, 1);
        // uv
        uv.x = (vertex.x / outerRadius + 1) / 2;
        uv.y = (vertex.y / outerRadius + 1) / 2;
        uvs.push(uv.x, uv.y);
      }

      // increase the radius for next row of vertices
      radius += radiusStep;
    }

    // indices
    for (let j = 0; j < phiSegments; j++) {
      const thetaSegmentLevel = j * (thetaSegments + 1);
      for (let i = 0; i < thetaSegments; i++) {
        const segment = i + thetaSegmentLevel;
        const a = segment;
        const b = segment + thetaSegments + 1;
        const c = segment + thetaSegments + 2;
        const d = segment + 1;
        // faces
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    let polygon = Cesium.PolygonGeometry.createGeometry(
      new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(vertices),
        perPositionHeight: true
      })
    )
    polygon.indices = indices;
    // return new Cesium.GeometryInstance({
    //   geometry: polygon,
    //   // modelMatrix: transformMatrix
    // })
    // polygon.attributes.st.values = sts

    const ellipse = new Cesium.EllipseGeometry({
      center: this._center,
      semiMajorAxis: 300000.0,
      semiMinorAxis: 300000.0,
      rotation: Cesium.Math.toRadians(60.0)
    });
    const geometry = Cesium.EllipseGeometry.createGeometry(ellipse);
    return new Cesium.GeometryInstance({
      geometry: geometry
    })
  }
}
