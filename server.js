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

// Retrieve Style Sheet later
// app.get('/style.css', function(req, res) {
//   res.sendFile(__dirname + "/public/style.css");
// });

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