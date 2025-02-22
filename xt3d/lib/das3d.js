"use strict";
function limitCameraHeight() {
  function e(e, i) {
    var a = new Cesium.Cartesian2(e.position.x, e.position.y);
    if (Cesium.defined(a))
      var o = viewer.scene.camera.getPickRay(e.position, n)
        , s = viewer.scene.globe.pick(o, viewer.scene, r);
    s ? (t.screenSpaceCameraController.enableRotate = !0,
      t.screenSpaceCameraController.enableTranslate = !0,
      t.screenSpaceCameraController.enableZoom = !0,
      t.screenSpaceCameraController.enableTilt = !0,
      t.screenSpaceCameraController.inertiaSpin = 0) : (t.screenSpaceCameraController.enableRotate = !1,
        t.screenSpaceCameraController.enableTranslate = !1,
        t.screenSpaceCameraController.enableZoom = !1,
        t.screenSpaceCameraController.enableTilt = !1,
        t.screenSpaceCameraController.enableLook = !1,
        t.screenSpaceCameraController.inertiaSpin = 0)
  }
  var t = viewer.scene
    , i = viewer.canvas
    , a = viewer.camera
    , n = new Cesium.Ray
    , r = new Cesium.Cartesian3
    , o = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  t.screenSpaceCameraController.minimumZoomDistance = 20,
    o.setInputAction(function (i) {
      e(i, "right"),
        t.screenSpaceCameraController.enableRotate = !1,
        t.screenSpaceCameraController.enableTranslate = !1,
        t.screenSpaceCameraController.enableZoom = !1,
        t.screenSpaceCameraController.enableTilt = !1,
        t.screenSpaceCameraController.enableLook = !1,
        t.screenSpaceCameraController.inertiaSpin = 0;
      var n, r = viewer.camera.getPickRay(i.position);
      l.cartesian = viewer.scene.globe.pick(r, viewer.scene),
        l.looking = !0,
        l.toRadian = 0,
        l.pitch = a.pitch,
        l.W = function (e, t, i, a) {
          var n = new Cesium.Cartesian3;
          Cesium.Cartesian3.subtract(viewer.scene.camera.position, e, n);
          var r = Cesium.defaultValue(i, viewer.scene.camera.defaultRotateAmount)
            , o = Cesium.Quaternion.fromAxisAngle(t, -r, void 0)
            , s = Cesium.Matrix3.fromQuaternion(o, void 0);
          Cesium.Matrix3.multiplyByVector(s, n, n),
            Cesium.Matrix3.multiplyByVector(s, viewer.scene.camera.direction, viewer.scene.camera.direction),
            Cesium.Matrix3.multiplyByVector(s, viewer.scene.camera.up, viewer.scene.camera.up),
            Cesium.Matrix3.multiplyByVector(s, viewer.scene.camera.right, viewer.scene.camera.right),
            void 0 != a && Cesium.Cartesian3.multiplyByScalar(n, a, n),
            viewer.scene.camera.position = Cesium.Cartesian3.add(n, e, viewer.scene.camera.position)
        }
        ;
      var o, u = viewer.scene.pick(i.position);
      if (t.pickPositionSupported && Cesium.defined(u)) {
        var d = viewer.scene.pickPosition(i.position);
        Cesium.defined(d) && (n = Cesium.Cartographic.fromCartesian(d))
      } else
        n = s.cartesianToCartographic(l.cartesian);
      o = s.cartographicToCartesian(new Cesium.Cartographic(n.longitude, n.latitude, n.height)),
        l.cartesian = o,
        l.icon = viewer.entities.add({
          id: "mouseIcon",
          position: o,
          billboard: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNkY5NjdEMjU0MjU2ODExQTNEM0MzRkQ1NDkyODg1NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2RkQzNTE2NDc0NEIxMUUzOUYwNkNEQTkzMTFBREMxNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2RkQzNTE2Mzc0NEIxMUUzOUYwNkNEQTkzMTFBREMxNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBRjk2N0QyNTQyNTY4MTFBM0QzQzNGRDU0OTI4ODU3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA2Rjk2N0QyNTQyNTY4MTFBM0QzQzNGRDU0OTI4ODU3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WlgJ0wAAAkdJREFUeNrcWdFtwkAMJYgBGOG6QToBGaFs0E4A3YCMwAR0g9AJkk4AG5ANkg1SR3KkfOTOPttXiVqy+LiL/eR757NNNgzD6tlkvXpC2YQWsywjDcBJbeHnDXQHWoC6hW0taAP6A3oFuz3DbnjRp4RRB3oB7YY46fA7R4H24pKAhrWjAOwS+GNy0CMVQKvBViqkGBs0+yKi4Rr5aymjvXoJuEX2qEDzRAkhR/t2oCEKJ8wMMdJE7i/QDwtQkNOYJTjywAvqFrLMEdc54tQXEdMTJSfuiTFsXVSgmVF+j+HAuJ8TbU32oDJFCa/bVwxo3F+q/BKRrkMc1qQLguO1JtKhjFEq01wp9Kuq8holaPH3YtDAzVaDWPP9U9bT/xJ0E7j9uTJ75FK+U6C/A2sHZcAOQr+qF7Gjug+i60nzIuIN9x3VNqacXChzvdSgMgvnIp5DdbCv8/A1EuN+oi4/q0tTxpM7laUF4afg2OHg2kQ8uZfAusOWaTzWK44KeqTQDgsgx/SzMok07quHtFKbN7YGBZKZfTZouNENHn0KuaL9JM/4J3LVUnq0m6b2wPxpTZMytuLLQuMv3wASvrkZzUDu4OM1dgAprfI+jKIssiMCDdG5W7RbaEdUvIhGvRNNhDn5psG1NjjeXpAtVPRSgRbSRE4LC3rMbHBn1pUFrrVhFuhT08K0scU/fvbEtj3nD6I/7caxdigDPG6sfJlwmuB3ZY0rxdxj5O1US7SGr2e6Yc2M360lj+eyoY5IWgiBvihteOVXgAEAn30xP5nd8R4AAAAASUVORK5CYII=",
            scale: .7,
            show: !0,
            width: 50,
            height: 50,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
    }, Cesium.ScreenSpaceEventType.RIGHT_DOWN),
    o.setInputAction(function (t) {
      l.looking = !1,
        e(t, "left")
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN),
    o.setInputAction(function (e) {
      if (l.looking) {
        var i = e.startPosition
          , n = e.endPosition
          , r = 0
          , o = 0;
        r = i.x - n.x,
          o = i.y - n.y,
          t.screenSpaceCameraController.enableTilt = !1,
          r < 0 ? l.W(l.cartesian, l.cartesian, Cesium.Math.toRadians(.2 * Math.abs(r))) : l.W(l.cartesian, l.cartesian, 0 - Cesium.Math.toRadians(.2 * Math.abs(r)));
        var s = Cesium.Cartesian3.angleBetween(viewer.camera.position, viewer.camera.up);
        o < 0 ? s < Cesium.Math.toRadians(90) && l.W(l.cartesian, viewer.camera.right, Cesium.Math.toRadians(.2 * Math.abs(o))) : s > Cesium.Math.toRadians(10) && a.positionCartographic.height > 0 && l.W(l.cartesian, viewer.camera.right, 0 - Cesium.Math.toRadians(.2 * Math.abs(o)))
      } else if (a._positionCartographic.height <= 0) {
        var u = viewer.scene.globe.ellipsoid
          , d = u.cartesianToCartographic(a.position)
          , c = u.cartographicToCartesian(new Cesium.Cartographic(d.longitude, d.latitude, 20));
        viewer.camera.setView({
          destination: c,
          orientation: {
            heading: a.heading,
            pitch: a.pitch > 0 ? 0 : a.pitch,
            roll: a.roll
          }
        })
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE),
    o.setInputAction(function (e) {
      l.looking = !1,
        viewer.entities.removeById("mouseIcon")
    }, Cesium.ScreenSpaceEventType.RIGHT_UP);
  var o = new Cesium.ScreenSpaceEventHandler(t.canvas);
  o.setInputAction(function (e) {
    l.looking || (e > 0 && a._positionCartographic.height <= 30 ? t.screenSpaceCameraController.enableZoom = !1 : t.screenSpaceCameraController.enableZoom = !0)
  }, Cesium.ScreenSpaceEventType.WHEEL);
  var t = viewer.scene
    , i = viewer.canvas;
  i.setAttribute("tabindex", "0"),
    i.onclick = function () {
      i.focus()
    }
    ;
  var s = viewer.scene.globe.ellipsoid
    , l = {
      looking: !1,
      camera_Position: null,
      distance: null,
      initialHeading: null,
      toRadian: 0,
      toPitchRadian: 0,
      cartesian: 0,
      heading: 0,
      pitch: 0,
      icon: null
    }
}
var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e
}
  : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }
  ;
!function (e, t) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) && "object" === ("undefined" == typeof module ? "undefined" : _typeof2(module)) ? module.exports = t(require("Cesium"), require("jQuery"), require("turf"), require("mapv")) : "function" == typeof define && define.amd ? define(["Cesium", "jQuery", "turf", "mapv"], t) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) ? exports.das3d = t(require("Cesium"), require("jQuery"), require("turf"), require("mapv")) : e.das3d = t(e.Cesium, e.jQuery, e.turf, e.mapv)
}("undefined" != typeof self ? self : void 0, function (__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_94__) {
  return function (e) {
    function t(a) {
      if (i[a])
        return i[a].exports;
      var n = i[a] = {
        i: a,
        l: !1,
        exports: {}
      };
      return e[a].call(n.exports, n, n.exports, t),
        n.l = !0,
        n.exports
    }
    var i = {};
    return t.m = e,
      t.c = i,
      t.d = function (e, i, a) {
        t.o(e, i) || Object.defineProperty(e, i, {
          configurable: !1,
          enumerable: !0,
          get: a
        })
      }
      ,
      t.n = function (e) {
        var i = e && e.__esModule ? function () {
          return e.default
        }
          : function () {
            return e
          }
          ;
        return t.d(i, "a", i),
          i
      }
      ,
      t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }
      ,
      t.p = "",
      t(t.s = 43)
  }([function (e, t) {
    e.exports = __WEBPACK_EXTERNAL_MODULE_0__
  }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function n(e, t) {
        return Number(e.toFixed(t || 0))
      }
      function r(e) {
        var t = _.default.Cartographic.fromCartesian(e)
          , i = {};
        return i.y = n(_.default.Math.toDegrees(t.latitude), 6),
          i.x = n(_.default.Math.toDegrees(t.longitude), 6),
          i.z = n(t.height, 2),
          i
      }
      function o(e) {
        var t = n(_.default.Math.toDegrees(e.west), 6)
          , i = n(_.default.Math.toDegrees(e.east), 6)
          , a = n(_.default.Math.toDegrees(e.north), 6);
        return {
          xmin: t,
          xmax: i,
          ymin: n(_.default.Math.toDegrees(e.south), 6),
          ymax: a
        }
      }
      function s(e, t) {
        null == t && (t = 0);
        var i = t;
        if (null == e || 0 == e.length)
          return i;
        for (var a = 0; a < e.length; a++) {
          var r = _.default.Cartographic.fromCartesian(e[a]);
          r.height > i && (i = r.height)
        }
        return n(i, 2)
      }
      function l(e, t) {
        for (var i = [], a = 0; a < e.length; a++)
          i.push(e[a].clone());
        for (var n, r, o, s, l, u, d, c = 0, h = 9999, f = Math.PI / Math.pow(2, 11) / 64, p = new _.default.PolygonGeometry.fromPositions({
          positions: i,
          vertexFormat: _.default.PerInstanceColorAppearance.FLAT_VERTEX_FORMAT,
          granularity: f
        }), m = new _.default.PolygonGeometry.createGeometry(p), a = 0; a < m.indices.length; a += 3)
          n = m.indices[a],
            r = m.indices[a + 1],
            o = m.indices[a + 2],
            d = new _.default.Cartesian3(m.attributes.position.values[3 * n], m.attributes.position.values[3 * n + 1], m.attributes.position.values[3 * n + 2]),
            s = t.globe.getHeight(_.default.Cartographic.fromCartesian(d)),
            h > s && (h = s),
            c < s && (c = s),
            d = new _.default.Cartesian3(m.attributes.position.values[3 * r], m.attributes.position.values[3 * r + 1], m.attributes.position.values[3 * r + 2]),
            l = t.globe.getHeight(_.default.Cartographic.fromCartesian(d)),
            h > l && (h = l),
            c < l && (c = l),
            d = new _.default.Cartesian3(m.attributes.position.values[3 * o], m.attributes.position.values[3 * o + 1], m.attributes.position.values[3 * o + 2]),
            u = t.globe.getHeight(_.default.Cartographic.fromCartesian(d)),
            h > u && (h = u),
            c < u && (c = u);
        return {
          maxHeight: c,
          minHeight: h
        }
      }
      function u(e, t) {
        if (t = Number(t) || 0,
          isNaN(t) || 0 == t)
          return e;
        if (e instanceof Array) {
          for (var i = [], a = 0, n = e.length; a < n; a++) {
            var r = _.default.Cartographic.fromCartesian(e[a])
              , o = _.default.Cartesian3.fromRadians(r.longitude, r.latitude, r.height + t);
            i.push(o)
          }
          return i
        }
        var r = _.default.Cartographic.fromCartesian(e);
        return _.default.Cartesian3.fromRadians(r.longitude, r.latitude, r.height + t)
      }
      function d(e, t) {
        if (t = Number(t) || 0,
          e instanceof Array) {
          for (var i = [], a = 0, n = e.length; a < n; a++) {
            var r = _.default.Cartographic.fromCartesian(e[a])
              , o = _.default.Cartesian3.fromRadians(r.longitude, r.latitude, t);
            i.push(o)
          }
          return i
        }
        var r = _.default.Cartographic.fromCartesian(e);
        return _.default.Cartesian3.fromRadians(r.longitude, r.latitude, t)
      }
      function c(e, t) {
        var i = _.default.Cartographic.fromCartesian(t)
          , a = e.scene.globe.getHeight(i) || 0
          , n = e.scene.sampleHeight(i) || 0
          , r = n > a ? n : a;
        if (null != r && r > 0) {
          return _.default.Cartesian3.fromRadians(i.longitude, i.latitude, r)
        }
        return t
      }
      function h(e, t) {
        if (_.default.defined(e.id)) {
          var i = e.id;
          if (i._noMousePosition)
            return !1;
          if (t && i == t)
            return !1
        }
        if (_.default.defined(e.primitive)) {
          var a = e.primitive;
          if (a._noMousePosition)
            return !1;
          if (t && a == t)
            return !1
        }
        return !0
      }
      function f(e, t, i) {
        var a, n = e.pick(t);
        if (e.pickPositionSupported && _.default.defined(n) && h(n, i)) {
          var a = e.pickPosition(t);
          if (_.default.defined(a)) {
            var r = _.default.Cartographic.fromCartesian(a)
              , o = r.height;
            if (o >= 0)
              return a;
            if (!_.default.defined(n.id) && o >= -500)
              return a
          }
        }
        if (e.mode === _.default.SceneMode.SCENE3D) {
          var s = e.camera.getPickRay(t);
          a = e.globe.pick(s, e)
        } else
          a = e.camera.pickEllipsoid(t, e.globe.ellipsoid);
        return a
      }
      function p(e, t) {
        var i = e.scene
          , a = m(i)
          , n = a;
        if (!n) {
          var o = i.globe
            , s = i.camera.positionCartographic.clone()
            , l = o.getHeight(s);
          s.height = l || 0,
            n = _.default.Ellipsoid.WGS84.cartographicToCartesian(s)
        }
        var u = r(n);
        t && (u = e.das.point2wgs(u));
        var d = _.default.Cartesian3.distance(n, e.scene.camera.positionWC);
        return u.cameraZ = d,
          u
      }
      function m(e) {
        var t = e.canvas
          , i = new _.default.Cartesian2(t.clientWidth / 2, t.clientHeight / 2)
          , a = e.camera.getPickRay(i);
        return e.globe.pick(a, e) || e.camera.pickEllipsoid(i)
      }
      function g(e, t) {
        var i = e.camera.computeViewRectangle()
          , a = o(i);
        if (t) {
          var n = e.das.point2wgs({
            x: a.xmin,
            y: a.ymin
          });
          a.xmin = n.x,
            a.ymin = n.y;
          var r = e.das.point2wgs({
            x: a.xmax,
            y: a.ymax
          });
          a.xmax = r.x,
            a.ymax = r.y
        }
        if (a.xmax < a.xmin) {
          var s = a.xmax;
          a.xmax = a.xmin,
            a.xmin = s
        }
        if (a.ymax < a.ymin) {
          var s = a.ymax;
          a.ymax = a.ymin,
            a.ymin = s
        }
        return a
      }
      function v(e, t) {
        var i = e.camera
          , a = i.positionCartographic
          , r = {};
        return r.y = n(_.default.Math.toDegrees(a.latitude), 6),
          r.x = n(_.default.Math.toDegrees(a.longitude), 6),
          r.z = n(a.height, 2),
          r.heading = n(_.default.Math.toDegrees(i.heading || -90), 1),
          r.pitch = n(_.default.Math.toDegrees(i.pitch || 0), 1),
          r.roll = n(_.default.Math.toDegrees(i.roll || 0), 1),
          t && (r = e.das.point2wgs(r)),
          r
      }
      function y(e, t) {
        null == t && (t = s(e));
        var i = P.cartesians2lonlats(e);
        i.push(i[0]);
        var a = C.centerOfMass(C.polygon([i]));
        return _.default.Cartesian3.fromDegrees(a.geometry.coordinates[0], a.geometry.coordinates[1], t)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.aroundPoint = t.windingPoint = void 0,
        t.formatNum = n,
        t.formatPositon = r,
        t.formatRectangle = o,
        t.getMaxHeight = s,
        t.computePolygonHeightRange = l,
        t.addPositionsHeight = u,
        t.setPositionsHeight = d,
        t.updateHeightForClampToGround = c,
        t.getCurrentMousePosition = f,
        t.getCenter = p,
        t.getExtent = g,
        t.getCameraView = v,
        t.centerOfMass = y;
      var w = i(0)
        , _ = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(w)
        , b = i(22)
        , C = a(b)
        , x = i(2)
        , P = a(x);
      t.windingPoint = {
        isStart: !1,
        viewer: null,
        start: function (e, t) {
          this.viewer = e,
            t && t instanceof _.default.Cartesian3 ? this.position = t : (t || (t = p(e)),
              this.position = _.default.Cartesian3.fromDegrees(t.x, t.y, t.z)),
            this.distance = t.distance || _.default.Cartesian3.distance(this.position, e.camera.positionWC),
            this.angle = 360 / (t.time || 60),
            this.time = e.clock.currentTime.clone(),
            this.heading = e.camera.heading,
            this.pitch = e.camera.pitch,
            this.viewer.clock.onTick.addEventListener(this.clock_onTickHandler, this),
            this.isStart = !0
        },
        clock_onTickHandler: function (e) {
          var t = _.default.JulianDate.secondsDifference(this.viewer.clock.currentTime, this.time)
            , i = _.default.Math.toRadians(t * this.angle) + this.heading;
          this.viewer.scene.camera.setView({
            destination: this.position,
            orientation: {
              heading: i,
              pitch: this.pitch
            }
          }),
            this.viewer.scene.camera.moveBackward(this.distance)
        },
        stop: function () {
          this.isStart && (this.viewer && this.viewer.clock.onTick.removeEventListener(this.clock_onTickHandler, this),
            this.isStart = !1)
        }
      },
        t.aroundPoint = {
          isStart: !1,
          viewer: null,
          start: function (e, t) {
            this.viewer = e,
              t && t instanceof _.default.Cartesian3 ? this.position = t : (t || (t = p(e)),
                this.position = _.default.Cartesian3.fromDegrees(t.x, t.y, t.z)),
              this.angle = 360 / (t.time || 60),
              this.time = e.clock.currentTime.clone(),
              this.heading = e.camera.heading,
              this.pitch = e.camera.pitch,
              this.viewer.clock.onTick.addEventListener(this.clock_onTickHandler, this),
              this.isStart = !0
          },
          clock_onTickHandler: function (e) {
            var t = _.default.JulianDate.secondsDifference(this.viewer.clock.currentTime, this.time)
              , i = _.default.Math.toRadians(t * this.angle) + this.heading;
            this.viewer.scene.camera.setView({
              orientation: {
                heading: i,
                pitch: this.pitch
              }
            })
          },
          stop: function () {
            this.isStart && (this.viewer && this.viewer.clock.onTick.removeEventListener(this.clock_onTickHandler, this),
              this.isStart = !1)
          }
        }
    }
    , function (e, t, i) {
      function a(e) {
        var t, i, a, n;
        for (i = 1,
          a = arguments.length; i < a; i++) {
          n = arguments[i];
          for (t in n)
            e[t] = n[t]
        }
        return e
      }
      function n(e, t) {
        var i = Array.prototype.slice;
        if (e.bind)
          return e.bind.apply(e, i.call(arguments, 1));
        var a = i.call(arguments, 2);
        return function () {
          return e.apply(t, a.length ? a.concat(i.call(arguments)) : arguments)
        }
      }
      function r(e) {
        return e._leaflet_id = e._leaflet_id || (t.lastId = O += 1),
          e._leaflet_id
      }
      function o(e, t, i) {
        var a, n, r, o;
        return o = function () {
          a = !1,
            n && (r.apply(i, n),
              n = !1)
        }
          ,
          r = function () {
            a ? n = arguments : (e.apply(i, arguments),
              setTimeout(o, t),
              a = !0)
          }
      }
      function s(e, t, i) {
        var a = t[1]
          , n = t[0]
          , r = a - n;
        return e === a && i ? e : ((e - n) % r + r) % r + n
      }
      function l() {
        return !1
      }
      function u(e, t) {
        return Number(e.toFixed(t || 0))
      }
      function d(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
      }
      function c(e) {
        return d(e).split(/\s+/)
      }
      function h(e, t) {
        e.hasOwnProperty("options") || (e.options = e.options ? A(e.options) : {});
        for (var i in t)
          e.options[i] = t[i];
        return e.options
      }
      function f(e, t, i) {
        var a = [];
        for (var n in e)
          a.push(encodeURIComponent(i ? n.toUpperCase() : n) + "=" + encodeURIComponent(e[n]));
        return (t && -1 !== t.indexOf("?") ? "&" : "?") + a.join("&")
      }
      function p(e, t) {
        return e.replace(L, function (e, i) {
          var a = t[i];
          if (void 0 === a)
            throw new Error("No value provided for variable " + e);
          return "function" == typeof a && (a = a(t)),
            a
        })
      }
      function m(e, t) {
        for (var i = 0; i < e.length; i++)
          if (e[i] === t)
            return i;
        return -1
      }
      function g(e) {
        return window["webkit" + e] || window["moz" + e] || window["ms" + e]
      }
      function v(e) {
        var t = +new Date
          , i = Math.max(0, 16 - (t - F));
        return F = t + i,
          window.setTimeout(e, i)
      }
      function y(e, t, i) {
        if (!i || I !== v)
          return I.call(window, n(e, t));
        e.call(t)
      }
      function w(e) {
        e && N.call(window, e)
      }
      function _(e) {
        if (!e.properties || !e.properties.type)
          return e;
        var t = e.properties.edittype || e.properties.type
          , i = V[t];
        if (!i)
          return e;
        var a = k.clone(e);
        if (e.properties.style) {
          var n = {};
          for (var r in e.properties.style) {
            var o = e.properties.style[r];
            if (null != o) {
              var s = i.style[r];
              s !== o && (n[r] = o)
            }
          }
          a.properties.style = n
        }
        if (e.properties.attr) {
          var l = {};
          for (var r in e.properties.attr) {
            var o = e.properties.attr[r];
            if (null != o) {
              var s = i.attr[r];
              s !== o && (l[r] = o)
            }
          }
          a.properties.attr = l
        }
        return a
      }
      function b(e) {
        var t = V[e.edittype || e.type];
        if (t) {
          e.style = e.style || {};
          for (var i in t.style) {
            var a = e.style[i];
            null == a && (e.style[i] = t.style[i])
          }
          e.attr = e.attr || {};
          for (var i in t.attr) {
            var a = e.attr[i];
            null == a && (e.attr[i] = t.attr[i])
          }
        }
        return e
      }
      function C(e) {
        for (var t = [], i = 0, a = e.length; i < a; i++) {
          var n = x(e[i]);
          t.push(n)
        }
        return t
      }
      function x(e) {
        var t = D.default.Cartographic.fromCartesian(e);
        return null == t ? {} : [u(D.default.Math.toDegrees(t.longitude), 6), u(D.default.Math.toDegrees(t.latitude), 6), u(t.height, 2)]
      }
      function P(e, t) {
        var i = "Feature" === e.type ? e.geometry : e
          , a = i ? i.coordinates : null;
        if (!a && !i)
          return null;
        switch (i.type) {
          case "Point":
            return M(a, t);
          case "MultiPoint":
          case "LineString":
            return S(a, t);
          case "MultiLineString":
          case "Polygon":
            return S(a[0], t);
          case "MultiPolygon":
            return S(a[0][0], t);
          default:
            throw new Error("Invalid GeoJSON object.")
        }
      }
      function M(e, t) {
        return D.default.Cartesian3.fromDegrees(e[0], e[1], e[2] || t || 0)
      }
      function S(e, t) {
        for (var i = [], a = 0, n = e.length; a < n; a++) {
          var r = e[a];
          R(r[0]) ? i.push(S(r, t)) : i.push(M(r, t))
        }
        return i
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.cancelFn = t.requestFn = t.emptyImageUrl = t.isArray = t.lastId = t.create = t.freeze = void 0,
        t.extend = a,
        t.bind = n,
        t.stamp = r,
        t.throttle = o,
        t.wrapNum = s,
        t.falseFn = l,
        t.formatNum = u,
        t.trim = d,
        t.splitWords = c,
        t.setOptions = h,
        t.getParamString = f,
        t.template = p,
        t.indexOf = m,
        t.requestAnimFrame = y,
        t.cancelAnimFrame = w,
        t.removeGeoJsonDefVal = _,
        t.addGeoJsonDefVal = b,
        t.cartesians2lonlats = C,
        t.cartesian2lonlat = x,
        t.getPositionByGeoJSON = P,
        t.lonlat2cartesian = M,
        t.lonlats2cartesians = S;
      var E = i(0)
        , D = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(E)
        , T = i(4)
        , k = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(T);
      t.freeze = Object.freeze;
      Object.freeze = function (e) {
        return e
      }
        ;
      var A = t.create = Object.create || function () {
        function e() { }
        return function (t) {
          return e.prototype = t,
            new e
        }
      }()
        , O = t.lastId = 0
        , L = /\{ *([\w_-]+) *\}/g
        , R = t.isArray = Array.isArray || function (e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        }
        , F = (t.emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
          0)
        , I = t.requestFn = window.requestAnimationFrame || g("RequestAnimationFrame") || v
        , N = t.cancelFn = window.cancelAnimationFrame || g("CancelAnimationFrame") || g("CancelRequestAnimationFrame") || function (e) {
          window.clearTimeout(e)
        }
        , V = {
          label: {
            edittype: "label",
            name: "文字",
            style: {
              text: "文字",
              color: "#ffffff",
              opacity: 1,
              font_family: "楷体",
              font_size: 30,
              border: !0,
              border_color: "#000000",
              border_width: 3,
              background: !1,
              background_color: "#000000",
              background_opacity: .5,
              font_weight: "normal",
              font_style: "normal",
              scaleByDistance: !1,
              scaleByDistance_far: 1e6,
              scaleByDistance_farValue: .1,
              scaleByDistance_near: 1e3,
              scaleByDistance_nearValue: 1,
              distanceDisplayCondition: !1,
              distanceDisplayCondition_far: 1e4,
              distanceDisplayCondition_near: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          point: {
            edittype: "point",
            name: "点标记",
            style: {
              pixelSize: 10,
              color: "#3388ff",
              opacity: 1,
              outline: !0,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              outlineWidth: 2,
              scaleByDistance: !1,
              scaleByDistance_far: 1e6,
              scaleByDistance_farValue: .1,
              scaleByDistance_near: 1e3,
              scaleByDistance_nearValue: 1,
              distanceDisplayCondition: !1,
              distanceDisplayCondition_far: 1e4,
              distanceDisplayCondition_near: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          imagepoint: {
            edittype: "imagepoint",
            name: "图标点标记",
            style: {
              image: "",
              opacity: 1,
              scale: 1,
              rotation: 0,
              scaleByDistance: !1,
              scaleByDistance_far: 1e6,
              scaleByDistance_farValue: .1,
              scaleByDistance_near: 1e3,
              scaleByDistance_nearValue: 1,
              distanceDisplayCondition: !1,
              distanceDisplayCondition_far: 1e4,
              distanceDisplayCondition_near: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          model: {
            edittype: "model",
            name: "模型",
            style: {
              modelUrl: "",
              scale: 1,
              heading: 0,
              pitch: 0,
              roll: 0,
              fill: !1,
              color: "#3388ff",
              opacity: 1,
              silhouette: !1,
              silhouetteColor: "#ffffff",
              silhouetteSize: 2,
              silhouetteAlpha: .8
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          polyline: {
            edittype: "polyline",
            name: "线",
            position: {
              minCount: 2
            },
            style: {
              lineType: "solid",
              color: "#3388ff",
              width: 4,
              clampToGround: !1,
              outline: !1,
              outlineColor: "#ffffff",
              outlineWidth: 2,
              opacity: 1,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          polylineVolume: {
            edittype: "polylineVolume",
            name: "管道线",
            position: {
              height: !0,
              minCount: 2
            },
            style: {
              color: "#00FF00",
              radius: 10,
              shape: "pipeline",
              outline: !1,
              outlineColor: "#ffffff",
              opacity: 1
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          polygon: {
            edittype: "polygon",
            name: "面",
            position: {
              height: !0,
              minCount: 3
            },
            style: {
              fill: !0,
              color: "#3388ff",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              clampToGround: !1,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          polygon_clampToGround: {
            edittype: "polygon_clampToGround",
            name: "贴地面",
            position: {
              height: !1,
              minCount: 3
            },
            style: {
              color: "#ffff00",
              opacity: .6,
              clampToGround: !0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          extrudedPolygon: {
            edittype: "extrudedPolygon",
            name: "拉伸面",
            position: {
              height: !0,
              minCount: 3
            },
            style: {
              fill: !0,
              color: "#00FF00",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              extrudedHeight: 100,
              perPositionHeight: !0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          rectangle: {
            edittype: "rectangle",
            name: "矩形",
            position: {
              height: !1,
              minCount: 2,
              maxCount: 2
            },
            style: {
              height: 0,
              fill: !0,
              color: "#3388ff",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              rotation: 0,
              clampToGround: !1,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          rectangle_clampToGround: {
            edittype: "rectangle_clampToGround",
            name: "贴地矩形",
            position: {
              height: !1,
              minCount: 2,
              maxCount: 2
            },
            style: {
              color: "#ffff00",
              opacity: .6,
              rotation: 0,
              clampToGround: !0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          rectangleImg: {
            edittype: "rectangleImg",
            name: "贴地图片",
            position: {
              height: !1,
              minCount: 2,
              maxCount: 2
            },
            style: {
              image: "",
              opacity: 1,
              rotation: 0,
              clampToGround: !0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          extrudedRectangle: {
            edittype: "extrudedRectangle",
            name: "拉伸矩形",
            position: {
              height: !1,
              minCount: 2,
              maxCount: 2
            },
            style: {
              extrudedHeight: 40,
              height: 0,
              fill: !0,
              color: "#00FF00",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              rotation: 0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          ellipse: {
            edittype: "ellipse",
            name: "椭圆",
            position: {
              height: !1
            },
            style: {
              semiMinorAxis: 200,
              semiMajorAxis: 200,
              height: 0,
              fill: !0,
              color: "#3388ff",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              rotation: 0,
              clampToGround: !1,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          ellipse_clampToGround: {
            edittype: "ellipse_clampToGround",
            name: "椭圆",
            position: {
              height: !1
            },
            style: {
              semiMinorAxis: 200,
              semiMajorAxis: 200,
              color: "#ffff00",
              opacity: .6,
              rotation: 0,
              clampToGround: !0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          extrudedEllipse: {
            edittype: "extrudedEllipse",
            name: "圆柱体",
            position: {
              height: !1
            },
            style: {
              semiMinorAxis: 200,
              semiMajorAxis: 200,
              extrudedHeight: 200,
              height: 0,
              fill: !0,
              color: "#00FF00",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6,
              rotation: 0,
              zIndex: 0
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          ellipsoid: {
            edittype: "ellipsoid",
            name: "球体",
            style: {
              extentRadii: 200,
              widthRadii: 200,
              heightRadii: 200,
              fill: !0,
              color: "#00FF00",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          },
          wall: {
            edittype: "wall",
            name: "墙体",
            position: {
              height: !0,
              minCount: 2
            },
            style: {
              extrudedHeight: 40,
              fill: !0,
              color: "#00FF00",
              opacity: .6,
              outline: !0,
              outlineWidth: 1,
              outlineColor: "#ffffff",
              outlineOpacity: .6
            },
            attr: {
              id: "",
              name: "",
              remark: ""
            }
          }
        }
    }
    , function (e, t, i) {
      function a(e) {
        var t = document.createElement("DIV");
        t.className = "draw-tooltip right";
        var i = document.createElement("DIV");
        i.className = "draw-tooltip-arrow",
          t.appendChild(i);
        var a = document.createElement("DIV");
        a.className = "draw-tooltip-inner",
          t.appendChild(a),
          this._div = t,
          this._title = a,
          e.appendChild(t),
          (0,
            r.default)(".draw-tooltip").mouseover(function () {
              (0,
                r.default)(this).hide()
            })
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.message = void 0,
        t.Tooltip = a;
      var n = i(5)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n);
      t.message = {
        draw: {
          point: {
            start: "单击 完成绘制"
          },
          polyline: {
            start: "单击 开始绘制",
            cont: "单击增加点，右击删除点",
            end: "单击增加点，右击删除点<br/>双击完成绘制",
            end2: "单击完成绘制"
          }
        },
        edit: {
          start: "单击后 激活编辑<br/>右击 单击菜单删除",
          end: "释放后 完成修改"
        },
        dragger: {
          def: "拖动 修改位置",
          addMidPoint: "拖动 增加点",
          moveHeight: "拖动 修改高度",
          editRadius: "拖动 修改半径",
          editHeading: "拖动 修改方向",
          editScale: "拖动 修改缩放比例"
        },
        del: {
          def: "<br/>右击 删除该点",
          min: "无法删除，点数量不能少于"
        }
      };
      a.prototype.setVisible = function (e) {
        this._div.style.display = e ? "block" : "none"
      }
        ,
        a.prototype.showAt = function (e, t) {
          e && t ? (this.setVisible(!0),
            this._title.innerHTML = t,
            this._div.style.top = e.y - this._div.clientHeight / 2 + "px",
            this._div.style.left = e.x + 30 + "px") : this.setVisible(!1)
        }
    }
    , function (e, t, i) {
      function a(e) {
        return "number" == typeof e && e.constructor == Number
      }
      function n(e) {
        return "string" == typeof e && e.constructor == String
      }
      function r(e, t) {
        window.haoutil && window.haoutil.alert ? window.haoutil.alert(e, t) : window.layer ? layer.alert(e, {
          title: t || "提示",
          skin: "layui-layer-lan layer-das-dialog",
          closeBtn: 0,
          anim: 0
        }) : r(e)
      }
      function o(e) {
        window.haoutil && window.haoutil.msg ? window.haoutil.msg(e) : window.toastr ? toastr.info(e) : window.layer ? layer.msg(e) : r(e)
      }
      function s() {
        var e = location.search
          , t = new Object;
        if (-1 != e.indexOf("?"))
          for (var i = e.substr(1), a = i.split("&"), n = 0; n < a.length; n++)
            t[a[n].split("=")[0]] = decodeURI(a[n].split("=")[1]);
        return t
      }
      function l(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i")
          , i = window.location.search.substr(1).match(t);
        return null != i ? decodeURI(i[2]) : null
      }
      function u(e, t) {
        if (null == t && (t = 5),
          null == e || "object" != (void 0 === e ? "undefined" : b(e)))
          return e;
        if (e instanceof Date) {
          var i = new Date;
          return i.setTime(e.getTime()),
            i
        }
        if (e instanceof Array && t >= 0) {
          for (var i = [], a = 0, n = e.length; a < n; ++a)
            i[a] = u(e[a], t - 1);
          return i
        }
        if ("object" === (void 0 === e ? "undefined" : b(e)) && t >= 0) {
          var i = {};
          for (var r in e)
            "function" != typeof r && "_layer" != r && "_layers" != r && "_parent" != r && e.hasOwnProperty(r) && (i[r] = u(e[r], t - 1));
          return i
        }
        return e
      }
      function d(e, t) {
        if (null == e)
          return e;
        for (var i in t) {
          var a = t[i];
          null != a && "Null" != a && "Unknown" != a || (a = ""),
            e = e.replace(new RegExp("{" + i + "}", "gm"), a)
        }
        return e
      }
      function c() {
        var e = navigator.userAgent.toLowerCase()
          , t = "ipad" == e.match(/ipad/i)
          , i = "iphone" == e.match(/iphone/i)
          , a = "midp" == e.match(/midp/i)
          , n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
          , r = "ucweb" == e.match(/ucweb/i)
          , o = "android" == e.match(/android/i)
          , s = "windows ce" == e.match(/windows ce/i)
          , l = "windows mobile" == e.match(/windows mobile/i);
        return !(t || i || a || n || r || o || s || l)
      }
      function h() {
        var e = window.navigator.userAgent.toLowerCase();
        if (e.indexOf("msie") >= 0) {
          var t = Number(e.match(/msie ([\d]+)/)[1]);
          return {
            type: "IE",
            version: t
          }
        }
        if (e.indexOf("firefox") >= 0) {
          var t = Number(e.match(/firefox\/([\d]+)/)[1]);
          return {
            type: "Firefox",
            version: t
          }
        }
        if (e.indexOf("chrome") >= 0) {
          var t = Number(e.match(/chrome\/([\d]+)/)[1]);
          return {
            type: "Chrome",
            version: t
          }
        }
        if (e.indexOf("opera") >= 0) {
          var t = Number(e.match(/opera.([\d]+)/)[1]);
          return {
            type: "Opera",
            version: t
          }
        }
        if (e.indexOf("Safari") >= 0) {
          var t = Number(e.match(/version\/([\d]+)/)[1]);
          return {
            type: "Safari",
            version: t
          }
        }
        return {
          type: e,
          version: -1
        }
      }
      function f() {
        var e = h();
        if ("IE" == e.type && e.version < 11)
          return !1;
        try {
          var t, i = document.createElement("canvas");
          if ("undefined" != typeof WebGL2RenderingContext && (t = i.getContext("webgl2") || i.getContext("experimental-webgl2") || void 0),
            null == t && (t = i.getContext("webgl") || i.getContext("experimental-webgl") || void 0),
            null == t)
            return !1
        } catch (e) {
          return !1
        }
        return !0
      }
      function p(e) {
        var t = e.viewer
          , i = e.positions;
        if (null == i || 0 == i.length)
          return void (e.calback && e.calback(i));
        for (var a = x.default.PolylinePipeline.generateArc({
          positions: i,
          granularity: e.granularity || 1e-5
        }), n = [], r = t.scene.globe.ellipsoid, o = 0; o < a.length; o += 3) {
          var s = x.default.Cartesian3.unpack(a, o);
          n.push(r.cartesianToCartographic(s))
        }
        var l = x.default.Cartographic.fromCartesian(i[0]).height;
        x.default.when(x.default.sampleTerrainMostDetailed(t.terrainProvider, n), function (a) {
          for (var n = !1, o = e.offset || 2, s = 0; s < a.length; ++s)
            null == a[s].height ? (n = !0,
              a[s].height = l) : a[s].height = o + a[s].height * t.scene._terrainExaggeration;
          var u = r.cartographicArrayToCartesianArray(a);
          e.calback ? e.calback(u, n) : i.setValue && i.setValue(u)
        })
      }
      function m(e) {
        if (!e.proxy || !e.url)
          return e;
        if (e.url instanceof x.default.Resource)
          return e;
        var t = {};
        for (var i in e)
          t[i] = e[i];
        return t.url = new x.default.Resource({
          url: t.url,
          proxy: new x.default.DefaultProxy(t.proxy)
        }),
          t
      }
      function g() {
        return P
      }
      function v(e) {
        e.hasOwnProperty("requestWaterMask") || (e.requestWaterMask = !0),
          e.hasOwnProperty("requestVertexNormals") || (e.requestVertexNormals = !0);
        return "ion" == e.type || "ion" == e.url || "" == e.url || null == e.url ? new x.default.CesiumTerrainProvider({
          url: x.default.IonResource.fromAssetId(1)
        }) : "ellipsoid" == e.type || "ellipsoid" == e.url ? P : "gee" == e.type ? new x.default.GoogleEarthEnterpriseTerrainProvider({
          metadata: new x.default.GoogleEarthEnterpriseMetadata(m(e))
        }) : new x.default.CesiumTerrainProvider(m(e))
      }
      function y(e, t) {
        e = t.das.point2map(e);
        var i = x.default.Cartesian3.fromDegrees(e.x, e.y, e.z || 0)
          , a = x.default.Math.toRadians(e.heading || 0)
          , n = x.default.Math.toRadians(e.pitch || 0)
          , r = x.default.Math.toRadians(e.roll || 0)
          , o = new x.default.HeadingPitchRoll(a, n, r)
          , s = e.converter || x.default.Transforms.eastNorthUpToFixedFrame
          , l = x.default.Transforms.headingPitchRollQuaternion(i, o, t.scene.globe.ellipsoid, s);
        return t.entities.add({
          name: e.name || "",
          position: i,
          orientation: l,
          model: e,
          tooltip: e.tooltip,
          popup: e.popup
        })
      }
      function w(e) {
        e = Math.abs(e);
        var t = Math.floor(e);
        return t + "° " + Math.floor(60 * (e - t)) + "'  " + Math.round(3600 * (e - t) % 60) + '"'
      }
      function _(e, t, i, a) {
        var n = []
          , r = x.default.Cartographic.fromCartesian(e)
          , o = x.default.Cartographic.fromCartesian(t)
          , s = 180 * r.longitude / Math.PI
          , l = 180 * r.latitude / Math.PI
          , u = 180 * o.longitude / Math.PI
          , d = 180 * o.latitude / Math.PI
          , c = Math.sqrt((s - u) * (s - u) + (l - d) * (l - d))
          , h = c * i
          , f = x.default.Cartesian3.clone(e)
          , p = x.default.Cartesian3.clone(t)
          , m = x.default.Cartesian3.distance(f, x.default.Cartesian3.ZERO)
          , g = x.default.Cartesian3.distance(p, x.default.Cartesian3.ZERO);
        if (x.default.Cartesian3.normalize(f, f),
          x.default.Cartesian3.normalize(p, p),
          0 == x.default.Cartesian3.distance(f, p))
          return n;
        var v = x.default.Cartesian3.angleBetween(f, p);
        n.push(e);
        for (var y = 1; y < a - 1; y++) {
          var w = 1 * y / (a - 1)
            , _ = 1 - w
            , b = Math.sin(_ * v) / Math.sin(v)
            , C = Math.sin(w * v) / Math.sin(v)
            , P = x.default.Cartesian3.multiplyByScalar(f, b, new x.default.Cartesian3)
            , M = x.default.Cartesian3.multiplyByScalar(p, C, new x.default.Cartesian3)
            , S = x.default.Cartesian3.add(P, M, new x.default.Cartesian3)
            , E = w * Math.PI
            , D = m * _ + g * w + Math.sin(E) * h;
          S = x.default.Cartesian3.multiplyByScalar(S, D, S),
            n.push(S)
        }
        return n.push(t),
          n
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var b = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        ;
      t.isNumber = a,
        t.isString = n,
        t.alert = r,
        t.msg = o,
        t.getRequest = s,
        t.getRequestByName = l,
        t.clone = u,
        t.template = d,
        t.isPCBroswer = c,
        t.getExplorerInfo = h,
        t.webglreport = f,
        t.terrainPolyline = p,
        t.getProxyUrl = m,
        t.getEllipsoidTerrain = g,
        t.getTerrainProvider = v,
        t.createModel = y,
        t.formatDegree = w,
        t.getLinkedPointList = _;
      var C = i(0)
        , x = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(C)
        , P = new x.default.EllipsoidTerrainProvider({
          ellipsoid: x.default.Ellipsoid.WGS84
        })
    }
    , function (e, t) {
      e.exports = __WEBPACK_EXTERNAL_MODULE_5__
    }
    , function (e, t, i) {
      function a(e, t) {
        switch (e) {
          case u.AddMidPoint:
            t.color = d.AddMidPoint,
              t.outlineColor = new o.default.Color.fromCssColorString("#ffffff").withAlpha(.4);
            break;
          case u.MoveHeight:
            t.color = d.MoveHeight;
            break;
          case u.EditAttr:
            t.color = d.EditAttr;
            break;
          case u.Control:
          default:
            t.color = d.Control
        }
        return t
      }
      function n(e, t) {
        var i;
        if (t.dragger)
          i = t.dragger;
        else {
          var n = {
            scale: 1,
            pixelSize: l,
            outlineColor: new o.default.Color.fromCssColorString("#ffffff").withAlpha(.5),
            outlineWidth: 2,
            scaleByDistance: new o.default.NearFarScalar(1e3, 1, 1e6, .5),
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          };
          n = a(t.type, n),
            i = e.entities.add({
              position: o.default.defaultValue(t.position, o.default.Cartesian3.ZERO),
              point: n,
              draw_tooltip: t.tooltip || s.message.dragger.def
            })
        }
        return i._isDragger = !0,
          i._pointType = t.type || u.Control,
          i.onDragStart = o.default.defaultValue(t.onDragStart, null),
          i.onDrag = o.default.defaultValue(t.onDrag, null),
          i.onDragEnd = o.default.defaultValue(t.onDragEnd, null),
          i
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.PointColor = t.PointType = t.PixelSize = void 0,
        t.createDragger = n;
      var r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = i(3)
        , l = t.PixelSize = 12
        , u = t.PointType = {
          Control: 1,
          AddMidPoint: 2,
          MoveHeight: 3,
          EditAttr: 4,
          EditRotation: 5
        }
        , d = t.PointColor = {
          Control: new o.default.Color.fromCssColorString("#1c197d"),
          MoveHeight: new o.default.Color.fromCssColorString("#9500eb"),
          EditAttr: new o.default.Color.fromCssColorString("#f73163"),
          AddMidPoint: new o.default.Color.fromCssColorString("#04c2c9").withAlpha(.3)
        }
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.DrawStart = "draw-start",
        t.DrawAddPoint = "draw-add-point",
        t.DrawRemovePoint = "draw-remove-lastpoint",
        t.DrawMouseMove = "draw-mouse-move",
        t.DrawCreated = "draw-created",
        t.EditStart = "edit-start",
        t.EditMovePoint = "edit-move-point",
        t.EditRemovePoint = "edit-remove-point",
        t.EditStop = "edit-stop"
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawPolyline = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(21)
        , s = i(1)
        , l = i(7)
        , u = a(l)
        , d = i(3)
        , c = i(10)
        , h = a(c)
        , f = i(13);
      t.DrawPolyline = o.DrawBase.extend({
        type: "polyline",
        _minPointNum: 2,
        _maxPointNum: 9999,
        createFeature: function (e) {
          this._positions_draw = [],
            e.config ? (this._minPointNum = e.config.minPointNum || 2,
              this._maxPointNum = e.config.maxPointNum || 9999) : (this._minPointNum = 2,
                this._maxPointNum = 9999);
          var t = this
            , i = {
              polyline: h.style2Entity(e.style),
              attribute: e
            };
          return i.polyline.positions = new r.default.CallbackProperty(function (e) {
            return t.getDrawPosition()
          }
            , !1),
            this.entity = this.dataSource.entities.add(i),
            this.entity._positions_draw = this._positions_draw,
            this.entity
        },
        style2Entity: function (e, t) {
          return h.style2Entity(e, t.polyline)
        },
        bindEvent: function () {
          var e = this
            , t = !1;
          this.getHandler().setInputAction(function (i) {
            var a = (0,
              s.getCurrentMousePosition)(e.viewer.scene, i.position, e.entity);
            a && (t && e._positions_draw.pop(),
              t = !1,
              e.entity.attribute && e.entity.attribute.config && e.entity.attribute.config.addHeight && (a = (0,
                s.addPositionsHeight)(a, e.entity.attribute.config.addHeight)),
              e._positions_draw.push(a),
              e.updateAttrForDrawing(),
              e.fire(u.DrawAddPoint, {
                drawtype: e.type,
                entity: e.entity,
                position: a,
                positions: e._positions_draw
              }),
              e._positions_draw.length >= e._maxPointNum && e.disable())
          }, r.default.ScreenSpaceEventType.LEFT_CLICK),
            this.getHandler().setInputAction(function (i) {
              e._positions_draw.pop();
              var a = (0,
                s.getCurrentMousePosition)(e.viewer.scene, i.position, e.entity);
              a && (t && e._positions_draw.pop(),
                t = !0,
                e.fire(u.DrawRemovePoint, {
                  drawtype: e.type,
                  entity: e.entity,
                  position: a,
                  positions: e._positions_draw
                }),
                e._positions_draw.push(a),
                e.updateAttrForDrawing())
            }, r.default.ScreenSpaceEventType.RIGHT_CLICK),
            this.getHandler().setInputAction(function (i) {
              e._positions_draw.length <= 1 ? e.tooltip.showAt(i.endPosition, d.message.draw.polyline.start) : e._positions_draw.length < e._minPointNum ? e.tooltip.showAt(i.endPosition, d.message.draw.polyline.cont) : e._positions_draw.length >= e._maxPointNum ? e.tooltip.showAt(i.endPosition, d.message.draw.polyline.end2) : e.tooltip.showAt(i.endPosition, d.message.draw.polyline.end);
              var a = (0,
                s.getCurrentMousePosition)(e.viewer.scene, i.endPosition, e.entity);
              a && (t && e._positions_draw.pop(),
                t = !0,
                e._positions_draw.push(a),
                e.updateAttrForDrawing(),
                e.fire(u.DrawMouseMove, {
                  drawtype: e.type,
                  entity: e.entity,
                  position: a,
                  positions: e._positions_draw
                }))
            }, r.default.ScreenSpaceEventType.MOUSE_MOVE),
            this.getHandler().setInputAction(function (t) {
              e._positions_draw.pop(),
                e._positions_draw.length < e._minPointNum || (e.updateAttrForDrawing(),
                  e.disable())
            }, r.default.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
        },
        getEditClass: function (e) {
          var t = new f.EditPolyline(e, this.viewer, this.dataSource);
          return t._minPointNum = this._minPointNum,
            t._maxPointNum = this._maxPointNum,
            this._bindEdit(t)
        },
        getAttrClass: function () {
          return h
        },
        finish: function () {
          var e = this.entity;
          e.editing = this.getEditClass(e),
            e._positions_draw = this.getDrawPosition(),
            e.polyline.positions = new r.default.CallbackProperty(function (t) {
              return e._positions_draw
            }
              , !1)
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.BaseLayer = void 0;
      var a = i(11)
        , n = i(4)
        , r = a.Class.extend({
          config: {},
          viewer: null,
          initialize: function (e, t) {
            this.viewer = t,
              this.config = e,
              this.name = e.name,
              this.config.hasOwnProperty("alpha") ? this._opacity = Number(this.config.alpha) : this.config.hasOwnProperty("opacity") && (this._opacity = Number(this.config.opacity)),
              this.config.hasOwnProperty("hasOpacity") && (this.hasOpacity = this.config.hasOpacity),
              this.create(),
              e.visible ? this.setVisible(!0) : this._visible = !1,
              e.visible && e.flyTo && this.centerAt(0)
          },
          create: function () { },
          showError: function (e, t) {
            t || (t = "未知错误"),
              this.viewer && this.viewer.cesiumWidget.showErrorPanel(e, void 0, t),
              console.log("layer错误:" + e + t)
          },
          _visible: null,
          getVisible: function () {
            return this._visible
          },
          setVisible: function (e) {
            null != this._visible && this._visible == e || (this._visible = e,
              e ? (this.config.msg && (0,
                n.msg)(this.config.msg),
                this.add()) : this.remove())
          },
          add: function () {
            this._visible = !0,
              this.config.onAdd && this.config.onAdd()
          },
          remove: function () {
            this._visible = !1,
              this.config.onRemove && this.config.onRemove()
          },
          centerAt: function (e) {
            this.config.extent || this.config.center ? this.viewer.das.centerAt(this.config.extent || this.config.center, {
              duration: e,
              isWgs84: !0
            }) : this.config.onCenterAt && this.config.onCenterAt(e)
          },
          hasOpacity: !1,
          _opacity: 1,
          setOpacity: function (e) {
            this.config.onSetOpacity && this.config.onSetOpacity(e)
          },
          hasZIndex: !1,
          setZIndex: function (e) {
            this.config.onSetZIndex && this.config.onSetZIndex(e)
          },
          destroy: function () {
            this.setVisible(!1)
          }
        });
      t.BaseLayer = r
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function n(e, t) {
        e = e || {},
          null == t && (t = {});
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "lineType":
            case "color":
            case "opacity":
            case "outline":
            case "outlineWidth":
            case "outlineColor":
            case "outlineOpacity":
            case "flowDuration":
            case "flowImage":
          }
        }
        if (e.color || e.lineType) {
          var n = new d.default.Color.fromCssColorString(e.color || "#FFFF00").withAlpha(Number(d.default.defaultValue(e.opacity, 1)));
          switch (e.lineType) {
            default:
            case "solid":
              e.outline ? t.material = new d.default.PolylineOutlineMaterialProperty({
                color: n,
                outlineWidth: Number(e.outlineWidth || 1),
                outlineColor: new d.default.Color.fromCssColorString(e.outlineColor || "#FFFF00").withAlpha(Number(e.outlineOpacity || e.opacity || 1))
              }) : t.material = n;
              break;
            case "dash":
              e.outline ? t.material = new d.default.PolylineDashMaterialProperty({
                dashLength: e.dashLength || e.outlineWidth || 16,
                color: n,
                gapColor: new d.default.Color.fromCssColorString(e.outlineColor || "#FFFF00").withAlpha(Number(e.outlineOpacity || e.opacity || 1))
              }) : t.material = new d.default.PolylineDashMaterialProperty({
                dashLength: e.dashLength || 16,
                color: n
              });
              break;
            case "glow":
              t.material = new d.default.PolylineGlowMaterialProperty({
                glowPower: e.glowPower || .1,
                color: n
              });
              break;
            case "arrow":
              t.material = new d.default.PolylineArrowMaterialProperty(n);
              break;
            case "animation":
              t.material = new m.LineFlowMaterial({
                color: n,
                duration: e.animationDuration || 2e3,
                url: e.animationImage
              })
          }
        }
        return t
      }
      function r(e) {
        return e._positions_draw && e._positions_draw.length > 0 ? e._positions_draw : e.polyline.positions.getValue()
      }
      function o(e) {
        var t = r(e);
        return p.cartesians2lonlats(t)
      }
      function s(e) {
        var t = o(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "LineString",
            coordinates: t
          }
        }
      }
      function l(e) {
        if (!h)
          return e;
        var t = e.map(function (e) {
          return p.cartesian2lonlat(e)
        })
          , i = t[t.length - 1][2]
          , a = h.lineString(t)
          , n = h.bezierSpline(a);
        return p.lonlats2cartesians(n.geometry.coordinates, i)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = n,
        t.getPositions = r,
        t.getCoordinates = o,
        t.toGeoJSON = s,
        t.line2curve = l;
      var u = i(0)
        , d = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(u)
        , c = i(22)
        , h = a(c)
        , f = i(2)
        , p = a(f)
        , m = i(25)
    }
    , function (e, t, i) {
      function a() { }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.Class = a;
      var n = i(2)
        , r = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(n);
      a.extend = function (e) {
        var t = function () {
          this.initialize && this.initialize.apply(this, arguments),
            this.callInitHooks()
        }
          , i = t.__super__ = this.prototype
          , a = r.create(i);
        a.constructor = t,
          t.prototype = a;
        for (var n in this)
          this.hasOwnProperty(n) && "prototype" !== n && "__super__" !== n && (t[n] = this[n]);
        return e.statics && (r.extend(t, e.statics),
          delete e.statics),
          e.includes && (r.extend.apply(null, [a].concat(e.includes)),
            delete e.includes),
          a.options && (e.options = r.extend(r.create(a.options), e.options)),
          r.extend(a, e),
          a._initHooks = [],
          a.callInitHooks = function () {
            if (!this._initHooksCalled) {
              i.callInitHooks && i.callInitHooks.call(this),
                this._initHooksCalled = !0;
              for (var e = 0, t = a._initHooks.length; e < t; e++)
                a._initHooks[e].call(this)
            }
          }
          ,
          t
      }
        ,
        a.include = function (e) {
          return r.extend(this.prototype, e),
            this
        }
        ,
        a.mergeOptions = function (e) {
          return r.extend(this.prototype.options, e),
            this
        }
        ,
        a.addInitHook = function (e) {
          var t = Array.prototype.slice.call(arguments, 1)
            , i = "function" == typeof e ? e : function () {
              this[e].apply(this, t)
            }
            ;
          return this.prototype._initHooks = this.prototype._initHooks || [],
            this.prototype._initHooks.push(i),
            this
        }
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            scale: 1,
            horizontalOrigin: l.default.HorizontalOrigin.CENTER,
            verticalOrigin: l.default.VerticalOrigin.BOTTOM
          });
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "font_style":
            case "font_weight":
            case "font_size":
            case "font_family":
            case "scaleByDistance_near":
            case "scaleByDistance_nearValue":
            case "scaleByDistance_far":
            case "scaleByDistance_farValue":
            case "distanceDisplayCondition_far":
            case "distanceDisplayCondition_near":
            case "background_opacity":
            case "pixelOffsetY":
              break;
            case "text":
              t.text = a.replace(new RegExp("<br />", "gm"), "\n");
              break;
            case "color":
              t.fillColor = new l.default.Color.fromCssColorString(a || "#ffffff").withAlpha(Number(e.opacity || 1));
              break;
            case "border":
              t.style = a ? l.default.LabelStyle.FILL_AND_OUTLINE : l.default.LabelStyle.FILL;
              break;
            case "border_color":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#000000").withAlpha(Number(e.opacity || 1));
              break;
            case "border_width":
              t.outlineWidth = a;
              break;
            case "background":
              t.showBackground = a;
              break;
            case "background_color":
              t.backgroundColor = new l.default.Color.fromCssColorString(a || "#000000").withAlpha(Number(e.background_opacity || e.opacity || .5));
              break;
            case "pixelOffset":
              t.pixelOffset = new l.default.Cartesian2(e.pixelOffset[0], e.pixelOffset[1]);
              break;
            case "hasPixelOffset":
              a || (t.pixelOffset = new l.default.Cartesian2(0, 0));
              break;
            case "pixelOffsetX":
              t.pixelOffset = new l.default.Cartesian2(a, e.pixelOffsetY);
              break;
            case "scaleByDistance":
              t.scaleByDistance = a ? new l.default.NearFarScalar(Number(e.scaleByDistance_near || 1e3), Number(e.scaleByDistance_nearValue || 1), Number(e.scaleByDistance_far || 1e6), Number(e.scaleByDistance_farValue || .1)) : null;
              break;
            case "distanceDisplayCondition":
              t.distanceDisplayCondition = a ? new l.default.DistanceDisplayCondition(Number(e.distanceDisplayCondition_near || 0), Number(e.distanceDisplayCondition_far || 1e5)) : null;
              break;
            case "heightReference":
              switch (a) {
                case "NONE":
                  t.heightReference = l.default.HeightReference.NONE;
                  break;
                case "CLAMP_TO_GROUND":
                  t.heightReference = l.default.HeightReference.CLAMP_TO_GROUND;
                  break;
                case "RELATIVE_TO_GROUND":
                  t.heightReference = l.default.HeightReference.RELATIVE_TO_GROUND;
                  break;
                default:
                  t.heightReference = a
              }
              break;
            case "visibleDepth":
              t.disableDepthTestDistance = a ? 0 : Number.POSITIVE_INFINITY
          }
        }
        var n = (e.font_style || "normal") + " small-caps " + (e.font_weight || "normal") + " " + (e.font_size || "25") + "px " + (e.font_family || "楷体");
        return t.font = n,
          t
      }
      function n(e) {
        return [e.position.getValue()]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Point",
            coordinates: t[0]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditPolyline = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(6)
        , s = a(o)
        , l = i(3)
        , u = i(18)
        , d = i(2)
        , c = (a(d),
          i(1));
      t.EditPolyline = u.EditBase.extend({
        _positions_draw: [],
        getPosition: function () {
          return this._positions_draw
        },
        setPositions: function (e) {
          this._positions_draw = e,
            this.updateAttrForEditing()
        },
        changePositionsToCallback: function () {
          this._positions_draw = this.entity._positions_draw || this.entity.polyline.positions.getValue()
        },
        finish: function () {
          this.entity._positions_draw = this.getPosition()
        },
        isClampToGround: function () {
          return this.entity.attribute.style.clampToGround
        },
        bindDraggers: function () {
          for (var e = this, t = this.isClampToGround(), i = this.getPosition(), a = i.length < this._maxPointNum, n = 0, o = i.length; n < o; n++) {
            var u = i[n];
            t && (u = (0,
              c.updateHeightForClampToGround)(this.viewer, u),
              i[n] = u);
            var d = s.createDragger(this.dataSource, {
              position: u,
              onDrag: function (n, o) {
                if (i[n.index] = o,
                  a) {
                  if (n.index > 0) {
                    var s = r.default.Cartesian3.midpoint(o, i[n.index - 1], new r.default.Cartesian3);
                    t && (s = (0,
                      c.updateHeightForClampToGround)(e.viewer, s)),
                      e.draggers[2 * n.index - 1].position = s
                  }
                  if (n.index < i.length - 1) {
                    var s = r.default.Cartesian3.midpoint(o, i[n.index + 1], new r.default.Cartesian3);
                    t && (s = (0,
                      c.updateHeightForClampToGround)(e.viewer, s)),
                      e.draggers[2 * n.index + 1].position = s
                  }
                }
              }
            });
            if (d.index = n,
              this.draggers.push(d),
              a) {
              var h = n + 1;
              if (h < o) {
                var f = r.default.Cartesian3.midpoint(u, i[h], new r.default.Cartesian3);
                t && (f = (0,
                  c.updateHeightForClampToGround)(this.viewer, f));
                var d = s.createDragger(this.dataSource, {
                  position: f,
                  type: s.PointType.AddMidPoint,
                  tooltip: l.message.dragger.addMidPoint,
                  onDragStart: function (e, t) {
                    i.splice(e.index, 0, t)
                  },
                  onDrag: function (e, t) {
                    i[e.index] = t
                  },
                  onDragEnd: function (t, i) {
                    e.updateDraggers()
                  }
                });
                d.index = h,
                  this.draggers.push(d)
              }
            }
          }
        }
      })
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            scale: 1,
            horizontalOrigin: l.default.HorizontalOrigin.CENTER,
            verticalOrigin: l.default.VerticalOrigin.BOTTOM
          });
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "scaleByDistance_near":
            case "scaleByDistance_nearValue":
            case "scaleByDistance_far":
            case "scaleByDistance_farValue":
            case "distanceDisplayCondition_far":
            case "distanceDisplayCondition_near":
              break;
            case "opacity":
              t.color = new l.default.Color.fromCssColorString("#FFFFFF").withAlpha(Number(a || 1));
              break;
            case "rotation":
              t.rotation = l.default.Math.toRadians(a);
              break;
            case "scaleByDistance":
              t.scaleByDistance = a ? new l.default.NearFarScalar(Number(e.scaleByDistance_near || 1e3), Number(e.scaleByDistance_nearValue || 1), Number(e.scaleByDistance_far || 1e6), Number(e.scaleByDistance_farValue || .1)) : null;
              break;
            case "distanceDisplayCondition":
              t.distanceDisplayCondition = a ? new l.default.DistanceDisplayCondition(Number(e.distanceDisplayCondition_near || 0), Number(e.distanceDisplayCondition_far || 1e5)) : null;
              break;
            case "heightReference":
              switch (a) {
                case "NONE":
                  t.heightReference = l.default.HeightReference.NONE;
                  break;
                case "CLAMP_TO_GROUND":
                  t.heightReference = l.default.HeightReference.CLAMP_TO_GROUND;
                  break;
                case "RELATIVE_TO_GROUND":
                  t.heightReference = l.default.HeightReference.RELATIVE_TO_GROUND;
                  break;
                default:
                  t.heightReference = a
              }
              break;
            case "visibleDepth":
              t.disableDepthTestDistance = a ? 0 : Number.POSITIVE_INFINITY
          }
        }
        return t
      }
      function n(e) {
        return [e.position.getValue()]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Point",
            coordinates: t[0]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            fill: !0,
            classificationType: l.default.ClassificationType.BOTH
          });
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
              break;
            case "color":
              t.material = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(Number(e.opacity || 1));
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || e.color || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "extrudedHeight":
              var n = 0;
              t.hierarchy && (n = (0,
                c.getMaxHeight)(t.hierarchy.getValue ? t.hierarchy.getValue() : t.hierarchy)),
                t.extrudedHeight = Number(a) + n;
              break;
            case "clampToGround":
              t.perPositionHeight = !a
          }
        }
        return null == e.color && (t.material = l.default.Color.fromRandom({
          minimumGreen: .75,
          maximumBlue: .75,
          alpha: Number(e.opacity || 1)
        })),
          t
      }
      function n(e) {
        var t = e.polygon.hierarchy.getValue();
        return t.positions && d.isArray(t.positions) ? t.positions : t
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return t.length > 0 && t.push(t[0]),
        {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Polygon",
            coordinates: [t]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
        , c = i(1)
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.Draw = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(48)
        , s = i(3)
        , l = i(4)
        , u = a(l)
        , d = i(2)
        , c = a(d)
        , h = i(7)
        , f = a(h)
        , p = i(17)
        , m = i(50)
        , g = i(51)
        , v = i(52)
        , y = i(8)
        , w = i(53)
        , _ = i(55)
        , b = i(57)
        , C = i(60)
        , x = i(61)
        , P = i(63)
        , M = i(65)
        , S = i(67)
        , E = i(69)
        , D = t.Draw = o.Evented.extend({
          dataSource: null,
          primitives: null,
          drawCtrl: null,
          initialize: function (e, t) {
            this.viewer = e,
              this.options = t || {},
              this.dataSource = new r.default.CustomDataSource,
              this.viewer.dataSources.add(this.dataSource),
              this.primitives = new r.default.PrimitiveCollection,
              this.viewer.scene.primitives.add(this.primitives),
              r.default.defaultValue(this.options.removeScreenSpaceEvent, !0) && (this.viewer.screenSpaceEventHandler.removeInputAction(r.default.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
                this.viewer.screenSpaceEventHandler.removeInputAction(r.default.ScreenSpaceEventType.LEFT_CLICK)),
              this.tooltip = new s.Tooltip(this.viewer.container),
              this.hasEdit(r.default.defaultValue(this.options.hasEdit, !0));
            var i = {
              viewer: this.viewer,
              dataSource: this.dataSource,
              primitives: this.primitives,
              tooltip: this.tooltip
            };
            this.drawCtrl = {},
              this.drawCtrl.point = new p.DrawPoint(i),
              this.drawCtrl.billboard = new m.DrawBillboard(i),
              this.drawCtrl.label = new g.DrawLabel(i),
              this.drawCtrl.model = new v.DrawModel(i),
              this.drawCtrl.polyline = new y.DrawPolyline(i),
              this.drawCtrl.curve = new w.DrawCurve(i),
              this.drawCtrl.polylineVolume = new _.DrawPolylineVolume(i),
              this.drawCtrl.corridor = new b.DrawCorridor(i),
              this.drawCtrl.polygon = new C.DrawPolygon(i),
              this.drawCtrl.rectangle = new x.DrawRectangle(i),
              this.drawCtrl.ellipse = new P.DrawCircle(i),
              this.drawCtrl.circle = this.drawCtrl.ellipse,
              this.drawCtrl.ellipsoid = new M.DrawEllipsoid(i),
              this.drawCtrl.wall = new S.DrawWall(i),
              this.drawCtrl["model-p"] = new E.DrawPModel(i);
            var a = this;
            for (var n in this.drawCtrl)
              this.drawCtrl[n]._fire = function (e, t, i) {
                a.fire(e, t, i)
              }
                ;
            this.on(f.DrawCreated, function (e) {
              this.startEditing(e.entity)
            }, this)
          },
          startDraw: function (e) {
            if ("string" == typeof e)
              e = {
                type: e
              };
            else if (null == e || null == e.type)
              return void console.error("需要传入指定绘制的type类型！");
            var t = e.type;
            if (null == this.drawCtrl[t])
              return void console.error("不能进行type为【" + t + "】的绘制，无该类型！");
            var i;
            e.success && (i = e.success,
              delete e.success),
              e = c.addGeoJsonDefVal(e),
              this.stopDraw();
            var a = this.drawCtrl[t].activate(e, i);
            return this.bindDeleteContextmenu(a),
              a
          },
          stopDraw: function () {
            this.stopEditing();
            for (var e in this.drawCtrl)
              this.drawCtrl[e].disable(!0)
          },
          clearDraw: function () {
            this.stopDraw(),
              this.dataSource.entities.removeAll(),
              this.primitives.removeAll()
          },
          currEditFeature: null,
          getCurrentEntity: function () {
            return this.currEditFeature
          },
          _hasEdit: null,
          hasEdit: function (e) {
            null !== this._hasEdit && this._hasEdit === e || (this._hasEdit = e,
              e ? this.bindSelectEvent() : (this.stopEditing(),
                this.destroySelectEvent()))
          },
          bindSelectEvent: function () {
            var e = this
              , t = new r.default.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            t.setInputAction(function (t) {
              var i = e.viewer.scene.pick(t.position);
              if (r.default.defined(i)) {
                var a = i.id || i.primitive.id || i.primitive;
                if (a && e.isMyEntity(a)) {
                  if (e.currEditFeature && e.currEditFeature === a)
                    return;
                  if (!r.default.defaultValue(a.inProgress, !1))
                    return void e.startEditing(a)
                }
              }
              e.stopEditing()
            }, r.default.ScreenSpaceEventType.LEFT_CLICK),
              t.setInputAction(function (t) {
                if (e._hasEdit) {
                  e.tooltip.setVisible(!1);
                  var i = e.viewer.scene.pick(t.endPosition);
                  if (r.default.defined(i)) {
                    var a = i.id || i.primitive.id || i.primitive;
                    if (a && a.editing && !r.default.defaultValue(a.inProgress, !1) && e.isMyEntity(a)) {
                      var n = e.tooltip;
                      setTimeout(function () {
                        n.showAt(t.endPosition, s.message.edit.start)
                      }, 100)
                    }
                  }
                }
              }, r.default.ScreenSpaceEventType.MOUSE_MOVE),
              this.selectHandler = t
          },
          destroySelectEvent: function () {
            this.selectHandler && this.selectHandler.destroy(),
              this.selectHandler = void 0
          },
          startEditing: function (e) {
            this.stopEditing(),
              null != e && this._hasEdit && (e.editing && e.editing.activate && e.editing.activate(),
                this.currEditFeature = e)
          },
          stopEditing: function () {
            this.currEditFeature && this.currEditFeature.editing && this.currEditFeature.editing.disable && this.currEditFeature.editing.disable(),
              this.currEditFeature = null
          },
          updateAttribute: function (e, t) {
            if (null == t && (t = this.currEditFeature),
              null != t && null != e) {
              e.style = e.style || {},
                e.attr = e.attr || {};
              var i = t.attribute.type;
              if (this.drawCtrl[i].style2Entity(e.style, t),
                t.attribute = e,
                t.editing && (t.editing.updateAttrForEditing && t.editing.updateAttrForEditing(),
                  t.editing.updateDraggers && t.editing.updateDraggers()),
                this.options.nameTooltip) {
                var a = this;
                t.attribute.attr && t.attribute.attr.name ? t.tooltip = {
                  html: t.attribute.attr.name,
                  check: function () {
                    return !a._hasEdit
                  }
                } : t.tooltip = null
              }
              return t
            }
          },
          setPositions: function (e, t) {
            if (null == t && (t = this.currEditFeature),
              null != t && null != e)
              return t.editing && (t.editing.setPositions(e),
                t.editing.updateDraggers()),
                t
          },
          bindDeleteContextmenu: function (e) {
            var t = this;
            e.contextmenuItems = [{
              text: "删除对象",
              iconCls: "fa fa-trash-o",
              visible: function () {
                return t._hasEdit
              },
              calback: function (e) {
                var i = e.target;
                i.editing && i.editing.disable && i.editing.disable(),
                  t.deleteEntity(i)
              }
            }]
          },
          deleteEntity: function (e) {
            null == e && (e = this.currEditFeature),
              null != e && (e.editing && e.editing.disable(),
                this.dataSource.entities.contains(e) && this.dataSource.entities.remove(e),
                this.primitives.contains(e) && this.primitives.remove(e))
          },
          isMyEntity: function (e) {
            return !!this.dataSource.entities.contains(e) || !!this.primitives.contains(e)
          },
          deleteAll: function () {
            this.clearDraw()
          },
          toGeoJSON: function (e) {
            if (this.stopDraw(),
              null == e) {
              var t = this.getEntitys();
              if (0 == t.length)
                return null;
              for (var i = [], a = 0, n = t.length; a < n; a++) {
                var e = t[a];
                if (null != e.attribute && null != e.attribute.type) {
                  var r = e.attribute.type
                    , o = this.drawCtrl[r].toGeoJSON(e);
                  null != o && (o = c.removeGeoJsonDefVal(o),
                    i.push(o))
                }
              }
              return i.length > 0 ? {
                type: "FeatureCollection",
                features: i
              } : null
            }
            var r = e.attribute.type
              , o = this.drawCtrl[r].toGeoJSON(e);
            return o = c.removeGeoJsonDefVal(o)
          },
          jsonToEntity: function (e, t, i) {
            var a = e;
            try {
              u.isString(e) && (a = JSON.parse(e))
            } catch (e) {
              return void u.alert(e.name + ": " + e.message + " \n请确认json文件格式正确!!!")
            }
            t && this.clearDraw();
            for (var n = [], r = a.features ? a.features : [a], o = 0, s = r.length; o < s; o++) {
              var l = r[o];
              if (!l.properties || !l.properties.type)
                switch (l.properties = l.properties || {},
                l.geometry.type) {
                  case "MultiPolygon":
                  case "Polygon":
                    l.properties.type = "polygon";
                    break;
                  case "MultiLineString":
                  case "LineString":
                    l.properties.type = "polyline";
                    break;
                  case "MultiPoint":
                  case "Point":
                    l.properties.type = "point"
                }
              var d = l.properties.type;
              if (null != this.drawCtrl[d]) {
                l.properties.style = l.properties.style || {},
                  l.properties = c.addGeoJsonDefVal(l.properties);
                var h = this.drawCtrl[d].jsonToEntity(l);
                if (this.bindDeleteContextmenu(h),
                  this.options.nameTooltip)
                  if (h.attribute.attr && h.attribute.attr.name) {
                    var f = this;
                    h.tooltip = {
                      html: h.attribute.attr.name,
                      check: function () {
                        return !f._hasEdit
                      }
                    }
                  } else
                    h.tooltip = null;
                n.push(h)
              } else
                console.log("数据无法识别或者数据的[" + d + "]类型参数有误")
            }
            return i && this.viewer.flyTo(n),
              n
          },
          attributeToEntity: function (e, t) {
            return this.drawCtrl[e.type].attributeToEntity(e, t)
          },
          bindExtraEntity: function (e, t) {
            var e = this.drawCtrl[t.type].attributeToEntity(e, t);
            this.dataSource.entities.add(e)
          },
          _visible: !0,
          setVisible: function (e) {
            this._visible = e,
              e ? (this.viewer.dataSources.contains(this.dataSource) || this.viewer.dataSources.add(this.dataSource),
                this.viewer.scene.primitives.contains(this.primitives) || this.viewer.scene.primitives.add(this.primitives)) : (this.stopDraw(),
                  this.viewer.dataSources.contains(this.dataSource) && this.viewer.dataSources.remove(this.dataSource, !1),
                  this.viewer.scene.primitives.contains(this.dataSource) && this.viewer.scene.primitives.remove(this.primitives))
          },
          hasDraw: function () {
            return this.getEntitys().length > 0
          },
          getEntitys: function () {
            this.stopDraw();
            var e = this.dataSource.entities.values;
            return e = e.concat(this.primitives._primitives)
          },
          getDataSource: function () {
            return this.dataSource
          },
          getEntityById: function (e) {
            for (var t = this.getEntitys(), i = 0, a = t.length; i < a; i++) {
              var n = t[i];
              if (e == n.attribute.attr.id)
                return n
            }
            return null
          },
          getCoordinates: function (e) {
            var t = e.attribute.type;
            return this.drawCtrl[t].getCoordinates(e)
          },
          getPositions: function (e) {
            var t = e.attribute.type;
            return this.drawCtrl[t].getPositions(e)
          },
          destroy: function () {
            this.stopDraw(),
              this.hasEdit(!1),
              this.clearDraw(),
              this.viewer.dataSources.contains(this.dataSource) && this.viewer.dataSources.remove(this.dataSource, !0)
          }
        });
      D.Point = p.DrawPoint,
        D.Billboard = m.DrawBillboard,
        D.Label = g.DrawLabel,
        D.Model = v.DrawModel,
        D.Polyline = y.DrawPolyline,
        D.Curve = w.DrawCurve,
        D.PolylineVolume = _.DrawPolylineVolume,
        D.Polygon = C.DrawPolygon,
        D.Rectangle = x.DrawRectangle,
        D.Circle = P.DrawCircle,
        D.Ellipsoid = M.DrawEllipsoid,
        D.Wall = S.DrawWall
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawPoint = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(21)
        , s = i(1)
        , l = i(23)
        , u = a(l)
        , d = i(3)
        , c = i(7)
        , h = a(c)
        , f = i(49);
      t.DrawPoint = o.DrawBase.extend({
        type: "point",
        createFeature: function (e) {
          this._positions_draw = null;
          var t = this
            , i = {
              position: new r.default.CallbackProperty(function (e) {
                return t.getDrawPosition()
              }
                , !1),
              point: u.style2Entity(e.style),
              attribute: e
            };
          return this.entity = this.dataSource.entities.add(i),
            this.entity
        },
        style2Entity: function (e, t) {
          return u.style2Entity(e, t.point)
        },
        bindEvent: function () {
          var e = this;
          this.getHandler().setInputAction(function (t) {
            var i = (0,
              s.getCurrentMousePosition)(e.viewer.scene, t.endPosition, e.entity);
            i && (e._positions_draw = i),
              e.tooltip.showAt(t.endPosition, d.message.draw.point.start),
              e.fire(h.DrawMouseMove, {
                drawtype: e.type,
                entity: e.entity,
                position: i
              })
          }, r.default.ScreenSpaceEventType.MOUSE_MOVE),
            this.getHandler().setInputAction(function (t) {
              var i = (0,
                s.getCurrentMousePosition)(e.viewer.scene, t.position, e.entity);
              i && (e._positions_draw = i,
                e.disable())
            }, r.default.ScreenSpaceEventType.LEFT_CLICK)
        },
        getEditClass: function (e) {
          var t = new f.EditPoint(e, this.viewer, this.dataSource);
          return this._bindEdit(t)
        },
        getAttrClass: function () {
          return u
        },
        finish: function () {
          this.entity.editing = this.getEditClass(this.entity),
            this.entity.position = this.getDrawPosition()
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditBase = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(11)
        , s = i(7)
        , l = a(s)
        , u = i(6)
        , d = a(u)
        , c = i(3)
        , h = i(2)
        , f = a(h)
        , p = i(1);
      t.EditBase = o.Class.extend({
        _dataSource: null,
        _minPointNum: 1,
        _maxPointNum: 9999,
        initialize: function (e, t, i) {
          this.entity = e,
            this.viewer = t,
            this.dataSource = i,
            this.draggers = []
        },
        fire: function (e, t, i) {
          this._fire && this._fire(e, t, i)
        },
        formatNum: function (e, t) {
          return f.formatNum(e, t)
        },
        setCursor: function (e) {
          this.viewer._container.style.cursor = e ? "crosshair" : ""
        },
        activate: function () {
          return this._enabled ? this : (this._enabled = !0,
            this.entity.inProgress = !0,
            this.changePositionsToCallback(),
            this.bindDraggers(),
            this.bindEvent(),
            this.fire(l.EditStart, {
              edittype: this.entity.attribute.type,
              entity: this.entity
            }),
            this)
        },
        disable: function () {
          return this._enabled ? (this._enabled = !1,
            this.destroyEvent(),
            this.destroyDraggers(),
            this.finish(),
            this.entity.inProgress = !1,
            this.fire(l.EditStop, {
              edittype: this.entity.attribute.type,
              entity: this.entity
            }),
            this.tooltip.setVisible(!1),
            this) : this
        },
        changePositionsToCallback: function () { },
        finish: function () { },
        bindEvent: function () {
          var e = this
            , t = new r.default.BoundingSphere
            , i = new r.default.Cartesian3
            , a = new r.default.ScreenSpaceEventHandler(this.viewer.canvas);
          a.dragger = null,
            a.setInputAction(function (t) {
              var i = e.viewer.scene.pick(t.position);
              if (r.default.defined(i)) {
                var n = i.id || i.primitive.id || i.primitive;
                if (n && r.default.defaultValue(n._isDragger, !1) && (e.viewer.scene.screenSpaceCameraController.enableRotate = !1,
                  e.viewer.scene.screenSpaceCameraController.enableTilt = !1,
                  e.viewer.scene.screenSpaceCameraController.enableTranslate = !1,
                  e.viewer.scene.screenSpaceCameraController.enableInputs = !1,
                  e.viewer.das && e.viewer.das.popup.close(n),
                  a.dragger = n,
                  a.dragger.point && (a.dragger.show = !1),
                  e.setCursor(!0),
                  a.dragger.onDragStart)) {
                  var o = a.dragger.position;
                  o && o.getValue && (o = o.getValue()),
                    a.dragger.onDragStart(a.dragger, o)
                }
              }
            }, r.default.ScreenSpaceEventType.LEFT_DOWN),
            a.setInputAction(function (n) {
              var o = a.dragger;
              if (o)
                switch (o._pointType) {
                  case d.PointType.MoveHeight:
                    var s = n.endPosition.y - n.startPosition.y
                      , l = o.position;
                    l && l.getValue && (l = l.getValue());
                    var u = new r.default.EllipsoidTangentPlane(l);
                    t.center = l,
                      t.radius = 1;
                    var h = 1.5 * e.viewer.scene.frameState.camera.getPixelSize(t, e.viewer.scene.frameState.context.drawingBufferWidth, e.viewer.scene.frameState.context.drawingBufferHeight);
                    r.default.Cartesian3.multiplyByScalar(u.zAxis, -s * h, i);
                    var f = r.default.Cartesian3.clone(l);
                    r.default.Cartesian3.add(l, i, f),
                      o.position = f,
                      o.onDrag && o.onDrag(o, f, l),
                      e.updateAttrForEditing();
                    break;
                  default:
                    e.tooltip.showAt(n.endPosition, c.message.edit.end);
                    var m = (0,
                      p.getCurrentMousePosition)(e.viewer.scene, n.endPosition, e.entity);
                    m && (o.position = m,
                      o.onDrag && o.onDrag(o, m),
                      e.updateAttrForEditing())
                }
              else {
                e.tooltip.setVisible(!1);
                var g = e.viewer.scene.pick(n.endPosition);
                if (r.default.defined(g)) {
                  var v = g.id;
                  if (v && r.default.defaultValue(v._isDragger, !1) && v.draw_tooltip) {
                    var y = v.draw_tooltip;
                    d.PointType.Control == v._pointType && e._positions_draw && e._positions_draw.length && e._positions_draw.length > e._minPointNum && (y += c.message.del.def),
                      e.tooltip.showAt(n.endPosition, y)
                  }
                }
              }
            }, r.default.ScreenSpaceEventType.MOUSE_MOVE),
            a.setInputAction(function (t) {
              var i = a.dragger;
              if (i) {
                e.setCursor(!1),
                  i.show = !0;
                var n = i.position;
                n && n.getValue && (n = n.getValue()),
                  i.onDragEnd && i.onDragEnd(i, n),
                  e.fire(l.EditMovePoint, {
                    edittype: e.entity.attribute.type,
                    entity: e.entity,
                    position: n
                  }),
                  a.dragger = null,
                  e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                  e.viewer.scene.screenSpaceCameraController.enableTilt = !0,
                  e.viewer.scene.screenSpaceCameraController.enableTranslate = !0,
                  e.viewer.scene.screenSpaceCameraController.enableInputs = !0
              }
            }, r.default.ScreenSpaceEventType.LEFT_UP),
            a.setInputAction(function (t) {
              var i = e.viewer.scene.pick(t.position);
              if (r.default.defined(i)) {
                var a = i.id;
                if (a && r.default.defaultValue(a._isDragger, !1) && d.PointType.Control == a._pointType) {
                  e.deletePointForDragger(a, t.position) && e.fire(l.EditRemovePoint, {
                    edittype: e.entity.attribute.type,
                    entity: e.entity
                  })
                }
              }
            }, r.default.ScreenSpaceEventType.RIGHT_CLICK),
            this.draggerHandler = a
        },
        destroyEvent: function () {
          this.viewer.scene.screenSpaceCameraController.enableRotate = !0,
            this.viewer.scene.screenSpaceCameraController.enableTilt = !0,
            this.viewer.scene.screenSpaceCameraController.enableTranslate = !0,
            this.viewer.scene.screenSpaceCameraController.enableInputs = !0,
            this.setCursor(!1),
            this.draggerHandler && (this.draggerHandler.dragger && (this.draggerHandler.dragger.show = !0),
              this.draggerHandler.destroy(),
              this.draggerHandler = null)
        },
        bindDraggers: function () { },
        updateDraggers: function () {
          if (!this._enabled)
            return this;
          this.destroyDraggers(),
            this.bindDraggers()
        },
        destroyDraggers: function () {
          for (var e = 0, t = this.draggers.length; e < t; e++)
            this.dataSource.entities.remove(this.draggers[e]);
          this.draggers = []
        },
        deletePointForDragger: function (e, t) {
          if (this._positions_draw.length - 1 < this._minPointNum)
            return this.tooltip.showAt(t, c.message.del.min + this._minPointNum),
              !1;
          var i = e.index;
          return i > 0 && i < this._positions_draw.length && (this._positions_draw.splice(i, 1),
            this.updateDraggers(),
            !0)
        },
        updateAttrForEditing: function () { }
      })
    }
    , function (e, t, i) {
      function a(e, t) {
        var i = 2 * e - 100 + 3 * t + .2 * t * t + .1 * e * t + .2 * Math.sqrt(Math.abs(e));
        return i += 2 * (20 * Math.sin(6 * e * m) + 20 * Math.sin(2 * e * m)) / 3,
          i += 2 * (20 * Math.sin(t * m) + 40 * Math.sin(t / 3 * m)) / 3,
          i += 2 * (160 * Math.sin(t / 12 * m) + 320 * Math.sin(t * m / 30)) / 3
      }
      function n(e, t) {
        var i = 300 + e + 2 * t + .1 * e * e + .1 * e * t + .1 * Math.sqrt(Math.abs(e));
        return i += 2 * (20 * Math.sin(6 * e * m) + 20 * Math.sin(2 * e * m)) / 3,
          i += 2 * (20 * Math.sin(e * m) + 40 * Math.sin(e / 3 * m)) / 3,
          i += 2 * (150 * Math.sin(e / 12 * m) + 300 * Math.sin(e / 30 * m)) / 3
      }
      function r(e, t) {
        return e < 72.004 || e > 137.8347 || t < .8293 || t > 55.8271 || !1
      }
      function o(e) {
        var t = Number(e[0])
          , i = Number(e[1])
          , a = 52.35987755982988
          , n = t - .0065
          , r = i - .006
          , o = Math.sqrt(n * n + r * r) - 2e-5 * Math.sin(r * a)
          , s = Math.atan2(r, n) - 3e-6 * Math.cos(n * a)
          , l = o * Math.cos(s)
          , u = o * Math.sin(s);
        return l = Number(l.toFixed(6)),
          u = Number(u.toFixed(6)),
          [l, u]
      }
      function s(e) {
        var t = Number(e[0])
          , i = Number(e[1])
          , a = Math.sqrt(t * t + i * i) + 2e-5 * Math.sin(i * p)
          , n = Math.atan2(i, t) + 3e-6 * Math.cos(t * p)
          , r = a * Math.cos(n) + .0065
          , o = a * Math.sin(n) + .006;
        return r = Number(r.toFixed(6)),
          o = Number(o.toFixed(6)),
          [r, o]
      }
      function l(e) {
        var t = Number(e[0])
          , i = Number(e[1]);
        if (r(t, i))
          return [t, i];
        var o = a(t - 105, i - 35)
          , s = n(t - 105, i - 35)
          , l = i / 180 * m
          , u = Math.sin(l);
        u = 1 - v * u * u;
        var d = Math.sqrt(u);
        o = 180 * o / (g * (1 - v) / (u * d) * m),
          s = 180 * s / (g / d * Math.cos(l) * m);
        var c = i + o
          , h = t + s;
        return h = Number(h.toFixed(6)),
          c = Number(c.toFixed(6)),
          [h, c]
      }
      function u(e) {
        var t = Number(e[0])
          , i = Number(e[1]);
        if (r(t, i))
          return [t, i];
        var o = a(t - 105, i - 35)
          , s = n(t - 105, i - 35)
          , l = i / 180 * m
          , u = Math.sin(l);
        u = 1 - v * u * u;
        var d = Math.sqrt(u);
        o = 180 * o / (g * (1 - v) / (u * d) * m),
          s = 180 * s / (g / d * Math.cos(l) * m);
        var c = i + o
          , h = t + s
          , f = 2 * t - h
          , p = 2 * i - c;
        return f = Number(f.toFixed(6)),
          p = Number(p.toFixed(6)),
          [f, p]
      }
      function d(e) {
        return u(o(e))
      }
      function c(e) {
        return s(l(e))
      }
      function h(e) {
        var t = Number(e[0])
          , i = Number(e[1])
          , a = 20037508.34 * t / 180
          , n = Math.log(Math.tan((90 + i) * m / 360)) / (m / 180);
        return n = 20037508.34 * n / 180,
          a = Number(a.toFixed(2)),
          n = Number(n.toFixed(2)),
          [a, n]
      }
      function f(e) {
        var t = Number(e[0])
          , i = Number(e[1])
          , a = t / 20037508.34 * 180
          , n = i / 20037508.34 * 180;
        return n = 180 / m * (2 * Math.atan(Math.exp(n * m / 180)) - m / 2),
          a = Number(a.toFixed(6)),
          n = Number(n.toFixed(6)),
          [a, n]
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.bd2gcj = o,
        t.gcj2bd = s,
        t.wgs2gcj = l,
        t.gcj2wgs = u,
        t.bd2wgs = d,
        t.wgs2bd = c,
        t.jwd2mct = h,
        t.mct2jwd = f;
      var p = 52.35987755982988
        , m = 3.141592653589793
        , g = 6378245
        , v = .006693421622965943
    }
    , function (e, t, i) {
      function a(e) {
        return e[Math.floor(Math.random() * e.length + 1) - 1]
      }
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(4)
        , s = i(9)
        , l = i(75)
        , u = i(38)
        , d = i(76)
        , c = i(39)
        , h = i(78)
        , f = i(28)
        , p = i(79)
        , m = i(80)
        , g = i(81)
        , v = i(82)
        , y = i(83)
        , w = i(84)
        , _ = i(85)
        , b = i(86);
      t.BaseLayer = s.BaseLayer,
        t.GroupLayer = l.GroupLayer,
        t.TileLayer = u.TileLayer,
        t.GraticuleLayer = d.GraticuleLayer,
        t.CustomFeatureGridLayer = c.CustomFeatureGridLayer,
        t.POILayer = h.POILayer,
        t.GeoJsonLayer = f.GeoJsonLayer,
        t.GltfLayer = p.GltfLayer,
        t.Tiles3dLayer = m.Tiles3dLayer,
        t.KmlLayer = g.KmlLayer,
        t.CzmlLayer = v.CzmlLayer,
        t.TerrainLayer = y.TerrainLayer,
        t.DrawLayer = w.DrawLayer;
      var C = {};
      t.regLayerForConfig = function (e, t) {
        C[e] = t
      }
        ,
        t.createLayer = function e(t, i, a) {
          var n;
          switch (t.url && (a && (t.url = t.url.replace("$serverURL$", a)),
            t.url = t.url.replace("$hostname$", location.hostname).replace("$host$", location.host)),
          t.type) {
            case "group":
              if (t.layers && t.layers.length > 0) {
                for (var r = [], o = 0; o < t.layers.length; o++) {
                  var s = e(t.layers[o], i, a);
                  null != s && r.push(s)
                }
                t._layers = r,
                  n = new l.GroupLayer(t, i)
              }
              break;
            case "www_bing":
            case "www_osm":
            case "www_google":
            case "www_gaode":
            case "www_baidu":
            case "www_tdt":
            case "arcgis_cache":
            case "arcgis":
            case "arcgis_tile":
            case "arcgis_dynamic":
            case "wmts":
            case "tms":
            case "wms":
            case "xyz":
            case "tile":
            case "single":
            case "image":
            case "gee":
            case "mapbox":
            case "custom_tilecoord":
            case "custom_grid":
              n = new u.TileLayer(t, i),
                n.isTile = !0;
              break;
            case "www_poi":
              n = new h.POILayer(t, i);
              break;
            case "custom_featuregrid":
              n = new c.CustomFeatureGridLayer(t, i);
              break;
            case "custom_graticule":
              n = new d.GraticuleLayer(t, i);
              break;
            case "3dtiles":
              n = new m.Tiles3dLayer(t, i);
              break;
            case "gltf":
              n = new p.GltfLayer(t, i);
              break;
            case "geojson":
              n = new f.GeoJsonLayer(t, i);
              break;
            case "geojson-draw":
              n = new w.DrawLayer(t, i);
              break;
            case "kml":
              n = new g.KmlLayer(t, i);
              break;
            case "czml":
              n = new v.CzmlLayer(t, i);
              break;
            case "terrain":
              n = new y.TerrainLayer(t, i);
              break;
            default:
              if (C[t.type] && (n = new C[t.type](t, i)),
                null == n)
                try {
                  console.log("配置中的图层未处理：" + JSON.stringify(t))
                } catch (e) { }
          }
          return null !== n && (t._layer = n),
            n
        }
        ,
        t.createImageryProvider = function (e, t) {
          e.url && (t && (e.url = e.url.replace("$serverURL$", t)),
            e.url = e.url.replace("$hostname$", location.hostname).replace("$host$", location.host));
          var i = {};
          for (var n in e) {
            var s = e[n];
            if (null != s)
              switch (n) {
                default:
                  i[n] = s;
                  break;
                case "crs":
                  "4326" == s || "EPSG4326" == s.toUpperCase() || "EPSG:4326" == s.toUpperCase() ? i.tilingScheme = new r.default.GeographicTilingScheme({
                    numberOfLevelZeroTilesX: e.numberOfLevelZeroTilesX || 2,
                    numberOfLevelZeroTilesY: e.numberOfLevelZeroTilesY || 1
                  }) : i.tilingScheme = new r.default.WebMercatorTilingScheme({
                    numberOfLevelZeroTilesX: e.numberOfLevelZeroTilesX || 1,
                    numberOfLevelZeroTilesY: e.numberOfLevelZeroTilesY || 1
                  });
                  break;
                case "rectangle":
                  i.rectangle = r.default.Rectangle.fromDegrees(s.xmin, s.ymin, s.xmax, s.ymax)
              }
          }
          i.url && i.proxy && (i = (0,
            o.getProxyUrl)(i));
          var l;
          switch (i.type_new || i.type) {
            case "single":
            case "image":
              l = new r.default.SingleTileImageryProvider(i);
              break;
            case "xyz":
            case "tile":
              i.customTags = {
                "z&1": function (e, t, i, a) {
                  return a + 1
                }
              },
                l = new r.default.UrlTemplateImageryProvider(i);
              break;
            case "wms":
              l = new r.default.WebMapServiceImageryProvider(i);
              break;
            case "tms":
              i.url || (i.url = r.default.buildModuleUrl("Assets/Textures/NaturalEarthII")),
                l = new r.default.createTileMapServiceImageryProvider(i);
              break;
            case "wmts":
              l = new r.default.WebMapTileServiceImageryProvider(i);
              break;
            case "gee":
              l = new r.default.GoogleEarthEnterpriseImageryProvider({
                metadata: new r.default.GoogleEarthEnterpriseMetadata(i)
              });
              break;
            case "mapbox":
              l = new r.default.MapboxImageryProvider(i);
              break;
            case "arcgis":
            case "arcgis_tile":
            case "arcgis_dynamic":
              l = new r.default.ArcGisMapServerImageryProvider(i);
              break;
            case "arcgis_cache":
              r.default.UrlTemplateImageryProvider.prototype.padLeft0 || (r.default.UrlTemplateImageryProvider.prototype.padLeft0 = function (e, t) {
                e = String(e);
                for (var i = e.length; i < t;)
                  e = "0" + e,
                    i++;
                return e
              }
              ),
                i.customTags = {
                  arc_x: function (e, t, i, a) {
                    return e.padLeft0(t.toString(16), 8)
                  },
                  arc_y: function (e, t, i, a) {
                    return e.padLeft0(i.toString(16), 8)
                  },
                  arc_z: function (e, t, i, a) {
                    return e.padLeft0(a.toString(), 2)
                  },
                  arc_X: function (e, t, i, a) {
                    return e.padLeft0(t.toString(16), 8).toUpperCase()
                  },
                  arc_Y: function (e, t, i, a) {
                    return e.padLeft0(i.toString(16), 8).toUpperCase()
                  },
                  arc_Z: function (e, t, i, a) {
                    return e.padLeft0(a.toString(), 2).toUpperCase()
                  }
                },
                l = new r.default.UrlTemplateImageryProvider(i);
              break;
            case "www_tdt":
              var u;
              switch (i.layer) {
                default:
                case "vec_d":
                  u = "vec";
                  break;
                case "vec_z":
                  u = "cva";
                  break;
                case "img_d":
                  u = "img";
                  break;
                case "img_z":
                  u = "cia";
                  break;
                case "ter_d":
                  u = "ter";
                  break;
                case "ter_z":
                  u = "cta"
              }
              var d;
              d = null == i.key || 0 == i.key.length ? "87949882c75775b5069a0076357b7530" : a(i.key);
              if ("4326" == e.crs) {
                for (var c = new Array(18), h = 0; h <= 18; h++)
                  c[h] = (h + 1).toString();
                var f = "https://t{s}.tianditu.gov.cn/" + u + "_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=" + u + "&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles&tk=" + d;
                l = new r.default.WebMapTileServiceImageryProvider({
                  url: i.proxy ? new r.default.Resource({
                    url: f,
                    proxy: i.proxy
                  }) : f,
                  layer: u,
                  style: "default",
                  format: "tiles",
                  tileMatrixSetID: "c",
                  subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
                  tileMatrixLabels: c,
                  tilingScheme: new r.default.GeographicTilingScheme,
                  maximumLevel: 18
                })
              } else {
                for (var c = new Array(18), h = 0; h <= 18; h++)
                  c[h] = h.toString();
                var f = "https://t{s}.tianditu.gov.cn/" + u + "_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=" + u + "&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles&tk=" + d;
                l = new r.default.WebMapTileServiceImageryProvider({
                  url: i.proxy ? new r.default.Resource({
                    url: f.replace("{s}", "0"),
                    proxy: i.proxy
                  }) : f,
                  layer: u,
                  style: "default",
                  format: "tiles",
                  tileMatrixSetID: "w",
                  subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
                  tileMatrixLabels: c,
                  tilingScheme: new r.default.WebMercatorTilingScheme,
                  maximumLevel: 18
                })
              }
              break;
            case "www_gaode":
              var f;
              switch (i.layer) {
                case "vec":
                default:
                  f = "http://" + (i.bigfont ? "wprd" : "webrd") + "0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
                  break;
                case "img_d":
                  f = "http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
                  break;
                case "img_z":
                  f = "http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8";
                  break;
                case "time":
                  f = "http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=" + (new Date).getTime()
              }
              l = new r.default.UrlTemplateImageryProvider({
                url: i.proxy ? new r.default.Resource({
                  url: f,
                  proxy: i.proxy
                }) : f,
                subdomains: ["1", "2", "3", "4"],
                maximumLevel: 18
              });
              break;
            case "www_baidu":
              l = new _.BaiduImageryProvider(i);
              break;
            case "www_google":
              var f;
              if ("4326" == e.crs || "wgs84" == e.crs)
                switch (i.layer) {
                  default:
                  case "img_d":
                    f = "https://mt2.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
                }
              else
                switch (i.layer) {
                  case "vec":
                  default:
                    f = "http://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile";
                    break;
                  case "img_d":
                    f = "http://mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali";
                    break;
                  case "img_z":
                    f = "http://mt{s}.google.cn/vt/imgtp=png32&lyrs=h@207000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil";
                    break;
                  case "ter":
                    f = "http://mt{s}.google.cn/vt/lyrs=t@131,r@227000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galile"
                }
              l = new r.default.UrlTemplateImageryProvider({
                url: i.proxy ? new r.default.Resource({
                  url: f,
                  proxy: i.proxy
                }) : f,
                subdomains: ["1", "2", "3"],
                maximumLevel: 20
              });
              break;
            case "www_osm":
              var f = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
              l = new r.default.UrlTemplateImageryProvider({
                url: i.proxy ? new r.default.Resource({
                  url: f,
                  proxy: i.proxy
                }) : f,
                subdomains: "abc",
                maximumLevel: 18
              });
              break;
            case "www_bing":
              var f = "https://dev.virtualearth.net"
                , p = i.layer || r.default.BingMapsStyle.Aerial;
              l = new r.default.BingMapsImageryProvider({
                url: i.proxy ? new r.default.Resource({
                  url: f,
                  proxy: i.proxy
                }) : f,
                key: i.key || "AtkX3zhnRe5fyGuLU30uZw8r3sxdBDnpQly7KfFTCB2rGlDgXBG3yr-qEiQEicEc",
                mapStyle: p
              });
              break;
            case "custom_grid":
              i.cells = i.cells || 2,
                i.color = r.default.Color.fromCssColorString(i.color || "rgba(255,255,255,0.5)"),
                i.glowWidth = i.glowWidth || 3,
                i.glowColor = r.default.Color.fromCssColorString(i.glowColor || "rgba(255,255,255,0.1)"),
                i.backgroundColor = r.default.Color.fromCssColorString(i.backgroundColor || "rgba(0,0,0,0)"),
                l = new r.default.GridImageryProvider(i);
              break;
            case "custom_tilecoord":
              l = new r.default.TileCoordinatesImageryProvider(i);
              break;
            case "custom_featuregrid":
              l = new b.FeatureGridImageryProvider(i);
              break;
            default:
              console.log("config配置图层未处理:" + e)
          }
          return l.config = i,
            l
        }
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawBase = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = (i(1),
          i(11))
        , s = i(2)
        , l = a(s)
        , u = i(7)
        , d = a(u);
      t.DrawBase = o.Class.extend({
        type: null,
        dataSource: null,
        initialize: function (e) {
          this.viewer = e.viewer,
            this.dataSource = e.dataSource,
            this.primitives = e.primitives,
            this.dataSource || (this.dataSource = new r.default.CustomDataSource,
              this.viewer.dataSources.add(this.dataSource)),
            this.tooltip = e.tooltip || new Tooltip(this.viewer.container)
        },
        fire: function (e, t, i) {
          this._fire && this._fire(e, t, i)
        },
        formatNum: function (e, t) {
          return l.formatNum(e, t)
        },
        activate: function (e, t) {
          return this._enabled ? this : (this._enabled = !0,
            this.drawOkCalback = t,
            this.createFeature(e),
            this.entity.inProgress = !0,
            this.setCursor(!0),
            this.bindEvent(),
            this.fire(d.DrawStart, {
              drawtype: this.type,
              entity: this.entity
            }),
            this.entity)
        },
        disable: function (e) {
          return this._enabled ? (this._enabled = !1,
            this.setCursor(!1),
            e && this.entity.inProgress ? (this.dataSource && this.dataSource.entities.contains(this.entity) && this.dataSource.entities.remove(this.entity),
              this.primitives && this.primitives.contains(this.entity) && this.primitives.remove(this.entity)) : (this.entity.inProgress = !1,
                this.finish(),
                this.drawOkCalback && (this.drawOkCalback(this.entity),
                  delete this.drawOkCalback),
                this.fire(d.DrawCreated, {
                  drawtype: this.type,
                  entity: this.entity
                })),
            this.destroyHandler(),
            this._positions_draw = null,
            this.entity = null,
            this.tooltip.setVisible(!1),
            this) : this
        },
        createFeature: function (e) { },
        getHandler: function () {
          return this.handler && !this.handler.isDestroyed() || (this.handler = new r.default.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
            this.handler
        },
        destroyHandler: function () {
          this.handler && this.handler.destroy(),
            this.handler = void 0
        },
        setCursor: function (e) {
          this.viewer._container.style.cursor = e ? "crosshair" : ""
        },
        bindEvent: function () { },
        _positions_draw: null,
        getDrawPosition: function () {
          return this._positions_draw
        },
        _bindEdit: function (e) {
          return e._fire = this._fire,
            e.tooltip = this.tooltip,
            e
        },
        updateAttrForDrawing: function () { },
        finish: function () { },
        getCoordinates: function (e) {
          return this.getAttrClass().getCoordinates(e)
        },
        getPositions: function (e) {
          return this.getAttrClass().getPositions(e)
        },
        toGeoJSON: function (e) {
          return this.getAttrClass().toGeoJSON(e)
        },
        attributeToEntity: function (e, t) {
          var i = this.createFeature(e);
          return this._positions_draw = t,
            this.updateAttrForDrawing(!0),
            this.finish(),
            i
        },
        jsonToEntity: function (e) {
          var t = e.properties
            , i = l.getPositionByGeoJSON(e);
          return this.attributeToEntity(t, i)
        },
        bindExtraEntity: function (e, t) {
          return t && t.style && this.style2Entity(t.style, e),
            this._positions_draw = this.getPositions(e),
            this.updateAttrForDrawing(!0),
            this.finish(),
            e
        }
      })
    }
    , function (e, t) {
      e.exports = __WEBPACK_EXTERNAL_MODULE_22__
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {});
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
            case "scaleByDistance_near":
            case "scaleByDistance_nearValue":
            case "scaleByDistance_far":
            case "scaleByDistance_farValue":
            case "distanceDisplayCondition_far":
            case "distanceDisplayCondition_near":
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "color":
              t.color = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(Number(e.opacity || 1));
              break;
            case "scaleByDistance":
              t.scaleByDistance = a ? new l.default.NearFarScalar(Number(e.scaleByDistance_near || 1e3), Number(e.scaleByDistance_nearValue || 1), Number(e.scaleByDistance_far || 1e6), Number(e.scaleByDistance_farValue || .1)) : null;
              break;
            case "distanceDisplayCondition":
              t.distanceDisplayCondition = a ? new l.default.DistanceDisplayCondition(Number(e.distanceDisplayCondition_near || 0), Number(e.distanceDisplayCondition_far || 1e5)) : null;
              break;
            case "heightReference":
              switch (a) {
                case "NONE":
                  t.heightReference = l.default.HeightReference.NONE;
                  break;
                case "CLAMP_TO_GROUND":
                  t.heightReference = l.default.HeightReference.CLAMP_TO_GROUND;
                  break;
                case "RELATIVE_TO_GROUND":
                  t.heightReference = l.default.HeightReference.RELATIVE_TO_GROUND;
                  break;
                default:
                  t.heightReference = a
              }
              break;
            case "visibleDepth":
              t.disableDepthTestDistance = a ? 0 : Number.POSITIVE_INFINITY
          }
        }
        return e.outline || (t.outlineWidth = 0),
          t
      }
      function n(e) {
        return [e.position.getValue()]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Point",
            coordinates: t[0]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {});
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "silhouette":
            case "silhouetteColor":
            case "silhouetteAlpha":
            case "silhouetteSize":
            case "fill":
            case "color":
            case "opacity":
              break;
            case "modelUrl":
              t.uri = a;
              break;
            case "heightReference":
              switch (a) {
                case "NONE":
                  t.heightReference = l.default.HeightReference.NONE;
                  break;
                case "CLAMP_TO_GROUND":
                  t.heightReference = l.default.HeightReference.CLAMP_TO_GROUND;
                  break;
                case "RELATIVE_TO_GROUND":
                  t.heightReference = l.default.HeightReference.RELATIVE_TO_GROUND;
                  break;
                default:
                  t.heightReference = a
              }
          }
        }
        e.silhouette ? (t.silhouetteColor = new l.default.Color.fromCssColorString(e.silhouetteColor || "#FFFFFF").withAlpha(Number(e.silhouetteAlpha || 1)),
          t.silhouetteSize = Number(e.silhouetteSize || 1)) : t.silhouetteSize = 0;
        var n = e.hasOwnProperty("opacity") ? Number(e.opacity) : 1;
        return e.fill ? t.color = new l.default.Color.fromCssColorString(e.color || "#FFFFFF").withAlpha(n) : t.color = new l.default.Color.fromCssColorString("#FFFFFF").withAlpha(n),
          t
      }
      function n(e) {
        var t = e.position;
        return t && t.getValue && (t = t.getValue()),
          [t]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Point",
            coordinates: t[0]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      function n(e, t, i) {
        d++;
        var a = c + d + "Type"
          , n = c + d + "Image";
        return s.default.Material[a] = a,
          s.default.Material[n] = e,
          s.default.Material._materialCache.addMaterial(s.default.Material[a], {
            fabric: {
              type: s.default.Material.PolylineArrowLinkType,
              uniforms: {
                color: new s.default.Color(1, 0, 0, 1),
                image: s.default.Material[n],
                time: 0,
                repeat: t || new s.default.Cartesian2(1, 1),
                axisY: i
              },
              source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n                        {\n                            czm_material material = czm_getDefaultMaterial(materialInput);\n                            vec2 st = repeat * materialInput.st;\n                            vec4 colorImage = texture2D(image, vec2(fract((axisY?st.t:st.s) - time), st.t));\n                            if(color.a == 0.0)\n                            {\n                                material.alpha = colorImage.a;\n                                material.diffuse = colorImage.rgb; \n                            }\n                            else\n                            {\n                                material.alpha = colorImage.a * color.a;\n                                material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb); \n                            }\n                            return material;\n                        }"
            },
            translucent: function () {
              return !0
            }
          }),
        {
          type: s.default.Material[a],
          image: s.default.Material[n]
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.LineFlowMaterial = void 0;
      var r = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , o = i(0)
        , s = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o)
        , l = new s.default.Color(0, 0, 0, 0)
        , u = t.LineFlowMaterial = function () {
          function e(t) {
            a(this, e),
              t = s.default.defaultValue(t, s.default.defaultValue.EMPTY_OBJECT),
              this._definitionChanged = new s.default.Event,
              this._color = void 0,
              this._colorSubscription = void 0,
              this.color = s.default.defaultValue(t.color, l),
              this._duration = t.duration || 1e3;
            var i = n(t.url, t.repeat, Boolean(t.axisY));
            this._materialType = i.type,
              this._materialImage = i.image,
              this.axisY = Boolean(t.axisY),
              this._time = void 0
          }
          return r(e, [{
            key: "getType",
            value: function (e) {
              return this._materialType
            }
          }, {
            key: "getValue",
            value: function (e, t) {
              return s.default.defined(t) || (t = {}),
                t.color = s.default.Property.getValueOrClonedDefault(this._color, e, l, t.color),
                t.image = this._materialImage,
                void 0 === this._time && (this._time = (new Date).getTime()),
                t.time = ((new Date).getTime() - this._time) / this._duration,
                t
            }
          }, {
            key: "equals",
            value: function (t) {
              return this === t || t instanceof e && s.default.Property.equals(this._color, t._color)
            }
          }, {
            key: "isConstant",
            get: function () {
              return !1
            }
          }, {
            key: "definitionChanged",
            get: function () {
              return this._definitionChanged
            }
          }]),
            e
        }();
      s.default.defineProperties(u.prototype, {
        color: s.default.createPropertyDescriptor("color")
      });
      var d = 0
        , c = "AnimationLine"
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditPolygon = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(6)
        , o = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(r)
        , s = i(3)
        , l = i(13)
        , u = i(1);
      t.EditPolygon = l.EditPolyline.extend({
        changePositionsToCallback: function () {
          this._positions_draw = this.entity._positions_draw || this.entity.polygon.hierarchy.getValue()
        },
        finish: function () {
          this.entity._positions_draw = this.getPosition()
        },
        isClampToGround: function () {
          return this.entity.attribute.style.hasOwnProperty("clampToGround") ? this.entity.attribute.style.clampToGround : !this.entity.attribute.style.perPositionHeight
        },
        bindDraggers: function () {
          for (var e = this, t = this.getPosition(), i = t.length < this._maxPointNum, a = this.isClampToGround(), r = 0, l = t.length; r < l; r++) {
            var d = t[r];
            a && (d = (0,
              u.updateHeightForClampToGround)(this.viewer, d),
              t[r] = d);
            var c = o.createDragger(this.dataSource, {
              position: d,
              onDrag: function (r, o) {
                if (t[r.index] = o,
                  e.heightDraggers && e.heightDraggers.length > 0) {
                  var s = e.entity.polygon.extrudedHeight.getValue();
                  e.heightDraggers[r.index].position = (0,
                    u.setPositionsHeight)(o, s)
                }
                if (i) {
                  var d, c;
                  0 == r.index ? (d = 2 * l - 1,
                    c = l - 1) : (d = 2 * r.index - 1,
                      c = r.index - 1);
                  var h = n.default.Cartesian3.midpoint(o, t[c], new n.default.Cartesian3);
                  a && (h = (0,
                    u.updateHeightForClampToGround)(e.viewer, h)),
                    e.draggers[d].position = h,
                    r.index == l - 1 ? (d = 2 * r.index + 1,
                      c = 0) : (d = 2 * r.index + 1,
                        c = r.index + 1);
                  var h = n.default.Cartesian3.midpoint(o, t[c], new n.default.Cartesian3);
                  a && (h = (0,
                    u.updateHeightForClampToGround)(e.viewer, h)),
                    e.draggers[d].position = h
                }
              }
            });
            if (c.index = r,
              this.draggers.push(c),
              i) {
              var h = (r + 1) % l
                , f = n.default.Cartesian3.midpoint(d, t[h], new n.default.Cartesian3);
              a && (f = (0,
                u.updateHeightForClampToGround)(this.viewer, f));
              var p = o.createDragger(this.dataSource, {
                position: f,
                type: o.PointType.AddMidPoint,
                tooltip: s.message.dragger.addMidPoint,
                onDragStart: function (e, i) {
                  t.splice(e.index, 0, i)
                },
                onDrag: function (e, i) {
                  t[e.index] = i
                },
                onDragEnd: function (t, i) {
                  e.updateDraggers()
                }
              });
              p.index = h,
                this.draggers.push(p)
            }
          }
          this.entity.polygon.extrudedHeight && this.bindHeightDraggers(this.entity.polygon)
        },
        heightDraggers: null,
        bindHeightDraggers: function (e, t) {
          var i = this;
          this.heightDraggers = [],
            t = t || this.getPosition();
          for (var a = e.extrudedHeight.getValue(), r = 0, l = t.length; r < l; r++) {
            var d = t[r];
            d = (0,
              u.setPositionsHeight)(d, a);
            var c = o.createDragger(this.dataSource, {
              position: d,
              type: o.PointType.MoveHeight,
              tooltip: s.message.dragger.moveHeight,
              onDrag: function (t, a) {
                var r = n.default.Cartographic.fromCartesian(a).height;
                e.extrudedHeight = r;
                var o = (0,
                  u.getMaxHeight)(i.getPosition());
                i.entity.attribute.style.extrudedHeight = i.formatNum(r - o, 2),
                  i.updateHeightDraggers(r)
              }
            });
            this.draggers.push(c),
              this.heightDraggers.push(c)
          }
        },
        updateHeightDraggers: function (e) {
          for (var t = 0; t < this.heightDraggers.length; t++) {
            var i = this.heightDraggers[t]
              , a = (0,
                u.setPositionsHeight)(i.position.getValue(), e);
            i.position.setValue(a)
          }
        }
      })
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            fill: !0
          }),
          e.clampToGround && (e.hasOwnProperty("height") && delete e.height,
            e.hasOwnProperty("extrudedHeight") && delete e.extrudedHeight);
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
            case "color":
            case "animation":
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "rotation":
              t.rotation = l.default.Math.toRadians(a);
              break;
            case "height":
              t.height = Number(a),
                e.extrudedHeight && (t.extrudedHeight = Number(e.extrudedHeight) + Number(a));
              break;
            case "extrudedHeight":
              t.extrudedHeight = Number(t.height || e.height || 0) + Number(a);
              break;
            case "radius":
              t.semiMinorAxis = Number(a),
                t.semiMajorAxis = Number(a)
          }
        }
        return e.animation ? t.material = new c.CircleWaveMaterial({
          duration: e.animationDuration || 2e3,
          color: new l.default.Color.fromCssColorString(e.color || "#FFFF00").withAlpha(Number(e.opacity || 1)),
          gradient: e.animationGradient || 0,
          count: e.animationCount || 1
        }) : e.color && (t.material = new l.default.Color.fromCssColorString(e.color || "#FFFF00").withAlpha(Number(e.opacity || 1))),
          null == t.material && (t.material = l.default.Color.fromRandom({
            minimumGreen: .75,
            maximumBlue: .75,
            alpha: Number(e.opacity || 1)
          })),
          t
      }
      function n(e) {
        return [e.position.getValue()]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Point",
            coordinates: t[0]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
        , c = i(35)
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.GeoJsonLayer = void 0;
      var n = i(0)
        , r = a(n)
        , o = i(5)
        , s = a(o)
        , l = i(4)
        , u = i(1)
        , d = i(9)
        , c = i(14)
        , h = i(12)
        , f = i(10)
        , p = i(15)
        , m = d.BaseLayer.extend({
          dataSource: null,
          add: function () {
            this.dataSource ? this.viewer.dataSources.add(this.dataSource) : this.queryData()
          },
          remove: function () {
            this.viewer.dataSources.remove(this.dataSource)
          },
          centerAt: function (e) {
            if (this.config.extent || this.config.center)
              this.viewer.das.centerAt(this.config.extent || this.config.center, {
                duration: e,
                isWgs84: !0
              });
            else {
              if (null == this.dataSource)
                return;
              this.viewer.flyTo(this.dataSource.entities.values, {
                duration: e
              })
            }
          },
          hasOpacity: !0,
          _opacity: 1,
          setOpacity: function (e) {
            if (this._opacity = e,
              null != this.dataSource)
              for (var t = this.dataSource.entities.values, i = 0, a = t.length; i < a; i++) {
                var n = t[i];
                if (n.polygon && n.polygon.material && n.polygon.material.color && (this._updatEntityAlpha(n.polygon.material.color, this._opacity),
                  n.polygon.outlineColor && this._updatEntityAlpha(n.polygon.outlineColor, this._opacity)),
                  n.polyline && n.polyline.material && n.polyline.material.color && this._updatEntityAlpha(n.polyline.material.color, this._opacity),
                  n.billboard && (n.billboard.color = new r.default.Color.fromCssColorString("#FFFFFF").withAlpha(this._opacity)),
                  n.model && (n.model.color = new r.default.Color.fromCssColorString("#FFFFFF").withAlpha(this._opacity)),
                  n.label) {
                  var o = this._opacity;
                  n.attribute && n.attribute.label && n.attribute.label.opacity && (o = n.attribute.label.opacity),
                    n.label.fillColor && this._updatEntityAlpha(n.label.fillColor, o),
                    n.label.outlineColor && this._updatEntityAlpha(n.label.outlineColor, o),
                    n.label.backgroundColor && this._updatEntityAlpha(n.label.backgroundColor, o)
                }
              }
          },
          _updatEntityAlpha: function (e, t) {
            var i = e.getValue();
            if (!i || !i.withAlpha)
              return e;
            i = i.withAlpha(t),
              e.setValue(i)
          },
          queryData: function () {
            var e = this
              , t = (0,
                l.getProxyUrl)(this.config);
            r.default.GeoJsonDataSource.load(t.url, t).then(function (t) {
              e.showResult(t)
            }).otherwise(function (t) {
              e.showError("服务出错", t)
            })
          },
          showResult: function (e) {
            var t = this;
            this.dataSource && this.viewer.dataSources.remove(this.dataSource),
              this.dataSource = e,
              this.viewer.dataSources.add(e),
              this.config.flyTo && this.centerAt();
            for (var i = e.entities.values, a = 0, n = i.length; a < n; a++) {
              var r = i[a];
              this.config.symbol && ("default" == this.config.symbol ? this.setDefSymbol(r) : this.setConfigSymbol(r, this.config.symbol)),
                (this.config.columns || this.config.popup) && (r.popup = {
                  html: function (e) {
                    var i = t.getEntityAttr(e);
                    return (0,
                      l.isString)(i) ? i : t.viewer.das.popup.getPopupForConfig(t.config, i)
                  },
                  anchor: this.config.popupAnchor || [0, -15]
                }),
                this.config.tooltip && (r.tooltip = {
                  html: function (e) {
                    var i = t.getEntityAttr(e);
                    return (0,
                      l.isString)(i) ? i : t.viewer.das.popup.getPopupForConfig({
                        popup: t.config.tooltip
                      }, i)
                  },
                  anchor: this.config.tooltipAnchor || [0, -15]
                }),
                this.config.click && (r.click = this.config.click),
                this.config.mouseover && (r.mouseover = this.config.mouseover),
                this.config.mouseout && (r.mouseout = this.config.mouseout)
            }
            1 != this._opacity && this.setOpacity(this._opacity)
          },
          getEntityAttr: function (e) {
            return e.properties
          },
          colorHash: {},
          setDefSymbol: function (e) {
            var t = this.getEntityAttr(e) || {};
            if (e.polygon) {
              var i = t.id || t.OBJECTID || 0
                , a = this.colorHash[i];
              a || (a = r.default.Color.fromRandom({
                minimumGreen: .75,
                maximumBlue: .75,
                alpha: this._opacity
              }),
                this.colorHash[i] = a),
                e.polygon.material = a,
                e.polygon.outline = !0,
                e.polygon.outlineColor = r.default.Color.WHITE
            } else if (e.polyline) {
              var i = t.id || t.OBJECTID || 0
                , a = this.colorHash[i];
              a || (a = r.default.Color.fromRandom({
                minimumGreen: .75,
                maximumBlue: .75,
                alpha: this._opacity
              }),
                this.colorHash[i] = a),
                e.polyline.material = a,
                e.polyline.width = 2
            } else
              e.billboard && (e.billboard.scale = .5,
                e.billboard.horizontalOrigin = r.default.HorizontalOrigin.CENTER,
                e.billboard.verticalOrigin = r.default.VerticalOrigin.BOTTOM)
          },
          setConfigSymbol: function (e, t) {
            var i = this.getEntityAttr(e) || {}
              , a = t.styleOptions;
            if (t.styleField) {
              var n = i[t.styleField]
                , o = t.styleFieldOptions[n];
              null != o && (a = (0,
                l.clone)(a),
                a = s.default.extend(a, o))
            }
            if ("function" == typeof t.calback) {
              var o = t.calback(i, e, t);
              if (!o)
                return;
              a = (0,
                l.clone)(a),
                a = s.default.extend(a, o)
            }
            if (a = a || {},
              e.polyline && (0,
                f.style2Entity)(a, e.polyline),
              e.polygon) {
              if ((0,
                p.style2Entity)(a, e.polygon),
                a.outlineWidth && a.outlineWidth > 1) {
                e.polygon.outline = !1;
                var d = {
                  color: a.outlineColor,
                  width: a.outlineWidth,
                  opacity: a.outlineOpacity,
                  lineType: "solid",
                  clampToGround: !0,
                  outline: !1
                }
                  , m = (0,
                    f.style2Entity)(d);
                m.positions = e.polygon.hierarchy._value.positions,
                  this.dataSource._entityCollection.add({
                    polyline: m
                  })
              }
              if (a.label && a.label.field && (a.label.heightReference = a.label.heightReference || r.default.HeightReference.RELATIVE_TO_GROUND,
                e.position = (0,
                  u.centerOfMass)((0,
                    p.getPositions)(e)),
                e.label = (0,
                  h.style2Entity)(a.label),
                e.label.text = i[a.label.field] || ""),
                this.config.buildings) {
                var g = Number(i[this.config.buildings.cloumn] || 1)
                  , v = Number(this.config.buildings.height || 5);
                e.polygon.extrudedHeight = g * v
              }
            }
            e.label && (a.heightReference = a.heightReference || r.default.HeightReference.RELATIVE_TO_GROUND,
              (0,
                h.style2Entity)(a, e.label)),
              e.billboard && (a.heightReference = a.heightReference || r.default.HeightReference.RELATIVE_TO_GROUND,
                (0,
                  c.style2Entity)(a, e.billboard),
                a.label && a.label.field && (a.label.heightReference = a.label.heightReference || r.default.HeightReference.RELATIVE_TO_GROUND,
                  e.label = (0,
                    h.style2Entity)(a.label),
                  e.label.text = i[a.label.field] || "")),
              e.attribute = a
          }
        });
      t.GeoJsonLayer = m
    }
    , function (e, t, i) {
      function a(e, t, i) {
        S = e,
          t = t || {},
          O = i || "",
          L = [],
          x = t.defaultOptions || {
            windowOptions: {
              position: "rt",
              maxmin: !1,
              resize: !0
            },
            autoDisable: !0,
            disableOhter: !0
          },
          "time" == (P = t.version) && (P = (new Date).getTime());
        var a = t.widgetsAtStart;
        if (a && a.length > 0)
          for (var n = 0; n < a.length; n++) {
            var r = a[n];
            r.hasOwnProperty("uri") && "" != r.uri ? r.hasOwnProperty("visible") && !r.visible || (r.autoDisable = !1,
              r.openAtStart = !0,
              r._nodebug = !0,
              o(r),
              L.push(r)) : console.log("widget未配置uri：" + JSON.stringify(r))
          }
        if (M = t.debugger) {
          var l = '<div id="widget-testbar" class="widgetbar animation-slide-bottom no-print-view" >      <div style="height: 30px; line-height:30px;"><b style="color: #4db3ff;">widget测试栏</b>&nbsp;&nbsp;<button  id="widget-testbar-remove"  type="button" class="btn btn-link btn-xs">关闭</button> </div>     <button id="widget-testbar-disableAll" type="button" class="btn btn-info" ><i class="fa fa-globe"></i>漫游</button></div>';
          (0,
            k.default)("body").append(l),
            (0,
              k.default)("#widget-testbar-remove").click(function (e) {
                w()
              }),
            (0,
              k.default)("#widget-testbar-disableAll").click(function (e) {
                h()
              })
        }
        if ((a = t.widgets) && a.length > 0) {
          for (var n = 0; n < a.length; n++) {
            var r = a[n];
            if ("group" == r.type) {
              for (var l = ' <div class="btn-group dropup">  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-align-justify"></i>' + r.name + ' <span class="caret"></span></button> <ul class="dropdown-menu">', u = 0; u < r.children.length; u++) {
                var f = r.children[u];
                f.hasOwnProperty("uri") && "" != f.uri ? (l += ' <li data-widget="' + f.uri + '" class="widget-btn" ><a href="#"><i class="fa fa-star"></i>' + f.name + "</a></li>",
                  o(f),
                  L.push(f)) : console.log("widget未配置uri：" + JSON.stringify(f))
              }
              l += "</ul></div>",
                M && !r._nodebug && (0,
                  k.default)("#widget-testbar").append(l)
            } else {
              if (!r.hasOwnProperty("uri") || "" == r.uri) {
                console.log("widget未配置uri：" + JSON.stringify(r));
                continue
              }
              if (M && !r._nodebug) {
                var l = '<button type="button" class="btn btn-primary widget-btn" data-widget="' + r.uri + '"  > <i class="fa fa-globe"></i>' + r.name + " </button>";
                (0,
                  k.default)("#widget-testbar").append(l)
              }
              o(r),
                L.push(r)
            }
          }
          M && (0,
            k.default)("#widget-testbar .widget-btn").each(function () {
              (0,
                k.default)(this).click(function (e) {
                  var t = (0,
                    k.default)(this).attr("data-widget");
                  null != t && "" != t && (d(t) ? c(t) : s(t))
                })
            })
        }
        for (var n = 0; n < L.length; n++) {
          var r = L[n];
          (r.openAtStart || r.createAtStart) && R.push(r)
        }
        (0,
          k.default)(window).resize(function () {
            for (var e = 0; e < L.length; e++) {
              var t = L[e];
              t._class && t._class.indexResize()
            }
          }),
          m()
      }
      function n() {
        return r(x.windowOptions)
      }
      function r(e, t) {
        if (null == e || "object" != (void 0 === e ? "undefined" : C(e)))
          return e;
        if (e.constructor != Object && e.constructor != Array)
          return e;
        if (e.constructor == Date || e.constructor == RegExp || e.constructor == Function || e.constructor == String || e.constructor == Number || e.constructor == Boolean)
          return new e.constructor(e);
        t = t || new e.constructor;
        for (var i in e)
          t[i] = void 0 === t[i] ? r(e[i], null) : t[i];
        return t
      }
      function o(e) {
        if (x)
          for (var t in x)
            "windowOptions" == t || e.hasOwnProperty(t) || (e[t] = x[t]);
        e.path = y(O + e.uri),
          e.name = e.name || e.label
      }
      function s(e, t) {
        null == S && e.viewer && a(e.viewer),
          "string" == typeof e ? (e = {
            uri: e
          },
            null != t && (e.disableOhter = !t)) : null == e.uri && console.error("activate激活widget时需要uri参数！");
        for (var i, n = 0; n < L.length; n++) {
          var r = L[n];
          if (e.uri == r.uri || r.id && e.uri == r.id) {
            if (i = r,
              i.isloading)
              return i;
            for (var s in e)
              "uri" != s && (i[s] = e[s]);
            break
          }
        }
        if (null == i && (o(e),
          i = e,
          L.push(e)),
          M && console.log("开始激活widget：" + i.uri),
          i.disableOhter ? h(i.uri, i.group) : f(i.group, i.uri),
          i._class)
          if (i._class.isActivate)
            if (i._class.update)
              i._class.update();
            else {
              i._class.disableBase();
              var l = setInterval(function () {
                i._class.isActivate || (i._class.activateBase(),
                  clearInterval(l))
              }, 200)
            }
          else
            i._class.activateBase();
        else {
          for (var n = 0; n < R.length; n++)
            if (R[n].uri == i.uri)
              return R[n];
          R.push(i),
            1 == R.length && m()
        }
        return i
      }
      function l(e) {
        for (var t = 0; t < L.length; t++) {
          var i = L[t];
          if (e == i.uri || e == i.id)
            return i
        }
      }
      function u(e) {
        var t = l(e);
        return t ? t._class : null
      }
      function d(e) {
        var t = u(e);
        return null != t && t.isActivate
      }
      function c(e) {
        if (null != e)
          for (var t = 0; t < L.length; t++) {
            var i = L[t];
            if (i._class && (e == i.uri || e == i.id)) {
              i._class.disableBase();
              break
            }
          }
      }
      function h(e, t) {
        for (var i = 0; i < L.length; i++) {
          var a = L[i];
          if (t && a.group == t)
            ;
          else if (!a.autoDisable)
            continue;
          (!e || e != a.uri && e != a.id) && (a._class && a._class.disableBase())
        }
      }
      function f(e, t) {
        if (null != e)
          for (var i = 0; i < L.length; i++) {
            var a = L[i];
            if (a.group == e) {
              if (t && (t == a.uri || t == a.id))
                continue;
              a._class && a._class.disableBase()
            }
          }
      }
      function p(e) {
        for (var t = 0; t < L.length; t++) {
          e(L[t])
        }
      }
      function m() {
        if (0 != R.length) {
          if (D)
            return void setTimeout(m, 500);
          D = !0,
            E = R[0],
            E.isloading = !0;
          var e = E.uri;
          P && (-1 == e.indexOf("?") ? e += "?time=" + P : e += "&time=" + P),
            window.NProgress && NProgress.start(),
            M && console.log("开始加载js：" + O + e),
            A.Loader.async([O + e], function () {
              D = !1,
                E.isloading = !1,
                M && console.log("完成js加载：" + O + e),
                window.NProgress && NProgress.done(!0),
                R.shift(),
                m()
            })
        }
      }
      function g(e) {
        if (null != E)
          return E.isloading = !1,
            E._class = new e(E, S),
            E._class.activateBase(),
            E._class;
        for (var t = v(), i = 0; i < L.length; i++) {
          var a = L[i];
          if (t.endsWith(a.uri))
            return a.isloading = !1,
              a._class = new e(a, S),
              a._class.activateBase(),
              a._class
        }
      }
      function v() {
        for (var e, t = document.scripts, i = t.length - 1; i >= 0; i--)
          if (null != (e = t[i].src) && "" != e && -1 != e.indexOf("widgets"))
            return e;
        return ""
      }
      function y(e) {
        var t = e.lastIndexOf("/");
        return e.substring(0, t + 1)
      }
      function w() {
        (0,
          k.default)("#widget-testbar").remove()
      }
      function _() {
        return P
      }
      function b() {
        return O
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var C = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        ;
      t.init = a,
        t.getDefWindowOptions = n,
        t.activate = s,
        t.getWidget = l,
        t.getClass = u,
        t.isActivate = d,
        t.disable = c,
        t.disableAll = h,
        t.disableGroup = f,
        t.eachWidget = p,
        t.bindClass = g,
        t.removeDebugeBar = w,
        t.getCacheVersion = _,
        t.getBasePath = b;
      var x, P, M, S, E, D, T = i(5), k = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(T), A = i(30), O = "", L = [], R = []
    }
    , function (e, t, i) {
      function a(e) {
        return "complete" === e.readyState || "loaded" === e.readyState
      }
      function n(e, t, i) {
        var a = document.createElement("link");
        a.rel = "stylesheet",
          s(a, i, "css"),
          a.async = !0,
          a.href = e,
          h.appendChild(a)
      }
      function r(e, t, i) {
        var a = document.createElement("script");
        a.charset = "utf-8",
          s(a, i, "js"),
          a.async = !t.sync,
          a.src = e,
          h.appendChild(a)
      }
      function o(e, t) {
        var i;
        e.sheet && (i = !0),
          setTimeout(function () {
            i ? t() : o(e, t)
          }, 20)
      }
      function s(e, t, i) {
        function n() {
          e.onload = e.onreadystatechange = null,
            e = null,
            t()
        }
        var r = "onload" in e;
        if ("css" === i && (f || !r))
          return void setTimeout(function () {
            o(e, t)
          }, 1);
        r ? (e.onload = n,
          e.onerror = function () {
            e.onerror = null,
              "css" == i ? console.error("该css文件不存在：" + e.href) : console.error("该js文件不存在：" + e.src),
              n()
          }
        ) : e.onreadystatechange = function () {
          a(e) && n()
        }
      }
      function l(e, t, i, a) {
        function o() {
          var i = t.indexOf(e);
          i > -1 && t.splice(i, 1),
            0 === t.length && a()
        }
        if (!e)
          return void setTimeout(function () {
            o()
          });
        c.test(e) ? n(e, i, o) : r(e, i, o)
      }
      function u(e, t, i) {
        var a = function () {
          i && i()
        };
        if (e = Array.prototype.slice.call(e || []),
          0 === e.length)
          return void a();
        for (var n = 0, r = e.length; n < r; n++)
          l(e[n], e, t, a)
      }
      function d(e, t) {
        if (a(e))
          t();
        else {
          var i = !1;
          window.addEventListener("load", function () {
            i || (t(),
              i = !0)
          }),
            setTimeout(function () {
              i || (t(),
                i = !0)
            }, 1500)
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var c = new RegExp("\\.css")
        , h = document.head || document.getElementsByTagName("head")[0]
        , f = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536
        , p = {
          async: function (e, t) {
            d(document, function () {
              u(e, {}, t)
            })
          },
          sync: function (e, t) {
            d(document, function () {
              u(e, {
                sync: !0
              }, t)
            })
          }
        };
      t.Loader = p
    }
    , function (e, t, i) {
      function a(e) {
        var t = new Cesium.ViewportQuad;
        t.rectangle = new Cesium.BoundingRectangle(10, 50, 140, 42),
          e.scene.primitives.add(t),
          t.material = new Cesium.Material({
            fabric: {
              type: "Image",
              uniforms: {
                color: new Cesium.Color(1, 1, 1, 1),
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAnCAYAAAArfufOAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKL2lDQ1BJQ0MgUHJvZmlsZQAASMedlndUVNcWh8+9d3qhzTDSGXqTLjCA9C4gHQRRGGYGGMoAwwxNbIioQEQREQFFkKCAAaOhSKyIYiEoqGAPSBBQYjCKqKhkRtZKfHl57+Xl98e939pn73P32XuftS4AJE8fLi8FlgIgmSfgB3o401eFR9Cx/QAGeIABpgAwWempvkHuwUAkLzcXerrICfyL3gwBSPy+ZejpT6eD/0/SrFS+AADIX8TmbE46S8T5Ik7KFKSK7TMipsYkihlGiZkvSlDEcmKOW+Sln30W2VHM7GQeW8TinFPZyWwx94h4e4aQI2LER8QFGVxOpohvi1gzSZjMFfFbcWwyh5kOAIoktgs4rHgRm4iYxA8OdBHxcgBwpLgvOOYLFnCyBOJDuaSkZvO5cfECui5Lj25qbc2ge3IykzgCgaE/k5XI5LPpLinJqUxeNgCLZ/4sGXFt6aIiW5paW1oamhmZflGo/7r4NyXu7SK9CvjcM4jW94ftr/xS6gBgzIpqs+sPW8x+ADq2AiB3/w+b5iEAJEV9a7/xxXlo4nmJFwhSbYyNMzMzjbgclpG4oL/rfzr8DX3xPSPxdr+Xh+7KiWUKkwR0cd1YKUkpQj49PZXJ4tAN/zzE/zjwr/NYGsiJ5fA5PFFEqGjKuLw4Ubt5bK6Am8Kjc3n/qYn/MOxPWpxrkSj1nwA1yghI3aAC5Oc+gKIQARJ5UNz13/vmgw8F4psXpjqxOPefBf37rnCJ+JHOjfsc5xIYTGcJ+RmLa+JrCdCAACQBFcgDFaABdIEhMANWwBY4AjewAviBYBAO1gIWiAfJgA8yQS7YDApAEdgF9oJKUAPqQSNoASdABzgNLoDL4Dq4Ce6AB2AEjIPnYAa8AfMQBGEhMkSB5CFVSAsygMwgBmQPuUE+UCAUDkVDcRAPEkK50BaoCCqFKqFaqBH6FjoFXYCuQgPQPWgUmoJ+hd7DCEyCqbAyrA0bwwzYCfaGg+E1cBycBufA+fBOuAKug4/B7fAF+Dp8Bx6Bn8OzCECICA1RQwwRBuKC+CERSCzCRzYghUg5Uoe0IF1IL3ILGUGmkXcoDIqCoqMMUbYoT1QIioVKQ21AFaMqUUdR7age1C3UKGoG9QlNRiuhDdA2aC/0KnQcOhNdgC5HN6Db0JfQd9Dj6DcYDIaG0cFYYTwx4ZgEzDpMMeYAphVzHjOAGcPMYrFYeawB1g7rh2ViBdgC7H7sMew57CB2HPsWR8Sp4sxw7rgIHA+XhyvHNeHO4gZxE7h5vBReC2+D98Oz8dn4Enw9vgt/Az+OnydIE3QIdoRgQgJhM6GC0EK4RHhIeEUkEtWJ1sQAIpe4iVhBPE68QhwlviPJkPRJLqRIkpC0k3SEdJ50j/SKTCZrkx3JEWQBeSe5kXyR/Jj8VoIiYSThJcGW2ChRJdEuMSjxQhIvqSXpJLlWMkeyXPKk5A3JaSm8lLaUixRTaoNUldQpqWGpWWmKtKm0n3SydLF0k/RV6UkZrIy2jJsMWyZf5rDMRZkxCkLRoLhQWJQtlHrKJco4FUPVoXpRE6hF1G+o/dQZWRnZZbKhslmyVbJnZEdoCE2b5kVLopXQTtCGaO+XKC9xWsJZsmNJy5LBJXNyinKOchy5QrlWuTty7+Xp8m7yifK75TvkHymgFPQVAhQyFQ4qXFKYVqQq2iqyFAsVTyjeV4KV9JUCldYpHVbqU5pVVlH2UE5V3q98UXlahabiqJKgUqZyVmVKlaJqr8pVLVM9p/qMLkt3oifRK+g99Bk1JTVPNaFarVq/2ry6jnqIep56q/ojDYIGQyNWo0yjW2NGU1XTVzNXs1nzvhZei6EVr7VPq1drTltHO0x7m3aH9qSOnI6XTo5Os85DXbKug26abp3ubT2MHkMvUe+A3k19WN9CP16/Sv+GAWxgacA1OGAwsBS91Hopb2nd0mFDkqGTYYZhs+GoEc3IxyjPqMPohbGmcYTxbuNe408mFiZJJvUmD0xlTFeY5pl2mf5qpm/GMqsyu21ONnc332jeaf5ymcEyzrKDy+5aUCx8LbZZdFt8tLSy5Fu2WE5ZaVpFW1VbDTOoDH9GMeOKNdra2Xqj9WnrdzaWNgKbEza/2BraJto22U4u11nOWV6/fMxO3Y5pV2s3Yk+3j7Y/ZD/ioObAdKhzeOKo4ch2bHCccNJzSnA65vTC2cSZ79zmPOdi47Le5bwr4urhWuja7ybjFuJW6fbYXd09zr3ZfcbDwmOdx3lPtKe3527PYS9lL5ZXo9fMCqsV61f0eJO8g7wrvZ/46Pvwfbp8Yd8Vvnt8H67UWslb2eEH/Lz89vg98tfxT/P/PgAT4B9QFfA00DQwN7A3iBIUFdQU9CbYObgk+EGIbogwpDtUMjQytDF0Lsw1rDRsZJXxqvWrrocrhHPDOyOwEaERDRGzq91W7109HmkRWRA5tEZnTdaaq2sV1iatPRMlGcWMOhmNjg6Lbor+wPRj1jFnY7xiqmNmWC6sfaznbEd2GXuKY8cp5UzE2sWWxk7G2cXtiZuKd4gvj5/munAruS8TPBNqEuYS/RKPJC4khSW1JuOSo5NP8WR4ibyeFJWUrJSBVIPUgtSRNJu0vWkzfG9+QzqUvia9U0AV/Uz1CXWFW4WjGfYZVRlvM0MzT2ZJZ/Gy+rL1s3dkT+S453y9DrWOta47Vy13c+7oeqf1tRugDTEbujdqbMzfOL7JY9PRzYTNiZt/yDPJK817vSVsS1e+cv6m/LGtHlubCyQK+AXD22y31WxHbedu799hvmP/jk+F7MJrRSZF5UUfilnF174y/ariq4WdsTv7SyxLDu7C7OLtGtrtsPtoqXRpTunYHt897WX0ssKy13uj9l4tX1Zes4+wT7hvpMKnonO/5v5d+z9UxlfeqXKuaq1Wqt5RPXeAfWDwoOPBlhrlmqKa94e4h+7WetS212nXlR/GHM44/LQ+tL73a8bXjQ0KDUUNH4/wjowcDTza02jV2Nik1FTSDDcLm6eORR67+Y3rN50thi21rbTWouPguPD4s2+jvx064X2i+yTjZMt3Wt9Vt1HaCtuh9uz2mY74jpHO8M6BUytOdXfZdrV9b/T9kdNqp6vOyJ4pOUs4m3924VzOudnzqeenL8RdGOuO6n5wcdXF2z0BPf2XvC9duex++WKvU++5K3ZXTl+1uXrqGuNax3XL6+19Fn1tP1j80NZv2d9+w+pG503rm10DywfODjoMXrjleuvyba/b1++svDMwFDJ0dzhyeOQu++7kvaR7L+9n3J9/sOkh+mHhI6lH5Y+VHtf9qPdj64jlyJlR19G+J0FPHoyxxp7/lP7Th/H8p+Sn5ROqE42TZpOnp9ynbj5b/Wz8eerz+emCn6V/rn6h++K7Xxx/6ZtZNTP+kv9y4dfiV/Kvjrxe9rp71n/28ZvkN/NzhW/l3x59x3jX+z7s/cR85gfsh4qPeh+7Pnl/eriQvLDwG/eE8/s3BCkeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIXRFWHRDcmVhdGlvbiBUaW1lADIwMTk6MDY6MjYgMTg6NTU6MzQyUs/lAAAZSElEQVR4Xu1ceXxVxfU/9759TUjIAtlYDWFRsiCIAi2iuBYq4N7a/rS2Wqks0lpFEGvAlipYa6tWW9f+sAJVi/2guJRiZQmERQSEsEoSyP7yXt7+7uv3zLvv8d4jC4HU/lG+n89kZs6cmXvvnJkz58zMixQOh+lcUHh/lcGcn9dXCsspGiI5rFVaQ6GW2u1zs9pUlvP4L6PbQi5c1GS32VKnSLI0CTXHShqlvyQpkG8C0KxcEw7Km5H8WPJ6V1f83Fyrlp3H14wzFvKop/xDwpLuZxLRjZIuaEYgSRtCCwqRBjEQCgTI1XiSfI5mCvsDJMla0ppSyWIvCGs1KX8PK6FfbZ2j/adgPo+vDV0KedgTznST0bpYksJ3QbCybPATaSFACJYFzUJua2qgxr2HyNfSSiFZprAki7qSokD+AdIEg6S19SJ7QRmZrfnvhwPBmdse0B8QTP+jqKys1KWnp2tefvll/8KFCzFT/nPoVMijngxNJI38hqQNZssmX0S4ej+Eixgh4PNQ7eYvIWQ3BQwmCur0FNJoTwk5DCEHA6Tz+0jvayOdz0u6jBzKHHy5Twoa7quYI78oGLuBRYsWyfPmzctUs2eMYDDos9vtzWo2BtAnaDSau9APm2RZflYlUyAQKJEkybxr167NBQUFRgikFTwnQOtTW1trzsjIKEG+WafTfaFWiQH0txBdpSjKdLT9foSaCPA8j7buDoVC14NnjUo+K/j9/gv0ev2XaHOL2+3+ltlsfri5uXl+WlpaK5d3KOSyZcqP8RJPS0afRjb6hHBlg1cIl4XdfLSe6rYdJa/GSH6jmYJaPYU1GggYCj0KNM2ClpUQaf1eMrpdZPQ4SaM3UkbxtaRTev1+26ZVM5U3p0f0/RkAH9EHH1GjZs8Y+M738T1XqdkYIORLtFrtZyjfhPJLVDLz70Z+WFtbW5bX6/XECxkDYDiE+znyHyA/Wa0SA+h/A/06CPA6CPA9pq1fv147dOhQo8PhCAwaNMgHni6FDJ4/Iro+kkvAC6j7sJpOEDLCGxisTyP+HH01yWKx1EWmXBLKlisPSZL8W9nk1cgmD4lgcZGEOKzz0oldh6lm61fkMtrJY00hP2axouUZHCdgBrJhqO+QVoeBYCG3LZXcllQKQeD1294FveWe0kumvS5jdqo1ugRePoRwpLsBVU9GWkhEeXn5ZpRzWcnx48dNEWrPY9y4cbdg9jsHDhy4VCW1CwgovhONCFaEVAi1N8dq3oDQLlD/N9AgD4B/BCbDvYImSuJQuly5UyK5XAjWfErA0LekaHxUveUINRxoIY8FwoXgWICULNx2wMIO6gzktWBgoG4o4Ke6nWsxcLw3l6YseFpl6xI8MvEBsOi7He5QmxBggUK4gQULFmAdokyU63NycpxMA0ZGuIjQUbOh9uapWSs6cD5m/t1qvicAkyU4Fs8tR9iJZ1+u0tGt0q0IPPDKIxR6kvN4h3XgPRwN0Cofq+UXcR489yFm7fh/Ho8nN0HIpcuDZTJJz0pGqGUOUM+y2Q017Kdg2E/VG49Ty1fOU7MX6rmXWUcTBqTSbcVZdHtJFk0uTKO+9vYHWkTQevKabeQz2UhxOqju4Gd4lu++0mXKd1W2rwVQk7xOtaihEZ3SgJjXbM7Hlg902IMIj6hpK2bKLxDPFIVJaGlpSXG5XDzj9JwHn53zrKo5HwXzIerLabT3JgbNv8AL7SldCFLnlnAEZvD2iws5TERsiKNpEPLQvja2JvOmhr3fwM9hMQ+Wre7YDI4IOEj1u+uo6csGIeCwyUy3lmTTXRdn0yX5dkpQMCr21Lnp9e119NymGmrxwAqPg4Q12uhpI0trExSEm9IvvZqMco4r7A4Nq/ip8ZjK9rWARzq0Q/Xu3bt1Q4YMmQ7h72Rjig0ydJJNZWsX6Lt6CGizmuX8etQZr2ZjQFtj0NmjEJ4BTyNIdvBBBUYA2n5ELKACPH8i1uhPIiURoPxRlC1E/EvED+7Zs0efn4+OV2E0GgfiPTahfDtsiCtVssDatWubY0KGofUwjOLHNRAwr71RFc0zuOWIA2vocXKb7VRS2IdevLGQijLMol5XaHQHafaag/R6ZeKSqIG6NrscZHY2kcaeSnkXX0Mhp3lVxSx5uspyGvCubMSIWXK2QBsvoLPZ+uX0IkSPwLDK5bzJZKoG7R2ow9+CZxrTugJ434FQ1nIadd9FxMYbC1GPPFu38DmJjb7bEAuA7kbUBloG6t+BZ70K2grkb8KAGAeBfcp8LEys4/revXvzLP85eJ5qaGhYCLoXazwvGU2ouyLO8NoKvlFcF+k30PYKvNvfhJBLFjlSNSn2I5I+kCJb2khjjRhZvAY7G3104pP91Ka30q0TBtPvphWSLm7qftngoY+rWuhQk5dCSphyUvR0Wb8UujjPxnZXDM9urKGfvHuQHy7yeDDpvZjNjiZhcaeMnkhW04BwwCuVbp+j2y6YkoC6bnzEORlH+PAH0DFPqumHkC5Hx16GdDM66gs840WEvVGeroB6D4N3sZoVQP0E65qfg/w8hFSUvVldXf19rP/LkY9Z16D/BfkZeJfREPIWbif6fqLROKDOVNDfRNLhdDqHYCZnqEL2wnrPhqvI5S8jv/2xxx4rE0LGLP4ZrOknNDYI1wwhQ9BsRfvg4x5ft59cfg1NHXcBvXrrsJjgtte00dz3DtI/DvISdjouwEwvn9yPpg3nJSqCZz6rofvfrVJzbHEEMJObobabSZOeTrklkzGbLSsqZkm3qCwJ4A5BlLCFio6xIPwJQYdOmYvvOaQWtQt04m6DwSBeAvw3oTNWIL4FoQadux71f4GZ8Uekh4gKAHiuRPuzUbYGfDFfmoH29qO9hGeCL0HIVVVVhgEDBtyIdnjGPoOynyBOcKGQ/yvyU2F4jcBysZvbwbPYjX0ASbaueYA4kG4Gz5V4v2lobwloy5B/joXMdZD/PaLvIGjxbqO4LXXXQrpDgu8rNjtUPzhEQWrcdZI8boX6FWTS8zOKYgL+w5YTNPrZyg4FzNhf76YZr++hu1cfIGHiADPH9qXpIzIiGUCRNRSAz8zGmNJQT/6gkyRNcCprFpUlAax6EN6ODyDnoQN0+LgN+OinksuTQ1TADHQiu1aMXLQhXgzt1JwAkO8dDSAP5TLgZDydA1i79NnZL1aTnUGs/xA6C1IA3/MsntEfyaj38RznIdADO3bseBLvuge0ayHIWyPFYtDfg2BF2b3RwSKXLA8Mk0gqEnvRYqsyAH83RN4WH7UeqocVbKWnbhhKZl1kPLyxo45+uHo/BaOS6wIvbqmlme+cmr23FZ/arBI+NATMrhXDUXOIJH3QqLHZrhWELsBWKj5IuDfonPmCqIINKnzoKozyEpV0GjBjj3KMNvoiZHEadY6lp6fb0MGvRQPKxIYH4jvj6RywZrY7IM8UaGM0nrkayfGIQ4cOHWrXn09GSUlJADP1ZgzUnyOb8O1o5020+yc1i2eQ5puc4MOGqKDDkkJ1FcfIpzPTyIGZdMUFvQTzVw4f/Qgzs7tgC/uJf3xFu060CZUdj5CsjcxkvIn3ZI166CFNVIs7RUpKykJ0fBo+6q9QXwkHH5ixN6HsBtBfSnZholi6dGkd6rJhxEIWLg0GS3R2c2ftQ3hCTf8dIWpgsZrcyemuwHvUPp+vn5o9DWiHO/RbeD5b228NHTqU36cj8JJ0B6txNc+D5CVEwn1BW7wLxx18Je8MMo0BE0oqE6dIfJrEQVao+UgTuR1+8htNdEtZjJd+CUG1+c94BzIBD609TCOXb4ORlrh9HN0RUyDssKOFFLhrYa1SphZ3CMzQYYjY6fdgRkY3K2KAOvsNyvai80bCEr1fJSdAPRg4gZCNkAN+pba2Nn59PYrnvMYJlG3kwGnQXkF0Sj11AAjgB8XFxYegXn+gkk4D2myC0KZiVl7c1NTU0SYL73IxZqHNl/FNg1lDYQB/BJodbfC6zfAg/TjKe8FTeJX3+ZkoQ+kWSupxIc9iPJCatleL3SyeYRMHRWYxa+cVO+tFuifBW6GKRisCphFsgCaMPGVwZ1ud7FrgA1/h0Y+P+gVm7UG1KAZWZ/iWOZwG30Kob7FhkAzU/wP4nkEyH6ElLy9vDoRyVioYWmAK2uNty4s5j+dOQdQHtK84Hw/QahB2IzhhK6zBM7empaUxTQwqBtLPIxxBO3NVktjzRqjG938CegbSczFAPlDLafXq1S+Axq7UpAULFjzFNHaGxFoURd3OY+RRtOJUSdJqqTAj4rHsb3BTkxtGWQf4TkkW/WbKoC7DvAl5lGKK054sZMxm3j1jeJ3C7jCVmu5vdyOCR2dRUREbJKX4mH9t2LAhthfc2Nhow6weis6eDMH9CKP+m+Bht8sGN+OXKpvAypUreTuRNcZJ8F2DeDT40pAuR8x7xt0G6v4KdXnfOBPPPY6wGO8zCPTnVBaGsF9BWwS+ERDWes7D9UlDnmcs73pFMRy0ArSzF9/zU5fLlXfw4MH7QeNgB20+2lmu8gpMnz49hFn+HdRxMR/ix6TSZUqdrA1myHCfFF0zHf5oIznNqeJkKcWip6aFY0XlTw456PIX2l+GinOstG1mh/bNaeC1ueyZypjxpvX7yNraSCaXgwyDhlNGn9Hk9wTzdswzHRcMccBLs4X5QzXNu028frA1lw16VK2dBvCGIXz2QSs4z+v0+PHjG1CHtxhFOaJKRKuxhr4KdfcV0u+jw3hmf4EO5a1N9Km8CIIbAst1MereoJ6KscpnLfgIaKl4zrvl5eUb4s+JUSbcNbS5HeW8fCTMGJRdyW2jfBXaEBtC4JuEeg141g7BpILbQpSKAf7ShAkTMFaDo/BdfAK1BXVHMw/q3oD2/gLanTyTY3uO9V9UkU9joKDeINbKQJwFHb8BkozaVj+1eM98rb4w20Ij+5ySB6vssOqg8cEFIxxUOlIbMXeEPwhhLMIgZC34IDaktiKsRnganTEbH/ttpN8DjwS1+FikJhF3DqI/o+w18N3p9XrZFStDxyxGnU5dHnT6zxBdwWkI3MMxA3V5X3suz87kiwAYLBV4VhDlxSj/J8LG+MACZj7wRA8b2GX8MFnADPCy9fw8Bul88LO636AWxdZT0Faz8MH3ilS2TNknaYOFIUMjHd34EbksmMUmS+zYsPnRSynFqKETrgD1fVzYHe2CDyoGp0PFdzwW6Imr+9OE/mLi0MinK2lXrUukeYvT2tokNkZ0+YMoq2AChRsbLBUL+/D2XwLY4MAHTEKyAR/IQj0JWu3evXtP8joc4UoEykeiI1dCeLcj3qSSOwQfKlgslsNIfgTh3wtVX46BwG4Od/C38MztEBZb3e8g5o2HMwKefzXq345ke3vCfIRasW/fvmVdWNgxoL2JLGw1WwOhzsagqFTzMbCQ3yeNcmVj7UZqqK8VZ77su0bx0d0X0TcHRARzIazj3VC1ZwMNNEHNw2Mow6Ijd0ChXo9+Bk0RGexaCNniaBB72bqCIZSZN66uYqYmwVY4Vxw9etRYUFDgVbP/U2ALdh+FNNRWVw1jyxixcuPw3j4+NIngnjHClTwrzLgwQwiYse5Ac0zADL4LJiMwNAYM8qC8T2R6EP+rAmbIWAQ+9bobKRAMCH+V1+J4vLrtpJh5DD5avKhvh7ZNh7AZtLT0mgFqjuj5zXG3c2Hv8PUgGe4Tp/WmNCwVJE5hzqNnACG7P/G2VodZuKdd3wEa2gK07NOIkcvG16rbh1K27cxP+3Qamf5yWxHl2CN11lW10Novm0SaEb3sx7c6+R0s5r6khJR1avF59ADkijnWBkmj3yWuzoaC4ggwGeUfH6OdtZG1eECakT69ZySV5HR6ni7Qx26gD+4aQZPVbdFWX4ju+Wvctigexdd1dX6vELScmkFy2HR8h+vxs76bDeOFd6Z4e4/DLgS+pLcMrg7vavUIWltbe8U9IzlELd2zBm/2sFegZnkfnnfjuG3etOk2hG62Zw5+TCfpSO9xw9L1nSZoL9T1lFe/EHvXDBb05vuK6aUZhTSKz42TNMCg3iZafFV/2vdAWcya9gbDNOWVL+hQY8zjgJoOkt7nEefKhBltzbkI2iT8onJu95D5xCh6asTqYwTebxb83n+xcCLkcwMsWi3aHI4ku249Cj6WLCoq2olnxLZqkdapz+NduW5DnCejEalw4bGDTQfW9feYreIOFm9phuXEX7/k9zLS298dBh/XolIicMBHPtLsZR+AclMMlKkaWFHUOP1085/30qeHY6doYg3mqz9mZwsZ3E6i9GzKGTKl1Rt29f98lv2UPu8m8D38EO4U4aawVZ2fn8/7vTehbAnih5jO4IMDuFSFoLsdDseO9PR0vEgE3CcoH4k4G+UNb7/9diXvJnEZXKwMq9XK7htf2x0hKnQA1iAGg4F5gkjvstlsMUsW7lk+XDM/2lHgpg2vq6vbhHfI0+v1fDBSCR98Guoe4fdEfBi0d48dO3ZTbm7uJajXCHdpl9pUpxBCZpQuD01qazm+rqXqY/LCyuYjRj7rZWs73hgzaGV68Bt5NGd8Ltn0yT+BSkRACdMrMNwefv8I1btU1w/P00DAOgjY1OaAgOErG0zUp2Qa1Ir5p1tnyZ1eWe0K+J4EITPQWdHrMZ+DLrYNkX4cEd/YEGqI67EfyxsTPJsGDhzId6pj97VQvtvpdE6w2+1NZypkCOIHKP8dgnBZwO8D7Tb4+avUPF8PYn+ctzRzUXYzYr7HVcDljJUrV2qvv/76PFXIvOXIx6viVAv5p5GexenOEJPetlmaD22p+a9lDptKFrwTbzOaXZhlUKXsx/LlO7RKvqBCiz48SgVLNtO9b1fRmn1NVN3qFwcYPFz4TteGI630yAdHafDSCrp71f6IgFHIbfCvKYzuVrI4mxE7STKZKavkOtKQZbu0b0fCPmxPYcmSJVXoEH49PoDnfWI+gOCtwX8GAoEL0bmz0Vkp6Hxxbbd///7XIj8e9Ech2N6IeYfLbbFYkk/HhqHZQFIQhwK8x4427kLyAJ5RigE0A3kDNMOPuDwK0HjQrcczFtbX1/MNEXE2jLgKtO/feOON8UvXcNAXBIPByxCzRvgx/5ojUtQxYjOZMXRpo82iTdsGK3twS30FtR3fS3jryO0N9QZHSMzsyC8lhDXejkUeA+ry+s4+sAzDTit+LuNRBw7W/sy+lF00kaSAzakEA6U98fsofM9pM5lVLzqZd8N4WzF2+MCXDqA+L0b59aDPRF2+Z3UTeK+AwD9AntU3d/xazN41PIu5XtxM5pkYOwFigPZ3tBc7sFd/UlMK2jfQNm9dViIWg0Wtbz5x4oS9T5/I7h4EbeVL+CjbCD5xcBCnrmM0pNchPYkvR/AFRKZ1hASneM+8dGeQAtehifpeGaMod8w0Su03mKzhIFkcjWRF4Gu04iDB44LB5Iba9Qjh8Wzn7UmOOc90A8p5tppczajbFNMOWo2GbMWXUs6IySzgAPTajP/kD+AgFD684LVF3FjgWYZOej4lJaUenf//IBUxHRAjHmvdhyhngYRQ7xbwvILBcAjCT/6ZzTGU8wyNhXgBYyYuyM7OrseA4b3z6E9wko3KhqiAzwB8NzwKYQWj3c7XTCBx5wPYPlu/XwoG8THhOvJZKK1vCeWNu46yx1xCtqx0soQDEHQj2VoayOZogPAQkOdBwHQxGBALuqNexDwwWEXrLSayXVRKuRO/TfZehaR4jLxG3Voxp/0fhfUUYNREfz0hbnbMnz9/MjqHD+jfWLVqVRbUafSyvDCsDh8+bIBKXAlDqRCC5eNKXldTIMB2Lx+0B7YDwM8DZROMpcy9e/dORRus9pJPchIOQ9AfUdXanoo8pXa7gdOEzKh4QFcJ9XkZ2twT9sL4cpnJbM6j7KFjqGDSFZR71TcovfgCsuf1JqvNQGY5SKaQh8y+NjL5XGQKeMgkK2Syoiwvi1JLLqS+11xHuWOvol5ZRRRGe4rXUA+36eptczQr1cf2JPjO81sIqxA+Q98uRtyCjv+VWh691tt36tSpIzFzF6p5ocrz8vL4EtznZrOZb5e0IUS3WZMP//NRxs9JCFjH0/HM6HLROycnZzjcoiVqPvmsOmFmV1dXs7XNwhwAgc/l60ORkrNHwpqcjOInT1o0msxlGFJ3gVPiO2Dt/T6Z08kIh6BFwjKFA1jDOR3UkeKDW4Y8KdI6Jej93rZ5pm7/OrEr4Hsc6GDx6wK1s/io61PMzAejLofqVq0F3wSV53UEvlfmg2odtHXrVm1xcfHvkP8eeKKW8QbM7On8W6zomsz09oB1Mo9/lQEt8Drqi5uUqM9rdzpCEVylzKysLB48vCY3gkcYhFGALq70Ig7zxX9oBH3UhQKdb5swzxqkr0V5ATRVp7866VTIUZT8OniprNX8WiJpDOf5+q649Jf0nwYSEBVyEEYaCxpCDlO4CsRH4CatULn+a0DHSRBGfwi/DQJp94ZkU1OTHcLMAU8LZvVZ/TsMPqfmGII47QpQR1DfbSCWEQeef853rs5IyFGULQtdLkkyuwUYTeovGXhGs6CTEIaAhaAxj/HnIwj4T5UbV7/Vnd8in0fPoFtCjmLUIvhmKZnw1eSxMCUKQcpDMzak2VhwosWTSOwPK8oWn9z2j3PZwTqPcwXRvwGbdJHf31JZSgAAAABJRU5ErkJggg=="
              }
            }
          })
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.addImage = a;
      t.image = {
        url: null,
        rectangle: null
      }
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.ViewerEx = void 0;
      var o = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , s = i(0)
        , l = n(s)
        , u = i(5)
        , d = n(u)
        , c = i(16)
        , h = i(71)
        , f = a(h)
        , p = i(72)
        , m = a(p)
        , g = i(73)
        , v = a(g)
        , y = i(74)
        , w = a(y)
        , _ = i(4)
        , b = a(_)
        , C = i(1)
        , x = a(C)
        , P = i(19)
        , M = a(P)
        , S = i(20)
        , E = i(87)
        , D = i(31);
      l.default.Camera.DEFAULT_VIEW_RECTANGLE = l.default.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2),
        l.default.BingMapsApi.defaultKey = "AtkX3zhnRe5fyGuLU30uZw8r3sxdBDnpQly7KfFTCB2rGlDgXBG3yr-qEiQEicEc",
        setTimeout(E.addLog, 6e5);
      t.ViewerEx = function () {
        function e(t, i) {
          r(this, e),
            this.viewer = t,
            this.config = i || {},
            this.viewer.das = this,
            this._isFlyAnimation = !1,
            this.crs = this.config.crs || "3857",
            (0,
              D.addImage)(t),
            this._optimization(),
            this._initForOpts(),
            this._addControls(),
            this._initLayers()
        }
        return o(e, [{
          key: "_optimization",
          value: function () {
            var e = this.viewer;
            if (this.viewer.sceneModePicker && (this.viewer.sceneModePicker.viewModel.duration = 0),
              this.viewer._cesiumWidget._supportsImageRenderingPixelated = l.default.FeatureDetection.supportsImageRenderingPixelated(),
              this.viewer._cesiumWidget._forceResize = !0,
              l.default.FeatureDetection.supportsImageRenderingPixelated()) {
              for (var t = window.devicePixelRatio; t >= 2;)
                t /= 2;
              this.viewer.resolutionScale = t
            }
            this.viewer.camera.changed.addEventListener(function () {
              if (e.camera._suspendTerrainAdjustment && e.scene.mode === l.default.SceneMode.SCENE3D && (e.camera._suspendTerrainAdjustment = !1,
                e.camera._adjustHeightForTerrain()),
                e.scene.camera.positionCartographic.height < -100) {
                var t = x.setPositionsHeight(e.camera.positionWC, 0);
                e.scene.camera.setView({
                  destination: t,
                  orientation: {
                    heading: e.camera.heading,
                    pitch: e.camera.pitch
                  }
                })
              }
            })
          }
        }, {
          key: "_initForOpts",
          value: function () {
            var e = this;
            this.viewer.cesiumWidget.creditContainer.style.display = "none",
              this.viewer.homeButton && this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (t) {
                e.centerAt(),
                  t.cancel = !0
              }),
              this.centerAt(null, {
                duration: 0
              });
            var t = this.viewer.scene;
            t.globe.baseColor = new l.default.Color.fromCssColorString(this.config.baseColor || "#546a53"),
              this.config.style && (t.globe.depthTestAgainstTerrain = this.config.style.testTerrain,
                t.globe.enableLighting = this.config.style.lighting,
                t.skyAtmosphere.show = this.config.style.atmosphere,
                t.globe.showGroundAtmosphere = this.config.style.atmosphere,
                t.fog.enabled = this.config.style.fog,
                t.globe.show = l.default.defaultValue(this.config.style.globe, !0),
                t.moon.show = l.default.defaultValue(this.config.style.moon, t.globe.show),
                t.sun.show = l.default.defaultValue(this.config.style.sun, t.globe.show),
                t.skyBox.show = l.default.defaultValue(this.config.style.skyBox, t.globe.show),
                t.globe.show || (t.backgroundColor = t.globe.baseColor)),
              t.screenSpaceCameraController.maximumZoomDistance = this.config.maxzoom || 2e7,
              t.screenSpaceCameraController.minimumZoomDistance = this.config.minzoom || 1,
              t.screenSpaceCameraController._zoomFactor = 2,
              t.screenSpaceCameraController.minimumCollisionTerrainHeight = 15e6
          }
        }, {
          key: "_addControls",
          value: function () {
            if (f.init(this.viewer),
              this._popup = f,
              m.init(this.viewer),
              this._tooltip = m,
              this.config.contextmenu && (v.init(this.viewer),
                this.contextmenuItems = this.config.contextmenuItems || v.defaultContextmenuItems,
                this._contextmenu = v),
              this.config.navigation && this._addNavigationWidget(this.config.navigation),
              this.config.location && this._addLocationWidget(this.config.location),
              this.config.mouseZoom && b.isPCBroswer()) {
              (0,
                d.default)("#" + this.viewer._container.id).append('<div class="cesium-mousezoom"><div class="zoomimg"/></div>');
              var e = !0
                , t = -1
                , i = this.viewer
                , a = new l.default.ScreenSpaceEventHandler(this.viewer.scene.canvas);
              a.setInputAction(function (t) {
                e && (0,
                  d.default)(".cesium-mousezoom").css({
                    top: t.endPosition.y + "px",
                    left: t.endPosition.x + "px"
                  })
              }, l.default.ScreenSpaceEventType.MOUSE_MOVE),
                a.setInputAction(function (e) {
                  (0,
                    d.default)(".cesium-mousezoom").addClass("cesium-mousezoom-visible"),
                    clearTimeout(t),
                    t = setTimeout(function () {
                      (0,
                        d.default)(".cesium-mousezoom").removeClass("cesium-mousezoom-visible")
                    }, 200)
                }, l.default.ScreenSpaceEventType.WHEEL),
                a.setInputAction(function (a) {
                  x.getCurrentMousePosition(i.scene, a.position) && (i.camera.positionCartographic.height > i.scene.screenSpaceCameraController.minimumCollisionTerrainHeight || (e = !1,
                    clearTimeout(t),
                    (0,
                      d.default)(".cesium-mousezoom").css({
                        top: a.position.y + "px",
                        left: a.position.x + "px"
                      }),
                    (0,
                      d.default)(".cesium-mousezoom").addClass("cesium-mousezoom-visible")))
                }, l.default.ScreenSpaceEventType.MIDDLE_DOWN),
                a.setInputAction(function (t) {
                  (0,
                    d.default)(".cesium-mousezoom").removeClass("cesium-mousezoom-visible"),
                    e = !0
                }, l.default.ScreenSpaceEventType.MIDDLE_UP)
            }
          }
        }, {
          key: "_initLayers",
          value: function () {
            var e = []
              , t = [];
            if (!this.config.baseLayerPicker) {
              var i = this.config.basemaps;
              if (i && i.length > 0)
                for (var a = 0; a < i.length; a++) {
                  var n = i[a];
                  n.visible && n.crs && (this.crs = n.crs);
                  var r = (0,
                    S.createLayer)(n, this.viewer, this.config.serverURL);
                  if (r && t.push(r),
                    e.push(n),
                    "group" == n.type && n.layers)
                    for (var o = 0; o < n.layers.length; o++) {
                      var s = n.layers[o];
                      e.push(s)
                    }
                }
            }
            this.arrBasemaps = t;
            var l = []
              , i = this.config.operationallayers;
            if (i && i.length > 0)
              for (var a = 0; a < i.length; a++) {
                var n = i[a]
                  , r = (0,
                    S.createLayer)(n, this.viewer, this.config.serverURL);
                if (r && l.push(r),
                  e.push(n),
                  "group" == n.type && n.layers)
                  for (var o = 0; o < n.layers.length; o++) {
                    var s = n.layers[o];
                    e.push(s)
                  }
              }
            this.arrOperationallayers = l;
            for (var a = 0; a < e.length; a++) {
              var n = e[a]
                , u = Number(n.order);
              isNaN(u) && (u = a),
                n.order = u,
                null != n._layer && n._layer.setZIndex(u)
            }
          }
        }, {
          key: "getConfig",
          value: function () {
            return b.clone(this.config, 5)
          }
        }, {
          key: "keyboard",
          value: function (e, t) {
            e ? w.bind(this.viewer, t) : w.unbind(this.viewer)
          }
        }, {
          key: "getLayer",
          value: function (e, t) {
            null == t && (t = "name");
            var i = this.arrBasemaps;
            if (i && i.length > 0)
              for (var a = 0; a < i.length; a++) {
                var n = i[a];
                if (null != n && n.config[t] == e)
                  return n
              }
            if ((i = this.arrOperationallayers) && i.length > 0)
              for (var a = 0; a < i.length; a++) {
                var n = i[a];
                if (null != n && n.config[t] == e)
                  return n
              }
            return null
          }
        }, {
          key: "changeBasemap",
          value: function (e) {
            for (var t = this.arrBasemaps, i = 0; i < t.length; i++) {
              var a = t[i];
              "group" == a.config.type && null == a._layers || (e == a.config.name || e == a.config.id ? a.setVisible(!0) : a.setVisible(!1))
            }
          }
        }, {
          key: "hasTerrain",
          value: function () {
            return null != this.terrainProvider && this.viewer.terrainProvider != b.getEllipsoidTerrain()
          }
        }, {
          key: "updateTerrainProvider",
          value: function (e) {
            if (e) {
              if (null == this.terrainProvider) {
                var t = this.config.terrain;
                t.url && (this.config.serverURL && (t.url = t.url.replace("$serverURL$", this.config.serverURL)),
                  t.url = t.url.replace("$hostname$", location.hostname).replace("$host$", location.host)),
                  this.terrainProvider = b.getTerrainProvider(t)
              }
              this.viewer.terrainProvider = this.terrainProvider
            } else
              this.viewer.terrainProvider = b.getEllipsoidTerrain()
          }
        }, {
          key: "getCrs",
          value: function () {
            return this.crs
          }
        }, {
          key: "point2map",
          value: function (e) {
            if ("gcj" == this.crs) {
              var t = b.clone(e)
                , i = M.wgs2gcj([t.x, t.y]);
              return t.x = i[0],
                t.y = i[1],
                t
            }
            if ("baidu" == this.crs) {
              var t = b.clone(e)
                , i = M.wgs2bd([t.x, t.y]);
              return t.x = i[0],
                t.y = i[1],
                t
            }
            return e
          }
        }, {
          key: "point2wgs",
          value: function (e) {
            if ("gcj" == this.crs) {
              var t = b.clone(e)
                , i = M.gcj2wgs([t.x, t.y]);
              return t.x = i[0],
                t.y = i[1],
                t
            }
            if ("baidu" == this.crs) {
              var t = b.clone(e)
                , i = M.bd2gcj([t.x, t.y]);
              return t.x = i[0],
                t.y = i[1],
                t
            }
            return e
          }
        }, {
          key: "centerAtArr",
          value: function (e, t) {
            this.cancelCenterAt(),
              this.arrCenterTemp = e,
              this._isCenterAtArr = !0,
              this._centerAtArrItem(0, t)
          }
        }, {
          key: "_centerAtArrItem",
          value: function (e, t) {
            var i = this;
            if (!this._isCenterAtArr || e < 0 || e >= this.arrCenterTemp.length)
              return this._isCenterAtArr = !1,
                void (t && t());
            var a = this.arrCenterTemp[e];
            a.onStart && a.onStart(),
              this.centerAt(a, {
                duration: a.duration,
                complete: function () {
                  a.onEnd && a.onEnd();
                  var n = a.stop || 1;
                  setTimeout(function () {
                    i._centerAtArrItem(++e, t)
                  }, 1e3 * n)
                },
                cancle: function () {
                  this._isCenterAtArr = !1,
                    t && t()
                }
              })
          }
        }, {
          key: "cancelCenterAt",
          value: function () {
            this._isCenterAtArr = !1,
              this.viewer.camera.flyTo({
                destination: this.viewer.camera.position,
                orientation: {
                  heading: this.viewer.camera.heading,
                  pitch: this.viewer.camera.pitch,
                  roll: this.viewer.camera.roll
                },
                duration: 0
              })
          }
        }, {
          key: "centerAt",
          value: function (e, t) {
            if (null == t ? t = {} : b.isNumber(t) && (t = {
              duration: t
            }),
              null == e && (t.isWgs84 = !0,
                e = this.config.extent || this.config.center || {
                  y: 17.196575,
                  x: 114.184276,
                  z: 9377198,
                  heading: 0,
                  pitch: -80,
                  roll: 0
                }),
              e.xmin && e.xmax && e.ymin && e.ymax) {
              var i = e.xmin
                , a = e.xmax
                , n = e.ymin
                , r = e.ymax;
              if (t.isWgs84) {
                var o = this.point2map({
                  x: i,
                  y: n
                });
                i = o.x,
                  n = o.y;
                var s = this.point2map({
                  x: a,
                  y: r
                });
                a = s.x,
                  r = s.y
              }
              var u = l.default.Rectangle.fromDegrees(i, n, a, r);
              this.viewer.camera.flyTo({
                destination: u,
                duration: t.duration,
                complete: t.complete
              })
            } else {
              t.isWgs84 && (e = this.point2map(e));
              var d = t.minz || 2500;
              this.viewer.camera.positionCartographic.height < d && (d = this.viewer.camera.positionCartographic.height),
                null != e.z && 0 != e.z && (d = e.z),
                this.viewer.camera.flyTo({
                  destination: l.default.Cartesian3.fromDegrees(e.x, e.y, d),
                  orientation: {
                    heading: l.default.Math.toRadians(e.heading || 0),
                    pitch: l.default.Math.toRadians(e.pitch || -90),
                    roll: l.default.Math.toRadians(e.roll || 0)
                  },
                  duration: t.duration,
                  complete: t.complete
                })
            }
          }
        }, {
          key: "isFlyAnimation",
          value: function () {
            return this._isFlyAnimation
          }
        }, {
          key: "openFlyAnimation",
          value: function (e, t) {
            var i = this
              , a = this.viewer
              , n = t || x.getCameraView(a);
            this._isFlyAnimation = !0,
              a.camera.setView({
                destination: l.default.Cartesian3.fromDegrees(-85.16, 13.71, 23e6)
              }),
              a.camera.flyTo({
                destination: l.default.Cartesian3.fromDegrees(n.x, n.y, 23e6),
                duration: 2,
                easingFunction: l.default.EasingFunction.LINEAR_NONE,
                complete: function () {
                  var t = 1.2 * (n.z || 9e4) + 8e3;
                  t > 23e6 && (t = 23e6),
                    a.camera.flyTo({
                      destination: l.default.Cartesian3.fromDegrees(n.x, n.y, t),
                      complete: function () {
                        i.centerAt(n, {
                          duration: 2,
                          complete: function () {
                            i._isFlyAnimation = !1,
                              e && e()
                          }
                        })
                      }
                    })
                }
              })
          }
        }, {
          key: "rotateAnimation",
          value: function (e, t) {
            var i = this.viewer
              , a = x.getCameraView(i)
              , n = t / 3;
            i.camera.flyTo({
              destination: l.default.Cartesian3.fromDegrees(a.x + 120, a.y, a.z),
              orientation: {
                heading: l.default.Math.toRadians(a.heading),
                pitch: l.default.Math.toRadians(a.pitch),
                roll: l.default.Math.toRadians(a.roll)
              },
              duration: n,
              easingFunction: l.default.EasingFunction.LINEAR_NONE,
              complete: function () {
                i.camera.flyTo({
                  destination: l.default.Cartesian3.fromDegrees(a.x + 240, a.y, a.z),
                  orientation: {
                    heading: l.default.Math.toRadians(a.heading),
                    pitch: l.default.Math.toRadians(a.pitch),
                    roll: l.default.Math.toRadians(a.roll)
                  },
                  duration: n,
                  easingFunction: l.default.EasingFunction.LINEAR_NONE,
                  complete: function () {
                    i.camera.flyTo({
                      destination: l.default.Cartesian3.fromDegrees(a.x, a.y, a.z),
                      orientation: {
                        heading: l.default.Math.toRadians(a.heading),
                        pitch: l.default.Math.toRadians(a.pitch),
                        roll: l.default.Math.toRadians(a.roll)
                      },
                      duration: n,
                      easingFunction: l.default.EasingFunction.LINEAR_NONE,
                      complete: function () {
                        e && e()
                      }
                    })
                  }
                })
              }
            })
          }
        }, {
          key: "_addLocationWidget",
          value: function (e) {
            var t = this.viewer;
            (0,
              d.default)("#" + t._container.id).prepend('<div id="location_das_jwd"  class="location-bar animation-slide-bottom no-print" ></div>'),
              e.style ? (0,
                d.default)("#location_das_jwd").css(e.style) : (0,
                  d.default)("#location_das_jwd").css({
                    left: t.animation ? "170px" : "0",
                    right: "0",
                    bottom: t.timeline ? "25px" : "0"
                  }),
              e.format = e.format || "<div>视高：{height}米</div><div>俯仰角：{pitch}度</div><div>方向：{heading}度</div><div>海拔：{z}米</div><div>纬度:{y}</div><div>经度:{x}</div>";
            var i = {};
            i.height = t.camera.positionCartographic.height.toFixed(1),
              i.heading = l.default.Math.toDegrees(t.camera.heading).toFixed(0),
              i.pitch = l.default.Math.toDegrees(t.camera.pitch).toFixed(0),
              new l.default.ScreenSpaceEventHandler(t.scene.canvas).setInputAction(function (a) {
                var n = x.getCurrentMousePosition(t.scene, a.endPosition);
                if (n) {
                  var r = l.default.Cartographic.fromCartesian(n);
                  i.z = r.height.toFixed(1);
                  var o = l.default.Math.toDegrees(r.longitude)
                    , s = l.default.Math.toDegrees(r.latitude);
                  switch (e.crs) {
                    default:
                      var u = e.hasOwnProperty("toFixed") ? e.toFixed : 6;
                      i.x = o.toFixed(u),
                        i.y = s.toFixed(u);
                      break;
                    case "degree":
                      i.x = b.formatDegree(o),
                        i.y = b.formatDegree(s);
                      break;
                    case "project":
                      var u = e.hasOwnProperty("toFixed") ? e.toFixed : 0;
                      i.x = n.x.toFixed(u),
                        i.y = n.y.toFixed(u);
                      break;
                    case "wgs":
                      var u = e.hasOwnProperty("toFixed") ? e.toFixed : 6
                        , c = point2wgs({
                          x: o,
                          y: s
                        });
                      i.x = c.x.toFixed(u),
                        i.y = c.y.toFixed(u);
                      break;
                    case "wgs-degree":
                      var c = point2wgs({
                        x: o,
                        y: s
                      });
                      i.x = b.formatDegree(c.x),
                        i.y = b.formatDegree(c.y)
                  }
                  var h = b.template(e.format, i);
                  (0,
                    d.default)("#location_das_jwd").html(h)
                }
              }, l.default.ScreenSpaceEventType.MOUSE_MOVE),
              t.scene.camera.changed.addEventListener(function (a) {
                if (i.height = t.camera.positionCartographic.height.toFixed(1),
                  i.heading = l.default.Math.toDegrees(t.camera.heading).toFixed(0),
                  i.pitch = l.default.Math.toDegrees(t.camera.pitch).toFixed(0),
                  null != i.x) {
                  var n = b.template(e.format, i);
                  (0,
                    d.default)("#location_das_jwd").html(n)
                }
              })
          }
        }, {
          key: "_addNavigationWidget",
          value: function (e) {
            l.default.viewerCesiumNavigationMixin && (this.viewer.extend(l.default.viewerCesiumNavigationMixin, {
              defaultResetView: l.default.Rectangle.fromDegrees(110, 20, 120, 30),
              enableZoomControls: !0
            }),
              this.viewer.animation ? (0,
                d.default)(".distance-legend").css({
                  left: "150px",
                  bottom: "25px",
                  border: "none",
                  background: "rgba(0, 0, 0, 0)",
                  "z-index": "992"
                }) : (0,
                  d.default)(".distance-legend").css({
                    left: "-10px",
                    bottom: "-1px",
                    border: "none",
                    background: "rgba(0, 0, 0, 0)",
                    "z-index": "992"
                  }),
              e.legend ? (0,
                d.default)(".distance-legend").css(e.legend) : (0,
                  d.default)(".distance-legend").remove(),
              e.compass ? (0,
                d.default)(".compass").css(e.compass) : (0,
                  d.default)(".compass").remove(),
              (0,
                d.default)(".navigation-controls").remove())
          }
        }, {
          key: "destroy",
          value: function () {
            this._tooltip.destroy(),
              this._popup.destroy(),
              this._contextmenu && this._contextmenu.destroy()
          }
        }, {
          key: "popup",
          get: function () {
            return this._popup
          }
        }, {
          key: "tooltip",
          get: function () {
            return this._tooltip
          }
        }, {
          key: "contextmenu",
          get: function () {
            return this._contextmenu
          }
        }, {
          key: "contextmenuItems",
          get: function () {
            return this._contextmenuItems
          },
          set: function (e) {
            this._contextmenuItems = e
          }
        }, {
          key: "draw",
          get: function () {
            return null == this._drawControl && (this._drawControl = new c.Draw(this.viewer, {
              hasEdit: !1
            })),
              this._drawControl
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {});
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
            case "radius":
            case "shape":
              break;
            case "outlineColor":
              t.outlineColor = new c.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "color":
              t.material = new c.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(Number(e.opacity || 1))
          }
        }
        switch (e.radius = e.radius || 10,
        e.shape) {
          default:
          case "pipeline":
            t.shape = n(e.radius);
            break;
          case "circle":
            t.shape = r(e.radius);
            break;
          case "star":
            t.shape = o(e.radius)
        }
        return t
      }
      function n(e) {
        for (var t = e / 3, i = [], a = 0; a <= 360; a++) {
          var n = c.default.Math.toRadians(a);
          i.push(new c.default.Cartesian2(e * Math.cos(n), e * Math.sin(n)))
        }
        for (var a = 360; a >= 0; a--) {
          var n = c.default.Math.toRadians(a);
          i.push(new c.default.Cartesian2((e - t) * Math.cos(n), (e - t) * Math.sin(n)))
        }
        return i
      }
      function r(e) {
        for (var t = [], i = 0; i <= 360; i++) {
          var a = c.default.Math.toRadians(i);
          t.push(new c.default.Cartesian2(e * Math.cos(a), e * Math.sin(a)))
        }
        return t
      }
      function o(e, t) {
        for (var t = t || 6, i = Math.PI / t, a = 2 * t, n = new Array(a), r = 0; r < a; r++) {
          var o = r % 2 == 0 ? e : e / 3;
          n[r] = new c.default.Cartesian2(Math.cos(r * i) * o, Math.sin(r * i) * o)
        }
        return n
      }
      function s(e) {
        return e._positions_draw && e._positions_draw.length > 0 ? e._positions_draw : e.polylineVolume.positions.getValue()
      }
      function l(e) {
        var t = s(e);
        return f.cartesians2lonlats(t)
      }
      function u(e) {
        var t = l(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "LineString",
            coordinates: t
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = s,
        t.getCoordinates = l,
        t.toGeoJSON = u;
      var d = i(0)
        , c = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(d)
        , h = i(2)
        , f = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(h)
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            fill: !0
          }),
          e.clampToGround && (e.hasOwnProperty("height") && delete e.height,
            e.hasOwnProperty("extrudedHeight") && delete e.extrudedHeight);
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "height":
              t.height = Number(a),
                e.extrudedHeight && (t.extrudedHeight = Number(e.extrudedHeight) + Number(a));
              break;
            case "extrudedHeight":
              t.extrudedHeight = Number(t.height || e.height || 0) + Number(a);
              break;
            case "color":
              t.material = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(Number(e.opacity || 1));
              break;
            case "image":
              t.material = new l.default.ImageMaterialProperty({
                image: e.image,
                color: new l.default.Color.fromCssColorString("#FFFFFF").withAlpha(Number(e.opacity || 1))
              });
              break;
            case "rotation":
              t.rotation = l.default.Math.toRadians(a),
                e.stRotation || (t.stRotation = l.default.Math.toRadians(a));
              break;
            case "stRotation":
              t.stRotation = l.default.Math.toRadians(a)
          }
        }
        return null == t.material && (t.material = l.default.Color.fromRandom({
          minimumGreen: .75,
          maximumBlue: .75,
          alpha: Number(e.opacity || 1)
        })),
          t
      }
      function n(e) {
        if (e._positions_draw && e._positions_draw.length > 0)
          return e._positions_draw;
        var t = e.rectangle.coordinates.getValue()
          , i = e.rectangle.height ? e.rectangle.height.getValue() : 0;
        return [l.default.Cartesian3.fromRadians(t.west, t.south, i), l.default.Cartesian3.fromRadians(t.east, t.north, i)]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "MultiPoint",
            coordinates: t
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.CircleWaveMaterial = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = new o.default.Color(0, 0, 0, 0)
        , l = 2
        , u = .1
        , d = t.CircleWaveMaterial = function () {
          function e(t) {
            a(this, e),
              t = o.default.defaultValue(t, o.default.defaultValue.EMPTY_OBJECT),
              this._definitionChanged = new o.default.Event,
              this._color = void 0,
              this._colorSubscription = void 0,
              this.color = o.default.defaultValue(t.color, s),
              this._duration = o.default.defaultValue(t.duration, 1e3),
              this._count = o.default.defaultValue(t.count, l),
              this._count <= 0 && (this._count = 1),
              this._gradient = o.default.defaultValue(t.gradient, u),
              this._gradient < 0 && (this._gradient = 0),
              this._gradient > 1 && (this._gradient = 1),
              this._time = void 0
          }
          return n(e, [{
            key: "getType",
            value: function (e) {
              return o.default.Material.CircleWaveMaterialType
            }
          }, {
            key: "getValue",
            value: function (e, t) {
              return o.default.defined(t) || (t = {}),
                t.color = o.default.Property.getValueOrClonedDefault(this._color, e, s, t.color),
                void 0 === this._time && (this._time = (new Date).getTime()),
                t.time = ((new Date).getTime() - this._time) / this._duration,
                t.count = this._count,
                t.gradient = 1 + 10 * (1 - this._gradient),
                t
            }
          }, {
            key: "equals",
            value: function (t) {
              return this === t || t instanceof e && o.default.Property.equals(this._color, t._color)
            }
          }, {
            key: "isConstant",
            get: function () {
              return !1
            }
          }, {
            key: "definitionChanged",
            get: function () {
              return this._definitionChanged
            }
          }]),
            e
        }();
      o.default.defineProperties(d.prototype, {
        color: o.default.createPropertyDescriptor("color")
      }),
        o.default.Material.CircleWaveMaterialType = "CircleWaveMaterial",
        o.default.Material._materialCache.addMaterial(o.default.Material.CircleWaveMaterialType, {
          fabric: {
            type: o.default.Material.CircleWaveMaterialType,
            uniforms: {
              color: new o.default.Color(1, 0, 0, 1),
              time: 1,
              count: l,
              gradient: u
            },
            source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n                {\n                    czm_material material = czm_getDefaultMaterial(materialInput);\n                    material.diffuse = 1.5 * color.rgb;\n                    vec2 st = materialInput.st;\n                    vec3 str = materialInput.str;\n                    float dis = distance(st, vec2(0.5, 0.5));\n                    float per = fract(time);\n                    if(abs(str.z)>0.001){\n                        discard;\n                    }\n                    if(dis >0.5){\n                        discard;\n                    }else {\n                        float perDis = 0.5/count;\n                        float disNum;\n                        float bl = .0;\n                        for(int i=0;i<=999;i++){\n                            if(float(i)<=count){\n                                disNum = perDis*float(i) - dis + per/count;\n                                if(disNum>0.0){\n                                    if(disNum<perDis){\n                                        bl = 1.0-disNum/perDis;\n                                    }\n                                    else if(disNum-perDis<perDis){\n                                        bl = 1.0 - abs(1.0-disNum/perDis);\n                                    }\n                                    material.alpha = pow(bl,gradient);\n                                }\n                            }\n                        }\n                    }\n                    return material;\n                }"
          },
          translucent: function () {
            return !0
          }
        })
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            fill: !0
          });
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
            case "widthRadii":
            case "heightRadii":
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "color":
              t.material = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(Number(e.opacity || 1));
              break;
            case "extentRadii":
              var n = e.extentRadii || 100
                , r = e.widthRadii || 100
                , o = e.heightRadii || 100;
              t.radii = new l.default.Cartesian3(n, r, o)
          }
        }
        return null == t.material && (t.material = l.default.Color.fromRandom({
          minimumGreen: .75,
          maximumBlue: .75,
          alpha: Number(e.opacity || 1)
        })),
          t
      }
      function n(e) {
        return [e.position.getValue()]
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "Point",
            coordinates: t[0]
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          t || (t = {
            fill: !0
          });
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
            case "color":
            case "materialType":
            case "animationDuration":
            case "animationImage":
            case "animationAxisY":
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1)
          }
        }
        if (e.color || e.materialType) {
          var n = new l.default.Color.fromCssColorString(e.color || "#FFFF00").withAlpha(Number(l.default.defaultValue(e.opacity, 1)));
          switch (e.materialType) {
            default:
            case "color":
              t.material = n;
              break;
            case "animation":
              t.material = new c.LineFlowMaterial({
                color: n,
                duration: e.animationDuration || 2e3,
                url: e.animationImage,
                repeat: new l.default.Cartesian2(e.animationRepeatX || 1, e.animationRepeatY || 1),
                axisY: e.animationAxisY
              })
          }
        }
        return null == t.material && (t.material = l.default.Color.fromRandom({
          minimumGreen: .75,
          maximumBlue: .75,
          alpha: Number(e.opacity || 1)
        })),
          t
      }
      function n(e) {
        return e.wall.positions.getValue()
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "LineString",
            coordinates: t
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
        , c = i(25)
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.TileLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(9)
        , o = i(20)
        , s = r.BaseLayer.extend({
          layer: null,
          add: function () {
            null != this.layer && this.remove(),
              this.addEx();
            var e = this.createImageryProvider(this.config);
            if (null != e) {
              var t = this.config
                , i = {
                  show: !0,
                  alpha: this._opacity
                };
              if (t.rectangle && t.rectangle.xmin && t.rectangle.xmax && t.rectangle.ymin && t.rectangle.ymax) {
                var a = t.rectangle.xmin
                  , r = t.rectangle.xmax
                  , o = t.rectangle.ymin
                  , s = t.rectangle.ymax
                  , l = n.default.Rectangle.fromDegrees(a, o, r, s);
                this.rectangle = l,
                  i.rectangle = l
              }
              t.brightness && (i.brightness = t.brightness),
                t.contrast && (i.contrast = t.contrast),
                t.hue && (i.hue = t.hue),
                t.saturation && (i.saturation = t.saturation),
                t.gamma && (i.gamma = t.gamma),
                t.maximumAnisotropy && (i.maximumAnisotropy = t.maximumAnisotropy),
                t.minimumTerrainLevel && (i.minimumTerrainLevel = t.minimumTerrainLevel),
                t.maximumTerrainLevel && (i.maximumTerrainLevel = t.maximumTerrainLevel),
                this.layer = new n.default.ImageryLayer(e, i),
                this.layer.config = this.config,
                this.viewer.imageryLayers.add(this.layer),
                this.setZIndex(this.config.order)
            }
          },
          createImageryProvider: function (e) {
            return (0,
              o.createImageryProvider)(e)
          },
          addEx: function () { },
          remove: function () {
            null != this.layer && (this.removeEx(),
              this.viewer.imageryLayers.remove(this.layer, !0),
              this.layer = null)
          },
          removeEx: function () { },
          centerAt: function (e) {
            if (null != this.layer)
              if (this.config.extent || this.config.center)
                this.viewer.das.centerAt(this.config.extent || this.config.center, {
                  duration: e,
                  isWgs84: !0
                });
              else if (this.rectangle)
                this.viewer.camera.flyTo({
                  destination: this.rectangle,
                  duration: e
                });
              else {
                var t = this.layer.imageryProvider.rectangle;
                t && t != n.default.Rectangle.MAX_VALUE && t.west > 0 && t.south > 0 && t.east > 0 && t.north > 0 && this.viewer.camera.flyTo({
                  destination: t,
                  duration: e
                })
              }
          },
          hasOpacity: !0,
          _opacity: 1,
          setOpacity: function (e) {
            this._opacity = e,
              null != this.layer && (this.layer.alpha = e)
          },
          hasZIndex: !0,
          setZIndex: function (e) {
            if (null != this.layer && null != e) {
              this.viewer.imageryLayers.raiseToTop(this.layer);
              for (var t = this.viewer.imageryLayers._layers, i = t.length - 1; i >= 0; i--)
                if (t[i] != this.layer) {
                  var a = t[i].config;
                  a && a.order && e < a.order && this.viewer.imageryLayers.lower(this.layer)
                }
            }
          }
        });
      t.TileLayer = s
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.CustomFeatureGridLayer = void 0;
      var n = i(0)
        , r = a(n)
        , o = i(5)
        , s = a(o)
        , l = i(4)
        , u = i(77)
        , d = i(14)
        , c = i(12)
        , h = i(10)
        , f = i(15)
        , p = u.FeatureGridLayer.extend({
          _cacheGrid: {},
          _cacheFeature: {},
          _addImageryCache: function (e) {
            this._cacheGrid[e.key] = {
              opts: e,
              isLoading: !0
            };
            var t = this;
            this.getDataForGrid(e, function (i) {
              t._visible && t._showData(e, i)
            })
          },
          getDataForGrid: function (e, t) {
            this.config.getDataForGrid && this.config.getDataForGrid(e, t)
          },
          checkHasBreak: function (e) {
            return !this._visible || !this._cacheGrid[e]
          },
          _showData: function (e, t) {
            var i = e.key;
            if (!this.checkHasBreak[i]) {
              for (var a = this, n = [], r = 0, o = t.length; r < o; r++) {
                var s = t[r]
                  , l = s[this.config.IdName || "id"]
                  , u = this._cacheFeature[l];
                if (u)
                  u.grid.push(i),
                    this.updateEntity(u.entity, s);
                else {
                  var d = this.createEntity(e, s, function (e) {
                    a.config.debuggerTileInfo && (e._temp_id = l,
                      e.popup = function (e) {
                        return JSON.stringify(a._cacheFeature[e._temp_id].grid)
                      }
                    ),
                      a._cacheFeature[l] = {
                        grid: [i],
                        entity: e
                      }
                  });
                  null != d && (a.config.debuggerTileInfo && (d._temp_id = l,
                    d.popup = function (e) {
                      return JSON.stringify(a._cacheFeature[e._temp_id].grid)
                    }
                  ),
                    a._cacheFeature[l] = {
                      grid: [i],
                      entity: d
                    })
                }
                n.push(l)
              }
              this._cacheGrid[i] = this._cacheGrid[i] || {},
                this._cacheGrid[i].ids = n,
                this._cacheGrid[i].isLoading = !1
            }
          },
          createEntity: function (e, t, i) {
            return this.config.createEntity ? this.config.createEntity(e, t, i) : null
          },
          updateEntity: function (e, t) {
            this.config.updateEntity && this.config.updateEntity(e, t)
          },
          removeEntity: function (e) {
            this.config.removeEntity ? this.config.removeEntity(e) : this.dataSource.entities.remove(e)
          },
          _removeImageryCache: function (e) {
            var t = e.key
              , i = this._cacheGrid[t];
            if (i) {
              if (i.ids)
                for (var a = 0; a < i.ids.length; a++) {
                  var n = i.ids[a]
                    , r = this._cacheFeature[n];
                  r && (r.grid.remove(t),
                    0 == r.grid.length && (delete this._cacheFeature[n],
                      this.removeEntity(r.entity)))
                }
              delete this._cacheGrid[t]
            }
          },
          _removeAllImageryCache: function () {
            this.config.removeAllEntity ? this.config.removeAllEntity() : (this.dataSource.entities.removeAll(),
              this.primitives.removeAll()),
              this._cacheFeature = {},
              this._cacheGrid = {}
          },
          removeEx: function () {
            this.config.removeAllEntity ? this.config.removeAllEntity() : (this.dataSource.entities.removeAll(),
              this.primitives.removeAll()),
              this._cacheFeature = {},
              this._cacheGrid = {},
              this.viewer.dataSources.remove(this.dataSource),
              this.viewer.scene.primitives.remove(this.primitives)
          },
          reload: function () {
            var e = this;
            for (var t in this._cacheGrid) {
              var i = this._cacheGrid[t];
              if (null != i && null != i.opts && !i.isLoading) {
                var a = i.opts;
                this.getDataForGrid(a, function (t) {
                  e._showData(a, t)
                })
              }
            }
          },
          hasOpacity: !0,
          _opacity: 1,
          setOpacity: function (e) {
            this._opacity = e;
            for (var t in this._cacheFeature) {
              var i = this._cacheFeature[t].entity;
              i.polygon && i.polygon.material && i.polygon.material.color ? (this._updatEntityAlpha(i.polygon.material.color, this._opacity),
                i.polygon.outlineColor && this._updatEntityAlpha(i.polygon.outlineColor, this._opacity)) : i.polyline && i.polyline.material && i.polyline.material.color ? this._updatEntityAlpha(i.polyline.material.color, this._opacity) : i.billboard && (i.billboard.color = new r.default.Color.fromCssColorString("#FFFFFF").withAlpha(this._opacity),
                  i.label && (i.label.fillColor && this._updatEntityAlpha(i.label.fillColor, this._opacity),
                    i.label.outlineColor && this._updatEntityAlpha(i.label.outlineColor, this._opacity),
                    i.label.backgroundColor && this._updatEntityAlpha(i.label.backgroundColor, this._opacity)))
            }
          },
          _updatEntityAlpha: function (e, t) {
            var i = e.getValue().withAlpha(t);
            e.setValue(i)
          },
          colorHash: {},
          setDefSymbol: function (e) {
            if (e.polygon) {
              var t = e.properties.OBJECTID
                , i = this.colorHash[t];
              i || (i = r.default.Color.fromRandom({
                minimumGreen: .75,
                maximumBlue: .75,
                alpha: this._opacity
              }),
                this.colorHash[t] = i),
                e.polygon.material = i,
                e.polygon.outline = !0,
                e.polygon.outlineColor = r.default.Color.WHITE
            } else if (e.polyline) {
              var t = e.properties.OBJECTID
                , i = this.colorHash[t];
              i || (i = r.default.Color.fromRandom({
                minimumGreen: .75,
                maximumBlue: .75,
                alpha: this._opacity
              }),
                this.colorHash[t] = i),
                e.polyline.material = i,
                e.polyline.width = 2
            } else
              e.billboard && (e.billboard.scale = .5,
                e.billboard.horizontalOrigin = r.default.HorizontalOrigin.CENTER,
                e.billboard.verticalOrigin = r.default.VerticalOrigin.BOTTOM)
          },
          setConfigSymbol: function (e, t) {
            var i = e.properties
              , a = t.styleOptions;
            if (t.styleField) {
              var n = i[t.styleField]
                , o = t.styleFieldOptions[n];
              null != o && (a = (0,
                l.clone)(a),
                a = s.default.extend(a, o))
            }
            if ("function" == typeof t.calback) {
              var o = t.calback(i, e, t);
              if (!o)
                return;
              a = (0,
                l.clone)(a),
                a = s.default.extend(a, o)
            }
            if (a = a || {},
              this._opacity = a.opacity || 1,
              e.polygon) {
              if ((0,
                f.style2Entity)(a, e.polygon),
                a.outlineWidth && a.outlineWidth > 1) {
                e.polygon.outline = !1;
                var u = {
                  color: a.outlineColor,
                  width: a.outlineWidth,
                  opacity: a.outlineOpacity,
                  lineType: "solid",
                  outline: !1
                }
                  , p = (0,
                    h.style2Entity)(u);
                p.positions = e.polygon.hierarchy._value.positions,
                  this.dataSource.entities.add({
                    polyline: p
                  })
              }
              if (this.config.buildings) {
                var m = Number(i[this.config.buildings.cloumn] || 1)
                  , g = Number(this.config.buildings.height || 5);
                e.polygon.extrudedHeight = m * g
              }
            } else
              e.polyline ? (0,
                h.style2Entity)(a, e.polyline) : e.billboard && (e.billboard.heightReference = r.default.HeightReference.RELATIVE_TO_GROUND,
                  (0,
                    d.style2Entity)(a, e.billboard),
                  a.label && a.label.field && (a.label.heightReference = r.default.HeightReference.RELATIVE_TO_GROUND,
                    e.label = (0,
                      c.style2Entity)(a.label),
                    e.label.text = i[a.label.field]))
          }
        });
      t.CustomFeatureGridLayer = p
    }
    , function (e, t, i) {
      function a(e, t) {
        var i = {}
          , a = e.boundingSphere
          , n = a.center
          , r = s.default.Cartographic.fromCartesian(n)
          , o = Number(r.height.toFixed(2));
        if (i = {
          x: Number(s.default.Math.toDegrees(r.longitude).toFixed(6)),
          y: Number(s.default.Math.toDegrees(r.latitude).toFixed(6)),
          z: o
        },
          console.log("模型内部原始位置:" + JSON.stringify(i)),
          t) {
          var l = s.default.Matrix4.fromArray(e._root.transform)
            , u = s.default.Matrix4.getTranslation(l, new s.default.Cartesian3)
            , d = s.default.Cartographic.fromCartesian(u);
          if (d) {
            i.x = Number(s.default.Math.toDegrees(d.longitude).toFixed(6)),
              i.y = Number(s.default.Math.toDegrees(d.latitude).toFixed(6)),
              i.z = Number(d.height.toFixed(2));
            var c = s.default.Matrix4.getRotation(l, new s.default.Matrix3)
              , h = s.default.Matrix4.getRotation(s.default.Transforms.eastNorthUpToFixedFrame(u), new s.default.Matrix3)
              , f = s.default.Matrix3.getColumn(h, 0, new s.default.Cartesian3)
              , p = s.default.Matrix3.getColumn(h, 1, new s.default.Cartesian3)
              , m = s.default.Matrix3.getColumn(h, 2, new s.default.Cartesian3)
              , g = s.default.Matrix3.getColumn(c, 0, new s.default.Cartesian3);
            g = s.default.Cartesian3.cross(g, m, g),
              g = s.default.Cartesian3.cross(m, g, g),
              g = s.default.Cartesian3.normalize(g, g);
            var v = s.default.Cartesian3.angleBetween(f, g);
            s.default.Cartesian3.angleBetween(p, g) > .5 * Math.PI && (v = 2 * Math.PI - v),
              i.heading = Number(s.default.Math.toDegrees(v).toFixed(1)),
              console.log("模型内部世界矩阵:" + JSON.stringify(i))
          }
        }
        return i
      }
      function n(e, t) {
        if (null == t)
          return e;
        var i;
        switch (t.toUpperCase()) {
          case "Y_UP_TO_Z_UP":
            i = s.default.Axis.Y_UP_TO_Z_UP;
            break;
          case "Z_UP_TO_Y_UP":
            i = s.default.Axis.Z_UP_TO_Y_UP;
            break;
          case "X_UP_TO_Z_UP":
            i = s.default.Axis.X_UP_TO_Z_UP;
            break;
          case "Z_UP_TO_X_UP":
            i = s.default.Axis.Z_UP_TO_X_UP;
            break;
          case "X_UP_TO_Y_UP":
            i = s.default.Axis.X_UP_TO_Y_UP;
            break;
          case "Y_UP_TO_X_UP":
            i = s.default.Axis.Y_UP_TO_X_UP
        }
        return null == i ? e : s.default.Matrix4.multiplyTransformation(e, i, e)
      }
      function r(e, t) {
        var i;
        if (e._root && e._root.transform && t.transform) {
          var a = s.default.Cartesian3.fromDegrees(t.x, t.y, t.z);
          i = s.default.Transforms.eastNorthUpToFixedFrame(a);
          var r = s.default.Matrix4.fromRotationTranslation(s.default.Matrix3.fromRotationZ(s.default.Math.toRadians(t.heading || 0)));
          s.default.Matrix4.multiply(i, r, i),
            t.scale > 0 && 1 != t.scale && s.default.Matrix4.multiplyByUniformScale(i, t.scale, i),
            t.axis && (i = n(i, t.axis)),
            e._root.transform = i
        } else {
          var o = e.boundingSphere
            , l = s.default.Cartographic.fromCartesian(o.center)
            , u = s.default.Cartesian3.fromRadians(l.longitude, l.latitude, 0)
            , d = s.default.Cartesian3.fromDegrees(t.x, t.y, t.z)
            , c = s.default.Cartesian3.subtract(d, u, new s.default.Cartesian3);
          i = s.default.Matrix4.fromTranslation(c),
            e.modelMatrix = i
        }
        return i
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.getCenter = a,
        t.updateMatrix = r;
      var o = i(0)
        , s = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o)
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function n(e) {
        var t = this;
        e = F(e, F.EMPTY_OBJECT),
          this.show = F(e.show, !0),
          this.slice = F(e.slice, 32),
          this.modelMatrix = V.clone(e.modelMatrix, new V),
          this._modelMatrix = new V,
          this._computedModelMatrix = new V,
          this._computedScanPlaneModelMatrix = new V,
          this.radius = F(e.radius, Number.POSITIVE_INFINITY),
          this._radius = void 0,
          this.xHalfAngle = F(e.xHalfAngle, 0),
          this._xHalfAngle = void 0,
          this.yHalfAngle = F(e.yHalfAngle, 0),
          this._yHalfAngle = void 0,
          this.lineColor = F(e.lineColor, O.WHITE),
          this.showSectorLines = F(e.showSectorLines, !0),
          this.showSectorSegmentLines = F(e.showSectorSegmentLines, !0),
          this.showLateralSurfaces = F(e.showLateralSurfaces, !0),
          this.material = I(e.material) ? e.material : X.fromType(X.ColorType),
          this._material = void 0,
          this._translucent = void 0,
          this.lateralSurfaceMaterial = I(e.lateralSurfaceMaterial) ? e.lateralSurfaceMaterial : X.fromType(X.ColorType),
          this._lateralSurfaceMaterial = void 0,
          this._lateralSurfaceTranslucent = void 0,
          this.showDomeSurfaces = F(e.showDomeSurfaces, !0),
          this.domeSurfaceMaterial = I(e.domeSurfaceMaterial) ? e.domeSurfaceMaterial : X.fromType(X.ColorType),
          this._domeSurfaceMaterial = void 0,
          this.showDomeLines = F(e.showDomeLines, !0),
          this.showIntersection = F(e.showIntersection, !0),
          this.intersectionColor = F(e.intersectionColor, O.WHITE),
          this.intersectionWidth = F(e.intersectionWidth, 5),
          this.showThroughEllipsoid = F(e.showThroughEllipsoid, !1),
          this._showThroughEllipsoid = void 0,
          this.showScanPlane = F(e.showScanPlane, !0),
          this.scanPlaneColor = F(e.scanPlaneColor, O.WHITE),
          this.scanPlaneMode = F(e.scanPlaneMode, "horizontal"),
          this.scanPlaneRate = F(e.scanPlaneRate, 10),
          this._scanePlaneXHalfAngle = 0,
          this._scanePlaneYHalfAngle = 0,
          this._time = te.now(),
          this._boundingSphere = new k,
          this._boundingSphereWC = new k,
          this._sectorFrontCommand = new j({
            owner: this,
            primitiveType: z.TRIANGLES,
            boundingVolume: this._boundingSphereWC
          }),
          this._sectorBackCommand = new j({
            owner: this,
            primitiveType: z.TRIANGLES,
            boundingVolume: this._boundingSphereWC
          }),
          this._sectorVA = void 0,
          this._sectorLineCommand = new j({
            owner: this,
            primitiveType: z.LINES,
            boundingVolume: this._boundingSphereWC
          }),
          this._sectorLineVA = void 0,
          this._sectorSegmentLineCommand = new j({
            owner: this,
            primitiveType: z.LINES,
            boundingVolume: this._boundingSphereWC
          }),
          this._sectorSegmentLineVA = void 0,
          this._domeFrontCommand = new j({
            owner: this,
            primitiveType: z.TRIANGLES,
            boundingVolume: this._boundingSphereWC
          }),
          this._domeBackCommand = new j({
            owner: this,
            primitiveType: z.TRIANGLES,
            boundingVolume: this._boundingSphereWC
          }),
          this._domeVA = void 0,
          this._domeLineCommand = new j({
            owner: this,
            primitiveType: z.LINES,
            boundingVolume: this._boundingSphereWC
          }),
          this._domeLineVA = void 0,
          this._scanPlaneFrontCommand = new j({
            owner: this,
            primitiveType: z.TRIANGLES,
            boundingVolume: this._boundingSphereWC
          }),
          this._scanPlaneBackCommand = new j({
            owner: this,
            primitiveType: z.TRIANGLES,
            boundingVolume: this._boundingSphereWC
          }),
          this._scanRadialCommand = void 0,
          this._colorCommands = [],
          this._frontFaceRS = void 0,
          this._backFaceRS = void 0,
          this._sp = void 0,
          this._uniforms = {
            u_type: function () {
              return 0
            },
            u_xHalfAngle: function () {
              return t.xHalfAngle
            },
            u_yHalfAngle: function () {
              return t.yHalfAngle
            },
            u_radius: function () {
              return t.radius
            },
            u_showThroughEllipsoid: function () {
              return t.showThroughEllipsoid
            },
            u_showIntersection: function () {
              return t.showIntersection
            },
            u_intersectionColor: function () {
              return t.intersectionColor
            },
            u_intersectionWidth: function () {
              return t.intersectionWidth
            },
            u_normalDirection: function () {
              return 1
            },
            u_lineColor: function () {
              return t.lineColor
            }
          },
          this._scanUniforms = {
            u_xHalfAngle: function () {
              return t._scanePlaneXHalfAngle
            },
            u_yHalfAngle: function () {
              return t._scanePlaneYHalfAngle
            },
            u_radius: function () {
              return t.radius
            },
            u_color: function () {
              return t.scanPlaneColor
            },
            u_showThroughEllipsoid: function () {
              return t.showThroughEllipsoid
            },
            u_showIntersection: function () {
              return t.showIntersection
            },
            u_intersectionColor: function () {
              return t.intersectionColor
            },
            u_intersectionWidth: function () {
              return t.intersectionWidth
            },
            u_normalDirection: function () {
              return 1
            },
            u_lineColor: function () {
              return t.lineColor
            }
          }
      }
      function r(e, t, i) {
        for (var a = e.slice, n = ae(i), r = ne(i), o = ae(t), s = ne(t), l = re(o * r), u = re(n * s), d = [], c = 0; c < a; c++) {
          var h = 2 * l * c / (a - 1) - l;
          d.push(new A(0, ie(h), ae(h)))
        }
        for (var f = [], c = 0; c < a; c++) {
          var h = 2 * u * c / (a - 1) - u;
          f.push(new A(ie(h), 0, ae(h)))
        }
        return {
          zoy: d,
          zox: f
        }
      }
      function o(e, t) {
        var i = e.xHalfAngle
          , a = e.yHalfAngle
          , n = t.zoy
          , r = t.zox
          , o = []
          , s = ee.fromRotationY(i, se);
        o.push(n.map(function (e) {
          return ee.multiplyByVector(s, e, new b.default.Cartesian3)
        }));
        var s = ee.fromRotationX(-a, se);
        o.push(r.map(function (e) {
          return ee.multiplyByVector(s, e, new b.default.Cartesian3)
        }).reverse());
        var s = ee.fromRotationY(-i, se);
        o.push(n.map(function (e) {
          return ee.multiplyByVector(s, e, new b.default.Cartesian3)
        }).reverse());
        var s = ee.fromRotationX(a, se);
        return o.push(r.map(function (e) {
          return ee.multiplyByVector(s, e, new b.default.Cartesian3)
        })),
          o
      }
      function s(e, t) {
        for (var i = Array.prototype.concat.apply([], t).length - t.length, a = new Float32Array(18 * i), n = 0, r = 0, o = t.length; r < o; r++)
          for (var s = t[r], l = A.normalize(A.cross(s[0], s[s.length - 1], le), le), u = 0, i = s.length - 1; u < i; u++)
            a[n++] = 0,
              a[n++] = 0,
              a[n++] = 0,
              a[n++] = -l.x,
              a[n++] = -l.y,
              a[n++] = -l.z,
              a[n++] = s[u].x,
              a[n++] = s[u].y,
              a[n++] = s[u].z,
              a[n++] = -l.x,
              a[n++] = -l.y,
              a[n++] = -l.z,
              a[n++] = s[u + 1].x,
              a[n++] = s[u + 1].y,
              a[n++] = s[u + 1].z,
              a[n++] = -l.x,
              a[n++] = -l.y,
              a[n++] = -l.z;
        var d = H.createVertexBuffer({
          context: e,
          typedArray: a,
          usage: B.STATIC_DRAW
        })
          , c = 6 * Float32Array.BYTES_PER_ELEMENT
          , h = [{
            index: oe.position,
            vertexBuffer: d,
            componentsPerAttribute: 3,
            componentDatatype: R.FLOAT,
            offsetInBytes: 0,
            strideInBytes: c
          }, {
            index: oe.normal,
            vertexBuffer: d,
            componentsPerAttribute: 3,
            componentDatatype: R.FLOAT,
            offsetInBytes: 3 * Float32Array.BYTES_PER_ELEMENT,
            strideInBytes: c
          }];
        return new J({
          context: e,
          attributes: h
        })
      }
      function l(e, t) {
        for (var i = t.length, a = new Float32Array(9 * i), n = 0, r = 0, o = t.length; r < o; r++) {
          var s = t[r];
          a[n++] = 0,
            a[n++] = 0,
            a[n++] = 0,
            a[n++] = s[0].x,
            a[n++] = s[0].y,
            a[n++] = s[0].z
        }
        var l = H.createVertexBuffer({
          context: e,
          typedArray: a,
          usage: B.STATIC_DRAW
        })
          , u = 3 * Float32Array.BYTES_PER_ELEMENT
          , d = [{
            index: oe.position,
            vertexBuffer: l,
            componentsPerAttribute: 3,
            componentDatatype: R.FLOAT,
            offsetInBytes: 0,
            strideInBytes: u
          }];
        return new J({
          context: e,
          attributes: d
        })
      }
      function u(e, t) {
        for (var i = Array.prototype.concat.apply([], t).length - t.length, a = new Float32Array(9 * i), n = 0, r = 0, o = t.length; r < o; r++)
          for (var s = t[r], l = 0, i = s.length - 1; l < i; l++)
            a[n++] = s[l].x,
              a[n++] = s[l].y,
              a[n++] = s[l].z,
              a[n++] = s[l + 1].x,
              a[n++] = s[l + 1].y,
              a[n++] = s[l + 1].z;
        var u = H.createVertexBuffer({
          context: e,
          typedArray: a,
          usage: B.STATIC_DRAW
        })
          , d = 3 * Float32Array.BYTES_PER_ELEMENT
          , c = [{
            index: oe.position,
            vertexBuffer: u,
            componentsPerAttribute: 3,
            componentDatatype: R.FLOAT,
            offsetInBytes: 0,
            strideInBytes: d
          }];
        return new J({
          context: e,
          attributes: c
        })
      }
      function d(e) {
        var t = b.default.EllipsoidGeometry.createGeometry(new b.default.EllipsoidGeometry({
          vertexFormat: Q.POSITION_ONLY,
          stackPartitions: 32,
          slicePartitions: 32
        }));
        return J.fromGeometry({
          context: e,
          geometry: t,
          attributeLocations: oe,
          bufferUsage: B.STATIC_DRAW,
          interleave: !1
        })
      }
      function c(e) {
        var t = b.default.EllipsoidOutlineGeometry.createGeometry(new b.default.EllipsoidOutlineGeometry({
          vertexFormat: Q.POSITION_ONLY,
          stackPartitions: 32,
          slicePartitions: 32
        }));
        return J.fromGeometry({
          context: e,
          geometry: t,
          attributeLocations: oe,
          bufferUsage: B.STATIC_DRAW,
          interleave: !1
        })
      }
      function h(e, t) {
        for (var i = t.length - 1, a = new Float32Array(9 * i), n = 0, r = 0; r < i; r++)
          a[n++] = 0,
            a[n++] = 0,
            a[n++] = 0,
            a[n++] = t[r].x,
            a[n++] = t[r].y,
            a[n++] = t[r].z,
            a[n++] = t[r + 1].x,
            a[n++] = t[r + 1].y,
            a[n++] = t[r + 1].z;
        var o = H.createVertexBuffer({
          context: e,
          typedArray: a,
          usage: B.STATIC_DRAW
        })
          , s = 3 * Float32Array.BYTES_PER_ELEMENT
          , l = [{
            index: oe.position,
            vertexBuffer: o,
            componentsPerAttribute: 3,
            componentDatatype: R.FLOAT,
            offsetInBytes: 0,
            strideInBytes: s
          }];
        return new J({
          context: e,
          attributes: l
        })
      }
      function f(e, t) {
        var i = t.context
          , a = r(e, e.xHalfAngle, e.yHalfAngle)
          , n = o(e, a);
        if (e.showLateralSurfaces && (e._sectorVA = s(i, n)),
          e.showSectorLines && (e._sectorLineVA = l(i, n)),
          e.showSectorSegmentLines && (e._sectorSegmentLineVA = u(i, n)),
          e.showDomeSurfaces && (e._domeVA = d(i)),
          e.showDomeLines && (e._domeLineVA = c(i)),
          e.showScanPlane)
          if ("horizontal" == e.scanPlaneMode) {
            var f = r(e, $.PI_OVER_TWO, 0);
            e._scanPlaneVA = h(i, f.zox)
          } else {
            var f = r(e, 0, $.PI_OVER_TWO);
            e._scanPlaneVA = h(i, f.zoy)
          }
      }
      function p(e, t, i) {
        var a = t.context
          , n = x.default
          , r = new Z({
            sources: [E.default, i.shaderSource, M.default]
          });
        e._sp = U.replaceCache({
          context: a,
          shaderProgram: e._sp,
          vertexShaderSource: n,
          fragmentShaderSource: r,
          attributeLocations: oe
        });
        var o = new Z({
          sources: [E.default, i.shaderSource, M.default],
          pickColorQualifier: "uniform"
        });
        e._pickSP = U.replaceCache({
          context: a,
          shaderProgram: e._pickSP,
          vertexShaderSource: n,
          fragmentShaderSource: o,
          attributeLocations: oe
        })
      }
      function m(e, t, i) {
        var a = t.context
          , n = x.default
          , r = new Z({
            sources: [E.default, i.shaderSource, T.default]
          });
        e._scanePlaneSP = U.replaceCache({
          context: a,
          shaderProgram: e._scanePlaneSP,
          vertexShaderSource: n,
          fragmentShaderSource: r,
          attributeLocations: oe
        })
      }
      function g(e, t, i) {
        p(e, t, i),
          e.showScanPlane && m(e, t, i)
      }
      function v(e, t, i) {
        i ? (e._frontFaceRS = W.fromCache({
          depthTest: {
            enabled: !t
          },
          depthMask: !1,
          blending: q.ALPHA_BLEND,
          cull: {
            enabled: !0,
            face: Y.BACK
          }
        }),
          e._backFaceRS = W.fromCache({
            depthTest: {
              enabled: !t
            },
            depthMask: !1,
            blending: q.ALPHA_BLEND,
            cull: {
              enabled: !0,
              face: Y.FRONT
            }
          }),
          e._pickRS = W.fromCache({
            depthTest: {
              enabled: !t
            },
            depthMask: !1,
            blending: q.ALPHA_BLEND
          })) : (e._frontFaceRS = W.fromCache({
            depthTest: {
              enabled: !t
            },
            depthMask: !0
          }),
            e._pickRS = W.fromCache({
              depthTest: {
                enabled: !0
              },
              depthMask: !0
            }))
      }
      function y(e, t, i, a, n, r, o, s, l, u, d, c) {
        u && i && (i.vertexArray = o,
          i.renderState = n,
          i.shaderProgram = r,
          i.uniformMap = L(s, e._material._uniforms),
          i.uniformMap.u_normalDirection = function () {
            return -1
          }
          ,
          i.pass = d,
          i.modelMatrix = l,
          e._colorCommands.push(i)),
          t.vertexArray = o,
          t.renderState = a,
          t.shaderProgram = r,
          t.uniformMap = L(s, e._material._uniforms),
          c && (t.uniformMap.u_type = function () {
            return 1
          }
          ),
          t.pass = d,
          t.modelMatrix = l,
          e._colorCommands.push(t)
      }
      function w(e, t) {
        e._colorCommands.length = 0;
        var i = t ? G.TRANSLUCENT : G.OPAQUE;
        e.showLateralSurfaces && y(e, e._sectorFrontCommand, e._sectorBackCommand, e._frontFaceRS, e._backFaceRS, e._sp, e._sectorVA, e._uniforms, e._computedModelMatrix, t, i),
          e.showSectorLines && y(e, e._sectorLineCommand, void 0, e._frontFaceRS, e._backFaceRS, e._sp, e._sectorLineVA, e._uniforms, e._computedModelMatrix, t, i, !0),
          e.showSectorSegmentLines && y(e, e._sectorSegmentLineCommand, void 0, e._frontFaceRS, e._backFaceRS, e._sp, e._sectorSegmentLineVA, e._uniforms, e._computedModelMatrix, t, i, !0),
          e.showDomeSurfaces && y(e, e._domeFrontCommand, e._domeBackCommand, e._frontFaceRS, e._backFaceRS, e._sp, e._domeVA, e._uniforms, e._computedModelMatrix, t, i),
          e.showDomeLines && y(e, e._domeLineCommand, void 0, e._frontFaceRS, e._backFaceRS, e._sp, e._domeLineVA, e._uniforms, e._computedModelMatrix, t, i, !0),
          e.showScanPlane && y(e, e._scanPlaneFrontCommand, e._scanPlaneBackCommand, e._frontFaceRS, e._backFaceRS, e._scanePlaneSP, e._scanPlaneVA, e._scanUniforms, e._computedScanPlaneModelMatrix, t, i)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.RectangularSensorPrimitive = void 0;
      var _ = i(0)
        , b = a(_)
        , C = i(104)
        , x = a(C)
        , P = i(105)
        , M = a(P)
        , S = i(106)
        , E = a(S)
        , D = i(107)
        , T = a(D)
        , k = b.default.BoundingSphere
        , A = b.default.Cartesian3
        , O = b.default.Color
        , L = b.default.combine
        , R = b.default.ComponentDatatype
        , F = b.default.defaultValue
        , I = b.default.defined
        , N = b.default.DeveloperError
        , V = b.default.Matrix4
        , z = b.default.PrimitiveType
        , H = b.default.Buffer
        , B = b.default.BufferUsage
        , j = b.default.DrawCommand
        , G = b.default.Pass
        , W = b.default.RenderState
        , U = b.default.ShaderProgram
        , Z = b.default.ShaderSource
        , J = b.default.VertexArray
        , q = b.default.BlendingState
        , Y = b.default.CullFace
        , X = b.default.Material
        , K = b.default.SceneMode
        , Q = b.default.VertexFormat
        , $ = b.default.Math
        , ee = b.default.Matrix3
        , V = b.default.Matrix4
        , te = b.default.JulianDate
        , ie = Math.sin
        , ae = Math.cos
        , ne = Math.tan
        , re = Math.atan
        , oe = (Math.asin,
        {
          position: 0,
          normal: 1
        });
      n.prototype.update = function (e) {
        var t = e.mode;
        if (this.show && t === K.SCENE3D) {
          var i = !1
            , a = !1
            , n = !1
            , r = this.xHalfAngle
            , o = this.yHalfAngle;
          if (r < 0 || o < 0)
            throw new N("halfAngle must be greater than or equal to zero.");
          if (0 != r && 0 != o) {
            this._xHalfAngle === r && this._yHalfAngle === o || (this._xHalfAngle = r,
              this._yHalfAngle = o,
              i = !0);
            var s = this.radius;
            if (s < 0)
              throw new N("this.radius must be greater than or equal to zero.");
            var l = !1;
            this._radius !== s && (l = !0,
              this._radius = s,
              this._boundingSphere = new k(A.ZERO, this.radius));
            (!V.equals(this.modelMatrix, this._modelMatrix) || l) && (V.clone(this.modelMatrix, this._modelMatrix),
              V.multiplyByUniformScale(this.modelMatrix, this.radius, this._computedModelMatrix),
              k.transform(this._boundingSphere, this.modelMatrix, this._boundingSphereWC));
            var u = this.showThroughEllipsoid;
            this._showThroughEllipsoid !== this.showThroughEllipsoid && (this._showThroughEllipsoid = u,
              a = !0);
            var d = this.material;
            this._material !== d && (this._material = d,
              a = !0,
              n = !0);
            var c = d.isTranslucent();
            if (this._translucent !== c && (this._translucent = c,
              a = !0),
              this.showScanPlane) {
              var h = e.time
                , p = te.secondsDifference(h, this._time);
              p < 0 && (this._time = te.clone(h, this._time));
              var m, y = Math.max(p % this.scanPlaneRate / this.scanPlaneRate, 0);
              if ("horizontal" == this.scanPlaneMode) {
                m = 2 * o * y - o;
                var _ = ae(m)
                  , C = ne(r)
                  , x = re(_ * C);
                this._scanePlaneXHalfAngle = x,
                  this._scanePlaneYHalfAngle = m,
                  b.default.Matrix3.fromRotationX(this._scanePlaneYHalfAngle, se)
              } else {
                m = 2 * r * y - r;
                var P = ne(o)
                  , M = ae(m)
                  , S = re(M * P);
                this._scanePlaneXHalfAngle = m,
                  this._scanePlaneYHalfAngle = S,
                  b.default.Matrix3.fromRotationY(this._scanePlaneXHalfAngle, se)
              }
              b.default.Matrix4.multiplyByMatrix3(this.modelMatrix, se, this._computedScanPlaneModelMatrix),
                V.multiplyByUniformScale(this._computedScanPlaneModelMatrix, this.radius, this._computedScanPlaneModelMatrix)
            }
            i && f(this, e),
              a && v(this, u, c),
              n && g(this, e, d),
              (a || n) && w(this, c);
            var E = e.commandList
              , D = e.passes
              , T = this._colorCommands;
            if (D.render)
              for (var O = 0, L = T.length; O < L; O++) {
                var R = T[O];
                E.push(R)
              }
          }
        }
      }
        ;
      var se = new ee
        , le = new A;
      t.RectangularSensorPrimitive = n
    }
    , function (e, t, i) {
      function a(e) {
        this._show = void 0,
          this._radius = void 0,
          this._xHalfAngle = void 0,
          this._yHalfAngle = void 0,
          this._lineColor = void 0,
          this._showSectorLines = void 0,
          this._showSectorSegmentLines = void 0,
          this._showLateralSurfaces = void 0,
          this._material = void 0,
          this._showDomeSurfaces = void 0,
          this._showDomeLines = void 0,
          this._showIntersection = void 0,
          this._intersectionColor = void 0,
          this._intersectionWidth = void 0,
          this._showThroughEllipsoid = void 0,
          this._gaze = void 0,
          this._showScanPlane = void 0,
          this._scanPlaneColor = void 0,
          this._scanPlaneMode = void 0,
          this._scanPlaneRate = void 0,
          this._definitionChanged = new r.default.Event,
          this.merge(r.default.defaultValue(e, r.default.defaultValue.EMPTY_OBJECT))
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.RectangularSensorGraphics = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n);
      r.default.defineProperties(a.prototype, {
        definitionChanged: {
          get: function () {
            return this._definitionChanged
          }
        },
        show: r.default.createPropertyDescriptor("show"),
        radius: r.default.createPropertyDescriptor("radius"),
        xHalfAngle: r.default.createPropertyDescriptor("xHalfAngle"),
        yHalfAngle: r.default.createPropertyDescriptor("yHalfAngle"),
        lineColor: r.default.createPropertyDescriptor("lineColor"),
        showSectorLines: r.default.createPropertyDescriptor("showSectorLines"),
        showSectorSegmentLines: r.default.createPropertyDescriptor("showSectorSegmentLines"),
        showLateralSurfaces: r.default.createPropertyDescriptor("showLateralSurfaces"),
        material: r.default.createMaterialPropertyDescriptor("material"),
        showDomeSurfaces: r.default.createPropertyDescriptor("showDomeSurfaces"),
        showDomeLines: r.default.createPropertyDescriptor("showDomeLines "),
        showIntersection: r.default.createPropertyDescriptor("showIntersection"),
        intersectionColor: r.default.createPropertyDescriptor("intersectionColor"),
        intersectionWidth: r.default.createPropertyDescriptor("intersectionWidth"),
        showThroughEllipsoid: r.default.createPropertyDescriptor("showThroughEllipsoid"),
        gaze: r.default.createPropertyDescriptor("gaze"),
        showScanPlane: r.default.createPropertyDescriptor("showScanPlane"),
        scanPlaneColor: r.default.createPropertyDescriptor("scanPlaneColor"),
        scanPlaneMode: r.default.createPropertyDescriptor("scanPlaneMode"),
        scanPlaneRate: r.default.createPropertyDescriptor("scanPlaneRate")
      }),
        a.prototype.clone = function (e) {
          return r.default.defined(e) || (e = new a),
            e.show = this.show,
            e.radius = this.radius,
            e.xHalfAngle = this.xHalfAngle,
            e.yHalfAngle = this.yHalfAngle,
            e.lineColor = this.lineColor,
            e.showSectorLines = this.showSectorLines,
            e.showSectorSegmentLines = this.showSectorSegmentLines,
            e.showLateralSurfaces = this.showLateralSurfaces,
            e.material = this.material,
            e.showDomeSurfaces = this.showDomeSurfaces,
            e.showDomeLines = this.showDomeLines,
            e.showIntersection = this.showIntersection,
            e.intersectionColor = this.intersectionColor,
            e.intersectionWidth = this.intersectionWidth,
            e.showThroughEllipsoid = this.showThroughEllipsoid,
            e.gaze = this.gaze,
            e.showScanPlane = this.showScanPlane,
            e.scanPlaneColor = this.scanPlaneColor,
            e.scanPlaneMode = this.scanPlaneMode,
            e.scanPlaneRate = this.scanPlaneRate,
            e
        }
        ,
        a.prototype.merge = function (e) {
          if (!r.default.defined(e))
            throw new r.default.DeveloperError("source is required.");
          this.slice = r.default.defaultValue(this.slice, e.slice),
            this.show = r.default.defaultValue(this.show, e.show),
            this.radius = r.default.defaultValue(this.radius, e.radius),
            this.xHalfAngle = r.default.defaultValue(this.xHalfAngle, e.xHalfAngle),
            this.yHalfAngle = r.default.defaultValue(this.yHalfAngle, e.yHalfAngle),
            this.lineColor = r.default.defaultValue(this.lineColor, e.lineColor),
            this.showSectorLines = r.default.defaultValue(this.showSectorLines, e.showSectorLines),
            this.showSectorSegmentLines = r.default.defaultValue(this.showSectorSegmentLines, e.showSectorSegmentLines),
            this.showLateralSurfaces = r.default.defaultValue(this.showLateralSurfaces, e.showLateralSurfaces),
            this.material = r.default.defaultValue(this.material, e.material),
            this.showDomeSurfaces = r.default.defaultValue(this.showDomeSurfaces, e.showDomeSurfaces),
            this.showDomeLines = r.default.defaultValue(this.showDomeLines, e.showDomeLines),
            this.showIntersection = r.default.defaultValue(this.showIntersection, e.showIntersection),
            this.intersectionColor = r.default.defaultValue(this.intersectionColor, e.intersectionColor),
            this.intersectionWidth = r.default.defaultValue(this.intersectionWidth, e.intersectionWidth),
            this.showThroughEllipsoid = r.default.defaultValue(this.showThroughEllipsoid, e.showThroughEllipsoid),
            this.gaze = r.default.defaultValue(this.gaze, e.gaze),
            this.showScanPlane = r.default.defaultValue(this.showScanPlane, e.showScanPlane),
            this.scanPlaneColor = r.default.defaultValue(this.scanPlaneColor, e.scanPlaneColor),
            this.scanPlaneMode = r.default.defaultValue(this.scanPlaneMode, e.scanPlaneMode),
            this.scanPlaneRate = r.default.defaultValue(this.scanPlaneRate, e.scanPlaneRate)
        }
        ,
        t.RectangularSensorGraphics = a
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      i(44),
        i(45);
      var r = i(0)
        , o = n(r)
        , s = i(11)
        , l = i(29)
        , u = a(l)
        , d = i(46)
        , c = i(31)
        , h = a(c)
        , f = i(47)
        , p = i(32)
        , m = i(20)
        , g = n(m)
        , v = i(19)
        , y = a(v)
        , w = i(4)
        , _ = a(w)
        , b = i(40)
        , C = a(b)
        , x = i(90)
        , P = a(x)
        , M = i(1)
        , S = a(M)
        , E = i(91)
        , D = i(92)
        , T = i(16)
        , k = i(95)
        , A = a(k)
        , O = i(7)
        , L = a(O)
        , R = i(3)
        , F = i(2)
        , I = a(F)
        , N = i(6)
        , V = a(N)
        , z = i(96)
        , H = i(97)
        , B = i(98)
        , j = i(99)
        , G = i(100)
        , W = n(G)
        , U = i(101)
        , Z = n(U)
        , J = i(102)
        , q = i(35)
        , Y = i(25)
        , X = i(103)
        , K = i(41)
        , Q = i(42)
        , $ = i(108)
        , ee = i(110)
        , te = i(111)
        , ie = i(112)
        , ae = i(113)
        , ne = i(115)
        , re = i(117);
      console.log("当前Cesium版本：" + o.default.VERSION + " ， DasGIS版本：" + t.version),
        t.Class = s.Class,
        t.widget = u,
        t.widget.BaseWidget = d.BaseWidget,
        t.image = h.image,
        t.createMap = f.createMap,
        t.ViewerEx = p.ViewerEx,
        t.layer = g.default,
        t.pointconvert = y,
        t.util = _,
        t.util.tileset = C,
        t.matrix = P,
        t.point = S,
        t.FlowEcharts = E.FlowEcharts,
        t.MapVLayer = D.MapVLayer,
        t.Draw = T.Draw,
        t.draw = {},
        t.draw.util = I,
        t.draw.event = L,
        t.draw.tooltip = R.message,
        t.draw.dragger = V,
        t.draw.attr = A,
        t.Measure = z.Measure,
        t.DivPoint = H.DivPoint,
        t.FlyLine = B.FlyLine,
        t.TilesEditor = j.TilesEditor,
        t.shaders = {},
        t.shaders.Rain = W.default,
        t.shaders.Snow = Z.default,
        t.CircleFadeMaterial = J.CircleFadeMaterial,
        t.CircleWaveMaterial = q.CircleWaveMaterial,
        t.LineFlowMaterial = Y.LineFlowMaterial,
        t.TextMaterial = X.TextMaterial,
        t.AnimationLineMaterialProperty = Y.LineFlowMaterial,
        t.ElliposidFadeMaterialProperty = J.CircleFadeMaterial,
        t.RectangularSensorPrimitive = K.RectangularSensorPrimitive,
        t.RectangularSensorGraphics = Q.RectangularSensorGraphics,
        t.RectangularSensorVisualizer = $.RectangularSensorVisualizer;
      var oe = o.default.DataSourceDisplay.defaultVisualizersCallback;
      o.default.DataSourceDisplay.defaultVisualizersCallback = function (e, t, i) {
        var a = i.entities;
        return oe(e, t, i).concat([new $.RectangularSensorVisualizer(e, a)])
      }
        ,
        t.analysi = {},
        t.analysi.TerrainClipPlan = ee.TerrainClipPlan,
        t.analysi.TilesetClipPlan = te.TilesetClipPlan,
        t.analysi.FloodByEntity = ie.FloodByEntity,
        t.analysi.ViewShed3D = ae.ViewShed3D,
        t.analysi.VideoShed3D = ne.VideoShed3D,
        t.analysi.Underground = re.Underground
    }
    , function (e, t) { }
    , function (e, t) { }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.BaseWidget = void 0;
      var a = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        , n = i(5)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(11)
        , s = i(2)
        , l = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(s)
        , u = i(30)
        , d = i(29)
        , c = [];
      t.BaseWidget = o.Class.extend({
        viewer: null,
        options: {},
        config: {},
        path: "",
        isActivate: !1,
        isCreate: !1,
        initialize: function (e, t) {
          this.viewer = t,
            this.config = e,
            this.path = e.path || "",
            this.init()
        },
        addCacheVersion: function (e) {
          if (null == e)
            return e;
          var t = (0,
            d.getCacheVersion)();
          return t && (-1 == e.indexOf("?") ? e += "?time=" + t : -1 == e.indexOf("time=" + t) && (e += "&time=" + t)),
            e
        },
        activateBase: function () {
          var e = this;
          if (this.isActivate)
            return void this.changeWidgetView(function (e) {
              e._dom && ((0,
                r.default)(".layui-layer").each(function () {
                  (0,
                    r.default)(this).css("z-index", 19891e3)
                }),
                (0,
                  r.default)(e._dom).css("z-index", 19891014))
            });
          if (this.beforeActivate(),
            this.isActivate = !0,
            !this.isCreate) {
            if (this.options.resources && this.options.resources.length > 0) {
              for (var t = [], i = 0; i < this.options.resources.length; i++) {
                var a = this.options.resources[i];
                a = this._getUrl(a),
                  -1 == c.indexOf(a) && t.push(a)
              }
              return c = c.concat(t),
                void u.Loader.async(t, function () {
                  if (!e.create(function () {
                    e._createWidgetView(),
                      e.isCreate = !0
                  })) {
                    if (e.config.createAtStart)
                      return e.config.createAtStart = !1,
                        e.isActivate = !1,
                        void (e.isCreate = !0);
                    e._createWidgetView(),
                      e.isCreate = !0
                  }
                })
            }
            if (this.create(function () {
              e._createWidgetView(),
                this.isCreate = !0
            }))
              return;
            if (e.config.createAtStart)
              return e.config.createAtStart = !1,
                e.isActivate = !1,
                void (e.isCreate = !0);
            this.isCreate = !0
          }
          return this._createWidgetView(),
            this
        },
        _createWidgetView: function () {
          var e = this.options.view;
          if (void 0 === e || null === e)
            this._startActivate();
          else if (l.isArray(e)) {
            this._viewcreate_allcount = e.length,
              this._viewcreate_okcount = 0;
            for (var t = 0; t < e.length; t++)
              this.createItemView(e[t])
          } else
            this._viewcreate_allcount = 1,
              this._viewcreate_okcount = 0,
              this.createItemView(e)
        },
        changeWidgetView: function (e) {
          var t = this.options.view;
          if (void 0 === t || null === t)
            return !1;
          if (l.isArray(t)) {
            for (var i = !1, a = 0; a < t.length; a++)
              i = i || e(t[a]);
            return i
          }
          return e(t)
        },
        createItemView: function (e) {
          switch (e.type) {
            default:
            case "window":
              this._openWindow(e);
              break;
            case "divwindow":
              this._openDivWindow(e);
              break;
            case "append":
              this._appendView(e);
              break;
            case "custom":
              var t = this._getUrl(e.url)
                , i = this;
              e.open(t, function (t) {
                i.winCreateOK(e, t),
                  ++i._viewcreate_okcount >= i._viewcreate_allcount && i._startActivate(t)
              }, this)
          }
        },
        _viewcreate_allcount: 0,
        _viewcreate_okcount: 0,
        _openWindow: function (e) {
          var t = this
            , i = this._getUrl(e.url)
            , a = {
              type: 2,
              content: [i, "no"],
              success: function (a) {
                e._layerOpening = !1,
                  e._dom = a;
                var n = window[a.find("iframe")[0].name];
                t.config.hasOwnProperty("visible") && !t.config.visible && (0,
                  r.default)(a).hide(),
                  layer.setTop(a),
                  t.winCreateOK(e, n),
                  t._viewcreate_okcount++,
                  t._viewcreate_okcount >= t._viewcreate_allcount && t._startActivate(a),
                  n && n.initWidgetView ? n.initWidgetView(t) : console.error(i + "页面没有定义function initWidgetView(widget)方法，无法初始化widget页面!")
              }
            };
          e._layerIdx,
            e._layerOpening = !0,
            e._layerIdx = layer.open(this._getWinOpt(e, a))
        },
        _openDivWindow: function (e) {
          var t = this._getUrl(e.url)
            , i = this;
          this.getHtml(t, function (t) {
            var a = {
              type: 1,
              content: t,
              success: function (t) {
                e._layerOpening = !1,
                  e._dom = t,
                  i.config.hasOwnProperty("visible") && !i.config.visible && (0,
                    r.default)(t).hide(),
                  layer.setTop(t),
                  i.winCreateOK(e, t),
                  ++i._viewcreate_okcount >= i._viewcreate_allcount && i._startActivate(t)
              }
            };
            e._layerOpening = !0,
              e._layerIdx = layer.open(i._getWinOpt(e, a))
          })
        },
        _getUrl: function (e) {
          return e = this.addCacheVersion(e),
            e.startsWith("/") || e.startsWith(".") || e.startsWith("http") ? e : this.path + e
        },
        _getWinOpt: function (e, t) {
          var i = (0,
            d.getDefWindowOptions)()
            , a = r.default.extend(i, e.windowOptions);
          a = r.default.extend(a, this.config.windowOptions),
            e.windowOptions = a;
          var n = this
            , o = this._getWinSize(a)
            , s = {
              title: !a.noTitle && (this.config.name || " "),
              area: o.area,
              offset: o.offset,
              shade: 0,
              maxmin: !1,
              zIndex: layer.zIndex,
              end: function () {
                e._layerIdx = -1,
                  e._dom = null,
                  n.disableBase()
              },
              full: function (e) {
                n.winFull(e)
              },
              min: function (e) {
                n.winMin(e)
              },
              restore: function (e) {
                n.winRestore(e)
              }
            }
            , l = r.default.extend(s, a);
          return r.default.extend(l, t || {})
        },
        _getWinSize: function (e) {
          var t = this.bfb2Number(e.width, document.documentElement.clientWidth, e)
            , i = this.bfb2Number(e.height, document.documentElement.clientHeight, e)
            , n = ""
            , r = e.position;
          if (r)
            if ("string" == typeof r)
              n = r;
            else if ("object" == (void 0 === r ? "undefined" : a(r))) {
              var o, s;
              if (r.hasOwnProperty("top") && null != r.top && (o = this.bfb2Number(r.top, document.documentElement.clientHeight, e)),
                r.hasOwnProperty("bottom") && null != r.bottom) {
                e._hasresize = !0;
                var l = this.bfb2Number(r.bottom, document.documentElement.clientHeight, e);
                null != o ? i = document.documentElement.clientHeight - o - l : o = document.documentElement.clientHeight - i - l
              }
              if (r.hasOwnProperty("left") && null != r.left && (s = this.bfb2Number(r.left, document.documentElement.clientWidth, e)),
                r.hasOwnProperty("right") && null != r.right) {
                e._hasresize = !0;
                var u = this.bfb2Number(r.right, document.documentElement.clientWidth, e);
                null != s ? t = document.documentElement.clientWidth - s - u : s = document.documentElement.clientWidth - t - u
              }
              null == o && (o = (document.documentElement.clientHeight - i) / 2),
                null == s && (s = (document.documentElement.clientWidth - t) / 2),
                n = [o + "px", s + "px"]
            }
          e.hasOwnProperty("minHeight") && i < e.minHeight && (e._hasresize = !0,
            i = e.minHeight),
            e.hasOwnProperty("maxHeight") && i > e.maxHeight && (e._hasresize = !0,
              i = e.maxHeight),
            e.hasOwnProperty("minHeight") && t < e.minWidth && (e._hasresize = !0,
              t = e.minWidth),
            e.hasOwnProperty("maxWidth") && t > e.maxWidth && (e._hasresize = !0,
              t = e.maxWidth);
          var d;
          return d = t && i ? [t + "px", i + "px"] : t + "px",
          {
            area: d,
            offset: n
          }
        },
        bfb2Number: function (e, t, i) {
          return "string" == typeof e && -1 != e.indexOf("%") ? (i._hasresize = !0,
            t * Number(e.replace("%", "")) / 100) : e
        },
        _appendView: function (e) {
          if (this.isCreate && e._dom)
            (0,
              r.default)(e._dom).show({
                duration: 500
              }),
              this._startActivate(e._dom);
          else {
            var t = this._getUrl(e.url)
              , i = this;
            i.getHtml(t, function (t) {
              e._dom = (0,
                r.default)(t).appendTo(e.parent || "body"),
                i.winCreateOK(e, t),
                ++i._viewcreate_okcount >= i._viewcreate_allcount && i._startActivate(t)
            })
          }
        },
        disableBase: function () {
          if (this.isActivate) {
            this.beforeDisable();
            this.changeWidgetView(function (e) {
              return null != e._layerIdx && -1 != e._layerIdx ? (e._layerOpening,
                layer.close(e._layerIdx),
                !0) : ("append" == e.type && e._dom && (0,
                  r.default)(e._dom).hide({
                    duration: 1e3
                  }),
                  "custom" == e.type && e.close && e.close(),
                  !1)
            }) || (this.disable(),
              this.isActivate = !1)
          }
        },
        setViewVisible: function (e) {
          this.changeWidgetView(function (t) {
            null != t._layerIdx && -1 != t._layerIdx ? e ? (0,
              r.default)("#layui-layer" + t._layerIdx).show() : (0,
                r.default)("#layui-layer" + t._layerIdx).hide() : "append" == t.type && t._dom && (e ? (0,
                  r.default)(t._dom).show() : (0,
                    r.default)(t._dom).hide())
          })
        },
        setViewCss: function (e) {
          this.changeWidgetView(function (t) {
            null != t._layerIdx && -1 != t._layerIdx ? (0,
              r.default)("#layui-layer" + t._layerIdx).css(e) : "append" == t.type && t._dom && (0,
                r.default)(t._dom).css(e)
          })
        },
        indexResize: function () {
          if (this.isActivate) {
            var e = this;
            this.changeWidgetView(function (t) {
              if (null != t._layerIdx && -1 != t._layerIdx && null != t.windowOptions && t.windowOptions._hasresize) {
                var i = e._getWinSize(t.windowOptions)
                  , a = {
                    width: i.area[0],
                    height: i.area[1],
                    top: i.offset[0],
                    left: i.offset[1]
                  };
                (0,
                  r.default)(t._dom).attr("myTopLeft", !0),
                  layer.style(t._layerIdx, a),
                  "divwindow" == t.type && layer.iframeAuto(t._layerIdx)
              }
            })
          }
        },
        _startActivate: function (e) {
          this.activate(e),
            this.config.success && this.config.success(this),
            this.isActivate || this.disableBase()
        },
        init: function () { },
        create: function (e) { },
        beforeActivate: function () { },
        activate: function (e) { },
        beforeDisable: function () { },
        disable: function () { },
        winCreateOK: function (e, t) { },
        winFull: function () { },
        winMin: function () { },
        winRestore: function () { },
        getHtml: function (e, t) {
          r.default.ajax({
            url: e,
            type: "GET",
            dataType: "html",
            timeout: 0,
            success: function (e) {
              t(e)
            }
          })
        }
      })
    }
    , function (module, exports, __webpack_require__) {
      function _interopRequireWildcard(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function createMap(e) {
        if ((0,
          _alert.testTk)()) {
          if (e.url)
            return _jquery2.default.ajax({
              type: "get",
              dataType: "json",
              url: e.url,
              timeout: 0,
              success: function (t) {
                t.serverURL && (e.serverURL = t.serverURL);
                var i = initMap(t.map3d, e);
                e.success && e.success(i, t, t)
              },
              error: function (t, i, a) {
                console.log(e.url + "文件加载失败！"),
                  _util.alert(e.url + "文件加载失败！")
              }
            }),
              null;
          var t = initMap(e.data, e);
          return e.success && e.success(t, e.data),
            t
        }
      }
      function initMap(e, t) {
        var i = t.id
          , a = {
            animation: !1,
            timeline: !1,
            fullscreenButton: !0,
            vrButton: !1,
            geocoder: !1,
            sceneModePicker: !1,
            homeButton: !0,
            navigationHelpButton: !0,
            navigationInstructionsInitiallyVisible: !1,
            infoBox: !0,
            selectionIndicator: !1,
            shouldAnimate: !0,
            showRenderLoopErrors: !0,
            baseLayerPicker: !1,
            contextmenu: !0
          };
        for (var n in e)
          a[n] = e[n];
        if (a)
          for (var n in t)
            "id" !== n && "success" !== n && (a[n] = t[n]);
        _Cesium2.default.Ion && (_Cesium2.default.Ion.defaultAccessToken = a.ionToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NjM5MjMxOS1lMWVkLTQyNDQtYTM4Yi0wZjA4ZDMxYTlmNDMiLCJpZCI6MTQ4MiwiaWF0IjoxNTI4Njc3NDQyfQ.vVoSexHMqQhKK5loNCv6gCA5d5_z3wE2M0l_rWnIP_w"),
          _Cesium2.default.AnimationViewModel.defaultTicks = a.animationTicks || [.1, .25, .5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600],
          !0 === a.geocoder && (a.geocoder = new _GaodePOIGeocoder.GaodePOIGeocoder(a.geocoderConfig));
        var r;
        a.terrain && a.terrain.visible && (r = getTerrainProvider(a.terrain, a.serverURL),
          a.terrainProvider = r);
        var o = !1;
        if (a.baseLayerPicker) {
          if (!a.imageryProviderViewModels && a.basemaps && a.basemaps.length > 0) {
            var s = getImageryProviderArr(a.basemaps);
            a.imageryProviderViewModels = s.imageryProviderViewModels,
              a.selectedImageryProviderViewModel = s.imageryProviderViewModels[s.index]
          }
          a.terrainProviderViewModels || (a.terrainProviderViewModels = getTerrainProviderViewModelsArr(a.terrain, a.serverURL),
            a.selectedTerrainProviderViewModel = a.terrainProviderViewModels[1])
        } else
          null == a.imageryProvider && (o = !0,
            a.imageryProvider = _Cesium2.default.createTileMapServiceImageryProvider({
              url: _Cesium2.default.buildModuleUrl("Assets/Textures/NaturalEarthII")
            }));
        var l = new _Cesium2.default.Viewer(i, a);
        if (o)
          for (var u = l.imageryLayers, d = u.length, c = 0; c < d; c++) {
            var h = u.get(0);
            u.remove(h, !0)
          }
        return a.geocoder && (a.geocoder.viewer = l),
          delete a.geocoder,
          delete a.imageryProviderViewModels,
          delete a.selectedImageryProviderViewModel,
          delete a.terrainProviderViewModels,
          delete a.selectedTerrainProviderViewModel,
          delete a.terrainProvider,
          delete a.imageryProvider,
          l.das = new _ViewerEx.ViewerEx(l, a),
          r && (l.das.terrainProvider = r),
          l.gisdata = {
            config: l.das.config
          },
          l
      }
      function getTerrainProvider(e, t) {
        return e.url && (t && (e.url = e.url.replace("$serverURL$", t)),
          e.url = e.url.replace("$hostname$", location.hostname).replace("$host$", location.host)),
          _util.getTerrainProvider(e)
      }
      function getImageryProviderArr(layersCfg) {
        var providerViewModels = []
          , selectedIndex = 0;
        window._temp_createImageryProvider = _layer.createImageryProvider;
        for (var i = 0; i < layersCfg.length; i++) {
          var item = layersCfg[i];
          if ("group" != item.type || null != item.layers) {
            item.visible && (selectedIndex = providerViewModels.length);
            var funstr = "window._temp_basemaps" + i + " = function () {                        var item = " + JSON.stringify(item) + ';                        if (item.type == "group") {                            var arrVec = [];                            for (var index = 0; index < item.layers.length; index++) {                                var temp = window._temp_createImageryProvider(item.layers[index]);                                if (temp == null) continue;                                arrVec.push(temp);                            }                            return arrVec;                        }                        else {                            return window._temp_createImageryProvider(item);                        }                     }';
            eval(funstr);
            var imgModel = new _Cesium2.default.ProviderViewModel({
              name: item.name || "未命名",
              tooltip: item.name || "未命名",
              iconUrl: item.icon || "",
              creationFunction: eval("window._temp_basemaps" + i)
            });
            providerViewModels.push(imgModel)
          }
        }
        return {
          imageryProviderViewModels: providerViewModels,
          index: selectedIndex
        }
      }
      function getTerrainProviderViewModelsArr(e, t) {
        return [new _Cesium2.default.ProviderViewModel({
          name: "无地形",
          iconUrl: _Cesium2.default.buildModuleUrl("Widgets/Images/TerrainProviders/Ellipsoid.png"),
          tooltip: "WGS84标准椭球，即 EPSG:4326",
          category: "",
          creationFunction: function () {
            return new _Cesium2.default.EllipsoidTerrainProvider({
              ellipsoid: _Cesium2.default.Ellipsoid.WGS84
            })
          }
        }), new _Cesium2.default.ProviderViewModel({
          name: "中国地形",
          iconUrl: _Cesium2.default.buildModuleUrl("Widgets/Images/TerrainProviders/CesiumWorldTerrain.png"),
          tooltip: "高分辨率中国地形",
          category: "",
          creationFunction: function () {
            return getTerrainProvider(e, t)
          }
        }), new _Cesium2.default.ProviderViewModel({
          name: "全球地形",
          iconUrl: _Cesium2.default.buildModuleUrl("Widgets/Images/TerrainProviders/CesiumWorldTerrain.png"),
          tooltip: "Cesium官方 提供的高分辨率全球地形",
          category: "",
          creationFunction: function () {
            return _util.getTerrainProvider({
              type: "ion"
            })
          }
        })]
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }),
        exports.createMap = createMap;
      var _Cesium = __webpack_require__(0)
        , _Cesium2 = _interopRequireDefault(_Cesium)
        , _jquery = __webpack_require__(5)
        , _jquery2 = _interopRequireDefault(_jquery)
        , _util2 = __webpack_require__(4)
        , _util = _interopRequireWildcard(_util2)
        , _ViewerEx = __webpack_require__(32)
        , _GaodePOIGeocoder = __webpack_require__(88)
        , _layer = __webpack_require__(20)
        , _alert = __webpack_require__(89)
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.Evented = t.Events = void 0;
      var a = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        , n = i(11)
        , r = i(2)
        , o = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(r)
        , s = t.Events = {
          on: function (e, t, i) {
            if ("object" === (void 0 === e ? "undefined" : a(e)))
              for (var n in e)
                this._on(n, e[n], t);
            else {
              e = o.splitWords(e);
              for (var r = 0, s = e.length; r < s; r++)
                this._on(e[r], t, i)
            }
            return this
          },
          off: function (e, t, i) {
            if (e)
              if ("object" === (void 0 === e ? "undefined" : a(e)))
                for (var n in e)
                  this._off(n, e[n], t);
              else {
                e = o.splitWords(e);
                for (var r = 0, s = e.length; r < s; r++)
                  this._off(e[r], t, i)
              }
            else
              delete this._events;
            return this
          },
          _on: function (e, t, i) {
            this._events = this._events || {};
            var a = this._events[e];
            a || (a = [],
              this._events[e] = a),
              i === this && (i = void 0);
            for (var n = {
              fn: t,
              ctx: i
            }, r = a, o = 0, s = r.length; o < s; o++)
              if (r[o].fn === t && r[o].ctx === i)
                return;
            r.push(n)
          },
          _off: function (e, t, i) {
            var a, n, r;
            if (this._events && (a = this._events[e])) {
              if (!t) {
                for (n = 0,
                  r = a.length; n < r; n++)
                  a[n].fn = o.falseFn;
                return void delete this._events[e]
              }
              if (i === this && (i = void 0),
                a)
                for (n = 0,
                  r = a.length; n < r; n++) {
                  var s = a[n];
                  if (s.ctx === i && s.fn === t)
                    return s.fn = o.falseFn,
                      this._firingCount && (this._events[e] = a = a.slice()),
                      void a.splice(n, 1)
                }
            }
          },
          fire: function (e, t, i) {
            if (!this.listens(e, i))
              return this;
            var a = o.extend({}, t, {
              type: e,
              target: this,
              sourceTarget: t && t.sourceTarget || this
            });
            if (this._events) {
              var n = this._events[e];
              if (n) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var r = 0, s = n.length; r < s; r++) {
                  var l = n[r];
                  l.fn.call(l.ctx || this, a)
                }
                this._firingCount--
              }
            }
            return i && this._propagateEvent(a),
              this
          },
          listens: function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length)
              return !0;
            if (t)
              for (var a in this._eventParents)
                if (this._eventParents[a].listens(e, t))
                  return !0;
            return !1
          },
          once: function (e, t, i) {
            if ("object" === (void 0 === e ? "undefined" : a(e))) {
              for (var n in e)
                this.once(n, e[n], t);
              return this
            }
            var r = o.bind(function () {
              this.off(e, t, i).off(e, r, i)
            }, this);
            return this.on(e, t, i).on(e, r, i)
          },
          addEventParent: function (e) {
            return this._eventParents = this._eventParents || {},
              this._eventParents[o.stamp(e)] = e,
              this
          },
          removeEventParent: function (e) {
            return this._eventParents && delete this._eventParents[o.stamp(e)],
              this
          },
          _propagateEvent: function (e) {
            for (var t in this._eventParents)
              this._eventParents[t].fire(e.type, o.extend({
                layer: e.target,
                propagatedFrom: e.target
              }, e), !0)
          }
        };
      s.addEventListener = s.on,
        s.removeEventListener = s.clearAllEventListeners = s.off,
        s.addOneTimeEventListener = s.once,
        s.fireEvent = s.fire,
        s.hasEventListeners = s.listens;
      t.Evented = n.Class.extend(s)
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditPoint = void 0;
      var a = i(0)
        , n = (function (e) {
          e && e.__esModule
        }(a),
          i(6))
        , r = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(n)
        , o = i(3)
        , s = i(18);
      t.EditPoint = s.EditBase.extend({
        setPositions: function (e) {
          this.entity.position.setValue(e)
        },
        bindDraggers: function () {
          var e = this;
          this.entity.draw_tooltip = o.message.dragger.def;
          r.createDragger(this.dataSource, {
            dragger: this.entity,
            onDrag: function (t, i) {
              e.entity.position.setValue(i)
            }
          })
        },
        finish: function () {
          this.entity.draw_tooltip = null
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawBillboard = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(17)
        , o = i(14)
        , s = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(o);
      t.DrawBillboard = r.DrawPoint.extend({
        type: "billboard",
        createFeature: function (e) {
          this._positions_draw = null;
          var t = this
            , i = {
              position: new n.default.CallbackProperty(function (e) {
                return t.getDrawPosition()
              }
                , !1),
              billboard: s.style2Entity(e.style),
              attribute: e
            };
          return this.entity = this.dataSource.entities.add(i),
            this.entity
        },
        style2Entity: function (e, t) {
          return s.style2Entity(e, t.billboard)
        },
        getAttrClass: function () {
          return s
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawLabel = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(17)
        , o = i(12)
        , s = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(o);
      t.DrawLabel = r.DrawPoint.extend({
        type: "label",
        createFeature: function (e) {
          this._positions_draw = null;
          var t = this
            , i = {
              position: new n.default.CallbackProperty(function (e) {
                return t.getDrawPosition()
              }
                , !1),
              label: s.style2Entity(e.style),
              attribute: e
            };
          return this.entity = this.dataSource.entities.add(i),
            this.entity
        },
        style2Entity: function (e, t) {
          return s.style2Entity(e, t.label)
        },
        getAttrClass: function () {
          return s
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawModel = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(17)
        , o = i(24)
        , s = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(o);
      t.DrawModel = r.DrawPoint.extend({
        type: "model",
        createFeature: function (e) {
          this._positions_draw = null;
          var t = this
            , i = {
              position: new n.default.CallbackProperty(function (e) {
                return t.getDrawPosition()
              }
                , !1),
              model: s.style2Entity(e.style),
              attribute: e
            };
          return this.entity = this.dataSource.entities.add(i),
            this.entity
        },
        style2Entity: function (e, t) {
          return this.updateOrientation(e, t),
            s.style2Entity(e, t.model)
        },
        updateAttrForDrawing: function () {
          this.updateOrientation(this.entity.attribute.style, this.entity)
        },
        updateOrientation: function (e, t) {
          var i = t.position.getValue();
          if (null != i) {
            var a = n.default.Math.toRadians(Number(e.heading || 0))
              , r = n.default.Math.toRadians(Number(e.pitch || 0))
              , o = n.default.Math.toRadians(Number(e.roll || 0))
              , s = new n.default.HeadingPitchRoll(a, r, o);
            t.orientation = n.default.Transforms.headingPitchRollQuaternion(i, s)
          }
        },
        getAttrClass: function () {
          return s
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawCurve = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(8)
        , o = i(10)
        , s = i(54);
      t.DrawCurve = r.DrawPolyline.extend({
        type: "curve",
        _positions_show: null,
        getDrawPosition: function () {
          return this._positions_show
        },
        updateAttrForDrawing: function () {
          if (null == this._positions_draw || this._positions_draw.length < 3)
            return void (this._positions_show = this._positions_draw);
          this._positions_show = (0,
            o.line2curve)(this._positions_draw)
        },
        getEditClass: function (e) {
          var t = new s.EditCurve(e, this.viewer, this.dataSource);
          return this._bindEdit(t)
        },
        finish: function () {
          var e = this.entity;
          e.editing = this.getEditClass(e),
            this.entity._positions_draw = this._positions_draw,
            this.entity._positions_show = this._positions_show,
            e.polyline.positions = new n.default.CallbackProperty(function (t) {
              return e._positions_show
            }
              , !1)
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditCurve = void 0;
      var a = i(0)
        , n = (function (e) {
          e && e.__esModule
        }(a),
          i(13))
        , r = i(10);
      t.EditCurve = n.EditPolyline.extend({
        changePositionsToCallback: function () {
          this._positions_draw = this.entity._positions_draw,
            this._positions_show = this.entity._positions_show || this.entity.polyline.positions.getValue()
        },
        updateAttrForEditing: function () {
          if (null == this._positions_draw || this._positions_draw.length < 3)
            return void (this._positions_show = this._positions_draw);
          this._positions_show = (0,
            r.line2curve)(this._positions_draw),
            this.entity._positions_show = this._positions_show
        },
        finish: function () {
          this.entity._positions_show = this._positions_show,
            this.entity._positions_draw = this._positions_draw
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawPolylineVolume = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = (i(1),
          i(33))
        , l = a(s)
        , u = i(56)
        , d = i(2);
      a(d),
        t.DrawPolylineVolume = o.DrawPolyline.extend({
          type: "polylineVolume",
          _minPointNum: 2,
          _maxPointNum: 9999,
          createFeature: function (e) {
            this._positions_draw = [],
              e.config ? (this._minPointNum = e.config.minPointNum || 2,
                this._maxPointNum = e.config.maxPointNum || 9999) : (this._minPointNum = 2,
                  this._maxPointNum = 9999);
            var t = this
              , i = {
                polylineVolume: l.style2Entity(e.style),
                attribute: e
              };
            return i.polylineVolume.positions = new r.default.CallbackProperty(function (e) {
              return t.getDrawPosition()
            }
              , !1),
              this.entity = this.dataSource.entities.add(i),
              this.entity._positions_draw = this._positions_draw,
              this.entity
          },
          style2Entity: function (e, t) {
            return l.style2Entity(e, t.polylineVolume)
          },
          updateAttrForDrawing: function () { },
          getEditClass: function (e) {
            var t = new u.EditPolylineVolume(e, this.viewer, this.dataSource);
            return t._minPointNum = this._minPointNum,
              t._maxPointNum = this._maxPointNum,
              this._bindEdit(t)
          },
          getAttrClass: function () {
            return l
          },
          finish: function () {
            this.entity.editing = this.getEditClass(this.entity),
              this.entity.polylineVolume.positions = this.getDrawPosition()
          }
        })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditPolylineVolume = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(13);
      i(10),
        t.EditPolylineVolume = r.EditPolyline.extend({
          changePositionsToCallback: function () {
            var e = this;
            this._positions_draw = this.entity.polylineVolume.positions.getValue(),
              this.entity.polylineVolume.positions = new n.default.CallbackProperty(function (t) {
                return e.getPosition()
              }
                , !1)
          },
          finish: function () {
            this.entity.polylineVolume.positions = this.getPosition()
          }
        })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawCorridor = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = (i(1),
          i(58))
        , l = a(s)
        , u = i(59)
        , d = i(2);
      a(d),
        t.DrawCorridor = o.DrawPolyline.extend({
          type: "corridor",
          _minPointNum: 2,
          _maxPointNum: 9999,
          createFeature: function (e) {
            this._positions_draw = [],
              e.config ? (this._minPointNum = e.config.minPointNum || 2,
                this._maxPointNum = e.config.maxPointNum || 9999) : (this._minPointNum = 2,
                  this._maxPointNum = 9999);
            var t = this
              , i = {
                corridor: l.style2Entity(e.style),
                attribute: e
              };
            return i.corridor.positions = new r.default.CallbackProperty(function (e) {
              return t.getDrawPosition()
            }
              , !1),
              this.entity = this.dataSource.entities.add(i),
              this.entity._positions_draw = this._positions_draw,
              this.entity
          },
          style2Entity: function (e, t) {
            return l.style2Entity(e, t.corridor)
          },
          updateAttrForDrawing: function () { },
          getEditClass: function (e) {
            var t = new u.EditCorridor(e, this.viewer, this.dataSource);
            return t._minPointNum = this._minPointNum,
              t._maxPointNum = this._maxPointNum,
              this._bindEdit(t)
          },
          getAttrClass: function () {
            return l
          },
          finish: function () {
            var e = this.entity;
            e.editing = this.getEditClass(e),
              e._positions_draw = this.getDrawPosition(),
              e.corridor.positions = new r.default.CallbackProperty(function (t) {
                return e._positions_draw
              }
                , !1)
          }
        })
    }
    , function (e, t, i) {
      function a(e, t) {
        e = e || {},
          null == t && (t = {
            fill: !0
          });
        for (var i in e) {
          var a = e[i];
          switch (i) {
            default:
              t[i] = a;
              break;
            case "opacity":
            case "outlineOpacity":
              break;
            case "outlineColor":
              t.outlineColor = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(e.outlineOpacity || e.opacity || 1);
              break;
            case "color":
              t.material = new l.default.Color.fromCssColorString(a || "#FFFF00").withAlpha(Number(e.opacity || 1));
              break;
            case "cornerType":
              switch (a) {
                case "BEVELED":
                  t.cornerType = l.default.CornerType.BEVELED;
                  break;
                case "MITERED":
                  t.cornerType = l.default.CornerType.MITERED;
                  break;
                case "ROUNDED":
                  t.cornerType = l.default.CornerType.ROUNDED;
                  break;
                default:
                  t.cornerType = a
              }
          }
        }
        return null == t.material && (t.material = l.default.Color.fromRandom({
          minimumGreen: .75,
          maximumBlue: .75,
          alpha: Number(e.opacity || 1)
        })),
          t
      }
      function n(e) {
        return e.corridor.positions.getValue()
      }
      function r(e) {
        var t = n(e);
        return d.cartesians2lonlats(t)
      }
      function o(e) {
        var t = r(e);
        return {
          type: "Feature",
          properties: e.attribute || {},
          geometry: {
            type: "LineString",
            coordinates: t
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.style2Entity = a,
        t.getPositions = n,
        t.getCoordinates = r,
        t.toGeoJSON = o;
      var s = i(0)
        , l = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s)
        , u = i(2)
        , d = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(u)
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditCorridor = void 0;
      var a = i(0)
        , n = (function (e) {
          e && e.__esModule
        }(a),
          i(13));
      t.EditCorridor = n.EditPolyline.extend({
        changePositionsToCallback: function () {
          this._positions_draw = this.entity._positions_draw || this.entity.corridor.positions.getValue()
        },
        finish: function () {
          this.entity._positions_draw = this.getPosition()
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawPolygon = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = i(1)
        , l = i(15)
        , u = a(l)
        , d = i(26)
        , c = i(2);
      a(c),
        t.DrawPolygon = o.DrawPolyline.extend({
          type: "polygon",
          _minPointNum: 3,
          _maxPointNum: 9999,
          createFeature: function (e) {
            this._positions_draw = [],
              e.config ? (this._minPointNum = e.config.minPointNum || 3,
                this._maxPointNum = e.config.maxPointNum || 9999) : (this._minPointNum = 3,
                  this._maxPointNum = 9999);
            var t = this
              , i = {
                polygon: u.style2Entity(e.style),
                attribute: e
              };
            return i.polygon.hierarchy = new r.default.CallbackProperty(function (e) {
              return t.getDrawPosition()
            }
              , !1),
              i.polyline = {
                clampToGround: e.style.clampToGround,
                show: !1
              },
              this.entity = this.dataSource.entities.add(i),
              this.bindOutline(this.entity),
              this.entity
          },
          style2Entity: function (e, t) {
            return u.style2Entity(e, t.polygon)
          },
          bindOutline: function (e) {
            e.polyline.show = new r.default.CallbackProperty(function (t) {
              return e.polygon.hierarchy.getValue().length < 3 || e.polygon.outline && e.polygon.outline.getValue() && e.polygon.outlineWidth && e.polygon.outlineWidth.getValue() > 1
            }
              , !1),
              e.polyline.positions = new r.default.CallbackProperty(function (t) {
                if (!e.polyline.show.getValue())
                  return null;
                var i = e.polygon.hierarchy.getValue();
                return i.length < 3 ? i : i.concat([i[0]])
              }
                , !1),
              e.polyline.width = new r.default.CallbackProperty(function (t) {
                return e.polygon.hierarchy.getValue().length < 3 ? 2 : e.polygon.outlineWidth
              }
                , !1),
              e.polyline.material = new r.default.ColorMaterialProperty(new r.default.CallbackProperty(function (t) {
                return e.polygon.hierarchy.getValue().length < 3 ? e.polygon.material.color.getValue() : e.polygon.outlineColor.getValue()
              }
                , !1))
          },
          updateAttrForDrawing: function () {
            var e = this.entity.attribute.style;
            if (e.extrudedHeight) {
              var t = (0,
                s.getMaxHeight)(this.getDrawPosition());
              this.entity.polygon.extrudedHeight = t + Number(e.extrudedHeight)
            }
          },
          getEditClass: function (e) {
            var t = new d.EditPolygon(e, this.viewer, this.dataSource);
            return t._minPointNum = this._minPointNum,
              t._maxPointNum = this._maxPointNum,
              this._bindEdit(t)
          },
          getAttrClass: function () {
            return u
          },
          finish: function () {
            var e = this.entity;
            e.editing = this.getEditClass(e),
              e._positions_draw = this.getDrawPosition(),
              e.polygon.hierarchy = new r.default.CallbackProperty(function (t) {
                return e._positions_draw
              }
                , !1)
          }
        })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawRectangle = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = i(1)
        , l = i(34)
        , u = a(l)
        , d = i(62)
        , c = i(2);
      a(c),
        t.DrawRectangle = o.DrawPolyline.extend({
          type: "rectangle",
          _minPointNum: 2,
          _maxPointNum: 2,
          getRectangle: function () {
            var e = this.getDrawPosition();
            return e.length < 2 ? null : r.default.Rectangle.fromCartesianArray(e)
          },
          createFeature: function (e) {
            this._positions_draw = [];
            var t = this
              , i = {
                rectangle: u.style2Entity(e.style),
                attribute: e
              };
            return i.rectangle.coordinates = new r.default.CallbackProperty(function (e) {
              return t.getRectangle()
            }
              , !1),
              i.polyline = {
                clampToGround: e.style.clampToGround,
                show: !1
              },
              this.entity = this.dataSource.entities.add(i),
              this.bindOutline(this.entity),
              this.entity
          },
          style2Entity: function (e, t) {
            return u.style2Entity(e, t.rectangle)
          },
          bindOutline: function (e) {
            e.polyline.show = new r.default.CallbackProperty(function (t) {
              return e.rectangle.outline && e.rectangle.outline.getValue() && e.rectangle.outlineWidth && e.rectangle.outlineWidth.getValue() > 1
            }
              , !1),
              e.polyline.positions = new r.default.CallbackProperty(function (t) {
                if (!e.polyline.show.getValue())
                  return null;
                var i = e._draw_positions
                  , a = e.rectangle.height ? e.rectangle.height.getValue() : 0
                  , n = r.default.Rectangle.fromCartesianArray(i)
                  , o = r.default.Cartesian3.fromRadians(n.west, n.south, a);
                return [o, r.default.Cartesian3.fromRadians(n.east, n.south, a), r.default.Cartesian3.fromRadians(n.east, n.north, a), r.default.Cartesian3.fromRadians(n.west, n.north, a), o]
              }
                , !1),
              e.polyline.width = new r.default.CallbackProperty(function (t) {
                return e.rectangle.outlineWidth
              }
                , !1),
              e.polyline.material = new r.default.ColorMaterialProperty(new r.default.CallbackProperty(function (t) {
                return e.rectangle.outlineColor.getValue()
              }
                , !1))
          },
          updateAttrForDrawing: function () {
            var e = this.entity.attribute.style;
            if (!e.clampToGround) {
              var t = (0,
                s.getMaxHeight)(this.getDrawPosition());
              this.entity.rectangle.height = t,
                e.height = t,
                e.extrudedHeight && (this.entity.rectangle.extrudedHeight = t + Number(e.extrudedHeight))
            }
          },
          getEditClass: function (e) {
            var t = new d.EditRectangle(e, this.viewer, this.dataSource);
            return t._minPointNum = this._minPointNum,
              t._maxPointNum = this._maxPointNum,
              this._bindEdit(t)
          },
          getAttrClass: function () {
            return u
          },
          finish: function () {
            var e = this.entity;
            e.editing = this.getEditClass(e),
              e._positions_draw = this._positions_draw,
              e.rectangle.coordinates = new r.default.CallbackProperty(function (t) {
                return e._positions_draw.length < 2 ? null : r.default.Rectangle.fromCartesianArray(e._positions_draw)
              }
                , !1)
          }
        })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditRectangle = void 0;
      var a = i(0)
        , n = (function (e) {
          e && e.__esModule
        }(a),
          i(6))
        , r = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(n)
        , o = (i(3),
          i(26))
        , s = i(1);
      t.EditRectangle = o.EditPolygon.extend({
        changePositionsToCallback: function () {
          this._positions_draw = this.entity._positions_draw
        },
        finish: function () {
          this.entity._positions_draw = this._positions_draw
        },
        isClampToGround: function () {
          return this.entity.attribute.style.clampToGround
        },
        bindDraggers: function () {
          for (var e = this, t = this.isClampToGround(), i = this.getPosition(), a = 0, n = i.length; a < n; a++) {
            var o = i[a];
            if (void 0 != this.entity.rectangle.height) {
              var l = this.entity.rectangle.height.getValue();
              o = (0,
                s.setPositionsHeight)(o, l)
            }
            t && (o = (0,
              s.updateHeightForClampToGround)(this.viewer, o));
            var u = r.createDragger(this.dataSource, {
              position: o,
              onDrag: function (t, a) {
                if (void 0 != e.entity.rectangle.height) {
                  var n = e.entity.rectangle.height.getValue();
                  a = (0,
                    s.setPositionsHeight)(a, n),
                    t.position = a
                }
                if (i[t.index] = a,
                  e.heightDraggers && e.heightDraggers.length > 0) {
                  var r = e.entity.rectangle.extrudedHeight.getValue();
                  e.heightDraggers[t.index].position = (0,
                    s.setPositionsHeight)(a, r)
                }
              }
            });
            u.index = a,
              this.draggers.push(u)
          }
          this.entity.rectangle.extrudedHeight && this.bindHeightDraggers(this.entity.rectangle)
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawCircle = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = (i(1),
          i(7))
        , l = (a(s),
          i(3),
          i(27))
        , u = a(l)
        , d = i(64);
      t.DrawCircle = o.DrawPolyline.extend({
        type: "ellipse",
        _minPointNum: 2,
        _maxPointNum: 2,
        getShowPosition: function () {
          return this._positions_draw && this._positions_draw.length > 1 ? this._positions_draw[0] : null
        },
        createFeature: function (e) {
          this._positions_draw = [],
            "ellipse" == e.type ? this._maxPointNum = 3 : this._maxPointNum = 2;
          var t = this
            , i = {
              position: new r.default.CallbackProperty(function (e) {
                return t.getShowPosition()
              }
                , !1),
              ellipse: u.style2Entity(e.style),
              attribute: e
            };
          return this.entity = this.dataSource.entities.add(i),
            this.entity
        },
        style2Entity: function (e, t) {
          return u.style2Entity(e, t.ellipse)
        },
        updateAttrForDrawing: function (e) {
          if (this._positions_draw) {
            if (e)
              return void this.addPositionsForRadius(this._positions_draw);
            if (!(this._positions_draw.length < 2)) {
              var t = this.entity.attribute.style;
              if (!t.clampToGround) {
                var i = this.formatNum(r.default.Cartographic.fromCartesian(this._positions_draw[0]).height, 2);
                if (this.entity.ellipse.height = i,
                  t.height = i,
                  t.extrudedHeight) {
                  var a = i + Number(t.extrudedHeight);
                  this.entity.ellipse.extrudedHeight = a
                }
              }
              var n = this.formatNum(r.default.Cartesian3.distance(this._positions_draw[0], this._positions_draw[1]), 2);
              if (this.entity.ellipse.semiMinorAxis = n,
                3 == this._maxPointNum) {
                var o;
                o = 3 == this._positions_draw.length ? this.formatNum(r.default.Cartesian3.distance(this._positions_draw[0], this._positions_draw[2]), 2) : n,
                  this.entity.ellipse.semiMajorAxis = o,
                  t.semiMinorAxis = n,
                  t.semiMajorAxis = o
              } else
                this.entity.ellipse.semiMajorAxis = n,
                  t.radius = n
            }
          }
        },
        addPositionsForRadius: function (e) {
          this._positions_draw = [e];
          var t = this.entity.attribute.style
            , i = r.default.EllipseGeometryLibrary.computeEllipsePositions({
              center: e,
              semiMajorAxis: this.entity.ellipse.semiMajorAxis.getValue(),
              semiMinorAxis: this.entity.ellipse.semiMinorAxis.getValue(),
              rotation: r.default.Math.toRadians(Number(t.rotation || 0)),
              granularity: 2
            }, !0, !1)
            , a = new r.default.Cartesian3(i.positions[0], i.positions[1], i.positions[2]);
          if (this._positions_draw.push(a),
            3 == this._maxPointNum) {
            var n = new r.default.Cartesian3(i.positions[3], i.positions[4], i.positions[5]);
            this._positions_draw.push(n)
          }
        },
        getEditClass: function (e) {
          var t = new d.EditCircle(e, this.viewer, this.dataSource);
          return t._minPointNum = this._minPointNum,
            t._maxPointNum = this._maxPointNum,
            this._bindEdit(t)
        },
        getAttrClass: function () {
          return u
        },
        finish: function () {
          var e = this.entity;
          e.editing = this.getEditClass(e),
            e._positions_draw = this._positions_draw,
            e.position = new r.default.CallbackProperty(function (t) {
              return e._positions_draw && e._positions_draw.length > 0 ? e._positions_draw[0] : null
            }
              , !1)
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditCircle = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(6)
        , o = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(r)
        , s = i(3)
        , l = i(26)
        , u = i(1);
      t.EditCircle = l.EditPolygon.extend({
        changePositionsToCallback: function () {
          this._positions_draw = this.entity._positions_draw
        },
        finish: function () {
          this.entity._positions_draw = this._positions_draw
        },
        isClampToGround: function () {
          return this.entity.attribute.style.clampToGround
        },
        getPosition: function () {
          if (void 0 != this.entity.ellipse.height)
            for (var e = this.entity.ellipse.height.getValue(), t = 0, i = this._positions_draw.length; t < i; t++)
              this._positions_draw[t] = (0,
                u.setPositionsHeight)(this._positions_draw[t], e);
          return this._positions_draw
        },
        bindDraggers: function () {
          var e = this
            , t = this.isClampToGround()
            , i = this.getPosition()
            , a = new n.default.Cartesian3
            , r = new n.default.Cartesian3
            , l = this.entity.attribute.style
            , d = i[0];
          t && (d = (0,
            u.updateHeightForClampToGround)(this.viewer, d),
            i[0] = d);
          var c = o.createDragger(this.dataSource, {
            position: d,
            onDrag: function (t, o) {
              if (n.default.Cartesian3.subtract(o, i[t.index], a),
                i[t.index] = o,
                !l.clampToGround) {
                var s = e.formatNum(n.default.Cartographic.fromCartesian(o).height, 2);
                e.entity.ellipse.height = s,
                  l.height = s
              }
              n.default.Cartesian3.add(t.majorDragger.position.getValue(), a, r),
                t.majorDragger.position = r,
                t.minorDragger && (n.default.Cartesian3.add(t.minorDragger.position.getValue(), a, r),
                  t.minorDragger.position = r),
                void 0 != e.entity.attribute.style.extrudedHeight && e.updateDraggers()
            }
          });
          c.index = 0,
            this.draggers.push(c);
          var h = n.default.EllipseGeometryLibrary.computeEllipsePositions({
            center: d,
            semiMajorAxis: this.entity.ellipse.semiMajorAxis.getValue(),
            semiMinorAxis: this.entity.ellipse.semiMinorAxis.getValue(),
            rotation: n.default.Math.toRadians(Number(l.rotation || 0)),
            granularity: 2
          }, !0, !1)
            , f = new n.default.Cartesian3(h.positions[0], h.positions[1], h.positions[2]);
          t && (f = (0,
            u.updateHeightForClampToGround)(this.viewer, f)),
            i[1] = f;
          var p = o.createDragger(this.dataSource, {
            position: f,
            type: o.PointType.EditAttr,
            tooltip: s.message.dragger.editRadius,
            onDrag: function (t, a) {
              if (void 0 != e.entity.ellipse.height) {
                var r = e.entity.ellipse.height.getValue();
                a = (0,
                  u.setPositionsHeight)(a, r),
                  t.position = a
              }
              i[t.index] = a;
              var o = e.formatNum(n.default.Cartesian3.distance(i[0], a), 2);
              e.entity.ellipse.semiMajorAxis = o,
                l.radius ? (e.entity.ellipse.semiMinorAxis = o,
                  l.radius = o) : l.semiMajorAxis = o,
                void 0 != e.entity.attribute.style.extrudedHeight && e.updateDraggers()
            }
          });
          if (p.index = 1,
            c.majorDragger = p,
            this.draggers.push(p),
            3 == this._maxPointNum) {
            var m = new n.default.Cartesian3(h.positions[3], h.positions[4], h.positions[5]);
            t && (m = (0,
              u.updateHeightForClampToGround)(this.viewer, m)),
              i[2] = m;
            var g = o.createDragger(this.dataSource, {
              position: m,
              type: o.PointType.EditAttr,
              tooltip: s.message.dragger.editRadius,
              onDrag: function (t, a) {
                if (void 0 != e.entity.ellipse.height) {
                  var r = e.entity.ellipse.height.getValue();
                  a = (0,
                    u.setPositionsHeight)(a, r),
                    t.position = a
                }
                i[t.index] = a;
                var o = e.formatNum(n.default.Cartesian3.distance(i[0], a), 2);
                e.entity.ellipse.semiMinorAxis = o,
                  l.radius ? (e.entity.ellipse.semiMajorAxis = o,
                    l.radius = o) : l.semiMinorAxis = o,
                  void 0 != e.entity.attribute.style.extrudedHeight && e.updateDraggers()
              }
            });
            g.index = 2,
              c.minorDragger = g,
              this.draggers.push(g)
          }
          if (this.entity.ellipse.extrudedHeight) {
            var v = this.entity.ellipse.extrudedHeight.getValue()
              , d = (0,
                u.setPositionsHeight)(i[0], v)
              , y = o.createDragger(this.dataSource, {
                position: d,
                onDrag: function (t, a) {
                  a = (0,
                    u.setPositionsHeight)(a, e.entity.ellipse.height),
                    i[0] = a,
                    e.updateDraggers()
                }
              });
            this.draggers.push(y);
            var w = 3 == this._maxPointNum ? [i[1], i[2]] : [i[1]];
            this.bindHeightDraggers(this.entity.ellipse, w),
              this.heightDraggers.push(y)
          }
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawEllipsoid = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = (i(1),
          i(7))
        , l = (a(s),
          i(3),
          i(36))
        , u = a(l)
        , d = i(66);
      t.DrawEllipsoid = o.DrawPolyline.extend({
        type: "ellipsoid",
        _minPointNum: 2,
        _maxPointNum: 3,
        getShowPosition: function () {
          return this._positions_draw && this._positions_draw.length > 0 ? this._positions_draw[0] : null
        },
        createFeature: function (e) {
          this._positions_draw = [];
          var t = this
            , i = {
              position: new r.default.CallbackProperty(function (e) {
                return t.getShowPosition()
              }
                , !1),
              ellipsoid: u.style2Entity(e.style),
              attribute: e
            };
          return this.entity = this.dataSource.entities.add(i),
            this.entity
        },
        style2Entity: function (e, t) {
          return u.style2Entity(e, t.ellipsoid)
        },
        updateAttrForDrawing: function (e) {
          if (this._positions_draw) {
            if (e)
              return void this.addPositionsForRadius(this._positions_draw);
            if (!(this._positions_draw.length < 2)) {
              var t = this.entity.attribute.style
                , i = this.formatNum(r.default.Cartesian3.distance(this._positions_draw[0], this._positions_draw[1]), 2);
              t.extentRadii = i,
                t.heightRadii = i;
              var a;
              a = 3 == this._positions_draw.length ? this.formatNum(r.default.Cartesian3.distance(this._positions_draw[0], this._positions_draw[2]), 2) : i,
                t.widthRadii = a,
                this.updateRadii(t)
            }
          }
        },
        updateRadii: function (e) {
          this.entity.ellipsoid.radii.setValue(new r.default.Cartesian3(e.extentRadii, e.widthRadii, e.heightRadii))
        },
        addPositionsForRadius: function (e) {
          this._positions_draw = [e];
          var t = this.entity.attribute.style
            , i = r.default.EllipseGeometryLibrary.computeEllipsePositions({
              center: e,
              semiMajorAxis: Number(t.extentRadii),
              semiMinorAxis: Number(t.widthRadii),
              rotation: r.default.Math.toRadians(Number(t.rotation || 0)),
              granularity: 2
            }, !0, !1)
            , a = new r.default.Cartesian3(i.positions[0], i.positions[1], i.positions[2]);
          this._positions_draw.push(a);
          var n = new r.default.Cartesian3(i.positions[3], i.positions[4], i.positions[5]);
          this._positions_draw.push(n)
        },
        getEditClass: function (e) {
          var t = new d.EditEllipsoid(e, this.viewer, this.dataSource);
          return t._minPointNum = this._minPointNum,
            t._maxPointNum = this._maxPointNum,
            this._bindEdit(t)
        },
        getAttrClass: function () {
          return u
        },
        finish: function () {
          this.entity.editing = this.getEditClass(this.entity),
            this.entity._positions_draw = this._positions_draw,
            this.entity.position = this.getShowPosition()
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditEllipsoid = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(6)
        , o = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(r)
        , s = i(3)
        , l = i(18)
        , u = i(1);
      t.EditEllipsoid = l.EditBase.extend({
        _positions_draw: null,
        changePositionsToCallback: function () {
          this._positions_draw = this.entity.position.getValue()
        },
        finish: function () {
          this._positions_draw = null
        },
        updateRadii: function (e) {
          var t = new n.default.Cartesian3(Number(e.extentRadii), Number(e.widthRadii), Number(e.heightRadii));
          this.entity.ellipsoid.radii.setValue(t)
        },
        bindDraggers: function () {
          var e = this
            , t = this.entity.attribute.style
            , i = this.entity.position.getValue()
            , a = o.createDragger(this.dataSource, {
              position: (0,
                u.addPositionsHeight)(i, t.heightRadii),
              onDrag: function (t, i) {
                this._positions_draw = i,
                  e.entity.position.setValue(i),
                  e.updateDraggers()
              }
            });
          this.draggers.push(a);
          var r = n.default.EllipseGeometryLibrary.computeEllipsePositions({
            center: i,
            semiMajorAxis: Number(t.extentRadii),
            semiMinorAxis: Number(t.widthRadii),
            rotation: n.default.Math.toRadians(Number(t.rotation || 0)),
            granularity: 2
          }, !0, !1)
            , l = new n.default.Cartesian3(r.positions[0], r.positions[1], r.positions[2])
            , d = o.createDragger(this.dataSource, {
              position: l,
              type: o.PointType.EditAttr,
              tooltip: s.message.dragger.editRadius,
              onDrag: function (i, a) {
                var r = n.default.Cartographic.fromCartesian(e._positions_draw).height;
                a = (0,
                  u.setPositionsHeight)(a, r),
                  i.position = a;
                var o = e.formatNum(n.default.Cartesian3.distance(e._positions_draw, a), 2);
                t.extentRadii = o,
                  e.updateRadii(t),
                  e.updateDraggers()
              }
            });
          a.majorDragger = d,
            this.draggers.push(d);
          var c = new n.default.Cartesian3(r.positions[3], r.positions[4], r.positions[5])
            , h = o.createDragger(this.dataSource, {
              position: c,
              type: o.PointType.EditAttr,
              tooltip: s.message.dragger.editRadius,
              onDrag: function (i, a) {
                var r = n.default.Cartographic.fromCartesian(e._positions_draw).height;
                a = (0,
                  u.setPositionsHeight)(a, r),
                  i.position = a;
                var o = e.formatNum(n.default.Cartesian3.distance(e._positions_draw, a), 2);
                t.widthRadii = o,
                  e.updateRadii(t),
                  e.updateDraggers()
              }
            });
          a.minorDragger = h,
            this.draggers.push(h)
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawWall = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(8)
        , s = (i(1),
          i(37))
        , l = a(s)
        , u = i(68)
        , d = i(2);
      a(d),
        t.DrawWall = o.DrawPolyline.extend({
          type: "wall",
          _minPointNum: 2,
          _maxPointNum: 9999,
          createFeature: function (e) {
            this._positions_draw = [],
              e.config ? (this._minPointNum = e.config.minPointNum || 2,
                this._maxPointNum = e.config.maxPointNum || 9999) : (this._minPointNum = 2,
                  this._maxPointNum = 9999),
              this.maximumHeights = [],
              this.minimumHeights = [];
            var t = this
              , i = {
                wall: l.style2Entity(e.style),
                attribute: e
              };
            return i.wall.positions = new r.default.CallbackProperty(function (e) {
              return t.getDrawPosition()
            }
              , !1),
              i.wall.minimumHeights = new r.default.CallbackProperty(function (e) {
                return t.getMinimumHeights()
              }
                , !1),
              i.wall.maximumHeights = new r.default.CallbackProperty(function (e) {
                return t.getMaximumHeights()
              }
                , !1),
              this.entity = this.dataSource.entities.add(i),
              this.entity
          },
          style2Entity: function (e, t) {
            return l.style2Entity(e, t.wall)
          },
          maximumHeights: null,
          getMaximumHeights: function (e) {
            return this.maximumHeights
          },
          minimumHeights: null,
          getMinimumHeights: function (e) {
            return this.minimumHeights
          },
          updateAttrForDrawing: function () {
            var e = this.entity.attribute.style
              , t = this.getDrawPosition()
              , i = t.length;
            this.maximumHeights = new Array(i),
              this.minimumHeights = new Array(i);
            for (var a = 0; a < i; a++) {
              var n = r.default.Cartographic.fromCartesian(t[a]).height;
              this.minimumHeights[a] = n,
                this.maximumHeights[a] = n + Number(e.extrudedHeight)
            }
          },
          getEditClass: function (e) {
            var t = new u.EditWall(e, this.viewer, this.dataSource);
            return t._minPointNum = this._minPointNum,
              t._maxPointNum = this._maxPointNum,
              this._bindEdit(t)
          },
          getAttrClass: function () {
            return l
          },
          finish: function () {
            this.entity.editing = this.getEditClass(this.entity),
              this.entity.wall.positions = this.getDrawPosition(),
              this.entity.wall.minimumHeights = this.getMinimumHeights(),
              this.entity.wall.maximumHeights = this.getMaximumHeights()
          }
        })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditWall = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(6)
        , o = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(r)
        , s = i(3)
        , l = i(13)
        , u = i(1);
      t.EditWall = l.EditPolyline.extend({
        changePositionsToCallback: function () {
          var e = this;
          this._positions_draw = this.entity.wall.positions.getValue(),
            this.entity.wall.positions = new n.default.CallbackProperty(function (t) {
              return e.getPosition()
            }
              , !1),
            this.minimumHeights = this.entity.wall.minimumHeights.getValue(),
            this.entity.wall.minimumHeights = new n.default.CallbackProperty(function (t) {
              return e.getMinimumHeights()
            }
              , !1),
            this.maximumHeights = this.entity.wall.maximumHeights.getValue(),
            this.entity.wall.maximumHeights = new n.default.CallbackProperty(function (t) {
              return e.getMaximumHeights()
            }
              , !1)
        },
        maximumHeights: null,
        getMaximumHeights: function (e) {
          return this.maximumHeights
        },
        minimumHeights: null,
        getMinimumHeights: function (e) {
          return this.minimumHeights
        },
        updateAttrForEditing: function () {
          var e = this.entity.attribute.style
            , t = this.getPosition()
            , i = t.length;
          this.maximumHeights = new Array(i),
            this.minimumHeights = new Array(i);
          for (var a = 0; a < i; a++) {
            var r = n.default.Cartographic.fromCartesian(t[a]).height;
            this.minimumHeights[a] = r,
              this.maximumHeights[a] = r + Number(e.extrudedHeight)
          }
        },
        finish: function () {
          this.entity.wall.positions = this.getPosition()
        },
        bindDraggers: function () {
          for (var e = this, t = this.isClampToGround(), i = this.getPosition(), a = this.entity.attribute.style, r = i.length < this._maxPointNum, l = 0, d = i.length; l < d; l++) {
            var c = i[l]
              , h = o.createDragger(this.dataSource, {
                position: c,
                clampToGround: t,
                onDrag: function (t, o) {
                  i[t.index] = o,
                    e.heightDraggers && e.heightDraggers.length > 0 && (e.heightDraggers[t.index].position = (0,
                      u.addPositionsHeight)(o, a.extrudedHeight)),
                    r && (t.index > 0 && (e.draggers[2 * t.index - 1].position = n.default.Cartesian3.midpoint(o, i[t.index - 1], new n.default.Cartesian3)),
                      t.index < i.length - 1 && (e.draggers[2 * t.index + 1].position = n.default.Cartesian3.midpoint(o, i[t.index + 1], new n.default.Cartesian3)))
                }
              });
            if (h.index = l,
              this.draggers.push(h),
              r) {
              var f = l + 1;
              if (f < d) {
                var p = n.default.Cartesian3.midpoint(c, i[f], new n.default.Cartesian3)
                  , m = o.createDragger(this.dataSource, {
                    position: p,
                    type: o.PointType.AddMidPoint,
                    tooltip: s.message.dragger.addMidPoint,
                    clampToGround: t,
                    onDragStart: function (t, a) {
                      i.splice(t.index, 0, a),
                        e.updateAttrForEditing()
                    },
                    onDrag: function (e, t) {
                      i[e.index] = t
                    },
                    onDragEnd: function (t, i) {
                      e.updateDraggers()
                    }
                  });
                m.index = f,
                  this.draggers.push(m)
              }
            }
          }
          this.bindHeightDraggers()
        },
        heightDraggers: null,
        bindHeightDraggers: function () {
          var e = this;
          this.heightDraggers = [];
          for (var t = this.getPosition(), i = this.entity.attribute.style, a = Number(i.extrudedHeight), r = 0, l = t.length; r < l; r++) {
            var d = (0,
              u.addPositionsHeight)(t[r], a)
              , c = o.createDragger(this.dataSource, {
                position: d,
                type: o.PointType.MoveHeight,
                tooltip: s.message.dragger.moveHeight,
                onDrag: function (a, r) {
                  var o = n.default.Cartographic.fromCartesian(r).height;
                  i.extrudedHeight = e.formatNum(o - e.minimumHeights[a.index], 2);
                  for (var s = 0; s < t.length; s++)
                    s != a.index && (e.heightDraggers[s].position = (0,
                      u.addPositionsHeight)(t[s], i.extrudedHeight));
                  e.updateAttrForEditing()
                }
              });
            c.index = r,
              this.draggers.push(c),
              this.heightDraggers.push(c)
          }
        }
      })
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawPModel = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(21)
        , o = i(1)
        , s = i(24)
        , l = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(s)
        , u = i(3)
        , d = i(70);
      t.DrawPModel = r.DrawBase.extend({
        type: "point",
        createFeature: function (e) {
          var t = this;
          this._positions_draw = n.default.Cartesian3.ZERO;
          var i = e.style
            , a = this.primitives.add(n.default.Model.fromGltf({
              url: i.modelUrl,
              modelMatrix: this.getModelMatrix(i),
              minimumPixelSize: i.minimumPixelSize || 30
            }));
          return a.readyPromise.then(function (e) {
            t.style2Entity(i, t.entity)
          }),
            a.attribute = e,
            this.entity = a,
            this.entity
        },
        getModelMatrix: function (e, t) {
          var i = new n.default.HeadingPitchRoll(n.default.Math.toRadians(e.heading || 0), n.default.Math.toRadians(e.pitch || 0), n.default.Math.toRadians(e.roll || 0))
            , a = n.default.Transforms.eastNorthUpToFixedFrame
            , r = n.default.Transforms.headingPitchRollToFixedFrame(t || this._positions_draw, i, this.viewer.scene.globe.ellipsoid, a);
          return e.scale && n.default.Matrix4.multiplyByUniformScale(r, e.scale, r),
            r
        },
        style2Entity: function (e, t) {
          return t.modelMatrix = this.getModelMatrix(e, t.position),
            l.style2Entity(e, t)
        },
        bindEvent: function () {
          var e = this;
          this.getHandler().setInputAction(function (t) {
            var i = (0,
              o.getCurrentMousePosition)(e.viewer.scene, t.endPosition, e.entity);
            i && (e._positions_draw = i,
              e.entity.modelMatrix = e.getModelMatrix(e.entity.attribute.style)),
              e.tooltip.showAt(t.endPosition, u.message.draw.point.start)
          }, n.default.ScreenSpaceEventType.MOUSE_MOVE),
            this.getHandler().setInputAction(function (t) {
              var i = (0,
                o.getCurrentMousePosition)(e.viewer.scene, t.position, e.entity);
              i && (e._positions_draw = i,
                e.disable())
            }, n.default.ScreenSpaceEventType.LEFT_CLICK)
        },
        getEditClass: function (e) {
          var t = new d.EditPModel(e, this.viewer, this.dataSource);
          return this._bindEdit(t)
        },
        getAttrClass: function () {
          return l
        },
        finish: function () {
          this.entity.modelMatrix = this.getModelMatrix(this.entity.attribute.style),
            this.entity.editing = this.getEditClass(this.entity),
            this.entity.position = this.getDrawPosition()
        }
      })
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.EditPModel = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(6)
        , s = a(o)
        , l = i(3)
        , u = i(18)
        , d = i(27)
        , c = a(d)
        , h = i(1);
      t.EditPModel = u.EditBase.extend({
        setPositions: function (e) {
          this.entity.position = e,
            this.entity.modelMatrix = this.getModelMatrix()
        },
        getModelMatrix: function (e) {
          var t = this.entity.attribute.style
            , i = new r.default.HeadingPitchRoll(r.default.Math.toRadians(t.heading || 0), r.default.Math.toRadians(t.pitch || 0), r.default.Math.toRadians(t.roll || 0))
            , a = r.default.Transforms.eastNorthUpToFixedFrame
            , n = r.default.Transforms.headingPitchRollToFixedFrame(e || this.entity.position, i, this.viewer.scene.globe.ellipsoid, a);
          return t.scale && r.default.Matrix4.multiplyByUniformScale(n, t.scale, n),
            n
        },
        bindDraggers: function () {
          if (!this.entity.ready) {
            var e = this;
            return void this.entity.readyPromise.then(function (t) {
              e.bindDraggers()
            })
          }
          var e = this;
          this.entity.draw_tooltip = l.message.dragger.def;
          var t = s.createDragger(this.dataSource, {
            dragger: this.entity,
            onDrag: function (t, i) {
              e.entity.position = i,
                e.entity.modelMatrix = e.getModelMatrix(i),
                e.updateDraggers()
            }
          })
            , i = this.entity.attribute.style
            , a = this.entity.position
            , n = r.default.Cartographic.fromCartesian(a).height
            , o = this.entity.boundingSphere.radius;
          this.entityAngle = this.dataSource.entities.add({
            name: "角度调整底部圆",
            position: new r.default.CallbackProperty(function (t) {
              return e.entity.position
            }
              , !1),
            ellipse: c.style2Entity({
              fill: !1,
              outline: !0,
              outlineColor: "#ffff00",
              outlineOpacity: .8,
              radius: o,
              height: n
            })
          });
          var u = this.getHeadingPosition()
            , d = s.createDragger(this.dataSource, {
              position: u,
              type: s.PointType.EditAttr,
              tooltip: l.message.dragger.editHeading,
              onDrag: function (t, a) {
                var n = e.getHeading(e.entity.position, a);
                i.heading = e.formatNum(n, 1),
                  e.entity.modelMatrix = e.getModelMatrix(),
                  t.position = e.getHeadingPosition()
              }
            });
          this.draggers.push(d);
          var f = (0,
            h.addPositionsHeight)(a, o)
            , t = s.createDragger(this.dataSource, {
              position: f,
              type: s.PointType.MoveHeight,
              tooltip: l.message.dragger.editScale,
              onDrag: function (t, n) {
                var o = r.default.Cartesian3.distance(n, a)
                  , s = t.radius / i.scale
                  , l = o / s;
                t.radius = o,
                  i.scale = e.formatNum(l, 2),
                  e.entity.modelMatrix = e.getModelMatrix(),
                  e.updateDraggers()
              }
            });
          t.radius = o,
            this.draggers.push(t)
        },
        destroyDraggers: function () {
          u.EditBase.prototype.destroyDraggers.call(this),
            this.entityAngle && (this.dataSource.entities.remove(this.entityAngle),
              delete this.entityAngle),
            this.entityBox && (this.dataSource.entities.remove(this.entityBox),
              delete this.entityBox)
        },
        finish: function () {
          this.entity.draw_tooltip = null
        },
        getHeadingPosition: function () {
          var e = this.entity.position
            , t = this.entity.boundingSphere.radius
            , i = -Number(this.entity.attribute.style.heading || 0)
            , a = new r.default.Cartesian3(t, 0, 0)
            , n = r.default.Transforms.eastNorthUpToFixedFrame(e)
            , o = r.default.Matrix4.fromRotationTranslation(r.default.Matrix3.fromRotationZ(r.default.Math.toRadians(i)));
          return r.default.Matrix4.multiply(n, o, n),
            n = r.default.Matrix4.getRotation(n, new r.default.Matrix3),
            a = r.default.Matrix3.multiplyByVector(n, a, a),
            a = r.default.Cartesian3.add(e, a, a)
        },
        getHeading: function (e, t) {
          var i = r.default.Transforms.eastNorthUpToFixedFrame(e);
          i = r.default.Matrix4.getRotation(i, new r.default.Matrix3);
          var a = r.default.Matrix3.getColumn(i, 0, new r.default.Cartesian3)
            , n = r.default.Matrix3.getColumn(i, 1, new r.default.Cartesian3)
            , o = r.default.Matrix3.getColumn(i, 2, new r.default.Cartesian3)
            , s = r.default.Cartesian3.subtract(t, e, new r.default.Cartesian3);
          s = r.default.Cartesian3.cross(s, o, s),
            s = r.default.Cartesian3.cross(o, s, s),
            s = r.default.Cartesian3.normalize(s, s);
          var l = r.default.Cartesian3.angleBetween(a, s);
          return r.default.Cartesian3.angleBetween(n, s) > .5 * Math.PI && (l = 2 * Math.PI - l),
            -r.default.Math.toDegrees(l)
        }
      })
    }
    , function (module, exports, __webpack_require__) {
      function _interopRequireWildcard(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function isOnly(e) {
        _isOnly = e
      }
      function setEnable(e) {
        _enable = e,
          e || close()
      }
      function getEnable(e) {
        return _enable
      }
      function init(e) {
        viewer = e;
        (0,
          _jquery2.default)("#" + viewer._container.id).append('<div id="pupup-all-view" ></div>'),
          handler = new _Cesium2.default.ScreenSpaceEventHandler(viewer.scene.canvas),
          handler.setInputAction(mousePickingClick, _Cesium2.default.ScreenSpaceEventType.LEFT_CLICK),
          viewer.scene.postRender.addEventListener(bind2scene)
      }
      function mousePickingClick(e) {
        if (removeFeature(),
          unHighlighPick(),
          _isOnly && close(),
          _enable) {
          var t = e.position
            , i = viewer.scene.pick(t);
          if (i && _Cesium2.default.defined(i.id) && i.id instanceof _Cesium2.default.Entity) {
            var a = i.id;
            if (_Cesium2.default.defined(a.popup)) {
              var n = (0,
                _point.getCurrentMousePosition)(viewer.scene, t);
              show(a, n, t)
            }
            return void (a.click && "function" == typeof a.click && a.click(a, t))
          }
          if (i && _Cesium2.default.defined(i.tileset) && _Cesium2.default.defined(i.getProperty)) {
            for (var r = {}, o = i.getPropertyNames(), s = 0; s < o.length; s++) {
              var l = o[s];
              if (i.hasProperty(l)) {
                var u = i.getProperty(l);
                null != u && (r[l] = u)
              }
            }
            var d = i.tileset._config;
            if (d) {
              if (_Cesium2.default.defined(d.popup)) {
                var n = (0,
                  _point.getCurrentMousePosition)(viewer.scene, t);
                show({
                  id: i._batchId,
                  popup: {
                    html: getPopupForConfig(d, r),
                    anchor: d.popupAnchor || [0, -15]
                  }
                }, n, t)
              }
              return d.showClickFeature && highlighPick(i, d.clickFeatureColor),
                void (d.click && "function" == typeof d.click && d.click({
                  attr: r,
                  feature: i
                }, t))
            }
          }
          if (i && _Cesium2.default.defined(i.primitive)) {
            var c = i.primitive;
            if (_Cesium2.default.defined(c.popup)) {
              var n = (0,
                _point.getCurrentMousePosition)(viewer.scene, t);
              show(c, n, t)
            }
            return void (c.click && "function" == typeof c.click && c.click(c, t))
          }
          pickImageryLayerFeatures(t)
        }
      }
      function pickImageryLayerFeatures(e) {
        var t = viewer.scene
          , i = t.camera.getPickRay(e)
          , a = t.imageryLayers.pickImageryLayerFeatures(i, t);
        _Cesium2.default.defined(a) && _Cesium2.default.when(a, function (t) {
          if (_Cesium2.default.defined(t) && 0 !== t.length) {
            var i = t[0];
            if (null != i.imageryLayer && null != i.imageryLayer.config) {
              var a = i.imageryLayer.config;
              a.showClickFeature && i.data && showFeature(i.data, a.pickFeatureStyle);
              var n = getPopupForConfig(i.imageryLayer.config, i.properties);
              if (n) {
                var r = (0,
                  _point.getCurrentMousePosition)(viewer.scene, e);
                show({
                  id: "imageryLayerFeaturePromise",
                  popup: {
                    html: n,
                    anchor: i.imageryLayer.config.popupAnchor || [0, -12]
                  }
                }, r, e)
              }
              a.click && "function" == typeof a.click && a.click(i.properties, e)
            }
          }
        }, function () { })
      }
      function removeFeature() {
        null != lastShowFeature && (viewer.dataSources.remove(lastShowFeature),
          lastShowFeature = null)
      }
      function showFeature(e, t) {
        removeFeature();
        var i = e;
        if (e.geometryType && -1 != e.geometryType.indexOf("esri")) {
          if (JSON.stringify(e.geometry).length < 1e4) {
            var a = window.das3d.L || window.L;
            if (!a.esri)
              return void console.log("需要引入 das-esri 插件解析arcgis标准的json数据！");
            i = das3d.L.esri.Util.arcgisToGeoJSON(e.geometry)
          }
        } else if (e.geometry && e.geometry.type) {
          var a = window.das3d.L || window.L;
          if (a) {
            var n = a.geoJSON(e.geometry, {
              coordsToLatLng: function (e) {
                return e[0] > 180 || e[0] < -180 ? a.CRS.EPSG3857.unproject(a.point(e[0], e[1])) : new a.LatLng(e[1], e[0], e[2])
              }
            });
            i = n.toGeoJSON()
          }
        }
        if (null != i) {
          t = t || {};
          _Cesium2.default.GeoJsonDataSource.load(i, {
            clampToGround: !0,
            stroke: new _Cesium2.default.Color.fromCssColorString(t.stroke || "#ffff00"),
            strokeWidth: t.strokeWidth || 3,
            fill: new _Cesium2.default.Color.fromCssColorString(t.fill || "#ffff00").withAlpha(t.fillAlpha || .7)
          }).then(function (e) {
            viewer.dataSources.add(e),
              lastShowFeature = e
          }).otherwise(function (e) {
            console.log(e)
          })
        }
      }
      function unHighlighPick() {
        if (_Cesium2.default.defined(highlighted.feature)) {
          try {
            highlighted.feature.color = highlighted.originalColor
          } catch (e) { }
          highlighted.feature = void 0
        }
      }
      function highlighPick(e, t) {
        unHighlighPick(),
          highlighted.feature = e,
          _Cesium2.default.Color.clone(e.color, highlighted.originalColor),
          t && "string" == typeof t && (t = new _Cesium2.default.Color.fromCssColorString(t)),
          e.color = t || defaultHighlightedClr
      }
      function show(e, t, i) {
        if (null != e && null != e.popup) {
          var a = getPopupId(e);
          close(a),
            objPopup[a] = {
              id: e.id,
              popup: e.popup,
              cartesian: t,
              viewPoint: i
            };
          var n;
          n = "object" === _typeof(e.popup) ? e.popup.html : e.popup,
            n && ("function" == typeof n && (n = n(e, t, function (n) {
              _showHtml(n, a, e, t, i)
            })),
              n && _showHtml(n, a, e, t, i))
        }
      }
      function _showHtml(e, t, i, a, n) {
        if ((0,
          _jquery2.default)("#pupup-all-view").append('<div id="' + t + '" class="cesium-popup">            <a class="cesium-popup-close-button cesium-popup-color" href="javascript:viewer.das.popup.close(\'' + t + '\',true)">×</a>            <div class="cesium-popup-content-wrapper cesium-popup-background">                <div class="cesium-popup-content cesium-popup-color">' + e + '</div>            </div>            <div class="cesium-popup-tip-container"><div class="cesium-popup-tip cesium-popup-background"></div></div>        </div>'),
          !updateViewPoint(t, a, i.popup, n))
          return void close(t)
      }
      function updateViewPoint(e, t, i, a) {
        var n = _Cesium2.default.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, t);
        if (n && (a = n,
          objPopup[e] && (objPopup[e].viewPoint = n)),
          null == a)
          return console.log("wgs84ToWindowCoordinates无法转换为屏幕坐标"),
            !1;
        var r = viewer.scene;
        if (r.mode === _Cesium2.default.SceneMode.SCENE3D) {
          var o = r.camera.getPickRay(a)
            , s = r.globe.pick(o, r);
          if (s) {
            if (_Cesium2.default.Cartesian3.distance(t, s) > 1e6)
              return !1
          }
        }
        var l = (0,
          _jquery2.default)("#" + e)
          , u = a.x - l.width() / 2
          , d = a.y - l.height();
        return i && "object" === (void 0 === i ? "undefined" : _typeof(i)) && i.anchor && (u += i.anchor[0],
          d += i.anchor[1]),
          l.css("transform", "translate3d(" + u + "px," + d + "px, 0)"),
          !0
      }
      function bind2scene() {
        for (var e in objPopup) {
          var t = objPopup[e];
          updateViewPoint(e, t.cartesian, t.popup, t.viewPoint) || close(e)
        }
      }
      function getPopupId(e) {
        return "popup_" + ((e.id || "") + "").replace(new RegExp("[^0-9a-zA-Z_]", "gm"), "_")
      }
      function close(e, t) {
        if (!_isOnly && e) {
          "object" === (void 0 === e ? "undefined" : _typeof(e)) && (e = getPopupId(e));
          for (var i in objPopup)
            if (e == objPopup[i].id || e == i) {
              (0,
                _jquery2.default)("#" + i).remove(),
                delete objPopup[i];
              break
            }
        } else
          (0,
            _jquery2.default)("#pupup-all-view").empty(),
            objPopup = {};
        t && (removeFeature(),
          unHighlighPick())
      }
      function destroy() {
        close(),
          handler.destroy(),
          viewer.scene.postRender.removeEventListener(bind2scene)
      }
      function template(e, t) {
        for (var i in t) {
          var a = t[i];
          null != a && "Null" != a && "Unknown" != a || (a = ""),
            "_" == i.substr(0, 1) && (i = i.substring(1)),
            e = e.replace(new RegExp("{" + i + "}", "gm"), a)
        }
        return e
      }
      function getAttrVal(e) {
        try {
          var t = {};
          if (e._propertyNames && e._propertyNames.length > 0) {
            var i = !0
              , a = !1
              , n = void 0;
            try {
              for (var r, o = e._propertyNames[Symbol.iterator](); !(i = (r = o.next()).done); i = !0) {
                var s = r.value;
                t[s] = e[s].getValue()
              }
            } catch (e) {
              a = !0,
                n = e
            } finally {
              try {
                !i && o.return && o.return()
              } finally {
                if (a)
                  throw n
              }
            }
          } else
            for (var l in e)
              "function" != typeof e[l] && (t[l] = e[l]);
          return t
        } catch (e) {
          console.log(e)
        }
        return e
      }
      function getPopupForConfig(e, t) {
        var i = e.popupNameField ? t[e.popupNameField] : e.name;
        return e.popup ? getPopup(e.popup, t, i) : !!e.columns && getPopup(e.columns, t, i)
      }
      function getPopup(cfg, attr, title) {
        if (!attr)
          return !1;
        if (title = title || "",
          Util.isArray(cfg)) {
          for (var countsok = 0, inhtml = '<div class="das-popup-titile">' + title + '</div><div class="das-popup-content" >', i = 0; i < cfg.length; i++) {
            var thisfield = cfg[i]
              , col = thisfield.field;
            if (null != col && null != attr[col] && ("object" === _typeof(attr[col]) && attr[col].hasOwnProperty && attr[col].hasOwnProperty("getValue") && (attr[col] = attr[col].getValue()),
              "function" != typeof attr[col]))
              if ("details" != thisfield.type) {
                var showval = _jquery2.default.trim(attr[col]);
                if (null != showval && "" != showval && "Null" != showval && "Unknown" != showval && "0" != showval && 0 != showval.length) {
                  if (thisfield.format)
                    try {
                      showval = eval(thisfield.format + "(" + showval + ")")
                    } catch (e) {
                      console.log("getPopupByConfig error:" + thisfield.format)
                    }
                  thisfield.unit && (showval += thisfield.unit),
                    inhtml += "<div><label>" + thisfield.name + "</label>" + showval + "</div>",
                    countsok++
                }
              } else {
                var showval = _jquery2.default.trim(attr[col || "OBJECTID"]);
                if (null == showval || "" == showval || "Null" == showval || "Unknown" == showval)
                  continue;
                inhtml += '<div style="text-align: center;padding: 10px 0;"><button type="button" onclick="' + thisfield.calback + "('" + showval + '\');" " class="btn btn-info  btn-sm">' + (thisfield.name || "查看详情") + "</button></div>"
              }
          }
          return inhtml += "</div>",
            0 != countsok && inhtml
        }
        if ("object" !== (void 0 === cfg ? "undefined" : _typeof(cfg))) {
          if ("function" == typeof cfg)
            return cfg(attr);
          if ("all" == cfg) {
            var countsok = 0
              , inhtml = '<div class="das-popup-titile">' + title + '</div><div class="das-popup-content" >';
            for (var col in attr)
              try {
                if (null == col || null == attr[col])
                  continue;
                if ("Shape" == col || "FID" == col || "OBJECTID" == col || "_definitionChanged" == col || "_propertyNames" == col)
                  continue;
                if ("_" == col.substr(0, 1) && (col = col.substring(1)),
                  "object" === _typeof(attr[col]) && attr[col].hasOwnProperty && attr[col].hasOwnProperty("getValue") && (attr[col] = attr[col].getValue()),
                  "function" == typeof attr[col])
                  continue;
                var showval = _jquery2.default.trim(attr[col]);
                if (null == showval || "" == showval || "Null" == showval || "Unknown" == showval || "0" == showval || 0 == showval.length)
                  continue;
                inhtml += "<div><label>" + col + "</label>" + showval + "</div>",
                  countsok++
              } catch (e) {
                console.log(e)
              }
            return inhtml += "</div>",
              0 != countsok && inhtml
          }
          return template(cfg, attr)
        }
        switch (cfg.type) {
          case "iframe":
            var _url = _util.template(cfg.url, attr)
              , inhtml = '<iframe id="ifarm" src="' + _url + '"  style="width:' + (cfg.width || "300") + "px;height:" + (cfg.height || "300") + 'px;overflow:hidden;margin:0;" scrolling="no" frameborder="0" ></iframe>';
            return inhtml;
          case "javascript":
            return eval(cfg.calback + "(" + JSON.stringify(getAttrVal(attr)) + ")")
        }
        return !1
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _typeof = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        ;
      exports.isOnly = isOnly,
        exports.setEnable = setEnable,
        exports.getEnable = getEnable,
        exports.init = init,
        exports.show = show,
        exports.getPopupId = getPopupId,
        exports.close = close,
        exports.destroy = destroy,
        exports.getPopupForConfig = getPopupForConfig,
        exports.getPopup = getPopup;
      var _Cesium = __webpack_require__(0), _Cesium2 = _interopRequireDefault(_Cesium), _jquery = __webpack_require__(5), _jquery2 = _interopRequireDefault(_jquery), _point = __webpack_require__(1), _Util = __webpack_require__(2), Util = _interopRequireWildcard(_Util), viewer, handler, objPopup = {}, _isOnly = !0, _enable = !0, lastShowFeature, highlighted = {
        feature: void 0,
        originalColor: new _Cesium2.default.Color
      }, defaultHighlightedClr = new _Cesium2.default.Color.fromCssColorString("#95e40c")
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function n(e) {
        h = e;
        (0,
          w.default)("#" + h._container.id).append('<div id="tooltip-view" class="cesium-popup" style="display:none;">     <div class="cesium-popup-content-wrapper  cesium-popup-background">         <div id="tooltip-content" class="cesium-popup-content cesium-popup-color"></div>     </div>     <div class="cesium-popup-tip-container"><div class="cesium-popup-tip  cesium-popup-background"></div></div></div> '),
          f = new v.default.ScreenSpaceEventHandler(h.scene.canvas),
          f.setInputAction(r, v.default.ScreenSpaceEventType.MOUSE_MOVE)
      }
      function r(e) {
        if ((0,
          w.default)(".cesium-viewer").css("cursor", ""),
          !1 === h.scene.screenSpaceCameraController.enableRotate || !1 === h.scene.screenSpaceCameraController.enableTilt || !1 === h.scene.screenSpaceCameraController.enableTranslate)
          return void s();
        var t, i = e.endPosition, a = h.scene.pick(i);
        if (a && v.default.defined(a.id) && a.id instanceof v.default.Entity ? t = a.id : a && v.default.defined(a.primitive) && (t = a.primitive),
          t)
          if ((t.popup || t.click || t.cursorCSS) && (0,
            w.default)(".cesium-viewer").css("cursor", t.cursorCSS || "pointer"),
            t.noMouseMove || (clearTimeout(m),
              m = setTimeout(function () {
                l(t, i)
              }, 20)),
            t.tooltip) {
            var n = (0,
              _.getCurrentMousePosition)(h.scene, i);
            o(t, n, i)
          } else
            s();
        else
          s(),
            clearTimeout(m),
            m = setTimeout(u, 20)
      }
      function o(e, t, i) {
        if (null != e && null != e.tooltip) {
          if (null == i && (i = v.default.SceneTransforms.wgs84ToWindowCoordinates(h.scene, t)),
            null == i)
            return void s();
          var a, n = (0,
            w.default)("#tooltip-view");
          if ("object" === c(e.tooltip)) {
            if (a = e.tooltip.html,
              e.tooltip.check && !e.tooltip.check())
              return void s()
          } else
            a = e.tooltip;
          if ("function" == typeof a && (a = a(e, t)),
            a) {
            (0,
              w.default)("#tooltip-content").html(a),
              n.show();
            var r = i.x - n.width() / 2
              , o = i.y - n.height()
              , l = e.tooltip;
            l && "object" === (void 0 === l ? "undefined" : c(l)) && l.anchor ? (r += l.anchor[0],
              o += l.anchor[1]) : o -= 15,
              n.css("transform", "translate3d(" + r + "px," + o + "px, 0)")
          }
        }
      }
      function s() {
        (0,
          w.default)("#tooltip-content").empty(),
          (0,
            w.default)("#tooltip-view").hide()
      }
      function l(e, t) {
        p !== e && (u(),
          e.mouseover && "function" == typeof e.mouseover && e.mouseover(e, t),
          p = e)
      }
      function u() {
        null != p && (p.mouseout && "function" == typeof p.mouseout && p.mouseout(p),
          p = null)
      }
      function d() {
        s(),
          f.destroy()
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var c = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        ;
      t.init = n,
        t.show = o,
        t.close = s,
        t.destroy = d;
      var h, f, p, m, g = i(0), v = a(g), y = i(5), w = a(y), _ = i(1)
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function r(e) {
        l = e;
        (0,
          f.default)("#" + l._container.id).append('<div id="das-contextmenu" class="das-contextmenu open" style="display:none;">\n            <ul id="das-contextmenu-ul" class="dropdown-menu das-contextmenu-ul"> \n            </ul>\n        </div>'),
          u = new c.default.ScreenSpaceEventHandler(l.scene.canvas),
          u.setInputAction(s, c.default.ScreenSpaceEventType.LEFT_DOWN),
          u.setInputAction(s, c.default.ScreenSpaceEventType.MIDDLE_DOWN),
          u.setInputAction(s, c.default.ScreenSpaceEventType.RIGHT_DOWN),
          u.setInputAction(s, c.default.ScreenSpaceEventType.PINCH_START),
          u.setInputAction(s, c.default.ScreenSpaceEventType.WHEEL),
          u.setInputAction(function (e) {
            s();
            var t, i = e.position, a = l.scene.pick(i);
            return a && c.default.defined(a.id) && a.id instanceof c.default.Entity ? (t = a.id,
              void o(t.contextmenuItems, i, t)) : a && c.default.defined(a.primitive) ? (t = a.primitive,
                void (t.contextmenuItems ? o(t.contextmenuItems, i, t) : o(l.das.contextmenuItems, i))) : void o(l.das.contextmenuItems, i)
          }, c.default.ScreenSpaceEventType.RIGHT_CLICK)
      }
      function o(e, t, i) {
        if (!e || 0 == e.length)
          return void s();
        for (var a = "", n = 0, r = e.length; n < r; n++) {
          var o = e[n];
          if (o.hasOwnProperty("visible")) {
            var l = o.visible;
            if ("function" == typeof l && (l = o.visible()),
              !l)
              continue
          }
          o.text ? a += '<li class="contextmenu-item" data-index="' + n + '"><a href="javascript:void(0)"><i class="' + o.iconCls + '"></i>' + o.text + "</a></li>" : a += '<li class="line"></li>'
        }
        if ("" == a)
          return void s();
        (0,
          f.default)("#das-contextmenu-ul").html(a),
          (0,
            f.default)("#das-contextmenu-ul .contextmenu-item").click(function (a) {
              var n = Number((0,
                f.default)(this).attr("data-index"))
                , r = e[n];
              r && r.calback && r.calback({
                position: t,
                data: r,
                target: i
              }),
                s()
            }),
          (0,
            f.default)("#das-contextmenu").css({
              top: t.y + 10,
              left: t.x + 10
            }).show()
      }
      function s() {
        (0,
          f.default)("#das-contextmenu").hide()
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.defaultContextmenuItems = void 0,
        t.init = r,
        t.show = o;
      var l, u, d = i(0), c = n(d), h = i(5), f = n(h), p = i(1), m = a(p), g = i(4), v = a(g);
      t.defaultContextmenuItems = [{
        text: "显示此处经纬度",
        iconCls: "fa fa-info-circle",
        calback: function (e) {
          var t = m.getCurrentMousePosition(l.scene, e.position)
            , i = m.formatPositon(t)
            , a = "经度：" + i.x + " , 纬度：" + i.y + "<br/>高程：" + i.z;
          v.alert(a, "位置信息")
        }
      }, {
        text: "显示当前视角信息",
        iconCls: "fa fa-camera-retro",
        calback: function (e) {
          var t = m.getCameraView(l);
          v.alert(JSON.stringify(t) + "<br/>提示：可用viewer.das.centerAt方法调用", "视角信息")
        }
      }, {
        text: "开启光照效果",
        iconCls: "fa fa-bullseye",
        visible: function () {
          return !l.shadows
        },
        calback: function (e) {
          l.shadows = !0,
            l.terrainShadows = c.default.ShadowMode.ENABLED,
            l.scene.globe.enableLighting = !0
        }
      }, {
        text: "关闭光照效果",
        iconCls: "fa fa-sun-o",
        visible: function () {
          return l.shadows
        },
        calback: function (e) {
          l.shadows = !1,
            l.terrainShadows = c.default.ShadowMode.RECEIVE_ONLY,
            l.scene.globe.enableLighting = !1
        }
      }, {
        text: "开启深度监测",
        iconCls: "fa fa-eye-slash",
        visible: function () {
          return !l.scene.globe.depthTestAgainstTerrain
        },
        calback: function (e) {
          l.scene.globe.depthTestAgainstTerrain = !0
        }
      }, {
        text: "关闭深度监测",
        iconCls: "fa fa-eye",
        visible: function () {
          return l.scene.globe.depthTestAgainstTerrain
        },
        calback: function (e) {
          l.scene.globe.depthTestAgainstTerrain = !1
        }
      }, {
        text: "绕此处环绕飞行",
        iconCls: "fa fa-retweet",
        visible: function () {
          return !m.windingPoint.isStart
        },
        calback: function (e) {
          var t = m.getCurrentMousePosition(l.scene, e.position);
          m.windingPoint.start(l, t)
        }
      }, {
        text: "关闭环绕飞行",
        iconCls: "fa fa-remove",
        visible: function () {
          return m.windingPoint.isStart
        },
        calback: function (e) {
          m.windingPoint.stop()
        }
      }, {
        text: "移动到此处",
        iconCls: "fa fa-send-o",
        calback: function (e) {
          var t = m.getCurrentMousePosition(l.scene, e.position)
            , i = l.scene.camera.positionCartographic.height;
          i > 5e3 && (i = 5e3),
            l.camera.lookAt(t, new c.default.HeadingPitchRange(l.camera.heading, l.camera.pitch, i)),
            l.camera.lookAtTransform(c.default.Matrix4.IDENTITY)
        }
      }, {
        text: "第一视角站到此处",
        iconCls: "fa fa-street-view",
        calback: function (e) {
          var t = m.getCurrentMousePosition(l.scene, e.position);
          l.camera.flyTo({
            destination: m.addPositionsHeight(t, 10),
            orientation: {
              heading: c.default.Math.toRadians(0),
              pitch: c.default.Math.toRadians(10),
              roll: c.default.Math.toRadians(0)
            }
          })
        }
      }]
    }
    , function (e, t, i) {
      function a(e, t) {
        function i(e) {
          switch (e) {
            case 38:
            case "W".charCodeAt(0):
              return "moveForward";
            case "S".charCodeAt(0):
            case 40:
              return "moveBackward";
            case "D".charCodeAt(0):
            case 39:
              return "moveRight";
            case "A".charCodeAt(0):
            case 37:
              return "moveLeft";
            case "Q".charCodeAt(0):
              return "moveUp";
            case "E".charCodeAt(0):
              return "moveDown";
            default:
              return
          }
        }
        function a(t) {
          var i = e.camera
            , a = i.direction
            , n = s.default.Cartesian3.normalize(i.position, new s.default.Cartesian3)
            , r = s.default.Cartesian3.cross(a, n, new s.default.Cartesian3);
          a = s.default.Cartesian3.cross(n, r, new s.default.Cartesian3),
            a = s.default.Cartesian3.normalize(a, a),
            a = s.default.Cartesian3.multiplyByScalar(a, t, a),
            i.position = s.default.Cartesian3.add(i.position, a, i.position)
        }
        var n = e.scene
          , o = e.canvas;
        o.setAttribute("tabindex", "0"),
          o.onclick = function () {
            o.focus()
          }
          ;
        var l = n.globe.ellipsoid;
        n.screenSpaceCameraController.enableRotate = !1,
          n.screenSpaceCameraController.enableTranslate = !1,
          n.screenSpaceCameraController.enableZoom = !1,
          n.screenSpaceCameraController.enableTilt = !1,
          n.screenSpaceCameraController.enableLook = !1;
        var u, d, c = {
          looking: !1,
          moveForward: !1,
          moveBackward: !1,
          moveUp: !1,
          moveDown: !1,
          moveLeft: !1,
          moveRight: !1
        };
        t = t || 100;
        var h = new s.default.ScreenSpaceEventHandler(o);
        h.setInputAction(function (e) {
          c.looking = !0,
            d = u = s.default.Cartesian3.clone(e.position)
        }, s.default.ScreenSpaceEventType.LEFT_DOWN),
          h.setInputAction(function (e) {
            d = e.endPosition
          }, s.default.ScreenSpaceEventType.MOUSE_MOVE),
          h.setInputAction(function (e) {
            c.looking = !1
          }, s.default.ScreenSpaceEventType.LEFT_UP),
          h.setInputAction(function (e) {
            t *= e > 0 ? .9 : 1.1,
              console.log(e)
          }, s.default.ScreenSpaceEventType.WHEEL),
          document.addEventListener("keydown", function (e) {
            var t = i(e.keyCode);
            void 0 !== t && (c[t] = !0)
          }, !1),
          document.addEventListener("keyup", function (e) {
            var t = i(e.keyCode);
            void 0 !== t && (c[t] = !1)
          }, !1),
          r = function (i) {
            var n = e.camera;
            if (c.looking) {
              var r = o.clientWidth
                , h = o.clientHeight
                , f = (d.x - u.x) / r
                , p = -(d.y - u.y) / h;
              n.lookRight(.05 * f),
                n.lookUp(.05 * p);
              var m = n.direction
                , g = s.default.Cartesian3.normalize(n.position, new s.default.Cartesian3)
                , v = s.default.Cartesian3.cross(m, g, new s.default.Cartesian3);
              g = s.default.Cartesian3.cross(v, m, new s.default.Cartesian3),
                n.up = g,
                n.right = v
            }
            var y = l.cartesianToCartographic(n.position).height
              , w = y / t;
            c.moveForward && a(w),
              c.moveBackward && a(-w),
              c.moveUp && n.moveUp(w),
              c.moveDown && n.moveDown(w),
              c.moveLeft && n.moveLeft(w),
              c.moveRight && n.moveRight(w)
          }
          ,
          e.clock.onTick.addEventListener(r)
      }
      function n(e) {
        var t = e.scene;
        e.canvas;
        t.screenSpaceCameraController.enableRotate = !0,
          t.screenSpaceCameraController.enableTranslate = !0,
          t.screenSpaceCameraController.enableZoom = !0,
          t.screenSpaceCameraController.enableTilt = !0,
          t.screenSpaceCameraController.enableLook = !0,
          r && (e.clock.onTick.removeEventListener(r),
            r = void 0)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.bind = a,
        t.unbind = n;
      var r, o = i(0), s = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o)
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.GroupLayer = void 0;
      var a = i(9)
        , n = a.BaseLayer.extend({
          create: function () {
            for (var e = this.config._layers, t = 0, i = e.length; t < i; t++)
              this.hasOpacity = e[t].hasOpacity,
                this.hasZIndex = e[t].hasZIndex
          },
          setVisible: function (e) {
            this._visible = e;
            for (var t = this.config._layers, i = 0, a = t.length; i < a; i++)
              t[i].setVisible(e)
          },
          add: function () {
            this._visible = !0;
            for (var e = this.config._layers, t = 0, i = e.length; t < i; t++)
              e[t].setVisible(!0)
          },
          remove: function () {
            this._visible = !1;
            for (var e = this.config._layers, t = 0, i = e.length; t < i; t++)
              e[t].setVisible(!1)
          },
          centerAt: function (e) {
            for (var t = this.config._layers, i = 0, a = t.length; i < a; i++)
              t[i].centerAt(e)
          },
          setOpacity: function (e) {
            for (var t = this.config._layers, i = 0, a = t.length; i < a; i++)
              t[i].hasOpacity && t[i].setOpacity(e)
          }
        });
      t.GroupLayer = n
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.GraticuleLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(9)
        , o = r.BaseLayer.extend({
          model: null,
          add: function () {
            null == this.model && this.initData(),
              this.model.setVisible(!0)
          },
          remove: function () {
            null != this.model && this.model.setVisible(!1)
          },
          initData: function () {
            function e(e, t) {
              e = e || {},
                this._tilingScheme = e.tilingScheme || new n.default.GeographicTilingScheme,
                this._color = e.color || new n.default.Color(1, 1, 1, .4),
                this._tileWidth = e.tileWidth || 256,
                this._tileHeight = e.tileHeight || 256,
                this._ready = !0,
                this._sexagesimal = e.sexagesimal || !1,
                this._numLines = e.numLines || 50,
                this._scene = t,
                this._labels = new n.default.LabelCollection,
                t.primitives.add(this._labels),
                this._polylines = new n.default.PolylineCollection,
                t.primitives.add(this._polylines),
                this._ellipsoid = t.globe.ellipsoid;
              var i = document.createElement("canvas");
              i.width = 256,
                i.height = 256,
                this._canvas = i;
              var a = this;
              t.camera.moveEnd.addEventListener(function () {
                a._show && (a._polylines.removeAll(),
                  a._labels.removeAll(),
                  a._currentExtent = null,
                  a._drawGrid(a._getExtentView()))
              }),
                t.imageryLayers.addImageryProvider(this)
            }
            function t(e) {
              return e < .01 ? 2 : e < .1 ? 1 : 0
            }
            var i = function () {
              try {
                return "x" in Object.defineProperty({}, "x", {})
              } catch (e) {
                return !1
              }
            }()
              , a = Object.defineProperties;
            i && a || (a = function (e) {
              return e
            }
            ),
              a(e.prototype, {
                url: {
                  get: function () { }
                },
                proxy: {
                  get: function () { }
                },
                tileWidth: {
                  get: function () {
                    return this._tileWidth
                  }
                },
                tileHeight: {
                  get: function () {
                    return this._tileHeight
                  }
                },
                maximumLevel: {
                  get: function () {
                    return 18
                  }
                },
                minimumLevel: {
                  get: function () {
                    return 0
                  }
                },
                tilingScheme: {
                  get: function () {
                    return this._tilingScheme
                  }
                },
                rectangle: {
                  get: function () {
                    return this._tilingScheme.rectangle
                  }
                },
                tileDiscardPolicy: {
                  get: function () { }
                },
                errorEvent: {
                  get: function () {
                    return this._errorEvent
                  }
                },
                ready: {
                  get: function () {
                    return this._ready
                  }
                },
                credit: {
                  get: function () {
                    return this._credit
                  }
                },
                hasAlphaChannel: {
                  get: function () {
                    return !0
                  }
                }
              }),
              e.prototype.makeLabel = function (e, t, i, a, r) {
                this._labels.add({
                  position: this._ellipsoid.cartographicToCartesian(new n.default.Cartographic(e, t, 10)),
                  text: i,
                  font: "normal small-caps normal 16px 楷体",
                  style: n.default.LabelStyle.FILL_AND_OUTLINE,
                  fillColor: n.default.Color.AZURE,
                  outlineColor: n.default.Color.BLACK,
                  outlineWidth: 2,
                  pixelOffset: new n.default.Cartesian2(5, a ? 5 : -5),
                  eyeOffset: n.default.Cartesian3.ZERO,
                  horizontalOrigin: n.default.HorizontalOrigin.LEFT,
                  verticalOrigin: a ? n.default.VerticalOrigin.BOTTOM : n.default.VerticalOrigin.TOP,
                  scale: 1
                })
              }
              ,
              e.prototype._drawGrid = function (e) {
                if (!this._currentExtent || !this._currentExtent.equals(e)) {
                  this._currentExtent = e,
                    this._polylines.removeAll(),
                    this._labels.removeAll();
                  var i, a = (this._canvasSize,
                    0), o = 0;
                  for (i = 0; i < r.length && a < (e.north - e.south) / 10; i++)
                    a = r[i];
                  for (i = 0; i < r.length && o < (e.east - e.west) / 10; i++)
                    o = r[i];
                  var s = (e.west < 0 ? Math.ceil(e.west / o) : Math.floor(e.west / o)) * o
                    , l = (e.south < 0 ? Math.ceil(e.south / a) : Math.floor(e.south / a)) * a
                    , u = (e.east < 0 ? Math.ceil(e.east / a) : Math.floor(e.east / a)) * a
                    , d = (e.north < 0 ? Math.ceil(e.north / o) : Math.floor(e.north / o)) * o;
                  s = Math.max(s - 2 * o, -Math.PI),
                    u = Math.min(u + 2 * o, Math.PI),
                    l = Math.max(l - 2 * a, -Math.PI / 2),
                    d = Math.min(d + 2 * o, Math.PI / 2);
                  var c, h, f = this._ellipsoid, p = n.default.Math.toRadians(1), m = l + Math.floor((d - l) / a / 2) * a;
                  for (h = s; h < u; h += o) {
                    var g = [];
                    for (c = l; c < d; c += p)
                      g.push(new n.default.Cartographic(h, c));
                    g.push(new n.default.Cartographic(h, d)),
                      this._polylines.add({
                        positions: f.cartographicArrayToCartesianArray(g),
                        width: 1
                      });
                    var v = n.default.Math.toDegrees(h);
                    this.makeLabel(h, m, this._sexagesimal ? this._decToSex(v) : v.toFixed(t(o)), !1)
                  }
                  var y = s + Math.floor((u - s) / o / 2) * o;
                  for (c = l; c < d; c += a) {
                    var g = [];
                    for (h = s; h < u; h += p)
                      g.push(new n.default.Cartographic(h, c));
                    g.push(new n.default.Cartographic(u, c)),
                      this._polylines.add({
                        positions: f.cartographicArrayToCartesianArray(g),
                        width: 1
                      });
                    var w = n.default.Math.toDegrees(c);
                    this.makeLabel(y, c, this._sexagesimal ? this._decToSex(w) : w.toFixed(t(a)), !0)
                  }
                }
              }
              ,
              e.prototype.requestImage = function (e, t, i) {
                return this._show && this._drawGrid(this._getExtentView()),
                  this._canvas
              }
              ,
              e.prototype.setVisible = function (e) {
                this._show = e,
                  e ? (this._currentExtent = null,
                    this._drawGrid(this._getExtentView())) : (this._polylines.removeAll(),
                      this._labels.removeAll())
              }
              ,
              e.prototype.isVisible = function () {
                return this._show
              }
              ,
              e.prototype._decToSex = function (e) {
                var t = Math.floor(e)
                  , i = (60 * (Math.abs(e) - t)).toFixed(2);
                return "60.00" == i && (t += 1,
                  i = "0.00"),
                  [t, ":", i].join("")
              }
              ,
              e.prototype._getExtentView = function () {
                for (var e = this._scene.camera, t = this._scene.canvas, i = [e.pickEllipsoid(new n.default.Cartesian2(0, 0), this._ellipsoid), e.pickEllipsoid(new n.default.Cartesian2(t.width, 0), this._ellipsoid), e.pickEllipsoid(new n.default.Cartesian2(0, t.height), this._ellipsoid), e.pickEllipsoid(new n.default.Cartesian2(t.width, t.height), this._ellipsoid)], a = 0; a < 4; a++)
                  if (void 0 === i[a])
                    return n.default.Rectangle.MAX_VALUE;
                return n.default.Rectangle.fromCartographicArray(this._ellipsoid.cartesianArrayToCartographicArray(i))
              }
              ;
            var r = [n.default.Math.toRadians(.05), n.default.Math.toRadians(.1), n.default.Math.toRadians(.2), n.default.Math.toRadians(.5), n.default.Math.toRadians(1), n.default.Math.toRadians(2), n.default.Math.toRadians(5), n.default.Math.toRadians(10)];
            this.model = new e({
              numLines: 10
            }, this.viewer.scene)
          }
        });
      t.GraticuleLayer = o
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.FeatureGridLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(38)
        , o = r.TileLayer.extend({
          dataSource: null,
          hasOpacity: !1,
          create: function () {
            this.dataSource = new n.default.CustomDataSource,
              this.primitives = new n.default.PrimitiveCollection;
            var e = this;
            this.config.type_new = "custom_featuregrid",
              this.config.addImageryCache = function (t) {
                return e._addImageryCache(t)
              }
              ,
              this.config.removeImageryCache = function (t) {
                return e._removeImageryCache(t)
              }
              ,
              this.config.removeAllImageryCache = function (t) {
                return e._removeAllImageryCache(t)
              }
          },
          getLength: function () {
            return this.primitives.length + this.dataSource.entities.values.length
          },
          addEx: function () {
            this.viewer.dataSources.add(this.dataSource),
              this.viewer.scene.primitives.add(this.primitives)
          },
          removeEx: function () {
            this.viewer.dataSources.remove(this.dataSource),
              this.viewer.scene.primitives.remove(this.primitives)
          },
          _addImageryCache: function (e) { },
          _removeImageryCache: function (e) { },
          _removeAllImageryCache: function () { }
        });
      t.FeatureGridLayer = o
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.POILayer = void 0;
      var n = i(0)
        , r = a(n)
        , o = i(5)
        , s = a(o)
        , l = i(19)
        , u = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(l)
        , d = i(39)
        , c = i(23)
        , h = i(14)
        , f = i(12)
        , p = d.CustomFeatureGridLayer.extend({
          _keys: null,
          _key_index: 0,
          getKey: function () {
            this._keys || (this._keys = this.config.key || ["c95467d0ed2a3755836e37dc27369f97", "4320dda936d909d73ab438b4e29cf2a2", "e64a96ed7e361cbdc0ebaeaf3818c564", "df3247b7df64434adecb876da94755d7", "d4375ec477cb0a473c448fb1f83be781", "13fdd7b2b90a9d326ae96867ebcc34ce", "c34502450ae556f42b21760faf6695a0", "57f8ebe12797a73fc5b87f5d4ef859b1"]);
            var e = this._key_index++ % this._keys.length;
            return this._keys[e]
          },
          getDataForGrid: function (e, t) {
            var i = u.wgs2gcj([e.rectangle.xmin, e.rectangle.ymax])
              , a = u.wgs2gcj([e.rectangle.xmax, e.rectangle.ymin])
              , n = i[0] + "," + i[1] + "|" + a[0] + "," + a[1]
              , r = this.config.filter || {};
            r.output = "json",
              r.key = this.getKey(),
              r.polygon = n,
              r.offset || (r.offset = 25),
              r.types || (r.types = "120000|130000|190000");
            s.default.ajax({
              url: "http://restapi.amap.com/v3/place/polygon",
              type: "get",
              dataType: "json",
              timeout: "5000",
              data: r,
              success: function (e) {
                if ("10000" !== e.infocode)
                  return void console.log("POI 请求失败(" + e.infocode + ")：" + e.info);
                var i = e.pois;
                t(i)
              },
              error: function (e) {
                console.log("POI 请求出错(" + e.status + ")：" + e.statusText)
              }
            })
          },
          createEntity: function (e, t) {
            var i = "<div>名称：" + t.name + "</div><div>地址：" + t.address + "</div><div>区域：" + t.pname + t.cityname + t.adname + "</div><div>类别：" + t.type + "</div>"
              , a = t.location.split(",");
            a = u.gcj2wgs(a);
            var n = this.viewer.das.point2map({
              x: a[0],
              y: a[1]
            })
              , o = {
                name: t.name,
                position: r.default.Cartesian3.fromDegrees(n.x, n.y, this.config.height || 3),
                popup: {
                  html: i,
                  anchor: [0, -15]
                },
                properties: t
              }
              , l = this.config.symbol;
            if (l) {
              var d = l.styleOptions;
              if (l.styleField) {
                var p = attr[l.styleField]
                  , m = l.styleFieldOptions[p];
                null != m && (d = s.default.extend({}, d),
                  d = s.default.extend(d, m))
              }
              d = d || {},
                d.image ? (o.billboard = (0,
                  h.style2Entity)(d),
                  o.billboard.heightReference = r.default.HeightReference.RELATIVE_TO_GROUND) : o.point = (0,
                    c.style2Entity)(d),
                d.label && (o.label = (0,
                  f.style2Entity)(d.label),
                  o.label.heightReference = r.default.HeightReference.RELATIVE_TO_GROUND,
                  o.label.text = t.name)
            } else
              o.point = {
                color: new r.default.Color.fromCssColorString("#3388ff"),
                pixelSize: 10,
                outlineColor: new r.default.Color.fromCssColorString("#ffffff"),
                outlineWidth: 2,
                heightReference: r.default.HeightReference.RELATIVE_TO_GROUND,
                scaleByDistance: new r.default.NearFarScalar(1e3, 1, 2e4, .5)
              },
                o.label = {
                  text: t.name,
                  font: "normal small-caps normal 16px 楷体",
                  style: r.default.LabelStyle.FILL_AND_OUTLINE,
                  fillColor: r.default.Color.AZURE,
                  outlineColor: r.default.Color.BLACK,
                  outlineWidth: 2,
                  horizontalOrigin: r.default.HorizontalOrigin.CENTER,
                  verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                  pixelOffset: new r.default.Cartesian2(0, -15),
                  heightReference: r.default.HeightReference.RELATIVE_TO_GROUND,
                  scaleByDistance: new r.default.NearFarScalar(1e3, 1, 5e3, .8),
                  distanceDisplayCondition: new r.default.DistanceDisplayCondition(0, 5e3)
                };
            return this.dataSource.entities.add(o)
          }
        });
      t.POILayer = p
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.GltfLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(9)
        , o = r.BaseLayer.extend({
          model: null,
          add: function () {
            this.model ? this.viewer.entities.add(this.model) : this.initData()
          },
          remove: function () {
            this.viewer.entities.remove(this.model)
          },
          centerAt: function (e) {
            if (null != this.model)
              if (this.config.extent || this.config.center)
                this.viewer.das.centerAt(this.config.extent || this.config.center, {
                  duration: e,
                  isWgs84: !0
                });
              else {
                var t = this.config.position;
                this.viewer.das.centerAt(t, {
                  duration: e,
                  isWgs84: !0
                })
              }
          },
          initData: function () {
            var e = this.config.position;
            e = this.viewer.das.point2map(e);
            var t = n.default.Cartesian3.fromDegrees(e.x, e.y, e.z || 0)
              , i = n.default.Math.toRadians(e.heading || 0)
              , a = n.default.Math.toRadians(e.pitch || 0)
              , r = n.default.Math.toRadians(e.roll || 0)
              , o = new n.default.HeadingPitchRoll(i, a, r)
              , s = n.default.Transforms.headingPitchRollQuaternion(t, o)
              , l = {
                uri: this.config.url
              };
            for (var u in this.config)
              "url" != u && "name" != u && "position" != u && "center" != u && "tooltip" != u && "popup" != u && (l[u] = this.config[u]);
            this.model = this.viewer.entities.add({
              name: this.config.name,
              position: t,
              orientation: s,
              model: l,
              _config: this.config,
              tooltip: this.config.tooltip,
              popup: this.config.popup
            })
          },
          hasOpacity: !0,
          setOpacity: function (e) {
            null != this.model && (this.model.model.color = new n.default.Color.fromCssColorString("#FFFFFF").withAlpha(e))
          }
        });
      t.GltfLayer = o
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.Tiles3dLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(9)
        , o = i(4)
        , s = i(40)
        , l = i(1)
        , u = r.BaseLayer.extend({
          model: null,
          originalCenter: null,
          boundingSphere: null,
          add: function () {
            this.model ? this.viewer.scene.primitives.add(this.model) : this.initData()
          },
          remove: function () {
            this.viewer.scene.primitives.remove(this.model),
              this.model = null
          },
          centerAt: function (e) {
            this.config.extent || this.config.center ? this.viewer.das.centerAt(this.config.extent || this.config.center, {
              duration: e,
              isWgs84: !0
            }) : this.boundingSphere && this.viewer.camera.flyToBoundingSphere(this.boundingSphere, {
              offset: new n.default.HeadingPitchRange(0, -.5, 2 * this.boundingSphere.radius),
              duration: e
            })
          },
          initData: function () {
            this.config.maximumScreenSpaceError = this.config.maximumScreenSpaceError || 2,
              this.config.maximumMemoryUsage = this.config.maximumMemoryUsage || 2048,
              this.model = this.viewer.scene.primitives.add(new n.default.Cesium3DTileset((0,
                o.getProxyUrl)(this.config))),
              this.model._config = this.config;
            for (var e in this.config)
              if ("url" != e && "type" != e && "style" != e && "classificationType" != e)
                try {
                  this.model[e] = this.config[e]
                } catch (e) { }
            this.config.style && (this.model.style = new n.default.Cesium3DTileStyle(this.config.style));
            var t = this;
            this.model.readyPromise.then(function (e) {
              t.readyPromise && t.readyPromise(e),
                t.hasOpacity && 1 != t._opacity && t.setOpacity(t._opacity);
              var i = e.boundingSphere;
              t.boundingSphere = i,
                e._root && e._root.transform && (t.orginMatrixInverse = n.default.Matrix4.inverse(n.default.Matrix4.fromArray(e._root.transform), new n.default.Matrix4),
                  t.config.scale > 0 && 1 != t.config.scale && (e._root.transform = n.default.Matrix4.multiplyByUniformScale(e._root.transform, t.config.scale, e._root.transform)));
              var a = i.center
                , r = n.default.Cartographic.fromCartesian(a)
                , o = Number(r.height.toFixed(2))
                , s = Number(n.default.Math.toDegrees(r.longitude).toFixed(6))
                , l = Number(n.default.Math.toDegrees(r.latitude).toFixed(6));
              t.originalCenter = {
                x: s,
                y: l,
                z: o
              },
                console.log((t.config.name || "") + " 模型原始位置:" + JSON.stringify(t.originalCenter));
              var u = t.viewer.das.point2map(t.originalCenter);
              if (u.x != t.originalCenter.x || u.y != t.originalCenter.y || null != t.config.offset) {
                t.config.offset = t.config.offset || {},
                  t.config.offset.x && t.config.offset.y && (t.config.offset = t.viewer.das.point2map(t.config.offset));
                var d = {
                  x: t.config.offset.x || u.x,
                  y: t.config.offset.y || u.y,
                  z: t.config.offset.z || 0,
                  heading: t.config.offset.heading,
                  axis: t.config.axis,
                  scale: t.config.scale
                };
                "-height" == t.config.offset.z ? (d.z = 5 - o,
                  t.updateMatrix(d)) : "auto" == t.config.offset.z ? t.autoHeight(a, d) : t.updateMatrix(d)
              }
              !t.viewer.das.isFlyAnimation() && t.config.flyTo && t.centerAt(0),
                t.config.calback && t.config.calback(e)
            })
          },
          autoHeight: function (e, t) {
            var i = this;
            (0,
              o.terrainPolyline)({
                viewer: this.viewer,
                positions: [e, e],
                calback: function (e, a) {
                  if (null != e && 0 != e.length && !a) {
                    var n = (0,
                      l.formatPositon)(e[0])
                      , r = n.z - i.originalCenter.z + 1;
                    t.z = r,
                      i.updateMatrix(t)
                  }
                }
              })
          },
          updateMatrix: function (e) {
            null != this.model && (console.log((this.config.name || "") + " 模型修改后位置:" + JSON.stringify(e)),
              e.transform = null != e.heading,
              (0,
                s.updateMatrix)(this.model, e))
          },
          hasOpacity: !0,
          setOpacity: function (e) {
            this._opacity = e,
              this.model && (this.model.style = new n.default.Cesium3DTileStyle({
                color: "color() *vec4(1,1,1," + e + ")"
              }))
          },
          showClickFeature: function (e) {
            this.model ? this.model._config.showClickFeature = e : this.config.showClickFeature = e
          }
        });
      t.Tiles3dLayer = u
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.KmlLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(28)
        , o = i(4)
        , s = r.GeoJsonLayer.extend({
          queryData: function () {
            var e = this
              , t = (0,
                o.getProxyUrl)(this.config);
            n.default.KmlDataSource.load(t.url, {
              camera: this.viewer.scene.camera,
              canvas: this.viewer.scene.canvas,
              clampToGround: t.clampToGround
            }).then(function (t) {
              e.showResult(t)
            }).otherwise(function (t) {
              e.showError("服务出错", t)
            })
          },
          getEntityAttr: function (e) {
            var t = {
              name: e._name
            }
              , i = e._kml.extendedData;
            for (var a in i)
              t[a] = i[a].value;
            return t
          }
        });
      t.KmlLayer = s
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.CzmlLayer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(28)
        , o = i(4)
        , s = r.GeoJsonLayer.extend({
          queryData: function () {
            var e = this
              , t = (0,
                o.getProxyUrl)(this.config);
            n.default.CzmlDataSource.load(t.url, t).then(function (t) {
              e.showResult(t)
            }).otherwise(function (t) {
              e.showError("服务出错", t)
            })
          },
          getEntityAttr: function (e) {
            if (e.description && e.description.getValue)
              return e.description.getValue()
          }
        });
      t.CzmlLayer = s
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.TerrainLayer = void 0;
      var a = i(0)
        , n = (function (e) {
          e && e.__esModule
        }(a),
          i(9))
        , r = i(4)
        , o = n.BaseLayer.extend({
          terrain: null,
          add: function () {
            this.terrain || (this.terrain = (0,
              r.getTerrainProvider)(this.config)),
              this.viewer.terrainProvider = this.terrain
          },
          remove: function () {
            this.viewer.terrainProvider = (0,
              r.getEllipsoidTerrain)()
          }
        });
      t.TerrainLayer = o
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DrawLayer = void 0;
      var n = i(0)
        , r = (a(n),
          i(5))
        , o = a(r)
        , s = i(9)
        , l = i(16)
        , u = s.BaseLayer.extend({
          create: function () {
            this.drawControl = new l.Draw(this.viewer, {
              hasEdit: !1,
              nameTooltip: !1,
              removeScreenSpaceEvent: !1
            })
          },
          add: function () {
            this._isload ? this.drawControl.setVisible(!0) : this._loadData()
          },
          remove: function () {
            this.drawControl.setVisible(!1)
          },
          centerAt: function (e) {
            var t = this.drawControl.getEntitys();
            this.viewer.flyTo(t, {
              duration: e
            })
          },
          hasOpacity: !1,
          setOpacity: function (e) { },
          _loadData: function () {
            var e = this;
            o.default.ajax({
              type: "get",
              dataType: "json",
              url: this.config.url,
              timeout: 1e4,
              success: function (t) {
                e._isload = !0;
                var i = e.drawControl.jsonToEntity(t, !0, e.config.flyTo);
                e._bindEntityConfig(i)
              },
              error: function (t, i, a) {
                console.log("Json文件" + e.config.url + "加载失败！")
              }
            })
          },
          _bindEntityConfig: function (e) {
            for (var t = this, i = 0, a = e.length; i < a; i++) {
              var n = e[i];
              (this.config.columns || this.config.popup) && (n.popup = {
                html: function (e) {
                  var i = e.attribute.attr;
                  return i.draw_type = e.attribute.type,
                    i.draw_typename = e.attribute.name,
                    t.viewer.das.popup.getPopupForConfig(t.config, i)
                },
                anchor: this.config.popupAnchor || [0, -15]
              }),
                this.config.tooltip && (n.tooltip = {
                  html: function (e) {
                    var i = e.attribute.attr;
                    return i.draw_type = e.attribute.type,
                      i.draw_typename = e.attribute.name,
                      t.viewer.das.popup.getPopupForConfig({
                        popup: t.config.tooltip
                      }, i)
                  },
                  anchor: this.config.tooltipAnchor || [0, -15]
                }),
                this.config.click && (n.click = this.config.click),
                this.config.mouseover && (n.mouseover = this.config.mouseover),
                this.config.mouseout && (n.mouseout = this.config.mouseout)
            }
          }
        });
      t.DrawLayer = u
    }
    , function (e, t, i) {
      function a(e) {
        var t;
        switch (e.layer) {
          case "vec":
          default:
            t = "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=" + (e.bigfont ? "ph" : "pl") + "&scaler=1&p=1";
            break;
          case "img_d":
            t = "http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46";
            break;
          case "img_z":
            t = "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=" + (e.bigfont ? "sh" : "sl") + "&v=020";
            break;
          case "custom":
            e.customid = e.customid || "midnight",
              t = "http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=" + e.customid;
            break;
          case "time":
            t = "http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time=" + (new Date).getTime() + "&label=web2D&v=017"
        }
        this._url = t,
          this._tileWidth = 256,
          this._tileHeight = 256,
          this._maximumLevel = 18;
        var i = new Cesium.Cartesian2(-r, -n)
          , a = new Cesium.Cartesian2(r, n);
        this._tilingScheme = new Cesium.WebMercatorTilingScheme({
          rectangleSouthwestInMeters: i,
          rectangleNortheastInMeters: a
        }),
          this._credit = void 0,
          this._rectangle = this._tilingScheme.rectangle,
          this._ready = !0
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = 33746824
        , r = 33554054;
      Cesium.defineProperties(a.prototype, {
        url: {
          get: function () {
            return this._url
          }
        },
        token: {
          get: function () {
            return this._token
          }
        },
        proxy: {
          get: function () {
            return this._proxy
          }
        },
        tileWidth: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tileWidth must not be called before the imagery provider is ready.");
            return this._tileWidth
          }
        },
        tileHeight: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tileHeight must not be called before the imagery provider is ready.");
            return this._tileHeight
          }
        },
        maximumLevel: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("maximumLevel must not be called before the imagery provider is ready.");
            return this._maximumLevel
          }
        },
        minimumLevel: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("minimumLevel must not be called before the imagery provider is ready.");
            return 0
          }
        },
        tilingScheme: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tilingScheme must not be called before the imagery provider is ready.");
            return this._tilingScheme
          }
        },
        rectangle: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("rectangle must not be called before the imagery provider is ready.");
            return this._rectangle
          }
        },
        tileDiscardPolicy: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tileDiscardPolicy must not be called before the imagery provider is ready.");
            return this._tileDiscardPolicy
          }
        },
        errorEvent: {
          get: function () {
            return this._errorEvent
          }
        },
        ready: {
          get: function () {
            return this._ready
          }
        },
        readyPromise: {
          get: function () {
            return this._readyPromise.promise
          }
        },
        credit: {
          get: function () {
            return this._credit
          }
        },
        usingPrecachedTiles: {
          get: function () {
            return this._useTiles
          }
        },
        hasAlphaChannel: {
          get: function () {
            return !0
          }
        },
        layers: {
          get: function () {
            return this._layers
          }
        }
      }),
        a.prototype.getTileCredits = function (e, t, i) { }
        ,
        a.prototype.requestImage = function (e, t, i) {
          if (!this._ready)
            throw new DeveloperError("requestImage must not be called before the imagery provider is ready.");
          var a = this._tilingScheme.getNumberOfXTilesAtLevel(i)
            , n = this._tilingScheme.getNumberOfYTilesAtLevel(i)
            , r = this._url.replace("{x}", e - a / 2).replace("{y}", n / 2 - t - 1).replace("{z}", i).replace("{s}", Math.floor(10 * Math.random()));
          return Cesium.ImageryProvider.loadImage(this, r)
        }
        ,
        t.BaiduImageryProvider = a
    }
    , function (e, t, i) {
      function a(e) {
        if (e = r.default.defaultValue(e, r.default.defaultValue.EMPTY_OBJECT),
          this.options = e,
          this._tileWidth = r.default.defaultValue(e.tileWidth, 256),
          this._tileHeight = r.default.defaultValue(e.tileHeight, 256),
          this._minimumLevel = r.default.defaultValue(e.minimumLevel, 0),
          this._maximumLevel = e.maximumLevel,
          e.rectangle && e.rectangle.xmin && e.rectangle.xmax && e.rectangle.ymin && e.rectangle.ymax) {
          var t = e.rectangle.xmin
            , i = e.rectangle.xmax
            , a = e.rectangle.ymin
            , n = e.rectangle.ymax;
          e.rectangle = r.default.Rectangle.fromDegrees(t, a, i, n)
        }
        this._tilingScheme = r.default.defaultValue(e.tilingScheme, new r.default.GeographicTilingScheme({
          ellipsoid: e.ellipsoid
        })),
          this._rectangle = r.default.defaultValue(e.rectangle, this._tilingScheme.rectangle),
          this._rectangle = r.default.Rectangle.intersection(this._rectangle, this._tilingScheme.rectangle),
          this._hasAlphaChannel = r.default.defaultValue(e.hasAlphaChannel, !0),
          this._errorEvent = new r.default.Event,
          this._readyPromise = r.default.when.resolve(!0),
          this._credit = void 0,
          this._ready = !0
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.FeatureGridImageryProvider = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n);
      r.default.defineProperties(a.prototype, {
        url: {
          get: function () {
            return this._url
          }
        },
        token: {
          get: function () {
            return this._token
          }
        },
        proxy: {
          get: function () {
            return this._proxy
          }
        },
        tileWidth: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tileWidth must not be called before the imagery provider is ready.");
            return this._tileWidth
          }
        },
        tileHeight: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tileHeight must not be called before the imagery provider is ready.");
            return this._tileHeight
          }
        },
        maximumLevel: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("maximumLevel must not be called before the imagery provider is ready.");
            return this._maximumLevel
          }
        },
        minimumLevel: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("minimumLevel must not be called before the imagery provider is ready.");
            return 0
          }
        },
        tilingScheme: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tilingScheme must not be called before the imagery provider is ready.");
            return this._tilingScheme
          }
        },
        rectangle: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("rectangle must not be called before the imagery provider is ready.");
            return this._rectangle
          }
        },
        tileDiscardPolicy: {
          get: function () {
            if (!this._ready)
              throw new DeveloperError("tileDiscardPolicy must not be called before the imagery provider is ready.");
            return this._tileDiscardPolicy
          }
        },
        errorEvent: {
          get: function () {
            return this._errorEvent
          }
        },
        ready: {
          get: function () {
            return this._ready
          }
        },
        readyPromise: {
          get: function () {
            return this._readyPromise.promise
          }
        },
        credit: {
          get: function () {
            return this._credit
          }
        },
        usingPrecachedTiles: {
          get: function () {
            return this._useTiles
          }
        },
        hasAlphaChannel: {
          get: function () {
            return !0
          }
        },
        layers: {
          get: function () {
            return this._layers
          }
        }
      }),
        a.prototype.getTileCredits = function (e, t, i) { }
        ,
        a.prototype.requestImage = function (e, t, i) {
          var a = document.createElement("canvas");
          if (a.width = 256,
            a.height = 256,
            i < this._minimumLevel)
            return a;
          if (this.options.debuggerTileInfo) {
            var n = a.getContext("2d");
            n.strokeStyle = "#ffff00",
              n.lineWidth = 2,
              n.strokeRect(1, 1, 255, 255);
            var r = "L" + i + "X" + e + "Y" + t;
            n.font = "bold 25px Arial",
              n.textAlign = "center",
              n.fillStyle = "black",
              n.fillText(r, 127, 127),
              n.fillStyle = "#ffff00",
              n.fillText(r, 124, 124)
          }
          return a
        }
        ,
        a.prototype._getGridKey = function (e) {
          return e.level + "_x" + e.x + "_y" + e.y
        }
        ,
        a.prototype.addImageryCache = function (e) {
          e.level < this._minimumLevel || e.level < e.maxLevel - 1 || this.options.addImageryCache && (e.key = this._getGridKey(e),
            this.options.addImageryCache(e))
        }
        ,
        a.prototype.removeImageryCache = function (e) {
          e.maxLevel < this._minimumLevel && this.options.removeAllImageryCache && this.options.removeAllImageryCache(),
            e.level < this._minimumLevel || this.options.removeImageryCache && (e.key = this._getGridKey(e),
              this.options.removeImageryCache(e))
        }
        ,
        t.FeatureGridImageryProvider = a
    }
    , function (module, exports, __webpack_require__) {
      function addLog() {
        try {
          eval(function (e, t, i, a, n, r) {
            if (n = function (e) {
              return e.toString(30)
            }
              ,
              !"".replace(/^/, String)) {
              for (; i--;)
                r[n(i)] = a[i] || n(i);
              a = [function (e) {
                return r[e]
              }
              ],
                n = function () {
                  return "\\w+"
                }
                ,
                i = 1
            }
            for (; i--;)
              a[i] && (e = e.replace(new RegExp("\\b" + n(i) + "\\b", "g"), a[i]));
            return e
          }('1(g(){2.3("\\4\\5\\6\\7\\8\\9\\a\\b d e\\f\\0\\h\\i %c \\j\\k\\l\\m\\n://o.p.q","r:s")},t);', 0, 30, "u67b6|setTimeout|console|log|u5f53|u524d|u4e09|u7ef4|u5730|u56fe|u4f7f|u7528DasGIS||for|Cesium|u6846|function|u5b9e|u73b0|u5b98|u65b9|u7f51|u7ad9|uff1ahttp|cesium|dasgis|cn|color|red|6E4".split("|"), 0, {}))
        } catch (e) { }
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }),
        exports.addLog = addLog
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.GaodePOIGeocoder = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = i(19)
        , l = function (e) {
          if (e && e.__esModule)
            return e;
          var t = {};
          if (null != e)
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t.default = e,
            t
        }(s)
        , u = i(4);
      t.GaodePOIGeocoder = function () {
        function e(t) {
          a(this, e),
            t = t || {},
            this.citycode = t.citycode || "",
            this.gaodekey = t.key || ["f2fedb9b08ae13d22f1692cd472d345e", "81825d9f2bafbb14f235d2779be90c0f", "b185732970a4487de104fa71ef575f29", "2e6ca4aeb6867fb637a5bee8333e5d3a", "027187040fa924e56048468aaa77b62c"]
        }
        return n(e, [{
          key: "getOneKey",
          value: function () {
            var e = this.gaodekey;
            return e[Math.floor(Math.random() * e.length + 1) - 1]
          }
        }, {
          key: "geocode",
          value: function (e, t) {
            var i = this
              , a = this.getOneKey();
            return new o.default.Resource({
              url: "http://restapi.amap.com/v3/place/text",
              queryParameters: {
                key: a,
                city: this.citycode,
                keywords: e
              }
            }).fetchJson().then(function (t) {
              if (0 == t.status)
                return void (0,
                  u.msg)("请求失败(" + t.infocode + ")：" + t.info);
              if (0 === t.pois.length)
                return void (0,
                  u.msg)("未查询到“" + e + "”相关数据！");
              var a = 3e3;
              return i.viewer.camera.positionCartographic.height < a && (a = i.viewer.camera.positionCartographic.height),
                t.pois.map(function (e) {
                  var t = e.location.split(",");
                  t = l.gcj2wgs(t);
                  var n = i.viewer.das.point2map({
                    x: t[0],
                    y: t[1]
                  });
                  return {
                    displayName: e.name,
                    destination: o.default.Cartesian3.fromDegrees(n.x, n.y, a)
                  }
                })
            })
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a() {
        return !0
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.testTk = a
    }
    , function (e, t, i) {
      function a(e, t) {
        return n(e, c.default.Matrix4.fromRotationTranslation(c.default.Matrix3.fromQuaternion(t, h), e, f))
      }
      function n(e, t) {
        var i = c.default.Transforms.eastNorthUpToFixedFrame(e, c.default.Ellipsoid.WGS84, new c.default.Matrix4)
          , a = c.default.Matrix4.multiply(c.default.Matrix4.inverse(i, new c.default.Matrix4), t, new c.default.Matrix4)
          , n = c.default.Matrix4.getRotation(a, new c.default.Matrix3)
          , r = c.default.Quaternion.fromRotationMatrix(n);
        return c.default.HeadingPitchRoll.fromQuaternion(r)
      }
      function r(e, t, i) {
        i = i || c.default.Ellipsoid.WGS84;
        var a = c.default.Cartesian3.normalize(c.default.Cartesian3.subtract(t, e, p), p);
        c.default.Transforms.rotationMatrixFromPositionVelocity(e, a, i, m);
        var r = c.default.Matrix4.fromRotationTranslation(m, e, f);
        return c.default.Matrix4.multiplyTransformation(r, c.default.Axis.Z_UP_TO_X_UP, r),
          n(e, r)
      }
      function o(e, t, i) {
        var a = c.default.Cartographic.fromCartesian(e);
        a.height = 0;
        var n = c.default.Cartographic.toCartesian(a)
          , r = c.default.Cartesian3.normalize(c.default.Cartesian3.subtract(n, e, new c.default.Cartesian3), new c.default.Cartesian3)
          , o = c.default.Quaternion.fromAxisAngle(r, c.default.Math.toRadians(i))
          , s = c.default.Matrix3.fromQuaternion(o)
          , l = c.default.Matrix4.fromRotationTranslation(s)
          , u = c.default.Cartesian3.subtract(t, e, new c.default.Cartesian3)
          , d = c.default.Matrix4.multiplyByPoint(l, u, new c.default.Cartesian3);
        return c.default.Cartesian3.add(d, e, new c.default.Cartesian3)
      }
      function s(e, t, i, a) {
        i = i || 0,
          a = a || "z";
        var n = c.default.Math.toRadians(-i);
        a = "UNIT_" + a.toUpperCase();
        var r = c.default.Quaternion.fromAxisAngle(c.default.Cartesian3[a], n)
          , o = c.default.Matrix3.fromQuaternion(r)
          , s = new c.default.Cartesian3(t.x, t.y, t.z)
          , l = c.default.Matrix4.fromRotationTranslation(o, c.default.Cartesian3.ZERO);
        c.default.Matrix4.multiplyByTranslation(l, s, l);
        var u = c.default.Ellipsoid.WGS84.cartographicToCartesian(c.default.Cartographic.fromCartesian(e))
          , d = c.default.Transforms.eastNorthUpToFixedFrame(u);
        c.default.Matrix4.multiplyTransformation(d, l, l);
        var h = new c.default.Cartesian3;
        return c.default.Matrix4.getTranslation(l, h),
          h
      }
      function l(e, t) {
        for (var i = [], a = 1; a < e.length; a++) {
          var n = e[a - 1]
            , r = e[a]
            , o = c.default.Cartesian3.subtract(n, r, new c.default.Cartesian3)
            , s = c.default.Cartesian3.cross(n, o, new c.default.Cartesian3)
            , l = u(n, s, 1e3 * t)
            , d = u(r, s, 1e3 * t);
          1 == a && i.push(l),
            i.push(d)
        }
        return i
      }
      function u(e, t, i) {
        var a = new c.default.Ray(e, t);
        return c.default.Ray.getPoint(a, i, new c.default.Cartesian3)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.getHeadingPitchRollByOrientation = a,
        t.getHeadingPitchRollByMatrix = n,
        t.getHeadingPitchRollForLine = r,
        t.getRotateCenterPoint = o,
        t.getPositionTranslation = s,
        t.getOffsetLine = l;
      var d = i(0)
        , c = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(d)
        , h = new c.default.Matrix3
        , f = new c.default.Matrix4
        , p = new c.default.Cartesian3
        , f = new c.default.Matrix4
        , m = new c.default.Matrix3
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.FlowEcharts = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = o.default.Math.toRadians(80)
        , l = function () {
          function e(t, i) {
            a(this, e),
              this._GLMap = t,
              this.dimensions = ["lng", "lat"],
              this._mapOffset = [0, 0],
              this._api = i
          }
          return n(e, [{
            key: "setMapOffset",
            value: function (e) {
              this._mapOffset = e
            }
          }, {
            key: "getBMap",
            value: function () {
              return this._GLMap
            }
          }, {
            key: "dataToPoint",
            value: function (e) {
              var t = [99999, 99999]
                , i = o.default.Cartesian3.fromDegrees(e[0], e[1]);
              if (!i)
                return t;
              var a = this._GLMap.cartesianToCanvasCoordinates(i);
              if (!a)
                return t;
              var n = this._GLMap;
              if (n.mode === o.default.SceneMode.SCENE3D) {
                if (o.default.Cartesian3.angleBetween(n.camera.position, i) > s)
                  return !1
              }
              return [a.x - this._mapOffset[0], a.y - this._mapOffset[1]]
            }
          }, {
            key: "pointToData",
            value: function (e) {
              var t = this._mapOffset
                , e = this._bmap.project([e[0] + t[0], e[1] + t[1]]);
              return [e.lng, e.lat]
            }
          }, {
            key: "getViewRect",
            value: function () {
              var e = this._api;
              return new echarts.graphic.BoundingRect(0, 0, e.getWidth(), e.getHeight())
            }
          }, {
            key: "getRoamTransform",
            value: function () {
              return echarts.matrix.create()
            }
          }]),
            e
        }();
      l.dimensions = ["lng", "lat"],
        l.create = function (e, t) {
          var i;
          e.eachComponent("GLMap", function (e) {
            var a = t.getZr().painter;
            if (a) {
              var n = (a.getViewportRoot(),
                echarts.glMap);
              i = new l(n, t),
                i.setMapOffset(e.__mapOffset || [0, 0]),
                e.coordinateSystem = i
            }
          }),
            e.eachSeries(function (e) {
              "GLMap" === e.get("coordinateSystem") && (e.coordinateSystem = i)
            })
        }
        ,
        window.echarts && (echarts.registerCoordinateSystem("GLMap", l),
          echarts.registerAction({
            type: "GLMapRoam",
            event: "GLMapRoam",
            update: "updateLayout"
          }, function (e, t) { }),
          echarts.extendComponentModel({
            type: "GLMap",
            getBMap: function () {
              return this.__GLMap
            },
            defaultOption: {
              roam: !1
            }
          }),
          echarts.extendComponentView({
            type: "GLMap",
            init: function (e, t) {
              this.api = t,
                echarts.glMap.postRender.addEventListener(this.moveHandler, this)
            },
            moveHandler: function (e, t) {
              this.api.dispatchAction({
                type: "GLMapRoam"
              })
            },
            render: function (e, t, i) { },
            dispose: function (e) {
              echarts.glMap.postRender.removeEventListener(this.moveHandler, this)
            }
          }));
      t.FlowEcharts = function () {
        function e(t, i) {
          a(this, e),
            this._mapContainer = t,
            this._overlay = this._createChartOverlay(),
            this._overlay.setOption(i)
        }
        return n(e, [{
          key: "_createChartOverlay",
          value: function () {
            var e = this._mapContainer.scene;
            e.canvas.setAttribute("tabIndex", 0);
            var t = document.createElement("div");
            return t.style.position = "absolute",
              t.style.top = "0px",
              t.style.left = "0px",
              t.style.width = e.canvas.width + "px",
              t.style.height = e.canvas.height + "px",
              t.style.pointerEvents = "none",
              t.setAttribute("id", "echarts"),
              t.setAttribute("class", "echartMap"),
              this._mapContainer.container.appendChild(t),
              this._echartsContainer = t,
              echarts.glMap = e,
              echarts.init(t)
          }
        }, {
          key: "dispose",
          value: function () {
            this._echartsContainer && (this._mapContainer.container.removeChild(this._echartsContainer),
              this._echartsContainer = null),
              this._overlay && (this._overlay.dispose(),
                this._overlay = null)
          }
        }, {
          key: "destroy",
          value: function () {
            this.dispose()
          }
        }, {
          key: "updateOverlay",
          value: function (e) {
            this._overlay && this._overlay.setOption(e)
          }
        }, {
          key: "getMap",
          value: function () {
            return this._mapContainer
          }
        }, {
          key: "getOverlay",
          value: function () {
            return this._overlay
          }
        }, {
          key: "show",
          value: function () {
            document.getElementById(this._id).style.visibility = "visible"
          }
        }, {
          key: "hide",
          value: function () {
            document.getElementById(this._id).style.visibility = "hidden"
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.MapVLayer = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = i(93)
        , l = 0;
      t.MapVLayer = function () {
        function e(t, i, n, r) {
          a(this, e),
            this.map = t,
            this.scene = t.scene,
            this.mapvBaseLayer = new s.MapVRenderer(t, i, n, this),
            this.mapVOptions = n,
            this.initDevicePixelRatio(),
            this.canvas = this._createCanvas(),
            this.render = this.render.bind(this),
            void 0 != r ? (this.container = r,
              r.appendChild(this.canvas)) : (this.container = t.container,
                this.addInnerContainer()),
            this.bindEvent(),
            this._reset()
        }
        return n(e, [{
          key: "initDevicePixelRatio",
          value: function () {
            this.devicePixelRatio = window.devicePixelRatio || 1
          }
        }, {
          key: "addInnerContainer",
          value: function () {
            this.container.appendChild(this.canvas)
          }
        }, {
          key: "bindEvent",
          value: function () {
            var e = this;
            this.innerMoveStart = this.moveStartEvent.bind(this),
              this.innerMoveEnd = this.moveEndEvent.bind(this),
              this.scene.camera.moveStart.addEventListener(this.innerMoveStart, this),
              this.scene.camera.moveEnd.addEventListener(this.innerMoveEnd, this);
            var t = new o.default.ScreenSpaceEventHandler(this.canvas);
            t.setInputAction(function (t) {
              e.innerMoveEnd()
            }, o.default.ScreenSpaceEventType.LEFT_UP),
              t.setInputAction(function (t) {
                e.innerMoveEnd()
              }, o.default.ScreenSpaceEventType.MIDDLE_UP),
              this.handler = t
          }
        }, {
          key: "unbindEvent",
          value: function () {
            this.scene.camera.moveStart.removeEventListener(this.innerMoveStart, this),
              this.scene.camera.moveEnd.removeEventListener(this.innerMoveEnd, this),
              this.scene.postRender.removeEventListener(this._reset, this),
              this.handler && (this.handler.destroy(),
                this.handler = null)
          }
        }, {
          key: "moveStartEvent",
          value: function () {
            this.mapvBaseLayer && this.mapvBaseLayer.animatorMovestartEvent(),
              this.scene.postRender.addEventListener(this._reset, this),
              console.log("mapv moveStartEvent")
          }
        }, {
          key: "moveEndEvent",
          value: function () {
            this.scene.postRender.removeEventListener(this._reset, this),
              this.mapvBaseLayer && this.mapvBaseLayer.animatorMoveendEvent(),
              this._reset(),
              console.log("mapv moveEndEvent")
          }
        }, {
          key: "zoomStartEvent",
          value: function () {
            this._unvisiable()
          }
        }, {
          key: "zoomEndEvent",
          value: function () {
            this._unvisiable()
          }
        }, {
          key: "addData",
          value: function (e, t) {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer.addData(e, t)
          }
        }, {
          key: "updateData",
          value: function (e, t) {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer.updateData(e, t)
          }
        }, {
          key: "getData",
          value: function () {
            return this.mapvBaseLayer && (this.dataSet = this.mapvBaseLayer.getData()),
              this.dataSet
          }
        }, {
          key: "removeData",
          value: function (e) {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer && this.mapvBaseLayer.removeData(e)
          }
        }, {
          key: "removeAllData",
          value: function () {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer.clearData()
          }
        }, {
          key: "_visiable",
          value: function () {
            return this.canvas.style.display = "block"
          }
        }, {
          key: "_unvisiable",
          value: function () {
            return this.canvas.style.display = "none"
          }
        }, {
          key: "_createCanvas",
          value: function () {
            var e = document.createElement("canvas");
            e.id = this.mapVOptions.layerid || "mapv" + l++,
              e.style.position = "absolute",
              e.style.top = "0px",
              e.style.left = "0px",
              e.style.pointerEvents = "none",
              e.style.zIndex = this.mapVOptions.zIndex || 100,
              e.width = parseInt(this.map.canvas.width),
              e.height = parseInt(this.map.canvas.height),
              e.style.width = this.map.canvas.style.width,
              e.style.height = this.map.canvas.style.height;
            var t = this.devicePixelRatio;
            return "2d" == this.mapVOptions.context && e.getContext(this.mapVOptions.context).scale(t, t),
              e
          }
        }, {
          key: "_reset",
          value: function () {
            this.resizeCanvas(),
              this.fixPosition(),
              this.onResize(),
              this.render()
          }
        }, {
          key: "draw",
          value: function () {
            this._reset()
          }
        }, {
          key: "show",
          value: function () {
            this._visiable()
          }
        }, {
          key: "hide",
          value: function () {
            this._unvisiable()
          }
        }, {
          key: "destroy",
          value: function () {
            this.unbindEvent(),
              this.remove()
          }
        }, {
          key: "remove",
          value: function () {
            void 0 != this.mapvBaseLayer && (this.removeAllData(),
              this.mapvBaseLayer.destroy(),
              this.mapvBaseLayer = void 0,
              this.canvas.parentElement.removeChild(this.canvas))
          }
        }, {
          key: "update",
          value: function (e) {
            void 0 != e && this.updateData(e.data, e.options)
          }
        }, {
          key: "resizeCanvas",
          value: function () {
            if (void 0 != this.canvas && null != this.canvas) {
              var e = this.canvas;
              e.style.position = "absolute",
                e.style.top = "0px",
                e.style.left = "0px",
                e.width = parseInt(this.map.canvas.width),
                e.height = parseInt(this.map.canvas.height),
                e.style.width = this.map.canvas.style.width,
                e.style.height = this.map.canvas.style.height
            }
          }
        }, {
          key: "fixPosition",
          value: function () { }
        }, {
          key: "onResize",
          value: function () { }
        }, {
          key: "render",
          value: function () {
            void 0 != this.mapvBaseLayer && this.mapvBaseLayer._canvasUpdate()
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      function n(e, t) {
        if (!e)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== (void 0 === t ? "undefined" : _typeof2(t)) && "function" != typeof t ? e : t
      }
      function r(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : _typeof2(t)));
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }),
          t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.MapVRenderer = void 0;
      var o = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , s = function e(t, i, a) {
          null === t && (t = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(t, i);
          if (void 0 === n) {
            var r = Object.getPrototypeOf(t);
            return null === r ? void 0 : e(r, i, a)
          }
          if ("value" in n)
            return n.value;
          var o = n.get;
          if (void 0 !== o)
            return o.call(a)
        }
        , l = i(0)
        , u = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(l)
        , d = i(94)
        , c = d ? d.baiduMapLayer : null
        , h = c ? c.__proto__ : Function
        , f = u.default.Math.toRadians(80);
      t.MapVRenderer = function (e) {
        function t(e, i, r, o) {
          a(this, t);
          var s = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i, r));
          return h ? (s.map = e,
            s.scene = e.scene,
            s.dataSet = i,
            r = r || {},
            s.init(r),
            s.argCheck(r),
            s.initDevicePixelRatio(),
            s.canvasLayer = o,
            s.stopAniamation = !1,
            s.animation = r.animation,
            s.clickEvent = s.clickEvent.bind(s),
            s.mousemoveEvent = s.mousemoveEvent.bind(s),
            s.bindEvent(),
            s) : n(s)
        }
        return r(t, e),
          o(t, [{
            key: "initDevicePixelRatio",
            value: function () {
              this.devicePixelRatio = window.devicePixelRatio || 1
            }
          }, {
            key: "clickEvent",
            value: function (e) {
              var i = e.point;
              s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "clickEvent", this).call(this, i, e)
            }
          }, {
            key: "mousemoveEvent",
            value: function (e) {
              var i = e.point;
              s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "mousemoveEvent", this).call(this, i, e)
            }
          }, {
            key: "addAnimatorEvent",
            value: function () { }
          }, {
            key: "animatorMovestartEvent",
            value: function () {
              var e = this.options.animation;
              this.isEnabledTime() && this.animator && (this.steps.step = e.stepsRange.start)
            }
          }, {
            key: "animatorMoveendEvent",
            value: function () {
              this.isEnabledTime() && this.animator
            }
          }, {
            key: "bindEvent",
            value: function () {
              this.map,
                this.options.methods && (this.options.methods.click,
                  this.options.methods.mousemove)
            }
          }, {
            key: "unbindEvent",
            value: function () {
              var e = this.map;
              this.options.methods && (this.options.methods.click && e.off("click", this.clickEvent),
                this.options.methods.mousemove && e.off("mousemove", this.mousemoveEvent))
            }
          }, {
            key: "getContext",
            value: function () {
              return this.canvasLayer.canvas.getContext(this.context)
            }
          }, {
            key: "init",
            value: function (e) {
              this.options = e,
                this.initDataRange(e),
                this.context = this.options.context || "2d",
                this.options.zIndex && this.canvasLayer && this.canvasLayer.setZIndex && this.canvasLayer.setZIndex(this.options.zIndex),
                this.initAnimator()
            }
          }, {
            key: "_canvasUpdate",
            value: function (e) {
              this.map;
              var t = this.scene;
              if (this.canvasLayer && !this.stopAniamation) {
                var i = this.options.animation
                  , a = this.getContext();
                if (this.isEnabledTime()) {
                  if (void 0 === e)
                    return void this.clear(a);
                  "2d" === this.context && (a.save(),
                    a.globalCompositeOperation = "destination-out",
                    a.fillStyle = "rgba(0, 0, 0, .1)",
                    a.fillRect(0, 0, a.canvas.width, a.canvas.height),
                    a.restore())
                } else
                  this.clear(a);
                if ("2d" === this.context)
                  for (var n in this.options)
                    a[n] = this.options[n];
                else
                  a.clear(a.COLOR_BUFFER_BIT);
                var r = {
                  transferCoordinate: function (e) {
                    var i = [99999, 99999]
                      , a = u.default.Cartesian3.fromDegrees(e[0], e[1]);
                    if (!a)
                      return i;
                    var n = t.cartesianToCanvasCoordinates(a);
                    if (!n)
                      return i;
                    if (t.mode === u.default.SceneMode.SCENE3D) {
                      if (u.default.Cartesian3.angleBetween(t.camera.position, a) > f)
                        return !1
                    }
                    return [n.x, n.y]
                  }
                };
                void 0 !== e && (r.filter = function (t) {
                  var a = i.trails || 10;
                  return !!(e && t.time > e - a && t.time < e)
                }
                );
                var o = this.dataSet.get(r);
                this.processData(o),
                  "m" == this.options.unit && this.options.size,
                  this.options._size = this.options.size;
                var s = u.default.SceneTransforms.wgs84ToWindowCoordinates(t, u.default.Cartesian3.fromDegrees(0, 0));
                this.drawContext(a, new d.DataSet(o), this.options, s),
                  this.options.updateCallback && this.options.updateCallback(e)
              }
            }
          }, {
            key: "updateData",
            value: function (e, i) {
              var a = e;
              a && a.get && (a = a.get()),
                void 0 != a && this.dataSet.set(a),
                s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "update", this).call(this, {
                  options: i
                })
            }
          }, {
            key: "addData",
            value: function (e, t) {
              var i = e;
              e && e.get && (i = e.get()),
                this.dataSet.add(i),
                this.update({
                  options: t
                })
            }
          }, {
            key: "getData",
            value: function () {
              return this.dataSet
            }
          }, {
            key: "removeData",
            value: function (e) {
              if (this.dataSet) {
                var t = this.dataSet.get({
                  filter: function (t) {
                    return null == e || "function" != typeof e || !e(t)
                  }
                });
                this.dataSet.set(t),
                  this.update({
                    options: null
                  })
              }
            }
          }, {
            key: "clearData",
            value: function () {
              this.dataSet && this.dataSet.clear(),
                this.update({
                  options: null
                })
            }
          }, {
            key: "draw",
            value: function () {
              this.canvasLayer.draw()
            }
          }, {
            key: "clear",
            value: function (e) {
              e && e.clearRect && e.clearRect(0, 0, e.canvas.width, e.canvas.height)
            }
          }, {
            key: "destroy",
            value: function () {
              this.unbindEvent(),
                this.clear(this.getContext()),
                this.clearData(),
                this.animator && this.animator.stop(),
                this.animator = null,
                this.canvasLayer = null
            }
          }]),
          t
      }(h)
    }
    , function (e, t) {
      e.exports = __WEBPACK_EXTERNAL_MODULE_94__
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.ellipsoid = t.rectangle = t.circle = t.polygon = t.wall = t.polylineVolume = t.polyline = t.model = t.point = t.label = t.billboard = void 0;
      var n = i(14)
        , r = a(n)
        , o = i(12)
        , s = a(o)
        , l = i(23)
        , u = a(l)
        , d = i(24)
        , c = a(d)
        , h = i(10)
        , f = a(h)
        , p = i(33)
        , m = a(p)
        , g = i(37)
        , v = a(g)
        , y = i(15)
        , w = a(y)
        , _ = i(27)
        , b = a(_)
        , C = i(34)
        , x = a(C)
        , P = i(36)
        , M = a(P);
      t.billboard = r,
        t.label = s,
        t.point = u,
        t.model = c,
        t.polyline = f,
        t.polylineVolume = m,
        t.wall = v,
        t.polygon = w,
        t.circle = b,
        t.rectangle = x,
        t.ellipsoid = M
    }
    , function (e, t, i) {
      function a(e) {
        if (e && e.__esModule)
          return e;
        var t = {};
        if (null != e)
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t.default = e,
          t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.Measure = void 0;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
        , o = i(22)
        , s = a(o)
        , l = i(16)
        , u = i(7)
        , d = a(u)
        , c = i(12)
        , h = i(15)
        , f = a(h)
        , p = i(4)
        , m = i(1)
        , g = function (e) {
          function t(e) {
            h(),
              x = "length",
              e = e || {},
              e.type = x,
              e.hasOwnProperty("terrain") || (e.terrain = !0),
              S.start(e)
          }
          function i(e) {
            h(),
              x = "section",
              e = e || {},
              e.type = x,
              e.terrain = !0,
              S.start(e)
          }
          function a(e) {
            h(),
              x = "area",
              e = e || {},
              e.type = x,
              E.start(e)
          }
          function n(e) {
            h(),
              x = "volume",
              e = e || {},
              e.type = x,
              D.start(e)
          }
          function o(e) {
            h(),
              e = e || {},
              e.hasOwnProperty("isSuper") && !e.isSuper ? (x = "height",
                e.type = x,
                T.start(e)) : (x = "super_height",
                  e.type = x,
                  k.start(e))
          }
          function u(e) {
            h(),
              x = "angle",
              e = e || {},
              e.type = x,
              A.start(e)
          }
          function h() {
            S.clearLastNoEnd(),
              E.clearLastNoEnd(),
              D.clearLastNoEnd(),
              T.clearLastNoEnd(),
              k.clearLastNoEnd(),
              A.clearLastNoEnd(),
              P.stopDraw()
          }
          function g() {
            x = "",
              h(),
              P.deleteAll()
          }
          function v(e, t) {
            var i = M.entities.values;
            for (var a in i) {
              var n = i[a];
              if (n.label && n.isDasMeasureLabel && n.attribute && n.attribute.value) {
                if (n.attribute.type != e)
                  continue;
                "area" == e ? n.label.text._value = (n.attribute.textEx || "") + y(n.attribute.value, t) : n._label.text._value = (n.attribute.textEx || "") + w(n.attribute.value, t)
              }
            }
          }
          function y(e, t) {
            if (null == e)
              return "";
            null != t && "auto" != t || (t = e < 1e6 ? "m" : "km");
            var i = "";
            switch (t) {
              default:
              case "m":
                i = e.toFixed(2) + "平方米";
                break;
              case "km":
                i = (e / 1e6).toFixed(2) + "平方公里";
                break;
              case "mu":
                i = (.0015 * e).toFixed(2) + "亩";
                break;
              case "ha":
                i = (1e-4 * e).toFixed(2) + "公顷"
            }
            return i
          }
          function w(e, t) {
            if (null == e)
              return "";
            null != t && "auto" != t || (t = e < 1e3 ? "m" : "km");
            var i = "";
            switch (t) {
              default:
              case "m":
                i = e.toFixed(2) + "米";
                break;
              case "km":
                i = (.001 * e).toFixed(2) + "公里";
                break;
              case "mile":
                i = (54e-5 * e).toFixed(2) + "海里";
                break;
              case "zhang":
                i = (.3 * e).toFixed(2) + "丈"
            }
            return i
          }
          var _ = e.viewer
            , b = {
              color: "#ffffff",
              font_family: "楷体",
              font_size: 20,
              border: !0,
              border_color: "#000000",
              border_width: 3,
              background: !0,
              background_color: "#000000",
              background_opacity: .5,
              scaleByDistance: !0,
              scaleByDistance_far: 8e5,
              scaleByDistance_farValue: .5,
              scaleByDistance_near: 1e3,
              scaleByDistance_nearValue: 1,
              pixelOffset: [0, -15],
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            };
          if (e.label)
            for (var C in e.label)
              b[C] = e.label[C];
          var x = ""
            , P = new l.Draw(_, {
              hasEdit: !1,
              removeScreenSpaceEvent: e.removeScreenSpaceEvent
            });
          P.on(d.DrawAddPoint, function (e) {
            var t = e.entity;
            switch (x) {
              case "length":
              case "section":
                S.showAddPointLength(t);
                break;
              case "area":
                E.showAddPointLength(t);
                break;
              case "volume":
                D.showAddPointLength(t);
                break;
              case "height":
                T.showAddPointLength(t);
                break;
              case "super_height":
                k.showAddPointLength(t);
                break;
              case "angle":
                A.showAddPointLength(t)
            }
          }),
            P.on(d.DrawRemovePoint, function (e) {
              switch (x) {
                case "length":
                case "section":
                  S.showRemoveLastPointLength(e);
                  break;
                case "area":
                  E.showRemoveLastPointLength(e);
                  break;
                case "volume":
                  D.showRemoveLastPointLength(e);
                  break;
                case "height":
                  T.showRemoveLastPointLength(e);
                  break;
                case "super_height":
                  k.showRemoveLastPointLength(e);
                  break;
                case "angle":
                  A.showRemoveLastPointLength(e)
              }
            }),
            P.on(d.DrawMouseMove, function (e) {
              var t = e.entity;
              switch (x) {
                case "length":
                case "section":
                  S.showMoveDrawing(t);
                  break;
                case "area":
                  E.showMoveDrawing(t);
                  break;
                case "volume":
                  D.showMoveDrawing(t);
                  break;
                case "height":
                  T.showMoveDrawing(t);
                  break;
                case "super_height":
                  k.showMoveDrawing(t);
                  break;
                case "angle":
                  A.showMoveDrawing(t)
              }
            }),
            P.on(d.DrawCreated, function (e) {
              var t = e.entity;
              switch (x) {
                case "length":
                case "section":
                  S.showDrawEnd(t);
                  break;
                case "area":
                  E.showDrawEnd(t);
                  break;
                case "volume":
                  D.showDrawEnd(t);
                  break;
                case "height":
                  T.showDrawEnd(t);
                  break;
                case "super_height":
                  k.showDrawEnd(t);
                  break;
                case "angle":
                  A.showDrawEnd(t)
              }
            });
          var M = P.getDataSource()
            , S = {
              options: null,
              arrLables: [],
              totalLable: null,
              disTerrainScale: 1.2,
              clearLastNoEnd: function () {
                if (null != this.totalLable && M.entities.remove(this.totalLable),
                  this.arrLables && this.arrLables.length > 0) {
                  var e = this.arrLables;
                  if (e && e.length > 0)
                    for (var t in e)
                      M.entities.remove(e[t])
                }
                this.totalLable = null,
                  this.arrLables = []
              },
              start: function (e) {
                this.options = e;
                var t = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.LEFT,
                    verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                    show: !1
                  });
                this.totalLable = M.entities.add({
                  label: t,
                  isDasMeasureLabel: !0,
                  _noMousePosition: !0,
                  attribute: {
                    unit: this.options.unit,
                    type: this.options.type
                  }
                }),
                  this.arrLables = [],
                  P.startDraw({
                    type: "polyline",
                    config: {
                      addHeight: e.addHeight
                    },
                    style: e.style || {
                      lineType: "glow",
                      color: "#ebe12c",
                      width: 9,
                      glowPower: .1,
                      clampToGround: "section" == this.options.type || this.options.terrain
                    }
                  })
              },
              showAddPointLength: function (e) {
                var t = P.getPositions(e)
                  , i = (0,
                    c.style2Entity)(b, {
                      horizontalOrigin: r.default.HorizontalOrigin.LEFT,
                      verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                      show: !0
                    })
                  , a = M.entities.add({
                    position: t[t.length - 1],
                    label: i,
                    isDasMeasureLabel: !0,
                    _noMousePosition: !0,
                    attribute: {
                      unit: this.options.unit,
                      type: this.options.type
                    }
                  });
                if (1 == t.length)
                  a.label.text = "起点";
                else {
                  var n = this.getLength(t)
                    , o = w(n, this.options.unit);
                  a.label.text = o,
                    a.attribute.value = n,
                    this.getLength([t[t.length - 2], t[t.length - 1]]) < 5 && (a.show = !1)
                }
                this.arrLables.push(a)
              },
              showRemoveLastPointLength: function (e) {
                var t = this.arrLables.pop();
                M.entities.remove(t),
                  this.showMoveDrawing(e.entity),
                  this.totalLable.position = e.position
              },
              showMoveDrawing: function (e) {
                var t = P.getPositions(e);
                if (t.length < 2)
                  return void (this.totalLable.label.show = !1);
                var i = this.getLength(t)
                  , a = w(i, this.options.unit);
                this.totalLable.position = t[t.length - 1],
                  this.totalLable.label.text = "总长:" + a,
                  this.totalLable.label.show = !0,
                  this.totalLable.attribute.value = i,
                  this.totalLable.attribute.textEx = "总长:",
                  this.options.calback && this.options.calback(a, i)
              },
              showDrawEnd: function (e) {
                var t = P.getPositions(e)
                  , i = this.arrLables.length - t.length;
                if (i >= 0) {
                  for (var a = this.arrLables.length - 1; a >= t.length - 1; a--)
                    M.entities.remove(this.arrLables[a]);
                  this.arrLables.splice(t.length - 1, i + 1)
                }
                e._totalLable = this.totalLable,
                  e._arrLables = this.arrLables,
                  this.totalLable = null,
                  this.arrLables = [],
                  null != e.polyline && ("section" == this.options.type ? this.updateSectionForTerrain(e) : this.options.terrain && this.updateLengthForTerrain(e))
              },
              updateLengthForTerrain: function (e) {
                function t() {
                  if (++s >= a.length && r) {
                    var e = w(l, o);
                    return r.label.text = "总长:" + e,
                      r.attribute.value = l,
                      void (i.options.calback && i.options.calback(e, l))
                  }
                  var u = [a[s - 1], a[s]];
                  (0,
                    p.terrainPolyline)({
                      viewer: _,
                      positions: u,
                      calback: function (e, a) {
                        var r = i.getLength(e);
                        a && (r *= i.disTerrainScale);
                        var u = n[s];
                        if (u) {
                          var d = w(r, o);
                          u.label.text = d,
                            u.attribute.value = r
                        }
                        l += r,
                          t()
                      }
                    })
                }
                var i = this
                  , a = e.polyline.positions.getValue()
                  , n = e._arrLables
                  , r = e._totalLable
                  , o = r && r.unit
                  , s = 0
                  , l = 0;
                t()
              },
              updateSectionForTerrain: function (e) {
                function t() {
                  s++;
                  var e = [i[s - 1], i[s]];
                  (0,
                    p.terrainPolyline)({
                      viewer: _,
                      positions: e,
                      calback: function (p, v) {
                        l = v ? 1 == s ? l.concat(e) : l.concat([i[s]]) : l.concat(p);
                        for (var y = r.default.Cartographic.fromCartesian(i[s - 1]).height, _ = r.default.Cartographic.fromCartesian(i[s]).height, b = (_ - y) / p.length, C = 0; C < p.length; C++) {
                          0 != C && (u += r.default.Cartesian3.distance(p[C], p[C - 1])),
                            d.push(Number(u.toFixed(1)));
                          var x = (0,
                            m.formatPositon)(p[C]);
                          c.push(x.z),
                            f.push(x);
                          var P = Number((y + b * C).toFixed(1));
                          h.push(P)
                        }
                        if (s >= i.length - 1) {
                          if (n) {
                            var M = g.getLength(l)
                              , S = w(M, o);
                            n.label.text = "总长:" + S,
                              n.attribute.value = M
                          }
                          g.options.calback && g.options.calback({
                            distancestr: S,
                            distance: M,
                            arrLen: d,
                            arrLX: h,
                            arrHB: c,
                            arrPoint: f
                          })
                        } else {
                          var M = g.getLength(p)
                            , S = w(M, o)
                            , E = a[s];
                          E.label.text = S,
                            E.attribute.value = M,
                            t()
                        }
                      }
                    })
                }
                var i = e.polyline.positions.getValue();
                if (!(i.length < 2)) {
                  var a = e._arrLables
                    , n = e._totalLable
                    , o = n && n.unit
                    , s = 0
                    , l = []
                    , u = 0
                    , d = []
                    , c = []
                    , h = []
                    , f = []
                    , g = this;
                  t()
                }
              },
              getLength: function (e) {
                for (var t = 0, i = 0, a = e.length - 1; i < a; i++)
                  t += r.default.Cartesian3.distance(e[i], e[i + 1]);
                return t
              }
            }
            , E = {
              options: null,
              totalLable: null,
              clearLastNoEnd: function () {
                null != this.totalLable && M.entities.remove(this.totalLable),
                  this.totalLable = null
              },
              start: function (e) {
                this.options = e;
                var t = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.CENTER,
                    verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                    show: !1
                  });
                this.totalLable = M.entities.add({
                  label: t,
                  isDasMeasureLabel: !0,
                  _noMousePosition: !0,
                  attribute: {
                    unit: this.options.unit,
                    type: this.options.type
                  }
                }),
                  P.startDraw({
                    type: "polygon",
                    style: e.style || {
                      color: "#00fff2",
                      outline: !0,
                      outlineColor: "#fafa5a",
                      outlineWidth: 1,
                      opacity: .4,
                      clampToGround: !0
                    }
                  })
              },
              showAddPointLength: function (e) { },
              showRemoveLastPointLength: function (e) {
                P.getPositions(e.entity).length < 3 && (this.totalLable.label.show = !1)
              },
              showMoveDrawing: function (e) {
                var t = P.getPositions(e);
                if (t.length < 3)
                  return void (this.totalLable.label.show = !1);
                var i = f.toGeoJSON(e)
                  , a = s.area(i)
                  , n = y(a, this.options.unit)
                  , r = (0,
                    m.centerOfMass)(t);
                this.totalLable.position = r,
                  this.totalLable.label.text = "面积:" + n,
                  this.totalLable.label.show = !0,
                  this.totalLable.attribute.value = a,
                  this.totalLable.attribute.textEx = "面积:",
                  this.options.calback && this.options.calback(n, a)
              },
              showDrawEnd: function (e) {
                null != e.polygon && (e._totalLable = this.totalLable,
                  this.totalLable = null)
              }
            }
            , D = {
              options: null,
              totalLable: null,
              prevEntity: null,
              clearLastNoEnd: function () {
                null != this.totalLable && M.entities.remove(this.totalLable),
                  this.totalLable = null,
                  null != this.prevEntity && M.entities.remove(this.prevEntity),
                  this.prevEntity = null
              },
              start: function (e) {
                this.options = e;
                var t = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.CENTER,
                    verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                    show: !1
                  });
                this.totalLable = M.entities.add({
                  label: t,
                  isDasMeasureLabel: !0,
                  _noMousePosition: !0,
                  attribute: {
                    unit: this.options.unit,
                    type: this.options.type
                  }
                }),
                  P.startDraw({
                    type: "polygon",
                    style: e.style || {
                      color: "#00fff2",
                      outline: !0,
                      outlineColor: "#fafa5a",
                      outlineWidth: 1,
                      opacity: .4,
                      clampToGround: !0
                    }
                  })
              },
              showAddPointLength: function (e) { },
              showRemoveLastPointLength: function (e) { },
              showMoveDrawing: function (e) { },
              showDrawEnd: function (e) {
                if (null != e.polygon) {
                  var t = e.polygon.hierarchy.getValue()
                    , i = this.computeCutVolume(t)
                    , a = i.maxHeight
                    , n = i.totalCutVolume
                    , o = n.toFixed(2) + "立方米"
                    , s = (0,
                      m.centerOfMass)(t, a + 10);
                  this.totalLable.position = s,
                    this.totalLable.label.text = "挖方体积:" + o,
                    this.totalLable.label.show = !0,
                    this.totalLable.attribute.value = n,
                    this.totalLable.attribute.textEx = "挖方体积:",
                    this.options.calback && this.options.calback(areastr, n),
                    M.entities.remove(e),
                    e = M.entities.add({
                      polygon: {
                        hierarchy: {
                          positions: t
                        },
                        extrudedHeight: a,
                        closeTop: !1,
                        closeBottom: !1,
                        material: new r.default.Color.fromCssColorString("#00fff2").withAlpha(.5),
                        outline: !0,
                        outlineColor: new r.default.Color.fromCssColorString("#fafa5a").withAlpha(.4),
                        outlineWidth: 1
                      }
                    }),
                    e._totalLable = this.totalLable,
                    this.totalLable = null
                }
              },
              computeCutVolume: function (e) {
                for (var t = 15e3, i = 0; i < e.length; i++) {
                  var a = r.default.Cartographic.fromCartesian(e[i])
                    , n = _.scene.globe.getHeight(a);
                  t > n && (t = n)
                }
                var o = Math.PI / Math.pow(2, 11);
                o /= 64;
                for (var s, l, u, d, c, h, f, p, m, g, a, v, y = new r.default.PolygonGeometry.fromPositions({
                  positions: e,
                  vertexFormat: r.default.PerInstanceColorAppearance.FLAT_VERTEX_FORMAT,
                  granularity: o
                }), w = new r.default.PolygonGeometry.createGeometry(y), b = 0, C = 0, i = 0; i < w.indices.length; i += 3) {
                  s = w.indices[i],
                    l = w.indices[i + 1],
                    u = w.indices[i + 2],
                    g = new r.default.Cartesian3(w.attributes.position.values[3 * s], w.attributes.position.values[3 * s + 1], w.attributes.position.values[3 * s + 2]),
                    a = r.default.Cartographic.fromCartesian(g),
                    d = _.scene.globe.getHeight(a),
                    f = r.default.Cartesian3.fromRadians(a.longitude, a.latitude, 0),
                    C < d && (C = d),
                    g = new r.default.Cartesian3(w.attributes.position.values[3 * l], w.attributes.position.values[3 * l + 1], w.attributes.position.values[3 * l + 2]),
                    a = r.default.Cartographic.fromCartesian(g),
                    c = _.scene.globe.getHeight(a);
                  var p = r.default.Cartesian3.fromRadians(a.longitude, a.latitude, 0);
                  C < c && (C = c),
                    g = new r.default.Cartesian3(w.attributes.position.values[3 * u], w.attributes.position.values[3 * u + 1], w.attributes.position.values[3 * u + 2]),
                    a = r.default.Cartographic.fromCartesian(g),
                    h = _.scene.globe.getHeight(a),
                    m = r.default.Cartesian3.fromRadians(a.longitude, a.latitude, 0),
                    C < h && (C = h),
                    v = this.computeAreaOfTriangle(f, p, m),
                    b += v * (d - t + c - t + h - t) / 3
                }
                return {
                  maxHeight: C,
                  totalCutVolume: b
                }
              },
              computeAreaOfTriangle: function (e, t, i) {
                var a = r.default.Cartesian3.distance(e, t)
                  , n = r.default.Cartesian3.distance(t, i)
                  , o = r.default.Cartesian3.distance(i, e)
                  , s = (a + n + o) / 2;
                return Math.sqrt(s * (s - a) * (s - n) * (s - o))
              }
            }
            , T = {
              options: null,
              totalLable: null,
              clearLastNoEnd: function () {
                null != this.totalLable && M.entities.remove(this.totalLable),
                  this.totalLable = null
              },
              start: function (e) {
                this.options = e;
                var t = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.RIGHT,
                    verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                    show: !1
                  });
                this.totalLable = M.entities.add({
                  label: t,
                  isDasMeasureLabel: !0,
                  _noMousePosition: !0,
                  attribute: {
                    unit: this.options.unit,
                    type: this.options.type
                  }
                }),
                  P.startDraw({
                    type: "polyline",
                    config: {
                      maxPointNum: 2
                    },
                    style: e.style || {
                      lineType: "glow",
                      color: "#ebe12c",
                      width: 9,
                      glowPower: .1
                    }
                  })
              },
              showAddPointLength: function (e) { },
              showRemoveLastPointLength: function (e) {
                this.totalLable && (this.totalLable.label.show = !1)
              },
              showMoveDrawing: function (e) {
                var t = P.getPositions(e);
                if (t.length < 2)
                  return void (this.totalLable.label.show = !1);
                var i = r.default.Cartographic.fromCartesian(t[0])
                  , a = r.default.Cartographic.fromCartesian(t[1])
                  , n = Math.abs(a.height - i.height)
                  , o = w(n, this.options.unit);
                this.totalLable.position = r.default.Cartesian3.midpoint(t[0], t[1], new r.default.Cartesian3),
                  this.totalLable.label.text = "高度差:" + o,
                  this.totalLable.label.show = !0,
                  this.totalLable.attribute.value = n,
                  this.totalLable.attribute.textEx = "高度差:",
                  this.options.calback && this.options.calback(o, n)
              },
              showDrawEnd: function (e) {
                e._totalLable = this.totalLable,
                  this.totalLable = null
              }
            }
            , k = {
              options: null,
              totalLable: null,
              xLable: null,
              hLable: null,
              clearLastNoEnd: function () {
                null != this.totalLable && M.entities.remove(this.totalLable),
                  null != this.xLable && M.entities.remove(this.xLable),
                  null != this.hLable && M.entities.remove(this.hLable),
                  this.totalLable = null,
                  this.xLable = null,
                  this.hLable = null
              },
              start: function (e) {
                this.options = e;
                var t = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.RIGHT,
                    verticalOrigin: r.default.VerticalOrigin.CENTER,
                    show: !1
                  });
                this.totalLable = M.entities.add({
                  label: t,
                  isDasMeasureLabel: !0,
                  _noMousePosition: !0,
                  attribute: {
                    unit: this.options.unit,
                    type: this.options.type
                  }
                });
                var i = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.CENTER,
                    verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                    show: !1
                  });
                i.pixelOffset = new r.default.Cartesian2(0, 0),
                  this.xLable = M.entities.add({
                    label: i,
                    isDasMeasureLabel: !0,
                    _noMousePosition: !0,
                    attribute: {
                      unit: this.options.unit,
                      type: this.options.type
                    }
                  }),
                  this.hLable = M.entities.add({
                    label: i,
                    isDasMeasureLabel: !0,
                    _noMousePosition: !0,
                    attribute: {
                      unit: this.options.unit,
                      type: this.options.type
                    }
                  }),
                  P.startDraw({
                    type: "polyline",
                    config: {
                      maxPointNum: 2
                    },
                    style: e.style || {
                      lineType: "glow",
                      color: "#ebe12c",
                      width: 9,
                      glowPower: .1
                    }
                  })
              },
              showAddPointLength: function (e) {
                var t = P.getPositions(e);
                if (4 == t.length) {
                  var i = t[3].clone();
                  t.pop(),
                    t.pop(),
                    t.pop(),
                    t.push(i)
                }
                if (2 == t.length) {
                  var a = this.getZHeightPosition(t[0], t[1]);
                  this.getHDistance(t[0], t[1]) > 3 && (t.push(a),
                    t.push(t[0]))
                }
                this.showSuperHeight(t)
              },
              showRemoveLastPointLength: function (e) {
                var t = P.getPositions(e.entity);
                2 == t.length && (t.pop(),
                  t.pop(),
                  this.totalLable.label.show = !1,
                  this.hLable.label.show = !1,
                  this.xLable.label.show = !1)
              },
              showMoveDrawing: function (e) {
                var t = P.getPositions(e);
                if (4 == t.length) {
                  var i = t[3].clone();
                  t.pop(),
                    t.pop(),
                    t.pop(),
                    t.push(i)
                }
                if (2 == t.length) {
                  var a = this.getZHeightPosition(t[0], t[1]);
                  this.getHDistance(t[0], t[1]) > 3 && (t.push(a),
                    t.push(t[0]))
                }
                this.showSuperHeight(t)
              },
              showDrawEnd: function (e) {
                e._arrLables = [this.totalLable, this.hLable, this.xLable],
                  this.totalLable = null,
                  this.hLable = null,
                  this.xLable = null
              },
              showSuperHeight: function (e) {
                var t, i, a, n;
                if (4 == e.length) {
                  var o, s, l = r.default.Cartesian3.midpoint(e[0], e[1], new r.default.Cartesian3), u = r.default.Cartographic.fromCartesian(e[0]), d = r.default.Cartographic.fromCartesian(e[1]), c = r.default.Cartographic.fromCartesian(e[2]), h = d.height - c.height;
                  n = d.height - u.height,
                    a = r.default.Cartesian3.distance(e[0], e[1]),
                    n > -1 && n < 1 ? (s = e[1],
                      this.updateSuperHeightLabel(this.totalLable, s, "高度差:", n),
                      this.updateSuperHeightLabel(this.hLable, l, "", a)) : (h > -.1 && h < .1 ? (o = r.default.Cartesian3.midpoint(e[2], e[1], new r.default.Cartesian3),
                        s = r.default.Cartesian3.midpoint(e[2], e[3], new r.default.Cartesian3),
                        i = r.default.Cartesian3.distance(e[1], e[2]),
                        t = r.default.Cartesian3.distance(e[3], e[2])) : (s = r.default.Cartesian3.midpoint(e[2], e[1], new r.default.Cartesian3),
                          o = r.default.Cartesian3.midpoint(e[2], e[3], new r.default.Cartesian3),
                          i = r.default.Cartesian3.distance(e[3], e[2]),
                          t = r.default.Cartesian3.distance(e[1], e[2])),
                        this.updateSuperHeightLabel(this.totalLable, s, "高度差:", t),
                        this.updateSuperHeightLabel(this.xLable, o, "", i),
                        this.updateSuperHeightLabel(this.hLable, l, "", a))
                } else if (2 == e.length) {
                  t = r.default.Cartesian3.distance(e[1], e[0]);
                  var s = r.default.Cartesian3.midpoint(e[0], e[1], new r.default.Cartesian3);
                  xLable.label.show && (xLable.label.show = !1,
                    hLable.label.show = !1),
                    this.updateSuperHeightLabel(this.totalLable, s, "高度差:", t)
                }
                var f = w(t, this.options.unit);
                this.options.calback && this.options.calback(f, t)
              },
              updateSuperHeightLabel: function (e, t, i, a) {
                null != e && (e.position = t,
                  e.label.text = i + w(a, this.options.unit),
                  e.label.show = !0,
                  e.attribute.value = a,
                  e.attribute.textEx = i)
              },
              getZHeightPosition: function (e, t) {
                var i = r.default.Cartographic.fromCartesian(e)
                  , a = Number(r.default.Math.toDegrees(i.longitude))
                  , n = Number(r.default.Math.toDegrees(i.latitude))
                  , o = Number(i.height.toFixed(2))
                  , s = r.default.Cartographic.fromCartesian(t)
                  , l = Number(r.default.Math.toDegrees(s.longitude))
                  , u = Number(r.default.Math.toDegrees(s.latitude))
                  , d = Number(s.height.toFixed(2));
                return o > d ? r.default.Cartesian3.fromDegrees(l, u, o) : r.default.Cartesian3.fromDegrees(a, n, d)
              },
              getHDistance: function (e, t) {
                var i = this.getZHeightPosition(e, t)
                  , a = r.default.Cartographic.fromCartesian(t)
                  , n = r.default.Cartographic.fromCartesian(i)
                  , o = r.default.Cartesian3.distance(e, i);
                return Math.abs(Number(n.height) - Number(a.height)) < .01 && (o = r.default.Cartesian3.distance(t, i)),
                  o
              }
            }
            , A = {
              options: null,
              totalLable: null,
              exLine: null,
              clearLastNoEnd: function () {
                null != this.totalLable && M.entities.remove(this.totalLable),
                  this.totalLable = null,
                  null != this.exLine && M.entities.remove(this.exLine),
                  this.exLine = null
              },
              start: function (e) {
                this.options = e;
                var t = (0,
                  c.style2Entity)(b, {
                    horizontalOrigin: r.default.HorizontalOrigin.LEFT,
                    verticalOrigin: r.default.VerticalOrigin.BOTTOM,
                    show: !1
                  });
                this.totalLable = M.entities.add({
                  label: t,
                  isDasMeasureLabel: !0,
                  _noMousePosition: !0,
                  attribute: {
                    unit: this.options.unit,
                    type: this.options.type
                  }
                }),
                  P.startDraw({
                    type: "polyline",
                    config: {
                      maxPointNum: 2
                    },
                    style: e.style || {
                      lineType: "arrow",
                      color: "#ebe967",
                      width: 9,
                      clampToGround: !0
                    }
                  })
              },
              showAddPointLength: function (e) { },
              showRemoveLastPointLength: function (e) {
                this.exLine && (this.exLine.polyline.show = !1),
                  this.totalLable && (this.totalLable.label.show = !1)
              },
              showMoveDrawing: function (e) {
                var t = P.getPositions(e);
                if (t.length < 2)
                  return void (this.totalLable.label.show = !1);
                var i = r.default.Cartesian3.distance(t[0], t[1])
                  , a = (0,
                    m.formatPositon)(t[0])
                  , n = (0,
                    m.formatPositon)(t[1])
                  , o = s.point([a.x, a.y, a.z])
                  , l = s.point([n.x, n.y, n.z])
                  , u = Math.round(s.rhumbBearing(o, l))
                  , d = s.destination(o, i / 3e3, 0, {
                    units: "kilometers"
                  });
                d = {
                  x: d.geometry.coordinates[0],
                  y: d.geometry.coordinates[1],
                  z: a.z
                };
                var c = r.default.Cartesian3.fromDegrees(d.x, d.y, d.z);
                this.updateExLine([t[0], c]),
                  this.totalLable.position = t[1],
                  this.totalLable.label.text = "角度:" + u + "°\n距离:" + w(i),
                  this.totalLable.label.show = !0,
                  this.totalLable.attribute.value = u,
                  this.totalLable.attribute.textEx = "角度:",
                  this.options.calback && this.options.calback(u + "°", u)
              },
              updateExLine: function (e) {
                this.exLine ? (this.exLine.polyline.show = !0,
                  this.exLine.polyline.positions.setValue(e)) : this.exLine = M.entities.add({
                    polyline: {
                      positions: e,
                      width: 3,
                      clampToGround: !0,
                      material: new r.default.PolylineDashMaterialProperty({
                        color: r.default.Color.RED
                      })
                    }
                  })
              },
              showDrawEnd: function (e) {
                e._totalLable = this.totalLable,
                  this.totalLable = null,
                  this.exLine = null
              }
            };
          return {
            measuerLength: t,
            measureHeight: o,
            measureArea: a,
            measureAngle: u,
            measureVolume: n,
            measureSection: i,
            updateUnit: v,
            clearMeasure: g,
            formatArea: y,
            formatLength: w
          }
        };
      t.Measure = g
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.DivPoint = void 0;
      var r = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , o = i(0)
        , s = a(o)
        , l = i(5)
        , u = a(l);
      t.DivPoint = function () {
        function e(t, i) {
          n(this, e),
            this.viewer = t,
            this.position = i.position,
            this.anchor = i.anchor,
            this._visible = !0,
            this.$view = (0,
              u.default)(i.html),
            this.$view.css({
              position: "absolute",
              left: "0",
              top: "0"
            }),
            this.$view.appendTo("#" + t._container.id);
          var a = this;
          (i.click || i.popup) && this.$view.click(function (e) {
            i.popup && t.das.popup.show(i, a.position),
              i.click && i.click(i, a, e)
          }),
            i.tooltip && this.$view.hover(function () {
              t.das.tooltip.show(i, a.position)
            }, function () {
              t.das.tooltip.close()
            }),
            this.$view.on("mousewheel", function (e) { }),
            t.scene.postRender.addEventListener(this.updateViewPoint, this)
        }
        return r(e, [{
          key: "updateViewPoint",
          value: function () {
            if (this._visible) {
              var e = this.viewer.scene
                , t = s.default.SceneTransforms.wgs84ToWindowCoordinates(e, this.position);
              if (null != t) {
                if (e.mode === s.default.SceneMode.SCENE3D) {
                  var i = e.camera.getPickRay(t)
                    , a = e.globe.pick(i, e);
                  if (a) {
                    if (s.default.Cartesian3.distance(this.position, a) > 1e6)
                      return !1
                  }
                }
                var n = t.x
                  , r = t.y - this.$view.height();
                this.anchor ? (n += this.anchor[0],
                  r += this.anchor[1]) : n -= this.$view.width() / 2,
                  this.$view.css("transform", "translate3d(" + n + "px," + r + "px, 0)")
              }
            }
          }
        }, {
          key: "setVisible",
          value: function (e) {
            this._visible = e,
              e ? this.$view.show() : this.$view.hide()
          }
        }, {
          key: "destroy",
          value: function () {
            this.viewer.scene.postRender.removeEventListener(this.updateViewPoint, this),
              this.$view.remove(),
              this.$view = null,
              this.position = null,
              this.anchor = null,
              this.viewer = null
          }
        }, {
          key: "dom",
          get: function () {
            return this.$view
          }
        }, {
          key: "visible",
          get: function () {
            return this._visible
          },
          set: function (e) {
            this._visible = e,
              this.setVisible(e)
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e)
      }
        : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
        }
        , r = function () {
          function e(e, t) {
            for (var i = 0; i < t.length; i++) {
              var a = t[i];
              a.enumerable = a.enumerable || !1,
                a.configurable = !0,
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a)
            }
          }
          return function (t, i, a) {
            return i && e(t.prototype, i),
              a && e(t, a),
              t
          }
        }()
        , o = new Cesium.Matrix4
        , s = new Cesium.Matrix3
        , l = new Cesium.Cartesian3
        , u = new Cesium.Quaternion
        , d = {
          model: {
            show: !1,
            scale: 1,
            minimumPixelSize: 50
          },
          label: {
            show: !1,
            color: "#ffffff",
            opacity: 1,
            font_family: "楷体",
            font_size: 20,
            border: !0,
            border_color: "#000000",
            border_width: 3,
            background: !1,
            hasPixelOffset: !0,
            pixelOffsetX: 30,
            pixelOffsetY: -30,
            scaleByDistance: !0,
            scaleByDistance_far: 1e7,
            scaleByDistance_farValue: .4,
            scaleByDistance_near: 1e5,
            scaleByDistance_nearValue: 1
          },
          path: {
            show: !1,
            lineType: "solid",
            color: "#3388ff",
            opacity: .5,
            width: 1,
            outline: !1,
            outlineColor: "#ffffff",
            outlineWidth: 2
          },
          shadow: {
            show: !1,
            color: "#00ff00",
            outline: !1,
            opacity: .3
          },
          camera: {
            type: "gs",
            followedX: 50,
            followedZ: 10
          },
          showGroundHeight: !1
        };
      t.FlyLine = function () {
        function e(t, i) {
          a(this, e),
            this.viewer = t,
            this.id = i.id || 0,
            this.name = i.name || "",
            this.points = i.points;
          for (var r in d) {
            var o = d[r];
            if (i.hasOwnProperty(r) && "object" === n(i[r]))
              for (var s in o)
                i[r].hasOwnProperty(s) || (i[r][s] = o[s]);
            else
              i[r] = o
          }
          this.options = i,
            this._isStart = !1,
            this._createLine(),
            this._createEntity()
        }
        return r(e, [{
          key: "_createLine",
          value: function () {
            var e, t = new Cesium.SampledPositionProperty, i = Cesium.JulianDate.fromDate(new Date), a = this.points;
            if (a.length < 2)
              return void console.log("路线无坐标数据，无法漫游！");
            var n = this.options.speed
              , r = !haoutil.isutil.isNumber(n);
            if (2 == a.length) {
              var o = this.getPointForLineAlong(a[0], a[1], 0, .5);
              a.splice(1, 0, o),
                n && r && n.splice(1, 0, n[0])
            }
            for (var s, l = 0, u = 0, d = [], c = 0, h = a.length; c < h; c++) {
              var f = a[c]
                , p = Cesium.Cartesian3.fromDegrees(f[0], f[1], f[2] || 0);
              if (p.lonlat = f,
                0 == c) {
                var m = Cesium.JulianDate.addSeconds(i, l, new Cesium.JulianDate);
                p.time = m,
                  p.second = l,
                  t.addSample(m, p),
                  s = p
              } else {
                var g = r ? n ? n[c - 1] : 100 : n || 100
                  , v = Cesium.Cartesian3.distance(p, s);
                l += Math.round(v / g * 3.6),
                  u += v;
                var m = Cesium.JulianDate.addSeconds(i, l, new Cesium.JulianDate);
                p.time = m,
                  p.second = l,
                  t.addSample(m, p)
              }
              d.push(p)
            }
            this.arrLinePoint = d,
              e = Cesium.JulianDate.addSeconds(i, l, new Cesium.JulianDate),
              this.alllen = u,
              this.alltimes = l,
              this.startTime = i,
              this.stopTime = e,
              this.property = t,
              this.property.setInterpolationOptions({
                interpolationDegree: 2,
                interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
              })
          }
        }, {
          key: "_createEntity",
          value: function () {
            this.options.label.text = this.name;
            var e = das3d.draw.attr.model.style2Entity(this.options.model)
              , t = das3d.draw.attr.label.style2Entity(this.options.label)
              , i = das3d.draw.attr.polyline.style2Entity(this.options.path, {});
            i.leadTime = 0,
              i.trailTime = this.alltimes;
            var a = new Cesium.VelocityOrientationProperty(this.property);
            this.velocityOrientation = a,
              this.entity = this.viewer.entities.add({
                id: this.id,
                availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                  start: this.startTime,
                  stop: this.stopTime
                })]),
                position: this.property,
                orientation: a,
                model: e,
                label: t,
                path: i,
                point: {
                  show: !e.show,
                  color: new Cesium.Color.fromCssColorString("#ffffff").withAlpha(.01),
                  pixelSize: 1
                }
              })
          }
        }, {
          key: "updateStyle",
          value: function (e) {
            for (var t in e)
              if ("object" === n(e[t]) && this.options[t])
                for (var i in e[t])
                  this.options[t][i] = e[t][i];
              else
                this.options[t] = e[t]
          }
        }, {
          key: "updateAngle",
          value: function (e, t) {
            if (e)
              this.entity.orientation = this.velocityOrientation;
            else {
              t = t || {};
              var i = Cesium.Property.getValueOrUndefined(this.property, this.viewer.clock.currentTime, l)
                , a = Cesium.Property.getValueOrUndefined(this.velocityOrientation, this.viewer.clock.currentTime, u)
                , n = das3d.matrix.getHeadingPitchRollByOrientation(i, a)
                , r = n.heading
                , o = Cesium.Math.toRadians(Number(t.pitch || 0))
                , s = Cesium.Math.toRadians(Number(t.roll || 0));
              this.entity.orientation = Cesium.Transforms.headingPitchRollQuaternion(i, new Cesium.HeadingPitchRoll(r, o, s))
            }
          }
        }, {
          key: "start",
          value: function () {
            this._isStart && this.stop(),
              this._isStart = !0,
              this.viewer.clock.startTime = this.startTime.clone(),
              this.viewer.clock.stopTime = this.stopTime.clone(),
              this.viewer.clock.currentTime = this.startTime.clone(),
              this.viewer.clock.multiplier = 1,
              this.viewer.clock.shouldAnimate = !0,
              this.options.clockRange ? this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP : this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED,
              this.viewer.flyTo(this.entity),
              this.viewer.trackedEntity = this.entity,
              this.options.shadow.show && ("wall" == this.options.shadow.type ? this.addWallShading() : "cylinder" == this.options.shadow.type && this.addCylinderShading()),
              this.viewer.scene.preRender.addEventListener(this.preRender_eventHandler, this)
          }
        }, {
          key: "preRender_eventHandler",
          value: function (e) {
            if (this._isStart && null != this.entity) {
              switch (this.options.camera.type) {
                default:
                  void 0 != this.viewer.trackedEntity && (this.viewer.trackedEntity = void 0);
                  break;
                case "gs":
                  this.viewer.trackedEntity != this.entity && (this.viewer.trackedEntity = this.entity);
                  break;
                case "dy":
                  this.viewer.trackedEntity != this.entity && (this.viewer.trackedEntity = this.entity),
                    this.getModelMatrix(this.viewer.trackedEntity, this.viewer.clock.currentTime, o);
                  var t = this.options.camera.followedX
                    , i = this.options.camera.followedZ;
                  this.viewer.scene.camera.lookAtTransform(o, new Cesium.Cartesian3(-t, 0, i));
                  break;
                case "sd":
                  this.viewer.trackedEntity != this.entity && (this.viewer.trackedEntity = this.entity),
                    this.getModelMatrix(this.viewer.trackedEntity, this.viewer.clock.currentTime, o);
                  var i = this.options.camera.followedZ;
                  this.viewer.scene.camera.lookAtTransform(o, new Cesium.Cartesian3(-1, 0, i))
              }
              var a = Cesium.Property.getValueOrUndefined(this.entity.position, this.viewer.clock.currentTime, l);
              a && this.realTime(a)
            }
          }
        }, {
          key: "realTime",
          value: function (e) {
            var t = Cesium.JulianDate.secondsDifference(this.viewer.clock.currentTime, this.viewer.clock.startTime)
              , i = das3d.point.formatPositon(e)
              , a = this.getFlyOkPoints(e);
            this.timeinfo = {
              time: t,
              len: a.len,
              x: i.x,
              y: i.y,
              z: i.z
            },
              this.options.shadow.show && "wall" == this.options.shadow.type && this.updateWallShading(a.positions);
            var n = Cesium.Cartographic.fromCartesian(e)
              , r = this.viewer.scene.globe.getHeight(n);
            if (null != r && r > 0 && (this.timeinfo.hbgd = r,
              this.timeinfo.ldgd = i.z - r),
              this.options.showGroundHeight) {
              var o = this;
              das3d.util.terrainPolyline({
                viewer: o.viewer,
                positions: [e, e],
                calback: function (e, t) {
                  if (null != e && 0 != e.length && !t) {
                    var a = das3d.point.formatPositon(e[0]).z
                      , n = i.z - a;
                    if (this.timeinfo.hbgd = a,
                      this.timeinfo.ldgd = n,
                      this.entity.label) {
                      var r = haoutil.str.formatLength(this.timeinfo.z)
                        , o = haoutil.str.formatLength(this.timeinfo.ldgd);
                      this.entity.label.text = this.name + "\n漫游高程：" + r + "\n离地距离：" + o
                    }
                  }
                }
              })
            }
          }
        }, {
          key: "getFlyOkPoints",
          value: function (e) {
            for (var t = [], i = 0, a = this.viewer.clock.currentTime, n = this.arrLinePoint, r = 0, o = n.length; r < o; r++) {
              var s = n[r];
              if (Cesium.JulianDate.compare(a, s.time) < 0) {
                var l = Cesium.Cartesian3.distance(e, 0 == r ? s : n[r - 1]);
                i += l;
                break
              }
              if (r > 0) {
                var l = Cesium.Cartesian3.distance(s, n[r - 1]);
                i += l
              }
              t.push(s)
            }
            return t.push(e),
            {
              positions: t,
              len: i
            }
          }
        }, {
          key: "getModelMatrix",
          value: function (e, t, i) {
            if (null == e)
              return i;
            var a = Cesium.Property.getValueOrUndefined(e.position, t, l);
            if (Cesium.defined(a)) {
              var n = Cesium.Property.getValueOrUndefined(e.orientation, t, u);
              return i = Cesium.defined(n) ? Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(n, s), a, i) : Cesium.Transforms.eastNorthUpToFixedFrame(a, void 0, i)
            }
          }
        }, {
          key: "addWallShading",
          value: function () {
            this._wall_positions = [],
              this._wall_minimumHeights = [],
              this._wall_maximumHeights = [];
            var e = this
              , t = das3d.draw.attr.wall.style2Entity(this.options.shadow);
            t.minimumHeights = new Cesium.CallbackProperty(function (t) {
              return e._wall_minimumHeights
            }
              , !1),
              t.maximumHeights = new Cesium.CallbackProperty(function (t) {
                return e._wall_maximumHeights
              }
                , !1),
              t.positions = new Cesium.CallbackProperty(function (t) {
                var i = Cesium.Property.getValueOrUndefined(e.entity.position, e.viewer.clock.currentTime, l);
                return e._wall_positions[e._wall_positions.length - 1] = i,
                  e._wall_positions
              }
                , !1),
              this.wallEntity = this.viewer.entities.add({
                wall: t
              })
          }
        }, {
          key: "updateWallShading",
          value: function (e) {
            for (var t = [], i = [], a = [], n = 0; n < e.length; n++) {
              t.push(e[n].clone());
              var r = Cesium.Cartographic.fromCartesian(e[n]);
              i.push(0),
                a.push(r.height)
            }
            this._wall_positions = t,
              this._wall_minimumHeights = i,
              this._wall_maximumHeights = a
          }
        }, {
          key: "addCylinderShading",
          value: function () {
            var e = 100
              , t = 100
              , i = this.property
              , a = das3d.draw.attr.wall.style2Entity(this.options.shadow);
            a.length = new Cesium.CallbackProperty(function (e) {
              return t
            }
              , !1),
              a.topRadius = 0,
              a.bottomRadius = new Cesium.CallbackProperty(function (t) {
                return e
              }
                , !1),
              a.numberOfVerticalLines = 0,
              this.cylinderEntity = viewer.entities.add({
                position: new Cesium.CallbackProperty(function (a) {
                  var n = Cesium.Property.getValueOrUndefined(i, a, new Cesium.Cartesian3)
                    , r = Cesium.Cartographic.fromCartesian(n)
                    , o = Cesium.Cartesian3.fromRadians(r.longitude, r.latitude, r.height / 2);
                  return t = r.height,
                    e = .3 * t,
                    o
                }
                  , !1),
                cylinder: a
              })
          }
        }, {
          key: "getTerrainHeight",
          value: function (e) {
            function t() {
              u++;
              var d = [a[u - 1], a[u]];
              das3d.util.terrainPolyline({
                viewer: i.viewer,
                positions: d,
                calback: function (i, d) {
                  for (var c = a[u - 1].lonlat[2], h = a[u].lonlat[2], f = (h - c) / i.length, p = 0; p < i.length; p++) {
                    0 != p && (n += Cesium.Cartesian3.distance(i[p], i[p - 1])),
                      r.push(Number(n.toFixed(1)));
                    var m = das3d.point.formatPositon(i[p]);
                    l.push(m);
                    var g = d ? 0 : m.z;
                    o.push(g);
                    var v = Number((c + f * p).toFixed(1));
                    s.push(v)
                  }
                  u >= a.length - 1 ? e({
                    arrLength: r,
                    arrFxgd: s,
                    arrHbgd: o,
                    arrPoint: l
                  }) : t()
                }
              })
            }
            var i = this
              , a = this.arrLinePoint
              , n = 0
              , r = []
              , o = []
              , s = []
              , l = []
              , u = 0;
            t()
          }
        }, {
          key: "toGeoJSON",
          value: function () {
            return this.options
          }
        }, {
          key: "toCZML",
          value: function () {
            for (var e = (this.options,
              this.startTime.toString()), t = this.stopTime.toString(), i = [], a = this.arrLinePoint, n = 0, r = a.length; n < r; n++) {
              var o = a[n];
              i.push(o.second),
                i = i.concat(o.lonlat)
            }
            var s = {
              id: this.name,
              description: this.options.remark,
              availability: e + "/" + t,
              orientation: {
                velocityReference: "#position"
              },
              position: {
                epoch: e,
                cartographicDegrees: i,
                interpolationAlgorithm: "LAGRANGE",
                interpolationDegree: 2
              }
            };
            return this.options.label.show && (s.label = {
              show: !0,
              outlineWidth: 2,
              text: this.name,
              font: "12pt 微软雅黑 Console",
              outlineColor: {
                rgba: [0, 0, 0, 255]
              },
              horizontalOrigin: "LEFT",
              fillColor: {
                rgba: [213, 255, 0, 255]
              }
            }),
              this.options.path.show && (s.path = {
                show: !0,
                material: {
                  solidColor: {
                    color: {
                      rgba: [255, 0, 0, 255]
                    }
                  }
                },
                width: 5,
                resolution: 1,
                leadTime: 0,
                trailTime: this.alltimes
              }),
              this.options.model.show && (s.model = this.options.model),
              [{
                version: "1.0",
                id: "document",
                clock: {
                  interval: e + "/" + t,
                  currentTime: e,
                  multiplier: 1
                }
              }, s]
          }
        }, {
          key: "stop",
          value: function () {
            this.viewer.trackedEntity = void 0,
              this.viewer.scene.preRender.removeEventListener(this.preRender_eventHandler, this),
              this._isStart = !1
          }
        }, {
          key: "destroy",
          value: function () {
            this.stop(),
              this.entity && (this.viewer.entities.remove(this.entity),
                delete this.entity),
              this.wallEntity && (this.viewer.entities.remove(this.wallEntity),
                delete this.wallEntity),
              this.cylinderEntity && (this.viewer.entities.remove(this.cylinderEntity),
                delete this.cylinderEntity)
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.TilesEditor = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r);
      t.TilesEditor = function () {
        function e(t, i) {
          a(this, e),
            this.viewer = t,
            this.scene = this.viewer.scene,
            this.options = i,
            this.position = i.position,
            this.heading = i.heading || 0,
            this.range = i.range || 100,
            this.dragging = !1,
            this.rotating = !1,
            this.enable = !1,
            this.billboards = this.viewer.scene.primitives.add(new o.default.BillboardCollection),
            this.handler = new o.default.ScreenSpaceEventHandler(this.viewer.canvas),
            this.movep = this.billboards.add({
              position: this.position,
              color: new o.default.Color.fromCssColorString("#FFFF00"),
              image: i.moveImg,
              show: !1,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }),
            this.rotatep = this.billboards.add({
              position: this.position ? this.rotationPos() : null,
              color: new o.default.Color.fromCssColorString("#FFFF00"),
              image: i.rotateImg,
              show: !1,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            })
        }
        return n(e, [{
          key: "update",
          value: function (e) {
            for (var t in e)
              this[t] = e[t];
            this.movep.position = this.position,
              this.rotatep.position = this.rotationPos()
          }
        }, {
          key: "modelMatrix",
          value: function () {
            var e = o.default.Transforms.eastNorthUpToFixedFrame(this.position)
              , t = o.default.Matrix4.fromRotationTranslation(o.default.Matrix3.fromRotationZ(this.heading));
            if (o.default.Matrix4.multiply(e, t, e),
              this.scale > 0 && 1 != this.scale && o.default.Matrix4.multiplyByUniformScale(e, this.scale, e),
              this.axis && "" != this.axis) {
              var i;
              switch (this.axis.toUpperCase()) {
                case "Y_UP_TO_Z_UP":
                  i = o.default.Axis.Y_UP_TO_Z_UP;
                  break;
                case "Z_UP_TO_Y_UP":
                  i = o.default.Axis.Z_UP_TO_Y_UP;
                  break;
                case "X_UP_TO_Z_UP":
                  i = o.default.Axis.X_UP_TO_Z_UP;
                  break;
                case "Z_UP_TO_X_UP":
                  i = o.default.Axis.Z_UP_TO_X_UP;
                  break;
                case "X_UP_TO_Y_UP":
                  i = o.default.Axis.X_UP_TO_Y_UP;
                  break;
                case "Y_UP_TO_X_UP":
                  i = o.default.Axis.Y_UP_TO_X_UP
              }
              i && (e = o.default.Matrix4.multiplyTransformation(e, i, e))
            }
            return e
          }
        }, {
          key: "rotationPos",
          value: function () {
            var e = new o.default.Cartesian3(this.range, 0, 0)
              , t = o.default.Matrix4.getRotation(this.modelMatrix(), new o.default.Matrix3);
            return e = o.default.Matrix3.multiplyByVector(t, e, e),
              e = o.default.Cartesian3.add(this.position, e, e)
          }
        }, {
          key: "pickTerrain",
          value: function (e) {
            var t = this.viewer.camera.getPickRay(e);
            return this.viewer.scene.globe.pick(t, this.viewer.scene)
          }
        }, {
          key: "setEnable",
          value: function (e) {
            if (e) {
              var t = this;
              this.handler.setInputAction(function (e) {
                t.handler_onLeafDown(e)
              }, o.default.ScreenSpaceEventType.LEFT_DOWN),
                this.handler.setInputAction(function (e) {
                  t.handler_onMouseMove(e)
                }, o.default.ScreenSpaceEventType.MOUSE_MOVE),
                this.handler.setInputAction(function (e) {
                  t.handler_onLeftUp(e)
                }, o.default.ScreenSpaceEventType.LEFT_UP),
                this.rotatep.show = !0,
                this.movep.show = !0
            } else
              this.handler.removeInputAction(o.default.ScreenSpaceEventType.LEFT_DOWN),
                this.handler.removeInputAction(o.default.ScreenSpaceEventType.MOUSE_MOVE),
                this.handler.removeInputAction(o.default.ScreenSpaceEventType.LEFT_UP),
                this.rotatep.show = !1,
                this.movep.show = !1;
            this._enable = !1
          }
        }, {
          key: "handler_onLeafDown",
          value: function (e) {
            for (var t = this.scene.drillPick(e.position, 2), i = 0; i < t.length; i++) {
              var a = t[i];
              if (o.default.defined(a) && a.primitive === this.movep) {
                this.dragging = !0,
                  this.scene.screenSpaceCameraController.enableRotate = !1;
                break
              }
              if (o.default.defined(a) && a.primitive === this.rotatep) {
                this.rotating = !0,
                  this.scene.screenSpaceCameraController.enableRotate = !1;
                break
              }
            }
          }
        }, {
          key: "handler_onMouseMove",
          value: function (e) {
            var t = this.pickTerrain(e.endPosition);
            if (t)
              if (this.dragging)
                this.position = t,
                  this.movep.position = this.position,
                  this.rotatep.position = this.rotationPos(),
                  this.options.onPosition && this.options.onPosition(this.position);
              else if (this.rotating) {
                this.rotatep.position = t,
                  this.range = o.default.Cartesian3.distance(this.position, t);
                var i = o.default.Transforms.eastNorthUpToFixedFrame(this.position);
                i = o.default.Matrix4.getRotation(i, new o.default.Matrix3);
                var a = o.default.Matrix3.getColumn(i, 0, new o.default.Cartesian3)
                  , n = o.default.Matrix3.getColumn(i, 1, new o.default.Cartesian3)
                  , r = o.default.Matrix3.getColumn(i, 2, new o.default.Cartesian3)
                  , s = o.default.Cartesian3.subtract(t, this.position, new o.default.Cartesian3);
                s = o.default.Cartesian3.cross(s, r, s),
                  s = o.default.Cartesian3.cross(r, s, s),
                  s = o.default.Cartesian3.normalize(s, s),
                  this.heading = o.default.Cartesian3.angleBetween(a, s);
                var l = o.default.Cartesian3.angleBetween(n, s);
                l > .5 * Math.PI && (this.heading = 2 * Math.PI - this.heading),
                  this.options.onHeading && this.options.onHeading(this.heading)
              }
          }
        }, {
          key: "handler_onLeftUp",
          value: function (e) {
            (this.dragging || this.rotating) && (this.rotating = this.dragging = !1,
              this.scene.screenSpaceCameraController.enableRotate = !0,
              this.billboards._createVertexArray = !0)
          }
        }, {
          key: "remove",
          value: function () {
            this.billboards && (this.scene.primitives.remove(this.billboards),
              this.billboards = void 0),
              this.enable = !1
          }
        }, {
          key: "destroy",
          value: function () {
            this.remove(),
              this.handler.destroy(),
              this.handler = null,
              this.viewer = null
          }
        }]),
          e
      }()
    }
    , function (e, t) {
      e.exports = "uniform sampler2D colorTexture;\r\nvarying vec2 v_textureCoordinates;\r\n\r\nfloat hash(float x){\r\n    return fract(sin(x*133.3)*13.13);\r\n}\r\n\r\nvoid main(void){ \r\n    float time = czm_frameNumber / 240.0;\r\n    vec2 resolution = czm_viewport.zw;\r\n\r\n    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\r\n    vec3 c=vec3(.6,.7,.8);\r\n\r\n    float a=-.4;\r\n    float si=sin(a),co=cos(a);\r\n    uv*=mat2(co,-si,si,co);\r\n    uv*=length(uv+vec2(0,4.9))*.3+1.;\r\n\r\n    float v=1.-sin(hash(floor(uv.x*100.))*2.);\r\n    float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\r\n    c*=v*b; \r\n\r\n    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5);  \r\n}\r\n                        "
    }
    , function (e, t) {
      e.exports = "uniform sampler2D colorTexture;\r\nvarying vec2 v_textureCoordinates;\r\n\r\nfloat snow(vec2 uv,float scale){\r\n    float time = czm_frameNumber / 60.0;\r\n    float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\r\n    uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\r\n    uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\r\n    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\r\n    k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\r\n    return k*w;\r\n}\r\n\r\nvoid main(void){\r\n    vec2 resolution = czm_viewport.zw;\r\n    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\r\n    vec3 finalColor=vec3(0);\r\n    float c = 0.0;\r\n    // c+=snow(uv,30.)*.0;\r\n    // c+=snow(uv,20.)*.0;\r\n    // c+=snow(uv,15.)*.0;\r\n    c+=snow(uv,10.);\r\n    c+=snow(uv,8.);\r\n    c+=snow(uv,6.);\r\n    c+=snow(uv,5.);\r\n    finalColor=(vec3(c)); \r\n    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5); \r\n\r\n}"
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.CircleFadeMaterial = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = new o.default.Color(0, 0, 0, 0)
        , l = t.CircleFadeMaterial = function () {
          function e(t) {
            a(this, e),
              t = o.default.defaultValue(t, o.default.defaultValue.EMPTY_OBJECT),
              this._definitionChanged = new o.default.Event,
              this._color = void 0,
              this._colorSubscription = void 0,
              this.color = o.default.defaultValue(t.color, s),
              this._duration = t.duration || 1e3,
              this._time = void 0
          }
          return n(e, [{
            key: "getType",
            value: function (e) {
              return o.default.Material.CircleFadeMaterialType
            }
          }, {
            key: "getValue",
            value: function (e, t) {
              return o.default.defined(t) || (t = {}),
                t.color = o.default.Property.getValueOrClonedDefault(this._color, e, s, t.color),
                void 0 === this._time && (this._time = (new Date).getTime()),
                t.time = ((new Date).getTime() - this._time) / this._duration,
                t
            }
          }, {
            key: "equals",
            value: function (t) {
              return this === t || t instanceof e && o.default.Property.equals(this._color, t._color)
            }
          }, {
            key: "isConstant",
            get: function () {
              return !1
            }
          }, {
            key: "definitionChanged",
            get: function () {
              return this._definitionChanged
            }
          }]),
            e
        }();
      o.default.defineProperties(l.prototype, {
        color: o.default.createPropertyDescriptor("color")
      }),
        o.default.Material.CircleFadeMaterialType = "CircleFadeMaterial",
        o.default.Material._materialCache.addMaterial(o.default.Material.CircleFadeMaterialType, {
          fabric: {
            type: o.default.Material.CircleFadeMaterialType,
            uniforms: {
              color: new o.default.Color(1, 0, 0, 1),
              time: 1
            },
            source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n                {\n                    czm_material material = czm_getDefaultMaterial(materialInput);\n                    material.diffuse = 1.5 * color.rgb;\n                    vec2 st = materialInput.st;\n                    float dis = distance(st, vec2(0.5, 0.5));\n                    float per = fract(time);\n                    if(dis > per * 0.5){\n                        //material.alpha = 0.0;\n                        discard;\n                    }else {\n                            material.alpha = color.a  * dis / per / 2.0;\n                    }\n                    return material;\n                }"
          },
          translucent: function () {
            return !0
          }
        })
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      function n(e, t) {
        h++;
        var i = f + h + "Type"
          , a = f + h + "Image";
        return s.default.Material[i] = i,
          s.default.Material[a] = e,
          s.default.Material._materialCache.addMaterial(s.default.Material[i], {
            fabric: {
              type: s.default.Material.PolylineArrowLinkType,
              uniforms: {
                color: new s.default.Color(1, 0, 0, 1),
                image: s.default.Material[a],
                time: 0,
                repeat: t || new s.default.Cartesian2(1, 1)
              },
              source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n                        {\n                            czm_material material = czm_getDefaultMaterial(materialInput);\n                            vec2 mst = fract(materialInput.st + vec2(.0,.0));\n                            mst = vec2(mst.x,mst.y);\n                            vec2 st = fract(repeat * mst);\n                            vec4 colorImage = texture2D(image, st);\n                            if(color.a == 0.0)\n                            {\n                                material.alpha = colorImage.a;\n                                material.diffuse = colorImage.rgb; \n                            }\n                            else\n                            {\n                                material.alpha = colorImage.a * color.a;\n                                material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb); \n                            }\n                            return material;\n                        }"
            },
            translucent: function () {
              return !0
            }
          }),
        {
          type: s.default.Material[i],
          image: s.default.Material[a]
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.TextMaterial = void 0;
      var r = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , o = i(0)
        , s = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o)
        , l = new s.default.Color(0, 0, 0, 0)
        , u = {
          font: "50px 楷体",
          fill: !0,
          fillColor: new s.default.Color(1, 1, 0, 1),
          stroke: !0,
          strokeWidth: 2,
          strokeColor: new s.default.Color(1, 1, 1, .8),
          backgroundColor: new s.default.Color(1, 1, 1, .1),
          textBaseline: "top",
          padding: 40
        }
        , d = new s.default.Cartesian2(1, 1)
        , c = t.TextMaterial = function () {
          function e(t) {
            if (a(this, e),
              t = s.default.defaultValue(t, s.default.defaultValue.EMPTY_OBJECT),
              t.text) {
              this._text = t.text,
                this._textStyles = s.default.defaultValue(t.textStyles, u),
                this._definitionChanged = new s.default.Event,
                this._color = void 0,
                this._colorSubscription = void 0,
                this.color = s.default.defaultValue(t.color, l),
                this.repeat = s.default.defaultValue(t.repeat, d),
                this._img = this._text2Img(this._text, this._textStyles);
              var i = n(this._img.src, this.repeat);
              this._materialType = s.default.clone(i.type),
                this._materialImage = s.default.clone(i.image)
            }
          }
          return r(e, [{
            key: "getType",
            value: function (e) {
              return this._materialType
            }
          }, {
            key: "getValue",
            value: function (e, t) {
              return s.default.defined(t) || (t = {}),
                t.color = s.default.Property.getValueOrClonedDefault(this._color, e, l, t.color),
                t.image = this._materialImage,
                t.repeat = this.repeat,
                t
            }
          }, {
            key: "equals",
            value: function (t) {
              return this === t || t instanceof e && s.default.Property.equals(this._color, t._color)
            }
          }, {
            key: "_text2Img",
            value: function (e, t) {
              var i = s.default.writeTextToCanvas(e, t);
              if (i) {
                this.canvas = i;
                var a = new Image;
                return a.src = i.toDataURL("image/png"),
                  a
              }
            }
          }, {
            key: "isConstant",
            get: function () {
              return !1
            }
          }, {
            key: "definitionChanged",
            get: function () {
              return this._definitionChanged
            }
          }, {
            key: "text",
            get: function () {
              return this._text
            },
            set: function (e) {
              if (e) {
                this._text = e,
                  delete this._img,
                  this._img = this._text2Img(this._text, this._textStyles);
                var t = n(this._img.src, this.repeat);
                this._materialType = s.default.clone(t.type),
                  this._materialImage = s.default.clone(t.image)
              }
            }
          }, {
            key: "textStyles",
            get: function () {
              return this._textStyles
            },
            set: function (e) {
              if (e) {
                delete this._img,
                  this._textStyles = e,
                  this._img = this._text2Img(this._text, this._textStyles);
                var t = n(this._img.src, this.repeat);
                this._materialType = s.default.clone(t.type),
                  this._materialImage = s.default.clone(t.image)
              }
            }
          }]),
            e
        }();
      s.default.defineProperties(c.prototype, {
        color: s.default.createPropertyDescriptor("color")
      });
      var h = 0
        , f = "Text"
    }
    , function (e, t) {
      e.exports = "attribute vec4 position;\r\nattribute vec3 normal;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = czm_modelViewProjection * position;\r\n    v_position = vec3(position);\r\n    v_positionWC = (czm_model * position).xyz;\r\n    v_positionEC = (czm_modelView * position).xyz;\r\n    v_normalEC = czm_normal * normal;\r\n}"
    }
    , function (e, t) {
      e.exports = '#ifdef GL_OES_standard_derivatives\r\n    #extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\nuniform bool u_showIntersection;\r\nuniform bool u_showThroughEllipsoid;\r\n\r\nuniform float u_radius;\r\nuniform float u_xHalfAngle;\r\nuniform float u_yHalfAngle;\r\nuniform float u_normalDirection;\r\nuniform float u_type;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvec4 getColor(float sensorRadius, vec3 pointEC)\r\n{\r\n    czm_materialInput materialInput;\r\n\r\n    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\r\n    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\r\n    materialInput.str = pointMC / sensorRadius;\r\n\r\n    vec3 positionToEyeEC = -v_positionEC;\r\n    materialInput.positionToEyeEC = positionToEyeEC;\r\n\r\n    vec3 normalEC = normalize(v_normalEC);\r\n    materialInput.normalEC = u_normalDirection * normalEC;\r\n\r\n    czm_material material = czm_getMaterial(materialInput);\r\n\r\n    return mix(czm_phong(normalize(positionToEyeEC), material), vec4(material.diffuse, material.alpha), 0.4);\r\n\r\n}\r\n\r\nbool isOnBoundary(float value, float epsilon)\r\n{\r\n    float width = getIntersectionWidth();\r\n    float tolerance = width * epsilon;\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n    float delta = max(abs(dFdx(value)), abs(dFdy(value)));\r\n    float pixels = width * delta;\r\n    float temp = abs(value);\r\n    // There are a couple things going on here.\r\n    // First we test the value at the current fragment to see if it is within the tolerance.\r\n    // We also want to check if the value of an adjacent pixel is within the tolerance,\r\n    // but we don\'t want to admit points that are obviously not on the surface.\r\n    // For example, if we are looking for "value" to be close to 0, but value is 1 and the adjacent value is 2,\r\n    // then the delta would be 1 and "temp - delta" would be "1 - 1" which is zero even though neither of\r\n    // the points is close to zero.\r\n    return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);\r\n#else\r\n    return abs(value) < tolerance;\r\n#endif\r\n}\r\n\r\nvec4 shade(bool isOnBoundary)\r\n{\r\n    if (u_showIntersection && isOnBoundary)\r\n    {\r\n        return getIntersectionColor();\r\n    }\r\n    if(u_type == 1.0){\r\n        return getLineColor();\r\n    }\r\n    return getColor(u_radius, v_positionEC);\r\n}\r\n\r\nfloat ellipsoidSurfaceFunction(czm_ellipsoid ellipsoid, vec3 point)\r\n{\r\n    vec3 scaled = ellipsoid.inverseRadii * point;\r\n    return dot(scaled, scaled) - 1.0;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\r\n    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\r\n\r\n    //vec3 pixDir = normalize(v_position);\r\n    float positionX = v_position.x;\r\n    float positionY = v_position.y;\r\n    float positionZ = v_position.z;\r\n\r\n    vec3 zDir = vec3(0.0, 0.0, 1.0);\r\n    vec3 lineX = vec3(positionX, 0 ,positionZ);\r\n    vec3 lineY = vec3(0, positionY, positionZ);\r\n    float resX = dot(normalize(lineX), zDir);\r\n    if(resX < cos(u_xHalfAngle)-0.00001){\r\n        discard;\r\n    }\r\n    float resY = dot(normalize(lineY), zDir);\r\n    if(resY < cos(u_yHalfAngle)-0.00001){\r\n        discard;\r\n    }\r\n\r\n\r\n    czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\r\n    float ellipsoidValue = ellipsoidSurfaceFunction(ellipsoid, v_positionWC);\r\n\r\n    // Occluded by the ellipsoid?\r\n\tif (!u_showThroughEllipsoid)\r\n\t{\r\n\t    // Discard if in the ellipsoid\r\n\t    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\r\n\t    if (ellipsoidValue < 0.0)\r\n\t    {\r\n            discard;\r\n\t    }\r\n\r\n\t    // Discard if in the sensor\'s shadow\r\n\t    if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionWC))\r\n\t    {\r\n\t        discard;\r\n\t    }\r\n    }\r\n\r\n    // Notes: Each surface functions should have an associated tolerance based on the floating point error.\r\n    bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);\r\n    //isOnEllipsoid = false;\r\n    //if((resX >= 0.8 && resX <= 0.81)||(resY >= 0.8 && resY <= 0.81)){\r\n    /*if(false){\r\n        gl_FragColor = vec4(1.0,0.0,0.0,1.0);\r\n    }else{\r\n        gl_FragColor = shade(isOnEllipsoid);\r\n    }\r\n*/\r\n    gl_FragColor = shade(isOnEllipsoid);\r\n\r\n}'
    }
    , function (e, t) {
      e.exports = "uniform vec4 u_intersectionColor;\nuniform float u_intersectionWidth;\nuniform vec4 u_lineColor;\n\nbool inSensorShadow(vec3 coneVertexWC, czm_ellipsoid ellipsoidEC, vec3 pointWC)\n{\n    // Diagonal matrix from the unscaled ellipsoid space to the scaled space.    \n    vec3 D = ellipsoidEC.inverseRadii;\n\n    // Sensor vertex in the scaled ellipsoid space\n    vec3 q = D * coneVertexWC;\n    float qMagnitudeSquared = dot(q, q);\n    float test = qMagnitudeSquared - 1.0;\n    \n    // Sensor vertex to fragment vector in the ellipsoid's scaled space\n    vec3 temp = D * pointWC - q;\n    float d = dot(temp, q);\n    \n    // Behind silhouette plane and inside silhouette cone\n    return (d < -test) && (d / length(temp) < -sqrt(test));\n}\n\n///////////////////////////////////////////////////////////////////////////////\n\nvec4 getLineColor()\n{\n    return u_lineColor;\n}\n\nvec4 getIntersectionColor()\n{\n    return u_intersectionColor;\n}\n\nfloat getIntersectionWidth()\n{\n    return u_intersectionWidth;\n}\n\nvec2 sensor2dTextureCoordinates(float sensorRadius, vec3 pointMC)\n{\n    // (s, t) both in the range [0, 1]\n    float t = pointMC.z / sensorRadius;\n    float s = 1.0 + (atan(pointMC.y, pointMC.x) / czm_twoPi);\n    s = s - floor(s);\n    \n    return vec2(s, t);\n}\n"
    }
    , function (e, t) {
      e.exports = '#ifdef GL_OES_standard_derivatives\r\n    #extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\nuniform bool u_showIntersection;\r\nuniform bool u_showThroughEllipsoid;\r\n\r\nuniform float u_radius;\r\nuniform float u_xHalfAngle;\r\nuniform float u_yHalfAngle;\r\nuniform float u_normalDirection;\r\nuniform vec4 u_color;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvec4 getColor(float sensorRadius, vec3 pointEC)\r\n{\r\n    czm_materialInput materialInput;\r\n\r\n    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\r\n    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\r\n    materialInput.str = pointMC / sensorRadius;\r\n\r\n    vec3 positionToEyeEC = -v_positionEC;\r\n    materialInput.positionToEyeEC = positionToEyeEC;\r\n\r\n    vec3 normalEC = normalize(v_normalEC);\r\n    materialInput.normalEC = u_normalDirection * normalEC;\r\n\r\n    czm_material material = czm_getMaterial(materialInput);\r\n\r\n    material.diffuse = u_color.rgb;\r\n    material.alpha = u_color.a;\r\n\r\n    return mix(czm_phong(normalize(positionToEyeEC), material), vec4(material.diffuse, material.alpha), 0.4);\r\n\r\n}\r\n\r\nbool isOnBoundary(float value, float epsilon)\r\n{\r\n    float width = getIntersectionWidth();\r\n    float tolerance = width * epsilon;\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n    float delta = max(abs(dFdx(value)), abs(dFdy(value)));\r\n    float pixels = width * delta;\r\n    float temp = abs(value);\r\n    // There are a couple things going on here.\r\n    // First we test the value at the current fragment to see if it is within the tolerance.\r\n    // We also want to check if the value of an adjacent pixel is within the tolerance,\r\n    // but we don\'t want to admit points that are obviously not on the surface.\r\n    // For example, if we are looking for "value" to be close to 0, but value is 1 and the adjacent value is 2,\r\n    // then the delta would be 1 and "temp - delta" would be "1 - 1" which is zero even though neither of\r\n    // the points is close to zero.\r\n    return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);\r\n#else\r\n    return abs(value) < tolerance;\r\n#endif\r\n}\r\n\r\nvec4 shade(bool isOnBoundary)\r\n{\r\n    if (u_showIntersection && isOnBoundary)\r\n    {\r\n        return getIntersectionColor();\r\n    }\r\n    return getColor(u_radius, v_positionEC);\r\n}\r\n\r\nfloat ellipsoidSurfaceFunction(czm_ellipsoid ellipsoid, vec3 point)\r\n{\r\n    vec3 scaled = ellipsoid.inverseRadii * point;\r\n    return dot(scaled, scaled) - 1.0;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\r\n    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\r\n\r\n    //vec3 pixDir = normalize(v_position);\r\n    float positionX = v_position.x;\r\n    float positionY = v_position.y;\r\n    float positionZ = v_position.z;\r\n\r\n    vec3 zDir = vec3(0.0, 0.0, 1.0);\r\n    vec3 lineX = vec3(positionX, 0 ,positionZ);\r\n    vec3 lineY = vec3(0, positionY, positionZ);\r\n    float resX = dot(normalize(lineX), zDir);\r\n    if(resX < cos(u_xHalfAngle) - 0.0001){\r\n        discard;\r\n    }\r\n    float resY = dot(normalize(lineY), zDir);\r\n    if(resY < cos(u_yHalfAngle)- 0.0001){\r\n        discard;\r\n    }\r\n\r\n\r\n    czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\r\n    float ellipsoidValue = ellipsoidSurfaceFunction(ellipsoid, v_positionWC);\r\n\r\n    // Occluded by the ellipsoid?\r\n\tif (!u_showThroughEllipsoid)\r\n\t{\r\n\t    // Discard if in the ellipsoid\r\n\t    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\r\n\t    if (ellipsoidValue < 0.0)\r\n\t    {\r\n            discard;\r\n\t    }\r\n\r\n\t    // Discard if in the sensor\'s shadow\r\n\t    if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionWC))\r\n\t    {\r\n\t        discard;\r\n\t    }\r\n    }\r\n\r\n    // Notes: Each surface functions should have an associated tolerance based on the floating point error.\r\n    bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);\r\n    gl_FragColor = shade(isOnEllipsoid);\r\n\r\n}'
    }
    , function (e, t, i) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.RectangularSensorVisualizer = void 0;
      var a = i(0)
        , n = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a)
        , r = i(41)
        , o = i(109)
        , s = n.default.AssociativeArray
        , l = n.default.Cartesian3
        , u = n.default.Color
        , d = n.default.defined
        , c = n.default.destroyObject
        , h = n.default.DeveloperError
        , f = n.default.Matrix3
        , p = n.default.Matrix4
        , m = n.default.Quaternion
        , g = n.default.MaterialProperty
        , v = n.default.Property
        , y = new f
        , w = new l
        , _ = new l
        , b = new m
        , C = new l
        , x = new m
        , P = function e(t, i) {
          if (!d(t))
            throw new h("scene is required.");
          if (!d(i))
            throw new h("entityCollection is required.");
          i.collectionChanged.addEventListener(e.prototype._onCollectionChanged, this),
            this._scene = t,
            this._primitives = t.primitives,
            this._entityCollection = i,
            this._hash = {},
            this._entitiesToVisualize = new s,
            this._onCollectionChanged(i, i.values, [], [])
        };
      P.prototype.update = function (e) {
        if (!d(e))
          throw new h("time is required.");
        for (var t = this._entitiesToVisualize.values, i = this._hash, a = this._primitives, o = 0, s = t.length; o < s; o++) {
          var c, P, M, S, E, D = t[o], T = D._rectangularSensor, k = i[D.id], A = D.isShowing && D.isAvailable(e) && v.getValueOrDefault(T._show, e, !0);
          if (A && (c = v.getValueOrUndefined(D._position, e, w),
            P = v.getValueOrUndefined(D._orientation, e, b),
            M = v.getValueOrUndefined(T._radius, e),
            S = v.getValueOrUndefined(T._xHalfAngle, e),
            E = v.getValueOrUndefined(T._yHalfAngle, e),
            A = d(c) && d(S) && d(E)),
            A) {
            var O = d(k) ? k.primitive : void 0;
            d(O) || (O = new r.RectangularSensorPrimitive,
              O.id = D,
              a.add(O),
              k = {
                primitive: O,
                position: void 0,
                orientation: void 0
              },
              i[D.id] = k);
            var L = v.getValueOrUndefined(T._gaze, e);
            if (d(L)) {
              var R = v.getValueOrUndefined(L._position, e, _);
              if (!d(c) || !d(R))
                continue;
              var F = l.subtract(c, R, C)
                , I = l.angleBetween(n.default.Cartesian3.UNIT_Z, F)
                , N = l.cross(n.default.Cartesian3.UNIT_Z, F, C)
                , P = m.fromAxisAngle(N, I - Math.PI, x);
              M = l.distance(c, R),
                O.modelMatrix = p.fromRotationTranslation(f.fromQuaternion(P, y), c, O.modelMatrix)
            } else
              l.equals(c, k.position) && m.equals(P, k.orientation) || (d(P) ? (O.modelMatrix = p.fromRotationTranslation(f.fromQuaternion(P, y), c, O.modelMatrix),
                k.position = l.clone(c, k.position),
                k.orientation = m.clone(P, k.orientation)) : (O.modelMatrix = n.default.Transforms.eastNorthUpToFixedFrame(c),
                  k.position = l.clone(c, k.position)));
            O.show = !0,
              O.gaze = L,
              O.radius = M,
              O.xHalfAngle = S,
              O.yHalfAngle = E,
              O.lineColor = v.getValueOrDefault(T._lineColor, e, u.WHITE),
              O.showSectorLines = v.getValueOrDefault(T._showSectorLines, e, !0),
              O.showSectorSegmentLines = v.getValueOrDefault(T._showSectorSegmentLines, e, !0),
              O.showLateralSurfaces = v.getValueOrDefault(T._showLateralSurfaces, e, !0),
              O.material = g.getValue(e, T._material, O.material),
              O.showDomeSurfaces = v.getValueOrDefault(T._showDomeSurfaces, e, !0),
              O.showDomeLines = v.getValueOrDefault(T._showDomeLines, e, !0),
              O.showIntersection = v.getValueOrDefault(T._showIntersection, e, !0),
              O.intersectionColor = v.getValueOrDefault(T._intersectionColor, e, u.WHITE),
              O.intersectionWidth = v.getValueOrDefault(T._intersectionWidth, e, 1),
              O.showThroughEllipsoid = v.getValueOrDefault(T._showThroughEllipsoid, e, !0),
              O.scanPlaneMode = v.getValueOrDefault(T._scanPlaneMode, e),
              O.scanPlaneColor = v.getValueOrDefault(T._scanPlaneColor, e, u.WHITE),
              O.showScanPlane = v.getValueOrDefault(T._showScanPlane, e, !0),
              O.scanPlaneRate = v.getValueOrDefault(T._scanPlaneRate, e, 1)
          } else
            d(k) && (k.primitive.show = !1)
        }
        return !0
      }
        ,
        P.prototype.isDestroyed = function () {
          return !1
        }
        ,
        P.prototype.destroy = function () {
          for (var e = this._entitiesToVisualize.values, t = this._hash, i = this._primitives, a = e.length - 1; a > -1; a--)
            (0,
              o.removePrimitive)(e[a], t, i);
          return c(this)
        }
        ,
        P.prototype._onCollectionChanged = function (e, t, i, a) {
          var n, r, s = this._entitiesToVisualize, l = this._hash, u = this._primitives;
          for (n = t.length - 1; n > -1; n--)
            r = t[n],
              d(r._rectangularSensor) && d(r._position) && s.set(r.id, r);
          for (n = a.length - 1; n > -1; n--)
            r = a[n],
              d(r._rectangularSensor) && d(r._position) ? s.set(r.id, r) : ((0,
                o.removePrimitive)(r, l, u),
                s.remove(r.id));
          for (n = i.length - 1; n > -1; n--)
            r = i[n],
              (0,
                o.removePrimitive)(r, l, u),
              s.remove(r.id)
        }
        ,
        t.RectangularSensorVisualizer = P
    }
    , function (e, t, i) {
      function a(e, t, i) {
        var a = t[e.id];
        if (r.default.defined(a)) {
          var n = a.primitive;
          try {
            i.remove(n)
          } catch (e) { }
          n.isDestroyed && !n.isDestroyed() && n.destroy(),
            delete t[e.id]
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.removePrimitive = a;
      var n = i(0)
        , r = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(n)
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.TerrainClipPlan = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r);
      t.TerrainClipPlan = function () {
        function e(t, i) {
          a(this, e),
            this.viewer = t,
            this.options = i || {},
            this._positions = i.positions,
            this._height = this.options.height || 0,
            this.bottomImg = i.bottomImg,
            this.wallImg = i.wallImg,
            this.splitNum = o.default.defaultValue(i.splitNum, 50),
            this._positions && this._positions.length > 0 && this.updateData(this._positions)
        }
        return n(e, [{
          key: "updateData",
          value: function (e) {
            this.clear();
            var t = []
              , i = e.length
              , a = new o.default.Cartesian3
              , n = o.default.Cartesian3.subtract(e[0], e[1], a);
            n = n.x > 0,
              this.excavateMinHeight = 9999;
            for (var r = 0; r < i; ++r) {
              var s = (r + 1) % i
                , l = o.default.Cartesian3.midpoint(e[r], e[s], new o.default.Cartesian3)
                , u = o.default.Cartographic.fromCartesian(e[r])
                , d = viewer.scene.globe.getHeight(u) || u.height;
              d < this.excavateMinHeight && (this.excavateMinHeight = d);
              var c, h = o.default.Cartesian3.normalize(l, new o.default.Cartesian3);
              c = n ? o.default.Cartesian3.subtract(e[r], l, new o.default.Cartesian3) : o.default.Cartesian3.subtract(e[s], l, new o.default.Cartesian3),
                c = o.default.Cartesian3.normalize(c, c);
              var f = o.default.Cartesian3.cross(c, h, new o.default.Cartesian3);
              f = o.default.Cartesian3.normalize(f, f);
              var p = new o.default.Plane(f, 0)
                , m = o.default.Plane.getPointDistance(p, l);
              t.push(new o.default.ClippingPlane(f, m))
            }
            this.viewer.scene.globe.clippingPlanes = new o.default.ClippingPlaneCollection({
              planes: t,
              edgeWidth: 1,
              edgeColor: o.default.Color.WHITE,
              enabled: !0
            }),
              this._prepareWell(e),
              this._createWell(this.wellData)
          }
        }, {
          key: "clear",
          value: function () {
            this.viewer.scene.globe.clippingPlanes && (this.viewer.scene.globe.clippingPlanes.enabled = !1,
              this.viewer.scene.globe.clippingPlanes.removeAll(),
              this.viewer.scene.globe.clippingPlanes.isDestroyed() || this.viewer.scene.globe.clippingPlanes.destroy()),
              this.viewer.scene.globe.clippingPlanes = void 0,
              this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface),
              this.wellWall && this.viewer.scene.primitives.remove(this.wellWall),
              delete this.bottomSurface,
              delete this.wellWall,
              this.viewer.scene.render()
          }
        }, {
          key: "_prepareWell",
          value: function (e) {
            var t = this.splitNum
              , i = e.length;
            if (0 != i) {
              for (var a = this.excavateMinHeight - this.height, n = [], r = [], s = [], l = 0; l < i; l++) {
                var u = l == i - 1 ? 0 : l + 1
                  , d = o.default.Cartographic.fromCartesian(e[l])
                  , c = o.default.Cartographic.fromCartesian(e[u])
                  , h = [d.longitude, d.latitude]
                  , f = [c.longitude, c.latitude];
                0 == l && (s.push(new o.default.Cartographic(h[0], h[1])),
                  r.push(o.default.Cartesian3.fromRadians(h[0], h[1], a)),
                  n.push(o.default.Cartesian3.fromRadians(h[0], h[1], 0)));
                for (var p = 1; p <= t; p++) {
                  var m = o.default.Math.lerp(h[0], f[0], p / t)
                    , g = o.default.Math.lerp(h[1], f[1], p / t);
                  l == i - 1 && p == t || (s.push(new o.default.Cartographic(m, g)),
                    r.push(o.default.Cartesian3.fromRadians(m, g, a)),
                    n.push(o.default.Cartesian3.fromRadians(m, g, 0)))
                }
              }
              this.wellData = {
                lerp_pos: s,
                bottom_pos: r,
                no_height_top: n
              }
            }
          }
        }, {
          key: "_createWell",
          value: function (e) {
            if (Boolean(this.viewer.terrainProvider._layers)) {
              var t = this;
              this._createBottomSurface(e.bottom_pos);
              var i = o.default.sampleTerrainMostDetailed(viewer.terrainProvider, e.lerp_pos);
              o.default.when(i, function (i) {
                for (var a = i.length, n = [], r = 0; r < a; r++) {
                  var s = o.default.Cartesian3.fromRadians(i[r].longitude, i[r].latitude, i[r].height);
                  n.push(s)
                }
                t._createWellWall(e.bottom_pos, n)
              })
            } else
              this._createBottomSurface(e.bottom_pos),
                this._createWellWall(e.bottom_pos, e.no_height_top)
          }
        }, {
          key: "_createWellWall",
          value: function (e, t) {
            var i = new o.default.WellNoBottom({
              minimumArr: e,
              maximumArr: t
            });
            i = o.default.WellNoBottom.createGeometry(i);
            var a = new o.default.Material({
              fabric: {
                type: "Image",
                uniforms: {
                  image: this.wallImg
                }
              }
            })
              , n = new o.default.MaterialAppearance({
                translucent: !1,
                flat: !0,
                material: a
              });
            this.wellWall = new o.default.Primitive({
              geometryInstances: new o.default.GeometryInstance({
                geometry: i,
                attributes: {
                  color: o.default.ColorGeometryInstanceAttribute.fromColor(o.default.Color.GREY)
                },
                id: "PitWall"
              }),
              appearance: n,
              asynchronous: !1
            }),
              this.viewer.scene.primitives.add(this.wellWall)
          }
        }, {
          key: "_createBottomSurface",
          value: function (e) {
            if (e.length) {
              var t = new o.default.CustomPlaneGeometry({
                pos_arr: e
              });
              t = o.default.CustomPlaneGeometry.createGeometry(t);
              var i = new o.default.Material({
                fabric: {
                  type: "Image",
                  uniforms: {
                    image: this.bottomImg
                  }
                }
              })
                , a = new o.default.MaterialAppearance({
                  translucent: !1,
                  flat: !0,
                  material: i
                });
              this.bottomSurface = new o.default.Primitive({
                geometryInstances: new o.default.GeometryInstance({
                  geometry: t
                }),
                appearance: a,
                asynchronous: !1
              }),
                this.viewer.scene.primitives.add(this.bottomSurface)
            }
          }
        }, {
          key: "_switchExcavate",
          value: function (e) {
            e ? (this.viewer.scene.globe.material = o.default.Material.fromType("WaJue"),
              this.wellWall.show = !0,
              this.bottomSurface.show = !0) : (this.viewer.scene.globe.material = null,
                this.wellWall.show = !1,
                this.bottomSurface.show = !1)
          }
        }, {
          key: "_updateExcavateDepth",
          value: function (e) {
            this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface),
              this.wellWall && this.viewer.scene.primitives.remove(this.wellWall);
            for (var t = this.wellData.lerp_pos, i = [], a = t.length, n = 0; n < a; n++)
              i.push(o.default.Cartesian3.fromRadians(t[n].longitude, t[n].latitude, this.excavateMinHeight - e));
            this.wellData.bottom_pos = i,
              this._createWell(this.wellData),
              this.viewer.scene.primitives.add(this.bottomSurface),
              this.viewer.scene.primitives.add(this.wellWall)
          }
        }, {
          key: "show",
          get: function () {
            return this._show
          },
          set: function (e) {
            this._show = e,
              this.viewer.scene.globe.clippingPlanes && (this.viewer.scene.globe.clippingPlanes.enabled = e),
              this._switchExcavate(e)
          }
        }, {
          key: "height",
          get: function () {
            return this._height
          },
          set: function (e) {
            this._height = e,
              this._updateExcavateDepth(e)
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.TilesetClipPlan = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r);
      (t.TilesetClipPlan = function () {
        function e(t, i) {
          a(this, e),
            this.tileset = t,
            this.options = i || {},
            this.options.type && (this.type = this.options.type),
            this.options.distance && (this.distance = this.options.distance)
        }
        return n(e, [{
          key: "createPlane",
          value: function (t) {
            this.clear();
            var i;
            switch (t) {
              case e.Type.Z:
                i = [new o.default.ClippingPlane(new o.default.Cartesian3(0, 0, 1), 1)];
                break;
              default:
              case e.Type.ZR:
                i = [new o.default.ClippingPlane(new o.default.Cartesian3(0, 0, -1), 1)];
                break;
              case e.Type.X:
                i = [new o.default.ClippingPlane(new o.default.Cartesian3(1, 0, 0), 1)];
                break;
              case e.Type.XR:
                i = [new o.default.ClippingPlane(new o.default.Cartesian3(-1, 0, 0), 1)];
                break;
              case e.Type.Y:
                i = [new o.default.ClippingPlane(new o.default.Cartesian3(0, 1, 0), 1)];
                break;
              case e.Type.YR:
                i = [new o.default.ClippingPlane(new o.default.Cartesian3(0, -1, 0), 1)]
            }
            var a = new o.default.ClippingPlaneCollection({
              planes: i,
              edgeWidth: this.options.edgeWidth || 0
            });
            this.clippingPlanes = a,
              this.tileset.clippingPlanes = a
          }
        }, {
          key: "updateDistance",
          value: function (e) {
            if (null != this.clippingPlanes)
              for (var t = 0; t < this.clippingPlanes.length; t++) {
                var i = this.clippingPlanes.get(t);
                i.distance = e
              }
          }
        }, {
          key: "clear",
          value: function () {
            this.tileset.clippingPlanes && (this.tileset.clippingPlanes.enabled = !1),
              this.clippingPlanes && (this.clippingPlanes.destroy(),
                delete this.clippingPlanes)
          }
        }, {
          key: "planes",
          get: function () {
            return this.clippingPlanes
          }
        }, {
          key: "type",
          get: function () {
            return this._type
          },
          set: function (e) {
            this._type = e,
              this.createPlane(e)
          }
        }, {
          key: "distance",
          get: function () {
            return this._distance || 0
          },
          set: function (e) {
            this._distance = e,
              this.updateDistance(e)
          }
        }]),
          e
      }()).Type = {
        Z: 1,
        ZR: 2,
        X: 3,
        XR: 4,
        Y: 5,
        YR: 6
      }
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.FloodByEntity = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r)
        , s = i(1);
      t.FloodByEntity = function () {
        function e(t) {
          a(this, e),
            this.viewer = t
        }
        return n(e, [{
          key: "start",
          value: function (e, t) {
            this.stop(),
              this.entity = e,
              this.options = t;
            var i = this;
            this._last_depthTestAgainstTerrain = this.viewer.scene.globe.depthTestAgainstTerrain,
              this.viewer.scene.globe.depthTestAgainstTerrain = !0,
              this.extrudedHeight = t.height,
              this.entity.polygon.extrudedHeight = new o.default.CallbackProperty(function (e) {
                return i.extrudedHeight
              }
                , !1);
            var a = this.entity.polygon.hierarchy.getValue();
            this.entity.polygon.hierarchy = (0,
              s.setPositionsHeight)(a, t.height),
              this.timeIdx = setInterval(function () {
                if (i.extrudedHeight > i.options.maxHeight)
                  return t.onStop && t.onStop(),
                    void i.stop();
                i.extrudedHeight += i.options.speed / 10,
                  t.onChange && t.onChange(i.extrudedHeight)
              }, 100)
          }
        }, {
          key: "stop",
          value: function () {
            clearInterval(this.timeIdx)
          }
        }, {
          key: "clear",
          value: function () {
            this.stop(),
              null !== this._last_depthTestAgainstTerrain && (this.viewer.scene.globe.depthTestAgainstTerrain = this._last_depthTestAgainstTerrain),
              this.entity = null
          }
        }, {
          key: "updateHeight",
          value: function (e) {
            this.extrudedHeight = e
          }
        }, {
          key: "height",
          get: function () {
            return this.extrudedHeight
          },
          set: function (e) {
            this.extrudedHeight = e
          }
        }]),
          e
      }()
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.ViewShed3D = void 0;
      var r = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , o = i(0)
        , s = a(o)
        , l = i(114)
        , u = a(l)
        , d = i(42)
        , c = {
          cameraPosition: null,
          viewPosition: null,
          horizontalAngle: 120,
          verticalAngle: 90,
          visibleAreaColor: new s.default.Color(0, 1, 0),
          hiddenAreaColor: new s.default.Color(1, 0, 0),
          alpha: .5,
          distance: 100,
          frustum: !0,
          show: !0
        };
      t.ViewShed3D = function () {
        function e(t, i) {
          n(this, e),
            t && (i || (i = {}),
              this.viewer = t,
              this.cameraPosition = s.default.defaultValue(i.cameraPosition, c.cameraPosition),
              this.viewPosition = s.default.defaultValue(i.viewPosition, c.viewPosition),
              this._horizontalAngle = s.default.defaultValue(i.horizontalAngle, c.horizontalAngle),
              this._verticalAngle = s.default.defaultValue(i.verticalAngle, c.verticalAngle),
              this._visibleAreaColor = s.default.defaultValue(i.visibleAreaColor, c.visibleAreaColor),
              this._hiddenAreaColor = s.default.defaultValue(i.hiddenAreaColor, c.hiddenAreaColor),
              this._alpha = s.default.defaultValue(i.alpha, c.alpha),
              this._distance = s.default.defaultValue(i.distance, c.distance),
              this._frustum = s.default.defaultValue(i.frustum, c.frustum),
              this.calback = i.calback,
              this.defaultShow = s.default.defaultValue(i.show, !0),
              this.cameraPosition && this.viewPosition ? (this._addToScene(),
                this.calback && this.calback()) : this._bindMourseEvent())
        }
        return r(e, [{
          key: "_bindMourseEvent",
          value: function () {
            var e = this
              , t = this.viewer
              , i = new s.default.ScreenSpaceEventHandler(this.viewer.scene.canvas)
              , a = !1
              , n = !1;
            i.setInputAction(function (i) {
              var n = das3d.point.getCurrentMousePosition(t.scene, i.position);
              n && (e.cameraPosition ? e.cameraPosition && !a && (e.viewPosition = n,
                e._addToScene(!0),
                e._unbindMourseEvent(),
                a = !a,
                e.calback && e.calback()) : e.cameraPosition = n)
            }, s.default.ScreenSpaceEventType.LEFT_CLICK),
              i.setInputAction(function (i) {
                var a = das3d.point.getCurrentMousePosition(t.scene, i.endPosition);
                if (a) {
                  var r = e.cameraPosition;
                  r && (e.frustumQuaternion = e.getFrustumQuaternion(r, a),
                    e.distance = Number(s.default.Cartesian3.distance(r, a).toFixed(1)),
                    e.viewPosition = a,
                    n = e._addToScene(n))
                }
              }, s.default.ScreenSpaceEventType.MOUSE_MOVE),
              this._handler = i
          }
        }, {
          key: "_unbindMourseEvent",
          value: function () {
            null != this._handler && (this._handler.destroy(),
              delete this._handler)
          }
        }, {
          key: "_addToScene",
          value: function (e) {
            if (this.frustumQuaternion = this.getFrustumQuaternion(this.cameraPosition, this.viewPosition),
              e) {
              this.viewer.scene.primitives.remove(this.postProcess),
                this.viewer.scene.primitives.remove(this.viewShadowMap);
              var t = this.viewer.scene;
              new s.default.Camera(t);
              delete this.viewShadowMap,
                this._createShadowMap(this.cameraPosition, this.viewPosition)
            } else
              this._createShadowMap(this.cameraPosition, this.viewPosition),
                this._addPostProcess(),
                !this.radar && this.addRadar(this.cameraPosition, this.frustumQuaternion),
                this.viewer.scene.primitives.add(this),
                e = !0;
            return e
          }
        }, {
          key: "_createShadowMap",
          value: function (e, t, i) {
            var a = e
              , n = t
              , r = this.viewer.scene
              , o = new s.default.Camera(r);
            o.position = a,
              o.direction = s.default.Cartesian3.subtract(n, a, new s.default.Cartesian3(0, 0, 0)),
              o.up = s.default.Cartesian3.normalize(a, new s.default.Cartesian3(0, 0, 0));
            var l = Number(s.default.Cartesian3.distance(n, a).toFixed(1));
            this.distance = l,
              o.frustum = new s.default.PerspectiveFrustum({
                fov: s.default.Math.toRadians(120),
                aspectRatio: r.canvas.clientWidth / r.canvas.clientHeight,
                near: .1,
                far: 5e3
              });
            this.viewShadowMap = new s.default.ShadowMap({
              lightCamera: o,
              enable: !1,
              isPointLight: !1,
              isSpotLight: !0,
              cascadesEnabled: !1,
              context: r.context,
              pointLightRadius: l
            })
          }
        }, {
          key: "getFrustumQuaternion",
          value: function (e, t) {
            var i = s.default.Cartesian3.normalize(s.default.Cartesian3.subtract(t, e, new s.default.Cartesian3), new s.default.Cartesian3)
              , a = s.default.Cartesian3.normalize(e, new s.default.Cartesian3)
              , n = new s.default.Camera(this.viewer.scene);
            n.position = e,
              n.direction = i,
              n.up = a,
              i = n.directionWC,
              a = n.upWC;
            var r = n.rightWC
              , o = new s.default.Cartesian3
              , l = new s.default.Matrix3
              , u = new s.default.Quaternion;
            r = s.default.Cartesian3.negate(r, o);
            var d = l;
            return s.default.Matrix3.setColumn(d, 0, r, d),
              s.default.Matrix3.setColumn(d, 1, a, d),
              s.default.Matrix3.setColumn(d, 2, i, d),
              s.default.Quaternion.fromRotationMatrix(d, u)
          }
        }, {
          key: "_addPostProcess",
          value: function () {
            var e = this
              , t = u.default
              , i = this
              , a = i.viewShadowMap._isPointLight ? i.viewShadowMap._pointBias : i.viewShadowMap._primitiveBias;
            this.postProcess = new s.default.PostProcessStage({
              fragmentShader: t,
              uniforms: {
                czzj: function () {
                  return e.verticalAngle
                },
                dis: function () {
                  return e.distance
                },
                spzj: function () {
                  return e.horizontalAngle
                },
                visibleColor: function () {
                  return e.visibleAreaColor
                },
                disVisibleColor: function () {
                  return e.hiddenAreaColor
                },
                mixNum: function () {
                  return e.alpha
                },
                stcshadow: function () {
                  return i.viewShadowMap._shadowMapTexture
                },
                _shadowMap_matrix: function () {
                  return i.viewShadowMap._shadowMapMatrix
                },
                shadowMap_lightPositionEC: function () {
                  return i.viewShadowMap._lightPositionEC
                },
                shadowMap_lightDirectionEC: function () {
                  return i.viewShadowMap._lightDirectionEC
                },
                shadowMap_lightUp: function () {
                  return i.viewShadowMap._lightCamera.up
                },
                shadowMap_lightDir: function () {
                  return i.viewShadowMap._lightCamera.direction
                },
                shadowMap_lightRight: function () {
                  return i.viewShadowMap._lightCamera.right
                },
                shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function () {
                  var e = new s.default.Cartesian2;
                  return e.x = 1 / i.viewShadowMap._textureSize.x,
                    e.y = 1 / i.viewShadowMap._textureSize.y,
                    s.default.Cartesian4.fromElements(e.x, e.y, a.depthBias, a.normalShadingSmooth, this.combinedUniforms1)
                },
                shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function () {
                  return s.default.Cartesian4.fromElements(a.normalOffsetScale, i.viewShadowMap._distance, i.viewShadowMap.maximumDistance, i.viewShadowMap._darkness, this.combinedUniforms2)
                }
              }
            }),
              this.show && this.viewer.scene.postProcessStages.add(this.postProcess)
          }
        }, {
          key: "removeRadar",
          value: function () {
            this.viewer.entities.remove(this.radar)
          }
        }, {
          key: "resetRadar",
          value: function () {
            this.removeRadar(),
              this.addRadar(this.cameraPosition, this.frustumQuaternion)
          }
        }, {
          key: "addRadar",
          value: function (e, t) {
            var i = e
              , a = this;
            this.radar = this.viewer.entities.add({
              position: i,
              orientation: t,
              show: this.show,
              rectangularSensor: new d.RectangularSensorGraphics({
                radius: a.distance,
                xHalfAngle: s.default.Math.toRadians(a.horizontalAngle / 2),
                yHalfAngle: s.default.Math.toRadians(a.verticalAngle / 2),
                material: new s.default.Color(0, 1, 1, .4),
                lineColor: new s.default.Color(1, 1, 1, 1),
                slice: 8,
                showScanPlane: !1,
                scanPlaneColor: new s.default.Color(0, 1, 1, 1),
                scanPlaneMode: "vertical",
                scanPlaneRate: 3,
                showThroughEllipsoid: !1,
                showLateralSurfaces: !1,
                showDomeSurfaces: !1
              })
            })
          }
        }, {
          key: "update",
          value: function (e) {
            this.viewShadowMap && e.shadowMaps.push(this.viewShadowMap)
          }
        }, {
          key: "_switchShow",
          value: function () {
            this.show ? !this.postProcess && this._addPostProcess() : (this.viewer.scene.postProcessStages.remove(this.postProcess),
              delete this.postProcess,
              this.postProcess = null),
              this.radar.show = this.show
          }
        }, {
          key: "destroy",
          value: function () {
            this._unbindMourseEvent(),
              this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.entities.remove(this.radar),
              delete this.radar,
              delete this.postProcess,
              delete this.viewShadowMap,
              delete this.verticalAngle,
              delete this.viewer,
              delete this.horizontalAngle,
              delete this.visibleAreaColor,
              delete this.hiddenAreaColor,
              delete this.distance,
              delete this.frustumQuaternion,
              delete this.cameraPosition,
              delete this.viewPosition,
              delete this.alpha
          }
        }, {
          key: "horizontalAngle",
          get: function () {
            return this._horizontalAngle
          },
          set: function (e) {
            this._horizontalAngle = e,
              this.resetRadar()
          }
        }, {
          key: "verticalAngle",
          get: function () {
            return this._verticalAngle
          },
          set: function (e) {
            this._verticalAngle = e,
              this.resetRadar()
          }
        }, {
          key: "distance",
          get: function () {
            return this._distance
          },
          set: function (e) {
            this._distance = e,
              this.resetRadar()
          }
        }, {
          key: "visibleAreaColor",
          get: function () {
            return this._visibleAreaColor
          },
          set: function (e) {
            this._visibleAreaColor = e
          }
        }, {
          key: "hiddenAreaColor",
          get: function () {
            return this._hiddenAreaColor
          },
          set: function (e) {
            this._hiddenAreaColor = e
          }
        }, {
          key: "alpha",
          get: function () {
            return this._alpha
          },
          set: function (e) {
            this._alpha = e
          }
        }, {
          key: "show",
          get: function () {
            return this.defaultShow
          },
          set: function (e) {
            this.defaultShow = Boolean(e),
              this._switchShow()
          }
        }]),
          e
      }()
    }
    , function (e, t) {
      e.exports = "uniform float czzj;\r\nuniform float dis;\r\nuniform float spzj;\r\nuniform vec3 visibleColor;\r\nuniform vec3 disVisibleColor;\r\nuniform float mixNum;\r\nuniform sampler2D colorTexture;\r\nuniform sampler2D stcshadow; \r\nuniform sampler2D depthTexture;\r\nuniform mat4 _shadowMap_matrix; \r\nuniform vec4 shadowMap_lightPositionEC; \r\nuniform vec4 shadowMap_lightDirectionEC;\r\nuniform vec3 shadowMap_lightUp;\r\nuniform vec3 shadowMap_lightDir;\r\nuniform vec3 shadowMap_lightRight;\r\nuniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; \r\nuniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; \r\nvarying vec2 v_textureCoordinates;\r\nvec4 toEye(in vec2 uv, in float depth){\r\n    vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\r\n    vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\r\n    posInCamera =posInCamera / posInCamera.w;\r\n    return posInCamera;\r\n}\r\nfloat getDepth(in vec4 depth){\r\n    float z_window = czm_unpackDepth(depth);\r\n    z_window = czm_reverseLogDepth(z_window);\r\n    float n_range = czm_depthRange.near;\r\n    float f_range = czm_depthRange.far;\r\n    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\r\n}\r\nfloat _czm_sampleShadowMap(sampler2D shadowMap, vec2 uv){\r\n    return texture2D(shadowMap, uv).r;\r\n}\r\nfloat _czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth){\r\n    return step(depth, _czm_sampleShadowMap(shadowMap, uv));\r\n}\r\nfloat _czm_shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters){\r\n    float depthBias = shadowParameters.depthBias;\r\n    float depth = shadowParameters.depth;\r\n    float nDotL = shadowParameters.nDotL;\r\n    float normalShadingSmooth = shadowParameters.normalShadingSmooth;\r\n    float darkness = shadowParameters.darkness;\r\n    vec2 uv = shadowParameters.texCoords;\r\n    depth -= depthBias;\r\n    vec2 texelStepSize = shadowParameters.texelStepSize;\r\n    float radius = 1.0;\r\n    float dx0 = -texelStepSize.x * radius;\r\n    float dy0 = -texelStepSize.y * radius;\r\n    float dx1 = texelStepSize.x * radius;\r\n    float dy1 = texelStepSize.y * radius;\r\n    float visibility = \r\n    (\r\n    _czm_shadowDepthCompare(shadowMap, uv, depth)\r\n    +_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, 0.0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, 0.0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy1), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy1), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy1), depth)\r\n    ) * (1.0 / 9.0)\r\n    ;\r\n    return visibility;\r\n}\r\nvec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){\r\n    vec3 v01 = point -planeOrigin;\r\n    float d = dot(planeNormal, v01) ;\r\n    return (point - planeNormal * d);\r\n}\r\nfloat ptm(vec3 pt){\r\n    return sqrt(pt.x*pt.x + pt.y*pt.y + pt.z*pt.z);\r\n}\r\nvoid main() \r\n{ \r\n    const float PI = 3.141592653589793;\r\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\r\n    vec4 currD = texture2D(depthTexture, v_textureCoordinates);\r\n\r\n    // vec4 stcc = texture2D(stcshadow, v_textureCoordinates);\r\n    // gl_FragColor = stcc;\r\n    // return;\r\n    if(currD.r>=1.0){\r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n    \r\n    float depth = getDepth(currD);\r\n    vec4 positionEC = toEye(v_textureCoordinates, depth);\r\n    vec3 normalEC = vec3(1.0);\r\n    czm_shadowParameters shadowParameters; \r\n    shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy; \r\n    shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z; \r\n    shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w; \r\n    shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w; \r\n    shadowParameters.depthBias *= max(depth * 0.01, 1.0); \r\n    vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz); \r\n    float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); \r\n    vec4 shadowPosition = _shadowMap_matrix * positionEC; \r\n    shadowPosition /= shadowPosition.w; \r\n    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) \r\n    { \r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n\r\n    //坐标与视点位置距离，大于最大距离则舍弃阴影效果\r\n    vec4 lw = czm_inverseView*  vec4(shadowMap_lightPositionEC.xyz, 1.0);\r\n    vec4 vw = czm_inverseView* vec4(positionEC.xyz, 1.0);\r\n    if(distance(lw.xyz,vw.xyz)>dis){\r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n\r\n\r\n    //水平夹角限制\r\n    vec3 ptOnSP = pointProjectOnPlane(shadowMap_lightUp,lw.xyz,vw.xyz);\r\n    directionEC = ptOnSP - lw.xyz;\r\n    float directionECMO = ptm(directionEC.xyz);\r\n    float shadowMap_lightDirMO = ptm(shadowMap_lightDir.xyz);\r\n    float cosJJ = dot(directionEC,shadowMap_lightDir)/(directionECMO*shadowMap_lightDirMO);\r\n    float degJJ = acos(cosJJ)*(180.0 / PI);\r\n    degJJ = abs(degJJ);\r\n    if(degJJ>spzj/2.0){\r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n\r\n    //垂直夹角限制\r\n    vec3 ptOnCZ = pointProjectOnPlane(shadowMap_lightRight,lw.xyz,vw.xyz);\r\n    vec3 dirOnCZ = ptOnCZ - lw.xyz;\r\n    float dirOnCZMO = ptm(dirOnCZ);\r\n    float cosJJCZ = dot(dirOnCZ,shadowMap_lightDir)/(dirOnCZMO*shadowMap_lightDirMO);\r\n    float degJJCZ = acos(cosJJCZ)*(180.0 / PI);\r\n    degJJCZ = abs(degJJCZ);\r\n    if(degJJCZ>czzj/2.0){\r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n\r\n    shadowParameters.texCoords = shadowPosition.xy; \r\n    shadowParameters.depth = shadowPosition.z; \r\n    shadowParameters.nDotL = nDotL; \r\n    float visibility = _czm_shadowVisibility(stcshadow, shadowParameters); \r\n    if(visibility==1.0){\r\n        gl_FragColor = mix(color,vec4(visibleColor,1.0),mixNum);\r\n    }else{\r\n        // if(abs(shadowPosition.z-0.0)<0.01){\r\n        //     return;\r\n        // }\r\n        gl_FragColor = mix(color,vec4(disVisibleColor,1.0),mixNum);\r\n    }\r\n} "
    }
    , function (e, t, i) {
      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.VideoShed3D = void 0;
      var r = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , o = i(0)
        , s = a(o)
        , l = i(116)
        , u = a(l)
        , d = {
          LEFT: "Z",
          RIGHT: "-Z",
          TOP: "Y",
          BOTTOM: "-Y",
          ALONG: "X",
          INVERSE: "-X"
        }
        , c = {
          font: "50px 楷体",
          fill: !0,
          fillColor: new s.default.Color(1, 1, 0, 1),
          stroke: !0,
          strokeWidth: 2,
          strokeColor: new s.default.Color(1, 1, 1, .8),
          backgroundColor: new s.default.Color(1, 1, 1, .1),
          textBaseline: "top",
          padding: 40
        };
      t.VideoShed3D = function () {
        function e(t, i) {
          if (n(this, e),
            t) {
            i || (i = {}),
              this.viewer = t,
              this._cameraPosition = i.cameraPosition,
              this._position = i.position,
              this.type = i.type,
              this.alpha = i.alpha || 1,
              this.url = i.url,
              this.color = i.color,
              this._debugFrustum = s.default.defaultValue(i.debugFrustum, !0),
              this._aspectRatio = i.aspectRatio || this._getWinWidHei();
            var a = i.fov && s.default.Math.toRadians(i.fov);
            if (this._camerafov = a || this.viewer.scene.camera.frustum.fov,
              this.texture = i.texture || new s.default.Texture({
                context: this.viewer.scene.context,
                source: {
                  width: 1,
                  height: 1,
                  arrayBufferView: new Uint8Array([255, 255, 255, 255])
                },
                flipY: !1
              }),
              this._videoPlay = s.default.defaultValue(i.videoPlay, !0),
              this.defaultShow = s.default.defaultValue(i.show, !0),
              this._rotateDeg = 1,
              this._dirObj = s.default.defaultValue(i.dirObj, void 0),
              this.text = s.default.defaultValue(i.text, void 0),
              this.textStyles = s.default.defaultValue(i.textStyles, c),
              this._disViewColor = s.default.defaultValue(i.disViewColor, new s.default.Color(.75, .75, .75, .75)),
              !this.cameraPosition || !this.cameraPosition)
              return void console.log("初始化失败：请确认相机位置与视点位置正确！");
            switch (e.Type = {
              Color: 1,
              Image: 2,
              Video: 3,
              Text: 4
            },
            this.type) {
              default:
              case e.Type.Video:
                this.activeVideo(this.url);
                break;
              case e.Type.Image:
                this.activePicture(this.url),
                  this.deActiveVideo();
                break;
              case e.Type.Color:
                this.activeColor(this.color),
                  this.deActiveVideo();
                break;
              case e.Type.Text:
                this.activeText(this.text, this.textStyles),
                  this.deActiveVideo()
            }
            this._createShadowMap(),
              this._getOrientation(),
              this._addCameraFrustum(),
              this._addPostProcess(),
              this.viewer.scene.primitives.add(this)
          }
        }
        return r(e, [{
          key: "rotateCamera",
          value: function (e, t) {
            var i = s.default.defaultValue(t, this._rotateDeg);
            switch (e) {
              case d.LEFT:
                break;
              case d.RIGHT:
                i *= -1;
                break;
              case d.TOP:
                break;
              case d.BOTTOM:
                i *= -1;
                break;
              case d.ALONG:
                break;
              case d.INVERSE:
                i *= -1
            }
            var a = this._computedNewViewDir(e, i);
            this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.scene.primitives.remove(this.cameraFrustum),
              this.viewShadowMap.destroy(),
              this.cameraFrustum.destroy(),
              this._resetCameraDir(a),
              this._getOrientation(),
              this._addCameraFrustum(),
              this._addPostProcess()
          }
        }, {
          key: "_resetCameraDir",
          value: function (e) {
            e && e.up && e.right && e.direction && (this._dirObj = e,
              this._createShadowMap())
          }
        }, {
          key: "_computedNewViewDir",
          value: function (e, t) {
            t = s.default.Math.toRadians(t);
            var i = this.viewShadowMap._lightCamera
              , a = s.default.clone(i.direction)
              , n = s.default.clone(i.right)
              , r = s.default.clone(i.up)
              , o = new s.default.Matrix3;
            switch (e) {
              case d.LEFT:
              case d.RIGHT:
                s.default.Matrix3.fromRotationZ(t, o);
                break;
              case d.TOP:
              case d.BOTTOM:
                s.default.Matrix3.fromRotationY(t, o);
                break;
              case d.ALONG:
              case d.INVERSE:
                s.default.Matrix3.fromRotationX(t, o)
            }
            var l = s.default.Transforms.eastNorthUpToFixedFrame(i.position)
              , u = s.default.Matrix4.inverse(l, new s.default.Matrix4)
              , c = s.default.Matrix4.multiplyByPointAsVector(u, a, new s.default.Cartesian3)
              , h = s.default.Matrix3.multiplyByVector(o, c, new s.default.Cartesian3)
              , f = s.default.Matrix4.multiplyByPointAsVector(l, h, new s.default.Cartesian3)
              , p = s.default.Matrix4.multiplyByPointAsVector(u, n, new s.default.Cartesian3)
              , m = s.default.Matrix3.multiplyByVector(o, p, new s.default.Cartesian3)
              , g = s.default.Matrix4.multiplyByPointAsVector(l, m, new s.default.Cartesian3)
              , v = s.default.Matrix4.multiplyByPointAsVector(u, r, new s.default.Cartesian3)
              , y = s.default.Matrix3.multiplyByVector(o, v, new s.default.Cartesian3);
            return {
              direction: f,
              right: g,
              up: s.default.Matrix4.multiplyByPointAsVector(l, y, new s.default.Cartesian3)
            }
          }
        }, {
          key: "getPercentagePoint",
          value: function (e) {
            if (e) {
              var t = this.viewShadowMap._lightCamera._viewMatrix
                , i = this.viewShadowMap._lightCamera.frustum.projectionMatrix
                , a = new s.default.Cartesian4(e.x, e.y, e.z, 1)
                , n = s.default.Matrix4.multiply(i, t, new s.default.Matrix4)
                , r = s.default.Matrix4.multiplyByVector(n, a, new s.default.Cartesian4)
                , o = new s.default.Cartesian2(r.x / r.w, r.y / r.w);
              return new s.default.Cartesian2(o.x / 2 + .5, o.y / 2 + .5)
            }
          }
        }, {
          key: "_changeCameraFov",
          value: function () {
            this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.scene.primitives.remove(this.cameraFrustum),
              this._createShadowMap(),
              this._getOrientation(),
              this._addCameraFrustum(),
              this._addPostProcess()
          }
        }, {
          key: "_changeVideoWidHei",
          value: function () {
            this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.scene.primitives.remove(this.cameraFrustum),
              this._createShadowMap(),
              this._getOrientation(),
              this._addCameraFrustum(),
              this._addPostProcess()
          }
        }, {
          key: "_changeCameraPos",
          value: function () {
            this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.scene.primitives.remove(this.cameraFrustum),
              this.viewShadowMap.destroy(),
              this.cameraFrustum.destroy(),
              this._createShadowMap(),
              this._getOrientation(),
              this._addCameraFrustum(),
              this._addPostProcess()
          }
        }, {
          key: "_changeViewPos",
          value: function () {
            this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.scene.primitives.remove(this.cameraFrustum),
              this.viewShadowMap.destroy(),
              this.cameraFrustum.destroy(),
              this._createShadowMap(),
              this._getOrientation(),
              this._addCameraFrustum(),
              this._addPostProcess()
          }
        }, {
          key: "_switchShow",
          value: function () {
            this.show ? !this.postProcess && this._addPostProcess() : (this.viewer.scene.postProcessStages.remove(this.postProcess),
              delete this.postProcess,
              this.postProcess = null)
          }
        }, {
          key: "activeVideo",
          value: function (t) {
            var i = this._createVideoEle(t)
              , a = this;
            if (i) {
              this.type = e.Type.Video;
              var n = this.viewer;
              this.activeVideoListener || (this.activeVideoListener = function () {
                a.videoTexture && a.videoTexture.destroy(),
                  a.videoTexture = new s.default.Texture({
                    context: n.scene.context,
                    source: i,
                    pixelFormat: s.default.PixelFormat.RGBA,
                    pixelDatatype: s.default.PixelDatatype.UNSIGNED_BYTE
                  })
              }
              ),
                n.clock.onTick.addEventListener(this.activeVideoListener)
            }
          }
        }, {
          key: "deActiveVideo",
          value: function () {
            this.viewer.clock.onTick.removeEventListener(this.activeVideoListener),
              delete this.activeVideoListener
          }
        }, {
          key: "activePicture",
          value: function (t) {
            this.videoTexture = this.texture;
            var i = this
              , a = new Image;
            a.onload = function () {
              i.type = e.Type.Image,
                i.videoTexture = new s.default.Texture({
                  context: i.viewer.scene.context,
                  source: a
                })
            }
              ,
              a.onerror = function () {
                console.log("图片加载失败：" + t)
              }
              ,
              a.src = t
          }
        }, {
          key: "activeColor",
          value: function (t) {
            var i = this;
            this.type = e.Type.Color;
            var a, n, r, o;
            t ? (a = 255 * t.red,
              n = 255 * t.green,
              r = 255 * t.blue,
              o = 255 * t.alpha) : (a = 255 * Math.random(),
                n = 255 * Math.random(),
                r = 255 * Math.random(),
                o = 255 * Math.random()),
              i.videoTexture = new s.default.Texture({
                context: i.viewer.scene.context,
                source: {
                  width: 1,
                  height: 1,
                  arrayBufferView: new Uint8Array([a, n, r, o])
                },
                flipY: !1
              })
          }
        }, {
          key: "activeText",
          value: function (t, i) {
            var a = this;
            this.type = e.Type.Text,
              t && (i = i || {},
                i.textBaseline = "top",
                this.textCanvas = s.default.writeTextToCanvas(t, i),
                a.videoTexture = new s.default.Texture({
                  context: a.viewer.scene.context,
                  source: this.textCanvas,
                  flipY: !0
                }))
          }
        }, {
          key: "locate",
          value: function () {
            var e = s.default.clone(this.cameraPosition)
              , t = s.default.clone(this.position);
            if (this.viewer.camera.position = e,
              this._dirObj)
              return this.viewer.camera.direction = s.default.clone(this._dirObj.direction),
                this.viewer.camera.right = s.default.clone(this._dirObj.right),
                void (this.viewer.camera.up = s.default.clone(this._dirObj.up));
            this.viewer.camera.direction = s.default.Cartesian3.subtract(t, e, new s.default.Cartesian3(0, 0, 0)),
              this.viewer.camera.up = s.default.Cartesian3.normalize(e, new s.default.Cartesian3(0, 0, 0))
          }
        }, {
          key: "_getOrientation",
          value: function () {
            var e = this.cameraPosition
              , t = this.position
              , i = s.default.Cartesian3.normalize(s.default.Cartesian3.subtract(t, e, new s.default.Cartesian3), new s.default.Cartesian3)
              , a = s.default.Cartesian3.normalize(e, new s.default.Cartesian3)
              , n = new s.default.Camera(this.viewer.scene);
            n.position = e,
              n.direction = i,
              n.up = a,
              i = n.directionWC,
              a = n.upWC;
            var r = n.rightWC
              , o = new s.default.Cartesian3
              , l = new s.default.Matrix3
              , u = new s.default.Quaternion;
            r = s.default.Cartesian3.negate(r, o);
            var d = l;
            s.default.Matrix3.setColumn(d, 0, r, d),
              s.default.Matrix3.setColumn(d, 1, a, d),
              s.default.Matrix3.setColumn(d, 2, i, d);
            var c = s.default.Quaternion.fromRotationMatrix(d, u);
            return this.orientation = c,
              c
          }
        }, {
          key: "_createVideoEle",
          value: function (e) {
            this.videoId = "visualDomId";
            var t = document.createElement("SOURCE");
            t.type = "video/mp4",
              t.src = e;
            var i = document.createElement("SOURCE");
            i.type = "video/quicktime",
              i.src = e;
            var a = document.createElement("VIDEO");
            return a.setAttribute("autoplay", !0),
              a.setAttribute("loop", !0),
              a.setAttribute("crossorigin", !0),
              a.appendChild(t),
              a.appendChild(i),
              document.body.appendChild(a),
              this._videoEle = a,
              a
          }
        }, {
          key: "_getWinWidHei",
          value: function () {
            var e = this.viewer.scene;
            return e.canvas.clientWidth / e.canvas.clientHeight
          }
        }, {
          key: "_createShadowMap",
          value: function () {
            var e = this.cameraPosition
              , t = this.position
              , i = this.viewer.scene
              , a = new s.default.Camera(i);
            a.position = e,
              this._dirObj ? (a.direction = this._dirObj.direction,
                a.right = this._dirObj.right,
                a.up = this._dirObj.up) : (a.direction = s.default.Cartesian3.subtract(t, e, new s.default.Cartesian3(0, 0, 0)),
                  a.up = s.default.Cartesian3.normalize(e, new s.default.Cartesian3(0, 0, 0)));
            var n = s.default.Cartesian3.distance(t, e);
            this.viewDis = n,
              a.frustum = new s.default.PerspectiveFrustum({
                fov: this.fov,
                aspectRatio: this.aspectRatio,
                near: .1,
                far: 2 * n
              });
            this.viewShadowMap = new s.default.ShadowMap({
              lightCamera: a,
              enable: !1,
              isPointLight: !1,
              isSpotLight: !0,
              cascadesEnabled: !1,
              context: i.context,
              pointLightRadius: n
            })
          }
        }, {
          key: "_addCameraFrustum",
          value: function () {
            var e = this;
            this.cameraFrustum = new s.default.Primitive({
              geometryInstances: new s.default.GeometryInstance({
                geometry: new s.default.FrustumOutlineGeometry({
                  origin: e.cameraPosition,
                  orientation: e.orientation,
                  frustum: this.viewShadowMap._lightCamera.frustum,
                  _drawNearPlane: !0
                }),
                attributes: {
                  color: s.default.ColorGeometryInstanceAttribute.fromColor(new s.default.Color(0, .5, .5))
                }
              }),
              appearance: new s.default.PerInstanceColorAppearance({
                translucent: !1,
                flat: !0
              }),
              asynchronous: !1,
              show: this.debugFrustum && this.show
            }),
              this.viewer.scene.primitives.add(this.cameraFrustum)
          }
        }, {
          key: "_addPostProcess",
          value: function () {
            var e = this
              , t = u.default
              , i = e.viewShadowMap._isPointLight ? e.viewShadowMap._pointBias : e.viewShadowMap._primitiveBias;
            this.show && (this.postProcess = new s.default.PostProcessStage({
              fragmentShader: t,
              uniforms: {
                mixNum: function () {
                  return e.alpha
                },
                stcshadow: function () {
                  return e.viewShadowMap._shadowMapTexture
                },
                videoTexture: function () {
                  return e.videoTexture
                },
                _shadowMap_matrix: function () {
                  return e.viewShadowMap._shadowMapMatrix
                },
                shadowMap_lightPositionEC: function () {
                  return e.viewShadowMap._lightPositionEC
                },
                shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function () {
                  var t = new s.default.Cartesian2;
                  return t.x = 1 / e.viewShadowMap._textureSize.x,
                    t.y = 1 / e.viewShadowMap._textureSize.y,
                    s.default.Cartesian4.fromElements(t.x, t.y, i.depthBias, i.normalShadingSmooth, this.combinedUniforms1)
                },
                shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function () {
                  return s.default.Cartesian4.fromElements(i.normalOffsetScale, e.viewShadowMap._distance, e.viewShadowMap.maximumDistance, e.viewShadowMap._darkness, this.combinedUniforms2)
                },
                disViewColor: function () {
                  return e._disViewColor
                }
              }
            }),
              this.viewer.scene.postProcessStages.add(this.postProcess))
          }
        }, {
          key: "update",
          value: function (e) {
            this.viewShadowMap && e.shadowMaps.push(this.viewShadowMap)
          }
        }, {
          key: "destroy",
          value: function () {
            this.viewer.scene.postProcessStages.remove(this.postProcess),
              this.viewer.scene.primitives.remove(this.cameraFrustum),
              this._videoEle && this._videoEle.parentNode.removeChild(this._videoEle),
              this.viewer.clock.onTick.removeEventListener(this.activeVideoListener),
              delete this.activeVideoListener,
              delete this.postProcess,
              delete this.viewShadowMap,
              delete this.color,
              delete this.viewDis,
              delete this.cameraPosition,
              delete this.position,
              delete this.alpha,
              delete this._camerafov,
              delete this._cameraPosition,
              delete this.videoTexture,
              delete this.cameraFrustum,
              delete this._videoEle,
              delete this._debugFrustum,
              delete this._position,
              delete this._aspectRatio,
              delete this.url,
              delete this.orientation,
              delete this.texture,
              delete this.videoId,
              delete this.type,
              delete this.videoTexture,
              delete this.url,
              this.viewer.scene.primitives.remove(this),
              delete this.viewer
          }
        }, {
          key: "alpha",
          get: function () {
            return this._alpha
          },
          set: function (e) {
            this._alpha = e
          }
        }, {
          key: "aspectRatio",
          get: function () {
            return this._aspectRatio
          },
          set: function (e) {
            this._aspectRatio = e,
              this._changeVideoWidHei()
          }
        }, {
          key: "debugFrustum",
          get: function () {
            return this._debugFrustum
          },
          set: function (e) {
            this._debugFrustum = e,
              this.cameraFrustum.show = e
          }
        }, {
          key: "fov",
          get: function () {
            return this._camerafov
          },
          set: function (e) {
            this._camerafov = s.default.Math.toRadians(e),
              this._changeCameraFov()
          }
        }, {
          key: "cameraPosition",
          get: function () {
            return this._cameraPosition
          },
          set: function (e) {
            e && (this._cameraPosition = e,
              this._changeCameraPos())
          }
        }, {
          key: "position",
          get: function () {
            return this._position
          },
          set: function (e) {
            e && (this._position = e,
              this._changeViewPos())
          }
        }, {
          key: "videoPlay",
          get: function () {
            return this._videoPlay
          },
          set: function (e) {
            this._videoPlay = Boolean(e),
              this._videoEle && (this.videoPlay ? this._videoEle.play() : this._videoEle.pause())
          }
        }, {
          key: "params",
          get: function () {
            var t = {};
            return t.type = this.type,
              this.type == e.Type.Color ? t.color = this.color : t.url = this.url,
              t.position = this.position,
              t.cameraPosition = this.cameraPosition,
              t.fov = s.default.Math.toDegrees(this.fov),
              t.aspectRatio = this.aspectRatio,
              t.alpha = this.alpha,
              t.debugFrustum = this.debugFrustum,
              t.dirObj = this._dirObj,
              t
          }
        }, {
          key: "show",
          get: function () {
            return this.defaultShow
          },
          set: function (e) {
            this.defaultShow = Boolean(e),
              this._switchShow()
          }
        }, {
          key: "camera",
          get: function () {
            return this.viewShadowMap._lightCamera
          }
        }, {
          key: "disViewColor",
          get: function () {
            return this._disViewColor
          },
          set: function (e) {
            e && (this._disViewColor = e,
              e.a || 0 == e.a || (this._disViewColor.a = 1))
          }
        }]),
          e
      }()
    }
    , function (e, t) {
      e.exports = "\r\n\r\n\r\n\r\nuniform float mixNum;\r\nuniform sampler2D colorTexture;\r\nuniform sampler2D stcshadow; \r\nuniform sampler2D videoTexture;\r\nuniform sampler2D depthTexture;\r\nuniform mat4 _shadowMap_matrix; \r\nuniform vec4 shadowMap_lightPositionEC; \r\nuniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; \r\nuniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; \r\nuniform vec4 disViewColor;\r\nvarying vec2 v_textureCoordinates;\r\nvec4 toEye(in vec2 uv, in float depth){\r\n    vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\r\n    vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\r\n    posInCamera =posInCamera / posInCamera.w;\r\n    return posInCamera;\r\n}\r\nfloat getDepth(in vec4 depth){\r\n    float z_window = czm_unpackDepth(depth);\r\n    z_window = czm_reverseLogDepth(z_window);\r\n    float n_range = czm_depthRange.near;\r\n    float f_range = czm_depthRange.far;\r\n    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\r\n}\r\nfloat _czm_sampleShadowMap(sampler2D shadowMap, vec2 uv){\r\n    return texture2D(shadowMap, uv).r;\r\n}\r\nfloat _czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth){\r\n    return step(depth, _czm_sampleShadowMap(shadowMap, uv));\r\n}\r\nfloat _czm_shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters){\r\n    float depthBias = shadowParameters.depthBias;\r\n    float depth = shadowParameters.depth;\r\n    float nDotL = shadowParameters.nDotL;\r\n    float normalShadingSmooth = shadowParameters.normalShadingSmooth;\r\n    float darkness = shadowParameters.darkness;\r\n    vec2 uv = shadowParameters.texCoords;\r\n    depth -= depthBias;\r\n    vec2 texelStepSize = shadowParameters.texelStepSize;\r\n    float radius = 1.0;\r\n    float dx0 = -texelStepSize.x * radius;\r\n    float dy0 = -texelStepSize.y * radius;\r\n    float dx1 = texelStepSize.x * radius;\r\n    float dy1 = texelStepSize.y * radius;\r\n    float visibility = \r\n    (\r\n    _czm_shadowDepthCompare(shadowMap, uv, depth)\r\n    +_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, 0.0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, 0.0), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy1), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy1), depth) +\r\n    _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy1), depth)\r\n    ) * (1.0 / 9.0)\r\n    ;\r\n    return visibility;\r\n}\r\nvec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){\r\n    vec3 v01 = point -planeOrigin;\r\n    float d = dot(planeNormal, v01) ;\r\n    return (point - planeNormal * d);\r\n}\r\nfloat ptm(vec3 pt){\r\n    return sqrt(pt.x*pt.x + pt.y*pt.y + pt.z*pt.z);\r\n}\r\nvoid main() \r\n{ \r\n    const float PI = 3.141592653589793;\r\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\r\n    vec4 currD = texture2D(depthTexture, v_textureCoordinates);\r\n    if(currD.r>=1.0){\r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n    \r\n    float depth = getDepth(currD);\r\n    vec4 positionEC = toEye(v_textureCoordinates, depth);\r\n    vec3 normalEC = vec3(1.0);\r\n    czm_shadowParameters shadowParameters; \r\n    shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy; \r\n    shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z; \r\n    shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w; \r\n    shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w; \r\n    shadowParameters.depthBias *= max(depth * 0.01, 1.0); \r\n    vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz); \r\n    float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); \r\n    vec4 shadowPosition = _shadowMap_matrix * positionEC; \r\n    shadowPosition /= shadowPosition.w; \r\n    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) \r\n    { \r\n        gl_FragColor = color;\r\n        return;\r\n    }\r\n\r\n    shadowParameters.texCoords = shadowPosition.xy; \r\n    shadowParameters.depth = shadowPosition.z; \r\n    shadowParameters.nDotL = nDotL; \r\n    float visibility = _czm_shadowVisibility(stcshadow, shadowParameters); \r\n\r\n    vec4 videoColor = texture2D(videoTexture,shadowPosition.xy);\r\n    if(visibility==1.0){\r\n        gl_FragColor = mix(color,vec4(videoColor.xyz,1.0),mixNum*videoColor.a);\r\n    }else{\r\n        if(abs(shadowPosition.z-0.0)<0.01){\r\n            return;\r\n        }\r\n        gl_FragColor = vec4(mix(color.rgb,disViewColor.rgb,disViewColor.a),disViewColor.a);\r\n    }\r\n} "
    }
    , function (e, t, i) {
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }),
        t.Underground = void 0;
      var n = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1,
              a.configurable = !0,
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a)
          }
        }
        return function (t, i, a) {
          return i && e(t.prototype, i),
            a && e(t, a),
            t
        }
      }()
        , r = i(0)
        , o = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r);
      t.Underground = function () {
        function e(t, i) {
          a(this, e),
            this._viewer = t;
          var n = o.default.defaultValue(i, {});
          this._depth = o.default.defaultValue(n.depth, 500),
            this._alpha = o.default.defaultValue(n.alpha, .5),
            this.enable = o.default.defaultValue(n.enable, !1)
        }
        return n(e, [{
          key: "_updateImageryLayersAlpha",
          value: function (e) {
            for (var t = this._viewer.imageryLayers._layers, i = 0, a = t.length; i < a; i++)
              t[i].alpha = e
          }
        }, {
          key: "_historyOpts",
          value: function () {
            var e = {};
            e.alpha = o.default.clone(this._viewer.imageryLayers._layers[0] && this._viewer.imageryLayers._layers[0].alpha),
              e.highDynamicRange = o.default.clone(this._viewer.scene.highDynamicRange),
              e.skyShow = o.default.clone(this._viewer.scene.skyAtmosphere.show),
              e.skyBoxShow = o.default.clone(this._viewer.scene.skyBox.show),
              e.depthTest = o.default.clone(this._viewer.scene.globe.depthTestAgainstTerrain),
              this._viewer.scene.globe._surface && this._viewer.scene.globe._surface._tileProvider && this._viewer.scene.globe._surface._tileProvider._renderState && (e.blending = o.default.clone(this._viewer.scene.globe._surface._tileProvider._renderState.blending)),
              this._oldViewOpts = e
          }
        }, {
          key: "activate",
          value: function () {
            if (!this._enable) {
              this._enable = !0,
                this._historyOpts(),
                this._updateImageryLayersAlpha(this._alpha);
              var e = this._viewer;
              o.default.ExpandByDas.underEarth.cullFace = !1,
                o.default.ExpandByDas.underEarth.enable = !0,
                o.default.ExpandByDas.underEarth.enableDepth = this._depth,
                o.default.ExpandByDas.underEarth.enableSkirt = !0,
                e.scene.globe.depthTestAgainstTerrain = !0,
                e.scene.highDynamicRange = !1,
                e.scene.skyAtmosphere.show = !1,
                e.scene.skyBox.show = !1,
                e.scene.globe._surface._tileProvider && e.scene.globe._surface._tileProvider._renderState && e.scene.globe._surface._tileProvider._renderState.blending && (e.scene.globe._surface._tileProvider._renderState.blending.enabled = !0,
                  e.scene.globe._surface._tileProvider._renderState.blending.equationRgb = o.default.BlendEquation.ADD,
                  e.scene.globe._surface._tileProvider._renderState.blending.equationAlpha = o.default.BlendEquation.ADD,
                  e.scene.globe._surface._tileProvider._renderState.blending.functionSourceAlpha = o.default.BlendFunction.ONE,
                  e.scene.globe._surface._tileProvider._renderState.blending.functionSourceRgb = o.default.BlendFunction.ONE,
                  e.scene.globe._surface._tileProvider._renderState.blending.functionDestinationAlpha = o.default.BlendFunction.ZERO,
                  e.scene.globe._surface._tileProvider._renderState.blending.functionDestinationRgb = o.default.BlendFunction.ZERO)
            }
          }
        }, {
          key: "disable",
          value: function () {
            if (this._enable) {
              this._enable = !1,
                this._updateImageryLayersAlpha(this._oldViewOpts.alpha);
              var e = this._viewer;
              o.default.ExpandByDas.underEarth.cullFace = void 0,
                o.default.ExpandByDas.underEarth.enable = !1,
                o.default.ExpandByDas.underEarth.enableDepth = 0,
                o.default.ExpandByDas.underEarth.enableSkirt = !1,
                e.scene.globe.depthTestAgainstTerrain = this._oldViewOpts.depthTest,
                e.scene.skyBox.show = this._oldViewOpts.skyBoxShow,
                e.scene.highDynamicRange = this._oldViewOpts.highDynamicRange,
                e.scene.skyAtmosphere.show = this._oldViewOpts.skyShow,
                void 0 != this._oldViewOpts.blending && (e.scene.globe._surface._tileProvider._renderState.blending = this._oldViewOpts.blending)
            }
          }
        }, {
          key: "destroy",
          value: function () {
            delete this._viewer,
              delete this._alpha,
              delete this._depth,
              delete this._enable,
              delete this._oldViewOpts
          }
        }, {
          key: "alpha",
          get: function () {
            return this._alpha
          },
          set: function (e) {
            this._alpha = Number(e),
              this._enable && this._updateImageryLayersAlpha(this._alpha)
          }
        }, {
          key: "depth",
          get: function () {
            return this._depth
          },
          set: function (e) {
            this._depth = Number(e),
              this._enable && (o.default.ExpandByDas.underEarth.enableDepth = this._depth)
          }
        }, {
          key: "enable",
          get: function () {
            return this._enable
          },
          set: function (e) {
            e ? this.activate() : this.disable()
          }
        }]),
          e
      }()
    }
  ])
});
