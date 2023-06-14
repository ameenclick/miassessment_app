import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import {GrLinkBottom, GrMailOption} from "react-icons/gr"
import {BsGear} from "react-icons/bs"
import axios from 'axios';

function Final() {
    const navigate = useNavigate()
    const {host,code,done} = useGlobalContext()
    const [report, setReport]= useState(false)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if(!code)
        {
             navigate("/")
        }
        else
        {
            axios.get(`${host}report/${code}`)
            .then((res) =>{
                console.log(res)
            if(res.status === 200)
            {
                setReport(true)
            }
            else
            {
                setCounter(60)
            }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
        if(counter>0){
            setCounter(counter-1)
        }   
        }, 1000);
        if(counter === 0)
        {      
            axios.get(`${host}report/${code}`)
            .then((res) =>{
            if(res.status === 200)
            {
                setReport(true)
            }
            else if(res.status === 204)
            {
                setCounter(15)
            }
            else
            {
                alert("Something went wrong, come back later.")
            }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        return () => clearInterval(interval);
    },[counter])

  return (
    <div className='final'>
        <div className="f-heading">
            <h1>well done! you have completed your M I assessment</h1>
        </div>
        {report? //Button if report in ready to download
        <div align="center" className='my-4'> 
            <a className='btn btn-info' rel="noopener noreferrer" target="_blank" href={host+"report/"+code}> <GrLinkBottom /> Report</a>
         </div>    : //Animation if the report in generating
         !done && <>
         <h3 className='text-center'><div className="spinner-border border-0" role="status"><BsGear  /></div> Report is generating...</h3>
         <h4 className='text-center text-warning'>It may take few minutes.</h4>   
         </>
        }
        { //Loader if the report is already generated
            done &&  !report &&
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>
        }
        {!done?
            <div className="f-mail">
                <div className='f-left'></div>
                <p>You will also recieve the report in email <GrMailOption />.<br/> If not, you can enter your code again in landing page to download report without taking the test again.</p>
            </div>
            :
            ""
        }
        
        <div className="f-content">
            <p>Thank you for Visiting</p>
        </div>
        <div className="f-power">
            <div className='row'>
                <div className='col text-center'>
                <p>Powered by</p><br/>
                <img src="../Logo.4ad65bcd.png" alt="Centre of innovation" className="img-thumbnail" width={350} height={350} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Final