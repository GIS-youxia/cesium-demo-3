import * as Cesium from 'cesium';
const SkyBoxFS = require("./skyFS.glsl");
const SkyBoxVS = require("./skyVS.glsl");

export class GroundSkyBox extends Cesium.SkyBox {
  constructor(options = {}) {
    super(options)
    this.offsetAngle = options.offsetAngle || 0;
  }

  update(frameState, useHdr) {
    const that = this

    if (!this.show) {
      return undefined
    }

    if (
      frameState.mode !== Cesium.SceneMode.SCENE3D &&
      frameState.mode !== Cesium.SceneMode.MORPHING
    ) {
      return undefined
    }

    if (!frameState.passes.render) {
      return undefined
    }

    const context = frameState.context

    if (this._sources !== this.sources) {
      this._sources = this.sources
      const sources = this.sources

      if (
        !Cesium.defined(sources.positiveX) ||
        !Cesium.defined(sources.negativeX) ||
        !Cesium.defined(sources.positiveY) ||
        !Cesium.defined(sources.negativeY) ||
        !Cesium.defined(sources.positiveZ) ||
        !Cesium.defined(sources.negativeZ)
      ) {
        throw new DeveloperError(
          'this.sources is required and must have positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ properties.'
        )
      }

      if (
        typeof sources.positiveX !== typeof sources.negativeX ||
        typeof sources.positiveX !== typeof sources.positiveY ||
        typeof sources.positiveX !== typeof sources.negativeY ||
        typeof sources.positiveX !== typeof sources.positiveZ ||
        typeof sources.positiveX !== typeof sources.negativeZ
      ) {
        throw new Cesium.DeveloperError(
          'this.sources properties must all be the same type.'
        )
      }

      if (typeof sources.positiveX === 'string') {
        // Given urls for cube-map images. Load them.
        Cesium.loadCubeMap(context, this._sources).then(function (cubeMap) {
          that._cubeMap = that._cubeMap && that._cubeMap.destroy()
          that._cubeMap = cubeMap
        })
      } else {
        this._cubeMap = this._cubeMap && this._cubeMap.destroy()
        this._cubeMap = new CubeMap({
          context: context,
          source: sources
        })
      }
    }

    const command = this._command

    command.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      frameState.camera.positionWC
    )

    if (this.offsetAngle !== 0) {
      Cesium.Matrix4.multiply(
        command.modelMatrix,
        Cesium.Matrix4.fromRotationTranslation(
          Cesium.Matrix3.fromRotationZ((this.offsetAngle / 180) * Math.PI)
        ),
        command.modelMatrix
      )
    }

    if (!Cesium.defined(command.vertexArray)) {
      command.uniformMap = {
        u_cubeMap: function () {
          return that._cubeMap
        },
        u_rotateMatrix: function () {
          return Cesium.Matrix4.getMatrix3(command.modelMatrix, new Cesium.Matrix3())
        }
      }

      const geometry = Cesium.BoxGeometry.createGeometry(
        Cesium.BoxGeometry.fromDimensions({
          dimensions: new Cesium.Cartesian3(2.0, 2.0, 2.0),
          vertexFormat: Cesium.VertexFormat.POSITION_ONLY
        })
      )
      const attributeLocations = (this._attributeLocations = Cesium.GeometryPipeline.createAttributeLocations(
        geometry
      ))

      command.vertexArray = Cesium.VertexArray.fromGeometry({
        context: context,
        geometry: geometry,
        attributeLocations: attributeLocations,
        bufferUsage: Cesium.BufferUsage._DRAW
      })

      command.renderState = Cesium.RenderState.fromCache({
        blending: Cesium.BlendingState.ALPHA_BLEND
      })
    }

    if (!Cesium.defined(command.shaderProgram) || this._useHdr !== useHdr) {
      const fs = new Cesium.ShaderSource({
        defines: [useHdr ? 'HDR' : ''],
        sources: [SkyBoxFS]
      })
      command.shaderProgram = Cesium.ShaderProgram.fromCache({
        context: context,
        vertexShaderSource: SkyBoxVS,
        fragmentShaderSource: fs,
        attributeLocations: this._attributeLocations
      })
      this._useHdr = useHdr
    }

    if (!Cesium.defined(this._cubeMap)) {
      return undefined
    }
    return command
  }
}
