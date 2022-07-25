import React from 'react'

import { useGlobalContext } from '../Context'

const Model = () => {
  const { isModel,uploadAnswer,closeModel } = useGlobalContext()
  return (
    <div
      className={`${
        isModel ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
       
        <button className='prs-btn'  onClick={closeModel}>
          Previous
        </button>
        <button className='answer-btn'  onClick={uploadAnswer}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default Model