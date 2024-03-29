---
title: "Jekyll到底是什么？"
date: 2016-11-08
tag: ["jekyll"]
category: ["Web前端"]
---

在搭建本博客网站的过程中，参考了很多的资料，回顾后发现，这一路上也是从按部就班到半主动性。按照搜索到的流程按部就班地操作，总不能达到理想的效果，卡住，卡住，再卡住，分外忧伤。事情可以慢下来，但不能放弃。后来我调整战略，尝试理解Jekyll的运作原理，事情慢慢变得清晰，有条不紊。这篇文章不会涉及到详细的建站过程，而是从另一个角度，简述Jekyll到底是如何发挥“魔力”的。

### 1. 工作场所：Ruby平台
Jekyll是运行在Ruby平台上的程序，所以，最开始要搭建Jekyll的工作环境，然后再安装Jekyll工具，全部安装成功后，你就可以使用Jekyll这个强有力的工具了。


具体步骤：


  > + 安装 Ruby & Ruby Development Kit (下载网址：[Ruby官网](http://rubyinstaller.org/downloads/) )
  > + 切换到Devkit的安装目录下，然后执行 ruby dk.rb init，Edit the generated config.yml file to include installed Rubies.(一般情况下，这个文件不需要修改，直接执行下一步即可)
  > + ruby dk.rb install
  > + gem sources --add http://gems.ruby-china.org/ --remove http://rubygems.org/
  > + gem install jekyll
  > + gem install bundler

### 2. 遵守Jekyll的规矩
按规矩好办事。想要使用Jekyll，就必须遵守Jekyll的规矩，你只有按照Jekyll世界的语言、规范，它才能乖乖为你所用。都有哪些规矩：
+ 2.1 网站项目的文件结构（结构）
+ 2.2 HTML模板语言要求（模板和数据注入）

当然，具体的规矩全部都在官方文档中。

### 3. 中场反思
当你按照上述规矩，老老实实地把网站需要的全部数据都整理好后，就欠东风了。那么要怎样运行Jekyll，让它把我们准备的这些原材料，加工成真实网站呢？

### 4. 配置你的Jekyll工具
使用它，那就先配置它吧。所以，你还需要编写一个Gemfile文件。在这个文件中，需要列举你的网站项目中所有将要使用到的工具，比如jekyll，jekyll plugins等等，当然你还要提供，下载这些工具的地址，例如`http://rubygems.org`。

### 5. 使用Jekyll工具
到这里，所有的配置都搞定了。接下来就开始使用Jekyll工具，施展魔法，把我们的原始材料(符合Jekyll文档规范)加工成真实网站。运行以下步骤：


 + 5.1 bundle install
 + 5.2 bundle exec Jekyll serve


**解释：**`bundle install`之后，便把我们列举在配置文件中的工具全部安装起来（拿起我们的魔术棒）；运行`bundle exec jekyll serve`，Jekyll开始实时工作，即通过它提供的本地服务器进行本地预览（无需联网），你对文件所做的修改，都会直接反映出来，`localhost:4000`刷新后，便能看到修改后的效果。


还要继续解释一下`jekyll serve`：前台所做的各种修改，都会被后台运行的Jekyll实时地加工、“翻译”、“施展魔法”成真实网站，而且，你能够通过`localhost:4000`本地预览网站。此外，你可以和`jekyll build`做对比：`jekyll build`只是将原始材料“翻译”成真实网站（_site文件夹出现），实现`jekyll serve`的部分功能，但是不会像`Jekyll serve`那样，可以本地预览，实时加工。

### 总结
当然，上述步骤2-5.1可以通过运行`jekyll new your-website-name`命令，利用Jekyll自动生成网站结构、Gemfile预定义配置以及相关工具的安装。这也是网上大部分的流程步骤。不过，有关网站的具体内容还是要你自己探索，虽然生成的网站也是有预定义的内容的（也就是Jekyll Theme），但太过简单，你肯定不会特别满意。这里插一句话，Jekyll Theme其实就是一个完整的Website了。你如果从GitHub上fork了一个你相中的主题，只需要修改一下网站的名称等原作者相关信息后，就可以变成你的网站了。


### 结尾反思
在参考的资料中有两篇印象特别深刻，[一篇](http://jmcglone.com/guides/github-pages/)是在github上利用github提供的接口原生态的实践jekyll的全部步骤。这篇很基础，给我提供了别样的思路，让我能够深入地思考jekyll的运作原理。[另外一篇](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)是传授我们如何利用GitHub上的Jekyll Theme快速搭建自己的博客网站，让我更进一步理解Jekyll文件的编写、HTML模板语法的使用等，让我渐渐不再对Jekyll感到束手无策、毫无头绪，不会再有那种它就是我眼前，却远在天边的感觉。


