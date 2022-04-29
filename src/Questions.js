import React, {useState, useEffect} from 'react'
import Selection from './Selection'
import { nanoid } from 'nanoid'

export default function Questions(props){

    let question = replaceWithSymbol(props.question)
    let incorrect = props.incorrect.map(item=>{
        return replaceWithSymbol(item)
    })
    let correct = replaceWithSymbol(props.correct)
    let possibleAnswers = [correct,...incorrect]
    possibleAnswers.sort()
    if(possibleAnswers[0] === 'False'){
        possibleAnswers[0] = 'True'
        possibleAnswers[1] = 'False'
    }
    let selectionElement = possibleAnswers.map(item =>{
        let id=nanoid()
        return <Selection key={id} handleClick={handleClick} correct = {correct} id={id} selection={item}/>
    })
    let [questionObject, setQuestionObject] = useState({
        id: props.id,
        type: props.type,
        question: question,
        incorrect: incorrect,
        correct: correct
    })
    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }
    function handleClick(event){
        // console.log(event.target.id);
    }
    function sayAnswer(){
        // console.log(questionObject);
    }
    return(
        <div onClick={sayAnswer} className="questions-wrapper">
            <h1>{replaceWithSymbol(props.question)}</h1>
            <div className="selection-wrapper">
                {selectionElement}
            </div>
            <div className="divider"></div>
        </div>
    )
}

// function selectChoice(event){
//     console.log(event.target.id);
// }

// let possibleAnswers = [...props.incorrect, props.correct]

// possibleAnswers.sort()
// if(possibleAnswers[0] === 'False'){
//     possibleAnswers[0] = 'True'
//     possibleAnswers[1] = 'False'
// }
// let [answersElement, setAnswersElement] = useState([])
// useEffect(() =>{
//     setAnswersElement(possibleAnswers.map(answer => {
//             let id = nanoid()
//             let isSelected=false
//             return (
//             <Selection 
//                 key={id}
//                 id= {id}
//                 isSelected={isSelected}
//                 handleClick={selectChoice}
//                 correct={replaceWithSymbol(props.correct)}
//                 answer={replaceWithSymbol(answer)}
//             />)
//     }))
// },[])
