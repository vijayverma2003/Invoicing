import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import HomePage from "./components/home/HomePage";
import Navbar from "./components/Navbar";
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import Invoices from "./components/pages/Invoices";
import Products from "./components/pages/Products";
import "./styles/styles.css";

function App() {
  return (
    <>
      {/* <Routes>
        <Route element={<RegisterForm />} path="/register" />
        <Route element={<LoginForm />} path="/login" />
        <Route element={<HomePage />} path="/" />
      </Routes> */}
      <Navbar />
      <Routes>
        <Route element={<Invoices />} path="/invoices" />
        <Route element={<Customers />} path="/customers" />
        <Route element={<Products />} path="/products" />
        <Route element={<Dashboard />} path="/" />
      </Routes>
    </>
  );
}

export default App;
