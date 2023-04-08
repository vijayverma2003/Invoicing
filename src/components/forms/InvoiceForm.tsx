function InvoiceForm() {
  const handleAddMoreProduct = () => {};

  return (
    <section className="page">
      <div className="page-header">
        <h4 className="page-heading">New Invoice</h4>
      </div>
      <div className="page-content">
        <div className="grid grid-1x4 mb2"></div>
        <div>
          <h5>
            <i>59, New Town, Ratia, 🇮🇳</i>
          </h5>
        </div>
        <h3 className="form-heading">Products</h3>
      </div>
      <button onClick={handleAddMoreProduct}>Add more</button>
    </section>
  );
}

export default InvoiceForm;
