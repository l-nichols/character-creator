

$( document ).ready(function() {
 	
 	$("#character-button").click(function(e) {
 		
 		e.preventDefault();
 		var positive  = $( "input[name='positive']" ).val()
 		var negative  = $( "input[name='negative']" ).val()
 		if (isInvalid(positive) || isInvalid(negative)) {
 			$( "<p></p>")
 				.attr('id', 'error')
 				.css("color", "red")
 				.html("Please enter a number between 1 and 4")
 				.insertBefore( "input[name='positive']" );
 			return;
 		}
 		else {
 		color = pickColor();
 		//This is the recommended jQuery for adding nested elements to DOM
 		$( "#error").remove();
 		$( "<div><p></p></div>")
 			.css("background-color", color)
  			.addClass("character-container")
  			.find("p")
  			.css("text-align", "left")
  			.html(formatCharacter(createCharacter(positive,negative)))
  			.end()
  			.insertAfter( ".container" );
  		}
 	});
});

var positiveTraits = [	
	['Creative', 'Someone who is original, ingenious, or adaptive.'],
	['Curious', 'Someone who is interested in new things and open to new experiences.'],
	['Open-Minded', 'Someone who is receptive to and willing to actively seek out evidence against their favored beliefs.'],
	//['A Life-long Learner', 'Someone who actively seeks out new skills and knowledge.'],
	['Wise', 'Someone who uses their cumulative knowledge and experience to evaluate matters and make sense of them.'],
	['Persistent', 'Someone who perseveres and finishes what they start despite obstacles.'],
	['Brave', 'Someone who does what needs to be done despite being afraid.'],
	['Honest', 'Someone who is true to themselves and honest with others.'],
	['Enthusiastic', 'Someone who approaches activities and life with zest and eagerness.'],
	['Loving', 'Someone who is able to form secure, healthy attachments with other people.'],
	['Kind', 'Someone who is compassionate and concerned for others\' welfare.' ],
	['Emotionally Intelligent', 'Someone who is able to perceive and process information about motives and feelings that relate to the well-being of themselves or others.'],
	['Socially Responsible', 'Someone who have a sense of duty and teamwork and pull their own weight in groups that they are a member of such as their family, co-workers, union-members, etc.'],
	['Good Leader', 'Someone who can direct a group of people to complete selected goals and who inspires them and maintains good morale.'],
	['Merciful', 'Someone who forgives wrongs done to them, gives people second chances, or loves their enemies.'],
	['Modest', 'Someone who lets their accomplishments speak, do not seek the spotlight, and and do not take undue credit.'],
	['Self-Regulated', 'Someone who does not sacrifice long-term goals for short-term pleasures.'],
	['Grateful', 'Someone who is thankful and appreciative of what they have received and experienced in life.'],
	['Hopeful', 'Someone who is optimistic about future events.'],
	['Playful', 'Someone who does not take themselves or others too seriously.'],
	['Transcendental', 'Someone who has beliefs about the universe and their place and higher purpose within it.']
]


var negativeTraits = [
	['Unimaginative', 'Someone who is uninspired or unable to adapt. Someone who cannot think outside the box.'],
	['Disinterested', 'Someone who doesn\'t care about novelty and has no interest in new experiences or trying new things. Or perhaps someone world-weary for whom nothing at all is new.'],
	['Closed-Minded', 'Someone who displays a tendency to think in ways that favor their current beliefs and who will discard evidence that conflicts with their established beliefs.'],
	//['Resistant to Learning', 'Someone who dislikes and avoids learning new skills and knowledge.'],
	['Foolish', 'Someone who does not learn from experience.'],
	['A Quitter', 'Someone who is faint-hearted and gives up at the first sign of difficulty.'],
	['Cowardly', 'Someone for whom fear keeps them from accomplishing what they wish to accomplish or from doing the right thing because they are afraid of the consequences.'],
	['Dishonest', 'Someone who lies to others either overtly or through pretension or insincerity.'],
	['Unenthusiastic', 'Someone who is subdued or sluggish and approaches life with little enthusiasm or energy.'],
	['Hateful', 'Someone who is not capable of forming healthy, secure attachments with other people.'],
	['Mean', 'Someone who is mean-spirited or petty who refrains from generosity.'],
	['Emotionally Ignorant', 'Someone who is clueless about the feelings or motivations of themselves or others.'],
	['Selfish', 'Someone does not pull their own weight in groups and does not display teamwork or good citizenship.'],
	['Poor Leader', 'Someone who either does not take control of a group or does so inneffectively by not insipiring them and maintaining morale or by not accomplishing their goals.'],
	['Unmerciful', 'Someone who is vengeful, spiteful, and punative.'],
	['Arrogant', 'Someone who is boastful, immodest, or pompous.'],
	['Reckless', 'Someone who potentially sacrifices future goals and well-being for short-term gains and pleasures.'],
	['Ungrateful', 'Someone who takes things for granted and feels that things they have received and experienced were simply their due.'],
	['Pessimistic', 'Someone who has no hope for the future and focuses primarily on negatives of a situation.'],
	['Humorless', 'Someone who takes themselves and others too seriously and is not playful.'],
	['Purposeless', 'Someone who lacks any beliefs about the universe and their place and higher purpose within it.']
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
    	positiveArray.splice(index, 1);
    	negativeArray.splice(index, 1);
	}

	for(var i=0; i < negative; i++){
		index = negativeArray.length * Math.random() << 0;
    	character.push(negativeArray[index]);
    	positiveArray.splice(index, 1);
    	negativeArray.splice(index, 1);
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

//Takes input and determines whether it's the input is valid
//Returns true if it is invalid and false if it is valid
function isInvalid(number) {
	if (isNaN(number) || number < 1 || number > 4) {
		return true;
	}
	else {
		return false;
	}
};