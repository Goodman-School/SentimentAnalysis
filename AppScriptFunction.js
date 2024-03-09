function SentimentScore(inputText) {
  var apiURL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
  var apiKey = "your huggingface key"; // Make sure to replace this with your actual API key

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
