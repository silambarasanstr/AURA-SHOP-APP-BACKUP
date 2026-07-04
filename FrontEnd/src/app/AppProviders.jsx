import { Provider } from "react-redux";
import { store } from "./store";

import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import { LanguagesProvider } from "../context/LanguagesContext";
import { OnlineStatusProvider } from "../context/OnlineStatusContext";
import { FormatterProvider } from "../context/FormatterContext";
import { CartProvider } from "../context/CartContext";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <CartProvider>{children}</CartProvider>
    </Provider>
  );
};

export default AppProviders;
