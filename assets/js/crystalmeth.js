"use strict";

var wins = 0;
var losses = 0;
var guessesLeft = 0;
var gameOver = false;
var gameOn = false;
var maxComputerNumber = 21;
var minComputerNumber = 20;
var computerRandomNumber = 0;
var currentTotal = 0;
var crystals = {
	'charoite': 1,
	'lapis-lazuli': 5,
	'rhodonite': 10,
	'coral-aura': 20
};

// document.onload = playMusic();
$().ready(function(){
	$("#startBtn").on("click", function(event)
	{
		if(!gameOn)
		{
		// stopMusic();
		reset();		
		gameOn = true;
		generateRandomNumber();
		$("#numGuessesLeft").html(guessesLeft);
	}
});

	$("#resetBtn").on("click", function(event)
	{
		reset();
		// playMusic();
	});

	$("#resetScoreBtn").on("click", function(event)
	{
		reset();
		resetScoreboard();
		// playMusic();
	});

	$(".crystals button").on("click", function(event)
	{
		if(gameOn)
		{
			processRound($(this));
			if(!gameOn)
			{
				seeWhoWon();
			}
		}
		else{
			$("#startErrorMessage").css("display", "block");
		}
	});
});  //end ready function

function generateRandomNumber()
{
	var multiplier = maxComputerNumber - minComputerNumber + 1;
	computerRandomNumber = Math.floor(Math.random() * multiplier) + minComputerNumber;
	console.log(computerRandomNumber);
}

function showRandomNumber(message)
	//This shows the number to the loser if she lost
	{
		var where = $("#computerNumber");
		if(message == "won")
		{
			where.html("Congratulations! You won!");
		}
		else
		{
			where.html("Sorry! You lost! The computer guessed: " + computerRandomNumber);
		}
	}

	function processRound($this)
	{
		var worth = crystals[$this.attr("id")];
		currentTotal += worth;
		$("#currentTotal").html(currentTotal);
		gameOn = (currentTotal < computerRandomNumber);

	}

	function seeWhoWon()
	{
		if(currentTotal == computerRandomNumber)
		{
			wins++;
			showRandomNumber("won");
		}
		else
		{
			losses++;
			showRandomNumber("Sorry! But the computer guessed:");
		}
		$("#wins").html(wins);	
		$("#losses").html(losses);	
		$("#total").html(wins+losses);		
	}

	function reset()
	{
		guessesLeft = 0;
		computerRandomNumber = 0;
		currentTotal = 0;
		gameOver = false;
		gameOn = false;
		$("#computerNumber").html("");
		$("#currentTotal").html("");
		$("#numGuessesLeft").html("");
		$("#startErrorMessage").css("display", "none");
	}

	function resetScoreboard()
	{
		wins = 0;
		losses = 0;
		$("#wins").html("");	
		$("#losses").html("");	
		$("#total").html("");	
	}


	function playMusic()
	{
		var audio = $("#themeMusic");
		audio.play();
		audio.on("ended", function(){
			audio.play();
		});
	}

	function stopMusic()
	{
		$("#themeMusic").pause();
	}

