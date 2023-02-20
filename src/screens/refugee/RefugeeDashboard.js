import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function RefugeeDashboard() {
  return (
    <section className="account-detail-page" style={{ backgroundColor: '#0061df08' }}>
      <div className="container p-5 h-100">
        {/*  code start for refugee card */}
        <div className="card rounded-3">
          <h3 className='ms-3 mt-3'>Current Job Opening</h3>

          {/* carousel */}
          <div className='my-2'>
            <OwlCarousel className='owl-theme' items={1} loop margin={10} nav>
              <div class='item carousel-job-card'>
                <img className='img-fluid' src='/assets/images/c1.jpeg' />
              </div>
              <div class='item carousel-job-card'>
                <img className='img-fluid' src='/assets/images/c2.png' />
              </div>
            </OwlCarousel>
          </div>

          {/* cards */}
          <div className='p-5'>
            <div className='row w-100'>
              <div className='col-md-4 count-card'>
                <p>01</p>
                <p className='fw-bold'>Active Jobs</p>
                <i className='fa fa-map-o dashboard__cardIcon'></i>
              </div>
            </div>

            <hr />

            <p className='fw-bold'>Job Application History</p>

            <div className='row'>
              <div className='col-md-6'>
                <table className='table table-bordered'>
                  <thead>
                    <th>#</th>
                    <th>Date</th>
                    <th>title</th>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
              <div className='col-md-6'>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RefugeeDashboard