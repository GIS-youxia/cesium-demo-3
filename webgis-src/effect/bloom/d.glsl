
      uniform sampler2D colorTexture;
      uniform sampler2D bloomTexture;
      uniform float ratio;
      uniform vec4 color;
      varying vec2 v_textureCoordinates;
      void main(void)
      {
        vec4 color1 = texture2D(colorTexture, v_textureCoordinates);
        vec4 bloom = texture2D(bloomTexture, v_textureCoordinates);
        bloom *= color ;
        #ifdef CZM_SELECTED_FEATURE
          if (czm_selected()) {
            bloom *= ratio;
          }
        #endif
        gl_FragColor = bloom + color1;
      }
