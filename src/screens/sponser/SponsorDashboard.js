import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import Pagination from '../../component/Pagination';
import { node_url, url } from '../../Helper/Helper';
import { userContext } from '../../context/UserContext'

function SponsorDashboard() {
    const { user } = useContext(userContext)
    const [skillslist, setSkillsList] = useState([])
    const [hobby, setHobby] = useState('')
    const [hobbyslist, setHobbyList] = useState([])
    const [country, setCountry] = useState('')
    const [countrylist, setCountryList] = useState([])
    const [feeds, setFeeds] = useState([])

    const [page, setPage] = useState(1)
    const [cskill, setCSkill] = useState("")
    const [chobby, setCHobby] = useState("")
    const [cCountry, setCCountry] = useState("")
    const [search, setSearch] = useState("")
    const [gender, setGender] = useState("")

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
                toast.error("Please Create Hobby First")
            }
        } else {

            toast.error("Internal Server Error")
        }
    }

    async function fetchCountry() {
        const response = await fetch(url + "country-list")
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

    async function fetchFeeds() {
        const formData = new FormData()
        formData.append("skill", cskill?.label ? cskill?.label : '')
        formData.append("hobby", chobby?.label ? chobby?.label : '')
        formData.append("country_id", cCountry?.value ? cCountry?.value : '')
        formData.append("page", page)
        formData.append("search", search)
        formData.append("gender", gender)

        const response = await fetch(url + 'fetch-home-feeds', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user?.token}`
            },
            body: formData
        });

        if (response.ok == true) {
            const data = await response.json();
            console.log(data)
            if (data.status == 200) {
                setFeeds(data?.list)
            } else {
                toast.error(data?.message)
            }
        } else {
            toast.error("Internal server error!")
        }
    }

    useEffect(() => {
        fetchFeeds()
    }, [page, search, gender, cskill, chobby, cCountry])



    return (
        <div className='sponsor-dashboard-div container my-5'>
            <div className='row'>
                <div className='col-md-3'>
                    <h5>Filter By</h5>

                    <div class="accordion" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    Skills
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                <div class="accordion-body">
                                    <Select
                                        options={skillslist}
                                        placeholder='Select Skills'
                                        value={cskill} onChange={setCSkill}
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                    Hobby
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                <div class="accordion-body">
                                    <Select
                                        options={hobbyslist}
                                        placeholder='Select Hobby'
                                        value={chobby} onChange={setCHobby}
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Gender
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                <div class="accordion-body">
                                    <div class="form-check">
                                        <input checked={gender == '' && true} onChange={()=>setGender("")} type="checkbox" class="form-check-input" />
                                        <label class="form-check-label" for="male">All</label>
                                    </div>

                                    <div class="form-check">
                                        <input checked={gender == 'male' && true} onChange={()=>setGender("male")} type="checkbox" class="form-check-input" id="male" />
                                        <label class="form-check-label" for="male">Male</label>
                                    </div>

                                    <div class="form-check">
                                        <input checked={gender == 'female' && true} onChange={()=>setGender("female")} type="checkbox" class="form-check-input" id="female" />
                                        <label class="form-check-label" for="female">Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                    Location
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                <div class="accordion-body">
                                    <Select
                                        options={countrylist}
                                        placeholder='Select Country'
                                        value={cCountry} onChange={setCCountry}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-9'>
                    <div className='refugee-cards'>
                        <div class="input-group px-4 py-3 border-bottom search-div">
                            <input value={search} onChange={e=>setSearch(e.target.value)} type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
                        </div>

                        {feeds?.length > 0 ? feeds.map((item, index) => (
                            <a key={index} className='refugee-single-card px-4 py-4 text-decoration-none d-block' href=''>
                                <div className='d-flex align-items-center avatar-div'>
                                    {item?.profile_photo ? <img src={`${node_url}${item?.profile_photo}`} alt="" /> : <img src="/assets/images/no-user.png" alt="" />}
                                    
                                    <div>
                                        <h5>{item?.name}</h5>
                                        <p>{item?.email}</p>
                                        <span>{item?.country_name}</span>
                                    </div>
                                </div>

                                <p className='mb-0 mt-4'>
                                    {item?.description}
                                </p>
                            </a>
                        )) : <p>No record found</p>}
                    </div>

                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    )
}

export default SponsorDashboard;