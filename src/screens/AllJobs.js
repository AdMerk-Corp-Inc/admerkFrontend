import React from 'react'

function AllJobs() {
    return (
        <section className="all-jobs-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>
                        <div className='d-flex align-items-center justify-content-end status-filter-div mb-4'>
                            <div className='mx-4'>
                                <a type="button" href='#' class="btn btn-primary custom-sm-btn mb-4">Create Volunteer</a>
                            </div>

                            <label className='me-3' htmlFor="">Ticket Status:</label>
                            <select class="form-select form-select-sm" aria-label="Default select example">
                                <option value='All'>All</option>
                                <option value="1">Open</option>
                                <option value="2">Closed</option>
                            </select>
                        </div>

                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Created Date</th>
                                    <th scope="col">Total Applied</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {allTickets?.length > 0 ? allTickets.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>title here</td>
                                        <td>india</td>
                                        <td>1 jan</td>
                                        <td>245</td>
                                        <td>open</td>

                                        <td>{item?.status == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Open</span> : <span className='bg-danger px-2 py-1 rounded text-white'>Closed</span>}</td>
                                        <td><a href='javascript:void(0);' onClick={() => {
                                            setId(item?.id)
                                            setModalShow(true)
                                        }}><i class="fa-solid fa-eye text-primary"></i></a></td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan={5}>
                                        <div className='not-found'>No Tickets Found</div>
                                    </td>
                                </tr>
                                } */}

                                {1 == 1 ? <>
                                    <tr>
                                        <td>1</td>
                                        <td>title here</td>
                                        <td>india</td>
                                        <td>1 jan</td>
                                        <td>245</td>
                                        <td>open</td>
                                        <td>icon</td>
                                    </tr>
                                </> : <tr>
                                    <td colSpan={5}>
                                        <div className='not-found'>No Tickets Found</div>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default AllJobs;