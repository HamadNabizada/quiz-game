import React from 'react'
import Selection from './Selection'
import { nanoid } from 'nanoid'

export default function Questions(props){

    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }
    let shuffledElements=[]
    let possibleAnswers = [...props.incorrect, props.correct]
    console.log(possibleAnswers);
    possibleAnswers.sort()
    if(possibleAnswers[0] === 'False'){
        possibleAnswers[0] = 'True'
        possibleAnswers[1] = 'False'
    }
    console.log(possibleAnswers);
    let answersElement = possibleAnswers.map(answer => {
        let id = nanoid()
        return (
        <Selection 
            key={id}
            id= {id}
            correct={replaceWithSymbol(props.correct)}
            answer={replaceWithSymbol(answer)}
        />)
    });
    function sayAnswer(){
        console.log(props.correct);
    }

    return(
        <div onClick={sayAnswer} className="questions-wrapper">
            <h1>{replaceWithSymbol(props.question)}</h1>
            <div className="selection-wrapper">
                {answersElement}
            </div>
            <div className="divider"></div>
        </div>
    )
}