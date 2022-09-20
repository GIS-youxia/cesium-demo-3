```js
class Viewer {
  // 地球上呈现的图像图层的集合。
  imageryLayers:ImageryLayerCollection;

  // 场景
  scnen:Scene;

  // 数据源
  dataSources : DataSourceCollection;

  // UI组件
  cesiumWidget : CesiumWidget;

  // 相机
  camera : Camera;

  // 三维实体
  entities : EntityCollection
}

```


```js
class DataSourceCollection {
 DataSource
}
```

```js
class DataSource{
  entities: EntityCollection
}
```

```js
class Scene{
  // 图元集合
  primitives

  // 地球
  globe
}

class Globe{
  // 椭球
  ellipsoid
}
```
