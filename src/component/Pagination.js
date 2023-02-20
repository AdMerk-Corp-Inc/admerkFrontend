import React from 'react'

function Pagination() {
    return (
        <div className='pagination-div d-flex justify-content-end mt-4'>
            <a href=""><i class="fa fa-chevron-left" aria-hidden="true"></i> Previous</a>
            <span>1</span>
            <a href="">Next <i class="fa fa-chevron-right" aria-hidden="true"></i> </a>
        </div>
    )
}

export default Pagination;