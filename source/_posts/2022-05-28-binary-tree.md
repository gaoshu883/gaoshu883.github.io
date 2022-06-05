---
title: 二叉树与分治法
date: 2022-05-28
tag: ['二叉树', '分治法', 'BST']
category: ['算法']
top: true
summary: 
---

## 二叉树
二叉树是一种天然适配分治法的数据结构，许多二叉树问题都可以使用“分而治之”的思想来解决。遇到二叉树问题，就想想**整棵树的结果与它左右子树的结果有什么关系**。

分治法天然适配“递归”程式，所以，很多分治问题都可以用递归函数实现。但递归函数不是唯一的实现方式。

### 二叉树的遍历

二叉树的遍历方式有两类、四种：
+ 深度优先遍历
  + 前序
  + 中序
  + 后序
+ 宽度优先遍历
  + 层序

![二叉树的遍历](/images/2022-05-28/1.jpg)

从图中可以看出，在深度优先遍历中，即使有前中后三种类型，但遍历的路径是一样的，不同的只是访问根节点的时机。

### 二叉树分治法模板

``` python
def divide_conquer(root):
    # 1. 递归出口
    if root is None:
        return something
    # 2. 处理左右子树
    left_result = divide_conquer(root.left)
    right_result = divide_conquer(root.right)
    # 3. 合并结果
    result = left_result + right_result + root
    
    return result
```

重点提炼：
+ 分治法的关键在于合并左右子树结果得到最终结果
+ **分治法不使用全局变量**，递归函数有返回值
+ 若使用了全局变量，说明用到了遍历法思想

### 非递归中序遍历
非递归解法是指使用栈数据结构，手动回溯，实现深度优先遍历。

```python
def inorder_traversal(root):
    if root is None:
        return []
    # 1. 创建 dummy node （虚拟节点）
    dummy = TreeNode(0)
    dummy.right = root # 很巧妙的设计
    stack = [dummy]

    inorder = []

    # 访问栈
    while stack:
        # pop -> 回溯
        # push 右子树根节点
        # push          所有的左子树（深度优先遍历右子树）
        node = stack.pop()
        if node.right:
            cur_root = node.right
            while cur_root:
                stack.append(cur_root)
                node = node.left
        if stack:
            inorder.append(stack[-1])

    return inorder
```

重点提炼：
1. 总是要一次性把左子树节点入栈，这也是深度优先的本质所在
2. 当左子树为空，通过**出栈实现回溯**，再压入右子树根节点
3. 重复步骤 1 的操作

### 最近公共祖先 (LCA)
#### 题型
+ 有父指针：找到两个点的路径，从根开始比较，最后一个相同的点是他们的 LCA
+ 无父指针：分治法。下列解法仅针对 A、B 两点一定存在的情景，如果 A、B 两点不一定存在，递归函数需要额外返回 A、B 是否存在。
```python
class Solution:
    """
    @param: root: The root of the binary tree.
    @param: A: A TreeNode in a Binary.
    @param: B: A TreeNode in a Binary.
    @return: Return the least common ancestor(LCA) of the two nodes.
    """
    def lowestCommonAncestor(self, root, A, B):
        if root is None:
            return None
        # 1. 根节点是 A or B，祖先就是 root
        if root == A or root == B:
            return root
        # 左右子树递归
        left = self.lowestCommonAncestor(root.left, A, B)
        right = self.lowestCommonAncestor(root.right, A, B)
        # 2. 左右子树分别存在A、B祖先，则 root 为 A、B 祖先
        if left and right:
            return root
        # 3. LCA 在左子树
        if left:
            return left
        # 4. LCA 在右子树
        if right:
            return right
        
        return None
```

#### 应用
`git rebase` 用到了 LCA。`git rebase`和`git merge`的功能相似，用于合并两个分支的代码，只不过相较于`merge`，使用`rebase`可以让提交历史变成一条线。`git rebase`的工作流程和原理是：
+ 假设我们处于`feature`分支，执行`git rebase master`用于合并`master`分支的代码
+ git 先找到`feature`和`master`俩分支的最近公共祖先 (LCA)
+ 将`feature`分支上 LCA 之后的 commit 以`master`为基创建新的 commit

![git rebase](/images/2022-05-28/2.jpg)


## 二叉搜索树 (BST)
性质：中序遍历有序（单调不减）

基本操作：创建、遍历、查找、插入、删除

### BST的构造
**如何从有序数组中构造平衡二叉搜索树？**

