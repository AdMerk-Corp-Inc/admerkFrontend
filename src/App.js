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

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path='/signup' exact={true} element={<CommonSignup />} />
          <Route path='/signup-sponser' exact={true} element={<SignupSponser />} />
          <Route path='/signup-refugee' exact={true} element={<SignupCustomer />} />
          <Route path='/sponsor-dashboard' exact={true} element={<SponsorDashboard />} />
          <Route path='/profile' exact={true} element={<AccountProfile />} />
          <Route path='/raise-ticket' exact={true} element={<RaiseTicket />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
