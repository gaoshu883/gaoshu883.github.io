---
title: 哈希表精华总结
date: 2022-07-10
tag: ['哈希表']
category: ['算法']
summary: 
---

哈希表是以 `key:value` 形式存储数据的数据结构，以 O(1) 的时间复杂度实现增删改查。哈希表的存储过程如下图所示：

![哈希表原理示意图](/images/2022-07-10/hash-table.png)

哈希表的底层是列表，key 通过哈希函数转换到列表的索引，对应的索引位中存储了 value，而这个索引也叫做哈希值。

## 哈希函数的算法实现
```python
def hash_code(key, hash_size):
    '''
    @param key: 要被hash的字符串
    @param hash_size: 哈希表的长度
    '''
    ans = 0
    for x in key:
        ans = (ans * 33 + ord(x)) % hash_size
    return ans
```
## 哈希表的应用

哈希表一般用于构造各类复杂的数据结构，比如文本重点介绍的 LRU 算法。

### LRU
LRU (Least Recently Used) 最近最少使用，是一种页面置换算法，用于操作系统的内存管理。一些内存数据库，例如 Redis 会将该算法用作缓存淘汰策略。之所以 LRU 热度高，是因为它的性能好，接近于最佳置换算法。

与 LRU 算法类似的一种算法叫 LFU (Least Frequently Used) 最少访问算法。LRU 是时间维度上的度量，长时间没用到的数据优先考虑淘汰；而 LFU 是统计度量，使用次数最少的数据优先考虑淘汰。

Python 中提供的 OrderedDict 数据类型可便于 LRU 算法的实现。OrderedDict 是 dict 子类，它保留了 `key:value` 插入字典的顺序。当更新某个 key 对应的 value 时，默认不会更新键值对的位置，可利用 `move_to_end` 方法手动将修改的键值对移动到最后。最后，可利用 `popitem` 方法按照“先进先出”或“后进先出”的规则删除键值对。

## LintCode 练习题
+ [128 简单](https://www.lintcode.com/problem/128/)
+ [685 中等](https://www.lintcode.com/problem/685/)
+ [960 中等](https://www.lintcode.com/problem/960/)
+ [657 中等](https://www.lintcode.com/problem/657/)
+ [134 困难](https://www.lintcode.com/problem/134/)
