import { AppDispatch } from "../../store/configureStore";
import { getCustomers, loadCustomers } from "../../store/entities/customers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function TopCustomers() {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(getCustomers);
  const [topCustomers, setTopCustomers] = useState<{ [key: string]: any }[]>(
    []
  );

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers.length > 0) {
      const topCustomers: { [key: string]: any }[] = [];
      for (let customer of customers) {
        if (topCustomers.length >= 5) break;
        const sale = customer.invoices?.reduce(
          (a, b) => (a += b.total_cost + b.total_tax),
          0
        );

        if (sale)
          topCustomers.push({
            id: customer.id,
            name: customer.name,
            sale,
          });
      }

      setTopCustomers(topCustomers);
    }
  }, [customers]);

  return (
    <div className="dashboard-box dashboard-side">
      <h4 className="text-lighter dashboard-side-heading">Top Customers</h4>

      {topCustomers.length > 0 ? (
        <>
          {topCustomers.map((customer) => (
            <h4 key={customer.id} className="dashboard-side-analytics">
              {customer.name}
            </h4>
          ))}
        </>
      ) : (
        <h5>You must have at-least one invoice to view top customers</h5>
      )}
    </div>
  );
}

export default TopCustomers;
