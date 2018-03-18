const express = require("express");
const itemsRouter = express.Router();
const path = require('path');

const {readFile} = require('../db/index');
const {writeFile} = require('../db/index');

const itemsDbFile = path.resolve(__dirname,'../db/items.json');
const categoryDbFile = path.resolve(__dirname,'../db/category.json');

const uid = require('uid');

itemsRouter.route("/")
            .get(async (req, res)=>{
            	try {
					const items = await readFile(itemsDbFile);            	
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
							const oldItems = await readFile(itemsDbFile);
							const items = oldItems.filter(item => item.id !== id)
							
							await writeFile(itemsDbFile,items);
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
					const newItem = {
						id: uid(),
						name:name,
						category:category
					}
					console.log('newItem',req.body);
					try {
							const items = await readFile(itemsDbFile);
							items.push(newItem);
							await writeFile(itemsDbFile,items);
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
							const items = await readFile(itemsDbFile);
							const index = items.findIndex(item => item.id === id);
							items[index].name = name;
							items[index].category =category;
							await writeFile(itemsDbFile,items);
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