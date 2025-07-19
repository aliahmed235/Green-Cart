import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import Home from "./pages/home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProudctCategory from "./pages/ProudctCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart";

function AppContent() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, user } = useAppContext();

  console.log("App Context:", { showUserLogin, user });

  return (
    <>
      <div>
        {!isSellerPath && <Navbar />}
        {showUserLogin && <Login />}
        <Toaster />
        <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-3"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProudctCategory />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        {isSellerPath && <Footer />}
      </div>
    </>
  );
  
}

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;