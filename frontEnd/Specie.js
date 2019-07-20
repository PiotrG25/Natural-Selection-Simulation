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
	this.div.css("top", this.y + "px");
	this.div.css("left", this.x + "px");
	this.div.css("width", 2*size-1+"px");
	this.div.css("height", 2*size-1+"px");
	this.div.css("backgroundColor", "rgb("+speedToRed(speed)+","+sizeToGreen(size)+","+senseToBlue(sense)+")");
	
	
	this.appendTo = function(scene){
		scene.append(this.div);
	}
	this.remove = function(){
		this.div.remove();
	}
	
	this.setX = function(x, sizeX){
		if(x > sizeX){
			x = sizeX;
		}else if(x < 0){
			x = 0;
		}
		this.x = x;
		this.div.css("left", this.x + "px");
	}
	this.setY = function(y, sizeY){
		if(y > sizeY){
			y = sizeY;
		}else if(y < 0){
			y = 0;
		}
		this.y = y;
		this.div.css("top", this.y + "px");
	}
	
	this.moveToClosestEdge = function(sizeX, sizeY){
		var min = sizeX - this.x;//go right
		var horizontal = true;
		var sign = 1;
		
		if(this.x < min){//go left
			min = this.x;
			sign = -1;
		}
		
		if(this.y < min){//go up
			min = this.y;
			horizontal = false;
			sign = -1;
		}
		if(sizeY - this.y < min){//go down
			min = sizeY - this.y;
			horizontal = false;
			sign = 1;
		}
		
		//todo move depends on speed
		if(horizontal){
			this.setX(this.x + sign * this.speed, sizeX);
		}else{
			this.setY(this.y + sign * this.speed, sizeY);
		}
	}
	this.move = function(species, foods, sizeX, sizeY){
		//todo meve requires energy
		//focus on survival/reproduction flag
		
		this.moveToClosestEdge(sizeX, sizeY);
		//this.sensePredatorAndRunAway(species);
		//this.senseFoodAndGoTo(foods, species);
		//this.moveRandomly();
	}
	this.canEat = function(x, y, size){
		var d = this.distanceTo(x, y);
		if(d <= this.size && this.size / 1.2 >= size){//20% bigger can eat smaller prey
			return true;
		}else{
			return false;
		}
	}
	
	this.eat = function(){
		this.foodFound++;
	}
	
	this.distanceTo = function(x, y){
		return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
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