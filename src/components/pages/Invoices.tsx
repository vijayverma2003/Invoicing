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
      <div className="page-content">
        <div>
          <table className="page-table">
            <thead>
              <tr>
                <th className="td-left">INV</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Total</th>
                <th>Pending Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-left">001</td>
                <td>Vijay</td>
                <td className="text-lighter">20/02/2023</td>
                <td className="text-lighter">28/02/2023</td>
                <td>₹30,000</td>
                <td>₹10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Invoices;
