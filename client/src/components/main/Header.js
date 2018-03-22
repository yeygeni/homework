import React from 'react';
import {mainScreens} from '../constants'

export const Header = (props) =>{

	return(
		<React.Fragment>
			<nav >
				<button className="waves-effect waves-teal btn-flat" onClick={()=> props.changeScreen(mainScreens.HOME)}>Home</button>
				<button className="waves-effect waves-teal btn-flat"  onClick={()=> props.changeScreen(mainScreens.PRODUCTS)}>Products</button>
				<button className="waves-effect waves-teal btn-flat"  onClick={()=> props.changeScreen(mainScreens.CATEGORIES)}>Categories</button>
			</nav>
		</React.Fragment>
		)

}