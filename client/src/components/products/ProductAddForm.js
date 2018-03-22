import React,{Component,Fragment} from 'react';
import Form from '../form/Form'
import {productsScreens} from '../constants'
import {addScreen} from '../constants'
import {addItem,editItem} from '../../storage/itemsStorage';
import {loadCategoriesName} from '../../storage/categoryStorage';
import ErrorScreen from '../error/ErrorScreen'
import Success from '../success/Success'
import Warning from '../warning/Warning'

export default class ProductAddForm extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			activeForm: props.value.form,
			activeScreen:addScreen.ADD,
			editProductId: props.value.id || '',
			form:[
			 {
			 		name:'name',
			 		elementType: 'input',
                	elementConfig: {
	                    type: 'text',
	                    placeholder: 'Name of Product:'
	                },
	                value:props.value.name ||'',
	                error:''
            },
             {
             		category:'category',
	                elementType: 'select',
	                elementConfig: {
	                    options: []
	                },
	                value: props.value.category || 'other',
            }
			],
		}
	}
	componentDidMount() {
        loadCategoriesName().then(categories=>{
        	const newForm = [...this.state.form]
        	newForm[1].elementConfig.options = categories;
            this.setState({             
                form:newForm
            })
       })
  	}
  	successAdd(){
		this.props.changeScreen(productsScreens.TABLE);
    } 
	saveProduct(){
		const newProduct = {
			name:this.state.form[0].value,
			category:this.state.form[1].value
		};
		if(this.state.activeForm === productsScreens.EDIT){
            editItem(this.state.editProductId,newProduct).then(isSuccess=>{
                isSuccess ? this.setState({activeScreen:addScreen.SUCCESS}) : this.setState({activeScreen:addScreen.ERROR})
            });
        }
        else{
            addItem(newProduct).then(isSuccess=> { isSuccess ? this.setState({activeScreen:addScreen.SUCCESS}) : this.setState({activeScreen:addScreen.ERROR})});
        }
	}
	addHandler(event){
		event.preventDefault()
		const value= {
			name: this.state.form[0].value,
			category:this.state.form[1].value
		}
		if(value.name !== ''){
			this.setState({activeScreen:addScreen.WARNINGS})
		};
	}
	cancelHandler(){
		this.props.changeScreen(productsScreens.TABLE);
	}

	checkValidation(name,index){
        let error = '';
        if(name === ''){
            error ="Name can't be empty";
        }
        if(error !== this.state.form[index].error){
            return error;
        }
        return error; 

       }

	inputChangedHandler(event,index){
		const newAddForm = [...this.state.form]
		newAddForm[index].value = event.target.value;
		newAddForm[index].error = this.checkValidation(newAddForm[index].value,index);		
		this.setState({form:newAddForm});
	}
	getTitlefromState(){
		return this.state.activeForm === 'add' ? 'Product Add Form:' : 'Product Edit Form:' 
	}
	getWarninigMessage(){
		const editWarning = "Are you sure that you want to edit the product?"
		const addWarning = "Are you sure that you want to add the product?"

		return this.state.activeForm === 'add' ? addWarning : editWarning
	}
	getSuccessMessage(){
        const editWarning = "Product was successfully edit!"
        const addWarning = "Product was successfully added!"

        return this.state.activeForm === 'add' ? addWarning : editWarning
    }
	render(){
		switch (this.state.activeScreen) {
			case addScreen.ADD:
				return(
				<Fragment>
					<div>{this.getTitlefromState()}</div>
					<Form 
						form = {this.state.form}
						addHandler={event =>this.addHandler(event)}
						cancelHandler={()=> this.cancelHandler()}
						inputChangedHandler={(event,index)=>this.inputChangedHandler(event,index)}
					/>
				</Fragment>
				)
			case addScreen.WARNINGS:
				return  <Warning 
                            getTitle ={()=>this.getWarninigMessage()}
                            onYes={()=>this.saveProduct()}
                            onNo={()=>this.cancelHandler()}
                        />
	 		case addScreen.SUCCESS:
                return <Success 
	                        successMessage = {()=>this.getSuccessMessage()}
	                        successAdd = {()=>this.successAdd()}
	                        text = 'Go to all products'
                    	/>
            case addScreen.ERROR:
                return <ErrorScreen />   			
			default:
				return(
					<div>Error</div>
					)
		}
	}	
}