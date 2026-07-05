import { Provider } from "react-redux";
import { store } from "./store";
import UserProvider from "../context/UserProvider";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <UserProvider>{children}</UserProvider>
    </Provider>
  );
};

export default AppProviders;
