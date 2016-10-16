"use strict";

$(document).ready(function(){
	var wins = 0;
	var losses = 0;
	var gameOn = false;
	var canAttack = false;
	var fighterSelected = false;
	var opponentSelected = false;
	var fighter = null;
	var opponent = null;
	var globalHealth = 200;
	var numDefeated = 0;

	function Fighter(name, health) {
		this.name = name;
		this.health = health;
		this.attack = 0;
		var attackCopy = 0;
		this.counterAttack = 0;
		this.isAlive = function(){
			return health > 0;
		};
		this.setAttack = function(min, max){
			var numValues = max - min + 1;
			this.attack = Math.floor(Math.random()*numValues) + min;
			attackCopy = this.attack;
		};
		this.setCounterAttack = function(min, max){
			var numValues = max - min + 1;
			this.counterAttack = Math.floor(Math.random()*numValues) + min;
		};
		this.reduceHealth = function(amount){
			this.health -= amount;
		};
		this.setHealth = function(health){
			this.health = health;
		};
		this.upAttack = function(){
			this.attack += attackCopy;
		};
	};

	//create the fighters
	var fighters = [];
	fighters["vader"] = new Fighter("Darth Vader", globalHealth);
	fighters["vader"].setAttack(20, 25);
	fighters["vader"].setCounterAttack(15, 25);

	fighters["han"] = new Fighter("Han Solo", globalHealth);
	fighters["han"].setAttack(20, 25);
	fighters["han"].setCounterAttack(15, 25);

	fighters["luke"] = new Fighter("Luke Skywalker", globalHealth);
	fighters["luke"].setAttack(20, 25);
	fighters["luke"].setCounterAttack(15, 25);

	fighters["boba"] = new Fighter("Boba Fett", globalHealth);
	fighters["boba"].setAttack(20, 25);
	fighters["boba"].setCounterAttack(15, 25);

	$("#fighterSelection > div").on("click", whenFighterClicked);//end on click for fighters

	$("#resetBtn").on("click", function(event){
		reset();
	});

	$("#resetScoreBtn").on("click", function(event){
		reset();
		resetSummary();
	});


	$("#startBtn").on("click", function(){
		if(!gameOn){
			reset();
			gameOn = true;

		}
		else
		{
		}
	});


	function whenFighterClicked(event)
	{
		if(!gameOn)
		{
			alert("Start game first please");
			return;
		}
		var opponentArea = $("#opponents");
		var combatants = $("#fighterSelection > div");
		var clicked = this;
		fighter = fighters[$(this).attr("id")];
		// console.log(fighter);
		combatants.each(function(){
			if(clicked !== this){
				opponentArea.append(this);
				$(this).off("click");
				$(this).on("click", function(event){
					// if(!fighterSelected){
					// 	alert()
					// }
					var currentOpponentArea = $("#currentOpp");
					currentOpponentArea.append(this);
					opponent = fighters[$(this).attr("id")];
					// console.log(opponent);
					$(this).off("click");
					opponentSelected = true;
					$("#opponentHealthPara").css("display", "block");
					$("#opponentHealth").html(opponent.health);
				});//end on click for opponents);
			}

		});
		$("#attack").css("display", "inline-block");
		$("#fighterHealthPara").css("display", "block");
		$("#fighterHealth").html(fighter.health);
		fighterSelected = true;
	}	

	$("#attack").on("click", function(event){
		if(fighterSelected)
		{
			if(opponentSelected)
			{
				// console.log(fighter);
				// console.log(opponent);
				opponent.reduceHealth(fighter.attack);
				fighter.reduceHealth(opponent.counterAttack);
				var fHealth = fighter.health;
				var oHealth = opponent.health;
				$("#fighterHealth").html(fHealth);
				$("#opponentHealth").html(oHealth);
				fighter.upAttack();
				if(fighter.health <= 0)
				{
					$("#results").html("Sorry! You lost!");
					$("#results").css("display", "block");
				}
				else if (opponent.health <= 0){
					numDefeated++;
					if(numDefeated == fighters.length-1){  //you are not an opponent
						//You won
						$("#results").html("Congrats! You beat them all!");
						$("#results").css("display", "block");
					}
					else{
						//go get the next opponent
						opponentSelected = false;
					}
				}
			}
			else
			{
				alert("Select an opponent please.");
			}
		}
		else
		{
			alert("Select a fighter please.");
		}
	});

	function reset(){
		var opponents = $("#opponents > div");
		opponents.off("click");
		var fighterArea = $("#fighterSelection");
		fighterArea.append(opponents);
		var currentOpponents = $("#currentOpp > div");
		currentOpponents.off("click");
		fighterArea.append(currentOpponents);
		$("#fighterSelection > div").on("click", whenFighterClicked);//end on click for fighters
		$(".btn-attack").css("display", "none");
		gameOn = false;	
		canAttack = false;	
		if (fighterSelected){
			fighter.setHealth(globalHealth);
			fighter.setAttack(20, 25);
			fighter.setCounterAttack(15, 25);
		}
		if (opponentSelected) {
			opponent.setHealth(globalHealth);
			opponent.setAttack(20, 25);
			opponent.setCounterAttack(15, 25);
		}
		fighterSelected = false;
		opponentSelected = false;
		fighter = opponent = null;
		$("#fighterHealthPara").css("display", "none");
		$("#opponentHealthPara").css("display", "none");
		$("#results").css("display", "none");
		$("#results").html("");
		$("#fighterHealth").html("0");
		$("#opponentHealth").html("0");

	}

	function resetSummary(){
		wins = 0;
		losses = 0;
		$("#wins").html("0");	
		$("#losses").html("0");	
		$("#total").html("0");		
	}

});//end document ready

