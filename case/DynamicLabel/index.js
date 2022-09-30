import { addCSS } from '../../tool/helper'
import { DynamicLabel } from './DynamicLabel'

export class DomLabelDemo {
  constructor(viewer) {
    addCSS("./case/DynamicLabel/dynamicLabel.css");
    new DynamicLabel(viewer, [116.4715397068917, 39.9945712104195, 9], ['位置1',"point 1"], "style2");
    new DynamicLabel(viewer, [116.4825397068917, 39.9645712104195, 9], ['位置2', "point 2"], "style2");
  }
}
