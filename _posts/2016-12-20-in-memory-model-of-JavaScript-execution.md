---
layout: post
title: "JavaScript代码执行的in-memory-model"
date: 2016-12-20
category: ["javascript"]
related: [
    "浏览器的工作原理"
]
---

如果我们能够知道JavaScript代码是如何执行的，那么就很容易理解代码，也就能够编写出更易被人理解、质量更高的代码。

执行JavaScript代码是解释器的工作，所以让我们转换一下身份，从解释器的角度出发，建立模拟JavaScript代码执行的过程模型——in-memory model。

建立的过程也即绘制in-memory model的过程，下面将根据一段代码，一步一步绘制出JavaScript代码执行的过程模型。

### 代码片段

<pre class="brush: js">
    function createFunction() {
        var result = new Array();

        for (var i = 0; i < 10; i++) {
            result[i] = function() {
                return i;
            };
        }
        return result;
    }

    var result = createFunction();
    var foo = result[0]();
</pre>

### 绘制步骤

#### 图例

>黄色——执行环境

>绿色——内存

>蓝色——作用域链

>白色表格——变量对象

#### 1. global环境

![global环境](/images/2016-12-20-in-memory/1.png)

#### 2. 全局环境中的变量对象

![全局环境中的变量对象](/images/2016-12-20-in-memory/2.png)

#### 3. keep track of values

说明：

+ 变量用来指代内存中的某数据
+ 函数一旦定义或声明，就存在一个内部属性`[[Scope]]`指向它的作用域链
+ 作用域链由词法作用域决定
+ 作用域链是数组，其中包含的是各个作用域中的变量对象
+ 只当调用函数时，才会创建函数作用域中的变量对象

![Keep Track of Values](/images/2016-12-20-in-memory/3.png)

#### 4. 调用createFunction函数

说明：


+ 函数在其执行环境中被调用（原则上如此，但是绘制的时候可以不用这样，因为this指向函数执行环境对象）
+ 函数被调用时，创建变量对象，并为其中存储的数据开辟内存空间
+ 全局变量result中存放的是被返回的函数：闭包

![调用createFunction函数](/images/2016-12-20-in-memory/4.png)

#### 5. 调用result[0]函数

说明：

+ 首先明确，result[0]为函数，当函数作为数组的元素或者对象的方法而调用，这时叫做函数作为方法的调用，这个时候，this指向数组或对象，也即函数执行环境对象
+ result[0]函数体中的语句是`return i;`，执行这句语句时，即进行变量查询
+ 变量查询根据函数的作用域链进行
+ 在createFunction函数的变量对象中找到`i`，得到其中存储的数据

![调用result[0]函数](/images/2016-12-20-in-memory/5.png)



