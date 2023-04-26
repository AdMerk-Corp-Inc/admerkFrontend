import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import { url } from '../../Helper/Helper'

function ForgotPassword() {

  const [email, setEmail] = useState('')
  const { setLoad } = useContext(userContext)
  async function handleSubmit(e) {
    setLoad(true)
    e.preventDefault()

    const formData = new FormData()
    formData.append("email", email)

    const response = await fetch(url + 'resetPassword', {
      method: 'POST',
      body: formData
    });

    if (response.ok == true) {
      setLoad(false)
      const data = await response.json();

      if (data.status == 200) {
        toast.success(data.message)
        window.location = window.location.origin + '/login'
      } else {
        toast.error(data?.message)
      }
    } else {
      setLoad(false)
      toast.error("Internal Server Error")
    }
  }

  return (
    <div className='login-div'>
      <section className="h-custom d-flex align-items-center" style={{ backgroundColor: '#0061df08' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6">
              <div className="card rounded-3">

                <div className="card-body p-4 pb-0 p-md-5 pb-md-0">
                  {/* <h2 className='text-center mb-4'><a href="">ADMERK</a></h2> */}
                  <div className='d-flex align-items-center justify-content-center mb-5'>
                    <img src='/assets/images/newLogo.png' style={{ width: '19rem' }} />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='row'>
                      <div className="filter-form-MUI-input-text col-md-12">
                        <main class="input-div">
                          <input
                            class="inner-input"
                            type="email"
                            placeholder=' '
                            id='name'
                            autoComplete="off"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                          <label for="name" class="inner-label">Email</label>
                        </main>
                      </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center mt-3 forgot-pass-div'>
                      <button type="submit" className="btn custom-sm-btn btn-lg my-0">Reset My Password</button>
                    </div>
                  </form>



                  <div className='d-flex justify-content-center mb-3 mt-4 pt-2'>
                    <p className='mb-0'>Already have an account? <a href="/login">Login</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword