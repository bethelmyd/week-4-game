$(document).ready(function(){
	$("#fighters div").on("click", function(event){
		var opponentArea = $("#opponents");
		var fighters = $("#fighters div");
		var clicked = this;
		fighters.each(function(){
			if(clicked !== this)
				opponentArea.append(this);
		});
	});//end on click for fighters









});//end document ready