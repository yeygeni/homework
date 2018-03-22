const express = require("express");
const categorysRouter = express.Router();
const path = require('path');
const mongoose = require("mongoose");
require('../models/Category');
const Categories = mongoose.model("categories");
require('../models/Item');
const Items = mongoose.model("items");

categorysRouter.route('/deleteCategory')
					.post(async(req,res,next)=>{
						const {removeCategory} =req.body;
						if(!removeCategory){
							res.status(400).json({error:"Value can't be empty"});
						}
						try {
							await Categories.findOneAndRemove({name:removeCategory});
						    await Items.updateMany({category:removeCategory},{category:'other'})
	   						const categories = await Categories.find();
	   						res.json(categories);
						} catch(e) {
							res.status(500).json({error:e});
						}	
					});
categorysRouter.route('/changeCategory')
				.post(async (req,res,next)=>{
					try {
						const {newCategory,oldCategory} = req.body;
						if(!newCategory.name || !oldCategory){
							res.status(400).json({error:"Value can't be empty"});
						}
						await Categories.findOneAndUpdate({name:oldCategory.name},{name:newCategory.name});
						await Items.updateMany({category:oldCategory.name},{category:newCategory.name})	
						res.sendStatus(200)
					} catch(e) {
						res.status(500).json({error:e});
					}
				})
categorysRouter.route("/")
            .get(async (req, res)=>{
            	const categorys = await Categories.find();            	
				res.json(categorys);
            });

categorysRouter.route('/addCategory')
		.post(async (req,res,next) => {
			const { category } = req.body;
			if(!category.name){
				res.status(400).json({error:"Value can't be empty"});
			}
			else{ 
				try {
					const newCategory = new Categories(category);
					await newCategory.save();
					res.sendStatus(201)
				} catch(e) {
					res.status(500).json({error:e});
				}
			}
		});

module.exports ={ 
	categorysRouter
}