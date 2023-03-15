import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { userContext } from '../../context/UserContext';
import { url } from '../../Helper/Helper';

function SignupSponser() {
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
    const [whatsappnum, setWhatsappNum] = useState('')
    const [adult, setAdult] = useState(false)
    const [citizen, setCitizen] = useState(false)
    const [sponsorGroup, setSponsorGroup] = useState("individual")
    const [sponsorCategory, setSponsorCategory] = useState([])
    const [zipcode, setZipcode] = useState("")

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const type = useQuery().get('type');

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

    }, [])

    async function handleSubmit(e) {
        setLoad(true)
        e.preventDefault()
        let error = 0

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("role", 3)
        formData.append("whatsapp_number", whatsappnum)
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
        formData.append("zip_code", zipcode)

        if (type == "2") {
            formData.append("user_type", "2")
            formData.append("18+", adult)
            formData.append("citizenship", citizen)
            formData.append("sponsor_group", sponsorGroup)
            formData.append("sponsor_cartegory", sponsorCategory.toString())
        } else {
            formData.append("user_type", "1")
        }

        if (error == 0) {
            const response = await fetch(url + 'register-sponsor', {
                method: 'POST',
                body: formData
            });

            if (response.ok == true) {
                setLoad(false)
                const data = await response.json();
                console.log(data)
                if (data.status == 200) {
                    toast.success(data.message)
                    setTimeout(() => {window.location.reload()}, 2500)
                } else {
                    toast.error(data?.message)
                }
            }
        } else {
            setLoad(false)
            toast.error("Please fill Data")
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
                                    <h3 className="mb-4">Sign Up {type == "2" ? "As Sponsor" : "To Post Job"}</h3>

                                    <form onSubmit={e => handleSubmit(e)}>

                                        <div className='row'>

                                            <div className="filter-form-MUI-input-text col-md-6">
                                                <main class="input-div">
                                                    <input
                                                        class="inner-input"
                                                        type="text"
                                                        id='name'
                                                        autoComplete="off"
                                                        required
                                                        value={name}
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
                                                        required
                                                        value={password}
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
                                                        required
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                    <label for="name" class="inner-label">Email</label>
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
                                                        required
                                                        value={whatsappnum}
                                                        onChange={e => setWhatsappNum(e.target.value)}
                                                    />
                                                    <label for="name" class="inner-label">WhatsApp Number</label>
                                                    {/* <span className='required'>*Required</span> */}
                                                </main>

                                                {/* <span className='error'>it is span tag</span> */}
                                            </div>

                                            <Select className='col-md-6 mb-3'
                                                options={countrylist}
                                                placeholder='Select Country'
                                                required
                                                value={country} onChange={setCountry}
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
                                            {
                                                type == "2" &&
                                                <>
                                                    <div className="filter-form-MUI-input-text col-md-6">
                                                        <p className='mb-1 font-weight-bold'>I am 18 years of age or older</p>
                                                        <div className="d-flex align-items-center">
                                                            <div className="me-4">
                                                                <input type="radio" name="input-18" className='me-2' id="18-yes" onChange={() => setAdult(true)} />
                                                                <label htmlFor="18-yes">Yes</label>
                                                            </div>
                                                            <div className="">
                                                                <input type="radio" name="input-18" className='me-2' id="18-no" onChange={() => setAdult(false)} />
                                                                <label htmlFor="18-no">No</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="filter-form-MUI-input-text col-md-6">
                                                        <p className='mb-1 font-weight-bold'>I am a citizen, permanent resident, or have other lawful status in my country</p>
                                                        <div className="d-flex align-items-center">
                                                            <div className="me-4">
                                                                <input type="radio" name="input-citizen" className='me-2' id="citizen-yes" onChange={() => setCitizen(true)} />
                                                                <label htmlFor="citizen-yes">Yes</label>
                                                            </div>
                                                            <div className="">
                                                                <input type="radio" name="input-citizen" className='me-2' id="citizen-no" onChange={() => setCitizen(false)} />
                                                                <label htmlFor="citizen-no">No</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="filter-form-MUI-input-text col-md-6">
                                                        <p className='mb-1 font-weight-bold'>Do you prefer to sponsor an individual or family group?</p>
                                                        <div className="d-flex align-items-center">
                                                            <div className="me-4">
                                                                <input type="radio" name="input-family-group" className='me-2' id="family-group-indi" checked={sponsorGroup == 'individual' ? true : false} onChange={() => setCitizen("individual")} />
                                                                <label htmlFor="family-group-indi">Individual</label>
                                                            </div>
                                                            <div className="">
                                                                <input type="radio" name="input-family-group" className='me-2' id="family-group-whole" onChange={() => setCitizen("family")} />
                                                                <label htmlFor="family-group-whole">Family Group</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="filter-form-MUI-input-text col-12 mt-2">
                                                        <p className='font-weight-bold'>Which Category of Sponsor do you want to provide? (Can Select Multiple Options)</p>
                                                        <div className="d-flex align-items-start">
                                                            <input type="checkbox" name="" className='me-2' id="form-checkbox-1" style={{ width: "80px", height: "23px" }} onChange={() => {
                                                                let args = 1
                                                                let result = sponsorCategory.filter(item => item == args)

                                                                if (result.length > 0) {
                                                                    setSponsorGroup(sponsorCategory.filter(item => item != args))
                                                                } else {
                                                                    let prev_arr = sponsorCategory
                                                                    prev_arr.push(args)
                                                                }
                                                            }} />
                                                            <label htmlFor="form-checkbox-1">1. Passive Sponsor: "0" Financial Commitment on Sponsor. The Host family in USA lack income to sponsor someone in Haiti. If the I-134A application is approved, the Host family will assume full responsibilities for the beneficiary/refugee. The Sponsor has "0" financial commitment and obligation toward beneficiary/refugee except the time to fill out the USCIS Form I-134A.</label>
                                                        </div>
                                                        <div className="d-flex align-items-start mt-2">
                                                            <input type="checkbox" name="" className='me-2' id="form-checkbox-2" style={{ width: "80px", height: "23px" }}
                                                                onChange={() => {
                                                                    let args = 2
                                                                    let result = sponsorCategory.filter(item => item == args)

                                                                    if (result.length > 0) {
                                                                        setSponsorGroup(sponsorCategory.filter(item => item != args))
                                                                    } else {
                                                                        let prev_arr = sponsorCategory
                                                                        prev_arr.push(args)
                                                                    }
                                                                }}
                                                            />
                                                            <label htmlFor="form-checkbox-2">2. Passive Sponsor: "0" Financial Commitment on Sponsor. The beneficiary/refugee has no family in Sponsor’s country but has friend who can offer them temporary shelter until they find a job to become self sufficient in 1 to 2 months. The Sponsor has "0" financial commitment and obligation toward beneficiary except the time to fill out the USCIS Form I-134A.</label>
                                                        </div>
                                                        <div className="d-flex align-items-start mt-2">
                                                            <input type="checkbox" name="" className='me-2' id="form-checkbox-3" style={{ width: "80px", height: "23px" }}
                                                                onChange={() => {
                                                                    let args = 3
                                                                    let result = sponsorCategory.filter(item => item == args)

                                                                    if (result.length > 0) {
                                                                        setSponsorGroup(sponsorCategory.filter(item => item != args))
                                                                    } else {
                                                                        let prev_arr = sponsorCategory
                                                                        prev_arr.push(args)
                                                                    }
                                                                }}
                                                            />
                                                            <label htmlFor="form-checkbox-3">3. Active Sponsor: Sponsor that can offer room and board (Volontary Choice: Due Diligence Should Be Conducted). Strongly recommend that the Sponsor conduct interview potential beneficiary/refugee before making a decision. The Sponsor must be willing to help the beneficiary/refugee integrate in local community and find a job to achieve self-sufficiency within 2 to 3 months.</label>
                                                        </div>
                                                    </div>
                                                </>
                                            }
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
    )
}

export default SignupSponser;