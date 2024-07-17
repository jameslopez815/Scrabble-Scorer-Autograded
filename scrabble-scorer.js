// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toLUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    let word = '';
  
  while ( (word === '') || !isNaN(word) ){
      word = input.question ( "Let's play some Scrabble!\n\nEnter a word to score: " );
  }
    return word;
};

let simpleScorer = function (word) { 
    let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      letterPoints ++; 
   }
   return letterPoints;
};

function vowelBonusScorer(word) {
   let conScore = 0;
   let vowScore = 0;
   let scorerArr = {
      1: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'],
      3: [ 'a', 'e', 'i', 'o', 'u']
   };
   
	for (let i = 0; i < word.length; i++) {
      for (const pointValue in scorerArr) {

		   if (scorerArr[pointValue].includes(word[i])) {

            if (pointValue === '1') {
               conScore += Number(pointValue);

            } else if (pointValue === '3') {
               vowScore += Number(pointValue);
            }
         }
	   }
	}
   let totalScore = conScore + vowScore;
	return totalScore;
 }
 
let scrabbleScorer = function(word) {
   let score = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const letterKey in newPointStructure) {
 
		 if (letterKey.includes(word[i])) {
			score = Number(score) + Number(newPointStructure[letterKey]);
		 }
	  }
	}
	return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
  let algoChoice;
  while ( algoChoice > 2 || algoChoice < 0 || isNaN(algoChoice) ) {
    algoChoice = Number( input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "));
  }
  return algoChoice
}


function transform(oldPointStructure) {
   let newPointStructure = {};

      for (let key in oldPointStructure) {
         let letters = oldPointStructure[key];

         let newKey = '';

         for (i = 0; i < letters.length; i++) {

            newKey = letters[i];
            newKey = newKey.toLowerCase();
            newPointStructure[newKey] = Number(key);
         }
      }
   
   return newPointStructure;
};


let newPointStructure = transform(oldPointStructure);
   

function runProgram() {
   let word = initialPrompt();
   let algoChoice = scorerPrompt();

   let algoName = scoringAlgorithms[Number(algoChoice)].name;
   let scoreWord = scoringAlgorithms[Number(algoChoice)].scorerFunction( word.toLowerCase() );

   console.log( `Score for '${word}': `, scoreWord );
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

