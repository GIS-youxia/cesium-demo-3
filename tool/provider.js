
import * as Cesium from '../CesiumUnminified';

import { AmapMercatorTilingScheme } from './AmapMercatorTilingScheme'
export function addDebug(params) {
  viewer.imageryLayers.addImageryProvider(new Cesium.GridImageryProvider());

viewer.imageryLayers.addImageryProvider(new Cesium.TileCoordinatesImageryProvider())

}

export function addGaode(viewer) {
  // 添加高德影像
  // var gaodeImageProvider = new Cesium.UrlTemplateImageryProvider({
  //   // url: "https://webst{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
  //   // "http://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7"
  //   url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  //   subdomains: ["01", "02", "03", "04"], //多域名请求
  //   // tilingScheme: new AmapMercatorTilingScheme(),
  //   // crs: "WGS84",
  //   minimumLevel: 3,
  //   maximumLevel: 18
  // })
  // viewer.imageryLayers.addImageryProvider(gaodeImageProvider);

  // 添加高德矢量图
  var atLayer = new Cesium.UrlTemplateImageryProvider({
    url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    minimumLevel: 3,
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(atLayer);

  // 如果需要叠加高德/百度注记地图则添加以下代码
  // viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
  //   url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
  //   layer: "tdtAnnoLayer",
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "GoogleMapsCompatible",
  //      minimumLevel: 3,
  //   maximumLevel: 18
  // }));
}

// 添加天地图
export function addTinditu(viewer) {
  var provider = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=93d1fdef41f93d2211deed6d22780c48",
    layer: "tdtVecBasicLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: false
  })

  var layer = new Cesium.ImageryLayer(provider, {

  });

  viewer.imageryLayers.add(layer);
}


/**
 * 切换地图
 */
export function changeBaseMap(viewer, type) {
  viewer.imageryLayers.removeAll();
  switch (type) {
    //天地图
    case "tdt":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=93d1fdef41f93d2211deed6d22780c48",
          layer: "tdtBasicLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false,
          maximumLevel: 16
        })
      );
      break;
      //天地图矢量
    case "tdtsl":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=93d1fdef41f93d2211deed6d22780c48",
          layer: "tdtVecBasicLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      );
      break;
      //谷歌影像
    case "gg":
      var url =
        "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali";
      viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({ url: url })
      );
      break;
    case "arcgis":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
          enablePickFeatures: false
        })
      );
      break;
      //必应
    case "bing":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.BingMapsImageryProvider({
          url: "https://dev.virtualearth.net",
          key: "get-yours-at-https://www.bingmapsportal.com/",
          mapStyle: Cesium.BingMapsStyle.AERIAL
        })
      );
      break;
    case "dark":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.createTileMapServiceImageryProvider({
          url: "https://cesiumjs.org/blackmarble",
          credit: "Black Marble imagery courtesy NASA Earth Observatory",
          flipXY: true // Only old gdal2tile.py generated tilesets need this flag.
        })
      );
      break;
  }

  //全球影像中文注记服务
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=93d1fdef41f93d2211deed6d22780c48",
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false
    })
  );
  // //全球矢量中文标注服务
  // viewer.imageryLayers.addImageryProvider(
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=93d1fdef41f93d2211deed6d22780c48",
  //     layer: "tdtAnnoLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible"
  //   })
  // );
}


export function openstreetmap(viewer) {
  const url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  var provider = new Cesium.UrlTemplateImageryProvider({
    url:url,
  })
  viewer.imageryLayers.addImageryProvider(provider);
}


// 加载ArcGIS在线地图
export function arcgis(viewer) {
  viewer.imageryLayers.addImageryProvider(
    new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    })
  );

//   var esri = new Cesium.ArcGisMapServerImageryProvider({
//     url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
// });
}
