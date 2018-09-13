var builder = require('botbuilder');
require('dotenv-extended').load({
    path: '.env'
});
const logger = require('../Logs/logger')

// Import QnARecognizer List
var QnARecognizer = require('../QnAMakerConfig')

// Import Luis Recognizer
var LuisRecognizer = require('../luisConfig')

//Initialize the final Recognizer list
var RecognizerList = []

//Append QnAReocognizer list to the final RecognizerList
/*QnARecognizer.forEach(function(item){
    RecognizerList.push(item);
});*/


//Append LuisRecognizer list to the final RecognizerList
RecognizerList.push(LuisRecognizer);


//Intent Dialog Declaration
var intents = new builder.IntentDialog({ 
    recognizers: RecognizerList,
    intentThreshold:process.env.ConfidenceThreshold});

    

//Luis Intent Registerations
intents.matches('LeaveBalance', require('./LeaveBalance'));

intents.matches('Distributers',require('./Distributers'));

intents.matches('Scheme',require('./Schemes'));


//QnA Intent Registeration
intents.matches('qna', [
    function (session, args, next) {
        console.log("Reach QNA Block")
        var answerEntity = builder.EntityRecognizer.findEntity(args.entities, 'answer');
        session.send(answerEntity.entity);
    }
]);


//Default or None Intent Registerations
intents.onDefault([
    function(session){
        
            session.send('Sorry!! No Couldnt find a match , let me connect you to a live agent!!');
       
    }
]);



module.exports=intents