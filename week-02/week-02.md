# Week-02 作業
思考問題我都會先描述我認爲的答案再去問問看GPT 比較兩者差別
## 思考: 安裝哪個版本？為什麼？
根據老師上課的描述，在偶數版的通常會比較穩定且可用，但是對我來說在已知這樣的條件情況下，我會再往前1~2個版本選，因為有些開源專案的程式碼可能不會時刻更新自己的程式碼，可能造成版本相容性問題。

ChatGPT回答：

    Prompt：用兩句話內說明我該選擇哪個node.js版本，為什麼？

    你應該選擇 LTS 版本，因為它提供長期支持、穩定性和安全性，是生產環境的最佳選擇。非LTS版本雖有最新功能，但穩定性較低，適合實驗或開發階段。

## 思考：nvm 與 npm 分別是什麼？
nvm 是node.js的版本的管理系統，可以透過這個工具方便的切換版本<br>
nvm安裝指令(for fish shell)：

    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | fish
    $ nvm install 20.17.0
    $ nvm ls
npm 是套件管理工具，就我的理解其實就和 python 的`pip` 是差不多的概念

ChatGPT回答：

    Prompt：請用簡單幾句話告訴我nvm和npm的差別

    NVM（Node Version Manager）和 NPM（Node Package Manager）是兩個不同的工具：

    NVM：用來管理多個版本的 Node.js，讓你可以輕鬆切換、安裝不同的 Node.js 版本。
    NPM：是 Node.js 的套件管理器，用來安裝、更新、管理 JavaScript 的庫和模組。


## 思考：程式題 sum 不可使用for, while的話 <br>有幾種寫法？
撇除使用外部套件的方法，我第一時間能想到的是使用遞迴的方式去寫，因為for, while 都是屬於讓程式重複性做某個指令，而遞迴其實也是用重複呼叫function來達到一樣的事情。<br>
而遞迴要怎麼去寫？我寫了兩個function為 sum_obj ,sum_index 前者是有使用到ary物件本身的方法,而sum_index是使用控制ary的index 來進行加總。

## 思考：如果 sum 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
這題我會一樣會使用遞迴的方式去寫，當然最好還是用數學的公式來算會比較快 (時間複雜度較低)
```javascript
function sum_recursive(n) {
    if (n <= 1) {
        return n;
    }
    return n + sum_recursive(n - 1);
}

function sum_formula(n) {
    return (n * (n + 1)) / 2;
}

console.log(sum_recursive(5));
console.log(sum_formula(5));
```

## Issue：(node:21376) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

Nodejs 有兩個模組系統 `CommonJS` 和 `ES Modules`
### CommonJS 模組系統
- CommonJS 是 Node.js 中較早的模組系統，也是 Node.js 的預設模組系統。
- 語法： 使用 require 來匯入模組，使用 module.exports 或 exports 來匯出模組。
```Javascript
// 定義模組 (moduleA.js)
const hello = 'Hello, CommonJS!';
module.exports = hello;

// 使用模組 (main.js)
const hello = require('./moduleA.js');
console.log(hello);  // 輸出 "Hello, CommonJS!"
```

### ES Modules（ESM）模組系統
- ES Modules 是近代比較常用模組系統，尤其是與瀏覽器相容。
- 瀏覽器和 Node.js 都支援 ES Modules。對於前端和後端共享程式碼的專案（如 Isomorphic/Universal JavaScript 應用程式），ESM 能讓開發者使用相同的模組系統，降低維護成本。
- 語法： 使用 import 來匯入模組，使用 export 來匯出模組。
```Javascript
// 定義模組 (moduleA.mjs)
export const hello = 'Hello, ES Modules!';

// 使用模組 (main.mjs)
import { hello } from './moduleA.mjs';
console.log(hello);  // 輸出 "Hello, ES Modules!"
```
### 為什麼要改成 ES Modules ?
- JavaScript 的官方標準
- 瀏覽器和 Node.js 的一致性
- 模組的靜態分析
  - 這意味著在Compile Period可以確定所有的關係
  - 動態分析依賴於程式實際運行時的狀態和行為，而不是單純依賴於程式碼本身。
- 更好地支持工具和框架
  - 許多新的開發工具和框架（例如 Rollup、Snowpack、Vite）都更傾向於使用 ESM。
### 什麼時候選擇 CommonJS？
ESM 正逐漸成為標準，但在某些情況下，仍然可能選擇使用 CommonJS：
- 需要支援非常舊的 Node.js 版本（如 Node.js 10 或更低）。
- 專案仍然使用 CommonJS，且轉換為 ESM 會引入大量的開發成本。
- 進行POC，省去額外的設定。因CommonJS 是 Node.js 的預設模組系統