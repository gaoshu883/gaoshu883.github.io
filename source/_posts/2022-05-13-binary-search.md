---
title: 'Binary Search 的原理'
date: 2022-05-13
tag: ['二分法']
category: ['算法']
top: true
summary: 二分查找法背后的原理是：利用数据中的规律不断将搜索范围减半。
---

## 原理

二分查找法背后的原理是：**利用数据中的规律不断将搜索范围减半**。通常这样的规律可以是数组有序——“升序”、“单调不减”等，但也不局限于此，可扩展到数据满足一定的函数关系，比如“先升后降”、“旋转数组”等。总之，这些规律可以为查找提供线索，从而缩小搜索范围。

## 问题类型

+ 查找 target 出现的任一 index
+ 查找 >= target 的最小 index 或 value
+ 查找 <= target 的最大 index 或 value
+ 可插入 target 的 index
+ target 出现的次数

## 算法模板

```python
def binary_search(nums, target):
    if not nums:
        return -1

    start, end = 0, len(nums) - 1
    while start + 1 < end:
        mid = (start + end) // 2
        if nums[mid] < target:
            start = mid
        else:
            end = mid

    if nums[start] == target:
        return start
    if nums[end] == target:
        return end

    return -1
```
上述[算法模板](https://github.com/ninechapter-algorithm/linghu-algorithm-templete)巧妙运用了 `start + 1 < end` 的循环条件，确保程序不会出现死循环，因为很多时候会因为**临界点的判断**而出现问题。循环结束后，再根据`[start, end]`区间端点的数值进行取舍，最后还要注意 fallback 的取值，不同类型的问题，fallback 不同，比如模版这里的 -1，表示没有找到 target。

## LintCode 练习题

+ [14 简单](https://www.lintcode.com/problem/14/)
+ [460 中等](https://www.lintcode.com/problem/460/)
+ [585 中等](https://www.lintcode.com/problem/585/)
+ [159 中等](https://www.lintcode.com/problem/159/)
+ [62 中等](https://www.lintcode.com/problem/62/)
+ [75 中等](https://www.lintcode.com/problem/75/)
+ [183 困难](https://www.lintcode.com/problem/183/)
