const annyang = require('annyang');
var socket = require('socket.io-client')('http://localhost:3000');
var commands = {'*i': function() {console.log("実行")}};

  annyang.addCommands(commands);
  annyang.setLanguage('ja');
  annyang.start();
  console.log('録音開始');
  document.getElementById('recording').textContent = '録音開始';
  annyang.addCallback('resultMatch', function(userSaid) {
    console.log('録音: ' + userSaid);
    socket.emit('chat_message', userSaid);
  });

socket.on('msg', function(msg) {
  console.log('返信: ' + msg);
  say(msg);
});

function say(msg, callback) {
  console.log('発話: ' + msg);
  document.getElementById('messages').textContent = msg;
  annyang.abort();
  console.log('録音停止');
  document.getElementById('recording').textContent = '録音停止';

  responsiveVoice.speak(msg, 'Japanese Female', {
  　onend: function() {
      annyang.start();
      console.log('録音再開');
      document.getElementById('recording').textContent = '録音再開';
    }
   });
};
