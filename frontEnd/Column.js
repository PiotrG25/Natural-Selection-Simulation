function Column(simulation, species, speciesEaten, food, foodEaten, speeds, sizes, senses){
	
	this.speedCell = new MinAvgMax(speeds);
	this.sizeCell = new MinAvgMax(sizes);
	this.sensesCell = new MinAvgMax(senses);
	
	this.tdArray = [];
	
	this.addToTdArray(simulation);
	this.addToTdArray(species);
	this.addToTdArray(speciesEaten);
	this.addToTdArray(food);
	this.addToTdArray(foodEaten);
	
	this.addToTdArray(speedCell.max);
	this.addToTdArray(speedCell.avg);
	this.addToTdArray(speedCell.min);
	
	this.addToTdArray(sizeCell.max);
	this.addToTdArray(sizeCell.avg);
	this.addToTdArray(sizeCell.min);
	
	this.addToTdArray(sensesCell.max);
	this.addToTdArray(sensesCell.avg);
	this.addToTdArray(sensesCell.min);
	
	
	
	this.appendTo = function(tableElement){
		var trs = tableElement.find("tr");
		for(var i = 0; i < trs.length; i++){
			trs.eq(i).append(this.tdArray[i]);
		}
	}
	this.remove = function(){
		for(var i = 0; i < this.tdArray.length; i++){
			this.tdArray[i].remove();
		}
	}
	
	this.compareTo = function(previousColumn){
		//todo
	}
	
	
	this.addToTdArray = function(data){
		this.tdArray[this.tdArray.length] = $("<td>" + data + "</td>");
	}
}