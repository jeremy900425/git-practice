function sum(ary) {
    if (ary.length == 0) {
        return 0;
    }
    return ary[0] + sum(ary.slice(1));
}

function sum(ary, index = 0) {
    if (index >= ary.length) {
        return 0;
    }
    return ary[index] + sum(ary, index + 1);
}

console.log(sum([1, 5, 3, 2])); // 11


console.log(sum([])); // 0
console.log(sum([1, 5, 3, 2])); // 11
console.log(sum([1, 5, 3, 2, 100])); // 111
console.log(sum([1, 5, 3, 2, 100, 1000])); // 1111


