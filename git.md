# Git 基本概念與觀察

## Git 的重要概念

### 1. **Blob**
   - Blob（binary large object）是 Git 中用來儲存文件數據的單位。每一個版本中的文件內容，都會被 Git 存儲為一個 Blob，並賦予一個唯一的 SHA-1 散列值來標識它。
   - 每當我們對文件進行變更時，Git 會創建一個新的 Blob。

### 2. **Tree**
   - Tree 是用來描述目錄結構的物件，會包含 Blob 物件和其他 Tree 物件。它代表了目錄下的所有文件的當前狀態，並將這些文件指向相應的 Blob。

### 3. **Commit**
   - Commit 是 Git 中的一個儲存點，它記錄了某一個時間點的所有檔案狀態。每個 commit 包含一個樹（tree），這個樹指出當前版本的檔案結構。Commit 還會包括訊息和作者等資訊。

### 4. **Branch**
   - Branch 是 Git 中的一條獨立的開發線路，允許我們在不同的開發方向上進行工作，最常見的是 `master` 或 `main` 分支。
   - 每個分支都是一個指向特定 commit 的指標。

### 5. **HEAD**
   - HEAD 是 Git 中指向當前檢出的分支或 commit 的指標。當我們切換分支或回溯到舊的 commit 時，HEAD 會隨之移動。

---

## .git 資料夾的變化觀察

當我們在 Git repository 中進行操作時，`.git` 資料夾中的內容會發生變化。以下是我在不同階段觀察到的變化：

1. **初始化 (`git init`)**
   - 剛開始執行 `git init` 時，`.git` 資料夾會生成一個基礎的 Git 資料結構，包括 `HEAD`、`config`、`objects`、`refs` 等檔案。

2. **首次提交 (`git commit -m "Initial commit"`)**
   - 提交後，可以在 `.git/objects/` 中看到新建的 blob 和 commit 物件。每個物件都對應到一個具體的提交內容（如文件內容或提交訊息）。

3. **分支建立 (`git branch`)**
   - 建立新的分支後，`.git/refs/heads/` 會生成新的分支指標。

---

## Commit message 應該怎麼寫？

撰寫良好的 commit message 對於日後追溯修改記錄和團隊合作至關重要。以下是一些推薦的寫作風格：

1. **標題與描述**：
   - 標題限制在 50 字符內，且應簡明扼要。
   - 標題首字母大寫，並且應使用祈使句。例如：`Add user authentication`
   - 可以加入更詳細的描述，解釋此次修改的原因與變更的具體細節。

2. **樣式範例**：
