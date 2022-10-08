#### 渲染过程
渲染tile流程:

```js
CesiumWidget.prototype.render (){
  this._scene.render(currentTime);
}

Scene.prototype.render(){
  render(scene);
}

function render(scene) {
  scene.updateAndExecuteCommands(passState, backgroundColor);
}

// 负责数据的调度，比如哪些Tile需要创建
Scene.prototype.updateAndExecuteCommands = function (passState,backgroundColor){
   executeCommandsInViewport(true, this, passState, backgroundColor);
}

function executeCommandsInViewport(
  firstViewport,
  scene,
  passState,
  backgroundColor
) {
  executeCommands(scene, passState);
}

function executeCommands(scene, passState) {
  // Draw 3D Tiles
  us.updatePass(Pass.CESIUM_3D_TILE);
   executeCommand(commands[j], scene, context, passState);
}

function executeCommand(command, scene, context, passState, debugFramebuffer) {
  command.execute(context, passState);
}

class DrawCommand{
  execute(context, passState){
     context.draw(this, passState);
  }
}

Context.prototype.draw = function (){
   continueDraw(this, drawCommand, shaderProgram, uniformMap);
}

function continueDraw(context, drawCommand, shaderProgram, uniformMap) {
  shaderProgram._setUniforms(
    uniformMap,
    context._us,
    context.validateShaderProgram
  );
}
```


#### 建立
```js
function render(scene) {
  scene.updateAndExecuteCommands(passState, backgroundColor);
}

Scene.prototype.updateAndExecuteCommands (){
  // executeCommandsInViewport()

  // 筛选可见集,就是把 Scene 上的计算指令、覆盖物指令，帧状态上的指令列表，根据 View 的可见范围做一次筛选，减少要执行指令个数提升性能。
  // 体来说，就是把分散在各处的指令，筛选后绑至 View 对象的 frustumCommandsList 列表中，借助 View.js 模块内的 insertIntoBin() 函数完成.
  createPotentiallyVisibleSet();
}
```

### entity 转化为 primitive
```js
[Module CesiumWidget.js]
- fn startRenderLoop{
    - widget.render();
}
```


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
