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
	this.div.css("top", this.y - size+ "px");
	this.div.css("left", this.x - size + "px");
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
		this.div.css("left", this.x - this.size + "px");
	}
	this.setY = function(y, sizeY){
		if(y > sizeY){
			y = sizeY;
		}else if(y < 0){
			y = 0;
		}
		this.y = y;
		this.div.css("top", this.y - this.size+ "px");
	}
	
	this.moveToClosestEdge = function(sizeX, sizeY, frequency){
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
		
		
		if(horizontal){
			this.setX(this.x + sign * this.speed / frequency, sizeX);
		}else{
			this.setY(this.y + sign * this.speed / frequency, sizeY);
		}
	}
	this.sensePredatorAndRunAway = function(species, sizeX, sizeY, frequency){
		var i = 0, j = 0, predators = [];
		for(; i < species.length; i++){
			if(species[i].size / 1.2 >= this.size && this.distanceTo(species[i].x, species[i].y) <= this.size + this.sense){
				predators[j++] = species[i];
			}
		}
		
		if(predators.length == 0){														//if doesn't see predators does not run away
			return false;
		}else{
			var runAwayVector = new Vector(0, 0);
			for(var i = 0; i < predators.length; i++){
				var vToMe = new Vector(this.x - predators[i].x, this.y - predators[i].y);
				vToMe = vToMe.versor();
				runAwayVector.add(new Vector(vToMe.x, vToMe.y));
			}
			runAwayVector = runAwayVector.versor();
			
			this.setX(this.x + runAwayVector.x * this.speed / frequency, sizeX);
			this.setY(this.y + runAwayVector.y * this.speed / frequency, sizeY);
			
			return true;
		}
	}
	this.senseFoodAndGoTo = function(foods, species, sizeX, sizeY, frequency){
		var i = 0, j = 0, potentialFood = [];
		for(; i < foods.length; i++){
			if(this.size / 1.2 >= foods[i].size && this.distanceTo(foods[i].x, foods[i].y) <= this.size + this.sense){
				potentialFood[j++] = foods[i];
			}
		}
		for(i = 0; i < species.length; i++){
			if(this.size / 1.2 >= species[i].size && this.distanceTo(species[i].x, species[i].y) <= this.size + this.sense){
				potentialFood[j++] = species[i];
			}
		}
		
		if(potentialFood.length == 0){
			return false;
		}else{
			
			var shortestPathToFood = new Vector(sizeX, sizeY);
			for(var i = 0; i < potentialFood.length; i++){
				var v = new Vector(potentialFood[i].x - this.x, potentialFood[i].y - this.y);
				if(v.length() < shortestPathToFood.length()){
					shortestPathToFood = v;
				}
			}
			shortestPathToFood = shortestPathToFood.versor();
			
			this.setX(this.x + shortestPathToFood.x * this.speed / frequency, sizeX);
			this.setY(this.y + shortestPathToFood.y * this.speed / frequency, sizeY);
			
			return true;
		}
	}
	this.moveRandomly = function(sizeX, sizeY, frequency){
		
	}
	this.move = function(species, foods, sizeX, sizeY, frequency){
		//todo move requires energy
		//focus on survival/reproduction flag
		
		if(!this.sensePredatorAndRunAway(species, sizeX, sizeY, frequency)){			//if doesn't have to run away focuses on food
			if(this.foodFound > 0){														//if has food moves to safety
				this.moveToClosestEdge(sizeX, sizeY, frequency);
			}else if(!this.senseFoodAndGoTo(foods, species, sizeX, sizeY, frequency)){	//if can't find food mooves randomely
				this.moveRandomly(sizeX, sizeY, frequency);
			}
		}
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