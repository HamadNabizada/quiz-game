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
    let [AnswersArray, setAnswersArray] = useState(createAnswerArray(possibleAnswers))
    let selectionElement = AnswersArray.map(item =>{
        return <Selection
         key={item.id} 
         id={item.id}
         name={item.name}
         handleClick={handleClick} 
         correct = {item.correct}  
         isSelected={item.isSelected}
         isClickable={item.isClickable}
         />
    })
    function createAnswerArray(array){
        let answerArr = possibleAnswers.map(item=>{
            return { 
                name: item,
                id:nanoid(),
                isSelected:false,
                isClickable:true,
                isWrong:false,
                correct:correct
            }
        })
        return answerArr
    }
    // let [questionObject, setQuestionObject] = useState({
    //     id: props.id,
    //     type: props.type,
    //     question: question,
    //     incorrect: incorrect,
    //     correct: correct,
    //     isSelected:false,
    //     selections: possibleAnswers
    // })
    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }
    function handleClick(event){
        console.log(event.target.id)
        let clickedID = event.target.id
        setAnswersArray(prevAnswersArray =>{
            return prevAnswersArray.map(item =>{
                if(item.id === clickedID){
                    return{
                        ...item,
                        isSelected: true,
                        isClickable: true
                        
                    }
                }else{
                    return {
                        ...item,
                        isClickable: false,
                        isSelected:false
                    }
                }
            })
        })
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
