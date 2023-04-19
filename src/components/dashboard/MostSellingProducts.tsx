import { AppDispatch } from "../../store/configureStore";
import { getProducts, loadProducts } from "../../store/entities/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RiH5 } from "react-icons/ri";
import { Link } from "react-router-dom";

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
        const sale = product.invoice_items?.reduce(
          (a, b) => (a += b.price * b.quantity),
          0
        );
        if (sale)
          mostSellingProducts.push({
            id: product.id,
            name: product.name,
            sale,
          });
      }

      setMostSellingProducts(mostSellingProducts);
    }
  }, [products]);

  return (
    <>
      <div className="dashboard-box dashboard-side">
        <h4 className="text-lighter dashboard-side-heading">
          Most Selling Products
        </h4>

        {mostSellingProducts.length > 0 ? (
          <>
            {mostSellingProducts.map((product) => (
              <h4 key={product.id} className="dashboard-side-analytics">
                {product.name}
              </h4>
            ))}
          </>
        ) : (
          <h5>
            You must have at-least one invoice to view most selling products
          </h5>
        )}
      </div>
    </>
  );
}

export default MostSellingProducts;
