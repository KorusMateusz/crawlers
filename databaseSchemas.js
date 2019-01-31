const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const item = new Schema({
  name: {type: String, required: true},
  targetPriceInGold: {type: Number, required: true},
  tpId: {type: Number, required: true},
  alert: {type: Boolean, required: true}
});
const Item = mongoose.model("gw2tpItems", item, "gw2tpItems");

module.exports = Item;