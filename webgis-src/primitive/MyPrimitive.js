import * as Cesium from 'cesium'

export class MyPrimitive {

  constructor(modelMatrix) {
    this.modelMatrix = modelMatrix || Cesium.Matrix4.IDENTITY.clone()
    this.drawCommand = null;
  }

  /**
   * 创建 DrawCommand
   * @param {Cesium.Context} context
   */
  createCommand(context) {

    var modelMatrix = this.modelMatrix;

    var box = new Cesium.BoxGeometry({
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
      maximum: new Cesium.Cartesian3(250000.0, 250000.0, 250000.0),
      minimum: new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0)
    });
    var geometry = Cesium.BoxGeometry.createGeometry(box);

    var attributeLocations = Cesium.GeometryPipeline.createAttributeLocations(geometry)

    var va = Cesium.VertexArray.fromGeometry({
      context: context,
      geometry: geometry,
      // 顶点属性索引，key 为属性名称，value 为顶点属性缓冲区在同一个着色器程序中的索引
      attributeLocations: attributeLocations
    });

    var vs = `
        attribute vec3 position;
        void main(){
            gl_Position = czm_projection  * czm_modelView * vec4( position , 1. );
        }
        `;
    var fs = `
        uniform vec3 color;
        void main(){
            gl_FragColor=vec4( color , 1. );
        }
        `;
    var shaderProgram = Cesium.ShaderProgram.fromCache({
      context: context,
      vertexShaderSource: vs,
      fragmentShaderSource: fs,
      attributeLocations: attributeLocations
    })

    var uniformMap = {
      color() {
        return Cesium.Color.GREEN
      }
    }

    // 渲染状态对象，封装如深度测试（depthTest）、剔除（cull）、混合（blending）等状态类型的参数设置。
    var renderState = Cesium.RenderState.fromCache({
      cull: {
        enabled: true,
        face: Cesium.CullFace.BACK
      },
      depthTest: {
        enabled: true
      }
    })

    this.drawCommand = new Cesium.DrawCommand({
      // 模型变换矩阵
      modelMatrix: modelMatrix,
      // 顶点数组，向 GPU 传递顶点属性、索引（可选的）数组等几何信息；
      vertexArray: va,
      // 着色器程序对象，负责编译、链接顶点着色器（vertexShader）、片元着色器（fragmentShader）
      shaderProgram: shaderProgram,
      // 渲染状态对象，封装如深度测试（depthTest）、剔除（cull）、混合（blending）等状态类型的参数设置；
      renderState: renderState,
      // 用于传递 uniform 具体的值，是一个回调函数字典对象，key 是 uniform 变量名，value 是回调函数，
      uniformMap: uniformMap,
      // 渲染通道
      pass: Cesium.Pass.OPAQUE
    })
  }

  /**
   * 实现Primitive接口，供Cesium内部在每一帧中调用
   * @param {Cesium.FrameState} frameState
   */
  update(frameState) {
    if (!this.drawCommand) {
      this.createCommand(frameState.context)
    }
    frameState.commandList.push(this.drawCommand)
  }

}
