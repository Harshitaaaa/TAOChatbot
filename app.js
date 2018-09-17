var builder = require('botbuilder');
var restify = require('restify');
var cognitiveservices = require('./node_modules/botbuilder-cognitiveservices/lib/botbuilder-cognitiveservices');
var myMiddleware = require('./logger')


require('dotenv-extended').load({
    path: '.env'
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});



// Listen for messages from users 
server.post('/api/messages', connector.listen());



// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// var bot = new builder.UniversalBot(connector, function (session) {
// session.send("You said: %s  %s", session.message.text,process.env.Hello_Message);
// })
var bot = new builder.UniversalBot(connector)

bot.use({
    botbuilder: function (session, next) {
        myMiddleware.logIncomingMessage(session, next);
    },
    send: function (event, next) {
        myMiddleware.logOutgoingMessage(event, next);
    }
})


// Route any conversations to respective dialogs
bot.dialog('/', require('./Dialogs/dialog'));



