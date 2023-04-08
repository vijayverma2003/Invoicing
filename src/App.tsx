import { Route, Routes } from "react-router-dom";
import BankForm from "./components/forms/BankForm";
import FirmAddressForm from "./components/forms/FirmAddressForm";
import FirmForm from "./components/forms/FirmForm";
import InvoiceForm from "./components/forms/InvoiceForm";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import HomePage from "./components/home/HomePage";
import Navbar from "./components/Navbar";
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import Invoices from "./components/pages/Invoices";
import Products from "./components/pages/Products";
import Transports from "./components/pages/Transports";
import "./styles/styles.css";

import store from "./store/configureStore";
import { Provider } from "react-redux";
import ProductDescription from "./components/pages/ProductDescription";
import { getUserID } from "./services/auth";

function App() {
  const user = getUserID();

  return (
    <>
      {user && <Navbar />}
      <Provider store={store}>
        <main id={user ? "content" : ""}>
          <Routes>
            <Route element={<ProductDescription />} path={"/products/:id"} />
            <Route element={<InvoiceForm />} path="/invoices/new" />
            <Route element={<Transports />} path="/transports" />
            <Route element={<Invoices />} path="/invoices" />
            <Route element={<Customers />} path="/customers" />
            <Route element={<Products />} path="/products" />
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
