"use strict";

var wins = 0;
var losses = 0;
var guessesLeft = 0;
var gameOver = false;
var gameOn = false;
var maxComputerNumber = 21;  //120
var minComputerNumber = 20;  //19
var computerRandomNumber = 0;
var maxCrystalNumber = 12;
var minCrystalNumber = 1;
var currentTotal = 0;
var currentBalance = 0;
var crystals = {
	'charoite': 0,
	'lapis-lazuli': 0,
	'rhodonite': 0,
	'coral-aura': 0
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
		generateComputerRandomNumber();
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
			generateCrystalsRandomNumbers();
			processRound($(this));
			if(!gameOn)
			{
				seeWhoWon();
				displaySummaryStats();
			}
		}
		else{
			$("#startErrorMessage").css("display", "block");
		}
	});
});  //end ready function

function generateComputerRandomNumber()
{
	var multiplier = maxComputerNumber - minComputerNumber + 1;
	computerRandomNumber = Math.floor(Math.random() * multiplier) + minComputerNumber;
	$("#computerNumber").html(computerRandomNumber);
}

function generateCrystalsRandomNumbers()
{
	var multiplier = maxCrystalNumber - minCrystalNumber + 1;
	$(".information button").each(function(){
		var id = $(this).attr('id');
		var crystalRandomNumber = Math.floor(Math.random() * multiplier) + minCrystalNumber;
		crystals[id] = crystalRandomNumber;
		console.log(crystals[id]);
	});
}

function showResults(message)
	//This shows the number to the loser if she lost
	{
		var where = $("#results");
		if(message == "won")
		{
			where.html("Congratulations! You won!");
		}
		else
		{
			where.html("Sorry! You lost!");
		}
	}

	function processRound($this)
	{
		var worth = crystals[$this.attr("id")];
		currentTotal += worth;
		currentBalance = computerRandomNumber - currentTotal;
		$("#currentTotal").html(currentTotal);
		$("#balance").html(currentBalance);
		gameOn = (currentTotal < computerRandomNumber);

	}

	function seeWhoWon()
	{
		if(currentTotal == computerRandomNumber)
		{
			wins++;
			showResults("won");
		}
		else
		{
			losses++;
			showResults("lost");
		}
	}

	function displaySummaryStats()
	{
		$("#wins").html(wins);	
		$("#losses").html(losses);	
		$("#total").html(wins+losses);		
	}

	function reset()
	{
		guessesLeft = 0;
		computerRandomNumber = 0;
		currentTotal = 0;
		currentBalance = 0;
		gameOver = false;
		gameOn = false;
		$("#computerNumber").html("");
		$("#currentTotal").html("0");
		$("#balance").html("0");
		$("#results").html("");
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

