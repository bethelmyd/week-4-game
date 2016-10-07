"use strict";

var MAX_BODY_PARTS = 6;
var youGuessed = "";
var wins = 0;
var losses = 0;
var guessesLeft = 0;
var words = ["doberman", "schnauzer", "rottweiler", "pekingese", "pug", "cocker spaniel", "pit bull", "maltese"];
var word, wordCopy;
var computerGuess = "";
var gameOver = false;
var numBodyParts = MAX_BODY_PARTS;
var gameOn = false;
var man = ["head", "body", "leftArm", "rightArm", "leftLeg", "rightLeg"];


document.onload = playMusic();

document.querySelector("#startBtn").onclick = function(event)
{
	if(!gameOn)
	{
		stopMusic();
		reset();		
		gameOn = true;
		generateWord();
		setUpWordEnvironment();
		document.querySelector("#numGuessesLeft").innerHTML = guessesLeft;
	}
};

document.querySelector("#resetBtn").onclick = function(event)
{
	reset();
	playMusic();
};

document.querySelector("#resetScoreBtn").onclick = function(event)
{
	reset();
	resetScoreboard();
	playMusic();
};

document.onkeydown = function(event)
{
	if(gameOn)
	{
		var userGuess = getUserGuess(event);
		if(userGuess >= 'a' && userGuess <= 'z')
		{
			processRound(userGuess);
			if(!gameOn)
			{
				seeWhoWon();
			}
		}
	}
};

function getUserGuess(event)
{
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	return userGuess;
}

function generateWord()
{
	var computerRandomNumber = Math.floor(Math.random() * words.length);
	word = words[computerRandomNumber];
	wordCopy = word;
	guessesLeft = word.length - countSpaces(word);
	// console.log(guessesLeft);
}

function showWord()
	//This shows the word to the loser if she lost
	{
		var spans = document.querySelectorAll("#wordGoesHere span");
		for(var i = 0; i < spans.length; i++)
		{
			spans[i].innerHTML = wordCopy.charAt(i);
		}
	}
	function setUpWordEnvironment()
	{
		// create the span tags for placing the word
		var html = "";
		for(var i = 0; i < word.length; i++)
		{
			html += '<span class="' + word.charAt(i) + '">' + ((word.charAt(i)==' ')?' ':"*") + "</span>";
		}

		document.querySelector("#wordGoesHere").innerHTML += html;	
	}

	function processRound(userGuess)
	{
		if(word.indexOf(userGuess) >= 0)  //letter was found in word
		{
			var regExpression = new RegExp(userGuess, 'g');
			//replace letter in word by '*'
			word = word.replace(regExpression, '*');
			//replace the '*' in the corresponding output area with the letters
			var spans = document.querySelectorAll("."+userGuess);
			for(var i = 0; i < spans.length; i++)
			{
				spans[i].innerHTML = userGuess;
			}
			guessesLeft -= spans.length;
			document.querySelector("#numGuessesLeft").innerHTML = guessesLeft;
			//console.log(guessesLeft);
		}
		else if(wordCopy.indexOf(userGuess) == -1 && youGuessed.indexOf(userGuess) == -1)  //it was not in the word AND you did not already guess this
		{
			youGuessed += userGuess + " ";
			document.querySelector("#youGuessed").innerHTML = youGuessed;			
			showPartOfMan(numBodyParts);
			numBodyParts--;
		}

		gameOn = !(numBodyParts == 0 || guessesLeft == 0);

	}

	function seeWhoWon()
	{
		if(guessesLeft == 0)
		{
			wins++;
			document.querySelector("#results").innerHTML = "<p>Whew!</p>";	
		}
		else
		{
			losses++;
			showWord();
			document.querySelector("#results").innerHTML = "<p>Argggggggggg!</p>";	
			howl();
		}
		loadImage();
		document.querySelector("#wins").innerHTML = wins;	
		document.querySelector("#losses").innerHTML = losses;	
		document.querySelector("#total").innerHTML = wins+losses;		
	}

	function reset()
	{
		youGuessed = "";
		numBodyParts = MAX_BODY_PARTS;
		computerGuess = "";
		document.querySelector("#youGuessed").innerHTML = "";	
		document.querySelector("#results").innerHTML = "";
		document.querySelector("#wordGoesHere").innerHTML = "Current word: ";
		hideMan();
		gameOver = false;
		gameOn = false;
		document.getElementById("pic").innerHTML = "";
	}

	function resetScoreboard()
	{
		wins = 0;
		losses = 0;
		document.querySelector("#wins").innerHTML = "";	
		document.querySelector("#losses").innerHTML = "";	
		document.querySelector("#total").innerHTML = "";	
	}

	function showPartOfMan(numPartsLeft)
	{
		var part = MAX_BODY_PARTS - numPartsLeft;
		if(part < 0 || part >= man.length) return;
		if(part == 1)  //show the torso
		{
			var torso = document.querySelectorAll("." + man[1]);
			torso[0].style.visibility = "visible";
			torso[1].style.visibility = "visible";
		}
		else
		{
			var otherPart = document.querySelector("#" + man[part]);
			otherPart.style.visibility = "visible";		
		}
	}

	function hideMan()
	{
		for(var i = 0; i < man.length; i++)
		{
			var part = man[i];
			if(i == 1)
			{
				var torso = document.querySelectorAll("." + man[1]);
				torso[0].style.visibility = "hidden";
				torso[1].style.visibility = "hidden";			
			}
			else
			{
				var otherPart = document.querySelector("#" + man[i]);
				otherPart.style.visibility = "hidden";		
			}
		}
	}

	function countSpaces(str)
	{
		var count = 0;
		for(var i = 0; i < str.length; i++)
		{
			if(str.charAt(i) == ' ')
				count++;
		}
		return count;
	}

	function playMusic()
	{
		var audio = document.querySelector("#themeMusic");
		audio.play();
		audio.onended = function(){
			audio.play();
		};
	}

	function stopMusic()
	{
		var audio = document.querySelector("#themeMusic");
		audio.pause();
	}

	function howl()
	{
		var audio = document.querySelector("#howl");
		audio.play();

	}

	function loadImage()
	{
		var image = document.createElement("img");
		if (wordCopy.indexOf(" ") >= 0)  //word does not have a space in it
		{
			//replace space with underscore
			wordCopy = wordCopy.replace(" ", "_");
		}
		image.src = '../assets/images/' + wordCopy + '.jpg';
		//add image to location in document
		document.getElementById("pic").appendChild(image);
	}
