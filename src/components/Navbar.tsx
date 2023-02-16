import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
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
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/customers">Customers</Link>
        </li>
        <li className="nav-item">
          <Link to="/invoices">Invoices</Link>
        </li>
        <li className="nav-item">
          <Link to="/transports">Transports</Link>
        </li>
        <li className="nav-item">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
