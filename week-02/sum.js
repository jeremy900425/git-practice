function sum_obj(ary) {
    if (ary.length == 0) {
        return 0;
    }
    return ary[0] + sum_obj(ary.slice(1));
}

function sum_index(ary, index = 0) {
    if (index >= ary.length) {
        return 0;
    }
    return ary[index] + sum_index(ary, index + 1);
}


console.log(sum_obj([])); // 0
console.log(sum_obj([1, 5, 3, 2])); // 11
console.log(sum_obj([1, 5, 3, 2, 100])); // 111
console.log(sum_obj([1, 5, 3, 2, 100, 1000])); // 1111



console.log(sum_index([])); // 0
console.log(sum_index([1, 5, 3, 2])); // 11
console.log(sum_index([1, 5, 3, 2, 100])); // 111
console.log(sum_index([1, 5, 3, 2, 100, 1000])); // 1111
