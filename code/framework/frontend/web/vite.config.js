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

import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imageInliner from 'postcss-image-inliner';

import pkg from './package.json';
import amisPkg from './node_modules/amis/package.json';

function absPath(...paths) {
  return path.join(__dirname, ...paths);
}

// https://vitejs.dev/config/#conditional-config
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue()],
    server: {
      // https://cn.vitejs.dev/config/server-options#server-proxy
      proxy: {
        '/graphql': 'http://localhost:8080'
      }
    },
    resolve: {
      // https://stackoverflow.com/questions/66043612/vue3-vite-project-alias-src-to-not-working#answer-70251354
      alias: {
        '@/': absPath('src/')
      }
    },
    css: {
      // https://cn.vitejs.dev/config/shared-options#css-postcss
      postcss: {
        plugins: [
          // https://github.com/bezoerb/postcss-image-inliner
          imageInliner({
            maxFileSize: 10240,
            b64Svg: true,
            filter: /^(background(?:-image)?)|(content)|(cursor)|(--.+-bg)/
          })
        ]
      }
    },
    build: {
      target: 'es2015',
      rollupOptions: {
        treeshake: true,
        // 指定入口脚本名称
        // https://rollupjs.org/configuration-options/#input
        // https://vitejs.dev/guide/build.html#multi-page-app
        input: {
          // main: absPath('index.html'),
          // 指定渲染引擎的构建产物名称：
          // 源文件指向 html 以用于构建可以在 html 中直接引入的 js（处理了依赖和浏览器兼容问题）
          // [`js/renderer-other-${pkg.version}`]: absPath('src/other/index.html'),
          [`js/renderer-amis-${pkg.version}`]: absPath('src/amis/index.html')
        },
        output: {
          // 入口脚本的位置
          entryFileNames: '[name].js',
          // 各个依赖模块独立打包，并放在 js 目录下
          chunkFileNames: 'js/[name].js',
          manualChunks(id) {
            const libs = [
              'amis-editor',
              'monaco-editor',
              'tinymce',
              'codemirror',
              'froala-editor',
              'exceljs',
              'xlsx',
              'office-viewer',
              'ant-design-vue'
            ];
            for (let lib of libs) {
              if (id.includes('node_modules/' + lib + '/')) {
                return 'lib/' + lib;
              }
            }

            function include_any(libs) {
              for (let lib of libs) {
                if (id.includes('/node_modules/' + lib + '/')) {
                  return true;
                }
              }
              return false;
            }

            if (include_any(['echarts', 'zrender'])) {
              return 'lib/' + 'echarts';
            }

            if (
              include_any([
                'amis',
                'amis-ui',
                'amis-formula',
                'amis-core',
                'video-react'
              ])
            ) {
              return 'lib/' + `${amisPkg.name}-${amisPkg.version}`;
            }
          }
        }
      }
    }
  };
});
