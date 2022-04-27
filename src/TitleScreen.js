import React from 'react'

export default function TitleScreen(props){

    return(
        <div className="title-wrapper">
            <h1>Quiz Game</h1>
            <p>Please select one:</p>
            <button onClick={props.quickGame}>Quick Game</button>
            <form className="form">
                <button className="customBtn">Custom Quiz</button>
                <div className="settings">
                    <label htmlFor="numOfQuestions">Number of Questions:</label>
                    <input type="text" defaultValue='10' name='amount'/>
                </div>
                <div className="settings">
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category">
                        <option value="">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals and Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="31">Entertainment: Japanese Anime & Manga</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                    </select>
                </div>
                <div className="settings">
                    <label htmlFor="difficulty">Difficulty:</label>
                    <select name="difficulty" id="difficulty">
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="settings">
                    <label htmlFor="type">Type:</label>
                    <select name="type" id="type">
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                </div>

            </form>
        </div>


        //chosee between quick quiz or apply settings
            //quick quiz           
            //quiz with settings
            //code here
    )
}