import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import { url } from '../../Helper/Helper'

function Login() {

  const { setUser, setLoad } = useContext(userContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  async function handleSubmit(e) {
    setLoad(true)
    e.preventDefault()

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    const response = await fetch(url + 'login', {
      method: 'POST',
      body: formData
    });

    if (response.ok == true) {
      setLoad(false)
      const data = await response.json();

      if (data.status == 200) {
        setUser(data?.user_data)
        if (data.user_data.role == 4 || data.user_data.role == 5) {
          window.location = window.location.origin + "/refugee-dashboard"
        } else if (data.user_data.role == 3 || data.user_data.role == 6) {
          window.location = window.location.origin + "/sponsor-dashboard"
        } else {
          window.location = window.location.origin + "/admin-dashboard"
        }
      } else if (data.status == 301) {
        toast.success(data?.message)
        setShow(true)
      } else {
        toast.error(data?.message)
      }
    } else {
      setLoad(false)
      toast.error("Internal Server Error")
    }
  }

  async function resendEmail(item) {
    setLoad(true)
    const response = await fetch(url + "resendVerification/" + email)
    if (response.ok == true) {
      setLoad(false)
      const data = await response.json()
      if (data.status == 200) {
        toast.success("Email has been sent")
      } else {
        toast.error(data.message)
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

                      <div className="filter-form-MUI-input-text col-md-12">
                        <main class="input-div">
                          <input
                            class="inner-input"
                            type="password"
                            placeholder=" "
                            id='password'
                            autoComplete="off"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                          <label for="name" class="inner-label">Password</label>
                        </main>
                      </div>
                    </div>

                    {show && <div className=' mb-3 pt-1'>
                      <p className='mb-0'>Have not verified email yet! <a href="javascript:void(0);" onClick={() => resendEmail()} >Resend</a></p>
                    </div>}




                    <div className='d-flex justify-content-between align-items-center mt-3 forgot-pass-div'>
                      <button type="submit" className="btn custom-sm-btn btn-lg my-0">Login</button>
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                  </form>



                  <div className='d-flex justify-content-center mb-3 mt-4 pt-2'>
                    <p className='mb-0'>Don't have an account? <a href="/signup">Signup</a></p>
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

export default Login