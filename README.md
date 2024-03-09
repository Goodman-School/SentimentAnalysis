# SentimentAnalysis

# prequisition
Register Huggingface account and create a access token 
refer https://www.educative.io/answers/how-to-get-an-access-token-for-hugging-face

1. Go to https://huggingface.co/, sign Up
<img width="400" alt="image" src="https://github.com/Goodman-School/SentimentAnalysis/assets/45176371/39552db0-134c-43bc-a588-8e2a05300416">

2. Go to settings, create your token
   
   <img width="416" alt="image" src="https://github.com/Goodman-School/SentimentAnalysis/assets/45176371/d7021bc1-0b81-4151-873f-c82aacd4da95">
   <img width="631" alt="image" src="https://github.com/Goodman-School/SentimentAnalysis/assets/45176371/d7c93ff1-1eaa-44a6-a27f-6f9b298b5f77">


# Build Sentiment Analysis in Google Sheet
create a google sheet (with a google account of course)

Open appscript editor
<img width="1194" alt="image" src="https://github.com/Goodman-School/SentimentAnalysis/assets/45176371/d888635e-abeb-484d-944a-c29db42c04f7">

Name the script, paste code, replace the apiKey to your HF key
<img width="1234" alt="image" src="https://github.com/Goodman-School/SentimentAnalysis/assets/45176371/edba3c6a-5867-4559-8f71-35c7ce9e3441">

```
function SentimentScore(inputText) {
  var apiURL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
  var apiKey = "your hf key here"; // Make sure to replace this with your actual API key

  var payload = JSON.stringify({
    "inputs": inputText,
  });

  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + apiKey
    },
    "payload": payload,
    "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch(apiURL, options);
  var data = JSON.parse(response.getContentText());
  
  if (!Array.isArray(data) || data.length === 0) {
    return JSON.stringify(data);
  }
  var tags = data[0]
  for (var row of tags){
    if(row['label'] == 'POSITIVE'){
      return row['score']
    }
  }
  return `something wrong, returned data: ${JSON.stringify(data)}`;
}
```

Use the function in the google sheet cell, e.g.: `=SentimentScore(A2)`

<img width="395" alt="image" src="https://github.com/Goodman-School/SentimentAnalysis/assets/45176371/bdb57dbd-4654-4e07-a64f-d13de5fd37e7">
