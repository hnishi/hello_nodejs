const AWS = require('aws-sdk');
const https = require('https');

AWS.config.loadFromPath('./config.json');

var quicksight = new AWS.Service({
    apiConfig: require('./quicksight-2018-04-01.min.json'),
    region: 'ap-northeast-1',
});

var embedding_url;

function callback(data) {
  console.log('Hello');
  console.log(data);
  return data;
}

quicksight.getDashboardEmbedUrl({
    'AwsAccountId': '398271760466',
    'DashboardId': 'bd0d37aa-a280-4086-98bc-933aa1db139d',
    'IdentityType': 'IAM',
    'ResetDisabled': true,
    'SessionLifetimeInMinutes': 100,
    'UndoRedoDisabled': false

}, function (err, data) {
    if (!err) {
        console.log(Date());
        callback(data);
    } else {
        console.log(err);
        callback();
    }
});

console.log(embedding_url);

// ref: https://medium.com/zenofai/how-to-embed-quicksight-dashboards-in-your-web-application-d8f7043e59b7
