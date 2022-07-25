import React from 'react'
import { useGlobalContext } from "../Context";

function Final() {
    const {finalReport} = useGlobalContext()
  return (
    <div className='final'>
        <div className="f-heading">
            <h1>welldone! you completed your MI assessment</h1>
        </div>
        <div className="f-btn">
            <button onClick={finalReport} > view report</button>
        </div>
        <div className="f-mail">
            <div className='f-left'></div>
            <p>You will also recieve the repot in mail</p>
        </div>
        <div className="f-content">
            <p>Thank you for Visiting</p>
        </div>
        <div className="f-power">
            <p>Powered by</p>
        </div>
    </div>
  )
}

export default Final