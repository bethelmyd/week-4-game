var wins = 0;
var losses = 0;

$(document).ready(function(){
	$("#fighters > div").on("click", function(event){
		var opponentArea = $("#opponents");
		var fighters = $("#fighters > div");
		var clicked = this;
		fighters.each(function(){
			if(clicked !== this){
				opponentArea.append(this);
			}

		});
	});//end on click for fighters


	$("#opponents > div").on("click", function(event){
		var currentOpponentArea = $("#currentOpp");
		console.log(currentOpponentArea);
		currentOpponentArea.append(this);
	});//end on click for opponents

	$("#resetBtn").on("click", function(event){
		reset();
	});

	$("#resetScoreBtn").on("click", function(event){
		reset();
		resetSummary();
	});






});//end document ready

function reset(){
	var opponents = $("#opponents > div");
	var fighterArea = $("#fighters");
	fighterArea.append(opponents);

}

function resetSummary(){
		wins = 0;
		losses = 0;
		$("#wins").html("0");	
		$("#losses").html("0");	
		$("#total").html("0");		
}