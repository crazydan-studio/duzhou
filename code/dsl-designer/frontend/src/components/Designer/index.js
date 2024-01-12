import 'amis/sdk/sdk.js';
//
import 'amis/lib/themes/antd.css';
import 'amis/sdk/iconfont.css';
// 全局的类 tailwindcss 风格的原子样式
// https://baidu.github.io/amis/zh-CN/style/index
import 'amis/lib/helper.css';

import '../amis/LogicFlow';

export function mount(dom) {
  const amis = amisRequire('amis/embed');
  const amisJSON = {
    type: 'page',
    //
    asideResizor: true,
    asideMinWidth: 150,
    asideMaxWidth: 400,
    aside: '边栏部分',
    //
    bodyClassName: 'p-none',
    body: {
      type: 'logic-flow',
      graph: {
        nodes: [
          {
            id: '1',
            type: 'rect',
            x: 100,
            y: 100,
            text: '节点1'
          },
          {
            id: '2',
            type: 'circle',
            x: 300,
            y: 200,
            text: '节点2'
          }
        ],
        edges: [
          {
            sourceNodeId: '1',
            targetNodeId: '2',
            type: 'polyline',
            text: '连线'
          }
        ]
      }
    }
  };

  const amisScoped = amis.embed(
    dom,
    amisJSON,
    {},
    {
      theme: 'antd'
    }
  );
}
