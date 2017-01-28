---
layout: post
title: "利用Jekyll和GitHub Pages搭建静态博客网站"
date: 2017-01-12
category: ['jekyll', 'github']
---

网站刚建成那会儿，写过一篇建站后感 *[Jekyll到底是什么？](https://lu3xiang.top/jekyll/github/2016/11/08/Jekyll到底是什么？.html)*，文章部分涉及如何利用Jekyll搭建个人博客，但主要还是抒发建站感想的。而现在这篇文章，则是完全围绕如何建站，希望按照这篇文章能够原样创建一个博客网站。

### 1. 网站基础

**何为网站**：网页的集合

**网站的组成要素**：客户端、服务器端、网页、传输

**各组成要素职责**：


* 客户端：显示网页
* 服务器端：存储网页
* 网页：呈现信息
* 传输：网页的转移（信息的传输）

**何为静态网站**：网页事先编写好后存储在服务器端

**何为动态网站**：网页由服务器动态产生

**何为Jekyll**：帮助我们快速搭建静态网站，快速是指不用编写复杂的网页，只需会写markdown文档即可（当然你完全可以自己编写网站样式、添加必要的前端交互效果）

**目标**：将网站托管在github上，然后借助Jekyll快速搭建静态网站

### 2. 使用GitHub Pages服务

在GitHub上创建存放网站全部数据的仓库：


* 在GitHub上创建一个名为username.github.io的仓库，username是你的GitHub用户名
* 为便于本地操作，通过git clone，把这个仓库克隆到本地硬盘上
* 当然，你完全可以在GitHub网页上直接操作

**参考资料**


* [GitHub Pages官方网站](https://pages.github.com/)

### 3. 使用Jekyll

Jekyll是运行在Ruby平台上的程序，所以：


* 首先搭建Jekyll工作环境
* 然后安装Jekyll工具
* 全部安装成功后，使用Jekyll工具

#### 3.1 搭建Jekyll工作环境
提前说明：下述步骤基于window10系统


  1. 安装 Ruby & Ruby Development Kit (下载网址：[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/) )
  2. 切换到Devkit的安装目录下，然后执行 `ruby dk.rb init`
  3. `ruby dk.rb install`
  4. `gem sources --add http://gems.ruby-china.org/ --remove http://rubygems.org/`
  5. `gem install jekyll`
  6. `gem install bundler`

**注释**


* dk.rb我认为是devkit ruby的缩写
* DevKit 是windows平台下编译和使用本地C/C++扩展包的工具。它就是用来模拟Linux平台下的make, gcc, sh来进行编译
* DevKit 与gem的安装和更新有关，也就是说dk.rb的初始化和安装与gem有关
* 修改gem下载源地址是为了避免出现SSL问题
* `gem install jekyll bundler`是同时安装jekyll和bundler的指令
* 安装bundler是为了运行jekyll，直接运行`jekyll`可能会报错，通过`bundle exec jekyll`正常执行
* 到此，环境已经搭建完成

#### 3.2 利用Jekyll建站（快速上手版）
1. 切换至username.github.io目录下
1. `jekyll new .`
1. 打开Gemfile配置文件，添加`gem 'wdm', '>= 0.1.0'`代码（如果电脑系统是windows的话，否则跳过这一步）
1. 在Gemfile中删除`gem "jekyll"`,增加`gem "github-pages"`（使用github pages服务）
1. 执行`bundle install`指令
1. `bundle exec jekyll serve`
1. 浏览博客网站：http://localhost:4000

#### 3.3 利用Jekyll建站（基础详解版）
当`jekyll new .`时，Jekyll网站自动搭建，如下所示：


    .(username.github.io)
    ├── _drafts 博文草稿
    |   ├── begin-with-the-crazy-ideas.md
    |   └── on-simplicity-in-technology.md
    ├── _includes 网页基本组件
    |   ├── footer.html
    |   └── header.html
    ├── _layouts 网页模板
    |   ├── default.html
    |   └── post.html
    ├── _posts 博文
    |   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
    |   └── 2009-04-26-barcamp-boston-4-roundup.md
    ├── _site `Jekyll build`生成的网站，在上传到github上时应忽略
    ├── css 网站样式
    |   ├── main.css
    |   └── reset.css
    ├── _config.yml 网站配置文件
    ├── index.html 网站首页
    ├── Gemfile 项目配置文件
    ├── README.md 版本项目文档
    └── .gitignore

除此之外 ，可自行按照网站目录树，手动创建所需文件。

**说明**


* `jekyll new .`自动创建的文档和上述目录树并不完全一样
* _config.yml是Jekyll网站的配置文件（内含网站相关信息，例如域名、作者、邮编、分页等等），而Gemfile是项目的配置文件（内含项目开发所需依赖项和下载源等），是利用gem进行包管理时必须的配置文件
* _layouts、_includes内文档均为html类型，采用Liquid模板语言进行编写
* 确保username.github.io仓库中的目录结构和配置文件符合[Jekyll官方文档](http://jekyllrb.com/docs/structure/)的定义和要求

当满足：


* 网站目录符合文档规范
* Gemfile配置文件完成

运行Jekyll生成网站：


1. `bundle install`
1. `bundle exec jekyll serve`
1. 浏览博客网站：http://localhost:4000

**参考资料**


* [如何在windows平台上安装jekyll](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)
* [完整RrubyGem镜像](http://gems.ruby-china.org/)
* [【总结】Jekyll搭建博客](http://blog.csdn.net/chziroy/article/details/38837715)
* [win7下安装jekyll——在github上创建自己的博客](http://www.cnblogs.com/hutaoer/archive/2013/02/06/3078873.html)
* [安装Jekyll Gem一直报Unable to download data from https://rubygems.org/的解决方案](http://sunxboy.iteye.com/blog/2171688)
* [Creating and Hosting a Personal Site on GitHub](http://jmcglone.com/guides/github-pages/)
* [Build A Blog With Jekyll And GitHub Pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)
* [Jekyll 扩展的 Liquid 设计](https://havee.me/internet/2013-11/jekyll-liquid-designers.html)

### 4. 编写Markdown文档

#### 4.1 标题
    # 一级标题
    ## 二级标题
    ### 三级标题
    ……
    ###### 六级标题
符号与标题之间**空一格**，是标准的语法表示。

**标题还可以用下面的语法**


    这是大标题
    =

    这是小标题
    -

**这里要提示：**

- 单个回车是空格
- 连续回车才是分段
- 行尾加两个空格，再回车，即可行内换行
- 头尾加*，表示斜体
- 头尾加**，表示粗体

**还要提示：**

行的开头空四个格，表示程序代码

#### 4.2 引用

>`>`表示引用

#### 4.3 列表
- 无序列表前加`-` or  `*` or `+`
- 有序列表加数字

**注意** 符号和列表项之间需要用空格分隔，就像标题的语法

#### 4.4 链接
`[]`中是你需要进行超链接的文本内容，后面紧跟着一对`()`,括号里面是URL。

我试着写了一个：

`[百度一下，你就知道](http://www.baidu.com/)`[百度一下，你就知道](http://www.baidu.com/)

图像和链接非常相似，只是在前面多加一个`!`

此外还可以以索引的形式把url都列在文章的最后，例如：

    [图灵社区][1]
    ![图灵社区logo][2]
    [1]:http://www.ituring.com.cn
    [2]:http://www.ituring.com.cn/Content/img/Turing.Gif

#### 4.5 其他
---
`---`表示一条分割线
但是，要注意：`---`之后要回车

**注释**

1. 编写Markdown文档的时候，最好每一行后面都连续回车，行内想要换行的话，就用两个空格再回车
2. Markdown语言中存在HTML文档中的行内和块的概念，使用某些Markdown标记，即使不连续回车，也是换行的效果，例如`#`标题标记；而有些标记，例如`* *`强调标记，则就是行内标记；且注意行内标记后需空一格
3. 使用Markdown编辑出来的文本，都是预制`CSS`格式，那么可以通过哪些方式修改CSS格式，美化输出的Markdown文档呢？
   （在Markdown的文档开头添加`CSS`文档链接即可）
4. 参考资料中提到`图床`的概念，是否为：Web中存储图片的地方，便于使用链接？
   （图床：就是专门用来存放图片，同时允许你把图片对外连接的网上空间，不少图床都是免费的。）
5. Markdown中可以使用html语法，例如：你想插入额外的空行，可以使用`<br>`标签。







