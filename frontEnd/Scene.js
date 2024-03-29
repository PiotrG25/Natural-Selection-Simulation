function Scene(scene, sizeX, sizeY, quantityOfFood, mutationChance, reproductionFocusChance){
	this.div = scene;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	
	this.species = [];
	this.foods = [];
	this.quantityOfFood = quantityOfFood;
	this.mutationChance = mutationChance;
	this.reproductionFocusChance = reproductionFocusChance;
	
	this.simulation = 0;
	this.nrOfSpecies = 0;
	this.speciesEaten = 0;
	this.foodEaten = 0;
	
	
	this.nextTurn = function(){
		this.simulation++;
		this.speciesEaten = 0;
		this.foodEaten = 0;
		
		this.removeAllFood();
		this.addFoods();
		
		for(var i = 0; i < this.species.length; i++){
			if(!this.species[i].survived()){
				this.removeSpecie(i);
			}
		}
		this.adjustSpecieTable();
		
		for(var i = 0; i < this.species.length; i++){
			if(this.species[i].canReproduce()){
				var s = this.species[i].reproduce(this.mutationChance);
				this.addSpecie(s.speed, s.size, s.sense, s.x, s.y);
			}
			this.species[i].nextTurn();
		}
	}
	
	
	this.getSimulationData = function(){
		return new SimulationData(this.simulation, this.nrOfSpecies, this.speciesEaten, this.quantityOfFood, this.foodEaten);
	}
	this.getSpeeds = function(){
		var arr = [];
		for(var i = 0; i < this.species.length; i++){
			arr[i] = this.species[i].speed;
		}
		return arr;
	}
	this.getSizes = function(){
		var arr = [];
		for(var i = 0; i < this.species.length; i++){
			arr[i] = this.species[i].size;
		}
		return arr;
	}
	this.getSenses = function(){
		var arr = [];
		for(var i = 0; i < this.species.length; i++){
			arr[i] = this.species[i].sense;
		}
		return arr;
	}
	
	
	this.addFoods = function(){
		for(var i = 0; i < this.quantityOfFood; i++){
			this.foods[i] = new Food(Math.floor(Math.random() * parseInt(this.sizeX)), Math.floor(Math.random() * parseInt(this.sizeY)));
			this.foods[i].appendTo(this.div);
		}
	}
	this.removeFood = function(index){
		this.foods[index].remove();
		this.foods[index].exists = false;
	}
	this.removeAllFood = function(){
		for(var i = 0; i < this.foods.length; i++){
			this.removeFood(i);
		}
		this.adjustFoodsTable();
	}
	
	this.addSpecie = function(speed, size, sense, x, y){
		this.nrOfSpecies++;
		
		var index = this.species.length;
		var focusOnReproduction;
		if(Math.random() < this.reproductionFocusChance){
			focusOnReproduction = true;
		}else{
			focusOnReproduction = false;
		}
		this.species[index] = new Specie(speed, size, sense, x, y, this.sizeX, this.sizeY, focusOnReproduction);
		this.species[index].appendTo(this.div);
	}
	this.removeSpecie = function(index){
		this.nrOfSpecies--;
		
		this.species[index].remove();
		this.species[index].exists = false;
	}
	
	
	this.adjustSpecieTable = function(){
		var i = 0, j = 0, tab = [];
		for(; i < this.species.length; i++){
			if(this.species[i].exists)
				tab[j++] = this.species[i];
		}
		this.species = tab;
	}
	this.adjustFoodsTable = function(){
		var i = 0; j = 0, tab = [];
		for(; i < this.foods.length; i++){
			if(this.foods[i].exists)
				tab[j++] = this.foods[i];
		}
		this.foods = tab;
	}
	this.adjustTables = function(){
		this.adjustSpecieTable();
		this.adjustFoodsTable();
	}
	
	this.moveSpecies = function(frequency){
		for(var i = 0; i < this.species.length; i++){
			this.species[i].move(this.species, this.foods, frequency);
		}
	}
	
	this.findingFood = function(){
		for(var i = 0; i < this.species.length; i++){
			if(this.species[i].exists){
				for(var j = 0; j < this.foods.length; j++){
					if(this.foods[j].exists && this.species[i].canEat(this.foods[j].x, this.foods[j].y, this.foods[j].size)){
						this.foodEaten++;
						this.species[i].eat();
						this.removeFood(j);
					}
				}
				
				for(var j = 0; j < this.species.length; j++){
					if(this.species[j].exists && this.species[i].canEat(this.species[j].x, this.species[j].y, this.species[j].size)){
						this.speciesEaten++;
						this.species[i].eat();
						this.removeSpecie(j);
					}
				}
			}
		}
		this.adjustTables();
	}
}