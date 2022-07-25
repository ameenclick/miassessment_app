import React from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";

import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import Model from "./Model";


function Quistions() {
    const {questions,index, nextQuestion,previousQuestion,answer,ansrSub1,ansrSub2,ansrSub3,isActive,finalSection} = useGlobalContext()
    
    const navigate = useNavigate()
   if(finalSection){
    
   
        navigate('/final')
    
   }

    return (
        
        <div className="questions">
            <div className="q-image">
                <img
                    src={questions[index] && questions[index].images}
                    alt="quiz "
                />
    </div>
            <div className="q-list">
                <div className="question">
                    <p>{index + 1}. {questions[index] && questions[index].question}</p>
                </div>
            </div> 
           <ul className="ans">
           <button onClick={ansrSub1} style={{backgroundColor:isActive?'green':''}} value='A'> {questions[index] && questions[index].options[0]}</button>
               <button onClick={ansrSub1} value='B'> {questions[index] && questions[index].options[1]}</button>
               <button onClick={ansrSub1}  value='C'> {questions[index] && questions[index].options[2]}</button>
           </ul>
              
           { /*<div className="answer">
                <div className="answers">
                    <div className="options">
                        <label htmlFor="option-1" className="option">
                            <input type="radio" name="answer"  value='A' id="option-1" className="answer-input" />
                            <div className="answer-radio"></div>
                            {questions[index] && questions[index].options[0]}
                        </label>
                    </div>
                </div>
                <div className="answers">
                    <div className="options">
                        <label htmlFor="option-2" className="option">
                            
                            <input type="radio" name="answer"  value='B'  id="option-2" className="answer-input" />
                            <div className="answer-radio"></div>
                            {questions[index] && questions[index].options[1]}
                        </label>
                    </div>
                </div>
                <div className="answers">
                    <div className="options">
                        <label htmlFor="option-3" className="option">
                            <input type="radio" name="answer" value='C'   id="option-3" className="answer-input" />
                            <div className="answer-radio"></div>
                            {questions[index] && questions[index].options[2]}                     
                        </label>
                    </div>
                </div>
    </div>*/}
            <div className="q-button">
                <button className="prev-button" onClick={previousQuestion}>
                    <GrChapterPrevious /> Previous{" "}
                </button>
                <button className="next-button" onClick={nextQuestion}>
                    <GrChapterNext /> Next
                </button>
            </div>
            <div className="q-progress">
                <div className="parent-progress">
                <div className="child-progress" style={{width:`${(index+1)*0.93}%`}}></div>
                </div>
                
                
            </div>
            <div className="q-number">
                <p>{index + 1}/{questions.length}</p>
            </div>
            
            <Model/>
        </div>
    );
}

export default Quistions;
