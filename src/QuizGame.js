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
    let [UrlObject, setUrlObject] = useState({
        amount: '10',
        category: '',
        difficulty: '',
        type: ''
    })
    function UrlValuesToURL(){
        console.log(UrlObject);
    }
    function showGame(){
        setOnTitleScreen(prevOnTitleScreen => !prevOnTitleScreen)
        setQuickGame(true)
    }
    function handleChange(event){
        setUrlObject(prevUrlObject =>{
            return {
                ...prevUrlObject,
                [event.target.name]:event.target.value
            }
        })
    }
    function setCorrectAmount(amount){
        if(amount>50){
            return '50'
        }
        if(amount<1){
            return '1'
        }
        else{
            return amount
        }
    }
    function createCustomizedGame(){
        //updateURL
        let UrlString = 'https://opentdb.com/api.php?'
        let UrlAmount = setCorrectAmount(UrlObject.amount)
        let UrlStringAmount = `${UrlString}${UrlAmount}`
        let UrlCategory = UrlObject.category && `&category=${UrlObject.category}`
        let UrlDifficulty = UrlObject.difficulty && `&difficulty=${UrlObject.difficulty}`
        let UrlType = UrlObject.type && `&type=${UrlObject.type}`
        let totalUrl = UrlStringAmount + UrlCategory + UrlDifficulty + UrlType
        console.log(totalUrl)
        
        // playQuickGame()
        //^^^ uncomment to play the game
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
            {onTitleScreen && <TitleScreen 
                handleChange={handleChange} 
                Url={UrlValuesToURL} 
                quickGame={playQuickGame}
                />}
            {(!onTitleScreen && quickGame) && questionsElement}
            <button onClick={createCustomizedGame} >TEST</button>
        </div>
    )
}