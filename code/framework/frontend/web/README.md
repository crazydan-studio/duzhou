渡舟平台 Web 前端
==========================================

## 本地开发

## 开发记录

本项目使用 Vue + Vite 技术框架进行开发。

- 创建 Vite Vue 项目

```bash
npm create vite@latest \
    duzhou-web \
    -- --template vue
```

> 需在 `package.json` 显式配置 `"type": "module"`
> 以支持 [ESM](https://juejin.cn/post/7169581968336617485)
> 模块导入/导出语法。

- 安装依赖

```bash
npm install
```

- 启动开发服务

```bash
npm run dev
```

- 安装第三方依赖和插件

```bash
npm install \
    amis@6.0.0
```

## 参考

- 开发工具组合：[VS Code](https://code.visualstudio.com/)
  - [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
  - [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vite 中文文档](https://cn.vitejs.dev/guide/)
- [AMIS 文档](https://baidu.github.io/amis/)
