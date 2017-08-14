$(function(event){

	//find circle
	var $circle = $(".circle");
	var $red =$("#red");
	var $green = $("#green");
	var $yellow = $("#yellow");
	var $blue = $("#blue");
	var $test=$("#button");
	var timed = 3000;
	$playAgain=$("#pg");
	var currentColour;
	var reset;
	var seq=[];
	var playerSeq=[];
	var seqCheck=[];
	var resultDisplay=$("#result");
	var $score=$("#score");
	var score=0;
	var $start=$("#start");
	var num;
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	var colours=["red","green","yellow","blue"]
//loop through function to set all circles 
	function buttonclickable(){
		for(var i=0;i<$colours.length;i++){
			setUpCircles($colours[i],colours[i]);
		}
}
//set up circles function 
	function setUpCircles(x,colour){
		$(x.on("click",function(){
		x.css("background-color",colour)
		setTimeout(function(){
		x.css("background-color",settingResetcolours(x));
		},1000);
		playerSeq.push(colour);
		compareSeq(seq,playerSeq);
		}))
 	}
function sequence(){
	for (var i=1;i<6;i++){
		var j=2000*i;
		setTimeout(myTimeout1,j);
		setTimeout(resetColour,j+1000);
		// setTimeout(resetColour(currentColour,i*3000))
	}
	buttonclickable();
}

$start.on("click",function(){
	sequence();

})	
//function that will randomise the sequence
function myTimeout1() {
	var currentColourID=0;
	num=(Math.round(Math.random()*3) + 1)-1
	currentColour =$colours[num];
	currentColourID=currentColour.attr("id");
  	currentColour.css("background-color",colours[num]);
  	seq.push(currentColourID);
   // setInterval(resetColour(x), 2000);
}
// var a = settingResetcolours($("#red"));
function resetColour(){
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
function compareSeq(sequence,playerSequence){
	for(var i =0; i<playerSequence.length;i++){
			if(playerSequence[i]==sequence[i]){
				seqCheck.push("correct");
				// resultDisplay.html("correct");
				score++;
				$score.html(score)
			} else {
			seqCheck.push("incorrect");
			resultDisplay.html("Game Over, Your score is: "+score);
			turnOffButtons();
			break;
			}
	}
}
$playAgain.on("click",function(){
	location.reload();
})
function turnOffButtons(){
	for(var i=0;i<$colours.length;i++){
		$colours[i].off("click");
	}
}
})