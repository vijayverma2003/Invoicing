import { AddSVG } from "../common/SVG";

function Customers(): JSX.Element {
  return (
    <section id="main-page" className="page products-page">
      <header className="page-header">
        <h4>Customers</h4>
        <div className="page-header-icons">
          <button className="btn-icon">
            <AddSVG />
          </button>
        </div>
      </header>
      <div className="page-content page-grid">
        <div>
          <table className="page-table">
            <thead>
              <tr>
                <th className="td-left">Name</th>
                <th className="td-left">Email</th>
                <th>Sales</th>
                <th>City</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-left">Black T Shirt</td>
                <td className="td-left">vijayvermakvp@gmail.com</td>
                <td>₹8,930</td>
                <td>Ratia</td>
                <td>HR, 🇮🇳</td>
              </tr>
            </tbody>
          </table>
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

export default Customers;
