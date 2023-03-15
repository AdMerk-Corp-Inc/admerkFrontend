import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'

function Footer() {
  const { user } = useContext(userContext)
  return (
    <div className='footer-div bg-dark text-white pt-5'>
      <div className='container'>
        <div className='row pb-4'>
          <div className='col-md-4'>
            <div>
              <h2>ADMERK</h2>
            </div>
            <p className='mb-0'>
              Admerk is the free platform for World Wide. The Main Motive of these platform is to provide dream job to job seekers/refugees.
              These Platform is not for any particular country these platform is for all country. We always want to improve the platform for all users.
              We also aims on providing Best and hard working job seekers/refugees to the companies.
            </p>
          </div>

          <div className='col-md-4 d-flex flex-column align-items-center'>
            <div>
              <h3>Company/Sponsor</h3>
              <ul>
                <li><a href="">Home</a></li>
                <li><a href={user?.role < 3 ? '/admin-dashboard' : user?.role == 3 ? '/sponsor-dashboard' : '/refugee-dashboard'}>Dashboard</a></li>
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
                <a href="https://www.facebook.com/Admerkcorp" target="_blank"><img src="/assets/images/facebook.png" alt="" /></a>
                <a href="https://www.instagram.com/admerkstaffing/" target="_blank"><img src="/assets/images/instagram.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/admerk/" target="_blank"><img src="/assets/images/linkedin.png" alt="" /></a>
                <a href="https://www.tiktok.com/@admerkstaffing" target="_blank"><img src="/assets/images/tiktok.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className='copy-right-div d-flex align-items-center justify-content-between'>
          <p>© {new Date().getFullYear()} - All Rights Reserved By <a href="">ADMERK</a></p>
          <p style={{display : 'none'}}>Made with ❤ by <a href="https://web-amplifier.com/">Web Amplifier</a></p>
        </div>
      </div>
    </div>
  )
}

export default Footer