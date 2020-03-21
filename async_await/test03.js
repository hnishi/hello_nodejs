
const AWS = require('aws-sdk');

//setTimeoutをいちいち書くのが面倒なので関数化
function Timeout(passVal, ms) {
  return new Promise(resolve =>
      setTimeout(() => {
            resolve(passVal);
    }, ms)
      )
}

async function f1(){
        console.log("#1: f1");
        return "f1 ==> f2";
}
async function f2(passVal){
    console.log("#2: f2");
    return Timeout("f2 ==> f3", Math.random()*2000);
}

async function f3(passVal){
    console.log("#3: f3");
    return Timeout("f3 ==> f4", Math.random()*3000);
}

async function f4(passVal){
        console.log("#4: f4");
        return Timeout("f4", Math.random()*3000);

}


async function runAll(){
    try{
        console.log("[START]");
        const res1 = await f1();
        console.log(res1);

        const res2 = await f2(res1);
        console.log(res2);

        const res3 = await f3(res2);
        console.log(res3);

        const res4 = await f4(res3);
        console.log("Final function: " + res4);

        console.log("[END]");

    }catch(err){
        //エラー処理
        //とりあえず何もしない
    }
}

AWS.config.loadFromPath('./config.json');

var quicksight = new AWS.Service({
    apiConfig: require('./quicksight-2018-04-01.min.json'),
    region: 'ap-northeast-1',
});

var embedding_url;

var zzz = quicksight.getDashboardEmbedUrl({
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
    return embedding_url;
});

console.log(embedding_url);
//console.log(zzz);

runAll()
