$(function(event){
	//find circle
	$go=$("#go");
	var $circle = $(".circle");
	var $red =$("#red");
	var $green = $("#green");
	var $yellow = $("#yellow");
	var $blue = $("#blue");
	var $test=$("#button");
	var currentColour;
	var currentKey;
	var reset;
	var $pg=$("#pg");
	var p1end =0;
	var p2end=0;
	var requiredSequenceP1=[];
	var requiredSequenceP2=[];
	var sequenceP1=[];
	var sequenceP2=[];
	var $result1=$("#result1");
	var $result2=$("#result2")
	var $score1=$("#score1");
	var $score2=$("#score2");
	var score1=0;
	var score2=0;
	var $p1Lives=$(".lives");
	var $p2Lives=$(".lives2");
	var p1Lives=3;
	var p2Lives=3;
	var play = true;
	var audioA = new Audio('audio/pianoA.mp3');
	var audioB = new Audio('audio/pianoB.mp3');
	var audioC = new Audio('audio/pianoC.mp3');
	var audioD = new Audio('audio/pianoD.mp3');
	var audios=[audioA,audioB,audioC,audioD];
	var turn = 0;
	var $start=$("#start");
	var num;
	
	//putting all found colours into array to set circles up
	var $colours = [$red,$green,$yellow,$blue]
	// console.log($colours[0]);
	var colours=["red","green","yellow","blue"];
	var $up=$("#up");
	var $down=$("#down");
	var $left = $("#left");
	var $right = $("#right");

	var $arrows=[$up,$down,$left,$right];
	var arrows =["up","down","left","right"]
	var keepComp;

	//starting game function 
	function startGame(){
	}

	function keyspressable(sq){
		for(var i=0;i<$arrows.length;i++){
			setUpKeys($arrows[i],arrows[i],audios[i],sq)
		
		}

		if(turn % 2 !=0){
			$go.html("Kudos Go!");
		} else {
			$go.html("Slasher Go!")
		}

	}

	function setUpKeys(keys, key, audio, sq){
		switch(key){
			case "up":
				$("body").keydown(function(e) {
  				if(e.keyCode == 38) { // up
  					$up.css("opacity","0.4");
  					$up.css("filter","alpha(opacity=40)");
  					sq.push("up");
  					console.log("up");
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
  					$down.css("opacity","0.4");
  					$down.css("filter","alpha(opacity=40)");
  					sq.push("down");
  					console.log("down");
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
  					$left.css("opacity","0.4");
  					$left.css("filter","alpha(opacity=40)");
  					sq.push("left");
  					console.log("left");
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
  					$right.css("opacity","0.4");
  					$right.css("filter","alpha(opacity=40)");
  					sq.push("right");
  					console.log("right");
  					audio.play();
  					setTimeout(function(){
  						resetKey(keys);
  					},500)
  				}
				})
		}

	}

	function start(){
		$("body").keydown(function(e) {
	  	if(e.keyCode == 32) { 
	  		gameStart();
				compareSeq();

	  	}
		})
	}
	//loop through function to set all circles 
	function buttonclickable(sq){

		for(var i=0;i<$colours.length;i++){
			setUpCircles($colours[i],colours[i],audios[i],sq);
		}

		if(turn % 2 !=0){
			$go.html("Kudos Go!");
		} else {
			$go.html("Slasher Go!")
		}
	
	}

	$pg.click(function(){
		console.log("pg");
			// location.reload();
			clearInterval(keepComp);
	})

	function gameStart(){
		//This is the first go
		if(turn%2==0){
			removeKeys();
			// for (var i = 0; i < $circles.length; i++){
			// 	$circles[i].css("background-color",settingResetcolours($circles[i]));
			// }
			sequenceP1=[];
			requiredSequenceP1=[];
			turnOffButtons();
			$go.html("")
			p1end++;
			sequence(p1end,requiredSequenceP1);
			setTimeout(function(){
				buttonclickable(sequenceP1)
			},p1end*1000);
			// keepComp = setInterval(gameWork,(p1end*1000)+500);
			console.log('current turn ------ 1');
			turn++;
			// turn = 1
		
			// turn=2;

		}
		else {
			removeCircles();
			turnOffButtons();
			sequenceP2=[];
			requiredSequenceP2=[];
			$go.html("")
 			 p2end++;
 			 setTimeout(function(){
 			 	keySequence(p2end,requiredSequenceP2);
 			 },500);
 			 setTimeout(function(){
 			 		keyspressable(sequenceP2);
 			 },p2end*1000);
 			 turn++
			// sequence(p2end,requiredSequenceP2);
			// setTimeout(function(){
			// 		buttonclickable(sequenceP2);
			// },p2end*1000);
			// console.log('current turn ------ 2');
			// turn++;

		}	
		// setInterval(gameStart,p1end*1000);
	}

	function gameWork(){

		if(sequenceP1.length === requiredSequenceP1.length){
			// keepComp =setInterval(compareSeq,(p1end*1000)+500);
			compareSeq();
			p1end++;
		}

	}

	//set up circles function 
	function setUpCircles(x,colour,audio,playerSequence){
		console.log('setting up circles function')

		$(x.on("click",function(){
			console.log("ive been clicked");
			// if(sequenceP1.length == seq.length){
			// 	sequenceP1 = [];
			// }
			x.css("background-color",colour)
			audio.play();
			setTimeout(function(){
			x.css("background-color",settingResetcolours(x));
			},500);
			playerSequence.push(colour);
			audio.play();
			// console.log(sequenceP1);

			// sequenceP1=[];
		}))
 	}

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
		// setTimeout(resetColour(currentColour,i*3000))
		}	

		},500)
		

	}
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
		// setTimeout(resetColour(currentColour,i*3000))
		}	
		},500)


	}


	// $start.on("click",function(){
	// 	$start.html("Submit");
	// 		gameStart();
	// 		compareSeq();
	// 	 // livesLost();
	// 		// removeCircles();
	// 		// keySequence(p1end,sequenceP1);
	// 		// keySequence(p1end,sequenceP1);
	// })	

	function keySeqGen(sq){
		var currentKeyID =0;
		num=(Math.round(Math.random()*3) + 1)-1
		audios[num].play();

		currentKey= $arrows[num];
		currentKeyID=currentKey.attr("id");
		currentKey.css("opacity","0.4");
  	currentKey.css("filter","alpha(opacity=40)");

  	sq.push(currentKeyID);

	}

