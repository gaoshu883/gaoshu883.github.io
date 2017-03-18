/* !
 功能：生成博客目录的JS工具
 作者：孤傲苍狼
 日期：2014-5-11
 来源：http://www.cnblogs.com/xdp-gacl/p/3718879.html
*/
var BlogDirectory = {
  /*
      获取元素位置，距浏览器左边界的距离（left）和距浏览器上边界的距离（top）
  */
  getElementPosition: function(ele) {
    var topPosition = 0;
    var leftPosition = 0;
    while (ele) {
      topPosition += ele.offsetTop;
      leftPosition += ele.offsetLeft;
      ele = ele.offsetParent;
    }
    return { top: topPosition, left: leftPosition };
  },

  /*
  获取滚动条当前位置
  */
  getScrollBarPosition: function() {
    var scrollBarPosition = document.body.scrollTop || document.documentElement.scrollTop;
    return scrollBarPosition;
  },

  /*
  移动滚动条，finalPos 为目的位置，internal 为移动速度
  */
  moveScrollBar: function(finalpos, interval) {

    //若不支持此方法，则退出
    if (!window.scrollTo) {
      return false;
    }

    //窗体滚动时，禁用鼠标滚轮
    window.onmousewheel = function() {
      return false;
    };

    //清除计时
    if (document.body.movement) {
      clearTimeout(document.body.movement);
    }

    var currentpos = BlogDirectory.getScrollBarPosition(); //获取滚动条当前位置

    var dist = 0;
    if (currentpos == finalpos) { //到达预定位置，则解禁鼠标滚轮，并退出
      window.onmousewheel = function() {
        return true;
      };
      return true;
    }
    if (currentpos < finalpos) { //未到达，则计算下一步所要移动的距离
      dist = Math.ceil((finalpos - currentpos) / 10);
      currentpos += dist;
    }
    if (currentpos > finalpos) {
      dist = Math.ceil((currentpos - finalpos) / 10);
      currentpos -= dist;
    }

    var scrTop = BlogDirectory.getScrollBarPosition(); //获取滚动条当前位置
    window.scrollTo(0, currentpos); //移动窗口
    if (BlogDirectory.getScrollBarPosition() == scrTop) //若已到底部，则解禁鼠标滚轮，并退出
    {
      window.onmousewheel = function() {
        return true;
      };
      return true;
    }

    //进行下一步移动
    var repeat = "BlogDirectory.moveScrollBar(" + finalpos + "," + interval + ")";
    document.body.movement = setTimeout(repeat, interval);
  },

  htmlDecode: function(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  },

  /**
   * 创建博客目录，
   * 传入对象字面量
   * {string}id - 表示包含博文正文的 div 容器的 id
   * {string}mt, {string}t - 分别表示主标题和次级标题的标签名称（如 H2、H3，大写或小写都可以！），
   * {number}interval - 表示移动的速度
   * {boolean}insertPost - 是否将博客目录插入博客正文最前面，默认为false
   **/
  createBlogDirectory: function(options) {
    var id = options.id,
        mt = options.mt,
        st = options.st,
        interval = options.interval,
        insertPost = options.insertPost || false;
    //获取博文正文div容器
    var elem = document.getElementById(id);
    if (!elem) return false;
    //获取div中所有元素结点
    var nodes = elem.getElementsByTagName("*");
    //创建博客目录的div容器
    var divBlogCatalog = document.createElement('DIV');
    divBlogCatalog.className = 'blog-catalog';
    divBlogCatalog.setAttribute('id', 'blogCatalog');
    var divBlogCatalogTab = document.createElement('DIV');
    divBlogCatalogTab.setAttribute('id', 'blogCatalogTab');
    divBlogCatalog.appendChild(divBlogCatalogTab);
    var h3 = document.createElement('H3');
    divBlogCatalogTab.appendChild(h3);
    var txt = document.createTextNode('目录');
    h3.appendChild(txt);
    var divBlogCatalogContents = document.createElement('DIV');
    // divBlogCatalogContents.style.display = 'none';
    divBlogCatalogContents.setAttribute('id', 'blogCatalogContents');
    divBlogCatalog.appendChild(divBlogCatalogContents);
    //创建自定义列表
    var dlist = document.createElement("dl");
    divBlogCatalogContents.appendChild(dlist);
    var num = 0; //统计找到的mt和st
    mt = mt.toUpperCase(); //转化成大写
    st = st.toUpperCase(); //转化成大写
    //遍历所有元素结点
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName == mt || nodes[i].nodeName == st) {
        //获取标题文本
        var nodetext = nodes[i].innerHTML.replace(/<\/?[^>]+>/g, "");
        //innerHTML里面的内容可能有HTML标签，所以用正则表达式去除HTML的标签
        nodetext = nodetext.replace(/&nbsp;/ig, ""); //替换掉所有的&nbsp;
        nodetext = BlogDirectory.htmlDecode(nodetext);
        //插入锚
        nodes[i].setAttribute("id", "blogTitle" + num);
        var item;
        switch (nodes[i].nodeName) {
          case mt: //若为主标题
            item = document.createElement("dt");
            break;
          case st: //若为子标题
            item = document.createElement("dd");
            break;
        }

        //创建锚链接
        var itemtext = document.createTextNode(nodetext);
        item.appendChild(itemtext);
        item.setAttribute("name", num);
        item.onclick = function() { //添加鼠标点击触发函数
          var pos = BlogDirectory.getElementPosition(document.getElementById("blogTitle" + this.getAttribute("name")));
          if (!BlogDirectory.moveScrollBar(pos.top, interval)) return false;
        };

        //将自定义表项加入自定义列表中
        dlist.appendChild(item);
        num++;
      }
    }

    if (num === 0) return false;

    // 根据不同的请求，将博客目录插入到博客正文最前面或文档最后面
    if (insertPost) {
      elem.insertBefore(divBlogCatalog, elem.firstChild);
    } else {
      document.body.appendChild(divBlogCatalog);
    }
  }
};

