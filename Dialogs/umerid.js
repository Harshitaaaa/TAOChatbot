var builder = require('botbuilder');
require('adaptivecards');
const test = require('../Database/sqltest');

function distributersList(session){
    var query = "select * from schemes";
    test(query,(rows)=>{
        returnJSONTable(rows,(rows1)=>{
            var msg1 = new builder.Message(session).addAttachment(rows1);
            session.send(msg1);
            builder.Prompts.text(session,"Please select the UMERID.");
        })
               
    });

}

function returnJSONTable(stringdata,callback){
    var jsonnn = {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
          "type": "AdaptiveCard",
          "version": "1.0",
          "body": [{
              "type": "Container",
              "speak": "Please select one UMERID from the below list",
              "items": [{
                  "type": "ColumnSet",
                  "columns": [{
                      "type": "Column",
                      "items": [{
                          "type": "TextBlock",
                          "text": "UMERID"
                        }]
                        }, {
                          "type": "Column",
                          "size": "auto",
                          "items": [{
                            "type": "TextBlock",
                            "text": "Narration"
                          }]
                      }]
                  }]
              }]
          }
      };
  
      stringdata.forEach((item)=>{
          tempCol1 = {
              "type": "TextBlock",
              "text": ""
          }   
          tempCol2 = {
              "type": "TextBlock",
              "text": ""
          }
          tempCol1.text = item[3].value.toString();
          jsonnn.content.body[0].items[0].columns[0].items.push(tempCol1);
          tempCol2.text = item[4].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol2);
      });
      callback(jsonnn);
  }

module.exports = distributersList;