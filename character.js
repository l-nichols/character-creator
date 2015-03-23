

$( document ).ready(function() {
 	
 	$("#character-button").click(function(e) {
 		e.preventDefault();
 		color = pickColor();
 		$( "<div><p></p></div>")
 			.css("background-color", color)
  			.addClass("character-container")
  			.find("p")
  			.css("text-align", "left")
  			.html(formatCharacter(createCharacter(2,1)))
  			.end()
  			.insertAfter( ".container" );
 	});
});

var positiveTraits = {
	'Creative' : 'Someone who is original, ingenious, or adaptive. This person might come up with a new way to look at an old problem, make interesting art, or invent something incredible.',
	'Curious' : 'Someone who is interested in new things and open to new experiences.',
	'Open-Minded' : 'Someone who has good judgement and the ability to think critically about issues and decisions without allowing biases or preconceived notions to affect decisions and conclusions.',
	'A Life-long Learner' : 'Someone who actively seeks out new skills and knowledge.',
	'Wise' : 'Someone who uses their cumulative knowledge and experience to evaluate matters and make sense of them.',
	'Brave' : 'Someone who does what needs to be done despite being afraid.',
	'Persistent' : 'Someone who perseveres and finishes what they start despite obstacles.',
	'Brave' : 'Someone who does what needs to be done despite being afraid.'
}

var negativeTraits = {
	'Unimaginative' : 'Someone who is uninspired or unable to adapt. This person doesn\'t just dislike thinking outside the box.  They\'re completely unable to do so.',
	'Disinterested' : 'Someone who doesn\'t care about novelty and has no interest in new experiences or trying new things. Or perhaps someone who has stopped seeking new experiences and things or someone world-weary for whom nothing at all is new.',
	'Closed-Minded' : 'Someone who is prejudiced or dogmatic. This person allows personally held beliefs to affect their decision-making abilities and judgement.',
	'Resistant to Learning' : 'Someone who dislikes and avoids learning new skills and knowledge.',
	'Foolish' : 'Someone who does not learn from experience. A foolish person may have knowledge and experience, but they are unable to use either one to inform their actions or advise others.',
	'Cowardly' : 'Someone for whom fear keeps them from accomplishing what they wish to accomplish or from doing the right thing because they are afraid of the consequences. Many people have specific fears or phobias, but a cowardly person may have many fears that stop them from doing many things.  Or they may choose to avoid standing up for what is right when presented with a trying situation.',
	'A Quitter' : 'Someone who is faint-hearted and gives up at the first sign of difficulty. A person who is a quitter may lack confidence in their ability to overcome obstacles, or they may simply not wish to expend the effort necessary.',
	'Cowardly' : 'Someone for whom fear keeps them from accomplishing what they wish to accomplish or from doing the right thing because they are afraid of the consequences. Many people have specific fears or phobias, but a cowardly person may have many fears that stop them from doing many things.  Or they may choose to avoid standing up for what is right when presented with a trying situation.'
}

//Use randomTrait(either positiveTraits or negativeTraits) to return an array with the name and description
function randomTrait(array) {
	var keys = Object.keys(array);
	var name = keys[keys.length * Math.random() << 0];
	var description = array[name];
	var trait = [name, description];
	return trait;
};

function pickColor() {
	var colors = ["#F37936", "#1FBBA6", "#9FA7B4", "#1B2E35", "#01AFD1"];
	return colors[Math.floor(Math.random() * colors.length)];
};

function createCharacter(positive, negative) {
	character = []
	traits = []
	for(var i=0; i < positive; i++){
		newTrait = randomTrait(positiveTraits);
		console.log(newTrait);
    	while ($.inArray(newTrait[0],traits)!== -1) {
    		newTrait = randomTrait(positiveTraits);
    	};
    		character.push(newTrait);
    		traits.push(newTrait[0]);
    		console.log(traits);
	}

	for(var i=0; i < negative; i++){
    	newTrait = randomTrait(negativeTraits)
    	console.log(newTrait);
    	while ($.inArray(newTrait[0],traits) !== -1) {
    		newTrait = randomTrait(negativeTraits);
    	};
    		character.push(newTrait);
    		traits.push(newTrait[0]);
    		console.log(traits);
    }
	return character;
};

function formatCharacter(characterArray) {
	string = ""
	for(var i=0; i < characterArray.length; i++) {
		string += "<p>" + characterArray[i][0] + " --- " + characterArray[i][1] + "</p>";
	}
	return string;
};


// build this out to pull the testing functionality out of the createCharacter
function checkArray(array, testItem) {
	if (array.indexOf(testItem) > -1) {
		return true
	}
	else {
		return false
	}
};