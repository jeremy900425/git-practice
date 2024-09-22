const { logLevel } = require("kafkajs");

function fib_recursive(n) {
    // TODO: implement fibonacci
    //定義 首兩項n0,n1為 0,1
    if (n == 0) {
        return 0;
    }
    else if (n == 1) {
        return 1;
    }
    else {
        return fib_recursive(n-1) + fib_recursive(n-2);
    }
}

function fib_forloop(n) {
    let lastValue = 0;
    let ans = 1;
    let temp = 0;
    if (n == 0) {
        return console.log(lastValue);
    }
    for (let i =1;i<n;i++){
        temp = ans;
        ans = ans + lastValue;
        lastValue = temp;
    }
    return console.log(ans);
}


console.time("fib_recursive 0");
console.log(fib_recursive(0));
console.timeEnd("fib_recursive 0");

console.time("fib_forloop 0");
fib_forloop(0)
console.timeEnd("fib_forloop 0");
console.log("====================================");
console.time("fib_recursive 1");
console.log(fib_recursive(1));
console.timeEnd("fib_recursive 1");

console.time("fib_forloop 1");
fib_forloop(1);
console.timeEnd("fib_forloop 1");
console.log("====================================");
console.time("fib_recursive 5");
console.log(fib_recursive(5));
console.timeEnd("fib_recursive 5");

console.time("fib_forloop 5");
fib_forloop(5);
console.timeEnd("fib_forloop 5");
console.log("====================================");
console.time("fib_recursive 10");
console.log(fib_recursive(10));
console.timeEnd("fib_recursive 10");

console.time("fib_forloop 10");
fib_forloop(10);
console.timeEnd("fib_forloop 10");
console.log("====================================");
console.time("fib_recursive 40");
console.log(fib_recursive(40));
console.timeEnd("fib_recursive 40");

console.time("fib_forloop 40");
fib_forloop(40);
console.timeEnd("fib_forloop 40");
