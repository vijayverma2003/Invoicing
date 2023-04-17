import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store/configureStore";
import { getInvoices, loadInvoices } from "../../store/entities/invoices";
import { useEffect } from "react";

function Invoices(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector(getInvoices);

  useEffect(() => {
    dispatch(loadInvoices());
  }, [dispatch]);

  return (
    <section className="page products-page">
      <header className="page-header">
        <h4>Invoices</h4>
        <div className="page-header-icons">
          <Link to="/invoices/new" className="btn-icon">
            <IoMdAddCircleOutline size={20} color="black" />
          </Link>
        </div>
      </header>
      <div className="page-content page-grid">
        <div>
          {invoices.map((invoice) => (
            <div key={invoice.id} className="list-page-item">
              <div>
                <h4 className="list-page-item-heading">
                  {typeof invoice.customer !== "string"
                    ? invoice.customer.name
                    : ""}
                </h4>
                <p className="text-lighter list-page-item-description">
                  #INV-{invoice.number}
                </p>
              </div>
              <div>
                <h4 className="list-page-item-heading text-right">
                  ₹
                  {invoice.total_cost && invoice.total_tax
                    ? invoice.total_cost + invoice.total_tax
                    : "Not available"}
                </h4>
                <p className="text-lighter list-page-item-description text-right">
                  Recieved
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Invoices;
