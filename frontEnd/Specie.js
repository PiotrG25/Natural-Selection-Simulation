function Specie(speed, size, sense, x, y){
	this.speed = speed;
	this.size = size;
	this.sense = sense;
	this.x = x;
	this.y = y;
	
	this.exists = true;
	this.foodFound = 0;
	this.energy = 1;//todo how much for start
	
	this.div = $("<div></div>");
	this.div.addClass("specie");
	this.div.css("position", "absolute");
	this.div.css("top", this.y + "px");
	this.div.css("left", this.x + "px");
	this.div.css("width", 2*size-1+"px");
	this.div.css("height", 2*size-1+"px");
	this.div.css("border", "1px solid black");
	this.div.css("borderRadius", "100%");
	this.div.css("backgroundColor", "rgb("+speedToRed(speed)+","+sizeToGreen(size)+","+senseToBlue(sense)+")");
	
	
	this.appendTo = function(scene){
		scene.append(this.div);
	}
	this.remove = function(){
		this.div.remove();
	}
	this.move = function(x, y){
		//todo
	}
	this.canEat = function(x, y){
		var d = (x - this.x)^2 + (y - this.y) ^ 2;
		if(d <= this.size^2)
			return true;
		else
			return false;
	}
	this.canEat = function(x, y, size){
		var d = (x - this.x)^2 + (y - this.y) ^ 2;
		if(d <= this.size^2 && this.size / 1.2 >= size)//20% bigger can eat smaller prey
			return true;
		else
			return false;
	}
	this.eat = function(){
		this.foodFound++;
	}
}

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