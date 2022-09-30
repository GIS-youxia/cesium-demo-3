czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
          vec4 colorImage = texture2D(image, vec2(fract( count * st.s - time),fract(st.t)));
          material.alpha =  colorImage.a * color.a;
          material.diffuse =  color.rgb * 1.5 ;
          return material;
      }
