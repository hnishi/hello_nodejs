const AWS = require('aws-sdk');
const https = require('https');

AWS.config.loadFromPath('./config.json');

var quicksight = new AWS.Service({
    apiConfig: require('./quicksight-2018-04-01.min.json'),
    region: 'ap-northeast-1',
});

var embedding_url;

quicksight.getDashboardEmbedUrl({
    'AwsAccountId': '398271760466',
    'DashboardId': 'bd0d37aa-a280-4086-98bc-933aa1db139d',
    'IdentityType': 'IAM',
    'ResetDisabled': true,
    'SessionLifetimeInMinutes': 100,
    'UndoRedoDisabled': false

}, function (err, data) {
    console.log('Errors: ');
    console.log(err);
    console.log('Response: ');
    //console.log(data);
    embedding_url = data.EmbedUrl;
    console.log(embedding_url);
});

console.log(embedding_url);
