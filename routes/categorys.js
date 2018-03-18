const express = require("express");
const categorysRouter = express.Router();
const path = require('path');

const {readFile} = require('../db/index');
const {writeFile} = require('../db/index');

const categoryDbFile = path.resolve(__dirname,'../db/category.json');
const itemsDbFile = path.resolve(__dirname,'../db/items.json');

categorysRouter.route('/deleteCategory')
					.post(async(req,res,next)=>{
						const {removeCategory} =req.body;
						if(!removeCategory){
							res.status(400).json({error:"Value can't be empty"});
						}
						try {
							const categories = await readFile(categoryDbFile);
							const oldItems = await readFile(itemsDbFile);
						    const categoryIndex = categories.findIndex(category => category.name === removeCategory);
	   						console.log('categoryIndex',categoryIndex)
	   						if (categoryIndex > -1) {
	   							console.log('eeeeeeee',oldItems)
	        					const items = oldItems.map(item => {
		                            if(item.category === removeCategory){
		                            	console.log('here')
		                                item.category = 'other';
		                                return item;
		                            }
		                            else{
		                                return item;
		                                }
	                            })
								await writeFile(itemsDbFile,items);
						        categories.splice(categoryIndex, 1);
						    }
							await writeFile(categoryDbFile,categories);
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
						console.log('das',newCategory)
						const categories = await readFile(categoryDbFile);
						const category = categories.find(category => category.name === oldCategory.name);
    					Object.assign(category, newCategory);
						await writeFile(categoryDbFile,categories);
						const oldItems = await readFile(itemsDbFile);
						const items = oldItems.map(item => {
                            if(item.category === oldCategory.name){
                                item.category = newCategory.name;
                                return item;
                            }
                            else{
                                return item;
                                }
                            });
						await writeFile(itemsDbFile,items);
	
						res.sendStatus(200)
					} catch(e) {
						res.status(500).json({error:e});
					}
				})
categorysRouter.route("/")
            .get(async (req, res)=>{
            	const categorys = await readFile(categoryDbFile);            	
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
					const categorys = await readFile(categoryDbFile);
					categorys.push(category);
					await writeFile(categoryDbFile,categorys);
					console.log('add')
					res.sendStatus(201)
				} catch(e) {
					res.status(500).json({error:e});
				}
			}
		});

module.exports ={ 
	categorysRouter
}