var builder = require('botbuilder');
require('adaptivecards');
const test = require('../Database/sqltest');

function distributersList(session,distributerID){
    session.send("You selected UMERID : "+distributerID.toString());
    var query = "select * from schemes where umerid  = "+distributerID.toString();
    test(query,(rows)=>{
        returnJSON(rows,(rowss)=>{
            var msgg = new builder.Message(session).addAttachment(rowss);
            session.send(msgg);
            var query2 = "select * from distributers join schemes on distributers.id = schemes.id where schemes.umerid = '"+distributerID.toString()+"'";
            test(query2,(rowTable)=>{
                returnJSONTable(rowTable,rows,(rows1)=>{
                    var msg1 = new builder.Message(session).addAttachment(rows1);
                    session.send(msg1);
                    builder.Prompts.text(session,"Please select the Scheme.");
                })
            });
        });
    });

}

function returnJSONTable(distributersData,schemeData,callback){
    var jsonnn = {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
          "type": "AdaptiveCard",
          "version": "1.0",
          "body": [{
              "type": "Container",
              "speak": "Please select one Distriuter from the below list",
              "items": [{
                  "type": "ColumnSet",
                  "columns": [{
                      "type": "Column",
                      "items": [{
                          "type": "TextBlock",
                          "text": "Scheme"
                        }]
                        }, {
                          "type": "Column",
                          "size": "auto",
                          "items": [{
                            "type": "TextBlock",
                            "text": "Product"
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
          tempCol1.text = item[2].value.toString();
          jsonnn.content.body[0].items[0].columns[0].items.push(tempCol1);
          tempCol2.text = item[1].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol2);
      });
      callback(jsonnn);
  }

function returnJSON(stringdata,callback){
    var jsonnn = {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
          "type": "AdaptiveCard",
          "version": "1.0",
          "body": [{
              "type": "Container",
              "speak": "Please select one Distriuter from the below list",
              "items": [{
                  "type": "ColumnSet",
                  "columns": [{
                      "type": "Column",
                      "items": [{
                          "type": "TextBlock",
                          "text": "UMERID"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Narration"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Product"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Start Date"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "End Date"
                        }]
                        }, {
                          "type": "Column",
                          "size": "auto",
                          "items": []
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
          tempCol3 = {
            "type": "TextBlock",
            "text": ""
          }
          tempCol4 = {
             "type": "TextBlock",
             "text": ""
          }
          tempCol5 = {
            "type": "TextBlock",
            "text": ""
         }
          tempCol1.text = item[3].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol1);
          tempCol2.text = item[4].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol2);          
          tempCol5.text = item[1].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol5);
          tempCol3.text = item[5].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol3);
          tempCol4.text = item[6].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol4);
      });
      callback(jsonnn);
  }

module.exports = distributersList;