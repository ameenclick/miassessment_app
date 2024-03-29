import React, { useEffect } from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";

function Home() {
    const {code,setCode,error,codeSubmit, page} = useGlobalContext()
    
    const navigate = useNavigate();

    useEffect(() => {
        if(page.register)
        {
            navigate("/registration");
        }
        else if(page.quiz)
        {
            navigate("/quiz");
        }
        else if(page.final)
        {
            navigate("/report");
        }
    }, [page])

    return (
        <div className="tags">
            <div className="w3-animate-zoom">
                <ul className="cloud">
                    <li data-weight="5">Logical-Mathematical</li>
                </ul>
                <ul className="cloud tags-1">
                    <li data-weight="1">Linguistic Intelligence</li>
                    <li data-weight="2">Intrapersonal</li>
                    <li data-weight="3">Existential</li>
                </ul>
                <ul className="cloud tags-2">
                    <li data-weight="10">Multiple   Intelligence   Assessment</li>
                </ul>
                <ul className="cloud">
                    <li data-weight="3">Musical</li>
                    <li data-weight="2">Bodly-Kinesthetic</li>
                    <li data-weight="1">Naturalist</li>
                </ul>
                <ul className="cloud tags-4">
                    <li data-weight="3">Visual-Spatial</li>
                    <li data-weight="4">Interpersonal</li>
                </ul>
            </div>
            <div className="code">
                <input
                    type="text"
                    id="code"
                    name="code"
                    onChange={(e) => {e.preventDefault(); setCode(e.target.value)}}
                    value={code}
                    placeholder="Enter your code"
                />
            </div>
            <div className="code-btn" onClick={codeSubmit}>
                <input type="button" value="Start Now" />
            </div>
            {error && (
                <div>
                    <p className="code-error">Code invalid!!</p>
                </div>
            )}
            <div className="text-dark text-center mt-4">
                <p>Are you looking for consultation audio? <a href="/audio">Click Here</a></p>
            </div>
        </div>
    );
}

export default Home;
