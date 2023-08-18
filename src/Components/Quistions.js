import React, { useEffect } from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";

import { GrChapterNext,GrChapterPrevious } from "react-icons/gr";


function Quistions() {
    const {questions,code,index, nextQuestion,previousQuestion,ansrSub1,optimizedSubmit,isActive,finalSection,answers,done} = useGlobalContext()
    
    const navigate = useNavigate()

    useEffect(() => {
         if(!code || localStorage.getItem("user") == null){
            navigate('/')
         }
       if(finalSection){  
            navigate('/final')    
       }
    },[])

    //Move to next final page when value change
    useEffect(() => {
      if(finalSection){  
           navigate('/final')    
      }
   },[finalSection])
    
    const emptyAlert = () => {
        return alert("Make a choose!")
    }

    return (
        questions.length > 0 && questions.length > index?
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
                    <button onClick={ansrSub1} style={{backgroundColor:isActive === "A"?'#7940dc':''}} value='A'> {questions[index] && questions[index].options[0]}</button>
                <button onClick={ansrSub1} style={{backgroundColor:isActive === "B"?'#7940dc':''}} value='B'> {questions[index] && questions[index].options[1]}</button>
                <button onClick={ansrSub1} style={{backgroundColor:isActive === "C"?'#7940dc':''}}  value='C'> {questions[index] && questions[index].options[2]}</button>
            </ul>
                    { answers.length === questions.length?
                    <div className="row justify-content-center">
                        <div className="col-4" align="center">
                        <button className='btn btn-success my-3'  onClick={optimizedSubmit} disabled={finalSection}>
                           {done? 
                           <div className="d-flex justify-content-center">
                           <div className="spinner-border" role="status">
                               <span className="visually-hidden">Loading...</span>
                           </div>
                           </div>
                           : 
                           "Submit"} 
                        </button>
                        </div>
                    </div>
                        :
                        <div className="q-button">
                            {index > 0?
                            <button className="prev-button" onClick={previousQuestion}>
                                <GrChapterPrevious /> Previous{" "}
                            </button>
                            : ""
                            }
                            <button className="next-button" onClick={isActive? nextQuestion: emptyAlert}>
                                Next <GrChapterNext />
                            </button>
                        </div>
                    }
                <div className="q-progress">
                    <div className="parent-progress">
                    <div className="child-progress" style={{width:`${(index+1)*0.93}%`}}></div>
                    </div>   
                </div>
                <div className="q-number">
                    <p>{index + 1}/{questions.length}</p>
                </div>
            </div>
        :
        <div className="d-flex justify-content-center">
        <div className="spinner-border p-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    );
}

export default Quistions;
