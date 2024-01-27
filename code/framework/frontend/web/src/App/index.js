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

import '@/amis/components/Site';

const amis = amisRequire('amis/embed');

export async function mount(dom) {
  const site = await fetch('/mock/login.page.json')
    .then((resp) => resp.json())
    .then(({ data }) => data);

  amis.embed(
    dom,
    site,
    {},
    {
      theme: 'antd'
    }
  );
}
