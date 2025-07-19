import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import "../index.css";

const Cart = () => {
  const {
    products,
    CartItems,
    currency,
    UpdateCartItems,
    RemoveFromCart,
  } = useAppContext();

  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    for (const productId in CartItems) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        total += product.price * CartItems[productId];
      }
    }
    setTotalAmount(total);
  }, [CartItems, products]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {Object.keys(CartItems).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {Object.entries(CartItems).map(([productId, quantity]) => {
              const product = products.find(
                (p) => p.id === parseInt(productId)
              );
              if (!product) return null;

              return (
                <div className="cart-item" key={productId}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p>{currency}{product.price}</p>
                    <div className="quantity-control">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          UpdateCartItems(product.id, parseInt(e.target.value))
                        }
                      />
                      <button onClick={() => RemoveFromCart(product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total: {currency}{totalAmount.toFixed(2)}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
