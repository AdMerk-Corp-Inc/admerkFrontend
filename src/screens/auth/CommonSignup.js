import React from 'react'
import { Link } from 'react-router-dom';

function CommonSignup() {
    return (
        <div className='common-signup-div container d-flex justify-content-center align-items-center'>
            <div>
                <div className='d-flex align-items-center justify-content-center mb-5'>
                    <img src='/assets/images/newLogo.png' style={{ width: '19rem' }} />
                </div>
                <h2 className='text-center'>Join As A Company/Sponsor Or Job Seeker/Refugee</h2>

                <div className='row'>
                    <div className='col-sm-3'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/images/company.png" alt="" />
                            <h3 className='text-center'>Companies Hiring</h3>
                        </div>

                        <Link className='a-btn' to="/signup-sponser?type=1">Post Free Job Now <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i></Link>
                    </div>
                    <div className='col-sm-3'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/images/hiring.png" alt="" />
                            <h3 className='text-center'>Sponsor</h3>
                        </div>

                        <Link className='a-btn' to="/signup-sponser?type=2">Lend A Helping Hand <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i></Link>
                    </div>

                    <div className='col-sm-3'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/images/helpinghand.png" alt="" />
                            <h3 className='text-center'>Refugee</h3>
                        </div>

                        <Link className='a-btn' to="/signup-refugee?type=1">looking For Sponsor <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i></Link>
                    </div>
                    <div className='col-sm-3'>
                        <div className="col-md-12 inner-card">
                            <img src="/assets/images/cv.png" alt="" />
                            <h3 className='text-center'>Job Seekers</h3>
                        </div>

                        <Link className='a-btn' to="/signup-refugee?type=2">Looking For Job<i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i></Link>
                    </div>
                </div>

                <h6 className='font-weight-normal mt-4 text-center'>Post Resume Free! <a style={{ textDecoration: 'underline' }} href="/login">Sign in</a></h6>
            </div>
        </div>
    )
}

export default CommonSignup;