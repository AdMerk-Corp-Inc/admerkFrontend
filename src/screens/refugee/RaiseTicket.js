import React from 'react'
import CreateTicket from '../../component/CreateTicket';

function RaiseTicket() {

  const [modalShow, setModalShow] = React.useState(false);

  return (

    <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
      <div className="container py-5 h-100">
        <div className="card rounded-3">

          <div className='p-4 table-div'>
            <CreateTicket
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>25/12/2022</td>
                  <td>issues</td>
                  <td><span className='bg-danger px-2 py-1 rounded text-white'>Open</span></td>
                  <td><a href='javascript:void(0);' onClick={() => setModalShow(true)}><i class="fa-solid fa-eye text-primary"></i></a></td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>
      </div>
    </section>
  )
}

export default RaiseTicket;