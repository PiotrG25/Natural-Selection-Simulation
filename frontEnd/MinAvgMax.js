function MinAvgMax(arr){
	var sum = arr[0];
	this.min = arr[0];
	this.max = arr[0];
	
	for(var i = 1; i < arr.length; i++){
		sum += arr[i];
		if(arr[i] < this.min){
			this.min = arr[i];
		}else if(arr[i] > this.max){
			this.max = arr[i];
		}
	}
	
	this.avg = sum / arr.length;
}