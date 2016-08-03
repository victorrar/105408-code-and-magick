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
		// и второй тоже
		if(Array.isArray(b)){
			var arrMultSum = 0;
			for(var i = 0; i < a.length; ++i ){
				arrMultSum += a[i] + b[i];
			}
			return "Я прошёл " + arrMultSum + " метров";

		}
		// только первый
		else{
			var arraySum = 0;
			for(var i = 0; i < a.length; ++i ){
				arraySum += a[i];
			}
			return "Я прошёл " + arraySum + " шагов";

		}
	}
}
