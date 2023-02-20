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
        const response = await fetch(url + 'user-detail/' + id, {
          headers: {
            'Authorization': `Bearer ${contextData?.user?.token}`
          }
        });

        if (response.ok == true) {
          const data = await response.json()

          console.log(data)
          if (data.status == 200) {
            setUser(data?.detail)
          } else {
            toast.error(data.message)
          }

        } else {
          toast.error('Internal Server Error')
        }

      }

      fetchDetail();
    } else {
      setUser(contextData.user)
    }
  }, [])

  return (
    <section className="account-detail-page" style={{ backgroundColor: '#0061df08' }}>
      <div className="container p-5 h-100">
        {/*  code start for refugee card */}
        <div className="card rounded-3">
          <div className="card-body p-5 p-md-5">
            <div className='d-flex justify-content-between align-items-start'>
              <div className='d-flex align-items-center'>
                <img className="img-size rounded" src={`${node_url}${user?.profile_photo}`} alt="Sample photo" />

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
                    <span className='styling_country font_color'>{user?.whatsapp_number ? `+${user?.country_code} ${user?.whatsapp_number}`  : 'NA'}</span>
                  </div>
                </div>
              </div>

              {!id && <a className='custom-sm-btn btn mt-0' href='/edit-profile'><i class="fa fa-pencil me-1 text-white" aria-hidden="true"></i> Edit</a>}
              {(id && user?.whatsapp_number) && <a className='custom-sm-btn btn mt-0' href={`https://wa.me/+${user?.country_code}${user?.whatsapp_number}`}><i class="fa-brands fa-whatsapp me-1 text-white" aria-hidden="true"></i> Contact Whatsapp</a>}
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
                {user?.skills?.split(',')?.map((item, index) => <span key={index}>{item}</span>)}
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Hobbies</h5>
              <div className='d-flex'>
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

