import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { node_url, url } from '../Helper/Helper';


function JobApplicantList() {

    const { user,setLoad } = useContext(userContext)
    const [allapplicant, setAllApplicant] = useState([])

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const id = useQuery().get('id');

    async function fetchJobs() {
        setLoad(true)
        const response = await fetch(url + "job-applicant-list/" + id, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            },
        })
        if (response.ok == true) {  
            setLoad(false)
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                setAllApplicant(data?.list)

            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }


    useEffect(() => {
        fetchJobs().catch(err => {
            setLoad(false)
            toast.error(err.message)
        })

    }, [])

   

    return (
        <section className="all-jobs-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>
                       

                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Applied Date</th>
                                    <th scope="col">Resume</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {allapplicant?.length > 0 ? allapplicant.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>+{item?.country_code} {item?.whatsapp_number}</td>
                                        <td>{item?.apply_date}</td>
                                        <td><a href={`${node_url}${item?.resume}`} target="_blank">Resume</a></td>
                                        
                                    </tr>
                                )) : <tr>
                                    <td colSpan={6}>
                                        <div className='not-found'>No Record Found</div>
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


export default JobApplicantList