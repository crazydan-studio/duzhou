import 'amis/sdk/sdk.js';

import LogicFlow from '@logicflow/core';
import { MiniMap, SelectionSelect, Control } from '@logicflow/extension';
//
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

import FlowLink from './LogicFlow/FlowLink';
import StartNode from './LogicFlow/node/StartNode';
import FetchNode from './LogicFlow/node/FetchNode';
import './LogicFlow/style.css';

// http://localhost:8888/zh-CN/docs/extend/custom-sdk#js-sdk-%E6%B3%A8%E5%86%8C%E7%BB%84%E4%BB%B6
const amisLib = amisRequire('amis');
const React = amisRequire('react');

function AmisLogicFlow(props) {
  const dom = React.useRef(null);

  React.useEffect(function () {
    const lf = new LogicFlow({
      container: dom.current,
      plugins: [MiniMap, SelectionSelect, Control],
      // 画布可以拖动与选区不能同时存在
      stopMoveGraph: true,
      grid: {
        size: 10,
        type: 'mesh',
        config: {
          color: '#eeeeee'
        }
      },
      keyboard: {
        enabled: true
      }
    });

    lf.batchRegister([FlowLink, StartNode, FetchNode]);

    lf.render(props.graph);

    // Note：通过 css 控制缩略图位置
    lf.extension.miniMap.show();
    lf.extension.selectionSelect.openSelectionSelect();
  });

  return React.createElement('div', {
    ref: dom,
    className: 'w-full h-full'
  });
}

amisLib.Renderer({
  test: /(^|\/)logic-flow/
})(AmisLogicFlow);
