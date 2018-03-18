import React,{Component,Fragment} from 'react';
import {categoriesScreens} from '../constants'
import {addScreen} from '../constants'
import {addCategory,editCategory} from '../../storage/categoryStorage';
import Form from '../form/Form'
import ErrorScreen from '../error/ErrorScreen'
import Success from '../success/Success'
import Warning from '../warning/Warning'

export default class CategoriesAddForm extends Component { 
    constructor(props){
        super(props);
        this.state = {
            activeForm: props.value.form,
            activeScreen:addScreen.ADD,
            editCategory:props.value.name,
            form:[
             {
                    name:'name',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name of Category:'
                    },
                    value:props.value.name ||'',
                    error:''
            }
            ],
        }
    }
    successAdd(){
        this.props.changeScreen(categoriesScreens.TABLE)
    }
    saveCategory(){
        const newCategory = {
            name:this.state.form[0].value,
        };
        if(this.state.activeForm === categoriesScreens.EDIT){
            console.log('')
            const oldCategory = {name:this.state.editCategory};
            editCategory(oldCategory,newCategory).then(isSuccess=>{

                isSuccess ? this.setState({activeScreen:addScreen.SUCCESS}) : this.setState({activeScreen:addScreen.ERROR})
            });
        }
        else{
            addCategory(newCategory).then(isSuccess=> { isSuccess ? this.setState({activeScreen:addScreen.SUCCESS}) : this.setState({activeScreen:addScreen.ERROR})});
        }
    }
    addHandler(event){
        event.preventDefault()
        const value= {
            name: this.state.form[0].value,
        }
        if(value.name !== ''){
            this.setState({activeScreen:addScreen.WARNINGS})
        };
    }
    cancelHandler(){
        this.props.changeScreen(categoriesScreens.TABLE);
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
        return this.state.activeForm === 'cadd' ? 'Category Add Form:' : 'Category Edit Form:' 
    }
    getWarninigMessage(){
        const editWarning = "Are you sure that you want to edit the category?"
        const addWarning = "Are you sure that you want to add the category?"

        return this.state.activeForm === 'cadd' ? addWarning : editWarning
    }
    getSuccessMessage(){
        const editWarning = "Category was successfully edit!"
        const addWarning = "Category was successfully added!"

        return this.state.activeForm === 'cadd' ? addWarning : editWarning
    }
    render(){
        console.log(this.state)
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
                return <Warning 
                            getTitle ={()=>this.getWarninigMessage()}
                            onYes={()=>this.saveCategory()}
                            onNo={()=>this.cancelHandler()}
                        />
            case addScreen.SUCCESS:
                return <Success 
                        successMessage = {()=>this.getSuccessMessage()}
                        successAdd = {()=>this.successAdd()}
                        text = 'Go to all Category'
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