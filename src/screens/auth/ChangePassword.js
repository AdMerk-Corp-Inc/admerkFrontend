import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import { url } from '../../Helper/Helper'

function ChangePassword() {

  const { setUser } = useContext(userContext)
  const [newpassword, setNewPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("email", newpassword)
    formData.append("password", confirmpassword)

    const response = await fetch(url + 'login', {
      method: 'POST',
      body: formData
    });

    if (response.ok == true) {
      const data = await response.json();

      if (data.status == 200) {
        setUser(data?.user_data)
        if (data.user_data.role == 4) {
          window.location = window.location.origin + "/refugee-dashboard"
        } else if (data.user_data.role == 3) {
          window.location = window.location.origin + "/sponsor-dashboard"
        } else {
          window.location = window.location.origin + "/admin-dashboard"
        }
      } else {
        toast.error(data?.message)
      }
    } else {
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
                  <h2 className='text-center mb-4'><a href="">ADMERK</a></h2>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='row'>
                      <div className="filter-form-MUI-input-text col-md-12">
                        <main class="input-div">
                          <input
                            class="inner-input"
                            type="password"
                            placeholder=' '
                            id='name'
                            autoComplete="off"
                            required
                            value={newpassword}
                            onChange={e => setNewPassword(e.target.value)}
                          />
                          <label for="name" class="inner-label">New Password</label>
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
                            value={confirmpassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                          />
                          <label for="name" class="inner-label">Confirm New Password</label>
                        </main>
                      </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center mt-3 forgot-pass-div'>
                      <button type="submit" className="btn custom-sm-btn btn-lg my-0 mb-4">Change Password</button>
                     
                    </div>
                  </form>



                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


export default ChangePassword;