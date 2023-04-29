import "./styles/styles.css";

import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { getUserID } from "./services/auth";
import { loadCountries } from "./store/common/countries";
import { loadFirm } from "./store/user-info/firm";
import store from "./store/configureStore";

import BankForm from "./components/forms/BankForm";
import Customer from "./components/pages/description/Customer";
import Customers from "./components/pages/Customers";
import Dashboard from "./components/dashboard/Dashboard";
import FirmAddressForm from "./components/forms/FirmAddressForm";
import FirmForm from "./components/forms/FirmForm";
import HomePage from "./components/home/HomePage";
import Invoice from "./components/pages/description/Invoice";
import InvoiceForm from "./components/forms/InvoiceForm";
import Invoices from "./components/pages/Invoices";
import LoginForm from "./components/forms/LoginForm";
import Navbar from "./components/Navbar";
import Product from "./components/pages/description/Product";
import Products from "./components/pages/Products";
import RegisterForm from "./components/forms/RegisterForm";
import Transport from "./components/pages/description/Transport";
import Transports from "./components/pages/Transports";
import Settings from "./components/pages/Settings";
import LogoForm from "./components/forms/LogoForm";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFound from "./components/pages/NotFound";

function App() {
  const user = getUserID();

  useEffect(() => {
    store.dispatch(loadCountries());
    if (user) store.dispatch(loadFirm());
  }, [user]);

  return (
    <>
      <Provider store={store}>
        {user ? <Navbar /> : null}
        <main id={user ? "content" : ""}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <Customer />
                </ProtectedRoute>
              }
              path={"/customers/:id"}
            />

            <Route
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
              path={"/invoices/:id"}
            />

            <Route
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
              path={"/products/:id"}
            />

            <Route
              element={
                <ProtectedRoute>
                  <Transport />
                </ProtectedRoute>
              }
              path={"/transports/:id"}
            />

            <Route
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
              path="/customers"
            />

            <Route
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
              path="/invoices"
            />

            <Route
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
              path="/products"
            />

            <Route
              element={
                <ProtectedRoute>
                  <Transports />
                </ProtectedRoute>
              }
              path="/transports"
            />

            <Route
              element={
                <ProtectedRoute>
                  <LogoForm />
                </ProtectedRoute>
              }
              path="/firm/logo"
            />

            <Route
              element={
                <ProtectedRoute>
                  <BankForm />
                </ProtectedRoute>
              }
              path="/firm/bank"
            />

            <Route
              element={
                <ProtectedRoute>
                  <FirmAddressForm />
                </ProtectedRoute>
              }
              path="/firm/address"
            />

            <Route
              element={
                <ProtectedRoute>
                  <FirmForm />
                </ProtectedRoute>
              }
              path="/firm"
            />

            <Route
              element={
                <ProtectedRoute>
                  <InvoiceForm />
                </ProtectedRoute>
              }
              path="/invoices/create"
            />

            <Route element={<LoginForm />} path="/login" />
            <Route element={<RegisterForm />} path="/register" />

            <Route element={<Settings />} path={"/settings"} />
            <Route element={user ? <Dashboard /> : <HomePage />} path="/" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </main>
      </Provider>
    </>
  );
}

export default App;
