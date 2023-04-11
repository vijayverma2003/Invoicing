import "./styles/styles.css";

import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { getUserID } from "./services/auth";
import { loadFirm } from "./store/user-info/firm";
import store from "./store/configureStore";

import BankForm from "./components/forms/BankForm";
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import FirmAddressForm from "./components/forms/FirmAddressForm";
import FirmForm from "./components/forms/FirmForm";
import HomePage from "./components/home/HomePage";
import InvoiceForm from "./components/forms/InvoiceForm";
import Invoices from "./components/pages/Invoices";
import LoginForm from "./components/forms/LoginForm";
import Navbar from "./components/Navbar";
import ProductDescription from "./components/pages/description/ProductDescription";
import Products from "./components/pages/Products";
import RegisterForm from "./components/forms/RegisterForm";
import Transports from "./components/pages/Transports";
import { loadCountries } from "./store/common/countries";
import CustomerDescription from "./components/pages/description/CustomerDescription";

function App() {
  const user = getUserID();

  useEffect(() => {
    store.dispatch(loadCountries());
    if (user) store.dispatch(loadFirm());
  }, [user]);

  return (
    <>
      {user && <Navbar />}
      <Provider store={store}>
        <main id={user ? "content" : ""}>
          <Routes>
            <Route element={<CustomerDescription />} path={"/customers/:id"} />
            <Route element={<ProductDescription />} path={"/products/:id"} />

            <Route element={<Transports />} path="/transports" />
            <Route element={<Invoices />} path="/invoices" />
            <Route element={<Customers />} path="/customers" />
            <Route element={<Products />} path="/products" />

            <Route element={<InvoiceForm />} path="/invoices/new" />
            <Route element={<BankForm />} path="/firm/bank" />
            <Route element={<FirmAddressForm />} path="/firm/address" />
            <Route element={<FirmForm />} path="/firm" />
            <Route element={<RegisterForm />} path="/register" />

            <Route element={<LoginForm />} path="/login" />

            <Route element={user ? <Dashboard /> : <HomePage />} path="/" />
          </Routes>
        </main>
      </Provider>
    </>
  );
}

export default App;
