import React, {useState, useEffect} from 'react'
import TitleScreen from './TitleScreen'
import Questions from './Questions'
import { nanoid } from 'nanoid'

export default function QuizGame(){
    let [onTitleScreen, setOnTitleScreen] = useState(true)
    let [quickGame, setQuickGame] = useState(false)
    let [questionsData, setQuestionsData] = useState([])
    let [Url, setUrl] = useState(`https://opentdb.com/api.php?amount=10`)
    let [questionsElement, setQuestionsElement] = useState([])


    function showGame(){
        setOnTitleScreen(prevOnTitleScreen => !prevOnTitleScreen)
        setQuickGame(true)
    }

  
    function playQuickGame(){
        console.log('Quick Game Started');
        let questionsArray = createQuestionsArray(questionsData)
        console.log(questionsArray);
        setQuestionsElement(questionsArray.map( item =>{
            return (
            <Questions 
                key={item.id}
                id={item.id}
                type={item.type}
                question={item.question}
                incorrect={item.incorrect}
                correct={item.correct}
            />)
        }))
        showGame()
    }
    function createQuestionsArray(array){
        let myQuestionsArray = array.map((item)=>{
            return {
                id: nanoid(),
                type: item.type,
                question: item.question,
                incorrect: item.incorrect_answers,
                correct: item.correct_answer
            }
        })
        return myQuestionsArray
    }

    useEffect(()=>{
        fetch(Url)
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
    }, [Url])


    console.log('Main component reloaded');

    return (
        <div className='background quiz-wrapper'>
            {onTitleScreen && <TitleScreen quickGame={playQuickGame}/>}
            {(!onTitleScreen && quickGame) && questionsElement}
        </div>
    )
}