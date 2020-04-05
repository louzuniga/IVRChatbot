const voice = document.querySelector(`.voice`);
const voice2text = document.querySelector(`.voice2text`);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

function addHumanText(text) {
  const chatContainer = document.createElement('div');
  chatContainer.classList.add('chat-container');

  const chatBox = document.createElement('p');
  chatBox.classList.add('voice2text');

  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);

  chatContainer.appendChild(chatBox);
  return chatContainer;
}

function addBotText(text) {
  const chatContainer1 = document.createElement('div');
  chatContainer1.classList.add('chat-container');
  chatContainer1.classList.add('darker');

  const chatBox1 = document.createElement('p');
  chatBox1.classList.add('voice2text');

  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

function botVoice(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = 'Sorry, I did not understand that.';

  if (message.includes('fine')) {
    speech.text = 'Nice to hear that. How can I assist today?';
  }
  if (message.includes('hi')) {
    speech.text = `Hello! How are you?`;
  }
  if (message.includes('weather')) {
    speech.text = `I don't think you want to know... just enjoy your day!`;
  }
  if (message.includes('how are you')) {
    speech.text = `I'm fine, thank you for asking. How are you?`;
  }
  if (message.includes('joke')) {
    speech.text = `What do you call a pig that does Karate?`;
  }
  if (message.includes('what')) {
    speech.text = `A pork chop.. hahaha`;
  }

  speech.volume = 1;
  speech.rate = 1.2;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);
  var element = document.getElementById('container');
  element.appendChild(addBotText(speech.text));
}

recorder.onstart = () => {
  console.log('Voice Activated');
};

recorder.onresult = event => {
  const resultIndex = event.resultIndex;
  const transcript = event.results[resultIndex][0].transcript;
  var element = document.getElementById('container');
  element.appendChild(addHumanText(transcript));
  botVoice(transcript);
};

//when the voice btn clicked start recording
voice.addEventListener(`click`, () => {
  recorder.start();
});
