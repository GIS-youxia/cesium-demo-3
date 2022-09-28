import * as Cesium from 'cesium';

/**
 * 自定义Appearance
 *
 * @export
 * @class VtxfAppearance
 * @extends {Cesium.Appearance}
 */
export class CustormAppearance extends Cesium.Appearance {
  constructor(options) {
    super(options);
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);

    var translucent = this.translucent;
    var closed = this.closed;

    var defaultVertexShader = `
                    attribute vec3 position3DHigh;
                    attribute vec3 position3DLow;
                    attribute vec3 normal;
                    attribute vec2 st;
                    attribute float batchId;

                    varying vec3 v_positionEC;
                    varying vec3 v_normalEC;
                    varying vec2 v_st;

                    void main()
                    {
                        vec4 p = czm_computePosition();

                        v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
                        v_normalEC = czm_normal * normal;                         // normal in eye coordinates
                        v_st = st;

                        gl_Position = czm_modelViewProjectionRelativeToEye * p;
                    }
                    `;

    var defaultFragmentShader = `
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
                        gl_FragColor = czm_phong(normalize(positionToEyeEC), material, czm_lightDirectionEC);
                    #endif
                    }
                    `;
    this._vertexShaderSource = Cesium.defaultValue(options.vertexShaderSource, defaultVertexShader);
    this._fragmentShaderSource = Cesium.defaultValue(options.fragmentShaderSource, defaultFragmentShader);
    this._renderState = Cesium.Appearance.getDefaultRenderState(translucent, closed, options.renderState);

    this.uniforms = Cesium.defaultValue(options.uniforms, {});
  }
}
