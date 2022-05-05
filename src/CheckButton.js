import React from 'react'

export default function CheckButton(props){

    return (
        <div className="check-wrapper">
            {!props.isGameOngoing && <p className="message" >You guessed {} answers correctly</p>}
            <button onClick={props.handleClick} className="checkBtn" >Check Answers</button>
        </div>
    )
}