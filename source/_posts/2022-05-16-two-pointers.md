---
title: 相向双指针算法
date: 2022-05-16
tag: ['双指针']
category: ['算法']
top: true
summary: 双指针算法是原地算法，时间复杂度是O(n)，不使用额外的空间。相向双指针常用于解决的问题类型包括 Two Sum、Partition 等。
---

## 双指针

双指针算法常用于数组、字符串和链表等数据结构的搜索问题。双指针算法是原地算法，时间复杂度是`O(n)`，不使用额外的空间。根据指针的移动方向不同，又被分成：

- 相向双指针
- 同向双指针
- 背向双指针

本文的重点是`相向双指针`。

## 问题类型

相向双指针常用于解决的问题类型如下所示：

- Two Sum
- Partition
- Reverse

其中，`Two Sum` 和 `Partition` 更为常见，它们的对比分析如下表所示。

| 类型     | Two Sum                                           | Partition                            |
| -------- | ------------------------------------------------- | ------------------------------------ |
| 问题描述 | 查找满足条件的具体方案或方案数量                  | 分割数组，把相同类型的元素划分到一起 |
| 数据结构 | **有序**的数组                                    | 数组，不要求有序                     |
| 变形     | 三数之和、四数之和、k 数之和<br>三角形个数<br>... | 分割成三组、k 组...                  |

## Two Sum

两数之和

### 算法模板

```python
def two_sum(nums, target):
    if not nums:
        return [-1, -1]

    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total < target:
            left += 1
        elif total > target:
            right -= 1
        else:
            return [left, right]

    return [-1, -1]
```

### LintCode 练习题

- [56 简单](https://www.lintcode.com/problem/56/)
- [607 简单](https://www.lintcode.com/problem/607/)
- [57 中等](https://www.lintcode.com/problem/57/)
- [58 中等](https://www.lintcode.com/problem/58/)
- [382 中等](https://www.lintcode.com/problem/382/)

### 哈希表解法

```python
def two_sum(nums, target):
    hash = {} # 缓存等待成对的 value-index 映射

    for i in range(len(nums)):
        if target - nums[i] in hash:
            return [hash[target - nums[i]], i]
        hash[nums[i]] = i

    return [-1, -1]
```

### 算法复杂度

`Two Sum` 变形题中求解具体方案的算法复杂度如下表所示：

| 题型              | 独立随机变量数 | 求具体方案的算法复杂度 |
| ----------------- | -------------- | ---------------------- |
| x+y = a, a 是常数 | 1              | O(n)                   |
| x+y+z = 0         | 2              | O(n^2)                 |
| w+x+y+z = 0       | 3              | O(n^3)                 |
| x+y > z           | 3              | O(n^3)                 |

## Partition

`partition` 算法用于分割数组，有些时候只是解决另一个问题的其中一步。比如在“交错正负数”里，可以先用`partition` 把数组划分成正、负两部分，然后再交换。又比如在“快速排序”中，`partition` 划分数组是其核心步骤。

### 算法模板

```python
def partition(nums, target):
    '''
    将 nums 分割成 <= target 和 > target 两部分
    '''
    left, right = 0, len(nums) - 1
    while left <= right:
        while left <= right and nums[left] <= target:
            left += 1
        while left <= right and nums[right] > target:
            right -= 1
        if left <= right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
```

### LintCode 练习题

- [373 简单](https://www.lintcode.com/problem/373/)
- [49 中等](https://www.lintcode.com/problem/49/)
- [144 中等](https://www.lintcode.com/problem/144/)
- [148 中等](https://www.lintcode.com/problem/148/)
- [143 中等](https://www.lintcode.com/problem/143/)
