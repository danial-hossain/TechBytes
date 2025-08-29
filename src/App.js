import './App.css';
import Home from './Pages/Home/index.js';
import Cart from './Pages/Cart/index.js';
import ElectronicsList from './Pages/ElectronicsList/index.js';
import Electronicdetails from './Pages/Electronicdetails/index.js';
import Login from './Pages/Login/index.js';
import SignUp from './Pages/SignUp/index.js';
import LaptopList from './Pages/LaptopList/index.js';       // Laptop list page
import LaptopDetail from './Pages/LaptopDetail/index.js';   // Laptop detail page
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

        {/* Electronics */}
        <Route path="/electronics" element={<ElectronicsList />} />
        <Route path="/electronics/:id" element={<Electronicdetails />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Laptops */}
        <Route path="/laptops" element={<LaptopList />} />
        <Route path="/laptop/:id" element={<LaptopDetail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
