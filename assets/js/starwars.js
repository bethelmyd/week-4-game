$(document).ready(function(){
	var wins = 0;
	var losses = 0;
	var gameOn = false;
	var canAttack = false;
	var fighterSelected = false;
	var opponentSelected = false;
	var fighter = null;
	var opponent = null;

	function Fighter(name, health) {
		this.name = name;
		this.health = health;
		this.attack = 0;
		this.counterAttack = 0;
		this.isAlive = function(){
			return health > 0;
		};
		this.setAttack = function(min, max){
			var numValues = max - min + 1;
			this.attack = Math.floor(Math.random()*numValues) + min;
		};
		this.setCounterAttack = function(min, max){
			var numValues = max - min + 1;
			this.counterAttack = Math.floor(Math.random()*numValues) + min;
		};
	};

	//create the fighters
	var vader = new Fighter("Darth Vader", 200);
	vader.setAttack(20, 25);
	vader.setCounterAttack(15, 25);

	var han = new Fighter("Han Solo", 200);
	han.setAttack(20, 25);
	han.setCounterAttack(15, 25);

	var luke = new Fighter("Luke Skywalker", 200);
	luke.setAttack(20, 25);
	luke.setCounterAttack(15, 25);

	var boba = new Fighter("Boba Fett", 200);
	boba.setAttack(20, 25);
	boba.setCounterAttack(15, 25);


	$("#fighters > div").on("click", whenFighterClicked);//end on click for fighters



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
		var fighters = $("#fighters > div");
		var clicked = this;
		fighter = this;
		fighters.each(function(){
			if(clicked !== this){
				opponentArea.append(this);
				$(this).off("click");
				$(this).on("click", function(event){
					// if(!fighterSelected){
					// 	alert()
					// }
					var currentOpponentArea = $("#currentOpp");
					currentOpponentArea.append(this);
					opponent = this;
					$(this).off("click");
					opponentSelected = true;
				});//end on click for opponents);
			}

		});
		$(".btn-attack").css("display", "inline-block");
		fighterSelected = true;
	}	

	$("#attack").on("click", function(event){
		if(fighterSelected)
		{
			if(opponentSelected)
			{
				console.log(fighter);
				console.log(opponent);
				
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
		var fighterArea = $("#fighters");
		fighterArea.append(opponents);
		var currentOpponents = $("#currentOpp > div");
		currentOpponents.off("click");
		fighterArea.append(currentOpponents);
		$("#fighters > div").on("click", whenFighterClicked);//end on click for fighters
		$(".btn-attack").css("display", "none");
		gameOn = false;	
		canAttack = false;	
		fighterSelected = false;
		opponentSelected = false;
		fighter = opponent = null;
	}

	function resetSummary(){
		wins = 0;
		losses = 0;
		$("#wins").html("0");	
		$("#losses").html("0");	
		$("#total").html("0");		
	}

});//end document ready

