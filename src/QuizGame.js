import React, {useState, useEffect} from 'react'
import TitleScreen from './TitleScreen'
import Questions from './Questions'
import { nanoid } from 'nanoid'
import CheckButton from './CheckButton'

export default function QuizGame(){
    let [onTitleScreen, setOnTitleScreen] = useState(true)
    let [quickGame, setQuickGame] = useState(false)
    let [questionsData, setQuestionsData] = useState([])
    let [Url, setUrl] = useState(`https://opentdb.com/api.php?amount=10`)
    let [UrlObject, setUrlObject] = useState({
        amount: '10',
        category: '',
        difficulty: '',
        type: ''
    })
    let [questionObjectArray, setQuestionObjectArray]=useState([{
        id:'',
        key:'',
        question:'',
        type:'',
        correct:'',
        possibleAnswers:[
            {
                selection:'',
                key:'',
                id:'',
                handleClick:'',
                correct:'',
                isSelected:'',
                isClickable:'',
                isWrong:'',
                questionID:''
            }
        ],
        isCorrectAnswer: ''
    }])
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
    function playQuickGame(){
        showGame()
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
    useEffect(()=>{
        console.log(Url);
        fetch(Url)
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
    }, [Url])
    useEffect(()=>{
        setQuestionObjectArray(questionsData.map(item=>{
            let id=nanoid()
            let possibleAnswers = findPossibleAnswers(item.correct_answer, item.incorrect_answers, id)
            return {
                id:id,
                key:id,
                question:replaceWithSymbol(item.question),
                type:item.type,
                possibleAnswers: possibleAnswers,
                correct:replaceWithSymbol(item.correct_answer),
                isCorrectAnswer: false
            }
        }))
    },[questionsData])

    function findPossibleAnswers(correct, incorrect, questionId){
        let allAnswers = [correct, ...incorrect]
        allAnswers.sort()
        if(allAnswers[0] === 'False'){
            allAnswers[0] = 'True'
            allAnswers[1] = 'False'
        }
        return allAnswers.map(item=>{
            let selectionId=nanoid()
            return {
                selection:replaceWithSymbol(item),
                key:selectionId,
                id:selectionId,
                handleClick:handleSelectionClick,
                correct:replaceWithSymbol(correct),
                isSelected:false,
                isClickable:true,
                isWrong:false,
                questionID:questionId
            }
        })
    }
    function handleSelectionClick(event){
        console.log(event.target.id)
    }


    function checkButtonClick(){
        console.log('CheckButtonClicked')    
    }
    console.log('Main component reloaded');
    function testButtton(){
        console.log(questionsData);
    }
    function testButtton2(){
        console.log(questionObjectArray);
    }
    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }

    let questionsElement = questionObjectArray.map(item=>{
        return <Questions {...item} />
    })
    return (
        <div className='background quiz-wrapper'>
            {onTitleScreen && <TitleScreen 
                handleChange={handleChange} 
                quickGame={playQuickGame}
                handleClick={createCustomizedGame}
                />}
            <button onClick={testButtton} >Log QuestonsData</button>
            <button onClick={testButtton2} >Log QuestonsobjArr</button>
            {(!onTitleScreen && quickGame) && questionsElement}
            {(!onTitleScreen && quickGame) && <CheckButton handleClick={checkButtonClick} />}
        </div>
    )
}
