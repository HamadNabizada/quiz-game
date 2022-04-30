import React from 'react'

export default function CheckButton(props){

    return (
        <div className="check-wrapper">
            <p className="message" >You guessed 15 answers correctly</p>
            <button onClick={props.handleClick} className="checkBtn" >Check Answers</button>
        </div>
    )
}