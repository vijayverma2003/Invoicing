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

function App() {
  return (
    <>
      {localStorage.getItem("user") && <Navbar />}
      <Routes>
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

        <Route
          element={localStorage.getItem("user") ? <Dashboard /> : <HomePage />}
          path="/"
        />
      </Routes>
    </>
  );
}

export default App;
