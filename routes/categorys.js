const express = require("express");
const categorysRouter = express.Router();
const path = require('path');

const {readFile} = require('../db/index');
const {writeFile} = require('../db/index');

const categoryDbFile = path.resolve(__dirname,'../db/category.json');
const itemsDbFile = path.resolve(__dirname,'../db/items.json');

categorysRouter.route('/deleteCategory')
					.post(async(req,res)=>{
						const {category} =req.body;
						try {
							const oldCategorys = await readFile(categoryDbFile);
							const oldItems = await readFile(itemsDbFile);

							const categorys = { 
								categorys: oldCategorys.categorys.filter(item => item !== category )
							}

							const items = {
								items: oldItems.items.map(item => {
									if(item.category === category){
										item.category = 'other';
										return item;
									}
									else{
										return item;
									}
								})
							}
							await writeFile(categoryDbFile,categorys);
							await writeFile(itemsDbFile,items);

							res.render('addCategory.ejs',categorys)
						} catch(e) {
							res.render('error.ejs');
						}	
					});
categorysRouter.route('/changeCategoryName')
				.post((req,res,next) => {
					const {oldCategory} = req.body;
					res.render('changeCategory.ejs',{oldCategory})
				});
categorysRouter.route('/changeCategory')
				.post(async (req,res,next)=>{
					try {
						const {newCategory,oldCategory} = req.body;
						const сategorys = await readFile(categoryDbFile);
						const index = сategorys.categorys.findIndex(category => category === oldCategory);
						сategorys.categorys[index] = newCategory;
						await writeFile(categoryDbFile,сategorys);
						const oldItems = await readFile(itemsDbFile);
						const items = {
								items: oldItems.items.map(item => {
									if(item.category === oldCategory){
										item.category = newCategory;
										return item;
									}
									else{
										return item;
									}
								})
							}
						await writeFile(itemsDbFile,items);
	
						res.render('category.ejs',сategorys)
					} catch(e) {
						res.render('error.ejs');

					}
				})

categorysRouter.route("/")
            .get(async (req, res)=>{
            	const categorys = await readFile(categoryDbFile);            	
				res.render('category.ejs',categorys);

            });
categorysRouter.route('/addCategory')
		.get(async (req,res) => {
			try {
				const categorys = await readFile(categoryDbFile);
				res.render('addCategory.ejs',categorys);
			} catch(e) {
				res.render('error.ejs');
			}
			
		})
		.post(async (req,res,next) => {
			const { category } = req.body;
			try {
				const categorys = await readFile(categoryDbFile);
				categorys.categorys.push(category);
				await writeFile(categoryDbFile,categorys);
				console.log(categorys);
				res.render('category.ejs',categorys)
			} catch(e) {
				res.render('error.ejs');
			}
			
		});

module.exports ={ 
	categorysRouter
}