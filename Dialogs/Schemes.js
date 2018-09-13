var builder = require('botbuilder');
require('adaptivecards');
const distri = require('./Distributers');
const distriDetails = require('./DistributersDetails');
const schemeDetails = require('./SchemesDetails');
const umer = require('./umerid');
const umerDetails = require('./umeridDetails');

module.exports = [
    function(session){
        builder.Prompts.choice(session, "How would you like to search the Scheme ?", "By Distributer|By UMERID", { listStyle: builder.ListStyle.button });
    },
    function(session,results){
        if(results.response.entity.toLowerCase() == "by distributer"){
            distri(session);
        }
        else if(results.response.entity.toLowerCase() == "by umerid"){
            umer(session);
        }
        else
        {
            session.endDialog("Incorrect Option");
        }
    },
    function(session,results){
        //session.send("You selected Distributor ID :: " + results.response)
        if(results.response.toString().startsWith('1')){
            distriDetails(session,results.response);
        }
        else{
            umerDetails(session,results.response);
        };  
    },
    function(session,results){
        session.send("You selected "+results.response+" Scheme");
        schemeDetails(session,results.response);
    }
]