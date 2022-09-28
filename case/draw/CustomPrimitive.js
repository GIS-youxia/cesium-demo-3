// 1.9 创建command
function createCommand({ context, vtxfVertexShader, vtxfFragmentShader, owner, vertexArray }) {
  var translucent = false;
  var closed = true;

  // 借用一下Appearance.getDefaultRenderState
  var rawRenderState = Cesium.Appearance.getDefaultRenderState(translucent, closed, undefined);
  var renderState = Cesium.RenderState.fromCache(rawRenderState);

  var vertexShaderSource = new Cesium.ShaderSource({
    sources: [vtxfVertexShader]
  });

  var fragmentShaderSource = new Cesium.ShaderSource({
    sources: [vtxfFragmentShader]
  });

  var uniformMap = {
    myImage: function () {
      if (Cesium.defined(texture)) {
        return texture;
      } else {
        return context.defaultTexture;
      }
    }
  }

  var shaderProgram = Cesium.ShaderProgram.fromCache({
    context: context,
    vertexShaderSource: vertexShaderSource,
    fragmentShaderSource: fragmentShaderSource,
    attributeLocations: attributeLocations
  });

  return new Cesium.DrawCommand({
    vertexArray: vertexArray,
    primitiveType: Cesium.PrimitiveType.TRIANGLES,
    renderState: renderState,
    shaderProgram: shaderProgram,
    uniformMap: uniformMap,
    owner: owner,
    // framebuffer : framebuffer,
    pass: Cesium.Pass.OPAQUE,
    modelMatrix: modelMatrix,
  });
}

export class CustomPrimitive {
  constructor(options) {
    options = options || {};
    const { geometry } = options;

    // const modelMatrix = Cesium.Matrix4.multiply(enuMatrix, scaleMatrix, new Cesium.Matrix4());

    // 1.6 定义attributeLocations
    var attributeLocations = {
      position: 0,
      normal: 1,
      textureCoordinates: 2,
    };

    var vertexArray = Cesium.VertexArray.fromGeometry({
      context: context,
      geometry: geometry,
      attributeLocations: attributeLocations,
      bufferUsage: Cesium.BufferUsage.STATIC_DRAW,
      // interleave : true
    });



    // 1.7 定义shader
    var vtxfVertexShader =
      `
                        // vtxf 使用double类型的position进行计算
                        // attribute vec3 position3DHigh;
                        // attribute vec3 position3DLow;
                        attribute vec3 position;
                        attribute vec3 normal;
                        attribute vec2 st;
                        attribute float batchId;

                        varying vec3 v_positionEC;
                        varying vec3 v_normalEC;
                        varying vec2 v_st;

                        void main()
                        {
                            // vtxf 使用double类型的position进行计算
                            // vec4 p = czm_translateRelativeToEye(position3DHigh, position3DLow);
                            // v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
                            // v_normalEC = czm_normal * normal;                         // normal in eye coordinates
                            // v_st = st;
                            // gl_Position = czm_modelViewProjectionRelativeToEye * p;

                            v_positionEC = (czm_modelView * vec4(position, 1.0)).xyz;       // position in eye coordinates
                            v_normalEC = czm_normal * normal;                               // normal in eye coordinates
                            v_st = st;
                            gl_Position = czm_modelViewProjection * vec4(position, 1.0);
                        }
                        `;

    var vtxfFragmentShader =
      `
                        varying vec3 v_positionEC;
                        varying vec3 v_normalEC;
                        varying vec2 v_st;

                        uniform sampler2D myImage;

                        void main()
                        {
                            vec3 positionToEyeEC = -v_positionEC;

                            vec3 normalEC = normalize(v_normalEC);
                        #ifdef FACE_FORWARD
                            normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
                        #endif

                            czm_materialInput materialInput;
                            materialInput.normalEC = normalEC;
                            materialInput.positionToEyeEC = positionToEyeEC;
                            materialInput.st = v_st;

                            //czm_material material = czm_getMaterial(materialInput);
                            czm_material material = czm_getDefaultMaterial(materialInput);
                            material.diffuse = texture2D(myImage, materialInput.st).rgb;

                        #ifdef FLAT
                            gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);
                        #else
                            gl_FragColor = czm_phong(normalize(positionToEyeEC), material);
                        #endif
                        }
                        `;



    this.show = true;
    this._command = undefined;
    this._createCommand = createCommand({

    });
  }

  update(frameState) {
    if (!this.show) {
      return;
    }

    if (!Cesium.defined(this._command)) {
      this._command = this._createCommand(frameState.context);
    }

    if (Cesium.defined(this._command)) {
      frameState.commandList.push(this._command);
    }
  }

  isDestroyed() {
    return false;
  }

  destroy() {
    if (Cesium.defined(this._command)) {
      this._command.shaderProgram = this._command.shaderProgram && this._command.shaderProgram.destroy();
    }
    return destroyObject(this);
  };
}