//function that will randomise the sequence
	function sequenceGen(seq) {
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
	function resetKey(a){
		a.css("opacity","");
		a.css("filter","");

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
		console.log('compare the turn ------------------------')
		//This is the first go
		if(turn % 2 === 0){
			console.log('Whos Turn - Should be 2 which is player 1',turn);
			console.log('sequenceP1',sequenceP1);
			console.log('requiredSequenceP1',requiredSequenceP1);
		}	else {
			console.log('Whos Turn - Should be 3 which is player 2',turn);
			console.log("sequenceP2 ",sequenceP2);
			console.log("requiredSequenceP2 ",requiredSequenceP2);
		}
		
		//console.log('length', sequenceP1.length)
		// var a = setInterval(gameStart,p1end*1000);
		// this is the first turn
		if(turn % 2 === 0){
			// console.log(turn);

			for(var i =0; i<sequenceP1.length;i++){
				console.log('Whos Turn - Should be 2 which is player 1',turn);

				// if(sequenceP1.length === requiredSequenceP1.length){
					if(sequenceP1[i] === requiredSequenceP1[i]){
						// console.log("get");
						score1++;
						$score1.html(score1);
						 // var b =setInterval(gameStart,p2end*1000);
						 // clearInterval(keepComp);
						 
						 // setTimeout(gameStart,1000);
					}else {

						$result1.html("Game Over, Your score is: "+score1 + " Slasher wins");
						turnOffButtons();
						$("body").keydown(function(e) {
	  					if(e.keyCode == 32) { 

	  					}
						})
						clearInterval(keepComp);
						$start.off("click");
						$($start.remove())
						play=false;
						removeCircles();
						break;
					}
				// }

			}

		} else {


			for(var i = 0; i < sequenceP2.length; i++){
				console.log('Whos Turn - Should be 3 which player 2',turn);

					if(sequenceP2[i] === requiredSequenceP2[i]){
						score2++;
						$score2.html(score2);
						// clearInterval(keepComp);
						// p2end++;
						
						// setTimeout(gameStart,2000)
						 // var a = setInterval(gameStart,p1end*1000);

						 

					} else {

						$result2.html("Game Over, Your score is: "+score2 + " Kudos wins");
						turnOffButtons();
						$("body").keydown(function(e) {
	  					if(e.keyCode == 32) { 
	  					}
						})
						// clearInterval(keepComp);
						$start.off("click");
						$($start.remove())
						play=false;
						removeCircles();
						break;
					}
				
			}

		}
	}

	function turnOffButtons(){
		// console.log("turning off buttons");
		for(var i = 0; i < $colours.length; i++){
			$colours[i].off("click");
		}
	}

	function removeCircles(){
				for(var i=0;i<$colours.length;i++){
			$colours[i].css("display","none");
			// $colours[i].removeID();
		}
	}
	function removeKeys(){
		for(var i = 0; i < $arrows.length; i ++){
			$arrows[i].css("display","none");
		}
	}

	function livesLost(){
		$p1Lives[$p1Lives.length-1].remove();
		console.log($p1Lives);
	}

	function incrementSequence(pSequence,seq){

	}
	removeKeys();
	start();
})