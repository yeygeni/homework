const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
	name:String,
});
const Categories = mongoose.model("categories", categorySchema);

module.exports ={
	Categories
}
