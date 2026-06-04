import { Provider } from "react-redux";
import { store } from "./store";

import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import { LanguagesProvider } from "../context/LanguagesContext";
import { OnlineStatusProvider } from "../context/OnlineStatusContext";
import { FormatterProvider } from "../context/FormatterContext";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>
          <LanguagesProvider>
            <OnlineStatusProvider>
              <FormatterProvider>{children}</FormatterProvider>
            </OnlineStatusProvider>
          </LanguagesProvider>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
