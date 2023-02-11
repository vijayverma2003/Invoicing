import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import HomePage from "./components/home/HomePage";
import "./styles/styles.css";

function App() {
  return (
    <Routes>
      <Route element={<RegisterForm />} path="/register" />
      <Route element={<LoginForm />} path="/login" />
      <Route element={<HomePage />} path="/" />
    </Routes>
  );
}

export default App;
