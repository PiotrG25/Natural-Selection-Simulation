$(function(){
	
	var scene = $("#scene");
	var interval = setInterval(function(){
		var s = "";
		for(var i = 0; i < 6; i++){
		s = s + (Math.random * 10);
		}
		scene.css("backgroundColor", "rgb("+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+")"); 
	}, 1000);
	
	var specie = $(".specie");
	specie.eq(0).css("top", Math.floor(Math.random() * 500) + "px");
	
});