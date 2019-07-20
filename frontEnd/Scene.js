function Scene(scene, sizeX, sizeY){
	this.div = scene;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	
	this.species = [];
	this.foods = [];
	
	this.nextTurn = function(){
		//todo
	}
	this.addFoods = function(quantity){
		for(var i = 0; i < quantity; i++){
			this.foods[i] = new Food(Math.floor(Math.random() * parseInt(this.sizeX)), Math.floor(Math.random() * parseInt(this.sizeY)));
			this.foods[i].appendTo(this.div);
		}
	}
	this.removeFood = function(index){
		this.foods[index].remove();
		this.foods[index].exists = false;
	}
	
	this.addSpecie = function(speed, size, sense, x, y){
		var index = this.species.length;
		this.species[index] = new Specie(speed, size, sense, x, y);
		this.species[index].appendTo(this.div);
	}
	this.removeSpecie = function(index){
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
	
	this.moveSpecies = function(){
		for(var i = 0; i < this.species.length; i++){
			this.species[i].move(this.species, this.foods, this.sizeX, this.sizeY);
		}
	}
	
	this.findingFood = function(){
		for(var i = 0; i < this.species.length; i++){
			if(this.species[i].exists){
				for(var j = 0; j < this.foods.length; j++){
					if(this.foods[j].exists && this.species[i].canEat(this.foods[j].x, this.foods[j].y, 0)){
						console.log("specie " + i + "eats food " + j);
						this.species[i].eat();
						this.removeFood(j);
					}
				}
				
				for(var j = 0; j < this.species.length; j++){
					if(this.species[j].exists && this.species[i].canEat(this.species[j].x, this.species[j].y, this.species[j].size)){
						console.log("specie " + i + "eats specie " + j);
						this.species[i].eat();
						this.removeSpecie(j);
					}
				}
			}
		}
		this.adjustTables();
	}
}