import React, {useState} from 'react'


export default function Selection(props){
    let myClassName=`selection ${props.isClickable ? '':'currentSelection'} ${props.isSelected ? 'userSelected': ''}`
    return(
        <button 
        id={props.id}
        data-question-id={props.questionID}
        onClick={props.handleClick}
        className={myClassName} >
            {props.selection}
        </button>
    )
}