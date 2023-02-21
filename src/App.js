import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './Style.css';
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

function App() {
  const { user } = useContext(userContext)
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path='/login' exact={true} element={<Login />} />
          <Route path='/signup' exact={true} element={<CommonSignup />} />
          <Route path='/signup-sponser' exact={true} element={<SignupSponser />} />
          <Route path='/signup-refugee' exact={true} element={<SignupCustomer />} />
          <Route path='/create-volunteer' exact={true} element={<Volunteer />} />

          <Route path='/sponsor-dashboard' exact={true} element={<Layout>
            <SponsorDashboard />
          </Layout>} />

          <Route path='/refugee-dashboard' exact={true} element={<Layout>
            <RefugeeDashboard />
          </Layout>} />

          <Route path='/profile' exact={true} element={<Layout>
            <AccountProfile />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
