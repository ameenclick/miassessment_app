import React,{ useState } from 'react'

export default function Consultation(){

    const urlPath="https://miassessment.s3.ap-south-1.amazonaws.com/caudio/"
    const [url, setUrl]=useState("")
    const [audio,setAudio]=useState("")
    
    return (
        <>
            <div className='container m-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-4 mt-5'>
                        <div class="card">
                            <div class="card-header">
                                Download Your Audio Consultation Here
                            </div>
                            <div class="card-body p-5">
                                {url? 
                                <div className='my-1'>
                                    <audio controls>
                                        <source src={url}/>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                :""}
                                <h5 class="card-title">MI Code</h5>
                                <input type="text my-2" className='form-control' placeholder='Enter your code' name="Code" onChange={(e)=> setAudio(e.target.value)}/>
                                <a href="#" class="btn btn-primary my-2" onClick={() => setUrl(urlPath+audio+".mp3")}>Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}