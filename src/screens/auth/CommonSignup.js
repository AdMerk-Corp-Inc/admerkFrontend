import React from 'react'
import { Link } from 'react-router-dom';

function CommonSignup() {
    return (
        <div className='common-signup-div container d-flex justify-content-center align-items-center'>
            <div>
                <h2 className='text-center'>Join as a Sponsor or Refugee</h2>

                <div className='row'>
                    <div className='col-md-6'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/images/hiring.png" alt="" />
                            <h3 className='text-center'>I am sponsor, looking for hiring</h3>
                        </div>

                        <Link className='a-btn' to="/signup-sponser">Signup as sponsor <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i></Link>
                    </div>

                    <div className='col-md-6'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/images/cv.png" alt="" />
                            <h3 className='text-center'>I am a refugee, looking for job</h3>
                        </div>

                        <Link className='a-btn' to="/signup-refugee">Signup as refugee <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i></Link>
                    </div>
                </div>

                <h6 className='font-weight-normal mt-4 text-center'>Already have an account? <a style={{textDecoration: 'underline'}} href="/login">Sign in</a></h6>
            </div>
        </div>
    )
}

export default CommonSignup;