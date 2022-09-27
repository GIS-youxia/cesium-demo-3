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
