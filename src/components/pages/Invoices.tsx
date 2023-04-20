import { AppDispatch } from "../../store/configureStore";
import { getCurrency } from "../../store/user-info/firm";
import { getInvoices, loadInvoices } from "../../store/entities/invoices";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Invoices(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector(getInvoices);
  const currency = useSelector(getCurrency);

  useEffect(() => {
    dispatch(loadInvoices());
  }, [dispatch]);

  return (
    <section className="page products-page">
      <header className="page-header">
        <h4>Invoices</h4>
        <div className="page-header-icons">
          <Link to="/invoices/create" className="btn-icon">
            <IoMdAddCircleOutline size={20} color="black" />
          </Link>
        </div>
      </header>
      <div className="page-content page-grid">
        <div>
          {invoices.map((invoice) => (
            <Link
              to={`/invoices/${invoice.id}`}
              key={invoice.id}
              className="list-page-item"
            >
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
                  {currency?.symbol}
                  {invoice.total_cost && invoice.total_tax
                    ? invoice.total_cost + invoice.total_tax
                    : "Not available"}
                </h4>
                <p className="text-lighter list-page-item-description text-right">
                  Recieved
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Invoices;
