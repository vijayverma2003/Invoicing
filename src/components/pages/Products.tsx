import { AddSVG } from "../common/SVG";

function Products() {
  return (
    <section id="main-page" className="page products-page">
      <header className="page-header">
        <h4>Products</h4>
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
                <th>Cost</th>
                <th>Tax</th>
                <th>HSN</th>
                <th>Sales</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-left">Black T Shirt</td>
                <td>₹999/pcs</td>
                <td>12%</td>
                <td>5903</td>
                <td>₹9,990</td>
                <td>15</td>
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

export default Products;
