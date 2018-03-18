import React,{Component,Fragment} from 'react';
import {productsScreens,categoriesScreens} from '../constants'
import ProductsTable from '../products/ProductsTable'
import ProductAddForm from '../products/ProductAddForm'
import CategoriesTable from '../categories/CategoriesTable'
import CategoriesAddForm from '../categories/CategoriesAddForm'
export default class SwitcherScreen extends Component { 
	
	constructor(props){
		super(props);
		this.state = {
			activeScreen: props.activeScreen,
            value:{}
		}
	}
  
    componentWillReceiveProps(nextProps) {
        this.setState({activeScreen: nextProps.activeScreen});
    }
	renderScreen(){
		let Component;
        switch (this.state.activeScreen) {
            case productsScreens.TABLE:
                Component =  ProductsTable;
                break;
            case productsScreens.ADD:
                Component =  ProductAddForm;
                break;
            case categoriesScreens.TABLE:
                Component =  CategoriesTable;
                break;
            case categoriesScreens.ADD:
                Component =  CategoriesAddForm;
                break;               
            default:
               return <div>Something went wrong</div>
        }
  		return <Component 
                    changeScreen= { (typeOfScreen,value) => this._changeScreen(typeOfScreen,value)} 
                    value={this.state.value} 
                />
    }
    
    _changeScreen(typeOfScreen,value){
        console.log('setState')
        this.setState({activeScreen:typeOfScreen,value})
    }

	render(){
		return(
			<Fragment>
				{this.renderScreen()}
			</Fragment>
			)
}
}