$(function(event){
	$go=$("#go");
	//find circle
	var $circle = $(".circle");
	var $red =$("#red");
	var $green = $("#green");
	var $yellow = $("#yellow");
	var $blue = $("#blue");
	var currentColour;
	var currentKey;
	var $pg=$("#pg");
	var p1end =0;
	var p2end=0	;
	//variables for the required sequences
	var requiredSequenceP1=[];
	var requiredSequenceP2=[];
	//variables for player sequences
	var sequenceP1=[];
	var sequenceP2=[];
	//variables for getting html scores
	var $score1=$("#score1");
	var $score2=$("#score2");
	//variables for player scores
	var score1=0;
	var score2=0;
	//variables for audio use
	var audioA = new Audio('audio/pianoA.mp3');
	var audioB = new Audio('audio/pianoB.mp3');
	var audioC = new Audio('audio/pianoC.mp3');
	var audioD = new Audio('audio/pianoD.mp3');
	var audios=[audioA,audioB,audioC,audioD];

	//variable to switch between turns of both players
	var turn = 0;
	//getting start message
	var $start=$("#start");
	//variable to randomise sequence
	var random;
	
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	//array for pushing values in both the player sequence and required sequence for player 1
	var colours=["red","green","yellow","blue"];

	var $up=$("#up");
	var $down=$("#down");
	var $left = $("#left");
	var $right = $("#right");
	//putting all found keys into array to set keys up
	var $arrows=[$up,$down,$left,$right];
	//array for pushing values in both the player sequence and required sequence for player 2
	var arrows =["up","down","left","right"]

	//function to loop through all the found arrow keys on the screen
	function keyspressable(sq){
		for(var i=0;i<$arrows.length;i++){
			setUpKeys($arrows[i],arrows[i],audios[i],sq)
		
		}
		switchTurns();
	}

	// sets up all the keyboard arrow keys
	function setUpKeys(keys, key, audio, sq){
		switch(key){
			case "up":
				$("body").keydown(function(e) {

  				if(e.keyCode == 38) { // up

  					e.preventDefault(); 
  					$up.css("opacity","0.4");
  					$up.css("filter","alpha(opacity=40)");
  					sq.push("up");
  					audio.play();
  					setTimeout(function(){
  						resetKey(keys);
  					},500)
  				}
				})
			break;

			case "down":
				$("body").keydown(function(e) {

  				if(e.keyCode == 40) { // down
  					e.preventDefault(); 
  					$down.css("opacity","0.4");
  					$down.css("filter","alpha(opacity=40)");
  					sq.push("down");
  					audio.play();
  					setTimeout(function(){
  						resetKey(keys);
  					},500)
  				}
				})
			break;

			case "left":
				$("body").keydown(function(e) {

  				if(e.keyCode == 37) { // left
  					e.preventDefault(); 
  					$left.css("opacity","0.4");
  					$left.css("filter","alpha(opacity=40)");
  					sq.push("left");
  					audio.play();
  					setTimeout(function(){
  						resetKey(keys);
  					},500)
  				}
				})
			break;

			case "right":
				$("body").keydown(function(e) {

  				if(e.keyCode == 39) { // right
  					e.preventDefault(); 
  					$right.css("opacity","0.4");
  					$right.css("filter","alpha(opacity=40)");
  					sq.push("right");
  					audio.play();
  					setTimeout(function(){
  						resetKey(keys);
  					},500)
  				}
				})
		}

	}

	//start the game function which adds an event for the space key
	function start(){
		$("body").keydown(function(e) {

	  	if(e.keyCode == 32) {
	  		e.preventDefault(); 
	  		$("#instructions").css("display","none");
	  		$start.html("Tap Space to Submit Sequence!")
	  		gameLogic();
				compareSeq();

	  	}
		})
	}

	//loop through function to set all circles 
	function buttonclickable(sq){

		for(var i = 0; i < $colours.length; i++){
			setUpCircles($colours[i],colours[i],audios[i],sq);
		}
		switchTurns();
	
	}

	//function to display the "go" text for each player 
	function switchTurns(){

			if(turn % 2 !=0){
			$go.html("Kudos Go!");
			$go.css("left","20px");
			
		} else {
			$go.html("Slasher Go!");
			$go.css("left","600px");
			$go.css("colour","blue");
		}

	}

	//function to set the play again button up. 
	function playAgain(){

		$pg.click(function(){
			document.location.replace("index.html")
		})

	}

	//function that runs the game
	function gameLogic(){

		if(turn%2==0){
			//This is the first go
			removeKeys();
			$("#gameCanvas").css("background-color","black");
			$("#kudos").css("display","");
			$("#slasher").css("display","none")
			sequenceP1=[];
			requiredSequenceP1=[];
			turnOffButtons();
			$go.html("")
			p1end++;
			sequence(p1end,requiredSequenceP1);
			setTimeout(function(){
				buttonclickable(sequenceP1)
			},p1end*1000);
			turn++;

		} else {
				$("#gameCanvas").css("background-color","#888B81");
				$("#slasher").css("display","")
				$("#kudos").css("display","none");
				removeCircles();
				turnOffButtons();
				sequenceP2=[];
				requiredSequenceP2=[];
				$go.html("")
 			 	p2end++;
 			 	keySequence(p2end,requiredSequenceP2);
 			 	setTimeout(function(){
 			 		keyspressable(sequenceP2);
 			 	},(p2end*1000)+500);
 			 	turn++
			}	
	}

	//set up circles function 
	function setUpCircles(x,colour,audio,playerSequence){

		$(x.on("click",function(){
			x.css("background-color",colour)
			audio.play();

			setTimeout(function(){
				x.css("background-color",settingResetcolours(x));
			},500);

			playerSequence.push(colour);
			audio.play();
		}))

 	}

 	//function to run the required sequence for player 1
	function sequence(end,seq){

		setTimeout(function(){
			for (var i = 0; i < $colours.length; i ++){
				$colours[i].css("display","");
			}
		},100)

		setTimeout(function(){
			for (var i=0;i<end;i++){
			var j=1000*i;

			setTimeout(function(){
				sequenceGen(seq);

			},j);

			setTimeout(resetColour,j+500);
			}	
		},500)

	}

	//function to run the required sequence for player 2
	function keySequence(end,seq){

		setTimeout(function(){
			for (var i = 0; i < $arrows.length; i ++){
				$arrows[i].css("display","");
			}
		},100)

		setTimeout(function(){
			for (var i=0;i<end;i++){
			var j=1000*i;

			setTimeout(function(){
				keySeqGen(seq);
			},j);

			setTimeout(function(){
				resetKey(currentKey);
			},j+500);
			}

		},500)

	}

	//function to generate the required sequence for player 2
	function keySeqGen(sq){

		var currentKeyID =0;
		random=(Math.round(Math.random()*3) + 1)-1
		audios[random].play();
		currentKey= $arrows[random];
		currentKeyID=currentKey.attr("id");
		currentKey.css("opacity","0.4");
  	currentKey.css("filter","alpha(opacity=40)");
  	sq.push(currentKeyID);

	}

	//function that will generate the required sequence for player 1
	function sequenceGen(seq) {

		var currentColourID=0;
		random=(Math.round(Math.random()*3) + 1)-1
		currentColour =$colours[random];
		audios[random].play()
		currentColourID=currentColour.attr("id");
	  currentColour.css("background-color",colours[random]);
	  seq.push(currentColourID);

	}

	//function to reset the colour back to the light colour
	function resetColour(){

		currentColour.css("background-color",settingResetcolours(currentColour));
	}

	//function to reset the display of the key back to its original 
	function resetKey(a){

		a.css("opacity","");
		a.css("filter","");

	}

	//function that returns the dimmed colour for the solid colour you pass in
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

	//function that compares both sequences depending on who's turn it was
	function compareSeq(){

		if(turn % 2 === 0){
			for(var i =0; i<sequenceP1.length;i++){
				if(sequenceP1[i] === requiredSequenceP1[i]){

					score1++;
					$score1.html(score1);

					}else {

						$("#gameCanvas").css("display","none");
						$("#gO").html("GAME OVER!!!")
						$("#winner").html("Slasher------------------------------------" + score2 + " sequences repateated correctly");
						$("#loser").html("Kudos---------------------------------------" + score1 + " sequences repateated correctly");
						$("#endResult").html("Player 2 Wins!!! \n Slasher kills Kudos. He avenges his parents. Will he ever find out he is a demi-god?");
						turnOffButtons();
						clearInterval(keepComp);
						$start.off("click");
						$($start.remove())
						play=false;
						removeCircles();
						break;
					}
			}

		} else {

			for(var i = 0; i < sequenceP2.length; i++){

					if(sequenceP2[i] === requiredSequenceP2[i]){

						score2++;
						$score2.html(score2);

					} else {

						$("#gO").html("GAME OVER!!!")
						$("#gameCanvas").css("display","none");
						// $("#gameOver").css("display",);
						$("#winner").html("Kudos------------------------------------" + score1 + " sequences repateated correctly");
						$("#loser").html("Slasher-----------------------------------" + score2 + " sequences repateated correctly");
						$("#endResult").html("Player 1 wins!!! \n Slasher failed to avenge his parents. Kudos kills Slasher and his tyranny continues...")
						turnOffButtons();
						$start.off("click");
						$($start.remove())
						play=false;
						removeCircles();
						break;
					}
			}

		}

	}

	//turning off the coloured circles listeners
	function turnOffButtons(){

		for(var i = 0; i < $colours.length; i++){
			$colours[i].off("click");
		}

	}

	//function to remove the circles from display
	function removeCircles(){
				for(var i=0;i<$colours.length;i++){
			$colours[i].css("display","none");
			// $colours[i].removeID();
		}
	}

	//function to remove the keys from display
	function removeKeys(){

		for(var i = 0; i < $arrows.length; i ++){
			$arrows[i].css("display","none");
		}

	}

	//calling all functions needed to run game
	removeKeys();
	start();
	playAgain();
})