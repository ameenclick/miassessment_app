import React from 'react'
import { useGlobalContext } from "../Context";

function Answer() {
    const {questions,index} = useGlobalContext
  return (
    <div>
        <ul>
           <li>{questions[index] && questions[index].options[0]}</li>
        </ul>
    </div>
  )
}

export default Answer
