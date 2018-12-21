# web-tboss-platform (odp)TBOSS基础服务平台

基于vue2.5+, vuex, es6, webpack4, Element UI 的工作流项目

1. ### git地址

    https://github.com/malGitHub/web-tboss-platform.git

- ### 环境
	
	node 8.9+
	
- ### 依赖安装

	npm install

- ##### 本地开发  端口:9528

	npm run dev

- ##### mock 模拟数据

	npm run mock

- ##### 生成环境打包

	npm run build

- ##### 代码检查

	npm run lint
	
- ##### 代码编写规范修复

	npm run fix
	
<br>

## 规范

<br>

 #### 结构化规范
 
 
 以此结构针对原型，模块拆分新建文件

```      
├── index.html                      入口页面
├── build                           构建脚本目录
│   ├── build-server.js                 运行本地构建服务器，可以访问构后的页面
│   ├── build.js                        生产环境构建脚本
│   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│   ├── dev-server.js                   运行本地开发服务器
│   ├── utils.js                        构建相关工具方法
│   ├── webpack.base.conf.js            wabpack基础配置
│   ├── webpack.dev.conf.js             wabpack开发环境配置
│   └── webpack.prod.conf.js            wabpack生产环境配置
├── config                          项目配置
│   ├── dev.env.js                      开发环境变量
│   ├── index.js                        项目配置文件
│   ├── prod.env.js                     生产环境变量
│   └── test.env.js                     测试环境变量
├── mock                            mock数据目录
│   └── mock.js
├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src                             项目源码目录    
│   ├── main.js                         入口js文件
│   ├── App.vue                         根组件
│   ├── components                      公共组件目录
│   │   └── title.vue
│   ├── assets                          资源目录，这里的资源会被wabpack构建
│   │   ├── css                         公共样式文件目录
│   │   ├── js                          公共js文件目录
│   │   └── img                      图片存放目录
│   ├── routes                          前端路由
│   │   └── index.js
│   ├── store                           应用级数据（state）
│   │   └── index.js
│   └── views                           页面目录
│       ├── app							业务页面
│       └── others						其他页面
├── static                          纯静态资源，不会被wabpack构建
            
```

#### vue文件方法声明顺序
 
   * components   
   * props    
   * data     
   * created
   * mounted
   * activited
   * update
   * beforeRouteUpdate
   * metods   
   * filter
   * computed
   * watch

#### 编码规范


查看 .eslint 文件，确认代码编写规范
	
1. 使用ES6风格编码源码

    定义变量使用let ,定义常量使用const
    使用export ，import 模块化
        
- 组件 props 原子化

    提供默认值
	使用 type 属性校验类型
	使用 props 之前先检查该 prop 是否存在
        
- 避免 this.$parent

- 谨慎使用 this.$refs

- 无需将 this 赋值给 component 变量
    
    vue 风格指南 [请查看](https://cn.vuejs.org/v2/style-guide/ ), jsx 编码规范[请点击](https://www.imooc.com/article/20073), es6 编写规范[请参考](https://www.jianshu.com/p/1532d94fb456)

#### 注释规范


* 单行注释
	
        普通方法一般使用单行注释 //来说明该方法主要作用
 
* 多行注释
    
    ```
	共用组件注释说明
	/**
      * 组件名称
      * @module 组件存放位置
      * @desc 组件描述
      * @author 组件作者
      * @date 2018年10月05日17:22:43
      * @param {Object} [data]    - 参数说明
      * @param {Function} [render] - 参数说明
      * @example 调用示例
      *  <WeTree :data="data" :render="renderContent"></WeTree>
      */

    ```
    