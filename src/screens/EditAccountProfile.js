import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { url } from '../Helper/Helper';

function EditAccountProfile() {

    const { user } = useContext(userContext)

    useEffect(() => {
        async function fetchDetail() {
            const response = await fetch(url + 'user-detail' + user?.id, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (response.ok == true) {
                const data = await response.json()

                console.log(data)
                if (data.status == 200) {

                } else {
                    toast.error(data.message)
                }

            } else {
                toast.error('Internal Server Error')
            }

        }

        fetchDetail();
    }, [])

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
                                    <h3 className="mb-4">Sign up to find work you love</h3>

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
    )
}

export default EditAccountProfile;