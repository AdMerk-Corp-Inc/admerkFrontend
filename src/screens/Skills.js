import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

function Skills() {

    const [allSkills, setAllSkills] = useState([])
    const { user, setLoad } = useContext(userContext)

    async function fetchSkill() {
        setLoad(true)
        const response = await fetch(url + "skills-list")
        if (response.ok == true) {
            setLoad(false)
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                setAllSkills(data?.list)

            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }



    async function createSkill() {
        setLoad(true)
        const res = window.prompt('Enter Skill Name')
        if (res.length > 0) {
            const formData = new FormData()
            formData.append('name', res)
            const response = await fetch(url + 'create-skill', {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                },
                method: 'POST',
                body: formData

            });
            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();
                console.log(data);
                if (data.status == 200) {
                    toast.success(data?.message)
                    fetchSkill().catch(err => {
                        toast.error(err.message)
                    })
                } else {
                    toast.error(data.message)
                }
            } else {
                setLoad(false)
                toast.error("Internal Server Error")
            }

        }


    }

    async function editSkill(item) {
        const res = window.prompt('Edit Skill Name', item.name)
        if (res.length > 0) {
            setLoad(true)

            const formData = new FormData()
            formData.append('name', res)
            const response = await fetch(url + 'update-skill/' + item.id, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                },
                method: 'POST',
                body: formData

            });
            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();
                console.log(data);
                if (data.status == 200) {
                    toast.success(data?.message)
                    fetchSkill().catch(err => {
                        toast.error(err.message)
                    })
                } else {
                    toast.error(data.message)
                }
            } else {
                setLoad(false)
                toast.error("Internal Server Error")
            }
        }
    }

    useEffect(() => {
        fetchSkill().catch(err => {
            setLoad(false)
            toast.error(err.message)
        })

    }, [])

    async function deleteSkill(id) {
        const confirm = window.confirm('Are You Sure You Want To Delete This Skill')
        if (confirm === true) {
            setLoad(true)
            const response = await fetch(url + 'delete-skill/' + id, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            })
            if (response.ok == true) {
                setLoad(false)
                const data = await response.json()
                if (data?.status == 200) {
                    toast.success(data?.message)
                    fetchSkill().catch(err => {
                        toast.error(err.message)
                    })
                } else {
                    toast.error(data?.message)
                }
            } else {
                setLoad(false)
                toast.error('Internal Server Error')
            }
        }
    }


    return (
        <section className="skills-page-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>
                        <div className='d-flex justify-content-end'>
                            <button onClick={createSkill} type="button" class="btn btn-primary custom-sm-btn mt-0 mb-4">Create Skill</button>
                        </div>

                        <div className='table-responsive'>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr No.</th>
                                        <th scope="col">Skill Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allSkills?.length > 0 ? allSkills.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>
                                                <a href='javascript:void(0);' onClick={() => editSkill(item)}><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href='javascript:void(0)' onClick={() => deleteSkill(item?.id)}><i class="fa fa-trash-o ms-3" aria-hidden="true"></i></a>
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
            </div>
        </section>
    )
}

export default Skills;