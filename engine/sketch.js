var afinn;

function preload() {
  afinn = loadJSON('engine/afinn111-2.0.json');
}

function setup() {

  
}

function draw() {}

function sentimentpredict(text){

  var textinput = text;
    var words = textinput.split(/\W/);
    console.log(words);
    var scoredwords = [];
    var totalScore = 0;
    for (var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        var score = afinn[word];
        console.log(word, score);
        totalScore += Number(score);
        scoredwords.push(word + ': ' + score + ' ');
      }
    }
    
	/*var scorePar = select('#scoreP');
    scorePar.html('score: ' + totalScore);
    var comp = select('#comparativeP');
    comp.html('comparative: ' + totalScore / words.length);
    var wordlist = select('#wordlistP');
    wordlist.html(scoredwords);*/

    return (totalScore / words.length);


}