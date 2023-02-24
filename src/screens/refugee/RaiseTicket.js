import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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

  async function changeStatus(item){
    const res = window.confirm("Are you sure you want to change the status of the tickets ?")

    if (res == true){
        let new_status = 1
        if (item?.status == 1){
            new_status = 2
        }else{
            new_status = 1
        }
        const response = await fetch(url + `change-ticket-status/${item?.id}/${new_status}`,{
            headers : {
                "Authorization" : `Bearer ${user?.token}`
            }
        });

        if (response.ok == true){
            const data = await response.json();

            if (data.status == 200){
                toast.success("Status updated successfully!")
                fetchTickets().catch(err => {
                    toast.error(err.message)
                })
            }else{
                toast.error(data?.message)
            }
        }

    }
}

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
                  {user?.role < 3 && <>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                  </>}
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
                    {user?.role < 3 && <>
                    <td scope="col">
                      <Link to={`/profile?id=${item?.user_id}`}>
                      {item?.name}
                      </Link>
                    </td>
                    <td scope="col">{item?.email}</td>
                    <td scope="col">+{item?.country_code} {item?.whatsapp_number}</td>
                  </>}
                    <td>{dateTransformer(item?.created_date)}</td>
                    <td>{item?.title}</td>
                    <td onClick={()=>changeStatus(item)}>{item?.status == 1 ? <span className='bg-primary px-2 py-1 rounded text-white'>Open</span> : <span className='bg-danger px-2 py-1 rounded text-white'>Closed</span>}</td>
                    <td><a href='javascript:void(0);' onClick={() => {
                      setId(item?.id)
                      setModalShow(true)
                    }}><i class="fa-solid fa-eye text-primary"></i></a></td>
                  </tr>
                )) : <tr>
                  <td colSpan={8}>
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