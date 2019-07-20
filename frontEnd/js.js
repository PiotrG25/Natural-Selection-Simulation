$(function(){
	
	var scene = new Scene($("#scene"), parseInt($("#scene").css("width")), parseInt($("#scene").css("height")));
	
	//scene.addFoods(10);
	for(var i = 0; i < 4; i++){
		scene.addSpecie(25, 25, 100, Math.floor(Math.random() * scene.sizeX), Math.floor(Math.random() * scene.sizeY));
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
	//scene.addSpecie(50, 40, 25, 250, 250);
	scene.addSpecie(50, 40, 100, 250, 150);
	
	var startStop = $("#startStopButton");
	var speedOfSimulation = 1;
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