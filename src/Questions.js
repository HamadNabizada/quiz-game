import React, {useState, useEffect} from 'react'
import Selection from './Selection'
import { nanoid } from 'nanoid'

export default function Questions(props){
    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }
    function selectChoice(event){
        console.log(event.target.id);
    }

    let possibleAnswers = [...props.incorrect, props.correct]

    possibleAnswers.sort()
    if(possibleAnswers[0] === 'False'){
        possibleAnswers[0] = 'True'
        possibleAnswers[1] = 'False'
    }
    let [answersElement, setAnswersElement] = useState([])
    useEffect(() =>{
        setAnswersElement(possibleAnswers.map(answer => {
                let id = nanoid()
                return (
                <Selection 
                    key={id}
                    id= {id}
                    // isSelected=
                    handleClick={selectChoice}
                    correct={replaceWithSymbol(props.correct)}
                    answer={replaceWithSymbol(answer)}
                />)
        }))
    },[])

    function sayAnswer(){
        // console.log(props.correct);
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