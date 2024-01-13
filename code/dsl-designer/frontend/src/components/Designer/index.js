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
            type: 'start-node',
            x: 200,
            y: 100,
            text: 'Start'
          },
          {
            id: '2',
            type: 'fetch-node',
            x: 400,
            y: 200,
            text: 'Fetch'
          }
        ],
        edges: [
          {
            sourceNodeId: '1',
            targetNodeId: '2',
            type: 'flow-link'
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
