import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';
import { node_url, url } from '../Helper/Helper';

function AccountProfile() {
  const [user, setUser] = useState('')

  const contextData = useContext(userContext)

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const id = useQuery().get('id');

  useEffect(() => {

    if (id) {
      async function fetchDetail() {
        contextData.setLoad(true)
        const response = await fetch(url + 'user-detail/' + id, {
          headers: {
            'Authorization': `Bearer ${contextData?.user?.token}`
          }
        });

        if (response.ok == true) {
          contextData.setLoad(false)
          const data = await response.json()

          console.log(data)
          if (data.status == 200) {
            setUser(data?.detail)
          } else {
            toast.error(data.message)
          }

        } else {
          contextData.setLoad(false)
          toast.error('Internal Server Error')
        }

      }

      fetchDetail();
      contextData.setLoad(false)
    } else {
      setUser(contextData.user)
    }
  }, [])

  return (
    <section className="account-detail-page" style={{ backgroundColor: '#0061df08' }}>
      <div className="container-xl py-5 px-3 px-md-5 h-100">
        {/*  code start for refugee card */}
        <div className="card rounded-3">
          <div className="card-body p-4 p-lg-5">
            <div className='d-lg-none d-flex justify-content-end mb-4'>
              {!id && <a className='custom-sm-btn btn mt-0' href='/edit-profile'><i class="fa fa-pencil me-1 text-white" aria-hidden="true"></i> Edit</a>}
              {(id && user?.whatsapp_number) && <a className='custom-sm-btn btn mt-0' href={`https://wa.me/+${user?.country_code}${user?.whatsapp_number}`}><i class="fa-brands fa-whatsapp me-1 text-white" aria-hidden="true"></i> Contact On Whatsapp</a>}
            </div>

            <div className='d-flex justify-content-between align-items-start'>
              <div className='d-sm-flex align-items-center'>
                {user?.profile_photo ? <img className="img-size rounded" src={`${node_url}${user?.profile_photo}`} alt="Sample photo" /> :
                  <img className="img-size rounded" src='/assets/images/nouser.jpg' />
                }


                <div className='ms-0 ms-sm-4 ms-md-5 mt-4 mt-sm-0'>
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
                    <span className='styling_country font_color'>{user?.whatsapp_number ? `+${user?.country_code} ${user?.whatsapp_number}` : 'NA'}</span>
                  </div>
                </div>
              </div>

              <div className='d-none d-lg-block'>
                {!id && <a className='custom-sm-btn btn mt-0' href='/edit-profile'><i class="fa fa-pencil me-1 text-white" aria-hidden="true"></i> Edit</a>}
                {(id && user?.whatsapp_number) && <a className='custom-sm-btn btn mt-0' href={`https://wa.me/+${user?.country_code}${user?.whatsapp_number}`}><i class="fa-brands fa-whatsapp me-1 text-white" aria-hidden="true"></i> Contact On Whatsapp</a>}
              </div>
            </div>

            <div className='row mt-4 mt-sm-5'>
              <div className='col-md-4 col-sm-6'>
                <h5 className=' heading'>My Graduation</h5>
                <span className='text-secondary '>{user?.graduation}</span>
              </div>

              <div className='col-md-4 col-sm-6 mt-4 mt-sm-0'>
                <h5 className=' heading'>Gender</h5>
                <span className='text-secondary text-capitalize'>{user?.gender}</span>
              </div>

              {/* <div className='col-md-4'>
                <h5 className=' heading'>From</h5>
                <div className='d-flex align-items-center'>
                  <span className='text-secondary '>USA</span>

                  {user?.from_usa == 1 ? <i class="fa fa-check" aria-hidden="true"></i> :
                    <i class="fa fa-times" aria-hidden="true"></i>
                  }
                </div>
              </div> */}
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className='heading mb-3'>My Skills</h5>
              <div className='d-flex flex-wrap'>
                {user?.skills?.split(',')?.map((item, index) => <span key={index}>{item}</span>)}
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Hobbies</h5>
              <div className='d-flex flex-wrap'>
                {user?.hobby?.split(',')?.map((item, index) => <span>{item}</span>)}
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Description</h5>
              <p className='text-secondary mb-0'>{user?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default AccountProfile;

