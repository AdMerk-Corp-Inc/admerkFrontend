import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import Pagination from '../../component/Pagination';
import { url } from '../../Helper/Helper';

function SponsorDashboard() {

    const [skills, setSklls] = useState('')
    const [skillslist, setSkillsList] = useState([])
    const [hobby, setHobby] = useState('')
    const [hobbyslist, setHobbyList] = useState([])
    const [country, setCountry] = useState('')
    const [countrylist, setCountryList] = useState([])


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
                                        isMulti={true}
                                        placeholder='Select Skills'
                                        value={skills} onChange={setSklls}
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
                                        isMulti={true}
                                        placeholder='Select Hobby'
                                        value={hobby} onChange={setHobby}
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
                                        <input type="checkbox" class="form-check-input" id="male" />
                                        <label class="form-check-label" for="male">Male</label>
                                    </div>

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="female" />
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
                                        isMulti={true}
                                        placeholder='Select Country'
                                        value={country} onChange={setCountry}
                                    />
                                    {/* <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="insider" />
                                        <label class="form-check-label" for="insider">From USA</label>
                                    </div>

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="outside" />
                                        <label class="form-check-label" for="outside">Outside Of USA</label>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-9'>
                    <div className='refugee-cards'>
                        <div class="input-group px-4 py-3 border-bottom search-div">
                            <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
                        </div>

                        <a className='refugee-single-card px-4 py-4 text-decoration-none d-block' href=''>
                            <div className='d-flex align-items-center avatar-div'>
                                <img src="/assets/images/no-user.png" alt="" />
                                <div>
                                    <h5>Yahya japan</h5>
                                    <p>yahyajapan.yj@gmail.com</p>
                                    <span>India</span>
                                </div>
                            </div>

                            <p className='mb-0 mt-4'>Lorem ipsum  quia repellat quis dolores, doloribus error consequuntur reprehenderit aut facere natus, impedit laboriosam temporibus similique alias eos eaque fugiat, asperiores necessitatibus quas inventore dolorum dolore. At quidem ullam deserunt architecto.</p>
                        </a>
                    </div>

                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default SponsorDashboard;