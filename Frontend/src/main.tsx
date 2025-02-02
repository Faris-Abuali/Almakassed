import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MaqasidThemeProvider from "./style/MaqasidThemeProvider";
import "./locale/i18n";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorBoundary from "./Error";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MaqasidThemeProvider>
          <Routes>
            <Route
              path="/*"
              element={
                <Provider store={store}>
                  <App />
                </Provider>
              }
            />
          </Routes>
        </MaqasidThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
