import "./App.css";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./components/product/productDetail";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from './store'
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";

function App() {

useEffect(()=> {
  store.dispatch(loadUser)
})

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element=<ProductSearch/>/>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/myprofile" element={<ProtectedRoute>< Profile /> </ProtectedRoute>} />
              <Route path="/myprofile/update" element={<ProtectedRoute>< UpdateProfile /> </ProtectedRoute>} />
              <Route path="/myprofile/update/password" element={<ProtectedRoute>< UpdatePassword /> </ProtectedRoute>} />
              <Route path="/password/forgot" element={<ForgotPassword /> } />
              <Route path="/password/reset/:token" element={<ResetPassword /> } />
              <Route path="/cart" element={<Cart /> } />
              
              
            </Routes>
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
