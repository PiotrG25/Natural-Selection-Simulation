$(function(){
	
	var scene = new Scene($("#scene"), parseInt($("#scene").css("width")), parseInt($("#scene").css("height")), 100	, 5, 1);
	var table = $("#stats");
	var columns = [];
	function adjustColumnsTable(){
		var i = 0; j = 0, tab = [];
		for(; i < columns.length; i++){
			if(columns[i].exists)
				tab[j++] = columns[i];
		}
		columns = tab;
	}
	
	scene.addFoods();
	for(var i = 0; i < 50; i++){
		var r = Math.random();
		if(r < 0.25){
			scene.addSpecie(25, 25, 25, Math.floor(Math.random() * scene.sizeX), 0);
		}else if(r < 0.5){
			scene.addSpecie(25, 25, 25, Math.floor(Math.random() * scene.sizeX), 500);
		}else if(r < 0.75){
			scene.addSpecie(25, 25, 25, 0, Math.floor(Math.random() * scene.sizeY));
		}else{
			scene.addSpecie(25, 25, 25, 500, Math.floor(Math.random() * scene.sizeY));
		}
	}
	
	var startStop = $("#startStopButton");
	var speedOfSimulation = 10;
	var frequency = 10;
	var turns = 0;
	
	scene.quantityOfFood = 50;
	scene.removeAllFood();
	scene.addFoods();
	
	startStop.click(function(){
		var interval = setInterval(function(){
			scene.moveSpecies(frequency);
			scene.findingFood();
		}, 100 / speedOfSimulation / frequency);
		
		setTimeout(function(){
			clearInterval(interval);
			columns[columns.length] = new Column(scene.getSimulationData(), scene.getSpeeds(), scene.getSizes(), scene.getSenses());
			columns[columns.length - 1].appendTo(table);
			if(columns.length > 30){
				columns[0].remove();
				adjustColumnsTable();
			}
			scene.nextTurn();
		}, 5000 / speedOfSimulation);
	});
	
	
	//todocreate and append column on end of turn
});

