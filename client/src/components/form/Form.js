import React from 'react';
import Input from '../input/Input'

const Form = props => {
	return(
				<form >
					{props.form.map((input,index)=>{
						return(
							<div key={index}>
								<Input
									type = {input.elementType}
									elementConfig = {input.elementConfig} 
									value = {input.value}
									changed = {(event) => 
											props.inputChangedHandler(event,index)}
								/>
								<p style={{color:'red'}}>{props.form[index].error}</p>
							</div>
							)
						})}
				  		<button className='waves-effect waves-light btn'
				  		 style={{ color: 'green',margin: '0 10px'}} onClick = {event=>props.addHandler(event)}>Save</button>
				  		<button className='waves-effect waves-light btn' 
				  		style={{ color: 'red',margin: '0 10px'}} onClick = {()=> props.cancelHandler()} >Cancel</button>
					</form>			

		)
}
export default Form;