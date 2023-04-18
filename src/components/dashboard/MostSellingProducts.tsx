import { AppDispatch } from "../../store/configureStore";
import { getProducts, loadProducts } from "../../store/entities/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MostSellingProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(getProducts);
  const [mostSellingProducts, setMostSellingProducts] = useState<
    { [key: string]: any }[]
  >([]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const mostSellingProducts: { [key: string]: any }[] = [];
      for (let product of products) {
        if (mostSellingProducts.length >= 5) break;
        mostSellingProducts.push({
          id: product.id,
          name: product.name,
          sale: product.invoice_items?.reduce(
            (a, b) => (a += b.price * b.quantity),
            0
          ),
        });
      }

      setMostSellingProducts(mostSellingProducts);
    }
  }, [products]);

  return (
    <div className="dashboard-box dashboard-side">
      <h4 className="text-lighter dashboard-side-heading">
        Most Selling Products
      </h4>

      {mostSellingProducts.map((product) => (
        <h4 key={product.id} className="dashboard-side-analytics">
          {product.name}
        </h4>
      ))}
    </div>
  );
}

export default MostSellingProducts;
