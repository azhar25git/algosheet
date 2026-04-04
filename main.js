const ALL_DATA = {
    python: [
        // Array
        {
            topic: 'Array', title: 'Create & Append', badge: 'O(1)', note: 'Basic list operations', code: `arr = []
arr.append(1)       # O(1) amortized
arr.insert(0, 99)   # O(n) - insert at index
arr.pop()           # O(1) - remove last
arr.pop(0)          # O(n) - remove first` },
        {
            topic: 'Array', title: 'Slicing & Reversing', badge: 'O(n)', note: 'Pythonic slicing', code: `arr = [1,2,3,4,5]
rev  = arr[::-1]       # reverse copy
sub  = arr[1:4]        # [2,3,4]
arr.reverse()          # in-place O(n)
sorted_a = sorted(arr) # new sorted list` },
        {
            topic: 'Array', title: '2D Array', badge: 'O(nm)', note: 'Matrix initialization', code: `rows, cols = 3, 4
grid = [[0]*cols for _ in range(rows)]
# Access
grid[1][2] = 7
# Flatten
flat = [v for row in grid for v in row]` },
        {
            topic: 'Array', title: 'Common Ops', badge: 'O(n)', note: 'Built-ins', code: `arr = [3,1,4,1,5,9]
print(sum(arr), min(arr), max(arr))
arr.sort(key=lambda x: -x)  # desc
idx = arr.index(5)           # first occurrence
cnt = arr.count(1)           # count occurrences` },

        // Backtracking
        {
            topic: 'Backtracking', title: 'Template', badge: 'O(2^n)', note: 'Classic backtrack skeleton', code: `def backtrack(path, choices):
if is_solution(path):
result.append(path[:])
return
for c in choices:
if is_valid(c):
    path.append(c)
    backtrack(path, next_choices)
    path.pop()  # undo` },
        {
            topic: 'Backtracking', title: 'Permutations', badge: 'O(n!)', note: 'Generate all permutations', code: `def permute(nums):
res = []
def bt(path, used):
if len(path)==len(nums):
    res.append(path[:])
    return
for i,n in enumerate(nums):
    if not used[i]:
        used[i]=True; path.append(n)
        bt(path, used)
        path.pop(); used[i]=False
bt([], [False]*len(nums))
return res` },
        {
            topic: 'Backtracking', title: 'Subsets', badge: 'O(2^n)', note: 'Power set generation', code: `def subsets(nums):
res = []
def bt(start, path):
res.append(path[:])
for i in range(start, len(nums)):
    path.append(nums[i])
    bt(i+1, path)
    path.pop()
bt(0, [])
return res` },
        {
            topic: 'Backtracking', title: 'N-Queens', badge: 'O(n!)', note: 'Classic constraint backtrack', code: `def solveNQueens(n):
res, cols, d1, d2 = [], set(), set(), set()
def bt(row, path):
if row == n:
    res.append(path[:])
    return
for col in range(n):
    if col in cols or row-col in d1 or row+col in d2:
        continue
    cols.add(col); d1.add(row-col); d2.add(row+col)
    bt(row+1, path+[col])
    cols.discard(col); d1.discard(row-col); d2.discard(row+col)
bt(0, [])
return res` },

        // Binary Indexed Tree
        {
            topic: 'Binary Indexed Tree', title: 'BIT / Fenwick Tree', badge: 'O(log n)', note: 'Point update, prefix sum', code: `class BIT:
def __init__(self, n):
self.n = n
self.tree = [0]*(n+1)
def update(self, i, delta):  # 1-indexed
while i <= self.n:
    self.tree[i] += delta
    i += i & (-i)
def query(self, i):          # prefix sum [1..i]
s = 0
while i > 0:
    s += self.tree[i]
    i -= i & (-i)
return s
def range_query(self, l, r):
return self.query(r) - self.query(l-1)` },

        // Binary Search
        {
            topic: 'Binary Search', title: 'Classic', badge: 'O(log n)', note: 'Search sorted array', code: `import bisect
def binary_search(arr, target):
lo, hi = 0, len(arr)-1
while lo <= hi:
mid = (lo+hi)//2
if arr[mid]==target: return mid
elif arr[mid]<target: lo=mid+1
else: hi=mid-1
return -1
# Built-in
bisect.bisect_left(arr, target)   # leftmost
bisect.bisect_right(arr, target)  # rightmost` },
        {
            topic: 'Binary Search', title: 'On Answer', badge: 'O(n log n)', note: 'Binary search on result space', code: `def feasible(mid): ...   # check if mid works
lo, hi = MIN_VAL, MAX_VAL
while lo < hi:
mid = (lo+hi)//2
if feasible(mid):
hi = mid          # minimize
else:
lo = mid+1
return lo` },

        // Binary Search Tree
        {
            topic: 'Binary Search Tree', title: 'BST Node & Insert', badge: 'O(log n)', note: 'BST operations', code: `class Node:
def __init__(self, val):
self.val=val; self.left=self.right=None

def insert(root, val):
if not root: return Node(val)
if val < root.val: root.left=insert(root.left,val)
else: root.right=insert(root.right,val)
return root

def search(root, val):
if not root or root.val==val: return root
if val<root.val: return search(root.left,val)
return search(root.right,val)` },
        {
            topic: 'Binary Search Tree', title: 'Inorder & Delete', badge: 'O(log n)', note: 'In-order gives sorted sequence', code: `def inorder(root):
if root:
yield from inorder(root.left)
yield root.val
yield from inorder(root.right)

def delete(root, val):
if not root: return None
if val < root.val: root.left=delete(root.left,val)
elif val > root.val: root.right=delete(root.right,val)
else:
if not root.left: return root.right
if not root.right: return root.left
# find inorder successor
cur=root.right
while cur.left: cur=cur.left
root.val=cur.val
root.right=delete(root.right,cur.val)
return root` },

        // Binary Tree
        {
            topic: 'Binary Tree', title: 'Traversals', badge: 'O(n)', note: 'DFS traversals', code: `class TreeNode:
def __init__(self,val=0,left=None,right=None):
self.val=val;self.left=left;self.right=right

def preorder(root):   # root,L,R
if root: return [root.val]+preorder(root.left)+preorder(root.right)
return []
def inorder(root):    # L,root,R
if root: return inorder(root.left)+[root.val]+inorder(root.right)
return []
def postorder(root):  # L,R,root
if root: return postorder(root.left)+postorder(root.right)+[root.val]
return []` },
        {
            topic: 'Binary Tree', title: 'BFS Level Order', badge: 'O(n)', note: 'Level-by-level traversal', code: `from collections import deque
def levelOrder(root):
if not root: return []
res, q = [], deque([root])
while q:
level = []
for _ in range(len(q)):
    node = q.popleft()
    level.append(node.val)
    if node.left:  q.append(node.left)
    if node.right: q.append(node.right)
res.append(level)
return res` },
        {
            topic: 'Binary Tree', title: 'Height & Diameter', badge: 'O(n)', note: 'Tree metrics', code: `def height(root):
if not root: return 0
return 1 + max(height(root.left), height(root.right))

def diameter(root):
res = [0]
def depth(node):
if not node: return 0
L, R = depth(node.left), depth(node.right)
res[0] = max(res[0], L+R)
return 1 + max(L,R)
depth(root)
return res[0]` },

        // Bit Manipulation
        {
            topic: 'Bit Manipulation', title: 'Basics', badge: 'O(1)', note: 'Common bit tricks', code: `n = 42
# Check k-th bit (0-indexed)
(n >> k) & 1
# Set k-th bit
n | (1 << k)
# Clear k-th bit
n & ~(1 << k)
# Toggle k-th bit
n ^ (1 << k)
# Lowest set bit
n & (-n)
# Clear lowest set bit
n & (n-1)
# Count set bits
bin(n).count('1')  # or int.bit_count() py3.10+` },
        {
            topic: 'Bit Manipulation', title: 'XOR Tricks', badge: 'O(n)', note: 'XOR properties', code: `# a ^ a = 0, a ^ 0 = a
# Find single number (all others appear twice)
def single(nums):
return functools.reduce(lambda a,b: a^b, nums)
# Swap without temp
a ^= b; b ^= a; a ^= b
# Power of 2 check
is_pow2 = n > 0 and (n & (n-1)) == 0` },

        // Bitmask
        {
            topic: 'Bitmask', title: 'Subset Enumeration', badge: 'O(2^n)', note: 'Enumerate all subsets', code: `n = 4
for mask in range(1 << n):
subset = []
for i in range(n):
if mask & (1 << i):
    subset.append(i)
print(mask, subset)

# Enumerate subsets of a mask
mask = 0b1011
sub = mask
while sub:
print(bin(sub))
sub = (sub-1) & mask` },

        // BFS
        {
            topic: 'Breadth-First Search', title: 'Graph BFS', badge: 'O(V+E)', note: 'Shortest path (unweighted)', code: `from collections import deque
def bfs(graph, start):
visited = {start}
q = deque([(start, 0)])  # (node, dist)
while q:
node, dist = q.popleft()
for nei in graph[node]:
    if nei not in visited:
        visited.add(nei)
        q.append((nei, dist+1))` },
        {
            topic: 'Breadth-First Search', title: 'Grid BFS', badge: 'O(nm)', note: '4-directional grid search', code: `def bfs_grid(grid, sr, sc):
rows,cols=len(grid),len(grid[0])
visited={(sr,sc)}; q=deque([(sr,sc,0)])
dirs=[(0,1),(0,-1),(1,0),(-1,0)]
while q:
r,c,d=q.popleft()
for dr,dc in dirs:
    nr,nc=r+dr,c+dc
    if 0<=nr<rows and 0<=nc<cols and (nr,nc) not in visited and grid[nr][nc]!=1:
        visited.add((nr,nc))
        q.append((nr,nc,d+1))` },

        // Bucket Sort
        {
            topic: 'Bucket Sort', title: 'Bucket Sort', badge: 'O(n+k)', note: 'Best for uniform distribution', code: `def bucket_sort(arr):
if not arr: return arr
mn, mx = min(arr), max(arr)
n = len(arr)
buckets = [[] for _ in range(n)]
for x in arr:
idx = int((x-mn)/(mx-mn+1e-9)*n)
buckets[idx].append(x)
for b in buckets: b.sort()
return [x for b in buckets for x in b]` },

        // Combinatorics
        {
            topic: 'Combinatorics', title: 'nCr & Permutations', badge: 'O(n)', note: 'Math combinatorics', code: `from math import comb, perm, factorial
comb(10,3)          # C(10,3) = 120
perm(10,3)          # P(10,3) = 720
factorial(10)       # 3628800

# Pascal's triangle row
def pascal_row(n):
row = [1]
for k in range(1,n+1):
row.append(row[-1]*(n-k+1)//k)
return row` },

        // Counting
        {
            topic: 'Counting', title: 'Counter & Freq Map', badge: 'O(n)', note: 'Frequency counting patterns', code: `from collections import Counter
freq = Counter("abracadabra")
freq.most_common(3)        # top 3
freq['a']                  # 5
freq['z']                  # 0 (no KeyError)
# Count elements meeting condition
from collections import defaultdict
d = defaultdict(int)
for x in arr: d[x] += 1` },

        // Data Stream
        {
            topic: 'Data Stream', title: 'Running Median', badge: 'O(log n)', note: 'Two heaps approach', code: `import heapq
class MedianFinder:
def __init__(self):
self.lo = []   # max-heap (negate)
self.hi = []   # min-heap
def addNum(self, num):
heapq.heappush(self.lo, -num)
heapq.heappush(self.hi, -heapq.heappop(self.lo))
if len(self.hi) > len(self.lo):
    heapq.heappush(self.lo, -heapq.heappop(self.hi))
def findMedian(self):
if len(self.lo) > len(self.hi):
    return -self.lo[0]
return (-self.lo[0] + self.hi[0]) / 2` },

        // DFS
        {
            topic: 'Depth-First Search', title: 'Recursive DFS', badge: 'O(V+E)', note: 'Graph/tree DFS', code: `def dfs(graph, node, visited=None):
if visited is None: visited = set()
visited.add(node)
for nei in graph[node]:
if nei not in visited:
    dfs(graph, nei, visited)
return visited` },
        {
            topic: 'Depth-First Search', title: 'Iterative DFS', badge: 'O(V+E)', note: 'Stack-based DFS', code: `def dfs_iter(graph, start):
visited, stack = set(), [start]
while stack:
node = stack.pop()
if node in visited: continue
visited.add(node)
for nei in graph[node]:
    if nei not in visited:
        stack.append(nei)
return visited` },
        {
            topic: 'Depth-First Search', title: 'Grid DFS', badge: 'O(nm)', note: 'Island / flood fill', code: `def dfs_grid(grid, r, c, visited):
rows,cols=len(grid),len(grid[0])
if r<0 or r>=rows or c<0 or c>=cols: return
if (r,c) in visited or grid[r][c]==0: return
visited.add((r,c))
for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
dfs_grid(grid,r+dr,c+dc,visited)` },

        // Divide and Conquer
        {
            topic: 'Divide and Conquer', title: 'Template', badge: 'O(n log n)', note: 'D&C skeleton', code: `def divide_conquer(arr, lo, hi):
if lo >= hi: return base_case
mid = (lo+hi)//2
left  = divide_conquer(arr, lo, mid)
right = divide_conquer(arr, mid+1, hi)
return merge(left, right)` },

        // Dynamic Programming
        {
            topic: 'Dynamic Programming', title: '1D DP Template', badge: 'O(n)', note: 'Bottom-up DP', code: `# Fibonacci
n = 10
dp = [0]*(n+1)
dp[0], dp[1] = 0, 1
for i in range(2, n+1):
dp[i] = dp[i-1] + dp[i-2]
# Space optimized
a, b = 0, 1
for _ in range(n): a, b = b, a+b` },
        {
            topic: 'Dynamic Programming', title: '2D DP (LCS)', badge: 'O(nm)', note: 'Longest Common Subsequence', code: `def lcs(s, t):
m, n = len(s), len(t)
dp = [[0]*(n+1) for _ in range(m+1)]
for i in range(1,m+1):
for j in range(1,n+1):
    if s[i-1]==t[j-1]:
        dp[i][j]=dp[i-1][j-1]+1
    else:
        dp[i][j]=max(dp[i-1][j],dp[i][j-1])
return dp[m][n]` },
        {
            topic: 'Dynamic Programming', title: '0/1 Knapsack', badge: 'O(nW)', note: 'Classic DP problem', code: `def knapsack(weights, values, W):
n = len(weights)
dp = [0]*(W+1)
for i in range(n):
for w in range(W, weights[i]-1, -1):
    dp[w] = max(dp[w], dp[w-weights[i]]+values[i])
return dp[W]` },
        {
            topic: 'Dynamic Programming', title: 'Coin Change', badge: 'O(nA)', note: 'Minimum coins', code: `def coinChange(coins, amount):
dp = [float('inf')]*(amount+1)
dp[0] = 0
for c in coins:
for a in range(c, amount+1):
    dp[a] = min(dp[a], dp[a-c]+1)
return dp[amount] if dp[amount]!=float('inf') else -1` },

        // Geometry
        {
            topic: 'Geometry', title: 'Point & Distance', badge: 'O(1)', note: 'Basic geometry', code: `import math
def dist(p1, p2):
return math.hypot(p2[0]-p1[0], p2[1]-p1[1])

def cross(O, A, B):  # cross product OA x OB
return (A[0]-O[0])*(B[1]-O[1])-(A[1]-O[1])*(B[0]-O[0])

def convex_hull(pts):
pts=sorted(pts)
hull=[]
for p in pts+pts[::-1]:
while len(hull)>=2 and cross(hull[-2],hull[-1],p)<=0:
    hull.pop()
hull.append(p)
return hull[:-1]` },

        // Graph Theory
        {
            topic: 'Graph Theory', title: 'Build Graph', badge: 'O(V+E)', note: 'Adjacency list', code: `from collections import defaultdict
graph = defaultdict(list)
# Undirected
for u,v in edges:
graph[u].append(v)
graph[v].append(u)
# Weighted
for u,v,w in edges:
graph[u].append((v,w))
graph[v].append((u,w))` },
        {
            topic: 'Graph Theory', title: 'Dijkstra', badge: 'O((V+E)log V)', note: "Shortest path (weighted)", code: `import heapq
def dijkstra(graph, src, n):
dist=[float('inf')]*(n+1)
dist[src]=0; heap=[(0,src)]
while heap:
d,u=heapq.heappop(heap)
if d>dist[u]: continue
for v,w in graph[u]:
    if dist[u]+w<dist[v]:
        dist[v]=dist[u]+w
        heapq.heappush(heap,(dist[v],v))
return dist` },
        {
            topic: 'Graph Theory', title: 'Bellman-Ford', badge: 'O(VE)', note: 'Handles negative weights', code: `def bellman_ford(edges, n, src):
dist=[float('inf')]*n
dist[src]=0
for _ in range(n-1):
for u,v,w in edges:
    if dist[u]+w < dist[v]:
        dist[v]=dist[u]+w
# Check negative cycle
for u,v,w in edges:
if dist[u]+w < dist[v]:
    return None  # negative cycle
return dist` },

        // Greedy
        {
            topic: 'Greedy', title: 'Interval Scheduling', badge: 'O(n log n)', note: 'Max non-overlapping intervals', code: `def eraseOverlapIntervals(intervals):
intervals.sort(key=lambda x: x[1])
count, end = 0, float('-inf')
for s, e in intervals:
if s >= end:
    end = e
else:
    count += 1
return count` },
        {
            topic: 'Greedy', title: 'Activity Selection', badge: 'O(n log n)', note: 'Maximum activities', code: `def activity_selection(start, finish):
n = len(start)
jobs = sorted(zip(finish, start))
selected, last_end = [jobs[0]], jobs[0][0]
for f, s in jobs[1:]:
if s >= last_end:
    selected.append((f,s))
    last_end = f
return selected` },

        // Hash Function
        {
            topic: 'Hash Function', title: 'Rolling Hash', badge: 'O(n)', note: 'Polynomial rolling hash', code: `def rolling_hash(s, base=31, mod=10**9+7):
h, pw = 0, 1
hashes = [0]
for c in s:
h = (h + (ord(c)-ord('a')+1)*pw) % mod
pw = pw*base % mod
hashes.append(h)
return hashes` },

        // Hash Table
        {
            topic: 'Hash Table', title: 'Dict Operations', badge: 'O(1)', note: 'Python dict (hash table)', code: `d = {}
d['key'] = 'value'      # insert
d.get('key', default)   # safe get
d.setdefault('k', [])   # init if missing
d.pop('key', None)      # safe delete
'key' in d              # O(1) lookup
# Two-sum pattern
seen = {}
for i, x in enumerate(nums):
if target-x in seen:
return [seen[target-x], i]
seen[x] = i` },

        // Heap
        {
            topic: 'Heap (Priority Queue)', title: 'Min/Max Heap', badge: 'O(log n)', note: 'heapq module', code: `import heapq
h = []
heapq.heappush(h, 3)
heapq.heappush(h, 1)
heapq.heappop(h)        # 1 (min)
# Max-heap: negate values
heapq.heappush(h, -val)
-heapq.heappop(h)
# Heapify in-place
heapq.heapify(arr)      # O(n)
# K largest
heapq.nlargest(k, arr)  # O(n log k)
heapq.nsmallest(k, arr)` },
        {
            topic: 'Heap (Priority Queue)', title: 'K-th Largest', badge: 'O(n log k)', note: 'Maintain size-k heap', code: `import heapq
def findKthLargest(nums, k):
heap = nums[:k]
heapq.heapify(heap)
for x in nums[k:]:
if x > heap[0]:
    heapq.heapreplace(heap, x)
return heap[0]` },

        // Linked List
        {
            topic: 'Linked List', title: 'Node & Ops', badge: 'O(n)', note: 'Singly linked list', code: `class ListNode:
def __init__(self, val=0, next=None):
self.val=val; self.next=next

def reverse(head):
prev, cur = None, head
while cur:
nxt=cur.next; cur.next=prev
prev=cur; cur=nxt
return prev

def has_cycle(head):
slow=fast=head
while fast and fast.next:
slow=slow.next; fast=fast.next.next
if slow==fast: return True
return False` },
        {
            topic: 'Linked List', title: 'Merge & Find Middle', badge: 'O(n)', note: 'Common LL operations', code: `def merge_sorted(l1, l2):
dummy=cur=ListNode(0)
while l1 and l2:
if l1.val<=l2.val: cur.next=l1; l1=l1.next
else: cur.next=l2; l2=l2.next
cur=cur.next
cur.next=l1 or l2
return dummy.next

def middle(head):
slow=fast=head
while fast and fast.next:
slow=slow.next; fast=fast.next.next
return slow` },

        // Math
        {
            topic: 'Math', title: 'GCD, LCM, Prime', badge: 'O(log n)', note: 'Number theory essentials', code: `from math import gcd
lcm = lambda a,b: a*b//gcd(a,b)

def is_prime(n):
if n<2: return False
for i in range(2,int(n**0.5)+1):
if n%i==0: return False
return True

def sieve(n):  # Sieve of Eratosthenes
primes=[True]*(n+1); primes[0]=primes[1]=False
for i in range(2,int(n**0.5)+1):
if primes[i]:
    for j in range(i*i,n+1,i):
        primes[j]=False
return [i for i,v in enumerate(primes) if v]` },
        {
            topic: 'Math', title: 'Modular Arithmetic', badge: 'O(log n)', note: 'Modexp and inverse', code: `MOD = 10**9 + 7
# Fast power
pow(base, exp, MOD)      # built-in
# Modular inverse (Fermat's: p prime)
inv = pow(a, MOD-2, MOD)
# C(n,r) mod p
def comb_mod(n, r, MOD):
if r>n: return 0
num = den = 1
for i in range(r):
num=num*(n-i)%MOD
den=den*(i+1)%MOD
return num*pow(den,MOD-2,MOD)%MOD` },

        // Matrix
        {
            topic: 'Matrix', title: 'Rotate & Transpose', badge: 'O(n²)', note: 'Matrix transformations', code: `def rotate90(mat):      # 90° clockwise
n=len(mat)
# Transpose
for i in range(n):
for j in range(i+1,n):
    mat[i][j],mat[j][i]=mat[j][i],mat[i][j]
# Reverse each row
for row in mat: row.reverse()

def spiral(mat):
res=[]
while mat:
res+=mat.pop(0)
mat=[list(col[::-1]) for col in zip(*mat)]
return res` },

        // Memoization
        {
            topic: 'Memoization', title: 'lru_cache & Manual', badge: 'O(n)', note: 'Top-down DP', code: `from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
if n<2: return n
return fib(n-1)+fib(n-2)

# Manual memo dict
def solve(n, memo={}):
if n in memo: return memo[n]
if n<=1: return n
memo[n]=solve(n-1)+solve(n-2)
return memo[n]` },

        // Merge Sort
        {
            topic: 'Merge Sort', title: 'Merge Sort', badge: 'O(n log n)', note: 'Stable, divide & conquer sort', code: `def merge_sort(arr):
if len(arr)<=1: return arr
mid=len(arr)//2
L=merge_sort(arr[:mid])
R=merge_sort(arr[mid:])
return merge(L,R)

def merge(L,R):
res=[]; i=j=0
while i<len(L) and j<len(R):
if L[i]<=R[j]: res.append(L[i]); i+=1
else: res.append(R[j]); j+=1
return res+L[i:]+R[j:]` },

        // Monotonic Queue
        {
            topic: 'Monotonic Queue', title: 'Sliding Window Max', badge: 'O(n)', note: 'Deque-based monotonic queue', code: `from collections import deque
def maxSlidingWindow(nums, k):
dq, res = deque(), []
for i, x in enumerate(nums):
while dq and dq[0] < i-k+1: dq.popleft()
while dq and nums[dq[-1]] < x: dq.pop()
dq.append(i)
if i >= k-1: res.append(nums[dq[0]])
return res` },

        // Monotonic Stack
        {
            topic: 'Monotonic Stack', title: 'Next Greater Element', badge: 'O(n)', note: 'Classic mono-stack usage', code: `def nextGreater(nums):
n=len(nums); res=[-1]*n; stack=[]
for i,x in enumerate(nums):
while stack and nums[stack[-1]]<x:
    res[stack.pop()]=x
stack.append(i)
return res

def largestRectangleHistogram(heights):
stack=[]; res=0; heights+=[0]
for i,h in enumerate(heights):
while stack and heights[stack[-1]]>h:
    H=heights[stack.pop()]
    W=i if not stack else i-stack[-1]-1
    res=max(res,H*W)
stack.append(i)
return res` },

        // Ordered Set
        {
            topic: 'Ordered Set', title: 'SortedList (sortedcontainers)', badge: 'O(log n)', note: 'Order-statistic-like ops', code: `from sortedcontainers import SortedList
sl = SortedList()
sl.add(5); sl.add(1); sl.add(3)
sl.bisect_left(3)   # index of first >= 3
sl.bisect_right(3)  # index of first > 3
sl.remove(3)
sl[0]               # min element O(1)
sl[-1]              # max element O(1)` },

        // Prefix Sum
        {
            topic: 'Prefix Sum', title: '1D Prefix Sum', badge: 'O(1) query', note: 'Precompute cumulative sums', code: `arr = [1,2,3,4,5]
n = len(arr)
prefix = [0]*(n+1)
for i in range(n):
prefix[i+1] = prefix[i] + arr[i]
# Range sum [l, r] inclusive (0-indexed)
def range_sum(l, r):
return prefix[r+1] - prefix[l]` },
        {
            topic: 'Prefix Sum', title: '2D Prefix Sum', badge: 'O(1) query', note: '2D range sum queries', code: `def build2D(mat):
m,n=len(mat),len(mat[0])
P=[[0]*(n+1) for _ in range(m+1)]
for i in range(1,m+1):
for j in range(1,n+1):
    P[i][j]=mat[i-1][j-1]+P[i-1][j]+P[i][j-1]-P[i-1][j-1]
def query(r1,c1,r2,c2):
return P[r2+1][c2+1]-P[r1][c2+1]-P[r2+1][c1]+P[r1][c1]
return query` },

        // Queue
        {
            topic: 'Queue', title: 'deque as Queue', badge: 'O(1)', note: 'Python queue operations', code: `from collections import deque
q = deque()
q.append(1)          # enqueue O(1)
q.appendleft(0)      # enqueue front O(1)
q.popleft()          # dequeue O(1)
q.pop()              # dequeue back O(1)
# from queue import Queue (thread-safe)
import queue
q = queue.Queue()
q.put(1); q.get()` },

        // Quickselect
        {
            topic: 'Quickselect', title: 'Quickselect', badge: 'O(n) avg', note: 'K-th smallest in O(n)', code: `import random
def quickselect(arr, k):  # k is 0-indexed
if len(arr)==1: return arr[0]
pivot=random.choice(arr)
lo=[x for x in arr if x<pivot]
eq=[x for x in arr if x==pivot]
hi=[x for x in arr if x>pivot]
if k<len(lo): return quickselect(lo,k)
elif k<len(lo)+len(eq): return pivot
return quickselect(hi,k-len(lo)-len(eq))` },

        // Recursion
        {
            topic: 'Recursion', title: 'Template & Tail Recursion', badge: 'O(n)', note: 'Recursive patterns', code: `def recursive(n):
# Base case
if n <= 0: return 0
# Recursive case
return n + recursive(n-1)

import sys
sys.setrecursionlimit(10**6)  # increase limit

# Memoize with cache
from functools import cache
@cache
def fib(n):
if n<2: return n
return fib(n-1)+fib(n-2)` },

        // Segment Tree
        {
            topic: 'Segment Tree', title: 'Segment Tree', badge: 'O(log n)', note: 'Range query, point update', code: `class SegTree:
def __init__(self, n):
self.n=n; self.tree=[0]*(4*n)
def build(self,arr,node,lo,hi):
if lo==hi: self.tree[node]=arr[lo]; return
mid=(lo+hi)//2
self.build(arr,2*node,lo,mid)
self.build(arr,2*node+1,mid+1,hi)
self.tree[node]=self.tree[2*node]+self.tree[2*node+1]
def update(self,node,lo,hi,idx,val):
if lo==hi: self.tree[node]=val; return
mid=(lo+hi)//2
if idx<=mid: self.update(2*node,lo,mid,idx,val)
else: self.update(2*node+1,mid+1,hi,idx,val)
self.tree[node]=self.tree[2*node]+self.tree[2*node+1]
def query(self,node,lo,hi,l,r):
if r<lo or hi<l: return 0
if l<=lo and hi<=r: return self.tree[node]
mid=(lo+hi)//2
return self.query(2*node,lo,mid,l,r)+self.query(2*node+1,mid+1,hi,l,r)` },

        // Simulation
        {
            topic: 'Simulation', title: 'Simulation Pattern', badge: 'O(n)', note: 'Simulate step by step', code: `# Game of Life example
def game_of_life(board):
m,n=len(board),len(board[0])
def count_live(r,c):
cnt=0
for dr in [-1,0,1]:
    for dc in [-1,0,1]:
        if dr==dc==0: continue
        nr,nc=r+dr,c+dc
        if 0<=nr<m and 0<=nc<n and abs(board[nr][nc])==1:
            cnt+=1
return cnt` },

        // Sliding Window
        {
            topic: 'Sliding Window', title: 'Fixed Window', badge: 'O(n)', note: 'Fixed-size window', code: `def max_sum_k(arr, k):
window_sum = sum(arr[:k])
max_sum = window_sum
for i in range(k, len(arr)):
window_sum += arr[i] - arr[i-k]
max_sum = max(max_sum, window_sum)
return max_sum` },
        {
            topic: 'Sliding Window', title: 'Variable Window', badge: 'O(n)', note: 'Expand/shrink window', code: `def lengthOfLongestSubstring(s):
seen={}; l=res=0
for r,c in enumerate(s):
if c in seen and seen[c]>=l:
    l=seen[c]+1
seen[c]=r
res=max(res,r-l+1)
return res` },

        // Sorting
        {
            topic: 'Sorting', title: 'Python Sort Recipes', badge: 'O(n log n)', note: 'Built-in sort & key tricks', code: `arr.sort()                            # in-place
sorted(arr)                           # new list
arr.sort(key=lambda x: (x[1],-x[0])) # multi-key
# Counting sort O(n+k)
from collections import Counter
freq=Counter(arr)
# Radix sort idea: sort by digit groups` },

        // Stack
        {
            topic: 'Stack', title: 'Stack with List', badge: 'O(1)', note: 'Python list as stack', code: `stack = []
stack.append(1)      # push O(1)
stack.append(2)
top = stack[-1]      # peek O(1)
stack.pop()          # pop O(1)
bool(stack)          # is empty

# Valid parentheses
def isValid(s):
st=[]; m={')':'(',']':'[','}':'{'}
for c in s:
if c in m:
    if not st or st[-1]!=m[c]: return False
    st.pop()
else: st.append(c)
return not st` },

        // String
        {
            topic: 'String', title: 'String Operations', badge: 'O(n)', note: 'Common string tricks', code: `s = "hello world"
s.split()              # ['hello','world']
' '.join(['a','b'])    # 'a b'
s[::-1]                # reverse
s.count('l')           # 3
s.replace('l','r')
s.strip()              # trim whitespace
s.startswith('he'), s.endswith('ld')
ord('a'), chr(97)      # 97, 'a'` },

        // String Matching
        {
            topic: 'String Matching', title: 'KMP Algorithm', badge: 'O(n+m)', note: 'Efficient pattern matching', code: `def kmp(text, pattern):
def build_lps(p):
lps=[0]*len(p); j=0
for i in range(1,len(p)):
    while j>0 and p[i]!=p[j]: j=lps[j-1]
    if p[i]==p[j]: j+=1
    lps[i]=j
return lps
lps=build_lps(pattern); j=0
res=[]
for i,c in enumerate(text):
while j>0 and c!=pattern[j]: j=lps[j-1]
if c==pattern[j]: j+=1
if j==len(pattern):
    res.append(i-j+1); j=lps[j-1]
return res` },

        // Sweep Line
        {
            topic: 'Sweep Line', title: 'Meeting Rooms', badge: 'O(n log n)', note: 'Sweep line event processing', code: `def minMeetingRooms(intervals):
events=[]
for s,e in intervals:
events.append((s,1))   # start
events.append((e,-1))  # end
events.sort(key=lambda x:(x[0],-x[1]))
rooms=cur=0
for _,t in events:
cur+=t; rooms=max(rooms,cur)
return rooms` },

        // Topological Sort
        {
            topic: 'Topological Sort', title: 'Kahn\'s Algorithm (BFS)', badge: 'O(V+E)', note: 'DAG ordering', code: `from collections import deque, defaultdict
def topoSort(n, edges):
graph=defaultdict(list); indegree=[0]*n
for u,v in edges:
graph[u].append(v); indegree[v]+=1
q=deque(i for i in range(n) if indegree[i]==0)
order=[]
while q:
u=q.popleft(); order.append(u)
for v in graph[u]:
    indegree[v]-=1
    if indegree[v]==0: q.append(v)
return order if len(order)==n else []  # [] = cycle` },

        // Tree
        {
            topic: 'Tree', title: 'Tree Traversal Patterns', badge: 'O(n)', note: 'Recursive tree patterns', code: `def max_path_sum(root):
res=[float('-inf')]
def dfs(node):
if not node: return 0
L=max(dfs(node.left),0)
R=max(dfs(node.right),0)
res[0]=max(res[0],node.val+L+R)
return node.val+max(L,R)
dfs(root)
return res[0]` },

        // Trie
        {
            topic: 'Trie', title: 'Trie Implementation', badge: 'O(m)', note: 'Prefix tree for strings', code: `class Trie:
def __init__(self):
self.root={}
def insert(self,word):
node=self.root
for c in word:
    node=node.setdefault(c,{})
node['#']=True
def search(self,word):
node=self.root
for c in word:
    if c not in node: return False
    node=node[c]
return '#' in node
def startsWith(self,prefix):
node=self.root
for c in prefix:
    if c not in node: return False
    node=node[c]
return True` },

        // Two Pointers
        {
            topic: 'Two Pointers', title: 'Two Pointers Patterns', badge: 'O(n)', note: 'Classic two pointer approaches', code: `# Two sum (sorted array)
def twoSum(arr, target):
l, r = 0, len(arr)-1
while l < r:
s = arr[l]+arr[r]
if s==target: return [l,r]
elif s<target: l+=1
else: r-=1

# Fast & slow pointers
def detectCycle(head):
slow=fast=head
while fast and fast.next:
slow=slow.next; fast=fast.next.next
if slow==fast: return True
return False` },

        // Union-Find
        {
            topic: 'Union-Find', title: 'Union-Find / DSU', badge: 'O(α(n))', note: 'Disjoint Set Union', code: `class UnionFind:
def __init__(self, n):
self.parent=list(range(n))
self.rank=[0]*n
def find(self,x):
if self.parent[x]!=x:
    self.parent[x]=self.find(self.parent[x])
return self.parent[x]
def union(self,x,y):
px,py=self.find(x),self.find(y)
if px==py: return False
if self.rank[px]<self.rank[py]: px,py=py,px
self.parent[py]=px
if self.rank[px]==self.rank[py]: self.rank[px]+=1
return True` },
    ],

    javascript: [
        // Array
        {
            topic: 'Array', title: 'Create & Manipulate', badge: 'O(1)', note: 'Array basics', code: `const arr = [];
arr.push(1);           // O(1) append
arr.pop();             // O(1) remove last
arr.unshift(0);        // O(n) prepend
arr.shift();           // O(n) remove first
arr.splice(1,0,99);    // insert at index
arr.slice(1,4);        // subarray [1..3]
arr.reverse();         // in-place
[...arr].sort((a,b)=>a-b); // sorted copy` },
        {
            topic: 'Array', title: '2D Array', badge: 'O(nm)', note: 'Matrix creation', code: `const rows=3, cols=4;
const grid = Array.from({length:rows},
()=>new Array(cols).fill(0));
grid[1][2] = 7;
// Flat
grid.flat();
// Fill pattern
Array.from({length:n},(_,i)=>i); // [0..n-1]` },
        {
            topic: 'Array', title: 'Functional Ops', badge: 'O(n)', note: 'map/filter/reduce', code: `const nums = [1,2,3,4,5];
nums.map(x=>x*2);           // [2,4,6,8,10]
nums.filter(x=>x%2===0);    // [2,4]
nums.reduce((acc,x)=>acc+x,0); // 15
nums.some(x=>x>3);          // true
nums.every(x=>x>0);         // true
nums.find(x=>x>3);          // 4
nums.findIndex(x=>x>3);     // 3` },

        // Backtracking
        {
            topic: 'Backtracking', title: 'Template', badge: 'O(2^n)', note: 'Backtrack skeleton', code: `function backtrack(path, choices) {
if (isSolution(path)) {
result.push([...path]);
return;
}
for (const c of choices) {
if (isValid(c)) {
path.push(c);
backtrack(path, nextChoices);
path.pop();  // undo
}
}
}` },
        {
            topic: 'Backtracking', title: 'Permutations', badge: 'O(n!)', note: 'All permutations', code: `function permute(nums) {
const res = [];
const used = new Array(nums.length).fill(false);
function bt(path) {
if (path.length === nums.length) { res.push([...path]); return; }
for (let i=0;i<nums.length;i++) {
if (used[i]) continue;
used[i]=true; path.push(nums[i]);
bt(path);
path.pop(); used[i]=false;
}
}
bt([]);
return res;
}` },

        // Binary Indexed Tree
        {
            topic: 'Binary Indexed Tree', title: 'Fenwick Tree', badge: 'O(log n)', note: 'Prefix sum with BIT', code: `class BIT {
constructor(n) { this.n=n; this.tree=new Array(n+1).fill(0); }
update(i, delta) {
for(;i<=this.n;i+=i&(-i)) this.tree[i]+=delta;
}
query(i) {
let s=0;
for(;i>0;i-=i&(-i)) s+=this.tree[i];
return s;
}
rangeQuery(l,r) { return this.query(r)-this.query(l-1); }
}` },

        // Binary Search
        {
            topic: 'Binary Search', title: 'Classic', badge: 'O(log n)', note: 'Binary search template', code: `function binarySearch(arr, target) {
let lo=0, hi=arr.length-1;
while (lo <= hi) {
const mid = (lo+hi)>>1;
if (arr[mid]===target) return mid;
else if (arr[mid]<target) lo=mid+1;
else hi=mid-1;
}
return -1;
}
// Lower bound
function lowerBound(arr, target) {
let lo=0, hi=arr.length;
while(lo<hi){ const m=(lo+hi)>>1; arr[m]<target?lo=m+1:hi=m; }
return lo;
}` },

        // Binary Search Tree
        {
            topic: 'Binary Search Tree', title: 'BST Operations', badge: 'O(log n)', note: 'BST insert & search', code: `class TreeNode { constructor(val){this.val=val;this.left=this.right=null;} }
function insert(root, val) {
if(!root) return new TreeNode(val);
if(val<root.val) root.left=insert(root.left,val);
else root.right=insert(root.right,val);
return root;
}
function search(root,val){
if(!root||root.val===val) return root;
return val<root.val?search(root.left,val):search(root.right,val);
}` },

        // Binary Tree
        {
            topic: 'Binary Tree', title: 'Traversals', badge: 'O(n)', note: 'DFS traversals', code: `function inorder(root, res=[]) {
if(root){inorder(root.left,res);res.push(root.val);inorder(root.right,res);}
return res;
}
// Iterative inorder
function inorderIter(root) {
const res=[],stack=[];
let cur=root;
while(cur||stack.length){
while(cur){stack.push(cur);cur=cur.left;}
cur=stack.pop(); res.push(cur.val); cur=cur.right;
}
return res;
}` },
        {
            topic: 'Binary Tree', title: 'BFS Level Order', badge: 'O(n)', note: 'Level-by-level BFS', code: `function levelOrder(root) {
if(!root) return [];
const res=[],q=[root];
while(q.length){
const level=[];
const len=q.length;
for(let i=0;i<len;i++){
const node=q.shift();
level.push(node.val);
if(node.left) q.push(node.left);
if(node.right) q.push(node.right);
}
res.push(level);
}
return res;
}` },

        // Bit Manipulation
        {
            topic: 'Bit Manipulation', title: 'Bit Tricks', badge: 'O(1)', note: 'Common bit ops', code: `// Check k-th bit
(n >> k) & 1;
// Set bit
n | (1 << k);
// Clear bit
n & ~(1 << k);
// Toggle bit
n ^ (1 << k);
// Lowest set bit
n & (-n);
// Count set bits
n.toString(2).split('').filter(c=>c==='1').length;
// Power of 2
n > 0 && (n & (n-1)) === 0;` },

        // Bitmask
        {
            topic: 'Bitmask', title: 'Subset Enumeration', badge: 'O(2^n)', note: 'Enumerate all subsets', code: `const n = 4;
for(let mask=0; mask<(1<<n); mask++){
const subset=[];
for(let i=0;i<n;i++)
if(mask&(1<<i)) subset.push(i);
console.log(mask, subset);
}
// Enumerate sub-masks
let mask=0b1011, sub=mask;
while(sub){ console.log(sub.toString(2)); sub=(sub-1)&mask; }` },

        // BFS
        {
            topic: 'Breadth-First Search', title: 'Graph BFS', badge: 'O(V+E)', note: 'Unweighted shortest path', code: `function bfs(graph, start) {
const visited=new Set([start]);
const q=[[start,0]]; // [node, dist]
while(q.length){
const [node,dist]=q.shift();
for(const nei of (graph[node]||[])){
if(!visited.has(nei)){
visited.add(nei);
q.push([nei,dist+1]);
}
}
}
}` },
        {
            topic: 'Breadth-First Search', title: 'Grid BFS', badge: 'O(nm)', note: '4-dir grid BFS', code: `function bfsGrid(grid,sr,sc){
const rows=grid.length,cols=grid[0].length;
const visited=new Set([sr+','+sc]);
const q=[[sr,sc,0]];
const dirs=[[-1,0],[1,0],[0,-1],[0,1]];
while(q.length){
const[r,c,d]=q.shift();
for(const[dr,dc] of dirs){
const nr=r+dr,nc=c+dc,key=nr+','+nc;
if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&!visited.has(key)&&grid[nr][nc]!==1){
visited.add(key); q.push([nr,nc,d+1]);
}
}
}
}` },

        // Dynamic Programming
        {
            topic: 'Dynamic Programming', title: '1D DP', badge: 'O(n)', note: 'Bottom-up DP', code: `// Fibonacci
const n=10;
const dp=new Array(n+1).fill(0);
dp[1]=1;
for(let i=2;i<=n;i++) dp[i]=dp[i-1]+dp[i-2];
// Coin change
function coinChange(coins,amount){
const dp=new Array(amount+1).fill(Infinity);
dp[0]=0;
for(const c of coins)
for(let a=c;a<=amount;a++)
dp[a]=Math.min(dp[a],dp[a-c]+1);
return dp[amount]===Infinity?-1:dp[amount];
}` },
        {
            topic: 'Dynamic Programming', title: 'LCS / 2D DP', badge: 'O(nm)', note: 'Longest common subsequence', code: `function lcs(s,t){
const m=s.length,n=t.length;
const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
for(let i=1;i<=m;i++)
for(let j=1;j<=n;j++)
dp[i][j]=s[i-1]===t[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
return dp[m][n];
}` },
        {
            topic: 'Dynamic Programming', title: 'Knapsack', badge: 'O(nW)', note: '0/1 Knapsack', code: `function knapsack(weights,values,W){
const dp=new Array(W+1).fill(0);
for(let i=0;i<weights.length;i++)
for(let w=W;w>=weights[i];w--)
dp[w]=Math.max(dp[w],dp[w-weights[i]]+values[i]);
return dp[W];
}` },

        // Graph Theory
        {
            topic: 'Graph Theory', title: 'Dijkstra', badge: 'O((V+E)log V)', note: 'Shortest path', code: `// MinHeap needed - using sorted array (demo)
function dijkstra(graph,src,n){
const dist=new Array(n).fill(Infinity);
dist[src]=0;
const visited=new Set();
// Use proper min-heap in production
const heap=[[0,src]];
heap.sort((a,b)=>a[0]-b[0]);
while(heap.length){
const[d,u]=heap.shift();
if(visited.has(u)) continue;
visited.add(u);
for(const[v,w] of (graph[u]||[])){
if(dist[u]+w<dist[v]){
dist[v]=dist[u]+w; heap.push([dist[v],v]);
heap.sort((a,b)=>a[0]-b[0]);
}
}
}
return dist;
}` },
        {
            topic: 'Graph Theory', title: 'Topological Sort', badge: 'O(V+E)', note: "Kahn's BFS topo-sort", code: `function topoSort(n,edges){
const graph=Array.from({length:n},()=>[]);
const indeg=new Array(n).fill(0);
for(const[u,v] of edges){ graph[u].push(v); indeg[v]++; }
const q=[...indeg.keys()].filter(i=>indeg[i]===0);
const order=[];
while(q.length){
const u=q.shift(); order.push(u);
for(const v of graph[u]) if(--indeg[v]===0) q.push(v);
}
return order.length===n?order:[];
}` },

        // Hash Table
        {
            topic: 'Hash Table', title: 'Map & Set', badge: 'O(1)', note: 'JS Map and Set', code: `const map=new Map();
map.set('key',1);
map.get('key');         // 1
map.has('key');         // true
map.delete('key');
map.size;
// Set
const s=new Set([1,2,3]);
s.add(4); s.has(2); s.delete(2);
// Two-sum
function twoSum(nums,target){
const seen=new Map();
for(let i=0;i<nums.length;i++){
if(seen.has(target-nums[i])) return [seen.get(target-nums[i]),i];
seen.set(nums[i],i);
}
}` },

        // Heap
        {
            topic: 'Heap (Priority Queue)', title: 'Min Heap Class', badge: 'O(log n)', note: 'Manual heap in JS', code: `class MinHeap{
constructor(){this.h=[];}
push(v){this.h.push(v);this._up(this.h.length-1);}
pop(){const m=this.h[0];const l=this.h.pop();if(this.h.length){this.h[0]=l;this._down(0);}return m;}
peek(){return this.h[0];}
size(){return this.h.length;}
_up(i){while(i>0){const p=(i-1)>>1;if(this.h[p]>this.h[i]){[this.h[p],this.h[i]]=[this.h[i],this.h[p]];i=p;}else break;}}
_down(i){const n=this.h.length;while(2*i+1<n){let c=2*i+1;if(c+1<n&&this.h[c+1]<this.h[c])c++;if(this.h[i]>this.h[c]){[this.h[i],this.h[c]]=[this.h[c],this.h[i]];i=c;}else break;}}
}` },

        // Linked List
        {
            topic: 'Linked List', title: 'Node & Reverse', badge: 'O(n)', note: 'Singly linked list ops', code: `class ListNode{constructor(val,next=null){this.val=val;this.next=next;}}
function reverse(head){
let prev=null,cur=head;
while(cur){const nxt=cur.next;cur.next=prev;prev=cur;cur=nxt;}
return prev;
}
function hasCycle(head){
let slow=head,fast=head;
while(fast&&fast.next){
slow=slow.next;fast=fast.next.next;
if(slow===fast) return true;
}
return false;
}` },

        // Math
        {
            topic: 'Math', title: 'GCD, Primes', badge: 'O(log n)', note: 'Number theory', code: `const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a/gcd(a,b)*b;
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true;};
const bigPow=(b,e,m)=>{let r=1n;b=BigInt(b)%BigInt(m);while(e>0){if(e&1)r=r*b%BigInt(m);b=b*b%BigInt(m);e>>=1;}return Number(r);};
function sieve(n){const p=new Array(n+1).fill(true);p[0]=p[1]=false;for(let i=2;i*i<=n;i++)if(p[i])for(let j=i*i;j<=n;j+=i)p[j]=false;return p;}` },

        // Prefix Sum
        {
            topic: 'Prefix Sum', title: '1D Prefix Sum', badge: 'O(1) query', note: 'Range sum queries', code: `const arr=[1,2,3,4,5];
const n=arr.length;
const prefix=new Array(n+1).fill(0);
for(let i=0;i<n;i++) prefix[i+1]=prefix[i]+arr[i];
const rangeSum=(l,r)=>prefix[r+1]-prefix[l];` },

        // Queue
        {
            topic: 'Queue', title: 'Queue (Deque)', badge: 'O(1)', note: 'JS array as queue (use deque lib for prod)', code: `// Array based (shift is O(n)!)
const q=[];
q.push(1);    // enqueue
q.shift();    // dequeue O(n) - slow!
// Better: use index pointer
class Queue{
constructor(){this.data={};this.head=0;this.tail=0;}
push(v){this.data[this.tail++]=v;}
pop(){if(this.head===this.tail)return;const v=this.data[this.head];delete this.data[this.head++];return v;}
size(){return this.tail-this.head;}
}` },

        // Segment Tree
        {
            topic: 'Segment Tree', title: 'Segment Tree', badge: 'O(log n)', note: 'Range sum, point update', code: `class SegTree{
constructor(n){this.n=n;this.tree=new Array(4*n).fill(0);}
build(arr,node,lo,hi){
if(lo===hi){this.tree[node]=arr[lo];return;}
const mid=(lo+hi)>>1;
this.build(arr,2*node,lo,mid);
this.build(arr,2*node+1,mid+1,hi);
this.tree[node]=this.tree[2*node]+this.tree[2*node+1];
}
update(node,lo,hi,idx,val){
if(lo===hi){this.tree[node]=val;return;}
const mid=(lo+hi)>>1;
if(idx<=mid)this.update(2*node,lo,mid,idx,val);
else this.update(2*node+1,mid+1,hi,idx,val);
this.tree[node]=this.tree[2*node]+this.tree[2*node+1];
}
query(node,lo,hi,l,r){
if(r<lo||hi<l)return 0;
if(l<=lo&&hi<=r)return this.tree[node];
const mid=(lo+hi)>>1;
return this.query(2*node,lo,mid,l,r)+this.query(2*node+1,mid+1,hi,l,r);
}
}` },

        // Sliding Window
        {
            topic: 'Sliding Window', title: 'Fixed Window', badge: 'O(n)', note: 'Fixed-size sliding window', code: `function maxSumK(arr,k){
let sum=arr.slice(0,k).reduce((a,b)=>a+b,0);
let max=sum;
for(let i=k;i<arr.length;i++){
sum+=arr[i]-arr[i-k];
max=Math.max(max,sum);
}
return max;
}` },
        {
            topic: 'Sliding Window', title: 'Variable Window', badge: 'O(n)', note: 'Shrink/expand window', code: `function longestSubstring(s){
const seen=new Map(); let l=0,res=0;
for(let r=0;r<s.length;r++){
if(seen.has(s[r])&&seen.get(s[r])>=l) l=seen.get(s[r])+1;
seen.set(s[r],r);
res=Math.max(res,r-l+1);
}
return res;
}` },

        // Sorting
        {
            topic: 'Sorting', title: 'Sort Patterns', badge: 'O(n log n)', note: 'Custom sort in JS', code: `// Numeric sort (default is lexicographic!)
arr.sort((a,b)=>a-b);             // ascending
arr.sort((a,b)=>b-a);             // descending
// Multi-key sort
arr.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
// String sort
arr.sort((a,b)=>a.localeCompare(b));` },

        // Stack
        {
            topic: 'Stack', title: 'Stack & Valid Parens', badge: 'O(n)', note: 'Stack with array', code: `const stack=[];
stack.push(1);          // push O(1)
stack[stack.length-1];  // peek O(1)
stack.pop();            // pop O(1)
// Valid parentheses
function isValid(s){
const st=[],m={')':'(', ']':'[', '}':'{'};
for(const c of s){
if(m[c]){if(st.pop()!==m[c])return false;}
else st.push(c);
}
return st.length===0;
}` },

        // String
        {
            topic: 'String', title: 'String Ops', badge: 'O(n)', note: 'JS string methods', code: `const s="hello world";
s.split(' ');              // ['hello','world']
['a','b'].join('-');       // 'a-b'
s.slice(0,5);              // 'hello'
s.includes('ello');        // true
s.startsWith('he');
s.replace(/l/g,'r');       // replace all
[...s].reverse().join(''); // reverse
s.charCodeAt(0);           // 104
String.fromCharCode(104);  // 'h'` },

        // String Matching
        {
            topic: 'String Matching', title: 'KMP', badge: 'O(n+m)', note: 'KMP pattern matching', code: `function kmp(text,pattern){
const lps=buildLPS(pattern); let j=0; const res=[];
for(let i=0;i<text.length;i++){
while(j>0&&text[i]!==pattern[j]) j=lps[j-1];
if(text[i]===pattern[j]) j++;
if(j===pattern.length){ res.push(i-j+1); j=lps[j-1]; }
}
return res;
}
function buildLPS(p){
const lps=new Array(p.length).fill(0); let j=0;
for(let i=1;i<p.length;){
if(p[i]===p[j]){lps[i++]=++j;}
else if(j>0){j=lps[j-1];}
else{lps[i++]=0;}
}
return lps;
}` },

        // Trie
        {
            topic: 'Trie', title: 'Trie (JS Map)', badge: 'O(m)', note: 'Trie with Map nodes', code: `class Trie{
constructor(){this.root=new Map();}
insert(word){
let node=this.root;
for(const c of word){
if(!node.has(c)) node.set(c,new Map());
node=node.get(c);
}
node.set('#',true);
}
search(word){
let node=this.root;
for(const c of word){
if(!node.has(c)) return false;
node=node.get(c);
}
return node.has('#');
}
startsWith(prefix){
let node=this.root;
for(const c of prefix){
if(!node.has(c)) return false;
node=node.get(c);
}
return true;
}
}` },

        // Two Pointers
        {
            topic: 'Two Pointers', title: 'Two Pointer Patterns', badge: 'O(n)', note: 'Classic two-pointer', code: `// Two sum (sorted)
function twoSumSorted(arr,target){
let l=0,r=arr.length-1;
while(l<r){
const s=arr[l]+arr[r];
if(s===target) return [l,r];
else if(s<target) l++;
else r--;
}
}
// 3Sum
function threeSum(nums){
nums.sort((a,b)=>a-b); const res=[];
for(let i=0;i<nums.length-2;i++){
if(i>0&&nums[i]===nums[i-1]) continue;
let l=i+1,r=nums.length-1;
while(l<r){
const s=nums[i]+nums[l]+nums[r];
if(s===0){res.push([nums[i],nums[l++],nums[r--]]);}
else if(s<0) l++; else r--;
}
}
return res;
}` },

        // Union-Find
        {
            topic: 'Union-Find', title: 'DSU', badge: 'O(α(n))', note: 'Disjoint Set Union', code: `class UnionFind{
constructor(n){this.parent=[...Array(n).keys()];this.rank=new Array(n).fill(0);}
find(x){if(this.parent[x]!==x)this.parent[x]=this.find(this.parent[x]);return this.parent[x];}
union(x,y){
const[px,py]=[this.find(x),this.find(y)];
if(px===py)return false;
if(this.rank[px]<this.rank[py])[this.parent[px],this.parent[py]]=[py,px];
else{this.parent[py]=px;if(this.rank[px]===this.rank[py])this.rank[px]++;}
return true;
}
}` },

        // Monotonic Stack
        {
            topic: 'Monotonic Stack', title: 'Next Greater Element', badge: 'O(n)', note: 'Mono-stack pattern', code: `function nextGreater(nums){
const n=nums.length,res=new Array(n).fill(-1),stack=[];
for(let i=0;i<n;i++){
while(stack.length&&nums[stack[stack.length-1]]<nums[i])
res[stack.pop()]=nums[i];
stack.push(i);
}
return res;
}` },

        // Recursion
        {
            topic: 'Recursion', title: 'Memoized Recursion', badge: 'O(n)', note: 'Top-down with memo', code: `function solve(n, memo=new Map()){
if(n<=1) return n;
if(memo.has(n)) return memo.get(n);
const res=solve(n-1,memo)+solve(n-2,memo);
memo.set(n,res);
return res;
}` },

        // Greedy
        {
            topic: 'Greedy', title: 'Interval Scheduling', badge: 'O(n log n)', note: 'Max non-overlapping', code: `function eraseOverlapIntervals(intervals){
intervals.sort((a,b)=>a[1]-b[1]);
let count=0, end=-Infinity;
for(const[s,e] of intervals){
if(s>=end) end=e;
else count++;
}
return count;
}` },

        // Depth-First Search
        {
            topic: 'Depth-First Search', title: 'DFS Graph', badge: 'O(V+E)', note: 'Recursive & iterative DFS', code: `function dfs(graph, node, visited=new Set()){
visited.add(node);
for(const nei of (graph[node]||[])){
if(!visited.has(nei)) dfs(graph,nei,visited);
}
return visited;
}
// Iterative
function dfsIter(graph,start){
const visited=new Set(), stack=[start];
while(stack.length){
const node=stack.pop();
if(visited.has(node)) continue;
visited.add(node);
for(const nei of (graph[node]||[])) if(!visited.has(nei)) stack.push(nei);
}
}` },

        // Memoization
        {
            topic: 'Memoization', title: 'Memoize Helper', badge: 'O(n)', note: 'Generic memoization', code: `function memoize(fn){
const cache=new Map();
return function(...args){
const key=JSON.stringify(args);
if(cache.has(key)) return cache.get(key);
const result=fn.apply(this,args);
cache.set(key,result);
return result;
};
}
const fib=memoize(n=>n<=1?n:fib(n-1)+fib(n-2));` },

        // Merge Sort
        {
            topic: 'Merge Sort', title: 'Merge Sort', badge: 'O(n log n)', note: 'Stable recursive sort', code: `function mergeSort(arr){
if(arr.length<=1) return arr;
const mid=arr.length>>1;
const L=mergeSort(arr.slice(0,mid));
const R=mergeSort(arr.slice(mid));
return merge(L,R);
}
function merge(L,R){
const res=[]; let i=0,j=0;
while(i<L.length&&j<R.length)
L[i]<=R[j]?res.push(L[i++]):res.push(R[j++]);
return res.concat(L.slice(i),R.slice(j));
}` },

        // Counting
        {
            topic: 'Counting', title: 'Frequency Map', badge: 'O(n)', note: 'Count occurrences', code: `// Object-based
const freq={};
for(const x of arr) freq[x]=(freq[x]||0)+1;
// Map-based
const map=new Map();
for(const x of arr) map.set(x,(map.get(x)||0)+1);
// Sort by frequency
[...map.entries()].sort((a,b)=>b[1]-a[1]);` },

        // Geometry
        {
            topic: 'Geometry', title: 'Distance & Cross Product', badge: 'O(1)', note: 'Basic geometry', code: `const dist=(p1,p2)=>Math.hypot(p2[0]-p1[0],p2[1]-p1[1]);
const cross=(O,A,B)=>(A[0]-O[0])*(B[1]-O[1])-(A[1]-O[1])*(B[0]-O[0]);
function convexHull(pts){
pts.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
const hull=[];
for(const p of [...pts,...pts.slice().reverse()]){
while(hull.length>=2&&cross(hull[hull.length-2],hull[hull.length-1],p)<=0) hull.pop();
hull.push(p);
}
return hull.slice(0,-1);
}` },

        // Prefix Sum
        {
            topic: 'Prefix Sum', title: '2D Prefix Sum', badge: 'O(1) query', note: '2D range query', code: `function build2D(mat){
const m=mat.length,n=mat[0].length;
const P=Array.from({length:m+1},()=>new Array(n+1).fill(0));
for(let i=1;i<=m;i++)
for(let j=1;j<=n;j++)
P[i][j]=mat[i-1][j-1]+P[i-1][j]+P[i][j-1]-P[i-1][j-1];
return(r1,c1,r2,c2)=>P[r2+1][c2+1]-P[r1][c2+1]-P[r2+1][c1]+P[r1][c1];
}` },

        // Monotonic Queue
        {
            topic: 'Monotonic Queue', title: 'Sliding Window Max', badge: 'O(n)', note: 'Monotonic deque', code: `function maxSlidingWindow(nums,k){
const deque=[],res=[];
for(let i=0;i<nums.length;i++){
while(deque.length&&deque[0]<i-k+1) deque.shift();
while(deque.length&&nums[deque[deque.length-1]]<nums[i]) deque.pop();
deque.push(i);
if(i>=k-1) res.push(nums[deque[0]]);
}
return res;
}` },

        // Quickselect
        {
            topic: 'Quickselect', title: 'Quickselect', badge: 'O(n) avg', note: 'K-th smallest element', code: `function quickselect(arr,k){
if(arr.length===1) return arr[0];
const pivot=arr[Math.floor(Math.random()*arr.length)];
const lo=arr.filter(x=>x<pivot);
const eq=arr.filter(x=>x===pivot);
const hi=arr.filter(x=>x>pivot);
if(k<lo.length) return quickselect(lo,k);
if(k<lo.length+eq.length) return pivot;
return quickselect(hi,k-lo.length-eq.length);
}` },

        // Combinatorics
        {
            topic: 'Combinatorics', title: 'nCr & Pascal', badge: 'O(n²)', note: 'Combinations', code: `function nCr(n,r){
if(r>n) return 0;
let num=1,den=1;
for(let i=0;i<r;i++){num*=(n-i);den*=(i+1);}
return num/den;
}
// Pascal's triangle
function pascal(n){
const tri=[[1]];
for(let i=1;i<=n;i++){
const row=[0,...tri[i-1],0];
tri.push(row.slice(1).map((_,j)=>row[j]+row[j+1]));
}
return tri;
}` },

        // Simulation
        {
            topic: 'Simulation', title: 'Matrix Simulation', badge: 'O(nm)', note: 'Simulate matrix transforms', code: `function rotate90(mat){  // in-place 90° CW
const n=mat.length;
// Transpose
for(let i=0;i<n;i++)
for(let j=i+1;j<n;j++)
[mat[i][j],mat[j][i]]=[mat[j][i],mat[i][j]];
// Reverse rows
for(const row of mat) row.reverse();
}` },

        // Sweep Line
        {
            topic: 'Sweep Line', title: 'Meeting Rooms', badge: 'O(n log n)', note: 'Sweep line event', code: `function minMeetingRooms(intervals){
const events=[];
for(const[s,e] of intervals){ events.push([s,1]); events.push([e,-1]); }
events.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
let rooms=0,cur=0;
for(const[,t] of events){ cur+=t; rooms=Math.max(rooms,cur); }
return rooms;
}` },

        // Divide and Conquer
        {
            topic: 'Divide and Conquer', title: 'D&C Template', badge: 'O(n log n)', note: 'D&C skeleton', code: `function divideConquer(arr,lo,hi){
if(lo>=hi) return baseCase;
const mid=(lo+hi)>>1;
const left=divideConquer(arr,lo,mid);
const right=divideConquer(arr,mid+1,hi);
return merge(left,right);
}` },

        // Data Stream
        {
            topic: 'Data Stream', title: 'Running Median', badge: 'O(log n)', note: 'Two heaps (use MinHeap class)', code: `// Requires MinHeap class from above
class MedianFinder{
constructor(){this.lo=new MaxHeap();this.hi=new MinHeap();}
addNum(num){
this.lo.push(num);
this.hi.push(this.lo.pop());
if(this.hi.size()>this.lo.size()) this.lo.push(this.hi.pop());
}
findMedian(){
if(this.lo.size()>this.hi.size()) return this.lo.peek();
return (this.lo.peek()+this.hi.peek())/2;
}
}` },

        // Bucket Sort
        {
            topic: 'Bucket Sort', title: 'Bucket Sort', badge: 'O(n+k)', note: 'For uniform distributions', code: `function bucketSort(arr){
if(!arr.length) return arr;
const mn=Math.min(...arr),mx=Math.max(...arr);
const n=arr.length;
const buckets=Array.from({length:n},()=>[]);
for(const x of arr){
const idx=Math.floor((x-mn)/(mx-mn+1e-9)*n);
buckets[idx].push(x);
}
for(const b of buckets) b.sort((a,c)=>a-c);
return buckets.flat();
}` },
    ],

    java: [
        // Array
        {
            topic: 'Array', title: 'Arrays & ArrayList', badge: 'O(1)', note: 'Array and List basics', code: `int[] arr = new int[10];
Arrays.fill(arr, 0);
Arrays.sort(arr);
// ArrayList
List<Integer> list = new ArrayList<>();
list.add(1);            // O(1) amortized
list.get(0);            // O(1)
list.set(0, 5);         // O(1)
list.remove(0);         // O(n)
Collections.sort(list);
Collections.reverse(list);` },
        {
            topic: 'Array', title: '2D Array', badge: 'O(nm)', note: 'Matrix in Java', code: `int rows=3, cols=4;
int[][] grid = new int[rows][cols];
grid[1][2] = 7;
// Arrays.copyOf for 1D copy
int[] copy = Arrays.copyOf(arr, arr.length);
// 2D sort by key
int[][] pts = {{3,1},{1,2},{2,0}};
Arrays.sort(pts, (a,b)->a[0]-b[0]);` },

        // Backtracking
        {
            topic: 'Backtracking', title: 'Template', badge: 'O(2^n)', note: 'Backtrack pattern', code: `List<List<Integer>> result = new ArrayList<>();
void backtrack(List<Integer> path, int[] choices, boolean[] used) {
if (isSolution(path)) {
result.add(new ArrayList<>(path));
return;
}
for (int i=0; i<choices.length; i++) {
if (used[i]) continue;
used[i]=true; path.add(choices[i]);
backtrack(path, choices, used);
path.remove(path.size()-1); used[i]=false;
}
}` },
        {
            topic: 'Backtracking', title: 'Subsets', badge: 'O(2^n)', note: 'Power set', code: `List<List<Integer>> subsets(int[] nums) {
List<List<Integer>> res = new ArrayList<>();
bt(nums, 0, new ArrayList<>(), res);
return res;
}
void bt(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
res.add(new ArrayList<>(path));
for (int i=start; i<nums.length; i++) {
path.add(nums[i]);
bt(nums, i+1, path, res);
path.remove(path.size()-1);
}
}` },

        // Binary Indexed Tree
        {
            topic: 'Binary Indexed Tree', title: 'Fenwick Tree', badge: 'O(log n)', note: 'BIT in Java', code: `class BIT {
int[] tree; int n;
BIT(int n){this.n=n;tree=new int[n+1];}
void update(int i,int delta){for(;i<=n;i+=i&(-i))tree[i]+=delta;}
int query(int i){int s=0;for(;i>0;i-=i&(-i))s+=tree[i];return s;}
int rangeQuery(int l,int r){return query(r)-query(l-1);}
}` },

        // Binary Search
        {
            topic: 'Binary Search', title: 'Arrays.binarySearch & Manual', badge: 'O(log n)', note: 'Binary search in Java', code: `import java.util.Arrays;
// Built-in (returns negative if not found)
int idx = Arrays.binarySearch(arr, target);
// Manual
int lo=0, hi=arr.length-1;
while(lo<=hi){
int mid=(lo+hi)>>>1;
if(arr[mid]==target) return mid;
else if(arr[mid]<target) lo=mid+1;
else hi=mid-1;
}` },

        // Binary Tree
        {
            topic: 'Binary Tree', title: 'TreeNode & Traversals', badge: 'O(n)', note: 'Tree traversals', code: `class TreeNode{int val;TreeNode left,right;TreeNode(int v){val=v;}}
// Inorder (iterative)
List<Integer> inorder(TreeNode root){
List<Integer> res=new ArrayList<>();
Deque<TreeNode> stack=new ArrayDeque<>();
TreeNode cur=root;
while(cur!=null||!stack.isEmpty()){
while(cur!=null){stack.push(cur);cur=cur.left;}
cur=stack.pop(); res.add(cur.val); cur=cur.right;
}
return res;
}` },
        {
            topic: 'Binary Tree', title: 'BFS Level Order', badge: 'O(n)', note: 'Level traversal', code: `List<List<Integer>> levelOrder(TreeNode root){
List<List<Integer>> res=new ArrayList<>();
if(root==null) return res;
Queue<TreeNode> q=new LinkedList<>();
q.offer(root);
while(!q.isEmpty()){
int sz=q.size(); List<Integer> level=new ArrayList<>();
for(int i=0;i<sz;i++){
    TreeNode node=q.poll(); level.add(node.val);
    if(node.left!=null)q.offer(node.left);
    if(node.right!=null)q.offer(node.right);
}
res.add(level);
}
return res;
}` },

        // Bit Manipulation
        {
            topic: 'Bit Manipulation', title: 'Bit Tricks', badge: 'O(1)', note: 'Bit ops in Java', code: `// Check k-th bit
(n >> k) & 1
// Set bit
n | (1 << k)
// Clear bit
n & ~(1 << k)
// Count set bits
Integer.bitCount(n)
// Lowest set bit
n & (-n)
// Clear lowest set bit
n & (n-1)
// Power of 2
n > 0 && (n & (n-1)) == 0` },

        // BFS
        {
            topic: 'Breadth-First Search', title: 'Graph BFS', badge: 'O(V+E)', note: 'BFS with Queue', code: `void bfs(Map<Integer,List<Integer>> graph, int start){
Set<Integer> visited=new HashSet<>();
Queue<int[]> q=new LinkedList<>(); // [node, dist]
q.offer(new int[]{start,0});
visited.add(start);
while(!q.isEmpty()){
int[] cur=q.poll(); int node=cur[0],dist=cur[1];
for(int nei:graph.getOrDefault(node,new ArrayList<>())){
    if(!visited.contains(nei)){
        visited.add(nei); q.offer(new int[]{nei,dist+1});
    }
}
}
}` },

        // Dynamic Programming
        {
            topic: 'Dynamic Programming', title: '1D DP', badge: 'O(n)', note: 'Bottom-up DP', code: `// Coin change
int coinChange(int[] coins, int amount){
int[] dp = new int[amount+1];
Arrays.fill(dp, amount+1);
dp[0]=0;
for(int c:coins)
for(int a=c;a<=amount;a++)
    dp[a]=Math.min(dp[a],dp[a-c]+1);
return dp[amount]>amount?-1:dp[amount];
}` },
        {
            topic: 'Dynamic Programming', title: '2D DP / Knapsack', badge: 'O(nW)', note: '0/1 Knapsack', code: `int knapsack(int[] w, int[] v, int W){
int n=w.length;
int[] dp=new int[W+1];
for(int i=0;i<n;i++)
for(int cap=W;cap>=w[i];cap--)
    dp[cap]=Math.max(dp[cap],dp[cap-w[i]]+v[i]);
return dp[W];
}` },

        // Graph Theory
        {
            topic: 'Graph Theory', title: 'Dijkstra', badge: 'O((V+E)log V)', note: 'PriorityQueue Dijkstra', code: `int[] dijkstra(List<int[]>[] graph, int src, int n){
int[] dist=new int[n]; Arrays.fill(dist,Integer.MAX_VALUE); dist[src]=0;
PriorityQueue<int[]> pq=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));
pq.offer(new int[]{0,src});
while(!pq.isEmpty()){
int[] cur=pq.poll(); int d=cur[0],u=cur[1];
if(d>dist[u]) continue;
for(int[] e:graph[u]){
    int v=e[0],w=e[1];
    if(dist[u]+w<dist[v]){ dist[v]=dist[u]+w; pq.offer(new int[]{dist[v],v}); }
}
}
return dist;
}` },

        // Hash Table
        {
            topic: 'Hash Table', title: 'HashMap & HashSet', badge: 'O(1)', note: 'Java Map operations', code: `Map<String,Integer> map=new HashMap<>();
map.put("a",1);
map.getOrDefault("b",0);
map.containsKey("a");
map.remove("a");
map.getOrDefault("x",0)+1; // freq count
// Two-sum
Map<Integer,Integer> seen=new HashMap<>();
for(int i=0;i<nums.length;i++){
if(seen.containsKey(target-nums[i]))
return new int[]{seen.get(target-nums[i]),i};
seen.put(nums[i],i);
}` },

        // Heap
        {
            topic: 'Heap (Priority Queue)', title: 'PriorityQueue', badge: 'O(log n)', note: 'Min/Max heap in Java', code: `// Min-heap (default)
PriorityQueue<Integer> minPQ=new PriorityQueue<>();
// Max-heap
PriorityQueue<Integer> maxPQ=new PriorityQueue<>(Collections.reverseOrder());
minPQ.offer(3); minPQ.offer(1);
minPQ.peek();   // 1 (min)
minPQ.poll();   // remove min
// Custom comparator
PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->a[1]-b[1]);` },

        // Linked List
        {
            topic: 'Linked List', title: 'ListNode & Reverse', badge: 'O(n)', note: 'Linked list operations', code: `class ListNode{int val;ListNode next;ListNode(int v){val=v;}}
ListNode reverse(ListNode head){
ListNode prev=null,cur=head;
while(cur!=null){
ListNode nxt=cur.next; cur.next=prev; prev=cur; cur=nxt;
}
return prev;
}
boolean hasCycle(ListNode head){
ListNode slow=head,fast=head;
while(fast!=null&&fast.next!=null){
slow=slow.next; fast=fast.next.next;
if(slow==fast) return true;
}
return false;
}` },

        // Math
        {
            topic: 'Math', title: 'GCD, Prime, Modexp', badge: 'O(log n)', note: 'Java math ops', code: `long gcd(long a,long b){return b==0?a:gcd(b,a%b);}
long lcm(long a,long b){return a/gcd(a,b)*b;}
boolean isPrime(int n){if(n<2)return false;for(int i=2;i*i<=n;i++)if(n%i==0)return false;return true;}
// Modular exponentiation
long modPow(long base,long exp,long mod){
long res=1; base%=mod;
while(exp>0){if((exp&1)==1)res=res*base%mod;base=base*base%mod;exp>>=1;}
return res;
}` },

        // Prefix Sum
        {
            topic: 'Prefix Sum', title: 'Prefix Sum Array', badge: 'O(1) query', note: 'Java prefix sum', code: `int[] arr={1,2,3,4,5};
int n=arr.length;
int[] prefix=new int[n+1];
for(int i=0;i<n;i++) prefix[i+1]=prefix[i]+arr[i];
// Range sum [l,r] inclusive
int rangeSum(int l,int r){return prefix[r+1]-prefix[l];}` },

        // Queue / Stack
        {
            topic: 'Queue', title: 'Queue & Deque', badge: 'O(1)', note: 'Java Queue ops', code: `Queue<Integer> q=new LinkedList<>();
q.offer(1);     // enqueue
q.poll();       // dequeue
q.peek();       // front without remove
// Deque as both stack & queue
Deque<Integer> dq=new ArrayDeque<>();
dq.push(1);         // stack push
dq.pop();           // stack pop
dq.offerLast(1);    // queue enqueue
dq.pollFirst();     // queue dequeue` },
        {
            topic: 'Stack', title: 'Stack & Monotonic', badge: 'O(n)', note: 'Stack in Java', code: `Deque<Integer> stack=new ArrayDeque<>();
stack.push(1);       // push
stack.peek();        // peek top
stack.pop();         // pop
// Monotonic stack: next greater
int[] nextGreater(int[] nums){
int n=nums.length; int[] res=new int[n]; Arrays.fill(res,-1);
Deque<Integer> st=new ArrayDeque<>();
for(int i=0;i<n;i++){
while(!st.isEmpty()&&nums[st.peek()]<nums[i]) res[st.pop()]=nums[i];
st.push(i);
}
return res;
}` },

        // Sliding Window
        {
            topic: 'Sliding Window', title: 'Sliding Window', badge: 'O(n)', note: 'Java sliding window', code: `// Fixed window max sum
int maxSumK(int[] arr, int k){
int sum=0,max;
for(int i=0;i<k;i++) sum+=arr[i];
max=sum;
for(int i=k;i<arr.length;i++){
sum+=arr[i]-arr[i-k];
max=Math.max(max,sum);
}
return max;
}` },

        // Sorting
        {
            topic: 'Sorting', title: 'Sort Patterns', badge: 'O(n log n)', note: 'Java sort APIs', code: `Arrays.sort(arr);                     // primitives
Arrays.sort(arr, (a,b)->b-a);         // desc (Integer[])
// Multi-key
Arrays.sort(pairs,(a,b)->a[0]!=b[0]?a[0]-b[0]:a[1]-b[1]);
// Collections
Collections.sort(list);
Collections.sort(list, Comparator.comparingInt(x->x[1]));` },

        // String
        {
            topic: 'String', title: 'String Ops', badge: 'O(n)', note: 'Java string methods', code: `String s="hello world";
s.charAt(0);               // 'h'
s.substring(0,5);          // "hello"
s.split(" ");              // String[]
String.join("-","a","b");  // "a-b"
s.contains("ell");
s.replace('l','r');
new StringBuilder(s).reverse().toString();
s.toCharArray();
(int)'a'; (char)97;
s.toLowerCase(); s.trim();` },

        // Trie
        {
            topic: 'Trie', title: 'Trie', badge: 'O(m)', note: 'Prefix tree in Java', code: `class Trie{
TrieNode root=new TrieNode();
static class TrieNode{TrieNode[]c=new TrieNode[26];boolean end;}
void insert(String w){
TrieNode n=root;
for(char c:w.toCharArray()){int i=c-'a';if(n.c[i]==null)n.c[i]=new TrieNode();n=n.c[i];}
n.end=true;
}
boolean search(String w){TrieNode n=root;for(char c:w.toCharArray()){int i=c-'a';if(n.c[i]==null)return false;n=n.c[i];}return n.end;}
boolean startsWith(String p){TrieNode n=root;for(char c:p.toCharArray()){int i=c-'a';if(n.c[i]==null)return false;n=n.c[i];}return true;}
}` },

        // Two Pointers
        {
            topic: 'Two Pointers', title: 'Two Pointers', badge: 'O(n)', note: 'Classic patterns', code: `// Two sum in sorted array
int[] twoSum(int[] arr, int target){
int l=0,r=arr.length-1;
while(l<r){
int s=arr[l]+arr[r];
if(s==target) return new int[]{l,r};
else if(s<target) l++;
else r--;
}
return new int[]{};
}` },

        // Union-Find
        {
            topic: 'Union-Find', title: 'DSU', badge: 'O(α(n))', note: 'Union-Find in Java', code: `class UnionFind{
int[] parent,rank;
UnionFind(int n){parent=new int[n];rank=new int[n];for(int i=0;i<n;i++)parent[i]=i;}
int find(int x){if(parent[x]!=x)parent[x]=find(parent[x]);return parent[x];}
boolean union(int x,int y){
int px=find(x),py=find(y); if(px==py)return false;
if(rank[px]<rank[py]){int t=px;px=py;py=t;}
parent[py]=px; if(rank[px]==rank[py])rank[px]++;
return true;
}
}` },

        // Segment Tree
        {
            topic: 'Segment Tree', title: 'Segment Tree', badge: 'O(log n)', note: 'Range query, point update', code: `class SegTree{
int[] tree; int n;
SegTree(int n){this.n=n;tree=new int[4*n];}
void update(int node,int lo,int hi,int idx,int val){
if(lo==hi){tree[node]=val;return;}
int mid=(lo+hi)/2;
if(idx<=mid)update(2*node,lo,mid,idx,val);
else update(2*node+1,mid+1,hi,idx,val);
tree[node]=tree[2*node]+tree[2*node+1];
}
int query(int node,int lo,int hi,int l,int r){
if(r<lo||hi<l)return 0; if(l<=lo&&hi<=r)return tree[node];
int mid=(lo+hi)/2;
return query(2*node,lo,mid,l,r)+query(2*node+1,mid+1,hi,l,r);
}
}` },

        // Topological Sort
        {
            topic: 'Topological Sort', title: "Kahn's Algorithm", badge: 'O(V+E)', note: 'Java topo sort', code: `int[] topoSort(int n, int[][] edges){
List<List<Integer>> g=new ArrayList<>();
int[] indeg=new int[n];
for(int i=0;i<n;i++)g.add(new ArrayList<>());
for(int[]e:edges){g.get(e[0]).add(e[1]);indeg[e[1]]++;}
Queue<Integer> q=new LinkedList<>();
for(int i=0;i<n;i++)if(indeg[i]==0)q.offer(i);
int[] order=new int[n]; int idx=0;
while(!q.isEmpty()){
int u=q.poll(); order[idx++]=u;
for(int v:g.get(u))if(--indeg[v]==0)q.offer(v);
}
return idx==n?order:new int[]{};
}` },

        // Greedy
        {
            topic: 'Greedy', title: 'Interval Scheduling', badge: 'O(n log n)', note: 'Greedy intervals', code: `int eraseOverlapIntervals(int[][] intervals){
Arrays.sort(intervals,(a,b)->a[1]-b[1]);
int count=0; int end=Integer.MIN_VALUE;
for(int[] iv:intervals){
if(iv[0]>=end) end=iv[1];
else count++;
}
return count;
}` },

        // DFS
        {
            topic: 'Depth-First Search', title: 'Graph DFS', badge: 'O(V+E)', note: 'Recursive DFS', code: `void dfs(Map<Integer,List<Integer>> graph, int node, Set<Integer> visited){
visited.add(node);
for(int nei:graph.getOrDefault(node,new ArrayList<>()))
if(!visited.contains(nei)) dfs(graph,nei,visited);
}` },

        // Memoization
        {
            topic: 'Memoization', title: 'Memoization with Map', badge: 'O(n)', note: 'Top-down DP', code: `Map<Integer,Long> memo=new HashMap<>();
long fib(int n){
if(n<=1) return n;
if(memo.containsKey(n)) return memo.get(n);
long res=fib(n-1)+fib(n-2);
memo.put(n,res);
return res;
}` },

        // Merge Sort
        {
            topic: 'Merge Sort', title: 'Merge Sort', badge: 'O(n log n)', note: 'Stable sort implementation', code: `void mergeSort(int[] arr, int lo, int hi){
if(lo>=hi) return;
int mid=(lo+hi)/2;
mergeSort(arr,lo,mid); mergeSort(arr,mid+1,hi);
merge(arr,lo,mid,hi);
}
void merge(int[] arr, int lo, int mid, int hi){
int[] tmp=Arrays.copyOfRange(arr,lo,hi+1);
int i=0,j=mid-lo+1,k=lo;
while(i<=mid-lo&&j<=hi-lo) arr[k++]=tmp[i]<=tmp[j]?tmp[i++]:tmp[j++];
while(i<=mid-lo) arr[k++]=tmp[i++];
while(j<=hi-lo) arr[k++]=tmp[j++];
}` },

        // Monotonic Stack
        {
            topic: 'Monotonic Stack', title: 'Largest Rectangle', badge: 'O(n)', note: 'Histogram problem', code: `int largestRectangleArea(int[] h){
Deque<Integer> st=new ArrayDeque<>(); int res=0;
int[] heights=Arrays.copyOf(h,h.length+1);
for(int i=0;i<heights.length;i++){
while(!st.isEmpty()&&heights[st.peek()]>heights[i]){
    int H=heights[st.pop()];
    int W=st.isEmpty()?i:i-st.peek()-1;
    res=Math.max(res,H*W);
}
st.push(i);
}
return res;
}` },

        // Counting
        {
            topic: 'Counting', title: 'Frequency with Map', badge: 'O(n)', note: 'Count in Java', code: `Map<Integer,Integer> freq=new HashMap<>();
for(int x:arr) freq.merge(x,1,Integer::sum);
// getOrDefault pattern
freq.put(x,freq.getOrDefault(x,0)+1);
// Sort by frequency
List<Map.Entry<Integer,Integer>> entries=new ArrayList<>(freq.entrySet());
entries.sort((a,b)->b.getValue()-a.getValue());` },

        // String Matching
        {
            topic: 'String Matching', title: 'KMP', badge: 'O(n+m)', note: 'KMP in Java', code: `int[] kmpSearch(String text,String pattern){
int[] lps=buildLPS(pattern); int j=0; List<Integer> res=new ArrayList<>();
for(int i=0;i<text.length();i++){
while(j>0&&text.charAt(i)!=pattern.charAt(j)) j=lps[j-1];
if(text.charAt(i)==pattern.charAt(j)) j++;
if(j==pattern.length()){res.add(i-j+1);j=lps[j-1];}
}
return res.stream().mapToInt(Integer::intValue).toArray();
}
int[] buildLPS(String p){
int[] lps=new int[p.length()]; int j=0;
for(int i=1;i<p.length();){
if(p.charAt(i)==p.charAt(j)){lps[i++]=++j;}
else if(j>0){j=lps[j-1];}else{lps[i++]=0;}
}
return lps;
}` },
    ],

    php: [
        // Array
        {
            topic: 'Array', title: 'Array Basics', badge: 'O(1)', note: 'PHP array operations', code: `$arr = [];
$arr[] = 1;                // append O(1)
array_push($arr, 2);       // same as above
array_pop($arr);           // remove last
array_shift($arr);         // remove first O(n)
array_unshift($arr, 0);    // prepend O(n)
count($arr);               // length
in_array(3, $arr);         // O(n) search
array_reverse($arr);       // reversed copy` },
        {
            topic: 'Array', title: 'Sorting & Slicing', badge: 'O(n log n)', note: 'PHP sort functions', code: `sort($arr);                // ascending (reindex)
rsort($arr);               // descending
usort($arr, fn($a,$b)=>$a-$b); // custom
$sub = array_slice($arr,1,3); // [1..3]
$flat = array_merge(...$matrix); // flatten
array_unique($arr);        // remove duplicates
array_flip($arr);          // swap keys/values` },
        {
            topic: 'Array', title: 'Functional Ops', badge: 'O(n)', note: 'map/filter/reduce', code: `$nums = [1,2,3,4,5];
$doubled = array_map(fn($x)=>$x*2, $nums);
$evens = array_filter($nums, fn($x)=>$x%2===0);
$sum = array_reduce($nums, fn($carry,$x)=>$carry+$x, 0);
// Array as hash
$freq = array_count_values($arr);
// Combine keys & values
$keys=[]; $vals=[];
array_combine($keys,$vals);` },

        // Backtracking
        {
            topic: 'Backtracking', title: 'Template', badge: 'O(2^n)', note: 'Backtrack in PHP', code: `$result = [];
function backtrack(array &$path, array $choices, array &$result): void {
if (isSolution($path)) {
$result[] = $path;
return;
}
foreach ($choices as $i => $c) {
$path[] = $c;
backtrack($path, remainingChoices($choices, $i), $result);
array_pop($path); // undo
}
}` },
        {
            topic: 'Backtracking', title: 'Subsets', badge: 'O(2^n)', note: 'Power set in PHP', code: `function subsets(array $nums): array {
$res = [];
function bt(array $nums, int $start, array $path, array &$res): void {
$res[] = $path;
for ($i=$start; $i<count($nums); $i++) {
    $path[] = $nums[$i];
    bt($nums, $i+1, $path, $res);
    array_pop($path);
}
}
bt($nums, 0, [], $res);
return $res;
}` },

        // Binary Indexed Tree
        {
            topic: 'Binary Indexed Tree', title: 'Fenwick Tree', badge: 'O(log n)', note: 'BIT in PHP', code: `class BIT {
private array $tree;
private int $n;
public function __construct(int $n) {
$this->n=$n; $this->tree=array_fill(0,$n+1,0);
}
public function update(int $i, int $delta): void {
for(;$i<=$this->n;$i+=$i&(-$i)) $this->tree[$i]+=$delta;
}
public function query(int $i): int {
$s=0; for(;$i>0;$i-=$i&(-$i)) $s+=$this->tree[$i]; return $s;
}
public function rangeQuery(int $l, int $r): int {
return $this->query($r)-$this->query($l-1);
}
}` },

        // Binary Search
        {
            topic: 'Binary Search', title: 'Binary Search', badge: 'O(log n)', note: 'PHP binary search', code: `function binarySearch(array $arr, int $target): int {
$lo=0; $hi=count($arr)-1;
while($lo<=$hi){
$mid=intdiv($lo+$hi,2);
if($arr[$mid]===$target) return $mid;
elseif($arr[$mid]<$target) $lo=$mid+1;
else $hi=$mid-1;
}
return -1;
}
// Lower bound
function lowerBound(array $arr, int $target): int {
$lo=0;$hi=count($arr);
while($lo<$hi){$mid=intdiv($lo+$hi,2);$arr[$mid]<$target?$lo=$mid+1:$hi=$mid;}
return $lo;
}` },

        // Binary Tree
        {
            topic: 'Binary Tree', title: 'TreeNode & Traversals', badge: 'O(n)', note: 'Tree in PHP', code: `class TreeNode{public int $val;public ?TreeNode $left=null,$right=null;public function __construct(int $v){$this->val=$v;}}
function inorder(?TreeNode $root, array &$res=[]): array {
if($root){inorder($root->left,$res);$res[]=$root->val;inorder($root->right,$res);}
return $res;
}
function height(?TreeNode $root): int {
if(!$root) return 0;
return 1+max(height($root->left),height($root->right));
}` },
        {
            topic: 'Binary Tree', title: 'BFS Level Order', badge: 'O(n)', note: 'BFS in PHP', code: `function levelOrder(?TreeNode $root): array {
if(!$root) return [];
$res=[]; $q=[$root];
while($q){
$level=[]; $size=count($q);
for($i=0;$i<$size;$i++){
    $node=array_shift($q); $level[]=$node->val;
    if($node->left)$q[]=$node->left;
    if($node->right)$q[]=$node->right;
}
$res[]=$level;
}
return $res;
}` },

        // Bit Manipulation
        {
            topic: 'Bit Manipulation', title: 'Bit Tricks', badge: 'O(1)', note: 'PHP bit ops', code: `// Check k-th bit
($n >> $k) & 1;
// Set bit
$n | (1 << $k);
// Clear bit
$n & ~(1 << $k);
// Count set bits
substr_count(decbin($n), '1');
// Lowest set bit
$n & (-$n);
// Power of 2
$n > 0 && ($n & ($n-1)) === 0;` },

        // BFS
        {
            topic: 'Breadth-First Search', title: 'Graph BFS', badge: 'O(V+E)', note: 'BFS in PHP', code: `function bfs(array $graph, int $start): array {
$visited=[$start=>true]; $q=[[$start,0]]; $result=[];
while($q){
[$node,$dist]=array_shift($q);
$result[]=$node;
foreach($graph[$node]??[] as $nei){
    if(!isset($visited[$nei])){
        $visited[$nei]=true; $q[]=[$nei,$dist+1];
    }
}
}
return $result;
}` },

        // Dynamic Programming
        {
            topic: 'Dynamic Programming', title: 'Coin Change', badge: 'O(nA)', note: 'DP in PHP', code: `function coinChange(array $coins, int $amount): int {
$dp=array_fill(0,$amount+1,INF);
$dp[0]=0;
foreach($coins as $c)
for($a=$c;$a<=$amount;$a++)
    $dp[$a]=min($dp[$a],$dp[$a-$c]+1);
return $dp[$amount]===INF?-1:$dp[$amount];
}` },
        {
            topic: 'Dynamic Programming', title: 'LCS', badge: 'O(nm)', note: 'Longest Common Subsequence', code: `function lcs(string $s, string $t): int {
$m=strlen($s); $n=strlen($t);
$dp=array_fill(0,$m+1,array_fill(0,$n+1,0));
for($i=1;$i<=$m;$i++)
for($j=1;$j<=$n;$j++)
    $dp[$i][$j]=$s[$i-1]===$t[$j-1]
        ?$dp[$i-1][$j-1]+1
        :max($dp[$i-1][$j],$dp[$i][$j-1]);
return $dp[$m][$n];
}` },
        {
            topic: 'Dynamic Programming', title: 'Knapsack', badge: 'O(nW)', note: '0/1 Knapsack PHP', code: `function knapsack(array $w, array $v, int $W): int {
$dp=array_fill(0,$W+1,0);
$n=count($w);
for($i=0;$i<$n;$i++)
for($cap=$W;$cap>=$w[$i];$cap--)
    $dp[$cap]=max($dp[$cap],$dp[$cap-$w[$i]]+$v[$i]);
return $dp[$W];
}` },

        // Graph Theory
        {
            topic: 'Graph Theory', title: 'Dijkstra', badge: 'O((V+E)log V)', note: 'Dijkstra in PHP (SplMinHeap)', code: `function dijkstra(array $graph, int $src, int $n): array {
$dist=array_fill(0,$n,PHP_INT_MAX); $dist[$src]=0;
$heap=new SplMinHeap(); $heap->insert([0,$src]);
while(!$heap->isEmpty()){
[$d,$u]=$heap->extract();
if($d>$dist[$u]) continue;
foreach($graph[$u]??[] as [$v,$w])
    if($dist[$u]+$w<$dist[$v]){$dist[$v]=$dist[$u]+$w;$heap->insert([$dist[$v],$v]);}
}
return $dist;
}` },

        // Hash Table
        {
            topic: 'Hash Table', title: 'Associative Array', badge: 'O(1)', note: 'PHP assoc array as hash map', code: `// PHP arrays are hash maps
$map = [];
$map['key'] = 'value';
isset($map['key']);          // O(1) check
unset($map['key']);          // remove
$map['x'] = ($map['x'] ?? 0) + 1; // freq count
// Two-sum
$seen = [];
foreach($nums as $i=>$x){
if(isset($seen[$target-$x])) return [$seen[$target-$x],$i];
$seen[$x]=$i;
}` },

        // Heap
        {
            topic: 'Heap (Priority Queue)', title: 'SplMinHeap / SplMaxHeap', badge: 'O(log n)', note: 'PHP SPL heaps', code: `$minHeap = new SplMinHeap();
$minHeap->insert(3);
$minHeap->insert(1);
$minHeap->top();     // 1 (peek)
$minHeap->extract(); // 1 (poll)
$maxHeap = new SplMaxHeap();
$maxHeap->insert(5);
$maxHeap->insert(10);
$maxHeap->extract(); // 10` },

        // Linked List
        {
            topic: 'Linked List', title: 'ListNode & Reverse', badge: 'O(n)', note: 'PHP linked list', code: `class ListNode{public int $val;public ?ListNode $next=null;public function __construct(int $v){$this->val=$v;}}
function reverse(?ListNode $head): ?ListNode {
$prev=null;$cur=$head;
while($cur){$nxt=$cur->next;$cur->next=$prev;$prev=$cur;$cur=$nxt;}
return $prev;
}
function hasCycle(?ListNode $head): bool {
$slow=$fast=$head;
while($fast&&$fast->next){$slow=$slow->next;$fast=$fast->next->next;if($slow===$fast)return true;}
return false;
}` },

        // Math
        {
            topic: 'Math', title: 'GCD, Prime, ModExp', badge: 'O(log n)', note: 'PHP math', code: `function gcd(int $a,int $b):int{return $b===0?$a:gcd($b,$a%$b);}
function lcm(int $a,int $b):int{return intdiv($a,gcd($a,$b))*$b;}
function isPrime(int $n):bool{if($n<2)return false;for($i=2;$i*$i<=$n;$i++)if($n%$i===0)return false;return true;}
function modPow(int $base,int $exp,int $mod):int{
$res=1;$base%=$mod;
while($exp>0){if($exp&1)$res=$res*$base%$mod;$base=$base*$base%$mod;$exp>>=1;}
return $res;
}` },

        // Prefix Sum
        {
            topic: 'Prefix Sum', title: 'Prefix Sum', badge: 'O(1) query', note: 'PHP prefix sum', code: `$arr=[1,2,3,4,5]; $n=count($arr);
$prefix=array_fill(0,$n+1,0);
for($i=0;$i<$n;$i++) $prefix[$i+1]=$prefix[$i]+$arr[$i];
$rangeSum=fn($l,$r)=>$prefix[$r+1]-$prefix[$l];
echo $rangeSum(1,3); // 2+3+4 = 9` },

        // Queue / Stack
        {
            topic: 'Queue', title: 'SplQueue & array', badge: 'O(1)', note: 'PHP queue', code: `$q=new SplQueue();
$q->enqueue(1);      // O(1)
$q->dequeue();       // O(1)
$q->bottom();        // peek front
// Array-based (array_shift is O(n))
$q=[];
array_push($q,1);
array_shift($q);     // avoid in hot loops!` },
        {
            topic: 'Stack', title: 'Stack Operations', badge: 'O(1)', note: 'PHP array as stack', code: `$stack=[];
array_push($stack,1);      // push O(1)
end($stack);               // peek O(1)
array_pop($stack);         // pop O(1)
// SplStack
$s=new SplStack();
$s->push(1);$s->top();$s->pop();
// Valid parentheses
function isValid(string $s):bool{
$st=[];$m=[')'=>'(',']'=>'[','}'=>'{'];
foreach(str_split($s) as $c){
if(isset($m[$c])){if(!$st||end($st)!==$m[$c])return false;array_pop($st);}
else $st[]=$c;
}
return !$st;
}` },

        // Sliding Window
        {
            topic: 'Sliding Window', title: 'Sliding Window', badge: 'O(n)', note: 'PHP sliding window', code: `function maxSumK(array $arr, int $k): int {
$sum=array_sum(array_slice($arr,0,$k));
$max=$sum; $n=count($arr);
for($i=$k;$i<$n;$i++){
$sum+=$arr[$i]-$arr[$i-$k];
$max=max($max,$sum);
}
return $max;
}` },
        {
            topic: 'Sliding Window', title: 'Variable Window', badge: 'O(n)', note: 'Shrink/expand in PHP', code: `function lengthOfLongestSubstring(string $s): int {
$seen=[];$l=0;$res=0;
for($r=0;$r<strlen($s);$r++){
$c=$s[$r];
if(isset($seen[$c])&&$seen[$c]>=$l) $l=$seen[$c]+1;
$seen[$c]=$r;
$res=max($res,$r-$l+1);
}
return $res;
}` },

        // Sorting
        {
            topic: 'Sorting', title: 'Sort Patterns', badge: 'O(n log n)', note: 'PHP sort reference', code: `sort($arr);           // ascending (re-indexes)
rsort($arr);          // descending
asort($arr);          // sort values, keep keys
ksort($arr);          // sort by key
usort($arr, fn($a,$b)=>$a[1]-$b[1]); // by column
// Multi-key
usort($arr, fn($a,$b)=>$a[0]-$b[0]?:$a[1]-$b[1]);` },

        // String
        {
            topic: 'String', title: 'String Ops', badge: 'O(n)', note: 'PHP string functions', code: `$s="hello world";
strlen($s);              // 11
str_split($s);           // array of chars
explode(' ',$s);         // ['hello','world']
implode('-',['a','b']);  // 'a-b'
substr($s,0,5);          // 'hello'
strpos($s,'world');      // 6
str_replace('l','r',$s);
strrev($s);              // reverse
strtolower($s);
ord('a'); chr(97);       // 97, 'a'` },

        // Trie
        {
            topic: 'Trie', title: 'Trie', badge: 'O(m)', note: 'PHP Trie implementation', code: `class Trie{
private array $root=[];
public function insert(string $w):void{
$node=&$this->root;
foreach(str_split($w) as $c){
    if(!isset($node[$c])) $node[$c]=[];
    $node=&$node[$c];
}
$node['#']=true;
}
public function search(string $w):bool{
$node=&$this->root;
foreach(str_split($w) as $c){if(!isset($node[$c]))return false;$node=&$node[$c];}
return isset($node['#']);
}
public function startsWith(string $p):bool{
$node=&$this->root;
foreach(str_split($p) as $c){if(!isset($node[$c]))return false;$node=&$node[$c];}
return true;
}
}` },

        // Two Pointers
        {
            topic: 'Two Pointers', title: 'Two Pointer Patterns', badge: 'O(n)', note: 'PHP two pointers', code: `function twoSum(array $arr, int $target): array {
$l=0; $r=count($arr)-1;
while($l<$r){
$s=$arr[$l]+$arr[$r];
if($s===$target) return [$l,$r];
elseif($s<$target) $l++;
else $r--;
}
return [];
}` },

        // Union-Find
        {
            topic: 'Union-Find', title: 'DSU', badge: 'O(α(n))', note: 'Union-Find in PHP', code: `class UnionFind{
private array $parent,$rank;
public function __construct(int $n){
$this->parent=range(0,$n-1);$this->rank=array_fill(0,$n,0);
}
public function find(int $x):int{
if($this->parent[$x]!==$x)$this->parent[$x]=$this->find($this->parent[$x]);
return $this->parent[$x];
}
public function union(int $x,int $y):bool{
$px=$this->find($x);$py=$this->find($y);if($px===$py)return false;
if($this->rank[$px]<$this->rank[$py])[$px,$py]=[$py,$px];
$this->parent[$py]=$px;if($this->rank[$px]===$this->rank[$py])$this->rank[$px]++;
return true;
}
}` },

        // Segment Tree
        {
            topic: 'Segment Tree', title: 'Segment Tree', badge: 'O(log n)', note: 'PHP segment tree', code: `class SegTree{
private array $tree; private int $n;
public function __construct(int $n){$this->n=$n;$this->tree=array_fill(0,4*$n,0);}
public function update(int $node,int $lo,int $hi,int $idx,int $val):void{
if($lo===$hi){$this->tree[$node]=$val;return;}
$mid=intdiv($lo+$hi,2);
$idx<=$mid?$this->update(2*$node,$lo,$mid,$idx,$val):$this->update(2*$node+1,$mid+1,$hi,$idx,$val);
$this->tree[$node]=$this->tree[2*$node]+$this->tree[2*$node+1];
}
public function query(int $node,int $lo,int $hi,int $l,int $r):int{
if($r<$lo||$hi<$l)return 0;if($l<=$lo&&$hi<=$r)return $this->tree[$node];
$mid=intdiv($lo+$hi,2);
return $this->query(2*$node,$lo,$mid,$l,$r)+$this->query(2*$node+1,$mid+1,$hi,$l,$r);
}
}` },

        // Topological Sort
        {
            topic: 'Topological Sort', title: "Kahn's Algorithm", badge: 'O(V+E)', note: 'PHP topo sort', code: `function topoSort(int $n, array $edges): array {
$graph=array_fill(0,$n,[]);$indeg=array_fill(0,$n,0);
foreach($edges as[$u,$v]){$graph[$u][]=$v;$indeg[$v]++;}
$q=[];for($i=0;$i<$n;$i++)if($indeg[$i]===0)$q[]=$i;
$order=[];
while($q){
$u=array_shift($q);$order[]=$u;
foreach($graph[$u] as $v)if(--$indeg[$v]===0)$q[]=$v;
}
return count($order)===$n?$order:[];
}` },

        // Greedy
        {
            topic: 'Greedy', title: 'Interval Scheduling', badge: 'O(n log n)', note: 'Greedy PHP', code: `function eraseOverlapIntervals(array $intervals): int {
usort($intervals,fn($a,$b)=>$a[1]-$b[1]);
$count=0;$end=PHP_INT_MIN;
foreach($intervals as[$s,$e]){
if($s>=$end) $end=$e;
else $count++;
}
return $count;
}` },

        // DFS
        {
            topic: 'Depth-First Search', title: 'Graph DFS', badge: 'O(V+E)', note: 'PHP DFS', code: `function dfs(array $graph, int $node, array &$visited): void {
$visited[$node]=true;
foreach($graph[$node]??[] as $nei)
if(!isset($visited[$nei])) dfs($graph,$nei,$visited);
}
// Iterative
function dfsIter(array $graph, int $start): array {
$visited=[];$stack=[$start];
while($stack){
$node=array_pop($stack);if(isset($visited[$node]))continue;
$visited[$node]=true;
foreach($graph[$node]??[] as $nei) if(!isset($visited[$nei]))$stack[]=$nei;
}
return $visited;
}` },

        // Memoization
        {
            topic: 'Memoization', title: 'Memoization', badge: 'O(n)', note: 'PHP top-down DP', code: `$memo=[];
function fib(int $n, array &$memo): int {
if($n<=1) return $n;
if(isset($memo[$n])) return $memo[$n];
$memo[$n]=fib($n-1,$memo)+fib($n-2,$memo);
return $memo[$n];
}` },

        // Merge Sort
        {
            topic: 'Merge Sort', title: 'Merge Sort', badge: 'O(n log n)', note: 'PHP merge sort', code: `function mergeSort(array $arr): array {
$n=count($arr); if($n<=1) return $arr;
$mid=intdiv($n,2);
$L=mergeSort(array_slice($arr,0,$mid));
$R=mergeSort(array_slice($arr,$mid));
return merge($L,$R);
}
function merge(array $L, array $R): array {
$res=[];$i=$j=0;
while($i<count($L)&&$j<count($R))
$L[$i]<=$R[$j]?$res[]=$L[$i++]:$res[]=$R[$j++];
return array_merge($res,array_slice($L,$i),array_slice($R,$j));
}` },

        // Monotonic Stack
        {
            topic: 'Monotonic Stack', title: 'Next Greater Element', badge: 'O(n)', note: 'Mono-stack PHP', code: `function nextGreater(array $nums): array {
$n=count($nums);$res=array_fill(0,$n,-1);$stack=[];
for($i=0;$i<$n;$i++){
while($stack&&$nums[end($stack)]<$nums[$i])
    $res[array_pop($stack)]=$nums[$i];
$stack[]=$i;
}
return $res;
}` },

        // Monotonic Queue
        {
            topic: 'Monotonic Queue', title: 'Sliding Window Max', badge: 'O(n)', note: 'Deque-based PHP', code: `function maxSlidingWindow(array $nums, int $k): array {
$deque=[];$res=[];
foreach($nums as $i=>$x){
while($deque&&$deque[0]<$i-$k+1) array_shift($deque);
while($deque&&$nums[end($deque)]<$x) array_pop($deque);
$deque[]=$i;
if($i>=$k-1) $res[]=$nums[$deque[0]];
}
return $res;
}` },

        // Counting
        {
            topic: 'Counting', title: 'Frequency Count', badge: 'O(n)', note: 'PHP counting', code: `$freq=array_count_values($arr);
// Manual
$freq=[];
foreach($arr as $x) $freq[$x]=($freq[$x]??0)+1;
// Sort by frequency desc
arsort($freq);
// Top-k elements
$topK=array_slice($freq,0,$k,true);` },

        // String Matching
        {
            topic: 'String Matching', title: 'KMP', badge: 'O(n+m)', note: 'PHP KMP', code: `function kmpSearch(string $text, string $pattern): array {
$lps=buildLPS($pattern); $j=0; $res=[];
for($i=0;$i<strlen($text);$i++){
while($j>0&&$text[$i]!==$pattern[$j]) $j=$lps[$j-1];
if($text[$i]===$pattern[$j]) $j++;
if($j===strlen($pattern)){$res[]=$i-$j+1;$j=$lps[$j-1];}
}
return $res;
}
function buildLPS(string $p): array {
$lps=array_fill(0,strlen($p),0);$j=0;
for($i=1;$i<strlen($p);){
if($p[$i]===$p[$j]){$lps[$i++]=++$j;}
elseif($j>0){$j=$lps[$j-1];}else{$lps[$i++]=0;}
}
return $lps;
}` },

        // Recursion
        {
            topic: 'Recursion', title: 'Recursion Template', badge: 'O(n)', note: 'PHP recursion', code: `function factorial(int $n): int {
if($n<=1) return 1;
return $n*factorial($n-1);
}
// Memoized recursion - see Memoization section
// Increase stack limit if needed:
// ini_set('xdebug.max_nesting_level', 10000);` },

        // Quickselect
        {
            topic: 'Quickselect', title: 'Quickselect', badge: 'O(n) avg', note: 'PHP quickselect', code: `function quickselect(array $arr, int $k): int {
if(count($arr)===1) return $arr[0];
$pivot=$arr[array_rand($arr)];
$lo=array_values(array_filter($arr,fn($x)=>$x<$pivot));
$eq=array_values(array_filter($arr,fn($x)=>$x===$pivot));
$hi=array_values(array_filter($arr,fn($x)=>$x>$pivot));
if($k<count($lo)) return quickselect($lo,$k);
if($k<count($lo)+count($eq)) return $pivot;
return quickselect($hi,$k-count($lo)-count($eq));
}` },

        // Combinatorics
        {
            topic: 'Combinatorics', title: 'nCr & Permutations', badge: 'O(n)', note: 'PHP combinatorics', code: `function nCr(int $n, int $r): int {
if($r>$n) return 0;
$num=$den=1;
for($i=0;$i<$r;$i++){$num*=($n-$i);$den*=($i+1);}
return intdiv($num,$den);
}
// PHP built-in
// No direct nCr; use formula above
// Factorial
function fact(int $n): int {return $n<=1?1:$n*fact($n-1);}` },

        // Geometry
        {
            topic: 'Geometry', title: 'Distance & Cross', badge: 'O(1)', note: 'PHP geometry', code: `function dist(array $p1, array $p2): float {
return hypot($p2[0]-$p1[0],$p2[1]-$p1[1]);
}
function cross(array $O,array $A,array $B): float {
return ($A[0]-$O[0])*($B[1]-$O[1])-($A[1]-$O[1])*($B[0]-$O[0]);
}` },

        // Simulation
        {
            topic: 'Simulation', title: 'Matrix Rotation', badge: 'O(n²)', note: 'PHP matrix ops', code: `function rotate90(array &$mat): void { // 90° CW
$n=count($mat);
// Transpose
for($i=0;$i<$n;$i++)
for($j=$i+1;$j<$n;$j++)
    [$mat[$i][$j],$mat[$j][$i]]=[$mat[$j][$i],$mat[$i][$j]];
// Reverse each row
foreach($mat as &$row) $row=array_reverse($row);
}` },

        // Sweep Line
        {
            topic: 'Sweep Line', title: 'Meeting Rooms', badge: 'O(n log n)', note: 'Sweep line PHP', code: `function minMeetingRooms(array $intervals): int {
$events=[];
foreach($intervals as[$s,$e]){$events[]=[$s,1];$events[]=[$e,-1];}
usort($events,fn($a,$b)=>$a[0]!=$b[0]?$a[0]-$b[0]:$a[1]-$b[1]);
$rooms=$cur=0;
foreach($events as[,$t]){$cur+=$t;$rooms=max($rooms,$cur);}
return $rooms;
}` },

        // Divide and Conquer
        {
            topic: 'Divide and Conquer', title: 'D&C Template', badge: 'O(n log n)', note: 'PHP D&C', code: `function divideConquer(array $arr, int $lo, int $hi): mixed {
if($lo>=$hi) return baseCase;
$mid=intdiv($lo+$hi,2);
$left=divideConquer($arr,$lo,$mid);
$right=divideConquer($arr,$mid+1,$hi);
return merge($left,$right);
}` },

        // Data Stream
        {
            topic: 'Data Stream', title: 'Running Stats', badge: 'O(n)', note: 'Online mean/variance', code: `class RunningStats{
private int $count=0;
private float $mean=0,$M2=0;
public function add(float $x): void {
$this->count++;
$delta=$x-$this->mean;
$this->mean+=$delta/$this->count;
$this->M2+=$delta*($x-$this->mean);
}
public function getMean(): float{return $this->mean;}
public function getVariance(): float{return $this->count>1?$this->M2/($this->count-1):0.0;}
}` },

        // Bucket Sort
        {
            topic: 'Bucket Sort', title: 'Bucket Sort', badge: 'O(n+k)', note: 'PHP bucket sort', code: `function bucketSort(array $arr): array {
if(!$arr) return $arr;
$mn=min($arr);$mx=max($arr);$n=count($arr);
$buckets=array_fill(0,$n,[]);
foreach($arr as $x){
$idx=(int)(($x-$mn)/($mx-$mn+1e-9)*$n);
$buckets[$idx][]=$x;
}
$res=[];
foreach($buckets as $b){sort($b);foreach($b as $v)$res[]=$v;}
return $res;
}` },
    ]
};

