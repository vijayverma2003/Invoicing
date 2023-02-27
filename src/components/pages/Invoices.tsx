import { AddSVG } from "../common/SVG";

function Invoices(): JSX.Element {
  return (
    <section id="main-page" className="page products-page">
      <header className="page-header">
        <h4>Invoices</h4>
        <div className="page-header-icons">
          <button className="btn-icon">
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
                #INV-123
              </p>
            </div>
            <div>
              <h4 className="list-page-item-heading text-right">$40,000</h4>
              <p className="text-lighter list-page-item-description text-right">
                Recieved
              </p>
            </div>
          </div>
        </div>
        <div className="page-side">
          <h4 className="text-lighter">Search</h4>
          <div className="input-container">
            <input type="search" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Invoices;
