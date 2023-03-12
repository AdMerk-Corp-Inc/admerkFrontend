import React, { useContext, useEffect, useState } from 'react'
import Pagination from '../component/Pagination';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';


function AllUser() {

    const { user, setLoad } = useContext(userContext)
    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [role, setRole] = useState("All")


    async function fetchUsers() {
        setLoad(true)
        let main_url = `getAllUsers?page=${page}&search=${search}`
        if (role != "All") {
            main_url = main_url + `&role=${role}`
        }
        const response = await fetch(url + main_url, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            },
        })

        if (response.ok == true) {
            setLoad(false)
            const data = await response.json()

            console.log(data)
            if (data.status == 200) {
                setAllUsers(data?.list)

            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error('Internal Server Error')
        }
    }



    useEffect(() => {
        setLoad(false)
        fetchUsers()
    }, [page, search, role])

    async function changeStatus(item) {
        const res = window.confirm("Are you sure you want to change the status of the User ?")

        if (res == true) {
            setLoad(true)
            let new_status = 1
            if (item?.status == 1) {
                new_status = 2
            } else {
                new_status = 1
            }
            const response = await fetch(url + `change-user-status/${item?.id}/${new_status}`, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();

                if (data.status == 200) {
                    toast.success("Status updated successfully!")
                    fetchUsers().catch(err => {
                        toast.error(err.message)
                    })
                } else {
                    toast.error(data?.message)
                }
            } else {
                setLoad(false)
            }

        }
    }

    async function resendEmail(item) {
        const res = window.confirm("Are you sure you want to Resend Email for Verification ?")

        if (res == true) {
            setLoad(true)
            const response = await fetch(url + 'resendVerification/' + item?.email);

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();

                if (data.status == 200) {
                    toast.success("Status updated successfully!")

                } else {
                    toast.error(data?.message)
                }
            }
        }

    }

    return (

        <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container-md py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>


                        <div className='d-sm-flex align-items-center justify-content-end status-filter-div mb-4'>

                            <div className='me-md-4 d-md-block d-flex justify-content-end'>
                                <a type="button" href='/create-volunteer' class="btn btn-primary custom-sm-btn mb-4">Create Volunteer</a>
                            </div>

                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='mx-sm-4 me-4'>
                                    <input placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} className="form-control" />
                                </div>

                                <div className='d-flex align-items-center'>
                                    <label className='me-3' htmlFor="">User Role:</label>
                                    <select value={role} onChange={e => setRole(e.target.value)} class="form-select form-select-sm" aria-label="Default select example">
                                        <option value="All">All</option>
                                        <option value="4">Job Seeker</option>
                                        <option value="3">Company</option>
                                        <option value="2">Volunteer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='table-responsive'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">User Role</th>
                                        <th scope="col">Verifed</th>
                                        <th scope="col">Mobile No.</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers?.length > 0 ? allUsers.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Link to={`/profile?id=${item?.id}`}>{item?.name}</Link></td>
                                            <td>{item?.role == 2 ? <span className='bg-primary px-2 py-1 rounded text-white'>Volunteer</span> : item?.role == 3 ? <span className='bg-primary px-2 py-1 rounded text-white'>Compny</span> : <span className='bg-primary px-2 py-1 rounded text-white'>Job Seeker</span>}</td>
                                            <td>{item?.email_verified == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Yes</span> : <span className='bg-danger px-2 py-1 rounded text-white'>NO</span>}</td>
                                            <td>+{item?.country_code} {item?.whatsapp_number}</td>
                                            <td>{item?.email}</td>
                                            <td onClick={() => changeStatus(item)}>{item?.status == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Active</span> : <span className='bg-danger px-2 py-1 rounded text-white'>UnActive</span>}</td>
                                            <td>
                                                <a href={`/profile?id=${item?.id}`} ><i class="fa-solid fa-eye text-primary"></i></a>
                                                {
                                                    item?.email_verified == 2 ?
                                                        <a href='javascript:void(0);' onClick={() => resendEmail(item)}><i class="fa-solid fa-message text-danger ms-3"></i></a>
                                                        : <></>
                                                }

                                            </td>
                                        </tr>
                                    )) : <tr>
                                        <td colSpan={8}>
                                            <div className='not-found'>No User Found</div>
                                        </td>
                                    </tr>
                                    }


                                </tbody>
                            </table>
                        </div>

                        <Pagination page={page} setPage={setPage} />

                    </div>

                </div>
            </div>
        </section>
    )
}


export default AllUser;