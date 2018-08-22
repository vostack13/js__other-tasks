// 1. Задача: Суммирование элементов массива
// Решение №1 — Императивное программирование

function sumArray(values) {
    var sum = 0
    for(var i =0; i < values.length; i++) {
        sum += values[i]
    }
    return sum
}

console.log(sumArray([2, 5, 8]))    //15

// Решение №2 — Функциональное программирование

function sumArray(values) {
    return values.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0
    )
}

console.log(sumArray([2, 5, 8]))    //15