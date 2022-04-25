import React, {useState, useEffect} from 'react'
import GameScreen from './GameScreen'
import TitleScreen from './TitleScreen'
import Questions from './Questions'


export default function QuizGame(){
    let [onTitleScreen, setOnTitleScreen] = useState(true)
    let [quickGame, setQuickGame] = useState(false)
    let [questionsData, setQuestionsData] = useState([])
    let questionsElements;
    let [Url, setUrl] = useState(`https://opentdb.com/api.php?amount=10`)

    function showGame(){
        setOnTitleScreen(prevOnTitleScreen => !prevOnTitleScreen)
        setQuickGame(true)
    }

  
    function playQuickGame(){
        console.log('Quick Game Started');
        let myQuestionsArray = questionsData.map((item)=>{
            return {
                type: item.type,
                question: item.question,
                incorrect: item.incorrect_answers,
                correct: item.correct_answer
            }
        })
        showGame()
        return myQuestionsArray
    }

    useEffect(()=>{
        fetch(Url)
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
    }, [Url])
    
/*
    //renderQuestions()
        //call api
            //set api results as my db
        //organize the data
            //code to organize here
        //create elements for my questions
        //playquickgame()
*/

    console.log('Main component reloaded');

    return (
        <div className='background quiz-wrapper'>
            {onTitleScreen && <TitleScreen quickGame={playQuickGame}/>}
            {(!onTitleScreen && quickGame) && <Questions/>}
        </div>
    )
}