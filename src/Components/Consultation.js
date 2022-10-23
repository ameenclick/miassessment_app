import React,{ useEffect, useState } from 'react'
import axios from "axios";

export default function Consultation(){

    const urlPath="https://miassessment.s3.ap-south-1.amazonaws.com/caudio/"
    const [url, setUrl]=useState("")
    const [audio,setAudio]=useState("")
    const [urlStatus, setStatus]=useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if(url)
        {   
            axios.get(url)
            .then(res => {
                setStatus(true)
            })
            .catch(err => {
                if(err.response.status === 403)
                {
                    setMessage("Either code is incorrect or the consultation is not ready yet")
                }
                else
                {
                    setMessage("Something went wrong, try again later.")
                }
            })
        }
    }, [url])
    
    return (
        <>
            <div className='container m-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-4 mt-5'>
                        <div className="card">
                            <div className="card-header">
                                Download Your Audio Consultation Here
                            </div>
                            <div className="card-body p-5">
                                {urlStatus? 
                                <div className='my-1'>
                                    <audio controls>
                                        <source src={url}/>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                :""}
                                <h5 className="card-title">MI Code</h5>
                                <input type="text my-2" className='form-control' placeholder='Enter your code' name="Code" onChange={(e)=> setAudio(e.target.value)}/>
                                <button className="btn btn-primary my-2" onClick={() =>{audio? setUrl(urlPath+audio+".mp3"): setMessage("Field empty")}}>Submit</button>
                                <p className='text-danger'>
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}