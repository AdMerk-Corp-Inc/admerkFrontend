import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'

function Footer() {
  const {user} = useContext(userContext)
  return (
    <div className='footer-div bg-dark text-white pt-5'>
      <div className='container'>
        <div className='row pb-4'>
          <div className='col-md-4'>
            <h2>ADMERK</h2>
            <p className='mb-0'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A quaerat iure nobis itaque ratione minima quasi perferendis modi aliquid dolorem, quia, vero aliquam facilis sapiente! Iusto eum iure sunt labore. Saepe asperiores ullam fuga, eos at, recusandae voluptas veniam ut ipsum nostrum soluta consequatur, consequuntur rem nesciunt nulla dolorum quasi!</p>
          </div>

          <div className='col-md-4 d-flex flex-column align-items-center'>
            <div>
              <h3>Company</h3>
              <ul>
                <li><a href="">Home</a></li>
                <li><a href={user?.role < 3 ? '/admin-dashboard' : user?.role == 3 ? '/sponsor-dashboard' : '/refugee-dashboard' }>Dashboard</a></li>
                <li><a href="/tickets">My Tickets</a></li>
              </ul>
            </div>
          </div>

          <div className='col-md-4 d-flex flex-column align-items-center'>
            <div>
              <h3>Terms & Policy</h3>
              <ul>
                <li><a href="/terms-and-conditions">Term & Condition</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
              </ul>

              <h3 className='mt-4'>Follow Us On</h3>
              <div className='d-flex social-icons'>
                <a href=""><img src="/assets/images/facebook.png" alt="" /></a>
                <a href=""><img src="/assets/images/instagram.png" alt="" /></a>
                <a href=""><img src="/assets/images/linkedin.png" alt="" /></a>
                <a href=""><img src="/assets/images/tiktok.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className='copy-right-div d-flex align-items-center justify-content-between'>
          <p>© 2023 - All Rights Reserved By <a href="">ADMERK</a></p>
          <p>Made with ❤ by <a href="">Web Amplifier</a></p>
        </div>
      </div>
    </div>
  )
}

export default Footer