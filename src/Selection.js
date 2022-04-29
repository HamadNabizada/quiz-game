import React, {useState} from 'react'


export default function Selection(props){
    let [isSelected, setIsSelected] = useState(false)
    let myClassName=`selection ${isSelected ? 'userSelected': ''}`
    function selectionClicked(event){
        setIsSelected(prevIsSelected => !prevIsSelected)
        console.log(event.target.className);
    }
    return(
        <button 
        id={props.id}
        onClick={selectionClicked} 
        className={myClassName} >
            {props.selection}
        </button>
    )
}