// Collect unique topics in order
const TOPIC_ORDER = [
    'Array', 'Backtracking', 'Binary Indexed Tree', 'Binary Search', 'Binary Search Tree',
    'Binary Tree', 'Bit Manipulation', 'Bitmask', 'Breadth-First Search', 'Bucket Sort',
    'Combinatorics', 'Counting', 'Data Stream', 'Depth-First Search', 'Divide and Conquer',
    'Dynamic Programming', 'Geometry', 'Graph Theory', 'Greedy', 'Hash Function', 'Hash Table',
    'Heap (Priority Queue)', 'Linked List', 'Math', 'Matrix', 'Memoization', 'Merge Sort',
    'Monotonic Queue', 'Monotonic Stack', 'Ordered Set', 'Prefix Sum', 'Queue', 'Quickselect',
    'Recursion', 'Segment Tree', 'Simulation', 'Sliding Window', 'Sorting', 'Stack', 'String',
    'String Matching', 'Sweep Line', 'Topological Sort', 'Tree', 'Trie', 'Two Pointers', 'Union-Find'
];

let currentLang = 'python';
let currentTopic = TOPIC_ORDER[0];

// Sidebar
function buildSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    TOPIC_ORDER.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'topic-btn' + (t === currentTopic ? ' active' : '');
        btn.textContent = t;
        btn.onclick = () => selectTopic(t);
        sidebar.appendChild(btn);
    });
}

