import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import {GrLinkBottom, GrMailOption} from "react-icons/gr"
import axios from 'axios';

function Final() {
    const navigate = useNavigate()
    const {host,code,done} = useGlobalContext()
    const [report, setReport]= useState(false)
    const [counter, setCounter] = useState(done?5:60)

    useEffect(() => {
        if(!code)
        {
             navigate("/")
        }
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
            <h1>welldone! you completed your M I assessment</h1>
        </div>
        {report? 
        <div align="center" className='my-4'>
            <a className='btn btn-info' rel="noopener noreferrer" target="_blank" href={host+"report/"+code}> <GrLinkBottom /> report</a>
         </div>    :
        <h3 className='text-center'>Report will be ready in {counter} sec</h3>
        }
        {!done?
            <div className="f-mail">
                <div className='f-left'></div>
                <p>You will also recieve the report in email <GrMailOption /></p>
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