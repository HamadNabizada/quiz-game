import React, {useState} from 'react'


export default function Selection(props){
    let myClassName=`selection ${props.isClickable ? '':'disabled'} ${props.isSelected ? 'userSelected': ''}`

    return(
        <button 
        data-questionid={props.questionID}
        id={props.id}
        onClick={props.handleClick} 
        className={myClassName} >
            {props.name}
        </button>
    )
}