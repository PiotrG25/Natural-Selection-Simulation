function Column(simulationData, speeds, sizes, senses){
	
	this.exists = true;
	
	this.speedCell = new MinAvgMax(speeds);
	this.sizeCell = new MinAvgMax(sizes);
	this.sensesCell = new MinAvgMax(senses);
	
	this.tdArray = [];
	this.addToTdArray = function(data){
		this.tdArray[this.tdArray.length] = $("<td>" + data.toFixed(3)+ "</td>");
	}
	
	this.addToTdArray(simulationData.simulation);
	this.addToTdArray(simulationData.species);
	this.addToTdArray(simulationData.speciesEaten);
	this.addToTdArray(simulationData.food);
	this.addToTdArray(simulationData.foodEaten);
	
	this.addToTdArray(this.speedCell.max);
	this.addToTdArray(this.speedCell.avg);
	this.addToTdArray(this.speedCell.min);
	
	this.addToTdArray(this.sizeCell.max);
	this.addToTdArray(this.sizeCell.avg);
	this.addToTdArray(this.sizeCell.min);
	
	this.addToTdArray(this.sensesCell.max);
	this.addToTdArray(this.sensesCell.avg);
	this.addToTdArray(this.sensesCell.min);
	
	
	
	this.appendTo = function(tableElement){
		var trs = tableElement.find("tr");
		for(var i = 0; i < trs.length; i++){
			trs.eq(i).append(this.tdArray[i]);
		}
	}
	this.remove = function(){
		this.exists = false;
		for(var i = 0; i < this.tdArray.length; i++){
			this.tdArray[i].remove();
		}
	}
	
	this.compareTo = function(previousColumn){
		//todo
	}
	
	
}