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
        '@/': absPath('./src/')
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
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks: {
            [`${pkg.name}-amis-${pkg.version}`]: ['src/amis/index.js']
          }
        }
      }
    }
  };
});
