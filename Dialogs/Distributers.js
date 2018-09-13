var builder = require('botbuilder');
require('adaptivecards');
const test = require('../Database/sqltest');
const jsonn = require('../Dialogs/gettingJsON');

function distributersList(session){
    console.log("===Rows before callback");
    var query = "select * from distributers";
    test(query,(rows)=>{
        var card = '';
        jsonn(rows,(rowss)=>{
            card = rowss;
            var msgg = new builder.Message(session).addAttachment(rowss);
            session.send(msgg);
            builder.Prompts.text(session,"Please enter Distributor Code");
        })
    });
}

module.exports = distributersList;