### Cesium API 分类

#### 一、Provider

##### 1) 地形 (TerrainProvider)
EllipsoidTerrainProvider
CesiumTerrainProvider
VRTheWorldTerrainProvider
GoogleEarthEnterpriseTerrainProvider

##### 2) 图像 (ImageryProvider)
ArcGisMapServerImageryProvider
BingMapsImageryProvider
OpenStreetMapImageryProvider
TileMapServiceImageryProvider
GoogleEarthEnterpriseImageryProvider
GoogleEarthEnterpriseMapsProvider
GridImageryProvider
IonImageryProvider
MapboxImageryProvider
MapboxStyleImageryProvider
SingleTileImageryProvider
TileCoordinatesImageryProvider
UrlTemplateImageryProvider
WebMapServiceImageryProvider
WebMapTileServiceImageryProvider

##### 3)内部使用
QuadtreeTileProvider
MockTerrainProvider
MockImageryProvider
GlobeSurfaceTileProvider

#### 2、Widgets
##### 1) BaseLayerPickerViewModel
```js
const a = new Cesium.ProviderViewModel({
  name: '地图',
  tooltip: "haha",
  iconUrl: "",
  creationFunction: () => {
    return new Cesium.TileCoordinatesImageryProvider()
  }
})

const baseLayerPicker = new Cesium.BaseLayerPickerViewModel({
  globe: viewer.scene.globe
});

baseLayerPicker.imageryProviderViewModels.push(a)
baseLayerPicker.selectedImagery = baseLayerPicker.imageryProviderViewModels[0]
```
