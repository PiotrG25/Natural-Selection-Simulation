$(function(){
	
	var scene = new Scene($("#scene"), parseInt($("#scene").css("width")), parseInt($("#scene").css("height")));
	
	scene.addFoods(100);
	for(var i = 0; i < 12; i++){
		scene.addSpecie(25, 25, 1, Math.floor(Math.random() * scene.sizeX), Math.floor(Math.random() * scene.sizeY));
		/*
		var r = Math.random();
		if(r < 0.25){
			scene.addSpecie(10, 25, 1, Math.floor(Math.random() * scene.sizeX), 0);
		}else if(r < 0.5){
			scene.addSpecie(10, 25, 1, Math.floor(Math.random() * scene.sizeX), 500);
		}else if(r < 0.75){
			scene.addSpecie(10, 25, 1, 0, Math.floor(Math.random() * scene.sizeY));
		}else{
			scene.addSpecie(10, 25, 1, 500, Math.floor(Math.random() * scene.sizeY));
		}
		*/
	}
	
	var startStop = $("#startStopButton");
	var speedOfSimulation = 10;
	var frequency = 10;
	startStop.click(function(){
		var interval = setInterval(function(){
			scene.moveSpecies(frequency);
			scene.findingFood();
		}, 100 / speedOfSimulation / frequency);
		
		setTimeout(function(){
			clearInterval(interval);
		}, 5000 / speedOfSimulation);
	});
	
	
	/*
	var interval = setInterval(function(){
	specie.eq(0).css("top", Math.floor(Math.random() * 500) + "px");
	
	setTimeout(function(){
		clearInterval(interval);
	}, 10000);
	*/
});