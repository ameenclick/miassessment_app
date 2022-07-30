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
     <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <button className='prs-btn'  onClick={closeModel}>
              Previous
            </button>
            <button className='answer-btn'  onClick={uploadAnswer}>
              Submit
            </button>
          </div>
          {/* <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Model