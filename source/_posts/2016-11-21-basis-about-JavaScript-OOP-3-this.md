---

title: "JavaScript之OOP基础概念学习总结三：this"
date: 2016-11-21
tag: ["javascript"]
category: ["Web前端"]
---

**更新于：2017年2月20日**

### 0. 序言

关键字this是function中的一个参数，它和函数的普通参数有两点不同：


1. this不需要另取名字
2. this绑定值的方式不同（绑定值：this指向何值），一共有5种方式

### 1. 关键字this与函数调用

this：在函数调用时，指代当前函数的调用环境对象。

要充分理解this，需对函数调用深入地理解。

函数调用一共有四种方式：

+ As function 作为函数调用，或称为作为功能调用
+ As methods 作为方法调用
+ As constructors 作为构造函数调用
+ Indirectly through their call() and apply() methods 通过call和apply方法间接调用

函数的调用，离不开函数表达式。如果函数表达式是属性获取型，那么称其为方法调用表达式。属性获取型函数表达式是指函数作为对象的方法、或者作为数组的元素（函数作为数组的元素和函数作为对象的方法是同等地位的，都是函数作为方法而调用）。函数作为方法(methods) 和功能(function) 调用的不同在于调用环境的不同，即函数的调用环境对象、函数调用时this绑定的值不同，例如当函数作为数组元素而调用时，this指向数组对象。当函数作为功能调用时，不用考虑this指代何值。因为，作为功能调用的函数，相当于是全局对象的方法，this在非严格模式下绑定到global object身上，在严格模式下为undefined。

此外，this不是变量，this是关键字，它没有作用域。内部嵌套函数的this值不会继承外层壳函数的this值。此外，this不能作为变量被赋值，但是可作为常量赋值给变量。内部嵌套函数如果是作为某个对象的方法而调用，那么这个嵌套函数的this指向的就是这个对象；如果内部嵌套函数作为功能而调用，内部嵌套函数的this指向的就是全局对象（非严格模式）或者undefined（严格模式）。

举个例子说明嵌套函数中的this绑定值的问题：

<pre class="brush: js">
var o = {                              // 一个对象 o
    m: function() {                    // 对象 o 的 m 方法
        var self = this;               // o.m() 调用时, this 指代 o, 变量 self 指向 o
        console.log(this === o);       // "true"
        f();
        function f() {                 // 方法中 m 的嵌套函数 f
            console.log(this === o);   // "false": f() 作为 function 被调用，this 指代 global 或 undefine
            console.log(self === o);   // "true": self 是变量，缓存的是外层函数的 this 值
        }
    }
};
o.m();                                 // 调用 o.m 方法
</pre>

### 2. this绑定值的几种情况

function中的参数this指向何值？需明确：只有当函数被调用，JS解释器才会为this参数绑定值。

#### 2.1 当函数作为方法调用时——为this绑定值的点操作符左手边定律(dot call)

当点操作符右手边的函数作为对象的方法而调用时，如`o.m();`，点操作符左手边的对象o作为参数传入到m函数中，绑定到参数this上。


#### 2.2 如果没有点操作符，只是调用某个方法时——this绑定默认值

当没有点操作符时，也就没有左手边的对象。这种情况下，this绑定默认对象，global对象（非严格模式），或undefine（严格模式）。就像占位参数没有实际的参数传入时，会被默认的undefined值所代替一样。

#### 2.3 如果我们想把this绑定到一个对象，但是函数并不是这个对象的属性时——为this绑定其他值：函数的call方法

我们之前讨论的问题都是根据点操作符进行this参数的判断，那其实是有前提的：能使用点操作符说明函数是这个对象的属性，但是如果我们现在想把一个不是某个对象属性的函数的this绑定到这个对象，要怎么办呢？（肯定不能利用点操作符左手边绑定原则了，因为这个对象没有这个方法，因而也就无法通过点操作获取对象的这个方法）

使用函数的call方法可以重写this的默认值，从而设置成你希望的任意对象。

#### 番外：小剧场

对象A有个计算形体比例的方法`xtbl()`，非常好用。对象B知道后，也好想算算自己的形体比例，但是对象B没有这个`xtbl()`方法，也就无法计算。

对象B把自己的苦衷向对象A一顿诉说，对象A说：这个好办，我把我的`xtbl()`方法借你用就行了。

对象B破涕为笑，说：那怎么借用？

