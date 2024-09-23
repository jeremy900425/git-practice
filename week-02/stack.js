// stack.js
export default class Stack {
  // # 為私有變數，只能在這個 class 內部存取，等同於 Java 的 private 或是 python 的 __
  #items;

  constructor() {
    // 初始化一個空的 array 來表示 stack
    this.#items = [];
  }

  // 放資料進 stack
  push(element) {
    console.log('push：', element);
    this.#items.push(element);  // 使用陣列的 push 方法來將 element 加入 stack 頂部
  }

  // 取資料出 stack
  pop() {
    console.log('pop：', this.#items.pop());  // 使用陣列的 pop 方法來移除並回傳頂部 element
  }

  // 查看 stack 頂部的 element
  peek() {
    console.log('目前頂部為：', this.#items[this.#items.length - 1]);
  }

  // 檢查 stack 是否為空
  isEmpty() {
    console.log('是否為空: ', this.#items.length === 0);  // 若陣列長度為 0 則表示 stack 為空
  }

  // 回傳 stack 中 element 的個數
  size() {
    console.log('size: ', this.#items.length); // 個數即陣列的長度
  }

  // 清空 stack
  clear() {
    this.#items = [];  // 將陣列重置即可
    console.log('stack 已清空');
  }

  // 印出 stack 內容
  print() {
    console.log("stack 內部目前有",this.#items.toString(),"(由　底->頂　顯示)");  // 將陣列轉成字串並印出
  }
}
