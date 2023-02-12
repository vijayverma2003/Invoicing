import { AddSVG, FilterSVG, SearchSVG } from "../common/SVG";

function Products() {
  return (
    <section className="page products-page">
      <header className="page-header">
        <h4>Products</h4>
        <div className="page-header-icons">
          <button className="btn-icon">
            <SearchSVG />
          </button>
          <button className="btn-icon">
            <AddSVG />
          </button>
          <button className="btn-icon">
            <FilterSVG />
          </button>
        </div>
      </header>
      <div className="page-content">
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
    </section>
  );
}

export default Products;
