/*
 * 渡舟平台 - 致力于构建自运维、自监控、可演化的全功能型应用平台
 * Copyright (C) 2024 Crazydan Studio <https://studio.crazydan.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.
 * If not, see <https://www.gnu.org/licenses/lgpl-3.0.en.html#license-text>.
 */

import 'amis/sdk/sdk.js';
//
import 'amis/lib/themes/antd.css';
import 'amis/sdk/iconfont.css';
// 全局的类 tailwindcss 风格的原子样式
// https://baidu.github.io/amis/zh-CN/style/index
import 'amis/lib/helper.css';

const amis = amisRequire('amis/embed');

export function mount(dom) {
  const amisJSON = {
    type: 'app',
    brandName: '渡舟平台',
    logo: '/logo.svg',
    onEvent: {
      init: {
        actions: [
          {
            // https://baidu.github.io/amis/zh-CN/docs/concepts/event-action#%E8%87%AA%E5%AE%9A%E4%B9%89-js
            actionType: 'custom',
            // 构造可执行的函数体，在函数体内可引用 context,doAction,event
            script: `(${(() => {
              document.body.classList.add('done');
            }).toString()})()`
          }
        ]
      }
    },
    pages: [
      {
        label: '分组1',
        children: [
          {
            label: '父页面',
            url: '/parent',
            children: [
              {
                label: '子页面',
                url: 'pageA',
                schema: {
                  type: 'page',
                  title: 'Page A'
                }
              }
            ]
          }
        ]
      }
    ]
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
