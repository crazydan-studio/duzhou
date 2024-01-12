import 'amis/sdk/sdk.js';

import 'amis/sdk/iconfont.css';
import 'amis/lib/helper.css';
import 'amis/lib/themes/antd.css';

export function mount(dom) {
  var amis = amisRequire('amis/embed');
  let amisJSON = {
    type: 'page',
    title: '标题',
    asideResizor: true,
    asideMinWidth: 150,
    asideMaxWidth: 400,
    remark: {
      title: '标题',
      body: '这是一段描述问题，注意到了没，还可以设置标题。而且只有点击了才弹出来。',
      icon: 'question-mark',
      placement: 'right',
      trigger: 'click',
      rootClose: true
    },
    aside: '边栏部分',
    toolbar: '工具栏',
    body: '内容部分. 可以使用 \\${var} 获取变量。如: `\\$date`: ${date}'
  };

  let amisScoped = amis.embed(
    dom,
    amisJSON,
    {},
    {
      theme: 'antd'
    }
  );
}
