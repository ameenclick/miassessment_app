import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { RiPagesLine } from "react-icons/ri";

import Form from "./Form";

const urlEnd = "http://ec2-3-111-37-72.ap-south-1.compute.amazonaws.com/api/validate";

function Home() {
    const {code,setCode,setError,codeChange,error,codeSubmit,nextSection} = useGlobalContext()
    /*const [code, setCode] = useState("");
    const [error, setError] = useState(false);*/

    const navigate = useNavigate();

    /*const codeSubmit = async (e) => {
        e.preventDefault();
        const url = `${urlEnd}/${code}`;
        fetchValid(url);
        setCode('')
        console.log(code);
    };

    const fetchValid = async (url) => {
        var headers = {
            "Content-Type": "application.json",
            token:
                "029f46cd2eee78a34d42eee79d44723dbcfb4d2f27956fc97d1920db7ac3644b39345f5c92007eeeabf0ecbeab506b36e9e2b4671dfefd8b874827479a9781e5",
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEFVTFNJUiIsImlhdCI6MTY0OTY0NjgyNX0.BEx1Xz-yEl-0jWzQY0ROvCTL07C7XqHLitJPpupsup0",
        };
        
        const response = await axios(url, { headers }).catch(() => setError(true));
        if (response) {
            navigate("/registration");
        }
    };*/
    if(nextSection){
        navigate('/registration')
        

        
    }

    return (
        <div className="tags">
            <ul className="cloud">
                <li data-weight="1">Logical-Mathematical</li>
            </ul>
            <ul className="cloud tags-1">
                <li data-weight="1">Linguistic Intelligence</li>
                <li data-weight="2">Intrapersonal</li>
                <li data-weight="3">Existential</li>
            </ul>
            <ul className="cloud tags-2">
                <li data-weight="3">Multiple Intelligence Assessment</li>
            </ul>
            <ul className="cloud">
                <li data-weight="3">Musical</li>
                <li data-weight="2">Bodly-Kinesthetic</li>
                <li data-weight="1">Naturalist</li>
            </ul>
            <ul className="cloud tags-4">
                <li data-weight="3">Visual-Spatial</li>
                <li data-weight="2">Interpersonal</li>
            </ul>
            <div className="code">
                <input
                    type="text"
                    id="code"
                    name="code"
                    value={code}
                    onChange={codeChange}
                    placeholder="Enter your code"
                />
            </div>
            <div className="code-btn" onClick={codeSubmit}>
                <input type="button" value="Start Now" />
            </div>
            <div className="report-btn">
                <button className="nav-button ">
                    <div className="button-content">
                        <RiPagesLine />
                        <p> get reports</p>
                    </div>
                </button>
            </div>
            {error && (
                <div>
                    <p className="code-error">code not valid!!</p>
                </div>
            )}
        </div>
    );
}

export default Home;
