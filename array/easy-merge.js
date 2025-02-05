/**
 * 
 * 
 * 合并两个有序数组
  给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
  请你 合并 nums2 到 nums1 中，使合并后的数组同样按【非递减顺序】排列。
  注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 

  示例 1：
    输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
    输出：[1,2,2,3,5,6]
    解释：需要合并 [1,2,3] 和 [2,5,6] 。
    合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
  
  示例 2：
    输入：nums1 = [1], m = 1, nums2 = [], n = 0
    输出：[1]
    解释：需要合并 [1] 和 [] 。
    合并结果是 [1] 。
  
  示例 3：
    输入：nums1 = [0], m = 0, nums2 = [1], n = 1
    输出：[1]
    解释：需要合并的数组是 [] 和 [1] 。
    合并结果是 [1] 。
    注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * @description 双指针方式
 */
const merge = function(nums1, m, nums2, n) {
  const sorted = []
  let p1 = 0
  let p2 = 0

  if (n === 0) {
    return nums1
  }

  if (m === 0) {
    nums2.forEach((_, i) => {
      nums1[i] = nums2[i]
    })
    return nums1
  }

  while (p1 < m || p2 < n) {
    // 处理边界问题
    if (p2 >= n) {
      sorted.push(nums1[p1])
      p1++
      continue
    }
    if (p1 >= m) {
      sorted.push(nums2[p2])
      p2++
      continue
    }

    if (nums1[p1] < nums2[p2]) {
      sorted.push(nums1[p1])
      p1++
      continue
    }

    
    if (nums2[p2] < nums1[p1]) {
      sorted.push(nums2[p2])
      p2++
      continue
    }


    sorted.push(nums1[p1], nums2[p2])
      p1++
      p2++
    
  }
  nums1.forEach((_, i) => {
    nums1[i] = sorted[i]
  })
  return nums1
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * @description 双向逆指针方式
 */
const reverseMerge = function(nums1, m, nums2, n) {
  let p1 = m - 1
  let p2 = n - 1
  let times = m + n - 1

  if (n === 0) {
    return nums1
  }

  while (times >= 0) {
    let value
    if (p1 === -1) {
      value = nums2[p2]
      p2 --
    } else if (p2 === -1) {
      value = nums1[p1]
      p1 --
    } else if (nums2[p2] > nums1[p1]) {
      value = nums2[p2]
      p2--
    } else if (nums2[p2] < nums1[p1]) {
      value = nums1[p1]
      p1--
    } else if (p2 > p1) {
      value = nums2[p2]
      p2 --
    } else {
      value = nums1[p1]
      p1 --
    }
    nums1[times] = value
    times --
  }
  return nums1
}

// 测试用例
const testList = [
  [
    [1,2,3,0,0,0], 3, [2,5,6], 3
  ],
  [
    [1], 1, [], 0
  ],
  [
    [0], 0, [1], 1
  ],
  [
    [4,5,6,0,0,0], 3, [1,2,3], 3
  ],
  [
    [-1,0,0,3,3,3,0,0,0], 6, [1,2,2], 3
  ],
  [
    [4,0,0,0,0,0], 1, [1,2,3,5,6], 5
  ],
  [
    [-1,-1,0,0,0,0], 4, [-1,0], 2
  ],
]


testList.forEach(([nums1, m, nums2, n]) => {

  // const value = merge(nums1, m, nums2, n)
  const value = reverseMerge(nums1, m, nums2, n)
  
  console.log(value);
})
