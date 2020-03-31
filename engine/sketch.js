var afinn;

function preload() {
  afinn = loadJSON('https://marketingjump.github.io/afinn111com.json');
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
		var negazioni = ["no", "non", "nn", "nessuno", "nessun"];
		var pronomi = ["mi", "le", "ti", "vi", "ci", "li", "gli", "eravamo", "eri", "ero", "eravate", "era", "sono", "sei", "\u00E8", "siamo", "siete"];
		var participio = ["stati", "stato", "eravamo", "eri", "ero", "eravate", "era", "sono", "sei", "\u00E8", "siamo", "siete"];
		for (var i = 0; i < words.length; i++) {
			var word = words[i].toLowerCase();
			if (afinn.hasOwnProperty(word)) {
				var score = afinn[word];
				console.log(word, score, i.value);
				console.log(words.length);
				if (words.length >= 2) {
					if ((negazioni.indexOf(words[i - 1].toLowerCase())>-1)) {
						score = -score;
					}
					if (words.length >= 3 && (pronomi.indexOf(words[i - 1].toLowerCase()) >-1) && (negazioni.indexOf(words[i - 2].toLowerCase())>-1)) {
						score = -score;
					}
					if (words.length > 3 && (participio.indexOf(words[i - 1].toLowerCase())>-1) && (pronomi.indexOf(words[i - 2].toLowerCase())>-1) && (negazioni.indexOf(words[i - 3].toLowerCase())>-1)) {
						score = -score;
					}
				}
				totalScore += Number(score);
				scoredwords.push(word + ': ' + score + ' ')
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