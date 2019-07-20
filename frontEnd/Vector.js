function Vector(x, y){
	this.x = x;
	this.y = y;
	
	this.length = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	this.versor = function(){
		return new Vector(this.x / this.length(), this.y / this.length());
	}
	this.add = function(v){
		this.x += v.x;
		this.y += v.y;
	}
}