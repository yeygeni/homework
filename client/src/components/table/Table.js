import React from 'react';

const Table = props => {  
	return(
		<table className="striped">
          <thead>
          <tr>
          	{props.head.map(item=>{
				      return <th key={item}>{item}</th>
          	})}
          </tr>
          </thead>
          <tbody>
          {props.body.map(item =>{
                  return (
                    <tr key={item.id || item.name}>
                      {props.fields.map(field => <th key={field}>{item[field]}</th>)}
                      <th>
                          <button style={{ margin: '0 10px' }} className='waves-effect waves-light btn' onClick={()=> 
                                      props.changeScreen(props.screens.ADD,
                                        {id:item.id,name:item.name,category:item.category,form:props.screens.EDIT})}>Edit</button>
                          <button  style={{ margin: '0 10px' }} className='waves-effect waves-light btn' onClick={()=> 
                                      props.removeHandler(item.id || item.name)}>Remove</button>
                      </th>
                    </tr>
                  )
                })
          }
            </tbody>
        </table>	

		)
}
export default Table;