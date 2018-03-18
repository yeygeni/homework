import React from 'react'

const Input = props  => {
    let inputElement = null;
    switch ( props.type ) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className="browser-default"
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(value => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            );
            console.log('inputElement',inputElement)
            break;
        default:
            inputElement = <input
                className={props.className}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div >
            <label>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default Input;