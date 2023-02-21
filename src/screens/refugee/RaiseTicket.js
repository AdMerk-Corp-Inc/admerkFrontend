import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CreateTicket from '../../component/CreateTicket';
import { userContext } from '../../context/UserContext';
import { dateTransformer, url } from '../../Helper/Helper';

function RaiseTicket() {

  const { user } = useContext(userContext)
  const [modalShow, setModalShow] = useState(false);
  const [allTickets, setAllTickets] = useState([])
  const [ticketStatus, setTicketStatus] = useState('All')
  const [id, setId] = useState()

  async function fetchTickets() {
    let mainURL = 'all-tickets'
    if (ticketStatus != "All") {
      mainURL = mainURL + `?status=${ticketStatus}`
    }

    const response = await fetch(url + mainURL, {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      },
    })

    if (response.ok == true) {
      const data = await response.json()

      console.log(data)
      if (data.status == 200) {
        setAllTickets(data?.list)

      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Internal Server Error')
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [ticketStatus])

  return (

    <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
      <div className="container py-5 h-100">
        <div className="card rounded-3">

          <div className='p-4 table-div'>
            <CreateTicket
              show={modalShow}
              onHide={() => setModalShow(false)}
              id={id}
            />

            <div className='d-flex align-items-center justify-content-end status-filter-div mb-4'>
              <label className='me-3' htmlFor="">Ticket Status:</label>
              <select value={ticketStatus} onChange={(e) => setTicketStatus(e.target.value)} class="form-select form-select-sm" aria-label="Default select example">
                <option value='All'>All</option>
                <option value="1">Open</option>
                <option value="2">Closed</option>
              </select>
            </div>

            <table class="table table-hover">
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
                {allTickets?.length > 0 ? allTickets.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dateTransformer(item?.created_date)}</td>
                    <td>{item?.title}</td>
                    <td>{item?.status == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Open</span> : <span className='bg-danger px-2 py-1 rounded text-white'>Closed</span>}</td>
                    <td><a href='javascript:void(0);' onClick={() => {
                      setId(item?.id)
                      setModalShow(true)
                    }}><i class="fa-solid fa-eye text-primary"></i></a></td>
                  </tr>
                )) : <tr>
                  <td colSpan={5}>
                    <div className='not-found'>No Tickets Found</div>
                  </td>
                </tr>
                }


              </tbody>
            </table>

          </div>

        </div>
      </div>
    </section>
  )
}

export default RaiseTicket;