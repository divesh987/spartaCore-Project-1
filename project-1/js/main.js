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
	// var end =0;
	var p1end =0;
	var p2end=0;
	var seq1=[];
	var seq2=[];
	var player1Seq=[];
	var player2Seq=[];
	var resultDisplay=$("#result");
	var $score=$("#score");
	var score=0;
	var play = true;
	var audioA = new Audio('audio/pianoA.mp3');
	var audioB = new Audio('audio/pianoB.mp3');
	var audioC = new Audio('audio/pianoC.mp3');
	var audioD = new Audio('audio/pianoD.mp3');
	var audios=[audioA,audioB,audioC,audioD];
	var turn =0;
	// console.log($circle);
	var $start=$("#start");
	var num;
	// console.log($start);
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	// console.log($colours[0]);
	var colours=["red","green","yellow","blue"]

	//loop through function to set all circles 
	function buttonclickable(sq){
		for(var i=0;i<$colours.length;i++){
			setUpCircles($colours[i],colours[i],audios[i],sq);
		}
			$go.html("Go!");
	}



	function playerSwitch(){
		if(turn%2==0){
			turnOffButtons();
			$go.html("")
 			p1end++;
			player1Seq=[];
			seq1=[];
			sequence(p1end,seq1);
			setTimeout(function(){
			buttonclickable(player1Seq)
			},p1end*1000);
			compareSeq(player1Seq,seq1);
			turn++;

		}
		else {
				turnOffButtons();
				$go.html("")
 				p2end++;
				player2Seq=[];
				seq2=[];
				sequence(p2end,seq2);
				setTimeout(function(){
				buttonclickable(player2Seq);
				},p2end*1000);
				compareSeq(player2Seq,seq2)
				turn++;

	}
}

	//set up circles function 
	function setUpCircles(x,colour,audio,playerSequence){
		console.log('setting up circles function')

		$(x.on("click",function(){

		// if(player1Seq.length == seq.length){
		// 	player1Seq = [];
		// }
		x.css("background-color",colour)
		audio.play();
		setTimeout(function(){
		x.css("background-color",settingResetcolours(x));
		},500);
		playerSequence.push(colour);
		audio.play();
		// console.log(player1Seq);

		// player1Seq=[];
		}))
 	}

	function sequence(end,seq){
		for (var i=0;i<end;i++){
			var j=1000*i;
			setTimeout(function(){
				myTimeout1(seq)
			},j);
			setTimeout(resetColour,j+500);

		// setTimeout(resetColour(currentColour,i*3000))
		}	
	}


$start.on("click",function(){
playerSwitch();
})	


//function that will randomise the sequence
function myTimeout1(seq) {
	var currentColourID=0;
	num=(Math.round(Math.random()*3) + 1)-1
	// console.log(num);
	currentColour =$colours[num];
	audios[num].play()
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

function compareSeq(playerSequence,actualSequence){
	// console.log('comparing');
	// console.log('player',player1Seq);
	// console.log('seq',seq);
	// console.log('length', player1Seq.length)

	for(var i =0; i<playerSequence.length;i++){
			if(playerSequence[i] === actualSequence[i]){
				score++;
				$score.html(score);
				
			
			}else {
			resultDisplay.html("Game Over, Your score is: "+score);
			turnOffButtons();
			play=false;
			break;
		}
	}
	// console.log("emptied the sequence");
	// console.log(seq);
	// // player1Seq=[];
	// // seq=[];
	
	// // sequence();
	//  console.log("emptied the player sequence");
	//  console.log(player1Seq);
}

function turnOffButtons(){
	// console.log("turning off buttons");
	for(var i=0;i<$colours.length;i++){
		$colours[i].off("click");
	}
}
})