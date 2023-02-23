import React, { useContext, useEffect, useState } from 'react'
import Pagination from '../component/Pagination';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';


function AllJobs() {

    const { user } = useContext(userContext)
    const [allJobs, setAllJobs] = useState([])
    const [status,setStatus] = useState("All") 

    async function fetchJobs() {
        let main_url = "getAllJobs"
        if (status != "All"){
            main_url = main_url + `?status=${status}`
        }
        const response = await fetch(url + main_url, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            },
        })
        if (response.ok == true) {
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                setAllJobs(data?.list)

            } else {
                toast.error(data.message)
            }
        } else {
            toast.error("Internal Server Error")
        }
    }


    useEffect(() => {
        fetchJobs().catch(err => {
            toast.error(err.message)
        })

    }, [status])

    async function changeStatus(item){
        const res = window.confirm("Are you sure you want to change the status of the job ?")

        if (res == true){
            let new_status = 1
            if (item?.status == 1){
                new_status = 2
            }else{
                new_status = 1
            }
            const response = await fetch(url + `change-job-status/${item?.id}/${new_status}`,{
                headers : {
                    "Authorization" : `Bearer ${user?.token}`
                }
            });

            if (response.ok == true){
                const data = await response.json();

                if (data.status == 200){
                    toast.success("Status updated successfully!")
                    fetchJobs().catch(err => {
                        toast.error(err.message)
                    })
                }else{
                    toast.error(data?.message)
                }
            }

        }
    }

    return (
        <section className="all-jobs-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>
                        <div className='d-flex align-items-center justify-content-end status-filter-div mb-4'>
                            <div className='mx-4'>
                                <a type="button" href='/create-job' class="btn btn-primary custom-sm-btn mb-4">Create Job</a>
                            </div>

                            <label className='me-3' htmlFor="">Job Status:</label>
                            <select value={status} onChange={e=>setStatus(e.target.value)} class="form-select form-select-sm" aria-label="Default select example">
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
                                {allJobs?.length > 0 ? allJobs.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.country_name}</td>
                                        <td>{item?.created_date}</td>
                                        <td>{item?.applied_count}</td>
                                        <td onClick={()=>changeStatus(item)}>{item?.status == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Open</span> : <span className='bg-danger px-2 py-1 rounded text-white'>Closed</span>}</td>
                                        <td>
                                            <a href={`edit-job?id=${item?.id}`}>
                                                <i class="fa fa-pencil" aria-hidden="true"></i>
                                            </a>
                                            <a href={`job-applicant-list?id=${item?.id}`}>
                                                <i class="fa-regular fa-folder-open text-success ms-3"></i>
                                            </a>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan={5}>
                                        <div className='not-found'>No Jobs Found</div>
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