import * as Cesium from 'cesium';
import { addGaode, removeGaode } from '../../tool/provider';

function getTextImage(fontText) {

  const padding = 20;
  const fontSize = 200;
  const width = fontText.length * fontSize + padding;
  const height = fontSize + padding;

  var canvas = document.createElement("canvas");
  canvas.style.width = width * scale + 'px';
  canvas.style.height = height * scale + 'px';
  var scale = window.devicePixelRatio;
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext('2d')
  ctx.font = `${fontSize}px Arial`;
  ctx.textBaseline = "Alphabetic";

  // 填充文字颜色
  ctx.textAlign = "center"
  ctx.fillStyle = `#72F5F7`;
  ctx.fillText(fontText, canvas.width / 2, (canvas.height+fontSize/1.5) / 2)

  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return { image ,width,height};
}

export class TextDemo {
  constructor(viewer) {
    this.init(viewer);
    viewer.zoomTo(viewer.entities)
    // addGaode(viewer);
  }

  init(viewer) {
    const arr = {
      '哈尔滨': [126.41, 45.45],
      '齐齐哈尔': [123.54, 47.19] ,
    '牡丹江': [129.34, 44.35],
      '北安': [126.30, 48.14],
      '伊春': [128.55, 47.42],
      '鹤岗': [130.16, 47.23],
      '鸡西': [130.58, 45.17],
      '双鸭山': [131.21, 46.36],
      '北京': [116.41667, 39.91667],
      '上海市': [121.29, 31.14],
      '天津市': [117.11, 39.08],
      '重庆': [106.32, 29.32],
      '齐齐哈尔': [123.54, 47.19],
      '石家庄': [114.28, 38.02],
    }

    for (let i in arr) {
      this.addLabel(viewer, i, arr[i])
    }
  }

  addLabel(viewer, text, pos) {
    const position = Cesium.Cartesian3.fromDegrees(pos[0], pos[1]);

    const {image,width,height} = getTextImage(text);
    let entityPlane = new Cesium.Entity({
      name: 'entityPlane' + text,
      position,
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0),
        dimensions: new Cesium.Cartesian2(width * 200, height * 200),
        material: new Cesium.ImageMaterialProperty({
          image,
          transparent: true
        }),
      }
    })

    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(Math.PI, 0, 0));
    entityPlane.orientation = orientation;
    viewer.entities.add(entityPlane)
  }
}
