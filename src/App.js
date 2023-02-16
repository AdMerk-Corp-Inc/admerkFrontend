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


          <Route path='/sponsor-dashboard' exact={true} element={<Layout>
            <SponsorDashboard />
          </Layout>} />
          <Route path='/refugee-dashboard' exact={true} element={<Layout>
            <RefugeeDashboard />
          </Layout>} />
          <Route path='/profile' exact={true} element={<Layout>
            <AccountProfile />
          </Layout>} />
          <Route path='/raise-ticket' exact={true} element={<Layout>
            <RaiseTicket />
          </Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
