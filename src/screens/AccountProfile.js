import React from 'react'
import Select from 'react-select';

function AccountProfile() {


  return (
    <section className="" style={{ backgroundColor: '#1e6fd9' }}>
      <div className="container p-5 h-100">

           {/*  code start for refugee card */}
        <div className="card rounded-3">
          <div className="card-body p-5 p-md-5">
            <div className='row'>
              <div className='col-md-4'>
                <img src="https://reactjs.org/logo-og.png"
                  className="img-size rounded"
                  alt="Sample photo" />
              </div>
              <div className='col-md-4 align-self-center'>
                <div className='d-flex flex-direction-row'>
                  <div>
                    <h3 className='styling_name'>Jeremy Rose</h3>
                  </div>
                  <div className='d-flex align-self-center ml_countryname'>
                    <i className="fa-sharp fa-solid fa-location-dot py-2"></i>
                    <span className='styling_country px-2'>New York, Nk</span>
                  </div>
                </div>
                <div className=' py-2 '>
                  <i class="fa-solid fa-envelope fs-5 text-primary"></i>
                  <span className='styling_country font_color text-secondary'>jeremyrose@gmail.com</span>
                </div>
                <div className=' py-2'>
                  <i class="fa-solid fa-cake-candles fs-5 text-danger"></i>
                  <span className='styling_country font_color text-secondary'>15/August/2000</span>
                </div>
                <div className=' py-2'>
                  <i class="fa-brands fa-square-whatsapp fs-5 text-success"></i>
                  <span className='styling_country font_color text-secondary'>+91-999999999</span>
                </div>
              </div>
            </div>

            <div className='row mt-5'>
              <div className='col-md-4'>
                <div>
                  <h5 className=' heading'>My Graduation</h5>
                  <span className='text-secondary '>Xyz College, Uk</span>
                </div>
                <div className='  d-flex flex-column mt-3'>
                  <h5 className=' heading'>My Skills</h5>
                  <span className='text-secondary '>Branding</span>
                  <span className='text-secondary '>UI/UX</span>
                  <span className='text-secondary '>Web Design</span>
                  <span className='text-secondary '>Packaging</span>
                  <span className='text-secondary '>Print and Editorial</span>
                </div>
                <div>
                  <h5 className=' heading mt-2'>From</h5>
                  <span className='text-secondary '>USA</span>
                </div>
              </div>
              <div className='col-md-4'>
                <div>
                  <h5 className=' heading'>Gender</h5>
                  <span className='text-secondary '>Male</span>
                </div>
                <div className='d-flex flex-column mt-3'>
                  <h5 className=' heading'>Hobbies</h5>
                  <span className='text-secondary '>Branding</span>
                  <span className='text-secondary '>UI/UX</span>
                  <span className='text-secondary '>Web Design</span>
                  <span className='text-secondary '>Packaging</span>
                  <span className='text-secondary '>Print and Editorial</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        {/*  code end for refugee card */}


        {/*  code start for spansor card */}

        {/* <div className="card rounded-3">
          <div className="card-body p-5">

            <div className='row'>
              <div className='col-md-4'>
              <div className='d-flex flex-direction-row'>
                  <div>
                    <h3 className='styling_name'>Jeremy Rose</h3>
                  </div>
                  <div className='d-flex align-self-center ml_countryname'>
                    <i className="fa-sharp fa-solid fa-location-dot py-2"></i>
                    <span className='styling_country px-2'>New York, Nk</span>
                  </div>
                </div>
                <div className=' py-2 '>
                  <i class="fa-solid fa-envelope fs-5 text-primary"></i>
                  <span className='styling_country font_color text-secondary'>jeremyrose@gmail.com</span>
                </div>
               
                <div className=' py-2'>
                  <i class="fa-brands fa-square-whatsapp fs-5 text-success"></i>
                  <span className='styling_country font_color text-secondary'>+91-999999999</span>
                </div>
                <div className='mt-5'>
                  <h5 className=' heading'>My Graduation</h5>
                  <span className='text-secondary '>Xyz College, Uk</span>
                </div>
                <div className='  d-flex flex-column mt-3'>
                  <h5 className=' heading'>My Skills</h5>
                  <span className='text-secondary '>Branding</span>
                  <span className='text-secondary '>UI/UX</span>
                  <span className='text-secondary '>Web Design</span>
                  <span className='text-secondary '>Packaging</span>
                  <span className='text-secondary '>Print and Editorial</span>
                </div>
                <div>
                  <h5 className=' heading mt-3'>From</h5>
                  <span className='text-secondary '>USA</span>
                </div>
                <div>
                  <h5 className=' heading mt-3'>Age Required</h5>
                  <span className='text-secondary '>18-24</span>
                </div>
              </div>
              <div className='col-md-4'>
                <div>
                  <h5 className=' heading'>Gender</h5>
                  <span className='text-secondary '>Male</span>
                </div>
                <div>
                  <h5 className=' heading mt-3'>Company Name</h5>
                  <span className='text-secondary '>Accer</span>
                </div>
                <div>
                  <h5 className=' heading mt-3'>Bussiness Type</h5>
                  <span className='text-secondary '>Individual</span>
                </div>
                <div className='d-flex flex-column mt-3'>
                  <h5 className=' heading'>Hobbies</h5>
                  <span className='text-secondary '>Branding</span>
                  <span className='text-secondary '>UI/UX</span>
                  <span className='text-secondary '>Web Design</span>
                  <span className='text-secondary '>Packaging</span>
                  <span className='text-secondary '>Print and Editorial</span>
                </div>
                
              </div>
            </div>
          </div>
        </div> */}

        {/*  code end for spansor card */}
      </div>
    </section>

  )
}

export default AccountProfile;

