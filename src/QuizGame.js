import React, {useState, useEffect} from 'react'
import GameScreen from './GameScreen'
import TitleScreen from './TitleScreen'

export default function QuizGame(){
    let [onTitleScreen, setOnTitleScreen] = useState(true)

    return (
        <div className='background quiz-wrapper'>
            {onTitleScreen && <TitleScreen />}
        </div>
    )
}