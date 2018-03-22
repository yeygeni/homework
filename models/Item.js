const mongoose = require("mongoose");
const { Schema } = mongoose;
const itemsSchema = new Schema({
	id: String,
	name:String,
	category:String
});
const Items = mongoose.model("items", itemsSchema);

module.exports ={
	Items
}
