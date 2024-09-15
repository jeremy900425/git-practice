# Git 基本概念

## 1. **Blob**
- **Blob** 是 Git 中儲存檔案內容的單位，每個檔案的內容都會被 Git 轉成一個 blob，並用一個獨特的編號來標識它，此編號是SHA-1 (SHA-1是一種 hash 演算法，它可生成 160 bit (20 byte) 的 hash 值，通常以 40 個十六進位 (hex) 的數字表示)

## 2. **Tree**
- **Tree** 是用來表示目錄的資料結構。它包含檔案（blob）和資料夾（其他 tree）。Tree 就像是一個資料夾，它告訴我們有哪些檔案，這些檔案指向的是哪些 blob。

## 3. **Commit**
- **Commit** 是一個儲存點，記錄了檔案在某個時間點的狀態。每次提交（commit）後，Git 都會記住當前的檔案和目錄狀態，方便未來查詢。

## 4. **Branch**
- **Branch** 是 Git 中的一條開發分支，它讓大家可以同時進行不同的開發。每個分支都是一個指向特定 commit 的指標。例如： `main` 就是其中一個分支。

## 5. **HEAD**
- **HEAD** 是 Git 中的指標，指向我當前所在的分支或 commit。當我切換分支或回到舊的Commit，HEAD 也會隨之改變。

---

# .git 資料夾的變化

### 1. **初始化 (`git init`)**
- 使用 `git init` 建立一個 Git 專案時，Git 會創建 `.git` 資料夾，裡面包含 Git 追蹤版本變化所需的資料。

### 2. **提交 (`git commit -m "first commit"`)**
- 提交後，會在 `.git/objects/` 中看到一些新增的檔案，這些是 Git 用來儲存提交內容的地方。

### 3. **建立分支 (`git branch`)**
- 當建立一個新分支時，`.git/refs/heads/` 資料夾會新增一個檔案，這檔案記錄了分支指向的 commit。

---

# Commit message 應該怎麼寫？

寫清楚的 commit message 可以有效的和其他開發者共享每次修改的目的及內容。

### 1. **簡明扼要**
- 用一行簡短描述你做了什麼，建議不超過 50 個字。

### 2. **動詞開頭**
- 使用祈使句，動詞開頭（如 Add, Fix, Update）。例如：`Fix login bug` 或 `Add user authentication`.

### 3. **詳細說明**
- 如果變更複雜，可以加上更詳細的描述，說明為什麼進行這次修改。

### 其他範例：
- 截錄自國外 AngularJS 團隊，由 https://ithelp.ithome.com.tw/articles/10228738 提供資料 \n
Header: <type>(<scope>): <subject>
 - type: 代表 commit 的類別：feat, fix, docs, style, refactor, test, chore，必要欄位。
 - scope 代表 commit 影響的範圍，例如資料庫、控制層、模板層等等，視專案不同而不同，為可選欄位。
 - subject 代表此 commit 的簡短描述，不要超過 50 個字元，結尾不要加句號，為必要欄位。

Body: 72-character wrapped. This should answer:
 * Body 部份是對本次 Commit 的詳細描述，可以分成多行，每一行不要超過 72 個字元。
 * 說明程式碼變動的項目與原因，還有與先前行為的對比。

Footer: 
 - 填寫任務編號（如果有的話）.
 - BREAKING CHANGE（可忽略），記錄不兼容的變動，
   以 BREAKING CHANGE: 開頭，後面是對變動的描述、以及變動原因和遷移方法。
