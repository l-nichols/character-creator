

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

var positiveTraits = [	
	['Creative', 'Someone who is original, ingenious, or adaptive. This person might come up with a new way to look at an old problem, make interesting art, or invent something incredible.'],
	['Curious', 'Someone who is interested in new things and open to new experiences.'],
	['Open-Minded', 'Someone who has good judgement and the ability to think critically about issues and decisions without allowing biases or preconceived notions to affect decisions and conclusions.'],
	['A Life-long Learner', 'Someone who actively seeks out new skills and knowledge.'],
	['Wise', 'Someone who uses their cumulative knowledge and experience to evaluate matters and make sense of them.'],
	['Persistent', 'Someone who perseveres and finishes what they start despite obstacles.'],
	['Brave', 'Someone who does what needs to be done despite being afraid.']
]


var negativeTraits = [
	['Unimaginative', 'Someone who is uninspired or unable to adapt. This person doesn\'t just dislike thinking outside the box.  They\'re completely unable to do so.'],
	['Disinterested', 'Someone who doesn\'t care about novelty and has no interest in new experiences or trying new things. Or perhaps someone who has stopped seeking new experiences and things or someone world-weary for whom nothing at all is new.'],
	['Closed-Minded', 'Someone who is prejudiced or dogmatic. This person allows personally held beliefs to affect their decision-making abilities and judgement.'],
	['Resistant to Learning', 'Someone who dislikes and avoids learning new skills and knowledge.'],
	['Foolish', 'Someone who does not learn from experience. A foolish person may have knowledge and experience, but they are unable to use either one to inform their actions or advise others.'],
	['A Quitter', 'Someone who is faint-hearted and gives up at the first sign of difficulty. A person who is a quitter may lack confidence in their ability to overcome obstacles, or they may simply not wish to expend the effort necessary.'],
	['Cowardly', 'Someone for whom fear keeps them from accomplishing what they wish to accomplish or from doing the right thing because they are afraid of the consequences. Many people have specific fears or phobias, but a cowardly person may have many fears that stop them from doing many things.  Or they may choose to avoid standing up for what is right when presented with a trying situation.']
]

//Use randomTrait(either positiveTraits or negativeTraits) to return an array with the name and description
function randomTrait(array) {
	var trait = array[array.length * Math.random() << 0];
	return trait;
};

function pickColor() {
	var colors = ["#F37936", "#1FBBA6", "#9FA7B4", "#1B2E35", "#01AFD1"];
	return colors[Math.floor(Math.random() * colors.length)];
};

function createCharacter(positive, negative) {
	character = [];
	positiveArray = positiveTraits.slice();
	negativeArray = negativeTraits.slice();
	for(var i=0; i < positive; i++){
		index = positiveArray.length * Math.random() << 0;
		character.push(positiveArray[index]);
		if (positiveArray[index][0] == "Curious" || positiveArray[index][0] == "A Life-long Learner") {
			trigger = positiveArray[index][0];
			positiveArray.splice(index, 1);
			negativeArray.splice(index, 1);
			if (trigger == "Curious") {
				console.log("Curious was trigger")
				newIndex = getIndexOf(positiveArray, "A Life-long Learner");
				positiveArray.splice((newIndex[0]), 1);
				newIndex = getIndexOf(negativeArray, "Resistant to Learning");
				negativeArray.splice((newIndex[0]), 1);
			}
			else {
				console.log("Life-long Learner was trigger");
				newIndex = getIndexOf(positiveArray, "Curious");
				positiveArray.splice((newIndex[0]), 1);
				newIndex = getIndexOf(negativeArray, "Disinterested");
				negativeArray.splice((newIndex[0]), 1);
			}
		}
    	else {
    		positiveArray.splice(index, 1);
    		negativeArray.splice(index, 1);
    	}
	}

	for(var i=0; i < negative; i++){
		index = negativeArray.length * Math.random() << 0;
    	character.push(negativeArray[index]);
    	if (negativeArray[index][0] == "Resistant to Learning" || negativeArray[index][0] == "Disinterested") {
    		trigger = negativeArray[index][0];
    		positiveArray.splice(index, 1);
    		negativeArray.splice(index, 1);
    		if (trigger == "Resistant to Learning") {
    			console.log("Resistant to learning was trigger");
    			newIndex = getIndexOf(negativeArray, "Disinterested");
    			negativeArray.splice((newIndex[0]), 1);
    		}
    		else {
    			console.log("Disinterested was trigger");
    			newIndex = getIndexOf(negativeArray, "Resistant to Learning");
    			negativeArray.splice((newIndex[0]), 1);
    		}
    	}
    	else {
    		positiveArray.splice(index, 1);
    		negativeArray.splice(index, 1);
    	}
	}
	return character;
};

function getIndexOf(array, testItem){
    for(var i=0; i<array.length; i++){
        var index = array[i].indexOf(testItem);
        if (index > -1){
            return [i, index];
        }
    }
}

function formatCharacter(characterArray) {
	string = ""
	for(var i=0; i < characterArray.length; i++) {
		string += "<p>" + characterArray[i][0] + " --- " + characterArray[i][1] + "</p>";
	}
	return string;
};