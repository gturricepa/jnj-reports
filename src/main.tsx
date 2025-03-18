import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { theme } from "./styles/theme";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";
import "./translation/in18.ts";
const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
