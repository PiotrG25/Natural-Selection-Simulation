$(function(){
	
	var scene = new Scene($("#scene"), parseInt($("#scene").css("width")), parseInt($("#scene").css("height")));
	
	scene.addFoods(100);
	for(var i = 0; i < 1; i++){
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
	startStop.click(function(){
		//var interval = setInterval(function(){
			scene.moveSpecies();
			scene.findingFood();//to fix
		//}, 100);
		
		//setTimeout(function(){
		//	clearInterval(interval);
		//}, 5000);
	});
	
	
	/*
	var interval = setInterval(function(){
	specie.eq(0).css("top", Math.floor(Math.random() * 500) + "px");
	
	setTimeout(function(){
		clearInterval(interval);
	}, 10000);
	*/
});