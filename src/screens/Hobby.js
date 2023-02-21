import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

function Hobby() {

    const [allhobbies, setAllHobbies] = useState([])
    const [name,] = useState('')
    const { user } = useContext(userContext)

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

   


    async function createHobby(e) {
        e.preventDefault()
        const res = window.prompt('Enter Hobby Name')
        if (res.length > 0) {
            const formData = new FormData()
            formData.append('name', res)
            const response = await fetch(url + 'create-hobby', {
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
                    fetchHobby().catch(err => {
                        toast.error(err.message)
                    })
                } else {
                    toast.error(data.message)
                }
            } else {
                toast.error("Internal Server Error")
            }

        }


    }


    async function editHobby(item) {

        const res = window.prompt('Update Hobby Name', item.name)
        if (res.length > 0) {
            const formData = new FormData()
            formData.append('name', res)
            const response = await fetch(url + 'update-hobby', {
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

                } else {
                    toast.error(data.message)
                }
            } else {
                toast.error("Internal Server Error")
            }


        }
    }

    useEffect(() => {
        createHobby().catch(err => {
            toast.error(err.message)
        })
        editHobby().catch(err => {
            toast.error(err.message)
        })
        fetchHobby().catch(err => {
            toast.error(err.message)
        })

    }, [])

    async function deleteHobby(id) {
        const confirm = window.confirm('Are You Sure You Want To Delete This Hobby')
        if (confirm === true) {
          const response = await fetch(url + 'delete-hobby/' + id, {
            headers: {
              "Authorization": `Bearer ${user?.token}`
            }
          })
          if (response.ok == true) {
            const data = await response.json()
            if (data?.status == 200) {
              toast.success(data?.message)
              fetchHobby().catch(err => {
                toast.error(err.message)
              })
            } else {
              toast.error(data?.message)
            }
          } else {
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
                            <button onClick={createHobby} value={name} required type="button" class="btn btn-primary custom-sm-btn mt-0 mb-4">Create Hobby</button>
                        </div>

                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Hobby Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allhobbies?.length > 0 ? allhobbies.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>
                                            <a href='javascript:void(0);' onClick={() => editHobby(item)}><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                            <a href='javascript:void(0)' onClick={() => deleteHobby(item?.id)}><i class="fa fa-trash-o ms-3" aria-hidden="true"></i></a>
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