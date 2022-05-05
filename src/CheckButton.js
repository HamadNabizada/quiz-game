import React from 'react'

export default function CheckButton(props){

    let playAgain = (
    <div className='playAgain'>
        <p className="message" >You guessed {props.amountCorrect}/{props.questionArray.length} answers correctly</p>
        <button onClick={props.reloadQuiz}>Play Again?</button>
    </div>
    )
    return (
        <div className="check-wrapper">
            {!props.isGameOngoing && playAgain}
            {props.isGameOngoing && <button onClick={props.handleClick} className="checkBtn" >Check Answers</button>}
        </div>
    )
}