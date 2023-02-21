import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';


function AllUser() {

    const { user } = useContext(userContext)
    const [allTickets, setAllTickets] = useState([])

    //   useEffect(() => {
    //     async function fetchTickets() {
    //       const response = await fetch(url + 'all-tickets', {
    //         headers: {
    //           'Authorization': `Bearer ${user?.token}`
    //         },
    //       })

    //       if (response.ok == true) { 
    //         const data = await response.json()

    //         console.log(data)
    //         if (data.status == 200) {
    //           setAllTickets(data?.list)

    //         } else {
    //           toast.error(data.message)
    //         }
    //       } else {
    //         toast.error('Internal Server Error')
    //       }
    //     }

    //     fetchTickets()
    //   }, [])

    return (

        <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>


                        <div className='d-flex align-items-center justify-content-end status-filter-div mb-4'>

                           <div className='mx-4'>
                           <a type="button" href='/create-volunteer' class="btn btn-primary custom-sm-btn mb-4">Create Volunteer</a>
                           </div>

                            <label className='me-3' htmlFor="">User Role:</label>
                            <select class="form-select form-select-sm" aria-label="Default select example">
                                <option selected>All</option>
                                <option value="1">Refugee</option>
                                <option value="2">Sponsor</option>
                                <option value="3">Volunteer</option>
                            </select>
                        </div>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">User Role</th>
                                    <th scope="col">Mobile No.</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTickets?.length > 0 ? allTickets.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.created_date}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.status == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Open</span> : <span className='bg-danger px-2 py-1 rounded text-white'>Closed</span>}</td>
                                        <td><a href='javascript:void(0);' ><i class="fa-solid fa-eye text-primary"></i></a></td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan={6}>
                                        <div className='not-found'>No User Found</div>
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


export default AllUser;