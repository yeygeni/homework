const express = require("express");
const itemsRouter = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const uid = require('uid');
require('../models/Item');
const Items = mongoose.model("items");
itemsRouter.route("/")
            .get(async (req, res)=>{
            	try {

					const items = await Items.find();            	
					res.json(items);            
				} catch(e) {
            		res.status(500)
            	}
            	
            });

itemsRouter.route('/deleteItem')
			.post(async (req,res,next)=>{
				const {id} = req.body;
				if(!id){
					res.json({error:"Value can't be empty"});
				} 
				else {
					try {
  						await Items.findOneAndRemove({id});
						const items = await Items.find();            	
						res.json(items);				
						} 
					catch(e) {
		          		res.status(500)
					}
				}
				});


itemsRouter.route('/addItem')
			.post(async (req,res,next)=>{
				const {name,category} = req.body;
				if(!name || !category){
					res.json({error:"Value can't be empty"});
				}
				else{
					const newItem = new Items({
						id: uid(),
						name:name,
						category:category
					});
					try {
							const items = await newItem.save();
							res.sendStatus(201)				
						} 
					catch(e) {
						res.status(500).json(e)
					}
				}		
				});

itemsRouter.route('/changeItem')
			.post(async (req,res,next)=>{
				const {id,name,category} = req.body;
				if(!name || !category || !id){
					res.json({error:"Value can't be empty"});
				}
				else{
					try {
						await Items.findOneAndUpdate({id}, {$set:{name,category}})
						console.log('edit')
						res.sendStatus(200);				
					} 
					catch(e) {
						res.status(500).json(e)
					}
				}
			});
module.exports ={ 
	itemsRouter
}