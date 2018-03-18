import React,{Fragment} from 'react';

const Success = props => {
			console.log('props',props)
           return(
                <Fragment>
                    <div>{props.successMessage()}</div>
                        <button style={{ color: 'green'}} 
                        		className='waves-effect waves-light btn'
                            	onClick = {() => props.successAdd()}>{props.text}</button>
                </Fragment>
                )
}
export default Success;