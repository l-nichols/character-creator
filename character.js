

$( document ).ready(function() {
 	
 	$("#character-button").click(function(e) {
 		e.preventDefault();
 		color = pickColor();
 		//This is the recommended jQuery for adding nested elements to DOM
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
	['Creative', 'Someone who is original, ingenious, or adaptive.'],
	['Curious', 'Someone who is interested in new things and open to new experiences.'],
	['Open-Minded', 'Someone who is receptive to and willing to actively seek out evidence against their favored beliefs.'],
	['A Life-long Learner', 'Someone who actively seeks out new skills and knowledge.'],
	['Wise', 'Someone who uses their cumulative knowledge and experience to evaluate matters and make sense of them.'],
	['Persistent', 'Someone who perseveres and finishes what they start despite obstacles.'],
	['Brave', 'Someone who does what needs to be done despite being afraid.'],
	['Honest', 'Someone who is true to themselves and honest with others.'],
	['Enthusiastic', 'Someone who approaches activities and life with zest and eagerness.'],
	['Loving', 'Someone who is able to form secure, healthy attachments with other people.'],
	['Kind', 'Someone who is compassionate and concerned for others\' welfare.' ],
	['Emotionally Intelligent', 'Someone who is able to perceive and process information about motives and feelings that relate to the well-being of themselves or others.'],
	['Socially Responsible', 'Someone who have a sense of duty and teamwork and pull their own weight in groups that they are a member of such as their family, co-workers, union-members, etc.'],
	['Good Leader', 'Someone who is a good leader'],
	['Merciful', 'Someone who forgives and is merciful'],
	['Modest', 'Someone with humility and modesty.'],
	['Self-Regulated', 'Someone who displays self control'],
	['Appreciative of Beauty and Excellence', 'Someone who experiences awe and wonder'],
	['Grateful', 'Someone who is grateful for what they have in life'],
	['Hopeful', 'Someone who has hope'],
	['Playful', 'Someone with a sense of humor'],
	['Spiritual', 'Someone who is spiritual']
]


var negativeTraits = [
	['Unimaginative', 'Someone who is uninspired or unable to adapt. Someone who cannot think outside the box.'],
	['Disinterested', 'Someone who doesn\'t care about novelty and has no interest in new experiences or trying new things. Or perhaps someone world-weary for whom nothing at all is new.'],
	['Closed-Minded', 'Someone who displays a tendency to think in ways that favor their current beliefs and who will discard evidence that conflicts with their established beliefs.'],
	['Resistant to Learning', 'Someone who dislikes and avoids learning new skills and knowledge.'],
	['Foolish', 'Someone who does not learn from experience.'],
	['A Quitter', 'Someone who is faint-hearted and gives up at the first sign of difficulty.'],
	['Cowardly', 'Someone for whom fear keeps them from accomplishing what they wish to accomplish or from doing the right thing because they are afraid of the consequences.'],
	['Dishonest', 'Someone who lies to others either overtly or through pretension or insincerity.'],
	['Unenthusiastic', 'Someone who is subdued or sluggish and approaches life with little enthusiasm or energy.'],
	['Hateful', 'Someone who is not capable of forming healthy, secure attachments with other people.'],
	['Mean', 'Someone who is mean-spirited or petty who refrains from generosity.'],
	['Emotionally Ignorant', 'Someone who is clueless about the feelings or motivations of themselves or others.'],
	['Selfish', 'Someone does not pull their own weight in groups and does not display teamwork or good citizenship.'],
	['Bad Leader', 'Someone who is not a good leader'],
	['Unmerciful', 'Someone who does not forgive and is not merciful'],
	['Immodest', 'Someone with no humility and modesty.'],
	['Undisciplined', 'Someone who displays no self control'],
	['Unappreciative of Beauty and Excellence', 'Someone who experiences no awe and wonder'],
	['Ungrateful', 'Someone who takes things for granted'],
	['Not Hopeful', 'Someone who has no hope'],
	['Not Playful', 'Someone with no sense of humor'],
	['Not Spiritual', 'Someone who is not spiritual']
]

//Picks a random color within the theme
function pickColor() {
	var colors = ["#F37936", "#1FBBA6", "#9FA7B4", "#1B2E35", "#01AFD1"];
	return colors[Math.floor(Math.random() * colors.length)];
};

//Enter number of positive and negative traits desired
//Returns an nested array containing the name and description of each trait
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

//Enter an array and the item that you are searching for
//Returns an array of the location of the target 
function getIndexOf(array, testItem){
    for(var i=0; i<array.length; i++){
        var index = array[i].indexOf(testItem);
        if (index > -1){
            return [i, index];
        }
    }
}

//Takes character array and creates an html string that separates each subarray into its own paragraph
//with the name and description separated by " --- "
function formatCharacter(characterArray) {
	string = ""
	for(var i=0; i < characterArray.length; i++) {
		string += "<p>" + characterArray[i][0] + " --- " + characterArray[i][1] + "</p>";
	}
	return string;
};