$(function(event){
	// console.log("test");

	//find circle
	$go=$("#go");
	var $circle = $(".circle");
	var $red =$("#red");
	var $green = $("#green");
	var $yellow = $("#yellow");
	var $blue = $("#blue");
	var $test=$("#button");
	var timed = 3000;
	var currentColour;
	var reset;
	var end =0;
	var seq=[];
	var playerSeq=[];
	var resultDisplay=$("#result");
	var $score=$("#score");
	var score=0;
	var play = true;
	var audio = new Audio('audio/pianoD.mp3');
	// console.log($circle);
	var $start=$("#start");
	var num;
	// console.log($start);
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	// console.log($colours[0]);
	var colours=["red","green","yellow","blue"]

	//loop through function to set all circles 
	function buttonclickable(){
		for(var i=0;i<$colours.length;i++){
			setUpCircles($colours[i],colours[i]);
		}
			$go.html("Go!");
	}

	//set up circles function 
	function setUpCircles(x,colour){
		console.log('setting up circles function')

		$(x.on("click",function(){

		// if(playerSeq.length == seq.length){
		// 	playerSeq = [];
		// }
		x.css("background-color",colour)
		setTimeout(function(){
		x.css("background-color",settingResetcolours(x));
		},1000);
		playerSeq.push(colour);
		audio.play();
		// console.log(playerSeq);
		compareSeq();
		// playerSeq=[];
		}))
 	}

	function sequence(){
		for (var i=0;i<end;i++){
			var j=2000*i;
			setTimeout(myTimeout1,j);
			setTimeout(resetColour,j+1000);

		// setTimeout(resetColour(currentColour,i*3000))
		}	
	}


$start.on("click",function(){
	turnOffButtons();
	$go.html("")
 	end++;
	playerSeq=[];
	seq=[];
	sequence();
	setTimeout(buttonclickable,end*2000);
})	


//function that will randomise the sequence
function myTimeout1() {
	var currentColourID=0;
	num=(Math.round(Math.random()*3) + 1)-1
	// console.log(num);
	currentColour =$colours[num];
	 currentColourID=currentColour.attr("id");
	// console.log(currentColour);
  	currentColour.css("background-color",colours[num]);
  	// console.log("2 secs passed");
  	seq.push(currentColourID);
  	// console.log(seq);

   // setInterval(resetColour(x), 2000);
}
// var a = settingResetcolours($("#red"));
	// console.log(a);
// console.log($colours[0]);
function resetColour(){
	// console.log("resseted")
 	reset=settingResetcolours(currentColour);
	currentColour.css("background-color",reset);
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

function compareSeq(){
	console.log('comparing');
	console.log('player',playerSeq);
	console.log('seq',seq);
	console.log('length', playerSeq.length)

	for(var i =0; i<playerSeq.length;i++){
			if(playerSeq[i] === seq[i]){
				score++;
				$score.html(score);
				
			
			}else {
			resultDisplay.html("Game Over, Your score is: "+score);
			turnOffButtons();
			play=false;
			break;
		}
	}
	console.log("emptied the sequence");
	console.log(seq);
	// playerSeq=[];
	// seq=[];
	
	// sequence();
	 console.log("emptied the player sequence");
	 console.log(playerSeq);
}

function turnOffButtons(){
	// console.log("turning off buttons");
	for(var i=0;i<$colours.length;i++){
		$colours[i].off("click");
	}
}
})