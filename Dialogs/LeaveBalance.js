/*var builder = require('botbuilder');



module.exports = [
    function(session){
        builder.Prompts.choice(session, "Which leave balance do you want to know?", "Casual Leave|Sick Leave", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(results.response.entity.toLowerCase() == "casual leave"){
            session.endDialog("Your Casual leave balance is 8 days");
        }
        else if(results.response.entity.toLowerCase() == "sick leave"){
            session.endDialog("Your Sick leave balance is 5 days");
        }
        else
        {
            session.endDialog("Incorrect Option");
        }
        session.endDialog("Go out");
    }
]*/

var builder = require('botbuilder');



module.exports = builder.DialogAction.send('Hello, How may I help you ?');