import React, {useState, useEffect} from 'react'
import TitleScreen from './TitleScreen'
import Questions from './Questions'
import { nanoid } from 'nanoid'
import CheckButton from './CheckButton'

export default function QuizGame(){
    let [onTitleScreen, setOnTitleScreen] = useState(true)
    let [quickGame, setQuickGame] = useState(false)
    let [questionsData, setQuestionsData] = useState([])
    let isCorrectAnswer=[]
    let [Url, setUrl] = useState(`https://opentdb.com/api.php?amount=10`)
    let [UrlObject, setUrlObject] = useState({
        amount: '10',
        category: '',
        difficulty: '',
        type: ''
    })
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
        let UrlString = 'https://opentdb.com/api.php?'
        let UrlAmount = `amount=${setCorrectAmount(UrlObject.amount)}`
        let UrlStringAmount = `${UrlString}${UrlAmount}`
        let UrlCategory = UrlObject.category && `&category=${UrlObject.category}`
        let UrlDifficulty = UrlObject.difficulty && `&difficulty=${UrlObject.difficulty}`
        let UrlType = UrlObject.type && `&type=${UrlObject.type}`
        let totalUrl = UrlStringAmount + UrlCategory + UrlDifficulty + UrlType
        setUrl(totalUrl)
        showGame()
    }
    let currentQuestionsArray = createQuestionsArray(questionsData)
    isCorrectAnswer = currentQuestionsArray.map(item=>{
        return {
            isCorrectAnswer: false
        }
    })
    let questionsElement = currentQuestionsArray.map( (item,index) =>{
        return (
            <Questions 
                key={item.id}
                id={item.id}
                type={item.type}
                question={item.question}
                incorrect={item.incorrect}
                correct={item.correct}
                isCorrectAnswer={isCorrectAnswer[index]}
            />
        )
    })

    function playQuickGame(){
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

    function checkButtonClick(){
        console.log('CheckButtonClicked')
    }
    console.log('Main component reloaded');

    return (
        <div className='background quiz-wrapper'>
            {onTitleScreen && <TitleScreen 
                handleChange={handleChange} 
                quickGame={playQuickGame}
                handleClick={createCustomizedGame}
                />}
            {(!onTitleScreen && quickGame) && questionsElement}
            {(!onTitleScreen && quickGame) && <CheckButton handleClick={checkButtonClick} />}
        </div>
    )
}

//button is clicked
//is the selection.value === correct? 