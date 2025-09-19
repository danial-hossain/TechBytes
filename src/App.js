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
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import ProfileInformation from "./Pages/Profile/Information";
import Dashboard from "./Pages/DASHBOARD";

// Product Pages
import Desktop from "./Pages/Desktop";
import Laptop from "./Pages/LaptopDetail";
import Arm from "./Pages/Arm";
import Legs from "./Pages/Leg";
import Electronics from "./Pages/Electronics";
import ProductDetail from "./Pages/ProductDetail"; // ✅ Import ProductDetail

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

          {/* Product routes (public) */}
          <Route
            path="/desktops"
            element={
              <LayoutWithHeaderFooter>
                <Desktop />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/laptops"
            element={
              <LayoutWithHeaderFooter>
                <Laptop />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/arms"
            element={
              <LayoutWithHeaderFooter>
                <Arm />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/legs"
            element={
              <LayoutWithHeaderFooter>
                <Legs />
              </LayoutWithHeaderFooter>
            }
          />
          <Route
            path="/electronics"
            element={
              <LayoutWithHeaderFooter>
                <Electronics />
              </LayoutWithHeaderFooter>
            }
          />

          {/* ✅ Product detail route */}
          <Route
            path="/product/:id"
            element={
              <LayoutWithHeaderFooter>
                <ProductDetail />
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
          </Route>

          {/* Admin routes (no header/footer) */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* You can add more admin routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
