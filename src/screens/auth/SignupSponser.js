import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { userContext } from '../../context/UserContext';
import { url } from '../../Helper/Helper';

function SignupSponser() {
    const {user,setUser} = useContext(userContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [countrylist, setCountryList] = useState([])
    const [whatsappnum, setWhatsappNum] = useState('')

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

    }, [])

    async function handleSubmit(e) {
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
        }else{
            error = error + 1
        }

        if (error == 0){
            const response = await fetch(url + 'register-sponsor', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok == true) {
                const data = await response.json();
                console.log(data)
                if (data.status == 200) {
                    setUser(data?.user_data)
                    window.location = window.location.origin + "/sponsor-dashboard"
                } else {
                    toast.error(data?.message)
                }
            }
        }else{
            toast.error("Please fill country")
        }

    }

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
                                    <h3 className="mb-4">Sign up to help refugee</h3>

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

                                            <Select className='col-md-6'
                                                options={countrylist}
                                                placeholder='Select Country'
                                                required
                                                value={country} onChange={setCountry}
                                            />

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