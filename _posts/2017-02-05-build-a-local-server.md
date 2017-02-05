---
layout: post
title: "搭建本地Web开发环境"
date: 2017-02-05
category: ['web前端开发技能']
---

Web前端开发、测试通常需用到本地服务器，对本地服务器的需求基本上分为两种：HTTP静态服务器和Web+数据库服务器。

### 1. HTTP静态服务器

**功能：**针对静态网页测试，不需和数据库交互；

**工具：**推荐使用nodejs平台下的httpster程序；

**使用步骤：**

 + 安装nodejs，nodejs下载地址：[https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)；
 + 全局安装httpster命令行，官方地址：[https://simbco.github.io/httpster/](https://simbco.github.io/httpster/)；
 + 如果你需要nodejs平台下的httpster程序之外的程序，可以参考[这里的列表](https://gist.github.com/willurd/5720255)（包含各种开发平台下的程序），寻找适合你的静态web服务器程序。

### 2. Web+数据库服务器

**功能：**针对动态网站开发测试，能够动态生成web页面，能够和数据库交互；

**工具：**推荐使用phpstudy程序；除此之外，还可以使用XMAPP程序，但是这里推荐的phpstudy程序更加小巧方便，操作简单，容易上手。

**工具简介：**phpStudy，该程序集成Apache（web server程序）+PHP（开发语言）+MySQL（数据库程序）+phpMyAdmin（用PHP编写的，可以通过 web 方式控制和操作 MySQL 数据库）+ZendOptimizer。

**使用步骤：**具体使用步骤请参考[搭建Ajax本地开发环境](build-local-server-for-ajax-development.html#post)这篇文章。

### 3. 实现内网穿透

成功搭建本地Web开发环境后，你可能需要外网测试，比如应用PageSpeed Insight工具测试网站首屏渲染性能，此时你需要内网穿透技能，具体实现方法请参考[本地开发外网调试：httpster和ngrok](build-a-local-server.html#post)。