最先想到的可能是构造普通BST的方法：遍历数组，依次向树中插入节点。很明显，这样的方法会导致基于有序数组构造出来的二叉树退化为链表。为了保证平衡，左右子树的节点数量最好平分，然后这样递归下去，这棵二叉树就一定是平衡的了。所以，只需要把数组平分成两部分，确保每部分都是一棵平衡二叉树，那么最终整棵树就是平衡的。
### 插入节点
**如果这个节点的值已存在，怎么办？**

当插入一个节点，若它不和树上已有值重复，则它一定是以叶子节点的身份插入。若有重复，可以让新节点作为重复点右子树最小点的左子树（当右子树存在时）。

### BST的修剪
特别喜欢下面这个解决方案，很奇妙！
```python
class Solution:
    """
    @param root: given BST
    @param minimum: the lower limit
    @param maximum: the upper limit
    @return: the root of the new tree 
    """
    def trim_b_s_t(self, root: TreeNode, minimum: int, maximum: int) -> TreeNode:
        # write your code here
        if not root:
            return None
        
        # 之所以要修剪，是因为有满足条件的、还有不满足条件的
        # 丢弃完全不满足条件的（副作用在这里）
        if minimum <= root.val <= maximum:
            # 左右枝都得修剪
            root.left = self.trim_b_s_t(root.left, minimum, maximum)
            root.right = self.trim_b_s_t(root.right, minimum, maximum)
        elif root.val < minimum:
            # 直接丢弃左枝，同时继续修剪右枝
            root = self.trim_b_s_t(root.right, minimum, maximum)
        else:
            # 直接丢弃右枝，同时继续修剪左枝
            root = self.trim_b_s_t(root.left, minimum, maximum)
        
        return root
```
### BST上查找
这类问题和[二分查找题型](/2022/05/13/2022-05-13-binary-search/#问题类型)相似。要么是查找 target，要么是查找最接近 target 的某（几）个值。

暴力解法：先中序遍历得到有序数组，然后再利用二分查找解决问题。这个解法比较容易想到和理解。

分治法：
+ 先思考“整棵树的结果与它左右子树的结果有什么关系”
+ 以“查找最接近 target 的某个值”问题为例，整棵树的结果，是`[左子树的最接近值、根的值、右子树的最接近值]`中与 target 最接近的值，这部分也是算法的核心
```python
class Solution:
    """
    @param root: the given BST
    @param target: the given target
    @return: the value in the BST that is closest to the target
    """
    def closest_value(self, root, target):
        # write your code here
        # 如何使用分治法解决此题
        # 左孩子、根、右孩子
        if root is None:
            return float("inf")
        left_val = self.closest_value(root.left, target)
        right_val = self.closest_value(root.right, target)

        if abs(root.val - target) < abs(left_val - target) and \
        abs(root.val - target) < abs(right_val - target):
            return root.val
        if abs(left_val - target) < abs(right_val - target):
            return left_val
        return right_val
```
+ 即使去查找k个最接近的值，分治法的解法也是类似的，即从`左子树的k个值、[根的值]、右子树的k个值`中返回最接近的k个值。

### 红黑树
本质上也是平衡二叉树（Self-balancing binary search tree），但是它是相对平衡，不似 AVL (Adelson-Velsky and Landis Tree) 那样严格保证左右子树高度相差不超过 1。


## LintCode 练习题
+ [67 简单](https://www.lintcode.com/problem/67/)
+ [1359 简单](https://www.lintcode.com/problem/1359/)
+ [85 简单](https://www.lintcode.com/problem/85/)
+ [701 中等](https://www.lintcode.com/problem/701/)
+ [86 困难](https://www.lintcode.com/problem/86/)
+ [900 简单](https://www.lintcode.com/problem/900/)
+ [901 困难](https://www.lintcode.com/problem/901/)
+ [902 中等](https://www.lintcode.com/problem/902/)
+ [453 简单](https://www.lintcode.com/problem/453/)
+ [596 简单](https://www.lintcode.com/problem/596/)
+ [474 简单](https://www.lintcode.com/problem/474/)
+ [88 中等](https://www.lintcode.com/problem/88/)
+ [578 中等](https://www.lintcode.com/problem/578/)

参考资料：
[图片1来源](https://zh.m.wikipedia.org/zh-hans/%E6%A0%91%E7%9A%84%E9%81%8D%E5%8E%86)
[图片2来源](https://www.daolf.com/posts/git-series-part-2/)
