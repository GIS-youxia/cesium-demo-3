> https://www.saoniuhuo.com/article/detail-483380.html#1-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BB%8E-viewer-%E8%AE%BF%E9%97%AE-entity-api



### entity 创建过程
以 `Plane` 举例。

#### 1 起点

从添加一个实体平面开始。
```js
const position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
const redPlane = viewer.entities.add(new Cesium.Entity({
  name: "Red plane with black outline",
  position: position,
  plane: {
    plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
    dimensions: new Cesium.Cartesian2(4000000.0, 3000000.0),
    material: new Cesium.ImageMaterialProperty({
      image: "./res/pic/text.png"
    })
  },
}));
```

添加过程:
```js
// viewer.entities.add()
EntityCollection.add()
  fn fireChangedEvent()
    // 触发事件
    collection._collectionChanged.raiseEvent
```

#### entity 到 Primitive的 建立
1 PlaneGeometry 的建立

```js
[Module CesiumWidget.js]
- fn startRenderLoop {

  widget.render()
    CesiumWidget._clock.tick();
      Clock.tick()
        Clock.onTick.raiseEvent();

        [Module Viewer.js]
        Viewer._onTick()
          Viewer._dataSourceDisplay.update();

          [Module DataSourceDisplay.js]
          DataSourceDisplay.update()

          [Module GeometryVisualizer.js]
          GeometryVisualizer.update()
            GeometryVisualizer._insertUpdaterIntoBatch()
              // updater 是 PlaneGeometryUpdater
              GeometryVisualizer._openMaterialBatches[shadows].add(updater);

              [Module StaticGeometryPerMaterialBatch.js]
              StaticGeometryPerMaterialBatch.add()
                batch.add(time, updater);
                  Batch.geometry.set(id, updater.createFillGeometryInstance());

                    [Module PlaneGeometryUpdater.js]
                    PlaneGeometryUpdater.createFillGeometryInstance()
                      new PlaneGeometry()
            StaticGeometryPerMaterialBatch.update()
              Batch.update()
                new Primitive()
}
```

#### 2

```js
[Module CesiumWidget.js]
CesiumWidget.render()
  CesiumWidget._scene.render()
    fn tryAndCatchError()
      fn functionToExecute()
        fn render()

          [Module Scene]
          Scene.updateAndExecuteCommands()
            fn executeCommandsInViewport()
              fn updateAndRenderPrimitives()

                [Module PrimitiveCollection.js]
                PrimitiveCollection.update();
                  primitives[i].update(frameState);
```


####

```js
// https://segmentfault.com/a/1190000041685672?utm_source=sf-similar-article

[Module Scene.js]
- fn render() {
  - Scene.updateAndExecuteCommands()
    - fn executeCommandsInViewport()
      - fn updateAndRenderPrimitives()
        - Scene._groundPrimitives.update();
          [Module PrimitiveCollection.js]
          - PrimitiveCollection.update();
            - primitives[i].update();
              [Module Primitive.js]
              Primitive.update();
}

```
