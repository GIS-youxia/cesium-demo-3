 void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange) 默认是 0-60米
  float _heightRange = 60.0;
  float vtxf_height = fsInput.attributes.positionMC.z;
  float vtxf_a12 = vtxf_height / _heightRange+0.3;
  material.diffuse *= vec3(vtxf_a12);
}
