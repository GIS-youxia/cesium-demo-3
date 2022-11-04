import { addCSS } from '../../tool/helper'
import { DynamicLabel } from './DynamicLabel'

export class DomLabelDemo {
  constructor(viewer) {
    addCSS("./case/DynamicLabel/dynamicLabel.css");
    addCSS("./case/DynamicLabel/style3.css");
    new DynamicLabel(viewer, [116.4715397068917, 39.9945712104195, 9], ['位置1',"力博荣"], "style3");
    new DynamicLabel(viewer, [116.4825397068917, 39.9645712104195, 9], ['位置2', "测试"], "style3");
  }
}
