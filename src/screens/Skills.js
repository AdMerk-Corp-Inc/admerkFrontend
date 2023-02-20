import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

function Skills() {

    const [allSkills, setAllSkills] = useState([])
    const [name, setName] = useState('')
    const { user } = useContext(userContext)

    useEffect(() => {
        async function fetchSkill() {

            const response = await fetch(url + "skills-list")
            if (response.ok == true) {
                const data = await response.json()
                console.log(data)
                if (data.status == 200) {
                    setAllSkills(data?.list)

                } else {
                    toast.error(data.message)
                }
            } else {
                toast.error("Internal Server Error")
            }
        }

        fetchSkill();
    }, [])

    async function createSkill() {
        const res = window.prompt('Enter Skill Name')
        if (res.length > 0) {
            const formData = new FormData()
            formData.append('name', name)
            const response = await fetch(url + 'create-skill', {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                },
                method: 'POST',
                body: formData

            });
            if (response.ok == true) {
                const data = await response.json();
                console.log(data);
                if (data.status == 200) {
                    toast.success(data?.message)
                    setName('')
                } else {
                    toast.error(data.message)
                }
            } else {
                toast.error("Internal Server Error")
            }

        }


    }

    async function editSkill(item) {
        const res = window.prompt('Enter Skill Name', item.name)
        if (res.length > 0) {

        }
    }

    return (
        <section className="skills-page-div" style={{ backgroundColor: '#0061df08' }}>
            <div className="container py-5 h-100">
                <div className="card rounded-3">

                    <div className='p-4 table-div'>
                        <div className='d-flex justify-content-end'>
                            <button onClick={createSkill} value={name} required onChange={e => setName(e.target.value)} type="button" class="btn btn-primary custom-sm-btn mt-0 mb-4">Create Skill</button>
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
                                {allSkills?.length > 0 ? allSkills.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>
                                            <a href='javascript:void(0);' onClick={() => editSkill(item)}><i class="fa fa-pencil" aria-hidden="true"></i></a>
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

export default Skills;