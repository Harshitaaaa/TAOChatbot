var cognitiveservices = require('./node_modules/botbuilder-cognitiveservices/lib/botbuilder-cognitiveservices');


// -------- Q/A Recognizer registrations --------------

// Create a recognizer for Knowledge base for Onboarding (Q&A)
var JoiningPersonalDataForm = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: '7cc95ae6-99d9-4ba1-90e5-e46f05dcfe96', 
    authKey: '46681659-eb6b-496c-a5eb-8b36772ab78c',
    endpointHostName: 'https://hronboardingchatbot.azurewebsites.net/qnamaker',
    
    top: 1});


    
//var QnARecognizerList = [Onboarding_QnAMaker,JoiningPersonalDataForm]
var QnARecognizerList = [JoiningPersonalDataForm]



module.exports = QnARecognizerList;