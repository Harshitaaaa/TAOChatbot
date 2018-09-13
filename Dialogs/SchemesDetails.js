var builder = require('botbuilder');
require('adaptivecards');
const test = require('../Database/sqltest');

function schemesList(session,schemeID){
    var query = "select * from schemes where scheme_no  = "+schemeID.toString();
    test(query,(rows)=>{
        var query1="select * from distributers join schemes on distributers.id=schemes.id where schemes.scheme_no = '"+schemeID+"'"
        test(query1,(rowcount)=>{
            returnJSONTable(rowcount,rows,(rows1)=>{
                var msg1 = new builder.Message(session).addAttachment(rows1);
                session.send(msg1);
                builder.Prompts.text(session,"Thanks for querying.");
            
            })
        });
    });

}

function returnJSONTable(distriData,schemeData,callback){
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
                            "text" : "This Year Vol"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Last Year Vol"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Scheme Number"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "UMERID"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Product"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Narration"
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

    distriName = {
        "type": "TextBlock",
        "text": ""
    }   
    codeName = {
        "type": "TextBlock",
        "text": ""
    }
    thisYearVol = {
        "type": "TextBlock",
        "text": ""
    }
    lastYearVol = {
        "type": "TextBlock",
        "text": ""
    }
    schemeNo = {
        "type": "TextBlock",
        "text": ""
    }
    umerID = {
        "type": "TextBlock",
        "text": ""
    }
    product = {
        "type": "TextBlock",
        "text": ""
    }
    narration = {
        "type": "TextBlock",
        "text": ""
    }
    startDate = {
        "type": "TextBlock",
        "text": ""
    }
    endDate = {
        "type": "TextBlock",
        "text": ""
    }
    distriName.text = distriData[0][1].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(distriName);
    codeName.text = distriData[0][2].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(codeName);
    thisYearVol.text = distriData[0][3].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(thisYearVol);
    lastYearVol.text = distriData[0][4].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(lastYearVol);
    schemeNo.text = schemeData[0][2].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(schemeNo);
    umerID.text = schemeData[0][3].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(umerID);
    product.text = schemeData[0][1].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(product);
    narration.text = schemeData[0][4].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(narration);
    startDate.text = schemeData[0][5].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(startDate);
    endDate.text = schemeData[0][6].value.toString();
    jsonnn.content.body[0].items[0].columns[1].items.push(endDate);
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
                            "text" : "This Year Vol"
                        },
                        {
                            "type" : "TextBlock",
                            "text" : "Last Year Vol"
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

module.exports = schemesList;