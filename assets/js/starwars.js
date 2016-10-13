$(document).ready(function(){
	var wins = 0;
	var losses = 0;

	$("#fighters > div").on("click", whenFighterClicked);//end on click for fighters



	$("#resetBtn").on("click", function(event){
		reset();
	});

	$("#resetScoreBtn").on("click", function(event){
		reset();
		resetSummary();
	});




	function whenFighterClicked(event)
	{
		var opponentArea = $("#opponents");
		var fighters = $("#fighters > div");
		var clicked = this;
		fighters.each(function(){
			if(clicked !== this){
				opponentArea.append(this);
				$(this).off("click");
				$(this).on("click", function(event){
					var currentOpponentArea = $("#currentOpp");
					currentOpponentArea.append(this);
					$(this).off("click");
				});//end on click for opponents);
			}

		});
	}	

	function reset(){
		var opponents = $("#opponents > div");
		opponents.off("click");
		var fighterArea = $("#fighters");
		fighterArea.append(opponents);
		var currentOpponents = $("#currentOpp > div");
		currentOpponents.off("click");
		fighterArea.append(currentOpponents);
	$("#fighters > div").on("click", whenFighterClicked);//end on click for fighters
	}

	function resetSummary(){
		wins = 0;
		losses = 0;
		$("#wins").html("0");	
		$("#losses").html("0");	
		$("#total").html("0");		
	}

});//end document ready

