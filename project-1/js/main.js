$(function(event){
	console.log("test");

	//find circle
	var $circle = $(".circle");
	var $red =$("#red");
	var $green = $("#green");
	var $yellow = $("#yellow");
	var $blue = $("#blue");
	console.log($circle);
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	var colours=["red","green","yellow","blue"]

	// for(var i=0;i<circleColours.length;i++){
	// 	setUpCircles(i,circleColours[i])
	// }
	// for(var i=0;i<$circle.length;i++){
		
	// 	setUpCircles(i,$circle.attr("id"))

	// }
	//circle event listener function 
	
//loop through function to set all circles 
	for(var i=0;i<$colours.length;i++){
		setUpCircles($colours[i],colours[i])
}
//set up circles function 
	function setUpCircles(x,colour){
		x.on("click",function(){
		x.css("background-color",colour)
	})
	}


	
})