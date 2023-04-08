import { NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { useRef } from "react";

function Navbar() {
  const nav = useRef<HTMLElement>(null);

  const handleNavToggle = () => {
    nav.current?.classList.toggle("nav-expanded");
  };

  return (
    <>
      <div className="nav-mobile">
        <h4>V Business</h4>
        <button onClick={handleNavToggle} className="btn-icon">
          <RiMenu3Fill size={20} color="white" />
        </button>
      </div>
      <nav ref={nav}>
        <div className="nav-header">
          <img
            className="nav-logo"
            src="https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
          <div className="nav-header-description">
            <h5 className="nav-user">Suman Trading Company</h5>
          </div>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <NavLink onClick={handleNavToggle} to="/">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={handleNavToggle} to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={handleNavToggle} to="/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={handleNavToggle} to="/invoices">
              Invoices
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={handleNavToggle} to="/transports">
              Transports
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={handleNavToggle} to="/settings">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
