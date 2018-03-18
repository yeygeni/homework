import React,{Component,Fragment} from 'react';
import {Header} from './Header';
import SwitcherScreen from './SwitcherScreen';  
import {Home} from '../Home';
import {mainScreens,productsScreens,categoriesScreens} from '../constants';

class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            activeScreen:mainScreens.HOME,
        }
    }
    
    renderScreen(){
        switch (this.state.activeScreen) {
            case mainScreens.HOME:
            console.log('home',this.state)

                return <Home />
            case mainScreens.PRODUCTS:
                console.log('product',this.state)
                return <SwitcherScreen 
                            activeScreen={productsScreens.TABLE}
                        />
            case mainScreens.CATEGORIES:
                console.log('category',this.state)
                return <SwitcherScreen 
                            activeScreen={categoriesScreens.TABLE} 
                        />        
            default:
               return <div>Something went wrong</div>
        }
    }
    
    _changeScreen(typeOfScreen){
        console.log('setState313')

        this.setState({activeScreen:typeOfScreen})
    }
    render(){

        return (
            <Fragment>
                <Header changeScreen={typeOfScreen => this._changeScreen(typeOfScreen)} />
                {this.renderScreen()}
            </Fragment>

            ) 


    }
}

export default Menu;

   
