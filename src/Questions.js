import React, {useState, useEffect} from 'react'
import Selection from './Selection'


export default function Questions(props){
    let selectionElement = props.possibleAnswers.map(item =>{
        return <Selection isGameOngoing={props.isGameOngoing} {...item} />
    })
    return(
        <div className="questions-wrapper">
            <h1>{props.question}</h1>
            <div className="selection-wrapper">
                {selectionElement}
            </div>
            <div className="divider"></div>
        </div>
    )
}