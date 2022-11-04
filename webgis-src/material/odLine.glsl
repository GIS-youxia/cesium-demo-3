
uniform float totoalFrameCount_1_1;
uniform vec4 color_0_0;
czm_material czm_getMaterial(czm_materialInput materialInput)
{
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  float t = mod(czm_frameNumber, totoalFrameCount_1_1) / totoalFrameCount_1_1;
  t *= 1.03;
  float alpha = smoothstep(t- 0.03, t, st.s) * step(-t, -st.s);
  alpha += 0.1;
  alpha *= step(-0.4, -abs(0.5-st.t));
  material.diffuse = color_0_0.rgb;
  material.alpha = alpha;
  return material;
}

