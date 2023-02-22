import React, { useContext, useEffect, useState } from 'react'
import Pagination from '../component/Pagination';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';


function AllUser() {

    const { user } = useContext(userContext)
    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [role, setRole] = useState("All")


    async function fetchUsers() {
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
            const data = await response.json()

            console.log(data)
            if (data.status == 200) {
                setAllUsers(data?.list)

            } else {
                toast.error(data.message)
            }
        } else {
            toast.error('Internal Server Error')
        }
    }



    useEffect(() => {
        fetchUsers()
    }, [page, search, role])

    return (

        <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>


                        <div className='d-flex align-items-center justify-content-end status-filter-div mb-4'>

                            <div className='mx-4'>
                                <a type="button" href='/create-volunteer' class="btn btn-primary custom-sm-btn mb-4">Create Volunteer</a>
                            </div>

                            <div className='mx-4'>
                                <input placeholder='Search' value={search} onChange={e=>setSearch(e.target.value)} className="form-control" />
                            </div>

                            <label className='me-3' htmlFor="">User Role:</label>
                            <select value={role} onChange={e => setRole(e.target.value)} class="form-select form-select-sm" aria-label="Default select example">
                                <option value="All">All</option>
                                <option value="4">Refugee</option>
                                <option value="3">Sponsor</option>
                                <option value="2">Volunteer</option>
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
                                {allUsers?.length > 0 ? allUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/profile?id=${item?.id}`}>
                                            {item?.name}
                                            </Link>
                                        </td>
                                        <td>{item?.role == 2 ? <span className='bg-primary px-2 py-1 rounded text-white'>Volunteer</span> : item?.role == 3 ? <span className='bg-primary px-2 py-1 rounded text-white'>Sponsor</span> : <span className='bg-primary px-2 py-1 rounded text-white'>Refugee</span>}</td>
                                        <td>+{item?.country_code} {item?.whatsapp_number}</td>
                                        <td>{item?.email}</td>
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

                        <Pagination page={page} setPage={setPage} />

                    </div>

                </div>
            </div>
        </section>
    )
}


export default AllUser;