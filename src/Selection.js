import React, {useState} from 'react'


export default function Selection(props){

    let myClassName=`selection ${props.isSelected && 'userSelected'}`
    

    return(
        <button 
        id={props.id}
        onClick={props.handleClick} 
        className={myClassName} >
            {props.answer}
        </button>
    )
}