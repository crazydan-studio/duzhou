import 'amis/sdk/sdk.js';

import LogicFlow from '@logicflow/core';
import { MiniMap, SelectionSelect, Control } from '@logicflow/extension';
//
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

// http://localhost:8888/zh-CN/docs/extend/custom-sdk#js-sdk-%E6%B3%A8%E5%86%8C%E7%BB%84%E4%BB%B6
const amisLib = amisRequire('amis');
const React = amisRequire('react');

function AmisLogicFlow(props) {
  const dom = React.useRef(null);

  React.useEffect(function () {
    const lf = new LogicFlow({
      container: dom.current,
      grid: true,
      // 深色主题背景
      // grid: {
      //   size: 20,
      //   type: 'dot',
      //   config: {
      //     color: '#55585c',
      //     thickness: 1
      //   }
      // },
      // background: {
      //   backgroundColor: '#1a1e23'
      // },
      // 画布可以拖动与选区不能同时存在
      stopMoveGraph: true,
      plugins: [MiniMap, SelectionSelect, Control]
    });

    lf.render(props.graph);

    lf.extension.miniMap.show(
      dom.current.getBoundingClientRect().width - 200,
      100
    );
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
