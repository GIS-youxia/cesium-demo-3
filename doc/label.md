#### entity label 的建立
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

#### 2
Scene.js 模块内的 render 函数会将控制权交给 WebGL，执行 CesiumJS 自己封装的指令对象，画出每一帧来。

模块内的 render 函数首先会更新一批状态信息，譬如帧状态、雾效、Uniform 值、通道状态、三维场景中的环境信息等，然后就开始更新并执行指令，调用的是 Scene 原型链上的 updateAndExecuteCommands 方法。

```js
[Module CesiumWidget.js]
CesiumWidget.render()
  CesiumWidget._scene.render()
    fn tryAndCatchError()
      fn functionToExecute()
        fn render()

          [Module Scene.js]
          Scene.updateAndExecuteCommands()
            fn executeCommandsInViewport()
              fn updateAndRenderPrimitives()

                [Module PrimitiveCollection.js]
                PrimitiveCollection.update();
                  primitives[i].update(frameState);

                  [Module EntityCluster.js]
                  EntityCluster.update()
                    EntityCluster._labelCollection.update(frameState);

                    [Module LabelCollection.js]
                    LabelCollection.update()
                      fn rebindAllGlyphs(this, label);
                        billboard = labelCollection._billboardCollection.add();
                      billboardCollection.update(frameState);

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
