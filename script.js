// web speech api
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// translate api
import { translate } from './translate.js';

// other
var testBtn = document.querySelector('button');
var spokenPhrases = [];

function updateSpokenPhrasesDisplay() {
  var list = document.querySelector('.spoken-phrases');
  list.innerHTML = '';

  spokenPhrases.slice().reverse().forEach(function (phrase, index) {
    var listItem = document.createElement('li');
    listItem.textContent = phrase;
    list.appendChild(listItem);
  });
}

function testSpeech() {
  console.log('testSpeech() activated');
  testBtn.disabled = true;
  testBtn.textContent = 'Translation In Progress';

  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = true;

  recognition.start();

  recognition.onresult = async function (event) {
    console.log('SpeechRecognition.onresult');
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      var speechResult = event.results[i][0].transcript;
      console.log('Confidence: ' + event.results[i][0].confidence);

      const translated = await translate(speechResult);
      const final = speechResult + ' -> ' + translated;
      spokenPhrases.push(final);
    }
    updateSpokenPhrasesDisplay();
  }

  recognition.onspeechend = function () {
    console.log('SpeechRecognition.onspeechend');
  }

  recognition.onerror = function (event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start Real-Time Translation';
  }

  recognition.onaudiostart = function (event) {
    //Fired when the user agent has started to capture audio.
    console.log('SpeechRecognition.onaudiostart');
  }

  recognition.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
    console.log('SpeechRecognition.onaudioend');
  }

  recognition.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    console.log('SpeechRecognition.onend');
    testSpeech();
  }

  recognition.onnomatch = function (event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    console.log('SpeechRecognition.onnomatch');
  }

  recognition.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log('SpeechRecognition.onsoundstart');
  }

  recognition.onsoundend = function (event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    console.log('SpeechRecognition.onsoundend');
  }

  recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function (event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    console.log('SpeechRecognition.onstart');
  }
}

testBtn.addEventListener('click', testSpeech);