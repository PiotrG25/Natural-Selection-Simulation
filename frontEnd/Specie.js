function Specie(speed, size, sense, x, y, sceneSizeX, sceneSizeY, focusOnReproduction){
	this.speed = speed;
	this.size = size;
	this.sense = sense;
	this.x = x;
	this.y = y;
	this.sceneSizeX = sceneSizeX;
	this.sceneSizeY = sceneSizeY;
	this.focusOnReproduction = focusOnReproduction;
	
	this.exists = true;
	this.foodFound = 0;
	this.energyConstant = 500000;
	this.energy = this.energyConstant;
	
	
	this.randomDirectionX = 0;
	this.randomDirectionY = 0;
	
	this.div = $("<div></div>");
	this.div.addClass("specie");
	this.div.css("top", this.y - size+ "px");
	this.div.css("left", this.x - size + "px");
	this.div.css("width", 2*size-1+"px");
	this.div.css("height", 2*size-1+"px");
	this.div.css("backgroundColor", "rgb("+speedToRed(speed)+","+sizeToGreen(size)+","+senseToBlue(sense)+")");
	
	
	this.survived = function(){
		if((this.x == 0 || this.x == this.sceneSizeX || this.y == 0 || this.y == this.sceneSizeY) && this.foodFound > 0)
			return true;
		return false;
	}
	this.canReproduce = function(){
		if(this.survived() && this.foodFound >= 2)
			return true;
		return false;
	}
	this.reproduce = function(mutationChance){
		var nextSpeed = this.speed * (1 + Math.random() * 2 * mutationChance / 100 - mutationChance / 100);
		var nextSize = this.size * (1 + Math.random() * 2 * mutationChance / 100 - mutationChance / 100);
		var nextSense = this.sense * (1 + Math.random() * 2 * mutationChance / 100 - mutationChance / 100);
		return new Specie(nextSpeed, nextSize, nextSense, this.x, this.y, this.sceneSizeX, this.sceneSizeY);
	}
	this.nextTurn = function(){
		this.foodFound = 0;
		this.energy = this.energyConstant;
	}
	
	this.appendTo = function(scene){
		scene.append(this.div);
	}
	this.remove = function(){
		this.div.remove();
	}
	
	this.setX = function(x){
		if(x > this.sceneSizeX){
			x = this.sceneSizeX;
		}else if(x < 0){
			x = 0;
		}
		this.x = x;
		this.div.css("left", this.x - this.size + "px");
	}
	this.setY = function(y){
		if(y > this.sceneSizeY){
			y = this.sceneSizeY;
		}else if(y < 0){
			y = 0;
		}
		this.y = y;
		this.div.css("top", this.y - this.size+ "px");
	}
	
	this.moveToClosestEdge = function(frequency){
		var min = this.sceneSizeX - this.x;//go right
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
		if(this.sceneSizeY - this.y < min){//go down
			min = this.sceneSizeY - this.y;
			horizontal = false;
			sign = 1;
		}
		
		if(horizontal){
			this.setX(this.x + sign * this.speed / frequency);
		}else{
			this.setY(this.y + sign * this.speed / frequency);
		}
	}
	this.sensePredatorAndRunAway = function(species, frequency){
		var i = 0, j = 0, predators = [];
		for(; i < species.length; i++){
			if(species[i].size / 1.2 >= this.size && this.distanceTo(species[i].x, species[i].y) <= this.size + this.sense){
				predators[j++] = species[i];
			}
		}
		
		
		if(predators.length == 0){//if doesn't see predators does not run away
			return false;
		}else{
			this.randomDirectionX = 0;
			
			var runAwayVector = new Vector(0, 0);
			for(var i = 0; i < predators.length; i++){
				var vToMe = new Vector(this.x - predators[i].x, this.y - predators[i].y);
				vToMe = vToMe.versor();
				runAwayVector.add(new Vector(vToMe.x, vToMe.y));
			}
			runAwayVector = runAwayVector.versor();
			
			this.setX(this.x + runAwayVector.x * this.speed / frequency);
			this.setY(this.y + runAwayVector.y * this.speed / frequency);
			
			return true;
		}
	}
	this.senseFoodAndGoTo = function(foods, species, frequency){
		var i = 0, j = 0, potentialFoodVectors = [];
		for(; i < foods.length; i++){
			if(this.size / 1.2 >= foods[i].size && this.distanceTo(foods[i].x, foods[i].y) <= this.size + this.sense){
				potentialFoodVectors[j++] = new Vector(foods[i].x - this.x, foods[i].y - this.y);
			}
		}
		for(i = 0; i < species.length; i++){
			if(this.size / 1.2 >= species[i].size && this.distanceTo(species[i].x, species[i].y) <= this.size + this.sense){
				potentialFoodVectors[j++] = new Vector(species[i].x - this.x, species[i].y - this.y);
			}
		}
		
		
		if(potentialFoodVectors.length == 0){
			return false;
		}else{
			this.randomDirectionX = 0;
			
			var shortestPathToFood = new Vector(this.sceneSizeX, this.sceneSizeY);
			for(var i = 0; i < potentialFoodVectors.length; i++){
				if(potentialFoodVectors[i].length() < shortestPathToFood.length()){
					shortestPathToFood = potentialFoodVectors[i];
				}
			}
			shortestPathToFood = shortestPathToFood.versor();
			
			this.setX(this.x + shortestPathToFood.x * this.speed / frequency);
			this.setY(this.y + shortestPathToFood.y * this.speed / frequency);
			
			return true;
		}
	}
	this.moveRandomly = function(frequency){
		if(this.randomDirectionX == 0 || this.distanceTo(this.randomDirectionX, this.randomDirectionY) <= this.speed){
			this.randomDirectionX = Math.floor(Math.random() * this.sceneSizeX + 1);
			this.randomDirectionY = Math.floor(Math.random() * this.sceneSizeY + 1);
		}
		var v = new Vector(this.randomDirectionX - this.x, this.randomDirectionY - this.y);
		v = v.versor();
		
		this.setX(this.x + v.x * this.speed / frequency);
		this.setY(this.y + v.y * this.speed / frequency);
	}
	this.move = function(species, foods, frequency){
		
		if(this.moveCost(frequency) < this.energy){
			if(!this.sensePredatorAndRunAway(species, frequency)){												//if doesn't have to run away focuses on food
				if(this.foodFound >= 2 && this.focusOnReproduction || this.foodFound > 0 && !this.focusOnReproduction){ 	//if can reproduce or doesn't want but has food moves to safety
					this.moveToClosestEdge(frequency);
				}else if(!this.senseFoodAndGoTo(foods, species, frequency)){									//if can't find food mooves randomely
					this.moveRandomly(frequency);
				}
			}
			this.energy -= this.moveCost(frequency);
		}
	}
	
	this.moveCost = function(frequency){
		return Math.pow(this.size / frequency, 3) * Math.pow(this.speed / frequency, 2) + this.sense / frequency;
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
		this.energy += this.energyConstant;
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