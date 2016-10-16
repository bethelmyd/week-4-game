"use strict";

$(document).ready(function(){
	var wins = 0;
	var losses = 0;
	var gameOn = false;
	var canAttack = false;
	var fighterSelected = false;
	var opponentSelected = false;
	var selectOpponent = true;
	var fighter = null;
	var opponent = null;
	var minHealth = 200;
	var maxHealth = 300;
	var minAttack = 6;
	var maxAttack = 8;
	var minCounterAttack = 6;
	var maxCounterAttack = 8;
	var numDefeated = 0;

	function Fighter(name) {
		this.name = name;
		this.health = 0;
		this.attack = 0;
		var attackCopy = 0;
		this.counterAttack = 0;
		this.isAlive = function(){
			return health > 0;
		};
		this.set = function(min, max, msg){
			var numValues = max - min + 1;
			var random = Math.floor(Math.random()*numValues) + min;
			switch(msg)
			{
				case "health": this.health = random; break;
				case "attack": attackCopy = this.attack = random; break;
				case "counterAttack": this.counterAttack = random; break;
			}
		};
		this.reduceHealth = function(amount){
			this.health -= amount;
		};
		this.upAttack = function(){
			this.attack += attackCopy;
		};
	};

	//create the fighters
	var fighters = [];
	var han = new Fighter("Han Solo");
	han.set(minHealth, maxHealth, "health");	
	han.set(minAttack, maxAttack, "attack");
	han.set(minCounterAttack, maxCounterAttack, "counterAttack");
	fighters.push(han);

	var luke = new Fighter("Luke Skywalker");
	luke.set(minHealth, maxHealth, "health");	
	luke.set(minAttack, maxAttack, "attack");
	luke.set(minCounterAttack, maxCounterAttack, "counterAttack");
	fighters.push(luke);

	var vader = new Fighter("Darth Vader");
	vader.set(minHealth, maxHealth, "health");	
	vader.set(minAttack, maxAttack, "attack");
	vader.set(minCounterAttack, maxCounterAttack, "counterAttack");
	fighters.push(vader);

	var boba = new Fighter("Boba Fett");
	boba.set(minHealth, maxHealth, "health");	
	boba.set(minAttack, maxAttack, "attack");
	boba.set(minCounterAttack, maxCounterAttack, "counterAttack");
	fighters.push(boba);

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
		if(fighterSelected) return;
		fighterSelected = true;
		selectOpponent = true;
		var opponentArea = $("#opponents");
		var combatants = $("#fighterSelection > div");
		var clicked = this;
		fighter = fighters[$(this).attr("value")];
		// console.log(fighter);
		combatants.each(function(){
			if(clicked !== this){
				opponentArea.append(this);
				$(this).off("click");
				$(this).on("click", function(event){
					if(!selectOpponent) return;
					var currentOpponentArea = $("#currentOpp");
					currentOpponentArea.append(this);
					opponent = fighters[$(this).attr("value")];
					// console.log(opponent);
					$(this).off("click");
					opponentSelected = true;
					selectOpponent = false;
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
				fighter.upAttack();
				if(fHealth <= 0)
				{
					fHealth = 0;
					$("#results").html("Sorry! You lost!");
					$("#results").css("display", "block");
					gameOn = false;
					$("#attack").css("display", "none");
					fighterSelected = false;
					opponentSelected = false;
					losses++;
					$("#losses").html(losses);									
					$("#total").html(wins+losses);
				}
				else if (oHealth <= 0){
					oHealth = 0;
					numDefeated++;
					if(numDefeated == fighters.length-1){  //you are not an opponent
						//You won
						$("#results").css("display", "block");
						$("#results").html("Congrats! You beat them all!");
						gameOn = false;
						$("#attack").css("display", "none");
						fighterSelected = false;
						opponentSelected = false;
						wins++;				
						$("#wins").html(wins);
						$("#total").html(wins+losses);
					}
					else{
						//go get the next opponent
						opponentSelected = false;
						selectOpponent = true;
					}
					$("#currentOpp > div").css("display", "none");
					$("#opponentHealthPara").css("display", "none");
				}

				$("#fighterHealth").html(fHealth);
				$("#opponentHealth").html(oHealth);

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
		currentOpponents.css("display", "block");
		$("#fighterSelection > div").on("click", whenFighterClicked);//end on click for fighters
		$(".btn-attack").css("display", "none");
		gameOn = false;	
		canAttack = false;
		for(var i = 0; i < fighters.length; i++){	
			fighters[i].set(minHealth,maxHealth,"health");
			fighters[i].set(minAttack, maxAttack, "attack");
			fighters[i].set(minCounterAttack,maxCounterAttack, "counterAttack");
		};
		fighterSelected = false;
		opponentSelected = false;
		selectOpponent = true;
		fighter = opponent = null;
		$("#fighterHealthPara").css("display", "none");
		$("#opponentHealthPara").css("display", "none");
		$("#results").css("display", "none");
		$("#results").html("");
		$("#fighterHealth").html("0");
		$("#opponentHealth").html("0");
		numDefeated = 0;

	}

	function resetSummary(){
		wins = 0;
		losses = 0;
		$("#wins").html("0");	
		$("#losses").html("0");	
		$("#total").html("0");		
	}

});//end document ready

