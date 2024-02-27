import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserContextProvider from "./Context/UserContext.js";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/CartContext.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import WishListContextProvider from "./Context/WishListContext.js";

let queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <WishListContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
          </QueryClientProvider>
        </UserContextProvider>
      </CartContextProvider>
    </WishListContextProvider>
  </Provider>
);