function selectTopic(topic) {
    currentTopic = topic;
    document.querySelectorAll('.topic-btn').forEach(b => {
        b.classList.toggle('active', b.textContent === topic);
    });
    renderCards();
    document.getElementById('content').scrollTop = 0;
}

function renderCards(filter = '') {
    const content = document.getElementById('content');
    const data = ALL_DATA[currentLang] || [];
    const filtered = data.filter(item => {
        if (item.topic !== currentTopic) return false;
        if (!filter) return true;
        const q = filter.toLowerCase();
        return item.title.toLowerCase().includes(q) ||
            item.note.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q);
    });

    content.innerHTML = `<div class="topic-header"><div class="topic-title">${currentTopic.replace(/([A-Z])/g, ' $1').trim().replace(/^./, c => c.toUpperCase())}</div></div><div class="cards-grid" id="cardsGrid"></div>`;
    const grid = document.getElementById('cardsGrid');

    if (!filtered.length) {
        grid.innerHTML = `<div class="no-results">No results found for "${filter || currentTopic}"</div>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
<div class="card-head">
<span class="card-title">${item.title}</span>
<span class="badge">${item.badge}</span>
</div>
<div class="card-note">${item.note}</div>
<div class="card-code">${escapeHtml(item.code)}<button class="copy-btn" onclick="copyCode(this, \`${escapeBacktick(item.code)}\`)">copy</button></div>
`;
        grid.appendChild(card);
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeBacktick(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}
function copyCode(btn, code) {
    navigator.clipboard.writeText(code).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        btn.style.color = 'var(--accent3)';
        setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1200);
    });
}

