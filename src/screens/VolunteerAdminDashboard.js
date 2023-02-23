import React from 'react'


function VolunteerAdminDashboard() {





  return (

    <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
      <div className="container py-5 h-100">
        {/* <div className="card rounded-3"> */}

          <div className='row w-100 p-2'>
            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Refugee</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Sponsor</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Volunteer</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>
          </div>

          <div className='row w-100 p-2'>
            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Jobs</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Open Jobs</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Close Jobs</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>

          </div>
          <div className='row w-100 p-2'>
            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Tickets</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Open Tickets</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='count-card'>
                <p>01</p>
                <p className='fw-bold'>Total Close Tickets</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>

          </div>


        {/* </div> */}
      </div>
    </section>
  )
}

export default VolunteerAdminDashboard;