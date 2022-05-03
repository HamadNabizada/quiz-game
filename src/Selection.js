import React, {useState} from 'react'


export default function Selection(props){
    let myClassName=`selection `

    return(
        <button 
        className={myClassName} >
            {props.selection}
        </button>
    )
}