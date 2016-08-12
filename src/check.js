var getMessage = function(a,b){
	//Если 1 аргумент - boolean
	if(typeof(a) == 'boolean'){
		if(a){
			return "Я попал в " + b;
		}
		else{
			return "Я никуда не попал";
		}
	}
	//Если 1 аргумент - число
	if(typeof(a)=='number'){
		return "Я прыгнул на " + (a*100) + " сантиметров";
	}
	//Если 1 аргумент - массив
	if(Array.isArray(a)){
		var arrLength = a.length;
		var i;
		// и второй тоже
		if(Array.isArray(b)){
			//проверка длинн массивов
			arrLength = Math.min(a.length, b.length);
			var arrMultSum = 0;
			for(i = 0; i < arrLength; ++i ){
				arrMultSum += a[i] + b[i];
			}
			return "Я прошёл " + arrMultSum + " метров";

		}
		// только первый
			var arraySum = 0;
			for(i = 0; i < arrLength; ++i ){
				arraySum += a[i];
			}
			return "Я прошёл " + arraySum + " шагов";
	}
}
