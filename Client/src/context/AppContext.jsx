import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [IsSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (itemId) => {
    const cartData = structuredClone(CartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const UpdateCartItems = (itemId, quantity) => {
    const cartData = structuredClone(CartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const RemoveFromCart = (itemId) => {
    const cartData = structuredClone(CartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed From Cart");
  };

  const getCartAmount = () => {
  let total = 0;
  for (const itemId in CartItems) {
    const product = products.find((item) => item._id === itemId);
    if (product) {
      total += product.price * CartItems[itemId];
    }
  }
  return total;
};

  const value = {
    navigate,
    user,
    setUser,
    IsSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    UpdateCartItems,
    RemoveFromCart,
    CartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount, // ✅ added here
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
