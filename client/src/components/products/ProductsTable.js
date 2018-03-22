import React,{Component,Fragment} from 'react';
import Table from '../table/Table'
import {productsScreens,tableScreens} from '../constants'
import {loadItems, removeItem} from '../../storage/itemsStorage';
import ErrorScreen from '../error/ErrorScreen'
import Success from '../success/Success'
import Warning from '../warning/Warning'
import Spinner from '../spinner/Spinner'

export default class ProductsTable extends Component{

	constructor(props){
		super(props);
		this.state = {
      activeScreen:tableScreens.TABLE,
			products:[],
      removeProductId:'',
		}	
	}

  componentDidMount() {
        loadItems().then(products => {
                this.setState({
                    products,
                })
            })
      
  } 


  removeHandler(productId){
    this.setState({activeScreen:tableScreens.WARNING,removeProductId:productId})
  }
  removeProduct(productId){
      removeItem(productId).then(({isSuccess,products}) => {
        console.log(isSuccess,'isSuccess',tableScreens.ERROR,'Scre')
        isSuccess ? 
        this.setState({activeScreen:tableScreens.SUCCESS,products,removeProductId:''}):
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
            if(this.state.products.length === 0){
              return (
                <Fragment>  
                    <Spinner />
                    <button className='waves-effect waves-light btn' onClick={()=> this.props.changeScreen(productsScreens.ADD,{form:productsScreens.ADD})}>Add Product</button>
                </Fragment>) 
            }
            else{return(
              <Fragment>
                <Table 
                  head = {['Name','Category']}
                  body = {this.state.products}
                  fields = {['name','category']}
                  changeScreen={(type,value) => this.props.changeScreen(type,value)}
                  removeHandler = { productId =>this.removeHandler(productId)}
                  screens = {productsScreens}
                />                
                <button className='waves-effect waves-light btn' onClick={()=> this.props.changeScreen(productsScreens.ADD,{form:productsScreens.ADD})}>Add Product</button>
              </Fragment>   
              )}
        case tableScreens.WARNING:
              return <Warning 
                        getTitle ={()=>'Are you sure that you want to remove this product?'}
                        onYes={()=>this.removeProduct(this.state.removeProductId)}
                        onNo={()=>this.setState({activeScreen:tableScreens.TABLE,})}
                     />
        case tableScreens.SUCCESS:
                return <Success 
                          successMessage = {()=>'Product was successfully remove'}
                          successAdd = {()=>this.successRemove()}
                          text = 'Go to all products'
                        />      
        case tableScreens.ERROR:
                return <ErrorScreen />                    
        default:
          return <div>Error</div>
      }
    
	}
}