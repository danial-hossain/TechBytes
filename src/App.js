import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Home from './Pages/Home/index.js';
import Cart from './Pages/Cart/index.js';
import Login from './Pages/Login/index.js';
import SignUp from './Pages/SignUp/index.js';
import LaptopList from './Pages/LaptopList/index.js';
import LaptopDetail from './Pages/LaptopDetail/index.js';
import Verification from './Pages/verification/index.js';
import Profile from './Pages/Profile/index.js';
import ProfileInformation from './Pages/Profile/Information/index.js'; // ✅ edit profile
import ArmList from './Pages/Arm/index.js';
import ElectronicsList from './Pages/Electronics/index.js';
import ProductDetail from './Pages/Product/index.js';
import HelpCenter from './Pages/Help/index.js';

import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/laptops" element={<LaptopList />} />
        <Route path="/laptop/:id" element={<LaptopDetail />} />
        <Route path="/arms" element={<ArmList />} />
        <Route path="/electronics" element={<ElectronicsList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/help-center" element={<HelpCenter />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileInformation />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
