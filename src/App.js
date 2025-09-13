import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './Pages/Home/index.js';
import Cart from './Pages/Cart/index.js';
import Login from './Pages/Login/index.js';
import SignUp from './Pages/SignUp/index.js';
import Verification from './Pages/verification/index.js';
import Profile from './Pages/Profile/index.js';
import ProfileInformation from './Pages/Profile/Information/index.js'; // edit profile

import LaptopList from './Pages/LaptopList/index.js';
import LaptopDetail from './Pages/LaptopDetail/index.js';
import ArmList from './Pages/Arm/index.js';
import ElectronicsList from './Pages/Electronics/index.js';
import ProductDetail from './Pages/Product/index.js';
import DesktopList from './Pages/Desktop/index.js';
import LegList from './Pages/Leg/index.js';
import HelpCenter from './Pages/Help/index.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/laptops" element={<LaptopList />} />
        <Route path="/laptop/:id" element={<LaptopDetail />} />
        <Route path="/arms" element={<ArmList />} />
        <Route path="/electronics" element={<ElectronicsList />} />
        <Route path="/desktops" element={<DesktopList />} />
        <Route path="/legs" element={<LegList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/help-center" element={<HelpCenter />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileInformation />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* You can add a fallback 404 page here if needed */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
