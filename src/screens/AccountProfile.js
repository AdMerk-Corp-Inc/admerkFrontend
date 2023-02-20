import React, { useContext, useEffect } from 'react'
import Select from 'react-select';
import { userContext } from '../context/UserContext';

function AccountProfile() {

  const { user } = useContext(userContext)

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <section className="account-detail-page" style={{ backgroundColor: '#0061df08' }}>
      <div className="container p-5 h-100">
        {/*  code start for refugee card */}
        <div className="card rounded-3">
          <div className="card-body p-5 p-md-5">
            <div className='d-flex align-items-center'>
              <img className="img-size rounded" src="https://reactjs.org/logo-og.png" alt="Sample photo" />

              <div className='ms-5'>
                <div className='d-flex'>
                  <h3 className='styling_name text-capitalize'>{user?.name}</h3>

                  <div className='d-flex align-self-center ml_countryname'>
                    <i className="fa-sharp fa-solid fa-location-dot"></i>
                    <span className='styling_country ps-2'>{user?.country_name}</span>
                  </div>
                </div>

                <div className=' py-2'>
                  <i class="fa-solid fa-envelope"></i>
                  <span className='styling_country font_color'>{user?.email}</span>
                </div>

                <div className=' py-2'>
                  <i class="fa-solid fa-cake-candles"></i>
                  <span className='styling_country font_color'>{new Date(user?.dob).toDateString()}</span>
                </div>

                <div className=' py-2'>
                  <i class="fa-brands fa-whatsapp"></i>
                  <span className='styling_country font_color'>{user?.whatsapp_number}</span>
                </div>
              </div>
            </div>

            <div className='row mt-5'>
              <div className='col-md-4'>
                <h5 className=' heading'>My Graduation</h5>
                <span className='text-secondary '>{user?.graduation}</span>
              </div>

              <div className='col-md-4'>
                <h5 className=' heading'>Gender</h5>
                <span className='text-secondary text-capitalize'>{user?.gender}</span>
              </div>

              <div className='col-md-4'>
                <h5 className=' heading'>From</h5>
                <div className='d-flex align-items-center'>
                  <span className='text-secondary '>USA</span>
                  
                  {user?.from_usa == 1 ? <i class="fa fa-check" aria-hidden="true"></i> :
                    <i class="fa fa-times" aria-hidden="true"></i>
                  }
                </div>
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className='heading mb-3'>My Skills</h5>
              <div className='d-flex'>
                <span>Branding</span>
                <span>UI/UX</span>
                <span>Web Design</span>
                <span>Packaging</span>
                <span>Print and Editorial</span>
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Hobbies</h5>
              <div className='d-flex'>
                <span>Branding</span>
                <span>UI/UX</span>
                <span>Web Design</span>
                <span>Packaging</span>
                <span>Print and Editorial</span>
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

