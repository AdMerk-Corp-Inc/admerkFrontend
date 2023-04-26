import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { url } from '../../Helper/Helper';
import { userContext } from '../../context/UserContext'
import { useLocation, useNavigate } from 'react-router-dom';

function SignupCustomer() {
    const navigation = useNavigate()
    const { user, setUser, setLoad } = useContext(userContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [countrylist, setCountryList] = useState([])
    const [statelist, setStateList] = useState([])
    const [citylist, setCityList] = useState([])
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
    const [zipcode, setZipcode] = useState("")
    const [maritialStatus, setMaritialStatus] = useState('')
    const [passport, setPassport] = useState('')
    const [travelBy, setTravelBy] = useState('')
    const [sponsorCategory, setSponsorCategory] = useState('')

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const type = useQuery().get('type');


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
                        'value': data.list[i].id,
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
                        'value': data.list[i].id,
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

    async function fetchStateCountryList() {
        setLoad(true)

        const response = await fetch(url + "get-state-by-country/" + country?.value)
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
                        "country_id": data.list[i].country_id
                    })
                }
                setStateList(arr)
            } else {
                toast.error("")
            }
        } else {
            setLoad(false)
            toast.error("Internal Server Error")
        }
    }
    async function fetchCityStateList() {
        setLoad(true)

        const response = await fetch(url + "get-city-by-state/" + state?.value)
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
                        "country_id": data.list[i].country_id,
                        "state_id": data.list[i].state_id
                    })
                }
                setCityList(arr)
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


    }, [])

    async function handleSubmit(e) {
        setLoad(true)
        e.preventDefault()

        let error = 0

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        if (type == 1) {
            formData.append("role", 4) // for refugee
        } else {
            formData.append("role", 5) // for job seeker
        }
        formData.append("dob", dob)
        formData.append("graduation", graduation)
        formData.append("whatsapp_number", whatsappnum)
        formData.append("gender", gender)
        formData.append("from_usa", fromUsa)
        formData.append("description", description)
        formData.append("zip_code", zipcode)
        formData.append('travelby', travelBy)
        formData.append('sponsorcategory', sponsorCategory)
        formData.append('maritialStatus', maritialStatus)

        if (country?.value) {
            formData.append("country_id", country?.value)
            formData.append("country_name", country?.label)
            formData.append("country_code", country?.phoneCode)
        } else {
            error = error + 1
        }

        if (state?.value) {
            formData.append("state_id", state?.value)
            formData.append("state_name", state?.label)
        } else {
            error = error + 1
        }

        if (city?.value) {
            formData.append("city_id", city?.value)
            formData.append("city_name", city?.label)
        } else {
            error = error + 1
        }

        if (photo?.name) {
            formData.append("image", photo, photo?.name)
        }

        if (passport?.name) {
            formData.append("passport", passport, passport?.name)
        }



        if (hobby.length > 0) {
            formData.append("hobby", Array.prototype.map.call(hobby, s => s.label).toString())
        }

        if (skills.length > 0) {
            formData.append("skills", Array.prototype.map.call(skills, s => s.label).toString())
        }

        if (error == 0) {
            const response = await fetch(url + 'register-refugee', {
                method: 'POST',
                body: formData
            });

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();

                if (data.status == 200) {
                    toast.success(data.message)
                } else {
                    toast.error(data?.message)
                }
            }
        } else {
            toast.error("Please fill country")
        }

    }

    useEffect(() => {
        if (country?.value) {
            setState("")
            setCity("")
            fetchStateCountryList().catch(err => {
                setLoad(false)
                toast.error(err.message)
            })
        }
    }, [country])
    useEffect(() => {
        if (state?.value) {
            setCity("")
            fetchCityStateList().catch(err => {
                setLoad(false)
                toast.error(err.message)
            })
        }
    }, [state])

    return (
        <div>
            <div className='signup-both-div'>
                <section className="h-custom" style={{ backgroundColor: '#0061df08' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-8">
                                <div className="card rounded-3">
                                    <div className='d-flex align-items-center justify-content-center mt-1'>
                                        <img src='/assets/images/newLogo.png' style={{ width: '19rem' }} />
                                    </div>
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4">Sign up to find {type == 1 ? 'Sponsor' : 'work you love'}</h3>

                                        <form onSubmit={(e) => handleSubmit(e)}>

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

                                                <Select className='col-md-6 mb-3'
                                                    options={countrylist}
                                                    placeholder='Select Country'
                                                    value={country} required onChange={setCountry}
                                                />

                                                <Select className='col-md-6 mb-3'
                                                    options={statelist}
                                                    placeholder='Select State'
                                                    value={state} required onChange={setState}
                                                />

                                                <Select className='col-md-6 mb-3'
                                                    options={citylist}
                                                    placeholder='Select City'
                                                    value={city} required onChange={setCity}
                                                />

                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="text"
                                                            placeholder=" "
                                                            id='zip_code'
                                                            autoComplete="off"
                                                            required
                                                            value={zipcode}
                                                            onChange={e => setZipcode(e.target.value)}
                                                        />
                                                        <label for="name" class="inner-label">ZIP Code</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <select required value={maritialStatus} onChange={e => setMaritialStatus(e.target.value)} className='innner-input form-control'>
                                                            <option value=''>Select Maritial Status</option>
                                                            <option value='Single'>Single</option>
                                                            <option value='Married'>Married</option>
                                                            <option value='Divorced'>Divorced</option>
                                                            <option value='Widowed'>Widowed</option>
                                                            <option value='Legally Seperated'>Legally Seperated</option>
                                                            <option value='Marriage Annuled'>Marriage Annuled</option>
                                                            <option value='Other'>Other</option>
                                                        </select>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                <div className='filter-form-MUI-calendar col-md-6 mb-3'>
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
                                                    placeholder='Select Skills (You can choose multiple)'
                                                    required
                                                    value={skills} onChange={setSkills}
                                                />

                                                <Select className='col-md-6 mb-3'
                                                    options={hobbyslist}
                                                    isMulti={true}
                                                    placeholder='Select Hobbies (You can choose multiple)'
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

                                                {type == 1 && <>
                                                    <div className="filter-form-MUI-input-text col-md-6">
                                                        <main class="input-div">
                                                            <input
                                                                required
                                                                class="inner-input"
                                                                type="file"
                                                                placeholder=" "
                                                                id='name'
                                                                autoComplete="off"
                                                                onChange={e => setPassport(e.target.files[0])}
                                                            />
                                                            <label for="name" class="inner-label">Upload Passport Photo</label>
                                                            {/* <span className='required'>*Required</span> */}
                                                        </main>

                                                        {/* <span className='error'>it is span tag</span> */}
                                                    </div>


                                                    <div className="filter-form-MUI-input-text col-12 mt-2">
                                                        <p className='font-weight-bold'>Will you travel by yourself or with children under 18</p>
                                                        <div className="d-flex align-items-center">
                                                            <input type="radio" name="travelby" id="form-checkbox-1" onChange={() => setTravelBy('1')} />
                                                            <label className='ms-2' htmlFor="form-checkbox-1">Travelling by my self</label>
                                                        </div>
                                                        <div className="d-flex align-items-center mt-2">
                                                            <input type="radio" name="travelby" id="form-checkbox-1" onChange={() => setTravelBy('2')} />
                                                            <label className='ms-2' htmlFor="form-checkbox-1">If traveling with children under 18 or Traveling with others: You must fill out a form for each</label>
                                                        </div>
                                                    </div>

                                                    <div className="filter-form-MUI-input-text col-12 mt-2">
                                                        <p className='font-weight-bold'>What Category of Sponsor do You Need?</p>
                                                        <div className="d-flex align-items-center">
                                                            <input type="radio" name="sponsorCategory" id="form-checkbox-1" onChange={() => setSponsorCategory('1')} />
                                                            <label className='ms-2' htmlFor="form-checkbox-1">
                                                                Passive Sponsor: 0 Financial Commitment Needed from Sponsor. For Example, your family or friend in the United States does not have enough income to sponsor you. If you are approved, your family or friend in that country will take full responsibility for you including housing. The sponsor has no financial commitment or obligation toward you.
                                                            </label>
                                                        </div>
                                                        <div className="d-flex align-items-center mt-2">
                                                            <input type="radio" name="sponsorCategory" id="form-checkbox-1" onChange={() => setSponsorCategory('2')} />
                                                            <label className='ms-2' htmlFor="form-checkbox-1">
                                                                Active Sponsor: A sponsor in host country willing to offer full accommodation to beneficiary in his home and help him integrate into the community where he lives to find a job and own living arrangement until the beneficiary can be self-sufficient. The sponsor will conduct an interview with you and make a decision.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </>}

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
                                                        <label for="name" class="inner-label">{type == 1 ? 'Tell us more about yourself,your circumstances & why you need a sponsor?' : 'Tell us more about yourself'} </label>
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

                                                {/* <div className='filter-form-MUI-radio-btn custom-MUI-radio-btn col-md-6'>
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
                                                    <span className='error'>span tag</span>
                                                </div> */}
                                            </div>

                                            <p className='mt-3 text-muted'>By adding phone number you are agree to recieve periodic updates and communications from our strategic partner</p>

                                            {type == 1 && <>
                                                <p className='text-muted'>Note: Admerk Corp. Inc. provide this platform to connect sponsor with refugees worldwide and do not conduct background check on the users of the platform. It is the responsibilities of participants to conduct their due diligence before making any final decision or commitment.</p>
                                                <p className='text-muted'><strong>Terms and Conditions</strong>
                                                    <br />
                                                    Disclaimer: In filling out this form, we are not providing any guaranteed results, offering any promise or timeline. We are doing our best to reach out to compassionate or humanitarian individuals worldwide willing to offer a helping hand to a person in need.

                                                    When you click on "Submit" below, you give us permission to share your information to work with individuals, organizations or businesses in our effort to connect you with a potential sponsor in USA.  Admerk Corp Inc reserves the right to update and expand their terms and conditions.</p>
                                            </>}

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