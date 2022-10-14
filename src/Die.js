import React from "react"

export function Die(props){

    const style={
        backgroundColor:props.isHeld ? "#59E391":"white"
    }

    return(
        <button className="btn-num" style={style} onClick={props.holdDice}>{props.value}</button>
    )

}