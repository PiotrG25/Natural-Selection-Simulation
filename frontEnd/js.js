$(function(){
	
	var scene = new Scene($("#scene"), $("#scene").css("width"), $("#scene").css("height"));	
	
	
	
	scene.addFoods(100);
	console.log(scene.foods[0].x, scene.foods[0].y);
	scene.removeFood(0);
	scene.addSpecie(1, 25, 1,Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
	scene.addSpecie(1, 25, 1,Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
	scene.addSpecie(1, 25, 1,Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
	scene.addSpecie(1, 25, 1,Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
	scene.addSpecie(1, 25, 1,Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
	
	scene.removeSpecie(0);
	
	
	
	/*
	var interval = setInterval(function(){
	specie.eq(0).css("top", Math.floor(Math.random() * 500) + "px");
	
	setTimeout(function(){
		clearInterval(interval);
	}, 10000);
	*/
});