import { AddSVG } from "../common/SVG";
import CustomerForm from "../forms/CustomerForm";

function Customers(): JSX.Element {
  const handleToggleSide = () => {
    const sideBar = document.querySelector(".page-side");
    sideBar?.classList.toggle("page-side-open");
  };

  const handleOpenCustomerFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.open = true;
  };

  return (
    <>
      <CustomerForm />
      <section id="main-page" className="page products-page">
        <header className="page-header">
          <h4>Customers</h4>
          <div className="page-header-icons">
            <button onClick={handleOpenCustomerFormDialog} className="btn-icon">
              <AddSVG />
            </button>
          </div>
        </header>
        <div className="page-content page-grid">
          <div>
            <div className="list-page-item">
              <div>
                <h4 className="list-page-item-heading">Luke Parker</h4>
                <p className="text-lighter list-page-item-description">
                  lukefeelixparker@gmail.com
                </p>
              </div>
              <div>
                <h4 className="list-page-item-heading text-right">$4000</h4>
                <p className="text-lighter list-page-item-description text-right">
                  Ratia, HR, 🇮🇳
                </p>
              </div>
            </div>
          </div>
          <button onClick={handleToggleSide} className="page-side-toggle">
            Search
          </button>
          <div className="page-side">
            <h4 className="text-lighter">Search</h4>
            <div className="input-container">
              <input type="search" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Customers;
