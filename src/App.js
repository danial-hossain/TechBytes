// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Home from './Pages/Home/index.js';
import Cart from './Pages/Cart/index.js';
import Login from './Pages/Login/index.js';
import SignUp from './Pages/SignUp/index.js';
import LaptopList from './Pages/LaptopList/index.js';       // Added Laptop list page
import LaptopDetail from './Pages/LaptopDetail/index.js';   // Added Laptop detail page
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import Verification from './Pages/verification/index.js';
import Profile from './Pages/Profile/index.js'; // import profile
import ArmList from './Pages/Arm/index.js';   // ✅ import Arm page


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
        <Route path="/verify" element={<Verification />} />  {/* Added verification */}
        
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/laptops" element={<LaptopList />} />            {/* Laptop list */}
        <Route path="/laptop/:id" element={<LaptopDetail />} />      {/* Laptop details */}
        <Route path="/arms" element={<ArmList />} />   {/* Arm list */}

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;