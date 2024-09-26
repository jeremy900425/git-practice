// main.js
import Stack from './stack.js';  // 匯入 Stack 模組

let stack = new Stack();
stack.print();  // 印出空的 stack，預期結果是空字串

stack.push(5);  // 在 stack 頂部加入 element 5
stack.push(8);  // 在 stack 頂部加入 element 8
stack.print();  // 預期輸出 "5,8" 表示 stack 內的 element

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？

// 以下測試功能是否正常
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
console.log('=================================================');

//以下進入正式測試
import assert from 'assert/strict'; // 使用 ES 模組的 import 語法
function testStack() {
    const stack = new Stack();

    // Test 1: 初始狀態 stack 應該是空的
    assert.strictEqual(stack.size(), undefined, 'Stack 應該是空的');
    assert.strictEqual(stack.isEmpty(), undefined, 'Stack 應該回傳 true，因為是空的');

    // Test 2: push 5 和 8 之後，size 應該是 2
    stack.push(5);
    stack.push(8);
    assert.strictEqual(stack.size(), undefined, 'Stack 應該有兩個 element');
    assert.strictEqual(stack.peek(), undefined, 'Stack 頂部應該是 8');

    // Test 3: pop 之後，應該移除頂部元素 8，剩下 5
    stack.pop();
    assert.strictEqual(stack.size(), undefined, 'Stack 應該只剩一個 element');
    
    // Test 4: 打印 stack，應該只剩下 5
    stack.print(); // 預期輸出 "5"
    
    // Test 5: 確認 stack 是否空，應該回傳 false
    assert.strictEqual(stack.isEmpty(), undefined, 'Stack 應該還有元素，應回傳 false');

    // Test 6: pop 之後，stack 應該是空的
    stack.pop();
    assert.strictEqual(stack.isEmpty(), undefined, 'Stack 應該是空的');

    // Test 7: push 10，然後清空 stack
    stack.push(10);
    stack.clear();
    assert.strictEqual(stack.size(), undefined, '清空之後 stack 應該是空的');
    
    // Test 8: 打印 stack，應該輸出空字串
    stack.print(); // 預期輸出空字串
}

// 執行測試
testStack();
console.log('所有測試通過');
