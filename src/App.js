import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import CommonSignup from './screens/auth/CommonSignup';
import SignupSponser from './screens/auth/SignupSponser';
import Home from './screens/Home';
import Layout from './screens/Layout';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path='/signup' exact={true} element={<CommonSignup />} />
          <Route path='/signup-sponser' exact={true} element={<SignupSponser />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
