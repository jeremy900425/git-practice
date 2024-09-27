// 定義 Promise 版本的 doJob 函數
function doJob(job, time) {
    return new Promise((complete) => {
      setTimeout(() => {
        complete(`完成工作: ${job} at ${new Date().toISOString()}`);
      }, time);
    });
  }
  
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);

// 使用 Promise 的方式來鏈式調用每個工作
doJob('刷牙', 1000)
.then((data) => {
    console.log(data); // 刷牙完成
    return doJob('吃早餐', 3000); // 返回下一個 Promise
})
.then((data) => {
    console.log(data); // 吃早餐完成
    return doJob('寫功課', 1000); // 返回下一個 Promise
})
.then((data) => {
    console.log(data); // 寫功課完成
    return doJob('吃午餐', 2000); // 返回下一個 Promise
})
.then((data) => {
    console.log(data); // 吃午餐完成
});
  