import { useEffect, useState } from "react";
import {Die} from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export const Game =()=>{

    const [dice, setDice] = useState(Dice())

    const [tenzies, setTenzies] = useState(false)

    useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value
        const allSameVale =dice.every( die => die.value === firstValue)

        if(allSameVale && allHeld){
            setTenzies(true)
        }

    }, [dice])

    function Dice(){

        const diceArr = [];
        for(let i=0; i<10; i++){
            diceArr.push(generateNewDie())
        }
        return diceArr

    }

    function generateNewDie(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
    }
    }

    function roll(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die=>{
                return die.isHeld ? die:generateNewDie()
            }))
        }else{
            setTenzies(false)
            setDice(Dice)
        }
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die =>{
            return die.id === id ? {...die, isHeld : !die.isHeld}:die
        }))
    }

    const diceElement = dice.map(
        die => 
        <Die 
            value={die.value} 
            key={die.id}
            isHeld={die.isHeld}
            holdDice={()=>holdDice(die.id)}
        />)

    return(
        <div className="main">
            {tenzies && <Confetti/>}
            <div className="content">

                <h1 className="heading">Tenzies</h1>
                <p className="para">Roll until all dice are the same. Click each die to
                     freeze it at its current value between rolls.</p>

                <div className="btn-div">
                    {diceElement}
                </div>

                <button  className="btn-roll" onClick={roll}>{tenzies ? "You Won | Reset" : "Roll"}</button>

            </div>
        </div>
    )
}