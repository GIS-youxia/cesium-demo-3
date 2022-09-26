|-------- Cesium3DTileset
              |------------- Cesium3DTile
                               |---------------- Cesium3DTileContent
                                                      |------------------- Model

https://blog.csdn.net/baidu_38621657/article/details/113799834

```js
// 一个3D Tiles 瓦片集，用于流式传输海量异构 3D 地理空间数据集。
class Cesium3DTileset{
    // 根瓷砖。
  root:Cesium3DTile;
}


// 瓷砖
class Cesium3DTile{
  content : Cesium3DTileContent|Model3DTileContent
}

class Cesium3DTileContent{
  _model: Model
}

class Model3DTileContent{
    get featuresLength () {
      const model = this._model;
      const featureTables = model.featureTables;
      const featureTableId = model.featureTableId;

      if (defined(featureTables) && defined(featureTables[featureTableId])) {
        return featureTables[featureTableId].featuresLength;
      }

      return 0;
    },
  },
}

class Model{
  featureTables
}
```
