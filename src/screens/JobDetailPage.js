import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ApplyNewJob from '../component/ApplyNewJob';
import { userContext } from '../context/UserContext';
import { node_url, url } from '../Helper/Helper';

function JobDetailPage() {

  const [feeds, setFeeds] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const { user,setLoad } = useContext(userContext)

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const id = useQuery().get('id');


  async function fetchFeeds() {
    setLoad(true)
    const response = await fetch(url + 'job-details/' + id, {

      headers: {
        "Authorization": `Bearer ${user?.token}`
      },

    });

    if (response.ok == true) {
      setLoad(false)
      const data = await response.json();
      console.log(data)
      if (data.status == 200) {
        setFeeds(data?.detail)
      } else {
        toast.error(data?.message)
      }
    } else {
      setLoad(false)
      toast.error("Internal server error!")
    }
  }



  useEffect(() => {
    fetchFeeds()
    setLoad(false)
  }, [])


  return (
    <section className="account-detail-page" style={{ backgroundColor: '#0061df08' }}>
      <div className="container p-5 h-100">
        {/*  code start for refugee card */}
        <div className="card rounded-3">
          <div className="card-body p-5 p-md-5">
            <div className='d-flex justify-content-between align-items-start'>
              <div className='d-flex align-items-center'>
                <img className="img-size rounded" src={`${node_url}${feeds?.cover_picture}`} alt="Sample photo" />

                <div className='ms-5'>
                  <div className='d-flex'>
                    <h3 className='styling_name text-capitalize'>{feeds?.title}</h3>

                    <div className='d-flex align-self-center ml_countryname'>
                      <i className="fa-sharp fa-solid fa-location-dot"></i>
                      <span className='styling_country ps-2'>{feeds?.country_name}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* {!id && <a className='custom-sm-btn btn mt-0' href='/edit-profile'><i class="fa fa-pencil me-1 text-white" aria-hidden="true"></i> Edit</a>}
              {(id && user?.whatsapp_number) && <a className='custom-sm-btn btn mt-0' href={`https://wa.me/+${user?.country_code}${user?.whatsapp_number}`}><i class="fa-brands fa-whatsapp me-1 text-white" aria-hidden="true"></i>Apply Now</a>} */}
              <ApplyNewJob
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
              />
              <a className='custom-sm-btn btn mt-0' href='#' onClick={() => {
                setModalShow(true)
              }}  >Apply Now</a>
            </div>



            <div className='d-flex flex-column mt-5 skill-hobby'>
              <h5 className='heading mb-3'>Required Skills</h5>
              <div className='d-flex'>
                {feeds?.skills?.split(',')?.map((item, index) => <span key={index}>{item}</span>)}
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Hobbies</h5>
              <div className='d-flex'>
                {feeds?.hobby?.split(',')?.map((item, index) => <span>{item}</span>)}
              </div>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Work Type</h5>
              <p className='text-secondary mb-0'>{feeds?.work_type}</p>
            </div>

            <div className='d-flex flex-column mt-4 skill-hobby'>
              <h5 className=' heading'>Job Description</h5>
              <p className='text-secondary mb-0'>{feeds?.description}</p>
            </div>

           {
            feeds?.attachement &&  <div className='d-flex flex-column mt-4 skill-hobby'>
            <h5 className=' heading'>Attachment</h5>
            <p className='text-secondary mb-0'><a rel='download' target='_blank' href={`${node_url}${feeds?.attachement}`}>Click Here</a> To Check Job Instructions</p> 
          </div>
           }
          </div>
        </div>
      </div>
    </section>

  )
}

export default JobDetailPage