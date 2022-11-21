import * as Cesium from "cesium";

/**
   * 自定义geocoders服务
   * opensteet政治不正确，涉及国家领土边界区划勿用
   * 相关配置查看官方文档
   * https://nominatim.openstreetmap.org/ui/search.html
   */
function OpenStreetMapNominatimGeocoder() { }
OpenStreetMapNominatimGeocoder.prototype.geocode = function (input) {
  const query = `format=jsonv2&accept-language=zh&polygon_geojson=1&countrycodes=cn&q=${input}`
  const requestString = "https://nominatim.openstreetmap.org/search?" + query;
  return Cesium.Resource.fetchJson(requestString) //请求url获取json数据
    .then(function (results) {
      let bboxDegrees;
      return results.map(function (resultObject) {
        bboxDegrees = resultObject.boundingbox;
        return {
          displayName: resultObject.display_name,
          destination: Cesium.Rectangle.fromDegrees(
            bboxDegrees[2],
            bboxDegrees[0],
            bboxDegrees[3],
            bboxDegrees[1]
          ),
        };
      });
    });
};

/**
 * 自定义geocoders服务，采用国内高德地图数据
 */
function AMapNominatimGeocoder() { }
AMapNominatimGeocoder.prototype.geocode = function (input) {
  const query = `key=ee24b622294b5bc659fb92fe81084776&keywords=${input}`;
  const requestString = "https://restapi.amap.com/v3/place/text?count=20&" + query;
  return Cesium.Resource.fetchJson(requestString) //请求url获取json数据
    .then(function (results) {
      return results.pois.map(function (bboxDegrees) {
        let [lng, lat] = bboxDegrees['location'].split(',')
        return {
          displayName: bboxDegrees['name'],
          destination: Cesium.Rectangle.fromDegrees(
            lng,
            lat,
            lng,
            lat,
          ),
        };
      });
    });
};

export {
  OpenStreetMapNominatimGeocoder,
  AMapNominatimGeocoder
}
