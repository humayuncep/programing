var fibonacci = (a) => {
		let str = "1 1 ";
		let set = [1, 1];
		let result = set;
	
		var populate = (s) => {
				set = [s[1], (s[0] + s[1])]
				result.push(set[1]);
				return set;
		};
	
		for (let i = 0; i < (a - 2) ; i ++) {
			populate(set);
		};
	
		return {
			seris: result,
			last: result[a-1]
		};
};


var keyevent = $(document).keydown(function (e){
	if(e.keyCode == 13) {
		var input = $("#fibonacci input");
		var a = input.val();
		
		// console.log(input.attr("min"), a, input.attr("max"));

		if(a >= 2 && a <= 1476){
			$(".fibonacci-value .error").html("");
			$(".fibonacci-value .nth").html(a);
			$(".fibonacci-value .value").html(fibonacci(a).last);
			$(".fibonacci-seris").html(JSON.stringify(fibonacci(a).seris).replace(/,/g, ", "));
		} else {
			$(".fibonacci-seris").html("");
			$(".fibonacci-value .nth").html("");
			$(".fibonacci-value .value").html("");
			$(".fibonacci-value .error").html("Enter a valid input");
		};
	}
});

