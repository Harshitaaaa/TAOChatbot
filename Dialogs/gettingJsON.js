
module.exports = function returnJSON(stringdata,callback){
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
						"text": "Distributer ID"
						}]
					}, {
						"type": "Column",
						"size": "auto",
						"items": [{
							"type": "TextBlock",
							"text": "Distributer Name"
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
		tempCol1.text = item[0].value.toString();
		jsonnn.content.body[0].items[0].columns[0].items.push(tempCol1);
		tempCol2.text = item[1].value.toString();
		jsonnn.content.body[0].items[0].columns[1].items.push(tempCol2);
	});
	callback(jsonnn);
}