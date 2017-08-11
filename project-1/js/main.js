$(function(event){
	console.log("test");

	//find circle
	var $circle = $(".circle");
	var $red =$("#red");
	var $green = $("#green");
	var $yellow = $("#yellow");
	var $blue = $("#blue");
	var $test=$("#button");
	var timed = 2000;
	var currentColour;
	var reset;
	// console.log($circle);
	var $start=$("#start");
	var num;
	console.log($start);
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	console.log($colours[0]);
	var colours=["red","green","yellow","blue"]
//loop through function to set all circles 
	for(var i=0;i<$colours.length;i++){
		setUpCircles($colours[i],colours[i]);
}
//set up circles function 
	function setUpCircles(x,colour){
		x.on("click",function(){
		x.css("background-color",colour)
	})
 	}
function sequence(){
	for (var i=1;i<6;i++){
	setTimeout(myTimeout1,(i*2000));
setTimeout(resetColour,i*3000)

	// setTimeout(resetColour(currentColour,i*3000))
}



}

$start.on("click",function(){
	sequence();
	console.log("hello")
})

$test.on("click",function(){
	// currentColour=$colours[0];
	
	
})	
//function that will randomise the sequence
function myTimeout1() {
	num=(Math.round(Math.random()*3) + 1)-1
	console.log(num);
	currentColour =$colours[num];
	console.log(currentColour);
  	currentColour.css("background-color",colours[num]);
  	console.log("2 secs passed");
   // setInterval(resetColour(x), 2000);
}
// var a = settingResetcolours($("#red"));
// 	console.log(a);
console.log($colours[0]);
function resetColour(){
	console.log("resseted")
 reset=settingResetcolours(currentColour);
currentColour.css("background-color",settingResetcolours(currentColour));

}
function settingResetcolours(solidColour){
	var resetColour;
	switch(solidColour.attr("id")){
		case "red":
		return resetColour="#F08080";
		break;
		case "green":
		return resetColour="#90EE90";
		break;
		case "yellow":
		return resetColour="#FFFFE0";
		break;
		case "blue":
		return resetColour="#ADD8E6";
		break;

	}
}

 })