// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order"; // ✅ Order page added
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import ProfileInformation from "./Pages/Profile/Information";
import Dashboard from "./Pages/DASHBOARD";
import HelpCenter from "./Pages/Help";
import Verification from './Pages/Verification';
import SearchPage from './Pages/SearchPage';
import OrderTracking from "./Pages/OrderTracking"; // make sure the path is correct


// Product Pages (category lists)
import DesktopList from "./Pages/Desktop";
import LaptopList from "./Pages/Laptop";
import ArmList from "./Pages/Arm";
import LegList from "./Pages/Leg";
import ElectronicsList from "./Pages/Electronics";

// Product Detail Pages
import Arm from "./Pages/ProductDetail/arm";
import Legs from "./Pages/ProductDetail/leg";
import Electronics from "./Pages/ProductDetail/electronics";
import Desktop from "./Pages/ProductDetail/desktop";
import Laptop from "./Pages/ProductDetail/laptop";

const LayoutWithHeaderFooter = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <LayoutWithHeaderFooter>
                <Home />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/login"
            element={
              <LayoutWithHeaderFooter>
                <Login />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/signup"
            element={
              <LayoutWithHeaderFooter>
                <SignUp />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/verify"
            element={
              <LayoutWithHeaderFooter>
                <Verification />
              </LayoutWithHeaderFooter>
            }
          />

          {/* SearchPage Route */}
          <Route
            path="/search"
            element={
              <LayoutWithHeaderFooter>
                <SearchPage />
              </LayoutWithHeaderFooter>
            }
          />

          {/* Product category pages */}
          <Route
            path="/desktops"
            element={
              <LayoutWithHeaderFooter>
                <DesktopList />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/laptops"
            element={
              <LayoutWithHeaderFooter>
                <LaptopList />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/arms"
            element={
              <LayoutWithHeaderFooter>
                <ArmList />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/legs"
            element={
              <LayoutWithHeaderFooter>
                <LegList />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/electronics"
            element={
              <LayoutWithHeaderFooter>
                <ElectronicsList />
              </LayoutWithHeaderFooter>
            }
          />

          {/* Product detail routes */}
          <Route
            path="/product/arms/:id"
            element={
              <LayoutWithHeaderFooter>
                <Arm />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/product/legs/:id"
            element={
              <LayoutWithHeaderFooter>
                <Legs />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/product/electronics/:id"
            element={
              <LayoutWithHeaderFooter>
                <Electronics />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/product/desktops/:id"
            element={
              <LayoutWithHeaderFooter>
                <Desktop />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/product/laptops/:id"
            element={
              <LayoutWithHeaderFooter>
                <Laptop />
              </LayoutWithHeaderFooter>
            }
          />

          {/* Public Help route */}
          <Route
            path="/help"
            element={
              <LayoutWithHeaderFooter>
                <HelpCenter />
              </LayoutWithHeaderFooter>
            }
          />

          {/* Protected user routes */}
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route
              path="/profile"
              element={
                <LayoutWithHeaderFooter>
                  <Profile />
                </LayoutWithHeaderFooter>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <LayoutWithHeaderFooter>
                  <ProfileInformation />
                </LayoutWithHeaderFooter>
              }
            />
            <Route
              path="/cart"
              element={
                <LayoutWithHeaderFooter>
                  <Cart />
                </LayoutWithHeaderFooter>
              }
            />
            {/* ✅ Order page route */}
            <Route
              path="/order"
              element={
                <LayoutWithHeaderFooter>
                  <Order />
                </LayoutWithHeaderFooter>
              }
            />

            <Route
              path="/order-tracking"
              element={
                <LayoutWithHeaderFooter>
                  <OrderTracking />
                </LayoutWithHeaderFooter>
              }
            />

          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
