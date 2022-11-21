// https://gis.daspatial.com/page/functionExamples/cesium-example/48_fly_timeinfo.html
#### cesium中限制地图浏览范围
方法1
```js
//限制地图浏览范围
    //限制镜头高度
    viewer.scene.screenSpaceCameraController.maximumZoomDistance =200000;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 10;

    viewer.scene.preRender.addEventListener(function() {
    	//计算镜头范围方法，该方法会计算当前镜头地理坐标（弧度）范围并返回west,east,north,south 4个范围参数

        let rectangle = viewer.camera.computeViewRectangle();

        //设置可浏览经纬度范围
        let Range = {west:100.111111,north:25.11111,east:105.11111,south:28.111111};

        //地理坐标（弧度）转经纬度坐标
        // 弧度转为经纬度，west为左（西）侧边界的经度，以下类推
        let west =rectangle.west / Math.PI * 180;
        let north = rectangle.north / Math.PI * 180;
        let east = rectangle.east / Math.PI * 180;
        let south = rectangle.south / Math.PI * 180;

        //如果视角超出设置范围则跳转视角
        if(west < Range.west || north < Range.north || east > Range.east || south > Range.south){
            //console.log("跳转视角");
            viewer.scene.camera.setView({
                destination: new Cesium.Cartesian3(-1264160.070654434, 5665789.912013389, 2654915.919083717),
                orientation: {
                    heading: 0.16290833989833153,
                    pitch: -0.43768116366765275,
                    roll: 6.283129299301802
                }
            });
        }
     )};
//可以选择flyto方法，飞行更流畅
```


方法2:
```js
var west = Cesium.Math.toRadians(-77.0);
var south = Cesium.Math.toRadians(38.0);
var east = Cesium.Math.toRadians(-72.0);
var north = Cesium.Math.toRadians(42.0);
//方便查看范围
var maxExtent = new Cesium.Rectangle(west, south, east, north);
viewer.entities.add({
    rectangle : {
        coordinates : maxExtent,
        fill : false,
        outline : true,
        outlineColor : Cesium.Color.WHITE
    }
});
var camera = viewer.scene.camera;
viewer.scene.screenSpaceCameraController.inertiaTranslate = 0;
viewer.clock.onTick.addEventListener(function() {
    if (viewer.scene.mode === Cesium.SceneMode.SCENE2D) {
        var topLeft = camera.pickEllipsoid(new Cesium.Cartesian2(0, 0));
        var topRight = camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth, 0));
        var bottomLeft = camera.pickEllipsoid(new Cesium.Cartesian2(0, viewer.canvas.clientHeight));
        var bottomRight = camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth, viewer.canvas.clientHeight));
        if (topLeft && topRight && bottomLeft && bottomRight) {
            topLeft = Cesium.Ellipsoid.WGS84.cartesianToCartographic(topLeft);
            topRight = Cesium.Ellipsoid.WGS84.cartesianToCartographic(topRight);
            bottomLeft = Cesium.Ellipsoid.WGS84.cartesianToCartographic(bottomLeft);
            bottomRight = Cesium.Ellipsoid.WGS84.cartesianToCartographic(bottomRight);
            var visibleExtent = Cesium.Rectangle.fromCartographicArray([topLeft, topRight, bottomLeft, bottomRight]);
            //如果不包含
            if( !(Cesium.Rectangle.contains(maxExtent,topLeft)
                &&Cesium.Rectangle.contains(maxExtent,topRight)
                &&Cesium.Rectangle.contains(maxExtent,bottomLeft)
                &&Cesium.Rectangle.contains(maxExtent,bottomRight)
            )){
                var validExtent =Cesium.Rectangle.intersection(maxExtent, visibleExtent,new Cesium.Rectangle());
                viewer.camera.setView({
                    destination: validExtent
                });
            }
        } else {
            viewer.camera.setView({
                    destination: maxExtent
                });
        }
    }
});

```



#### 相机跟随
https://jercky.top/2020/08/19/Cesium%E5%85%A5%E9%97%A8-3/
https://juejin.cn/post/6922705337938247687
https://www.cnblogs.com/2008nmj/p/15641890.html
https://blog.csdn.net/u_ZJL_FFF/article/details/113632881
https://blog.csdn.net/pyx6119822/article/details/81208151
https://blog.csdn.net/leftfist/article/details/108326679
https://blog.csdn.net/weixin_49608678/article/details/109524419
