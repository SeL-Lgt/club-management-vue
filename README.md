# club-management-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### 项目结构

```text
    | -- dist                                                      // 打包目录
    | -- public													   // 静态资源
    | -- src                                                       // 源码目录
    |    | -- api                                                  // API接口
    |    | -- utils                                                // 工具函数存放位置
    |    | -- layout                                               // 全局 layout
    |    | -- router                                               // 路由
    |    | -- store                                                // 全局 store管理
    |    | -- styles                                               // 全局样式
    |    | -- assets                                               // 主题 字体等静态资源
    |    |    | -- images                                          
    |    |    | -- css
    |    | -- views                                                // 页面视图
    |    |    | -- common                                          // 全局组件(头部、导航栏等)
    |    |    | -- pages                                           // 模块目录。里面的文件夹用 大驼峰 命名
    |    |    |    | -- home                                       // 系统首页模块
    |    |    |    | -- login2Register                             // 登录注册模块
    |    |    |    | -- information                                // 个人信息模块
    |    |    |    | -- personnel                                  // 人员管理模块
    |    |    |    | -- activity                                   // 活动管理模块
    |    |    |    | -- photo                                      // 相册管理模块
    |    |    |    | -- affairs                                    // 事务管理模块
    |    |    |    | -- funding                                    // 经费管理模块
    |    |    |    | -- frontInterface                             // 前台界面管理模块
    |    | -- App.vue                                              // 页面入口文件
    |    | -- main.js                                              // 程序入口文件，加载各种公共组件
    | -- package.json                                              // 项目及工具的依赖配置文件
    | -- README.md                                                 // 说明
```

