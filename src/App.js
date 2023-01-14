import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CartPage from "./components/CartPage/CartPage";
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
