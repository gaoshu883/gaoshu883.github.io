---

title: "搭建Ajax本地开发环境"
date: 2017-02-05
category: ["Web前端"]
---

Ajax技术的目的在于实现异步请求，在不刷新整个页面的前提下，异步获取数据。

Ajax开发测试环境基于Web+数据库服务器。

搭建工具：**phpStudy**。

phpStudy，该程序集成Apache（web server程序）+PHP（开发语言）+MySQL（数据库程序）+phpMyAdmin（用PHP编写的，可以通过 web 方式控制和操作 MySQL 数据库）+ZendOptimizer。

**步骤**

我使用的是[新手版 phpStudy Lite](http://www.phpstudy.net/a.php/200.html)，没有复杂的多版本设置，下载并安装在某盘根目录下。

需安装VC9运行库，因为这款phpStudy Lite的php和apache都是VC9编译，下载地址：32位的VC9运行库下载：[http://www.microsoft.com/zh-CN/download/details.aspx?id=5582](http://www.microsoft.com/zh-CN/download/details.aspx?id=5582)，64位的VC9运行库下载：[http://www.microsoft.com/zh-CN/download/details.aspx?id=15336](http://www.microsoft.com/zh-CN/download/details.aspx?id=15336)。

phpStudy操作界面如下图所示：

![phpStudy操作界面](/images/2017-02/phpStudy1.png)

再来看一下phpStudy的目录：

![phpStudy安装目录](/images/2017-02/phpStudy2.png)

在WWW目录下创建名为ajaxdemo的Web站点：

![WWW目录下的ajaxdemo站点](/images/2017-02/ajaxdemo.png)

在浏览器地址栏输入http://localhost/ajaxdemo/，打开ajaxdemo站点。

![ajaxdemo站点文档](/images/2017-02/ajaxdemo2.png)

附注：站点文档来源：[慕课网-Ajax全接触](http://www.imooc.com/learn/250)

Ajaxdemo站点目录中保存了所有与该站点相关的文件，php文件是处理异步请求、和数据库产生交互的关键。

Ajax开发环境搭建完成，具体关于Ajax的操作请参考[慕课网-Ajax全接触](http://www.imooc.com/learn/250)。

注意：上述过程并未涉及到数据库的使用，日后学习完续更。