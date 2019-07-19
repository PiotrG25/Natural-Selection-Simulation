$(function(){
	
	function speedToRed(speed){
		//todo
		return Math.floor(Math.random() * 255)
	}
	function sizeToGreen(size){
		//todo
		return Math.floor(Math.random() * 255)
	}
	function senseToBlue(sense){
		//todo
		return Math.floor(Math.random() * 255)
	}
	
	function Specie(speed, size, sense, x, y){
		this.speed = speed;
		this.size = size;
		this.sense = sense;
		this.x = x;
		this.y = y;
		
		this.div = $("<div></div>");
		this.div.css("position", "absolute");
		this.div.css("top", this.y + "px");
		this.div.css("left", this.x + "px");
		this.div.css("width", 2*size-1+"px");
		this.div.css("height", 2*size-1+"px");
		this.div.css("borderRadius", "100%");
		this.div.css("border", "1px solid black");
		this.div.css("backgroundColor", "rgb("+speedToRed(speed)+","+sizeToGreen(size)+","+senseToBlue(sense)+")");
		
		
		this.appendTo = function(scene){
			scene.append(this.div);
		}
		this.remove = function(){
			this.div.remove();
		}
		this.move = function(x, y){
			this.x += x;
			this.y += y;
			this.div.css("left", this.x + "px");
			this.div.css("top", this.y + "px");
		}
		this.findFood = function(){
			
		}
	}
	
	
	var scene = $("#scene");
	
	var s;
	$("#b1").click(function(){
		s = new Specie(1,25,1, Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
		s.appendTo(scene);
	});
	$("#b2").click(function(){
		s.remove();
	});
	$("#b3").click(function(){
		s.move(-10, 0);
	});
	$("#b4").click(function(){
		s.move(10, 0);
	});
	$("#b5").click(function(){
		s.move(0, -10);
	});
	$("#b6").click(function(){
		s.move(0, 10);
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*var species = [];
	
	var interval = setInterval(function(){
		//scene.css("backgroundColor", "rgb("+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+")"); 
		
		var s = $("<div></div>");
		s.addClass("specie");
		s.css("position", "absolute");
		s.css("width", "49px");
		s.css("height", "49px");
		s.css("border", "1px solid black");
		scene.append(s);
		if(Math.random() > 0.5){
			s.css("top", Math.floor(Math.random() * 500));
			s.css("left", 0);
		}else{
			s.css("left", Math.floor(Math.random() * 500));
			s.css("top", 0);
		}
	}, 1000);
	
	var specie = $(".specie");
	specie.eq(0).css("top", Math.floor(Math.random() * 500) + "px");
	
	setTimeout(function(){
		clearInterval(interval);
	}, 10000);
	*/
});