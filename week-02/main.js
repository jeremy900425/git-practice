// main.js
import Stack from './stack.js';  // 匯入 Stack 模組

let stack = new Stack();
stack.print();  // 印出空的 stack，預期結果是空字串

stack.push(5);  // 在 stack 頂部加入 element 5
stack.push(8);  // 在 stack 頂部加入 element 8
stack.print();  // 預期輸出 "5,8" 表示 stack 內的 element

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？

stack.size();  // 目前為止 stack 有兩個 element

stack.peek();  // 8是最後push的，所以8是目前 stack 頂部的 element

stack.pop();  // 移除頂部的 element 8
stack.size();  // 目前 stack 只有一個 element

stack.print();  // 預期輸出 "5"

stack.isEmpty();  // 應回傳 false，因為 stack 還有一個 element

stack.pop();  // 移除頂部的 element 5
stack.isEmpty();  // 應回傳 true，因為 stack 現在是空的

stack.push(10);  // 新加入一個element 10
stack.clear();  // 清空 stack
stack.print();  // 預期輸出空字串