对象A说：简单，只要调用`A.xtbl.call(B,P1,P2,Array)`，你把你的身高、体重、三围的数值替换P1,P2,Array即可。

对象B一番动作后，成功算出了自己的形体比例，结果什么的不重要……不过对象B不解：怎么这么简单？这里面都发生了什么？

对象A说：`A.xtbl`表明方法是我的，然后通过`.call()`调用，将我的这个方法绑定到你的身上，同时传入方法调用时需要的基础信息，这样就可以了。

对象B：哦哦，原来是这样。

突然冒出个对象C：我也想算算形体比例...可我现在不知道自己多高、多重。

对象A：没关系，我把方法借给你，你回家量好数据再调用就可以了。

对象B：不立刻调用也行？

对象A： 是的，通过`var xtblCopy = A.xtbl.bind(B);`，C回家后，再调用`xtblCopy(P1,P2,Array);`即可。

对象B,C：哦哦。

#### 2.4 当函数作为回调函数被调用时，比如setTimeout函数中的回调函数

一开始研究函数作为setTimeout的回调函数进行调用时，只有当我们分析了setTimeout的源代码之后，才能更好地理解作为setTimeout的回调函数究竟是怎么被调用的，才能知道究竟各种参数是怎么被绑定到这个函数中的参数上的。

假设setTimeout这个函数的源代码别定义在timers.js文件中，它的内部代码如下所示：

<pre class="brush: js">
    var setTimeout = function(cb, ms) {
        waitSomehow(ms);
        cb(?);
    };

    setTimeout(o.m, 1000);  // 第 1 节中的 o.m 方法作为回调函数传入
                            // 延迟 1s 调用 o.m 方法
                            // 执行结果为：
                            //        "false": 说明 o.m 方法中的 this 不再指代对象 o
                            //        "false"
                            //        "false"
</pre>



分析：

采用内存模型分析方法，关于此方法的介绍，可参考[JavaScript代码执行的in-memory-model]()这篇文章。

cb是作为函数而调用，则其this参数、即该函数的调用环境对象为全局对象。虽然cb的函数体就是o.m的函数体，但两者的this参数值没有任何关系，this值并不是从函数体中得来，而是由函数的调用环境对象确定。

类似setImeout函数中传入函数参数存在的问题其实很常见，通过下述方法可以回调函数的this值不被重写：

<pre class="brush: js">
    setTimeout(function() {
        o.m();
    }, 1000);          // 执行结果为：
                       //       "true" : 说明 o.m 调用时，this 指向对象 o
                       //       "false"
                       //       "true"
</pre>

分析：

o.m与其函数体之间的指向关系并未发生改变。此时o.m是作为对象o的方法而调用，即函数执行的环境对象是o，即this指代对象o。

#### 番外：this如果直接出现在全局作用域中，而不是出现在functional scope中呢？

我们知道函数中的占位参数是局部变量，所以无法在全局作用域中访问到这个变量。this其实也是functional scope中的参数，也是局部变量，类比而言，我们也希望this不会在全局作用域中被访问到。但实际情况并非如此，this在全局下可以获取，为默认值Global。这点令人困惑，好在已经在高版本的标准中被移出了（chrome控制台中仍能获取，为默认值Global对象，也就是Window对象实例）。

#### 2.5 最后一种this绑定值的方式

涉及到new操作函数中，this的绑定值问题。new操作并不会影响到占位参数的值绑定问题，但是this值绑定却受到很大程度的影响。new操作会导致this绑定到构造器新创建的对象上。

### 3. 总结

关键字this的重要性在于：它是函数对象中一个重要参数，通过this参数的值绑定，就能把函数作为任何其他对象的方法进行调用（即使它不是这个对象的方法）。而且，通过this绑定不同对象，我们就能节约更多的内存，因为不需要额外的内存空间来存储方法，只要通过绑定this，就能调用其他对象的某个方法。

### 参考资料

+ [Object-Oriented JavaScript](https://cn.udacity.com/course/object-oriented-javascript--ud015)相关视频
+ JavaScript权威指南：8.2节、8.7.4节
+ [Javascript call() & apply() vs bind()?](http://stackoverflow.com/questions/15455009/javascript-call-apply-vs-bind)
+ [Different in "scope" and "context" in this Javascript code](http://stackoverflow.com/questions/14328519/different-in-scope-and-context-in-this-javascript-code)
+ [What is the Difference Between Scope and Context in JavaScript?](https://blog.kevinchisholm.com/javascript/difference-between-scope-and-context/)