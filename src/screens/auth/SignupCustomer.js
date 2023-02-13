import React from 'react'
import Select from 'react-select';

function SignupCustomer() {

    const options = [
        { value: 'web development', label: 'web development' },
        { value: 'app development', label: 'app development' },
        { value: 'copy writing', label: 'copy writing' },
    ];

    return (
        <div>
            <div className='signup-both-div'>
                <section className="h-custom" style={{ backgroundColor: '#8fc4b7' }}>
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

                                        <form>
                                            <div className="filter-form-MUI-input-text">
                                                <main class="input-div">
                                                    <input
                                                        class="inner-input"
                                                        type="text"
                                                        placeholder=" "
                                                        id='name'
                                                        autoComplete="off"
                                                    />
                                                    <label for="name" class="inner-label">Name</label>
                                                    {/* <span className='required'>*Required</span> */}
                                                </main>

                                                {/* <span className='error'>it is span tag</span> */}
                                            </div>
                                            <div className='row'>

                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="text"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                        />
                                                        <label for="name" class="inner-label">Email</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                {/* <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="text"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                        />
                                                        <label for="name" class="inner-label">Company Name</label>
                                                        <span className='required'>*Required</span>
                                                    </main>

                                                    <span className='error'>it is span tag</span>
                                                </div> */}

                                                <div class="filter-form-MUI-input-text col-md-6">
                                                    <main className='input-div'>
                                                        <select class="form-control inner-input" id="exampleFormControlSelect1">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </select>
                                                        <label class="inner-label">Select Country</label>
                                                    </main>
                                                </div>

                                                <div className='filter-form-MUI-calendar col-md-6'>
                                                    <main className='input-div'>
                                                        <input className='inner-input' type="date" id='calendar' placeholder="DOB" />
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
                                                        />
                                                        <label for="name" class="inner-label">Enter Graduation</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                <Select className='col-md-6'
                                                    options={options}
                                                    isMulti={true}
                                                    placeholder='Select Skills'
                                                />

                                                <Select className='col-md-6'
                                                    options={options}
                                                    isMulti={true}
                                                    placeholder='Select Hobby'
                                                />

                                                <div className="filter-form-MUI-input-text col-md-6">
                                                    <main class="input-div">
                                                        <input
                                                            class="inner-input"
                                                            type="file"
                                                            placeholder=" "
                                                            id='name'
                                                            autoComplete="off"
                                                        />
                                                        <label for="name" class="inner-label">Upload Profile Photo</label>
                                                        {/* <span className='required'>*Required</span> */}
                                                    </main>

                                                    {/* <span className='error'>it is span tag</span> */}
                                                </div>

                                                <div className='filter-form-MUI-radio-btn custom-MUI-radio-btn col-md-6'>
                                                    <label className='form-check-label'>Select Gender:</label>
                                                    <div className='d-flex mt-2'>
                                                        <div className='d-flex align-items-center'>
                                                            <input
                                                                name="group1"
                                                                type='radio'
                                                                id='inline-radio-2'
                                                            />
                                                            <label className='mb-0 ms-2'>Male</label>
                                                        </div>

                                                        <div className='d-flex align-items-center ms-4'>
                                                            <input
                                                                name="group1"
                                                                type='radio'
                                                                id='inline-radio-2'
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
                                                                name="group1"
                                                                type='radio'
                                                                id='inline-radio-2'
                                                            />
                                                            <label className='mb-0 ms-2'>Yes</label>
                                                        </div>

                                                        <div className='d-flex align-items-center ms-4'>
                                                            <input
                                                                name="group1"
                                                                type='radio'
                                                                id='inline-radio-2'
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