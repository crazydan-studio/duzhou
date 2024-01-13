import { BezierEdge, BezierEdgeModel } from '@logicflow/core';

class FlowLinkModel extends BezierEdgeModel {
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    style.strokeWidth = 2;
    style.stroke = this.isSelected ? '#ff7f0e' : '#000';
    return style;
  }
}
class FlowLink extends BezierEdge {}

export default {
  type: 'flow-link',
  view: FlowLink,
  model: FlowLinkModel
};
