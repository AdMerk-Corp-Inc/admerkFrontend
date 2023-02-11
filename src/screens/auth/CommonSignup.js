import React from 'react'

function CommonSignup() {
    return (
        <div className='common-signup-div container d-flex justify-content-center align-items-center'>
            <div>
                <h2 className='text-center'>Join as a Sponsor or Refugee</h2>

                <div className='row'>
                    <div className='col-md-6'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/hiring.png" alt="" />
                            <h3 className='text-center'>I am sponsor, looking for hiring</h3>
                        </div>

                        <a className='a-btn' href="">Signup as sponsor <i class="fa fa-long-arrow-right ml-3" aria-hidden="true"></i></a>
                    </div>

                    <div className='col-md-6'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/cv.png" alt="" />
                            <h3 className='text-center'>I am a refugee, looking for job</h3>
                        </div>

                        <a className='a-btn' href="">Signup as refugee <i class="fa fa-long-arrow-right ml-3" aria-hidden="true"></i></a>
                    </div>
                </div>

                <h6 className='font-weight-normal mt-4 text-center'>Already have an account? <a style={{textDecoration: 'underline'}} href="">Sign in</a></h6>
            </div>
        </div>
    )
}

export default CommonSignup;