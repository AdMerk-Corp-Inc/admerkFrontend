import React from 'react'

function Pagination({page,setPage}) {
    return (
        <div className='pagination-div d-flex justify-content-end mt-4'>
            <a onClick={()=>{
                if (page > 1){
                    setPage(page - 1)
                }
            }} href="javascript:void(0);"><i class="fa fa-chevron-left" aria-hidden="true"></i> Previous</a>
            <span>{page}</span>
            <a onClick={()=>{
                setPage(page + 1)
            }} href="javascript:void(0);">Next <i class="fa fa-chevron-right" aria-hidden="true"></i> </a>
        </div>
    )
}

export default Pagination;