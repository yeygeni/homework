import React,{Fragment} from 'react';

const Warning = props => {
				return(
                  <Fragment>
                    <div>{props.getTitle()}</div>
                        <button style={{ color: 'green'}}
             	         		className='waves-effect waves-light btn'
								onClick = {() => props.onYes()}>Yes</button>
                        <button style={{ color: 'red'}}
                        		className='waves-effect waves-light btn'
                          		onClick = {() => props.onNo()} >No</button>
                  </Fragment>
                )
}
export default Warning;