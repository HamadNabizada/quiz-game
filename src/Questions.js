import React from 'react'
import Selection from './Selection'

export default function Questions(props){

    function testClick(){
        console.log(props.id);
    }
    return(
        <div onClick={testClick} className="questions-wrapper">
            <h1>{props.question}</h1>
            <div className="selection-wrapper">
                <Selection/>
                <Selection/>
                <Selection/>
            </div>
            <div className="divider"></div>
        </div>
    )
}