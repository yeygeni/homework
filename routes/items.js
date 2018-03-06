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
            	const items = await readFile(itemsDbFile);            	
				res.render('index.ejs',items);

            });
itemsRouter.route('/deleteItem')
			.post(async (req,res,next)=>{
				const {id} = req.body;
				console.log(id)
				try {
						const oldItems = await readFile(itemsDbFile);
						const items = {
							items: oldItems.items.filter(item => item.id !== id)
						}
						await writeFile(itemsDbFile,items);
						res.render('index.ejs',items);				
					} 
				catch(e) {
					console.log(e);
				}
				});


itemsRouter.route('/addItem')
			.get(async (req, res)=>{
				try {
					const categorys = await readFile(categoryDbFile);            	
					res.render('addItem.ejs',categorys);

				} catch(e) {
					// statements
					console.log(e);
				}
            	
            })
			.post(async (req,res,next)=>{
				const { itemName,category } = req.body;
				const newItem = {
					id: uid(),
					name:itemName,
					category:category
				}
				try {
						const items = await readFile(itemsDbFile);
						items.items.push(newItem);
						await writeFile(itemsDbFile,items);
						console.log(items);
						res.render('index.ejs',items);				
					} 
				catch(e) {
					// statements
					console.log(e);
				}
				
						
				});
itemsRouter.route('/changeItemById')
			.post(async(req,res,next)=>{
				try {
					const { id,oldName,oldCategory } = req.body;
					const categorys = await readFile(categoryDbFile); 
					res.render('changeItem.ejs',{categorys,id,oldName,oldCategory});

				} catch(e) {
					// statements
					console.log(e);
				}
				
			})	

itemsRouter.route('/changeItem')
			.post(async (req,res,next)=>{
				const {id,newName,newCategory} = req.body;
				console.log(id);
				try {
						const items = await readFile(itemsDbFile);
						const index = items.items.findIndex(item => item.id === id);
						items.items[index].name = newName;
						items.items[index].category =newCategory;
						await writeFile(itemsDbFile,items);
						res.render('index.ejs',items);				
					} 
				catch(e) {
					console.log(e);
				}
			});


module.exports ={ 
	itemsRouter
}