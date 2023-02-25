import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

function EditAccountProfile() {

    const { user,setLoad } = useContext(userContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [countrylist, setCountryList] = useState([])
    const [dob, setDob] = useState('')
    const [whatsappnum, setWhatsappNum] = useState('')
    const [graduation, setGraduation] = useState('')
    const [skills, setSkills] = useState('')
    const [skillslist, setSkillsList] = useState([])
    const [hobby, setHobby] = useState('')
    const [hobbyslist, setHobbyList] = useState([])
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [gender, setGender] = useState("male")
    const [fromUsa, setFromUsa] = useState(1)

    useEffect(() => {
        setLoad(false)
        async function fetchHobby() {
            setLoad(true)
            const response = await fetch(url + "hobby-list")
            if (response.ok == true) {
                setLoad(false)
                const data = await response.json()

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

        async function fetchSkill() {
            setLoad(true)
            const response = await fetch(url + "skills-list")
            if (response.ok == true) {
                setLoad(false)
                const data = await response.json()

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

        async function fetchCountry() {
            setLoad(true)
            const response = await fetch(url + "country-list")
            if (response.ok == true) {
                setLoad(false)
                const data = await response.json()

                if (data.status == 200) {
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
                    toast.error(data.message)
                }
            } else {
                setLoad(false)
                toast.error("Internal Server Error")
            }
        }

        async function fetchDetail() {
            setLoad(true)
            const response = await fetch(url + 'user-detail/' + user?.id, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json()

                if (data.status == 200) {
                    let userData = data?.detail

                    console.log(data?.detail)
                    setName(userData?.name)
                    setEmail(userData?.email)
                    setCountry({
                        value: userData?.country_id,
                        label: userData?.country_name,
                        phoneCode: userData?.country_code
                    })
                    setDob(userData?.dob)
                    setWhatsappNum(userData?.whatsapp_number)
                    setGraduation(userData?.graduation)
                    setSkills(
                        userData?.skills?.split(',')?.map(item => {
                            return {
                                value: item,
                                label: item,
                            }
                        })
                    )
                    setHobby(
                        userData?.hobby?.split(',')?.map(item => {
                            return {
                                value: item,
                                label: item,
                            }
                        })
                    )
                    setDescription(userData?.description)
                    setGender(userData?.gender)
                    setFromUsa(userData?.from_usa)

                } else {
                    toast.error(data.message)
                }

            } else {
                setLoad(false)
                toast.error('Internal Server Error')
            }
        }

        fetchHobby();
        fetchSkill();
        fetchCountry();
        fetchDetail();
        
    }, [])

    return (
        <div className='signup-both-div'>
            <section className="h-custom" style={{ backgroundColor: '#0061df08' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-8">
                            <div className="card rounded-3">

                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4">Edit Profile Detail</h3>

                                    {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                                    <form>

                                        <div className='row'>
                                            <div className="filter-form-MUI-input-text col-md-6">
                                                <main class="input-div">
                                                    <input
                                                        class="inner-input"
                                                        type="text"
                                                        placeholder=" "
                                                        value={name}
                                                        required
                                                        onChange={e => setName(e.target.value)}
                                                    />
                                                    <label for="name" class="inner-label">Name</label>
                                                </main>
                                            </div>

                                            <div className="filter-form-MUI-input-text col-md-6">
                                                <main class="input-div bg-light">
                                                    <input
                                                        class="inner-input"
                                                        type="email"
                                                        placeholder=" "
                                                        id='name'
                                                        autoComplete="off"
                                                        value={email}
                                                        required
                                                        onChange={e => setEmail(e.target.value)}
                                                        readOnly
                                                    />
                                                    <label for="name" class="inner-label">Email</label>
                                                </main>
                                            </div>

                                            <Select className='col-md-6 mb-3'
                                                options={countrylist}
                                                placeholder='Select Country'
                                                value={country} required onChange={setCountry}
                                            />

                                            <div className='filter-form-MUI-calendar mb-3 col-md-6'>
                                                <main className='input-div'>
                                                    <input className='inner-input' type="date" value={dob}
                                                        required
                                                        onChange={e => setDob(e.target.value)} placeholder="DOB" />
                                                    <label class="inner-label">DOB</label>
                                                    {/* <span>error span</span> */}
                                                </main>
                                            </div>

                                            <div className="filter-form-MUI-input-text col-md-6">
                                                <main class="input-div">
                                                    <input
                                                        class="inner-input"
                                                        type="text"
                                                        placeholder=" "
                                                        id='name'
                                                        autoComplete="off"
                                                        value={whatsappnum}
                                                        required
                                                        onChange={e => setWhatsappNum(e.target.value)}
                                                    />
                                                    <label for="name" class="inner-label">WhatsApp Number</label>
                                                    {/* <span className='required'>*Required</span> */}
                                                </main>

                                                {/* <span className='error'>it is span tag</span> */}
                                            </div>

                                            <div className="filter-form-MUI-input-text col-md-6">
                                                <main class="input-div">
                                                    <input
                                                        class="inner-input"
                                                        type="text"
                                                        placeholder=" "
                                                        id='name'
                                                        autoComplete="off"
                                                        value={graduation}
                                                        onChange={e => setGraduation(e.target.value)}
                                                    />
                                                    <label for="name" class="inner-label">Enter Graduation</label>
                                                    {/* <span className='required'>*Required</span> */}
                                                </main>

                                                {/* <span className='error'>it is span tag</span> */}
                                            </div>

                                            <Select className='col-md-6 mb-3'
                                                options={skillslist}
                                                isMulti={true}
                                                placeholder='Select Skills'
                                                required
                                                value={skills} onChange={setSkills}
                                            />

                                            <Select className='col-md-6 mb-3'
                                                options={hobbyslist}
                                                isMulti={true}
                                                placeholder='Select Hobby'
                                                required
                                                value={hobby} onChange={setHobby}
                                            />

                                            <div className="filter-form-MUI-input-text">
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


                                            <div className='filter-form-MUI-radio-btn custom-MUI-radio-btn col-md-6'>
                                                <label className='form-check-label'>Select Gender:</label>
                                                <div className='d-flex mt-2'>
                                                    <div className='d-flex align-items-center'>
                                                        <input
                                                            id='male'
                                                            type='radio'
                                                            checked={gender == "male" ? true : false}
                                                            onChange={() => setGender("male")}
                                                        />
                                                        <label className='mb-0 ms-2' for='male'>Male</label>
                                                    </div>

                                                    <div className='d-flex align-items-center ms-4'>
                                                        <input
                                                            id='female'
                                                            type='radio'
                                                            checked={gender == "female" ? true : false}
                                                            onChange={() => setGender("female")}
                                                        />
                                                        <label className='mb-0 ms-2' for='female'>Female</label>
                                                    </div>
                                                </div>
                                                {/* <span className='error'>span tag</span> */}
                                            </div>

                                            <div className='filter-form-MUI-radio-btn custom-MUI-radio-btn col-md-6'>
                                                <label className='form-check-label'>Are You From USA?</label>
                                                <div className='d-flex mt-2'>
                                                    <div className='d-flex align-items-center'>
                                                        <input
                                                            id='yes'
                                                            type='radio'
                                                            checked={fromUsa == 1 ? true : false}
                                                            onChange={() => setFromUsa(1)}
                                                        />
                                                        <label className='mb-0 ms-2' for='yes'>Yes</label>
                                                    </div>

                                                    <div className='d-flex align-items-center ms-4'>
                                                        <input
                                                            id='no'
                                                            type='radio'
                                                            checked={fromUsa == 2 ? true : false}
                                                            onChange={() => setFromUsa(2)}
                                                        />
                                                        <label className='mb-0 ms-2' for='no'>No</label>
                                                    </div>
                                                </div>
                                                {/* <span className='error'>span tag</span> */}
                                            </div>
                                        </div>

                                        <button type="submit" className="btn custom-sm-btn btn-lg mb-1">Update Detail</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditAccountProfile;