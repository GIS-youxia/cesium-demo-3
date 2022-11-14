#### 1 entity label 的建立
Label 的实例化:

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

            [Module LabelVisualizer.js]
            LabelVisualizer.update()
              label = cluster.getLabel(entity);

              [Module EntityCluster.js]
              fn createGetEntity()
                entityItem = collection.add();

                [Module LabelCollection.js]
                LabelCollection.add()
                  // Label 的实例化
                  const label = new Label(options, this);
}
```

#### 2 entity label 初始化
```js
[Module CesiumWidget.js]
CesiumWidget.render()
  CesiumWidget._scene.render()

  [Module Scene.js]
  fn tryAndCatchError()
    fn functionToExecute()
      fn render()
        Scene.updateAndExecuteCommands()
          fn executeCommandsInViewport()
            fn updateAndRenderPrimitives()

              [Module PrimitiveCollection.js]
              PrimitiveCollection.update();
                primitives[i].update(frameState);

                // 实体族
                [Module EntityCluster.js]
                EntityCluster.update()
                  EntityCluster._labelCollection.update(frameState);

                  [Module LabelCollection.js]
                  LabelCollection.update()
                    // 绘制文字内容
                    fn rebindAllGlyphs(this, label);
                      billboard = labelCollection._billboardCollection.add();
                    billboardCollection.update(frameState);

```


