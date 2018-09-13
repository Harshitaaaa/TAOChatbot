var builder = require('botbuilder');
require('adaptivecards');
const test = require('../Database/sqltest');

function distributersList(session,distributerID){
    session.send("Please find Distributer & Schemes Summary below :");
    var query = "select * from distributers where ID  = "+distributerID.toString();
    test(query,(rows)=>{
        var query1="select count(*) from schemes where ID  = "+distributerID.toString();
        test(query1,(rowcount)=>{
            returnJSON(rows,rowcount,(rowss)=>{
                var msgg = new builder.Message(session).addAttachment(rowss);
                session.send(msgg);
                var query2 = "select * from schemes where ID  = "+distributerID.toString();
                test(query2,(rowTable)=>{
                    returnJSONTable(rowTable,(rows1)=>{
                        var msg1 = new builder.Message(session).addAttachment(rows1);
                        session.send(msg1);
                        builder.Prompts.text(session,"Please select the Scheme.");
                    })
                })
            });
        });
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

function returnJSON(stringdata,rowcount,callback){
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
                          "text": "Distributer"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Code"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Total Active Schemes"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "This Year Vol",
                            "color" : "#ff0000",
                            "weight" : "bolder"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Last Year Vol",
                            "color" : "red"
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
          tempCol1.text = item[1].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol1);
          tempCol2.text = item[2].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol2);          
          tempCol5.text = rowcount[0][0].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol5);
          tempCol3.text = item[3].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol3);
          tempCol4.text = item[4].value.toString();
          jsonnn.content.body[0].items[0].columns[1].items.push(tempCol4);
      });
      callback(jsonnn);
  }

module.exports = distributersList;