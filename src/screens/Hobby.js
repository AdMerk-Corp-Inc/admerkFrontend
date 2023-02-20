import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../Helper/Helper'

function Hobby() {

    const [allhobbies, setAllHobbies] = useState([])

    useEffect(() => {
        async function fetchHobby() {

            const response = await fetch(url + "hobby-list")
            if (response.ok == true) {
                const data = await response.json()

                if (data.status == 200) {
                    setAllHobbies(data?.list)
                } else {
                    toast.error(data.message)
                }
            } else {
                toast.error("Internal Server Error")
            }
        }

        fetchHobby();
    }, [])
    return (
        <section className="skills-page-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>
                        <div className='d-flex justify-content-end'>
                            <button type="button" class="btn btn-primary custom-sm-btn mt-0 mb-4">Create Hobby</button>
                        </div>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Skill Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allhobbies?.length > 0 ? allhobbies.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>
                                            <a href=''><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                            <a href=""><i class="fa fa-trash-o ms-3" aria-hidden="true"></i></a>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan={5}>
                                        <div className='not-found'>No Skills Found</div>
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

export default Hobby;