// Search across all topics for current lang
function searchAll(q) {
    if (!q) { renderCards(); return; }
    const content = document.getElementById('content');
    const data = ALL_DATA[currentLang] || [];
    const lq = q.toLowerCase();
    const filtered = data.filter(item =>
        item.topic.toLowerCase().includes(lq) ||
        item.title.toLowerCase().includes(lq) ||
        item.note.toLowerCase().includes(lq) ||
        item.code.toLowerCase().includes(lq)
    );
    content.innerHTML = `<div class="topic-header"><div class="topic-title">Search: <span>${q}</span></div></div><div class="cards-grid" id="cardsGrid"></div>`;
    const grid = document.getElementById('cardsGrid');
    if (!filtered.length) { grid.innerHTML = `<div class="no-results">No results for "${q}"</div>`; return; }
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
<div class="card-head">
<span class="card-title">${item.topic} → ${item.title}</span>
<span class="badge">${item.badge}</span>
</div>
<div class="card-note">${item.note}</div>
<div class="card-code">${escapeHtml(item.code)}<button class="copy-btn" onclick="copyCode(this, \`${escapeBacktick(item.code)}\`)">copy</button></div>
`;
        grid.appendChild(card);
    });
}

// Lang tabs
document.querySelectorAll('.lang-tab').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.lang-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        const q = document.getElementById('searchInput').value.trim();
        if (q) searchAll(q); else renderCards();
    };
});

// Search
let searchTimer;
document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        const q = e.target.value.trim();
        if (q) searchAll(q); else renderCards();
    }, 200);
});

// Init
buildSidebar();
renderCards();