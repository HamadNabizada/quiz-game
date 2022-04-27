import React from 'react'
import Selection from './Selection'
import { nanoid } from 'nanoid'

export default function Questions(props){

    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }
    
    let possibleAnswers = [...props.incorrect, props.correct]
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
    return(
        <div className="questions-wrapper">
            <h1>{replaceWithSymbol(props.question)}</h1>
            <div className="selection-wrapper">
                {answersElement}
            </div>
            <div className="divider"></div>
        </div>
    )
}