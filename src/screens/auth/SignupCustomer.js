import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { url } from '../../Helper/Helper';
import { userContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';

function SignupCustomer() {
    const navigation = useNavigate()
    const { user, setUser } = useContext(userContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [countrylist, setCountryList] = useState([])
    const [dob, setDob] = useState('')
    const [whatsappnum, setWhatsappNum] = useState('')
    const [graduation, setGraduation] = useState('')
    const [skills, setSklls] = useState('')
    const [skillslist, setSkillsList] = useState([])
    const [hobby, setHobby] = useState('')
    const [hobbyslist, setHobbyList] = useState([])
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [gender, setGender] = useState("male")
    const [fromUsa, setFromUsa] = useState(1)


    async function fetchSkill() {
        var requestOptions = {
            redirect: 'follow'
        };

        const response = await fetch(url + "skills-list", requestOptions)
        if (response.ok === true) {

            const data = await response.json()
            console.log(data);
            if (data.list.length > 0) {
                let arr = []
                for (var i = 0; i < data.list.length; i++) {
                    arr.push({
                        'value': data.list[i].id,
                        'label': data.list[i].name
                    })
                }
                setSkillsList(arr)
            } else {
                toast.error("Please Create Skills First")
            }
        } else {

            toast.error("Internal Server Error")
        }
    }

    async function fetchHobby() {
        var requestOptions = {
            redirect: 'follow'
        };

        const response = await fetch(url + "hobby-list", requestOptions)
        if (response.ok === true) {

            const data = await response.json()
            console.log(data);
            if (data.list.length > 0) {
                let arr = []
                for (var i = 0; i < data.list.length; i++) {
                    arr.push({
                        'value': data.list[i].id,
                        'label': data.list[i].name
                    })
                }
                setHobbyList(arr)
            } else {
                toast.error("Please Create HObby First")
            }
        } else {

            toast.error("Internal Server Error")
        }
    }

    async function fetchCountry() {
        var requestOptions = {
            redirect: 'follow'
        };

        const response = await fetch(url + "country-list", requestOptions)
        if (response.ok === true) {

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

            toast.error("Internal Server Error")
        }
    }

    useEffect(() => {
        fetchCountry().catch(err => {
            toast.error(err.message)
        })
        fetchHobby().catch(err => {
            toast.error(err.message)
        })
        fetchSkill().catch(err => {
            toast.error(err.message)
        })


    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        let error = 0

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("role", 4)
        formData.append("dob", dob)
        formData.append("graduation", graduation)
        formData.append("whatsapp_number", whatsappnum)
        formData.append("gender", gender)
        formData.append("from_usa", fromUsa)
        formData.append("description", description)

        if (country?.value) {
            formData.append("country_id", country?.value)
            formData.append("country_name", country?.label)
            formData.append("country_code", country?.phoneCode)
        } else {
            error = error + 1
        }

        if (photo?.name) {
            formData.append("image", photo, photo?.name)
        }

        if (hobby.length > 0) {
            formData.append("skills", Array.prototype.map.call(hobby, s => s.label).toString())
        }

        if (skills.length > 0) {
            formData.append("hobby", Array.prototype.map.call(hobby, s => s.label).toString())
        }

        if (error == 0) {
            const response = await fetch(url + 'register-refugee', {
                method: 'POST',
                body: formData
            });

            if (response.ok == true) {
                const data = await response.json();

                if (data.status == 200) {
                    setUser(data?.user_data)
                    window.location = window.location.origin + "/refugee-dashboard"
                } else {
                    toast.error(data?.message)
                }
            }
        } else {
            toast.error("Please fill country")
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
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                                        className="w-100"
                                        style={{ borderTopLeftRadius: '.3rem', borderTopRightRadius: '0.3rem' }}
                                        alt="Sample photo" />
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4">Sign up to find work you love</h3>

                                        <form onSubmit={(e) => handleSubmit(e)}>

                                            <div className='row'>
                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="text"
                                                            placeholder="Enter Name"
                                                            value={name}
                                                            required
                                                            onChange={e => setName(e.target.value)}
                                                        />
                                                        <label for="name" class="inner-label">Name</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>
                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="password"
                                                            placeholder=" "
                                                            id='password'
                                                            autoComplete="off"
                                                            value={password}
                                                            required
                                                            onChange={e => setPassword(e.target.value)}
                                                        />
                                                        <label for="name" class="inner-label">Password</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="email"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                            value={email}
                                                            required
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                        <label for="name" class="inner-label">Email</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                <Select className='col-md-6'
                                                    options={countrylist}
                                                    placeholder='Select Country'
                                                    value={country} required onChange={setCountry}
                                                />
                                                <div className='filter-form-MUI-calendar col-md-6'>
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

                                                <Select className='col-md-6'
                                                    options={skillslist}
                                                    isMulti={true}
                                                    placeholder='Select Skills'
                                                    required
                                                    value={skills} onChange={setSklls}
                                                />

                                                <Select className='col-md-6'
                                                    options={hobbyslist}
                                                    isMulti={true}
                                                    placeholder='Select Hobby'
                                                    required
                                                    value={hobby} onChange={setHobby}
                                                />

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
                                                        <label for="name" class="inner-label">Upload Profile Photo</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>
                                                <div className="filter-form-MUI-input-text">
                                                    <main class="input-div">
                                                        <textarea

                                                            class="inner-input"
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
                                                                type='radio'
                                                                checked={gender == "male" ? true : false}
                                                                onChange={() => setGender("male")}
                                                            />
                                                            <label className='mb-0 ms-2'>Male</label>
                                                        </div>

                                                        <div className='d-flex align-items-center ms-4'>
                                                            <input
                                                                type='radio'
                                                                checked={gender == "female" ? true : false}
                                                                onChange={() => setGender("female")}
                                                            />
                                                            <label className='mb-0 ms-2'>Female</label>
                                                        </div>
                                                    </div>
                                                    {/* <span className='error'>span tag</span> */}
                                                </div>

                                                <div className='filter-form-MUI-radio-btn custom-MUI-radio-btn col-md-6'>
                                                    <label className='form-check-label'>Are You From USA?</label>
                                                    <div className='d-flex mt-2'>
                                                        <div className='d-flex align-items-center'>
                                                            <input
                                                                type='radio'
                                                                checked={fromUsa == 1 ? true : false}
                                                                onChange={() => setFromUsa(1)}
                                                            />
                                                            <label className='mb-0 ms-2'>Yes</label>
                                                        </div>

                                                        <div className='d-flex align-items-center ms-4'>
                                                            <input
                                                                type='radio'
                                                                checked={fromUsa == 2 ? true : false}
                                                                onChange={() => setFromUsa(2)}
                                                            />
                                                            <label className='mb-0 ms-2'>No</label>
                                                        </div>
                                                    </div>
                                                    {/* <span className='error'>span tag</span> */}
                                                </div>
                                            </div>

                                            <button type="submit" className="btn custom-sm-btn btn-lg mb-1">Create my account</button>

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

export default SignupCustomer;