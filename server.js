const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
var http = require('http');

app.use(bodyParser.json())
app.use(express.static('public'))

// App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

// Bucket Upload


// Run NLP Analysis
async function quickstart() {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    // The text to analyze
    const text = 'Hello, world!';
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
  
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  }


  $(function() {
 
    $(".polaroid").draggable({

      // ドラッグ開始時
      start : function (event , ui){
        var target = document.getElementById(this.id);
        target.style.zIndex=100;
      },

      // ドラッグ終了時
      stop : function (event , ui){
          // console.log(event , ui);

          var nowPosition = new Object();
          var newPosition = new Array();

          // 現在のポジションを取得する
          for (var i = 1; i < 6; i++) {
              var positionData = getPosition(i);
              nowPosition = {'name':'item'+i,'position':positionData};

               newPosition.push(nowPosition);
          }

          // ソート
          newPosition.sort(function(a,b){
                  if( a['position'] > b['position'] ) return -1;
                  if( a['position'] < b['position'] ) return 1;
                  return 0;
          });

          // Orderを入れる
          var number = 0;
          for (var i = newPosition.length; i--; ) {
              console.log(newPosition[i].name);

              var tmpItem = document.getElementById(newPosition[i].name);
              tmpItem.style.order = number;
              tmpItem.style.left = 0;
              tmpItem.style.top = 0;

              number ++;
          }

        // 最後にz-indexを元に戻す
        var target = document.getElementById(this.id);
        target.style.zIndex=0;
      }

    });

    // position取得の関数
    function getPosition(item){
      var tmpItem = document.getElementById('polaroid');
      // console.dir(tmpItem);
      return tmpItem.offsetLeft;
    }
});