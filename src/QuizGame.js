import React, {useState, useEffect} from 'react'
import TitleScreen from './TitleScreen'
import Questions from './Questions'
import { nanoid } from 'nanoid'
import CheckButton from './CheckButton'

export default function QuizGame(){
    let [onTitleScreen, setOnTitleScreen] = useState(true)
    let [quickGame, setQuickGame] = useState(false)
    let [isGameOngoing, setIsGameOngoing] = useState(false)
    let [questionsData, setQuestionsData] = useState([])
    let [amountCorrect, setAmountCorrect] = useState(0)
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
        setIsGameOngoing(true)
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
                isCorrect:false,
                questionID:questionId
            }
        })
    }
    function handleSelectionClick(event){
        let targetId = event.target.id
        let targetQuestion = event.target.dataset.questionId
        setQuestionObjectArray(prevArray=>{
            return prevArray.map(item=>{
                let updatedAnswers = item.possibleAnswers.map(answer=>{
                    if(answer.questionID === targetQuestion){
                        if(answer.id === targetId){
                            return{
                                ...answer,
                                isSelected:true,
                                isClickable:true
                            }
                        }else{
                            return {
                                ...answer,
                                isClickable:false,
                                isSelected:false
                            }
                        }
                    }else{
                        return answer
                    }
                })
                return {
                    ...item,
                    possibleAnswers: updatedAnswers
                }
            })
        })
    }

    function checkAllAnswers(){
        setQuestionObjectArray( prevArray =>{
            return prevArray.map(item =>{
                let answersArray = item.possibleAnswers
                let chosenAnswer
                let updatedAnswers
                answersArray.forEach(answer =>{
                    if(answer.isSelected===true){
                        chosenAnswer=answer.selection
                    }
                })
                updatedAnswers = answersArray.map(answer=>{
                    if(answer.selection === answer.correct){
                        return {
                            ...answer,
                            isCorrect:true
                        }
                    }else{
                        if(chosenAnswer === answer.selection){
                            return {
                                ...answer,
                                isWrong:true
                            }
                        }else{
                            return answer
                        }
                    }
                })
                if(chosenAnswer === item.correct){
                    return {
                        ...item,
                        possibleAnswers: updatedAnswers,
                        isCorrectAnswer:true
                    }
                }else{
                    return {
                        ...item,
                        possibleAnswers: updatedAnswers
                    }
                }
                
            })
        })
    }
    function checkButtonClick(){
        setIsGameOngoing(false)
        checkAllAnswers()
    }

    function replaceWithSymbol(question){
        let finalQuestion = question.replaceAll('&quot;', '"')
        finalQuestion = finalQuestion.replaceAll('&#039;', "'")
        return finalQuestion
    }
    function reloadQuiz(){
        window.location.reload()
    }
    let questionsElement = questionObjectArray.map(item=>{
        return <Questions isGameOngoing={isGameOngoing} {...item} />
    })
    useEffect(()=>{
        setAmountCorrect(prevCorrect=>{
            let counter=0
            for (let i = 0; i < questionObjectArray.length; i++) {
                const question = questionObjectArray[i];
                if(question.isCorrectAnswer === true){
                    counter=counter +1
                }
            }
            return counter
        })
    },[questionObjectArray])
    return (
        <div className='background quiz-wrapper'>
            {onTitleScreen && <TitleScreen 
                handleChange={handleChange} 
                quickGame={playQuickGame}
                handleClick={createCustomizedGame}
                />}
            {(!onTitleScreen && quickGame) && questionsElement}
            {(!onTitleScreen && quickGame) && <CheckButton 
                amountCorrect = {amountCorrect}
                questionArray = {questionObjectArray}
                reloadQuiz = {reloadQuiz}
                allQuestions = {questionObjectArray}
                isGameOngoing = {isGameOngoing}
                handleClick={checkButtonClick} 
                />}
        </div>
    )
}
