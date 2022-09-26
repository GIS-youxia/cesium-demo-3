|-------- Cesium3DTileset
              |------------- Cesium3DTile
                               |---------------- Cesium3DTileContent
                                                      |------------------- Model

```js
// 一个3D Tiles 瓦片集，用于流式传输海量异构 3D 地理空间数据集。
class Cesium3DTileset{
    // 根瓷砖。
  root:Cesium3DTile;
}


// 瓷砖
class Cesium3DTile{
  content : Cesium3DTileContent
}

class Cesium3DTileContent{
  _model:Model
}

class Model{

}
```
