$(function(event){
	

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
	var audioA = new Audio('audio/pianoA.mp3');
	var audioB = new Audio('audio/pianoB.mp3');
	var audioC = new Audio('audio/pianoC.mp3');
	var audioD = new Audio('audio/pianoD.mp3');
	var audios=[audioA,audioB,audioC,audioD];
	
	var $start=$("#start");
	var num;
	
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	
	var colours=["red","green","yellow","blue"]

	//loop through function to set all circles 
	function buttonclickable(){
		for(var i=0;i<$colours.length;i++){
			setUpCircles($colours[i],colours[i],audios[i]);
		}
			$go.html("Go!");
	}

	//set up circles function 
	function setUpCircles(x,colour,audio){
		$(x.on("click",function(){
			x.css("background-color",colour)
			audio.play();
			setTimeout(function(){
				x.css("background-color",settingResetcolours(x));
			},1000);
			playerSeq.push(colour);
			audio.play();
			compareSeq();
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

	function startGame(){
		$start.on("click",function(){
			turnOffButtons();
			$go.html("")
 			end++;
			playerSeq=[];
			seq=[];
			sequence();
			setTimeout(buttonclickable,end*2000);
		})
	}

//function that will randomise the sequence
function myTimeout1() {
	var currentColourID=0;
	num=(Math.round(Math.random()*3) + 1)-1
	
	currentColour =$colours[num];
	audios[num].play()
	 currentColourID=currentColour.attr("id");
  	currentColour.css("background-color",colours[num]);
  	seq.push(currentColourID);

}

function resetColour(){
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
}

function turnOffButtons(){
	for(var i=0;i<$colours.length;i++){
		$colours[i].off("click");
	}
}

startGame();	

})
