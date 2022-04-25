import React from 'react'

export default function TitleScreen(props){

    return(
        <div className="title-wrapper">
            <h1>Quiz Game</h1>
            <p>Please select one:</p>
            <button onClick={props.quickGame}>Quick Game</button>
        </div>


        //chosee between quick quiz or apply settings
            //quick quiz           
            //quiz with settings
            //code here
    )
}