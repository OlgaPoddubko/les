[].push - modifies
[].splice - modifies

[].concat - does not modify
[].slice - does not modify
...spred operator - does not modify

хотим удалить элемент из массива
arr.splice(index, 1) - modifies

вместо него:
arr.slice(0, index).concat(arr.slice(index + 1)); // вместо .splice
[ ...arr.slice(0, index), ...arr.slice(index + 1) ]; // тоже самле через spread

хотим увеличить значение одного эелемента в массиве на 1
arr[index]++ - modifies

вместо него:
arr.slice(0, index).concat([arr[index] + 1]).concat(arr.slice(index + 1)); // вместо ++
[ ...arr.slice(0, index), arr[index] + 1, ...arr.slice(index + 1)]; // тоже самле через spread
