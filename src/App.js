import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './Style.css';
import './index.css'
import AccountProfile from './screens/AccountProfile';
import CommonSignup from './screens/auth/CommonSignup';
import SignupCustomer from './screens/auth/SignupCustomer';
import SignupSponser from './screens/auth/SignupSponser';
import Home from './screens/Home';
import Layout from './screens/Layout';
import SponsorDashboard from './screens/sponser/SponsorDashboard';
import RaiseTicket from './screens/refugee/RaiseTicket';
import RefugeeDashboard from './screens/refugee/RefugeeDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { userContext } from './context/UserContext';
import Login from './screens/auth/Login';
import Terms from './screens/Terms';
import Privacy from './screens/Privacy';
import Skills from './screens/Skills';
import Hobby from './screens/Hobby';
import AllUser from './screens/AllUser';
import Volunteer from './screens/Volunteer';
import EditAccountProfile from './screens/EditAccountProfile';
import VolunteerAdminDashboard from './screens/VolunteerAdminDashboard';
import ChangePassword from './screens/auth/ChangePassword';
import AllJobs from './screens/AllJobs';
import ForgotPassword from './screens/auth/ForgotPassword';
import CreateJob from './screens/CreateJob';
import EditJOb from './screens/EditJob';
import JobDetailPage from './screens/JobDetailPage';
import JobApplicantList from './screens/JobApplicantList';
import VerifyEmail from './screens/auth/VerifyEmail';
import Loader from './component/Loader';
import NonAuthLayout from './screens/NonAuthLayout';

function App() {
  const { user,load } = useContext(userContext)
  return (
    <>
      <ToastContainer />
      {load && <Loader />}
      <BrowserRouter>
        <Routes>

          <Route path='/' exact={true} element={<NonAuthLayout><CommonSignup /></NonAuthLayout>} />
          <Route path='/login' exact={true} element={<NonAuthLayout><Login /></NonAuthLayout>} />
          <Route path='/forgot-password' exact={true} element={<NonAuthLayout><ForgotPassword /></NonAuthLayout>} />
          <Route path='/signup' exact={true} element={<NonAuthLayout><CommonSignup /></NonAuthLayout>} />
          <Route path='/signup-sponser' exact={true} element={<NonAuthLayout><SignupSponser /></NonAuthLayout>} />
          <Route path='/signup-refugee' exact={true} element={<NonAuthLayout><SignupCustomer /></NonAuthLayout>} />
          <Route path='/verifyemail' exact={true} element={<NonAuthLayout><VerifyEmail /></NonAuthLayout>} />
          


          <Route path='/change-password' exact={true} element={<Layout>
            <ChangePassword />
          </Layout>} />
          <Route path='/create-volunteer' exact={true} element={<Layout>
            <Volunteer />
          </Layout>} />

          <Route path='/sponsor-dashboard' exact={true} element={<Layout>
            <SponsorDashboard />
          </Layout>} />

          <Route path='/refugee-dashboard' exact={true} element={<Layout>
            <RefugeeDashboard />
          </Layout>} />

          <Route path='/admin-dashboard' exact={true} element={<Layout>
            <VolunteerAdminDashboard />
          </Layout>} />

          <Route path='/profile' exact={true} element={<Layout>
            <AccountProfile />
          </Layout>} />

          <Route path='/refugee-profile' exact={true} element={<Layout>
            <AccountProfile />
          </Layout>} />

          <Route path='/edit-profile' exact={true} element={<Layout>
            <EditAccountProfile />
          </Layout>} />

          <Route path='/tickets' exact={true} element={<Layout>
            <RaiseTicket />
          </Layout>} />

          <Route path='/terms-and-conditions' exact={true} element={<Layout>
            <Terms />
          </Layout>} />

          <Route path='/privacy-policy' exact={true} element={<Layout>
            <Privacy />
          </Layout>} />

          <Route path='/skills' exact={true} element={<Layout>
            <Skills />
          </Layout>} />

          <Route path='/hobby' exact={true} element={<Layout>
            <Hobby />
          </Layout>} />

          <Route path='/all-user' exact={true} element={<Layout>
            <AllUser />
          </Layout>} />

          <Route path='/all-jobs' exact={true} element={<Layout>
            <AllJobs />
          </Layout>} />

          <Route path='/create-job' exact={true} element={<Layout>
            <CreateJob />
          </Layout>} />
          <Route path='/edit-job' exact={true} element={<Layout>
            <EditJOb />
          </Layout>} />
          <Route path='/apply-job' exact={true} element={<Layout>
            <JobDetailPage />
          </Layout>} />
          <Route path='/job-applicant-list' exact={true} element={<Layout>
            <JobApplicantList />
          </Layout>} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
