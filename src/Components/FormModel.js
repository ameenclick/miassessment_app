import React from 'react'

import { useGlobalContext } from '../Context'

const Model = () => {
  const { modelSection } = useGlobalContext()
  return (
    <div
      className={`${
        modelSection ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
       
        <button className='prs-btn'  >
          Previous
        </button>
        <button className='answer-btn' >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Model