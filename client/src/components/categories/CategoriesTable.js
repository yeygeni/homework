import React,{Component,Fragment} from 'react';
import Table from '../table/Table'
import {categoriesScreens,tableScreens} from '../constants'
import {loadCategories,removeCategory} from '../../storage/categoryStorage';
import ErrorScreen from '../error/ErrorScreen'
import Success from '../success/Success'
import Warning from '../warning/Warning'
import Spinner from '../spinner/Spinner'

export default class CategoriesTable extends Component{

	constructor(props){
		super(props);
		this.state = {
      activeScreen:tableScreens.TABLE,
      categories:[],
      removeCategory:'',
		}	
	}

  componentDidMount() {
       loadCategories().then(categories=>{
                this.setState({
                    categories
                })
       })
  }
   
  removeHandler(category){
    this.setState({activeScreen:tableScreens.WARNING,removeCategory:category})
  }

  removeCategoryByName(category){
      console.log('remove',category)
      removeCategory(category).then(({isSuccess,categories}) => {
        console.log(isSuccess,'isSuccess',tableScreens.ERROR,'Scre')
        isSuccess ? 
        this.setState({activeScreen:tableScreens.SUCCESS,categories,removeCategory:''}):
        this.setState({activeScreen:tableScreens.ERROR})
      })
  }
  successRemove(){
    this.setState({activeScreen:tableScreens.TABLE}) 
  }
	render(){
      console.log(this.state)
      switch (this.state.activeScreen) {
        case tableScreens.TABLE:
           if(this.state.categories.length === 0){
              return (
                <Fragment>  
                    <Spinner />
                    <button className='waves-effect waves-light btn' onClick={()=> this.props.changeScreen(categoriesScreens.ADD,{form:categoriesScreens.ADD})}>Add Category</button>
                </Fragment>) 
            }
            else{ return(
              <Fragment>
                <Table 
                  head = {['Category']}
                  body = {this.state.categories}
                  fields = {['name']}
                  changeScreen={(type,value) => this.props.changeScreen(type,value)}
                  removeHandler = { category =>this.removeHandler(category)}
                  screens = {categoriesScreens}

                />                
                <button className='waves-effect waves-light btn' onClick={()=> this.props.changeScreen(categoriesScreens.ADD,{form:categoriesScreens.ADD})}>Add Category</button>
              </Fragment>   
              )
             } 
        case tableScreens.WARNING:
              return <Warning 
                        getTitle ={()=>'Are you sure that you want to remove this category?'}
                        onYes={()=>this.removeCategoryByName(this.state.removeCategory)}
                        onNo={()=>this.setState({activeScreen:tableScreens.TABLE,})}
                     />
        case tableScreens.SUCCESS:
                return <Success 
                          successMessage = {()=>'Category was successfully remove'}
                          successAdd = {()=>this.successRemove()}
                          text = 'Go to all Category'
                        />
        case tableScreens.ERROR:
                return <ErrorScreen />                                     
        default:
          return <div>Error</div>
      }
    
	}
}