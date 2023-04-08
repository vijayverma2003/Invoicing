import { AddSVG } from "../common/SVG";
import CustomerForm from "../forms/CustomerForm";

function Customers(): JSX.Element {
  const handleOpenCustomerFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  return (
    <>
      <CustomerForm />
      <section className="page products-page">
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
                <h4 className="list-page-item-heading">Vijay</h4>
                <p className="text-lighter list-page-item-description">
                  vijayvermakvp@gmail.com
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
        </div>
      </section>
    </>
  );
}

export default Customers;
