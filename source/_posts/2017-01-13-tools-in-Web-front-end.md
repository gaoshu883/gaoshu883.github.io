---

title: "Web前端工具分类"
date: 2017-01-13
category: ["随笔"]
---

Web前端开发技术不断发展，各种库、框架、模块管理、模块加载、构建工具层出不穷，然而对于初入Web深山的我来说，简直乱作一团。因为没有实际应用，往往分不清什么是库、什么是框架，构建工具是干什么的？模块为什么需要管理？加载又是怎么一回事。这些概念，会随着不断扩展学习和实际应用而变得清晰有形，但在此之前，先根据网上资料对这些概念有个大概的了解吧。


* **前端UI框架**：Bootstrap、FrozenUI等。
* **前端JavaScript框架**：Reactjs，Vuejs，Angularjs，Backbonejs等（为了开发复杂的页面应用）；Reactjs，Vuejs都是view层，是库，不是完整的框架。
* **前端工具（功能）库**：jQuery、Zepto、Underscore、Lodash等。
* **前端构建工具(Task runner)**：Gulp、Grunt、npm scripts等。
* **前端模块管理器（包管理器）**：Bower、Component、npm、Yarn等。
* **前端模块化开发(Module bundler)**：Seajs / Requirejs是模块加载器(module loader)；Browserify跟模块化相关，将CommonJS格式的服务器端模块编译成浏览器脚本；Webpack包含一部分Browserify的功能，但更专注于作为构建工具。
* **JavaScript转换器(JS transpiler)**：Babel等（ES6转换成ES5）。
* **JavaScript测试工具**：Mocha、Jasmine、Jest等。

**参考资料**


* [前端模块管理器简介](http://www.ruanyifeng.com/blog/2014/09/package-management.html)
* [AweSomes——Web前端资源库](https://www.awesomes.cn/repos/Applications/Frameworks)
* [The State of Front-End Tooling 2016](https://ashleynolan.co.uk/blog/frontend-tooling-survey-2016-results)
* [npm、bower、jamjs 等包管理器，哪个比较好用？](https://www.zhihu.com/question/24414899)
* [别责怪框架：我使用 AngularJS 和 ReactJS 的经验](http://web.jobbole.com/86284/)
* [我为何放弃Gulp与Grunt，转投npm scripts](http://www.infoq.com/cn/news/2016/02/gulp-grunt-npm-scripts-part1)
