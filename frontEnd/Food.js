function Food(x, y){	this.x = x;	this.y = y;		this.exists = true;		this.div = $("<div></div>");	this.div.addClass("food");	this.div.css("top", this.y - 5+ "px");	this.div.css("left", this.x - 5+ "px");		this.appendTo = function(scene){		scene.append(this.div);	}	this.remove = function(){		this.div.remove();	}}