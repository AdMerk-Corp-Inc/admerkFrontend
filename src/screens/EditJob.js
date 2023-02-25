import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { url } from '../Helper/Helper';
import { userContext } from '../context/UserContext';

function EditJOb() {

    const { user, setUser,setLoad } = useContext(userContext)
    const [title, setTitle] = useState('')
    const [country, setCountry] = useState('')
    const [countrylist, setCountryList] = useState([])
    const [skills, setSkills] = useState('')
    const [skillslist, setSkillsList] = useState([])
    const [hobby, setHobby] = useState('')
    const [hobbyslist, setHobbyList] = useState([])
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [attachement, setAttachement] = useState('')
    const [worktype, setWorkType] = useState("Both")

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const id = useQuery().get('id');


    async function fetchSkill() {
        setLoad(true)
        var requestOptions = {
            redirect: 'follow'
        };

        const response = await fetch(url + "skills-list", requestOptions)
        if (response.ok === true) {
            setLoad(false)
            const data = await response.json()
            console.log(data);
            if (data.status == 200) {
                let arr = []
                for (var i = 0; i < data.list.length; i++) {
                    arr.push({
                        'value': data.list[i].name,
                        'label': data.list[i].name
                    })
                }
                setSkillsList(arr)
            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }

    async function fetchHobby() {
        setLoad(true)
        var requestOptions = {
            redirect: 'follow'
        };

        const response = await fetch(url + "hobby-list", requestOptions)
        if (response.ok === true) {
            setLoad(false)
            const data = await response.json()
            console.log(data);
            if (data.status == 200) {
                let arr = []
                for (var i = 0; i < data.list.length; i++) {
                    arr.push({
                        'value': data.list[i].name,
                        'label': data.list[i].name
                    })
                }
                setHobbyList(arr)
            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }

    async function fetchCountry() {
        setLoad(true)
        var requestOptions = {
            redirect: 'follow'
        };

        const response = await fetch(url + "country-list", requestOptions)
        if (response.ok === true) {
            setLoad(false)
            const data = await response.json()
            console.log(data);
            if (data.list.length > 0) {
                let arr = []
                for (var i = 0; i < data.list.length; i++) {
                    arr.push({
                        'value': data.list[i].id,
                        'label': data.list[i].name,
                        "phoneCode": data.list[i].phoneCode
                    })
                }
                setCountryList(arr)
            } else {
                toast.error("")
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }

    useEffect(() => {
        fetchCountry().catch(err => {
            setLoad(false)
            toast.error(err.message)
        })
        fetchHobby().catch(err => {
            setLoad(false)
            toast.error(err.message)
        })
        fetchSkill().catch(err => {
            setLoad(false)
            toast.error(err.message)
        })

        fetchJobs().catch(err => {
            setLoad(false)
            toast.error(err.message)
        })
    }, [])

    async function handleSubmit(e) {
        setLoad(true)
        e.preventDefault()

        let error = 0

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)

        if (country?.value) {
            formData.append("country_id", country?.value)
            formData.append("country_name", country?.label)

        } else {
            error = error + 1
        }
        formData.append("work_type", worktype)

        if (photo?.name) {
            formData.append("image", photo, photo?.name)
        }

        if (attachement?.name) {
            formData.append("attachement", attachement, attachement?.name)
        }

        if (hobby.length > 0) {
            formData.append("hobby", Array.prototype.map.call(hobby, s => s.label).toString())
        }

        if (skills.length > 0) {
            formData.append("skills", Array.prototype.map.call(skills, s => s.label).toString())
        }

        if (error == 0) {
            const response = await fetch(url + 'update-job/' + id, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                },
            });

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();

                if (data.status == 200) {
                    toast.success("Job Created Successfully!")
                    window.location = window.location.origin + '/all-jobs'
                } else {
                    toast.error(data?.message)
                }
            }
        } else {
            setLoad(false)
            toast.error("Please fill country")
        }

    }

    async function fetchJobs() {
        setLoad(true)
        const response = await fetch(url + "job-details/" + id, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            },
        })
        if (response.ok == true) {
            setLoad(false)
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                setTitle(data?.detail?.title)
                setCountry({
                    'value': data?.detail?.country_id,
                    'label': data?.detail?.country_name,
                    // "phoneCode": data?.list[0].phoneCode
                })
                setWorkType({
                    'value': data?.detail?.work_type,
                    'label': data?.detail?.work_type,
                })



                setSkills(data?.detail?.skills?.split(",").map(item => {
                    return {
                        label: item,
                        value: item
                    }
                }))
                setHobby(data?.detail?.hobby?.split(",").map(item => {
                    return {
                        label: item,
                        value: item
                    }
                }))
                setDescription(data?.detail?.description)
                setPhoto()
                setWorkType(data?.detail?.work_type)

            } else {
                toast.error(data.message)
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }


    return (
        <div>
            <div className='signup-both-div'>
                <section className="h-custom" style={{ backgroundColor: '#0061df08' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-8">
                                <div className="card rounded-3">
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4">Edit Job</h3>

                                        <form onSubmit={(e) => handleSubmit(e)}>

                                            <div className='row'>
                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="text"
                                                            placeholder=" "
                                                            value={title}
                                                            required
                                                            onChange={e => setTitle(e.target.value)}
                                                        />
                                                        <label for="name" class="inner-label">Tittle</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>
                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="file"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                            onChange={e => setPhoto(e.target.files[0])}
                                                        />
                                                        <label for="name" class="inner-label">Upload Cover Photo</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>




                                                <Select className='col-md-6'
                                                    options={countrylist}
                                                    placeholder='Select Country'
                                                    value={country} required onChange={setCountry}
                                                />


                                                <Select className='col-md-6'
                                                    options={skillslist}
                                                    isMulti={true}
                                                    placeholder='Select Skills'
                                                    required
                                                    value={skills} onChange={setSkills}
                                                />

                                                <Select className='col-md-6 mt-3'
                                                    options={hobbyslist}
                                                    isMulti={true}
                                                    placeholder='Select Hobby'
                                                    required
                                                    value={hobby} onChange={setHobby}
                                                />

                                                <div className="filter-form-MUI-input-text col-md-6 mt-3">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="file"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                            onChange={e => setAttachement(e.target.files[0])}
                                                        />
                                                        <label for="name" class="inner-label">Upload Job Attchement</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>
                                                <div className="filter-form-MUI-input-text col-md-6">
                                              <label className='me-3' htmlFor="">Work Type</label>
                                               <select 
                                                value={worktype} onChange={setWorkType}  
                                                placeholder='Work Type' class="form-select form-select-sm" >
                                                    <option value='Both'>Both</option>
                                                    <option value="Remote">Remote</option>
                                                    <option value="OnSite">OnSite</option>
                                                </select>
                                              </div>


                                                <div className="filter-form-MUI-input-text mt-3">
                                                    <main class="input-div h-100">
                                                        <textarea
                                                            class="inner-input position-relative pt-3"
                                                            type="text"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                            rows='8'
                                                            value={description}
                                                            onChange={e => setDescription(e.target.value)}
                                                        />
                                                        <label for="name" class="inner-label">Description</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>




                                            </div>

                                            <button type="submit" className="btn custom-sm-btn btn-lg mb-1">Edit Job</button>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}


export default EditJOb;