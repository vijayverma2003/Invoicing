import { AddSVG } from "../common/SVG";
import ProductForm from "../forms/ProductForm";

function Products() {
  const handleOpenProductFormDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
  };

  return (
    <>
      <ProductForm />
      <section id="main-page" className="page products-page">
        <header className="page-header">
          <h4>Products</h4>
          <div className="page-header-icons">
            <button onClick={handleOpenProductFormDialog} className="btn-icon">
              <AddSVG />
            </button>
          </div>
        </header>
        <div className="page-content page-grid">
          <div>
            <div className="list-page-item">
              <div>
                <h4 className="list-page-item-heading">Black T Shirt</h4>
                <p className="text-lighter list-page-item-description">
                  Sales - $20,000
                </p>
              </div>
              <div>
                <h4 className="list-page-item-heading text-right">$40/pcs</h4>
                <p className="text-lighter list-page-item-description text-right">
                  Stock - 48
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
