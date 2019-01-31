const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emailSender = require('../emailSender.js');
const Item = require("../databaseSchemas.js");
/* script connects to mongoDB, searches for items for which an alert is set and checks if their price fell below
specified value*/

function gw2tpPriceCrawler() {
  Item.find({alert: true}, function (err, observedItems) {
    if (err) return err;
    for (let i = 0; i < observedItems.length; i++) {
      const item = observedItems[i];
      const xhr = new XMLHttpRequest();
      xhr.open("get", "https://api.guildwars2.com/v2/commerce/prices/" + item.tpId);
      xhr.send();
      xhr.onload = function () {
        const json = JSON.parse(xhr.responseText);
        if (json.sells.unit_price < item.targetPriceInGold * 10000) {
          emailSender(`${item.name} cheaper than ${item.targetPriceInGold}g`, function (err, info) {
            if (err) return console.log(err);
            console.log("Mail sent successfully", info);
            Item.findOneAndUpdate({tpId: item.tpId}, {alert: false}, function (err, done){
              if (err) return console.log(err);
              console.log("Alert set to false", done);
            })
          });
          item.alert = false;
        }
      };
    }
  });
}

module.exports = gw2tpPriceCrawler;