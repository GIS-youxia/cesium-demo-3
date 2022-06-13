### 图像瓦片渲染

#### 1、相关类和层次

```js
// 使用
const widget = new Cesium.CesiumWidget("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: "https://webst{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
        subdomains: ["01", "02", "03", "04"]
    })
});

// 内部调用
scene.globe.imageryLayers.addImageryProvider(imageryProvider);
```

```js
// 栅格图层
class UrlTemplateImageryProvider {}

// 其他图层的容器
class ImageryLayer {}

// 图片层的有序集合
class ImageryLayerCollection {
    constructor() {
        this.layerRemoved = new Event();
        this.layerMoved = new Event();
        this.layerShownOrHidden = new Event();
    }
    _update() {
        // 更新图像层的show状态
    }

    addImageryProvider(imageryProvider) {
        const layer = new ImageryLayer(imageryProvider);
        this.add(layer, index);
    }

    swapLayers() {
        collection.layerMoved.raiseEvent(temp, j, i);
    }

    // 将图层提升到集合的顶部。
    raiseToTop() {
        this.layerMoved.raiseEvent(layer, this._layers.length - 1, index);
    }

    lowerToBottom() {
        this.layerMoved.raiseEvent(layer, 0, index);
    }

    // 更新队列的投影
    queueReprojectionCommands() {
        const layers = this._layers;
        for (let i = 0, len = layers.length; i < len; ++i) {
            layers[i].queueReprojectionCommands(frameState);
        }
    }
}

// 地球表面
class Globe {
    constructor() {
        this._imageryLayerCollection = new ImageryLayerCollection();

        // QuadtreePrimitive
        this._surface = new QuadtreePrimitive({
            tileProvider: new GlobeSurfaceTileProvider({
                imageryLayers: this._imageryLayerCollection
            })
        });
    }

    get imageryLayers() {
        return this._imageryLayerCollection;
    }

    update() {
        this._surface.update();
    }

    beginFrame() {
        this._surface.beginFrame();
    }

    render() {
        this._surface.render();
    }

    endFrame() {
        this._surface.endFrame();
    }
}

/*
 * 四叉树瓦片图元
 *通过利用细节级别和剔除来渲染大量数据集。地球表面分为
 *四叉树的瓷砖，根部为大的低细节瓷砖，叶子为小的高细节瓷砖。
 *要渲染的瓷砖集是通过将瓷砖中几何误差的估计值投影到
 *估计屏幕空间误差的屏幕，以像素为单位，必须低于用户指定的阈值。
 *平铺的实际内容是任意的，并使用{@link QuadtreeTileProvider}指定。
 */
class QuadtreePrimitive {
    constructor(options) {
        // GlobeSurfaceTileProvider
        this._tileProvider = options.tileProvider;
    }

    beginFrame() {
        // Gets commands for any texture re-projections
        this._tileProvider.initialize(frameState);
    }
}

// 地球表面的四叉树图瓦片提供者
class GlobeSurfaceTileProvider {
    constructor(imageryLayers) {
        // ImageryLayerCollection
        this._imageryLayers = options.imageryLayers;

        this._imageryLayers.layerMoved.addEventListener(this._onLayerMoved);
    }

    _onLayerMoved() {
        this._layerOrderChanged = true;
        this._imageryLayersUpdatedEvent.raiseEvent();
    }

    update() {
        this._imageryLayers._update();
    }

    /**
     * 在每个渲染帧开始调用
     */
    initialize() {
        // update each layer for texture reprojection.
        this._imageryLayers.queueReprojectionCommands(frameState);
    }
}
```

**类的层次:**

```js
|--Scene;
    |--Globe
        |--QuadtreePrimitive
            |--GlobeSurfaceTileProvider
```

#### 2、单帧流程

```js
scene.render() {
   // ① globe.update()
   prePassesUpdate() -> globe.update()

   // ② globe.beginFrame();
   globe.beginFrame();

   // ③ globe.render()
   updateAndExecuteCommands() -> executeCommandsInViewport() -> updateAndRenderPrimitives() ->  globe.render()

   // ④ globe.endFrame();
   globe.endFrame();
}
```

##### 2.1 globe.update()

```js
globe.update() {
  // ①更新图像层的show状态
  GlobeSurfaceTileProvider.update();
}
```

##### 2.2 globe.beginFrame()

```js
globe.beginFrame() {
  QuadtreePrimitive.beginFrame()
}
```

### Ref

https://zhuanlan.zhihu.com/p/511339180
https://zhuanlan.zhihu.com/p/389940746
