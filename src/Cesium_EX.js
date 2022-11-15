import {
  defined,
  SceneMode,
  BoundingSphere,
  Intersect,
  BoundingRectangle,
  EllipsoidalOccluder,
  Label
} from 'cesium'

/**
 * 是否相交
 * @param {*} t
 * @param {*} r
 * @return {*}
 */
function isIntersect(bounds, r) {
  for (var i = 0; i < bounds.length; i++) {
    var o = bounds[i];
    if (BoundingRectangle.intersect(o, r) == Intersect.INTERSECTING)
      return true;
  }
  return false;
}

/**
 * label的避让
 * @export
 * @param {*} labelCollection
 * @param {*} scene
 * @return {*}
 */
export function updateLabelShow(labelCollection, entityCluster,) {
  if (!defined(labelCollection) || labelCollection.length < 0) return;

  const scene = entityCluster._scene;
  const r = scene.mapProjection.ellipsoid;
  const i = scene.camera.positionWC;
  const n = new EllipsoidalOccluder(r, i);
  var l = [];

  for (let d = 0; d < labelCollection.length; d++) {
    const label = labelCollection.get(d);
    if (entityCluster._scene.mode === SceneMode.SCENE3D && !n.isPointVisible(label.position) || entityCluster._scene._frameState.cullingVolume.computeVisibility(new BoundingSphere(label.position, 1)) == Intersect.OUTSIDE)
      label.show = false;
    else {
      var f = label.computeScreenSpacePosition(scene);
      if (defined(f)) {
        const bound = Label.getScreenSpaceBoundingBox(label, f, new BoundingRectangle());
        if (isIntersect(l, bound)) {
          label.show = false;
        } else{
          label.show = true;
          l.push(BoundingRectangle.clone(bound));
        }
      }
    }
  }
}
