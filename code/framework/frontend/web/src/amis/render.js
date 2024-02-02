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

import { amis, pathRegex } from '@/amis/sdk';
// https://github.com/remix-run/history/blob/dev/docs/getting-started.md
import history from 'history/hash';

import '@/amis/components/SiteLayout';

import 'amis/lib/themes/antd.css';
import 'amis/sdk/iconfont.css';
// 全局的类 tailwindcss 风格的原子样式
// https://baidu.github.io/amis/zh-CN/style/index
import 'amis/lib/helper.css';

export default async function render({ el, layout, resources }) {
  const app = (layout && (await layout(resources || []))) || {
    type: 'page',
    body: {
      type: 'tpl',
      tpl: 'No page'
    }
  };

  const amisScoped = amis.embed(
    el,
    app,
    // https://baidu.github.io/amis/zh-CN/docs/start/getting-started#%E6%8E%A7%E5%88%B6-amis-%E7%9A%84%E8%A1%8C%E4%B8%BA
    {
      location: history.location,
      data: {},
      context: {}
    },
    {
      theme: 'antd',
      isCurrentUrl: isCurrentUrl,
      jumpTo: jumpTo,
      updateLocation: updateLocation
    }
  );

  history.listen((state) => {
    amisScoped.updateProps({
      location: state.location || state
    });
  });
}

function isCurrentUrl(to, ctx) {
  if (!to) {
    return false;
  }

  const pathname = history.location.pathname;
  const link = normalizeLink(to, {
    ...location,
    pathname,
    hash: ''
  });

  if (!~link.indexOf('http') && ~link.indexOf(':')) {
    const strict = ctx && ctx.strict;

    return pathRegex.match(link, {
      decode: decodeURIComponent,
      strict: typeof strict !== 'undefined' ? strict : true
    })(pathname);
  }

  return decodeURI(pathname) === link;
}

function updateLocation(location, replace) {
  location = normalizeLink(location);

  if (location === 'goBack') {
    return history.back();
  }
  // 目标地址和当前地址一样，不处理，免得重复刷新
  else if (
    (!/^https?\:\/\//.test(location) &&
      location === history.location.pathname + history.location.search) ||
    location === history.location.href
  ) {
    return;
  } else if (/^https?\:\/\//.test(location) || !history) {
    return (window.location.href = location);
  }

  history[replace ? 'replace' : 'push'](location);
}

function jumpTo(to, action) {
  if (to === 'goBack') {
    return history.back();
  }

  to = normalizeLink(to);
  if (isCurrentUrl(to)) {
    return;
  }

  if (action && action.actionType === 'url') {
    action.blank === false
      ? (window.location.href = to)
      : window.open(to, '_blank');
    return;
  } else if (action && action.blank) {
    window.open(to, '_blank');
    return;
  }

  if (/^https?:\/\//.test(to)) {
    window.location.href = to;
  } else if (
    (!/^https?\:\/\//.test(to) &&
      to === history.pathname + history.location.search) ||
    to === history.location.href
  ) {
    // do nothing
  } else {
    history.push(to);
  }
}

function normalizeLink(link, location = history.location) {
  if (!link) {
    return;
  }

  if (link[0] === '#') {
    link = location.pathname + location.search + link;
  } else if (link[0] === '?') {
    link = location.pathname + link;
  } else if (link[0] === '@') {
    const actionIndex = link.indexOf(':');
    const pathname = link.substring(actionIndex + 1);
    const action = link.substring(1, actionIndex);

    switch (action) {
      case 'redirect':
        if (pathname[0] === '/') {
          return window.location.origin + pathname;
        }
        return window.location.origin + window.location.pathname + pathname;
    }
  }

  const searchIndex = link.indexOf('?');
  const hashIndex = link.indexOf('#');
  let pathname = ~searchIndex
    ? link.substring(0, searchIndex)
    : ~hashIndex
    ? link.substring(0, hashIndex)
    : link;
  const search = ~searchIndex
    ? link.substring(searchIndex, ~hashIndex ? hashIndex : undefined)
    : '';
  const hash = ~hashIndex ? link.substring(hashIndex) : location.hash;

  if (!pathname) {
    pathname = location.pathname;
  } else if (pathname[0] != '/' && !/^https?\:\/\//.test(pathname)) {
    const relativeBase = location.pathname;
    const paths = relativeBase.split('/');
    paths.pop();

    let m;
    while ((m = /^\.\.?\//.exec(pathname))) {
      if (m[0] === '../') {
        paths.pop();
      }
      pathname = pathname.substring(m[0].length);
    }
    pathname = paths.concat(pathname).join('/');
  }

  return pathname + search + hash;
}
