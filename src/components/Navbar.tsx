import { NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/configureStore";
import { getFirm, loadFirm } from "../store/user-info/firm";

function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const firm = useSelector(getFirm);

  useEffect(() => {
    dispatch(loadFirm());
  }, [dispatch]);

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
            src={`http://127.0.0.1:8000/media/invoicing/images/Document_5_xuy1oOV.png`}
            alt=""
          />
          <div className="nav-header-description">
            <h5 className="nav-user">{firm ? firm.name : null}</h5>
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
