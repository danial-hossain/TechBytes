import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import ProfileInformation from "./Pages/Profile/Information";
import Dashboard from "./Pages/DASHBOARD";

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
            {/* <Route path="/dashboard/users" element={<ManageUsers />} /> */}
            {/* <Route path="/dashboard/products" element={<ManageProducts />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
