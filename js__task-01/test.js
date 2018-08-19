
/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */

function bindFunction(fn) {

	var tempArray = [];

	for (var i = 1; i < arguments.length; i++) {
		tempArray.push(arguments[i]);
	}

	return function () {
		return fn.apply(this, tempArray);
	}
}




function sum(a, b) {
	return a + b;
}


var newSum = bindFunction(sum, 2, 4);

console.log(newSum());
// console.log(bindFunction(sum, 2, 4));



