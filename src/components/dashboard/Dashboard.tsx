import { AppDispatch } from "../../store/configureStore";
import { FaRegUserCircle } from "react-icons/fa";
import { getCurrency } from "../../store/user-info/firm";
import { getInvoices, loadInvoices } from "../../store/entities/invoices";
import { graphDataForInvoice } from "../../services/graph";
import { Link } from "react-router-dom";
import { MdFilterAlt } from "react-icons/md";
import { RiSettingsLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import Graph from "./Graph";
import moment from "moment";
import MostSellingProducts from "./MostSellingProducts";
import TopCustomers from "./TopCustomers";
import {
  createdThisFinancialYear,
  createdThisMonth,
  createdToday,
} from "../../services/time";
import { getRecievables, getTotalPayment } from "../../services/utils";
import { Invoice } from "../../models/invoice";

function Dashboard() {
  const currency = useSelector(getCurrency);
  const [graphInvoicesData, setGraphInvoicesData] = useState<any>([]);
  const [invoicesMadeToday, setInvoiceMadeToday] = useState(0);
  const [salesThisMonth, setSalesThisMonth] = useState(0);
  const [salesThisYear, setSalesThisYear] = useState(0);
  const [salesToday, setSalesToday] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [recievables, setRecievables] = useState(0);
  const [overdueInvoices, setOverdueInvoices] = useState<Invoice[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector(getInvoices);

  useEffect(() => {
    dispatch(loadInvoices());
  }, [dispatch]);

  useEffect(() => {
    if (invoices.length > 0) {
      let invoicesMadeToday = 0;
      let salesThisMonth = 0;
      let salesThisYear = 0;
      let salesToday = 0;
      let totalSales = 0;
      let recievables = 0;
      let overdues: Invoice[] = [];

      const graphData = graphDataForInvoice();

      for (let invoice of invoices) {
        if (invoice.total_cost && invoice.total_tax) {
          const total = invoice.total_cost + invoice.total_tax;
          const label = moment(invoice.date).format("MMM YYYY");

          const index = graphData.data.findIndex((d) => d.x === label);
          graphData.data[index].y += total;

          if (createdThisFinancialYear(invoice.date)) salesThisYear += total;
          if (createdThisMonth(invoice.date)) salesThisMonth += total;
          if (createdToday(invoice.date)) {
            salesToday += total;
            invoicesMadeToday++;
          }
          totalSales += total;

          const totalPayment = getTotalPayment(invoice.payments);

          if (totalPayment < invoice.total_cost + invoice.total_tax) {
            recievables += getRecievables(invoice, totalPayment);
            if (moment(invoice.due_date).isSameOrAfter(moment()))
              overdues.push(invoice);
          }
        }
      }

      setGraphInvoicesData([graphData]);
      setInvoiceMadeToday(invoicesMadeToday);
      setSalesThisMonth(salesThisMonth);
      setSalesThisYear(salesThisYear);
      setSalesToday(salesToday);
      setTotalSales(totalSales);
      setRecievables(recievables);
      setOverdueInvoices(overdues);
    }
  }, [invoices]);

  const handleScreenMode = () => {
    document.querySelector("body")?.classList.toggle("light");
  };

  return (
    <section className="page">
      <header className="page-header">
        <h4>Dashboard</h4>
        <div className="page-header-icons">
          <button onClick={handleScreenMode} className="btn-icon">
            <VscColorMode color="black" size={20} />
          </button>
          <button className="btn-icon">
            <RiSettingsLine color="black" size={20} />
          </button>
          <button className="btn-icon">
            <FaRegUserCircle color="black" size={19.5} />
          </button>
        </div>
      </header>

      <div className="dashboard">
        <div>
          <div className="dashboard-data">
            <div className="dashboard-box">
              <p className="text-lighter dashboard-data-heading">Sales</p>
              <h3 className="dashboard-data-description">
                {currency?.symbol}
                {salesThisYear}
              </h3>
            </div>
            <div className="dashboard-box">
              <p className="text-lighter dashboard-data-heading">Recievables</p>
              <h3 className="dashboard-data-description">
                {currency?.symbol}
                {recievables}
              </h3>
            </div>
            <div className="dashboard-box">
              <p className="text-lighter dashboard-data-heading">Stock Value</p>
              <h3 className="dashboard-data-description">Coming soon...</h3>
            </div>
          </div>

          <div className="dashboard-header">
            <h3 className="dashboard-heading">Sales Analytics</h3>
            {/* <button className="btn-icon">
              <MdFilterAlt size={20} color="black" />
            </button> */}
          </div>
          <div className="dashboard-box dashboard-sales-chart">
            <div className="graph">
              <Graph data={graphInvoicesData} />
            </div>
            <div className="dashboard-box-description">
              <h5>
                This Month - {currency?.symbol}
                {salesThisMonth}
              </h5>
              <h5>
                Total Sales - {currency?.symbol}
                {totalSales} (since you joined)
              </h5>
            </div>
          </div>

          <div className="dashboard-header">
            <h3 className="dashboard-heading">Overdues</h3>
          </div>
          <div className="dashboard-box dashboard-overdues">
            <table className="dashborad-overdues-table">
              <thead>
                <tr>
                  <th className="td-left">INV</th>
                  <th className="td-left">Customer</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
                {overdueInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="td-left">
                      <Link
                        className="link-primary"
                        to={`/invoices/${invoice.id}`}
                      >
                        #{invoice.number}
                      </Link>
                    </td>
                    <td className="td-left">
                      {typeof invoice.customer !== "string"
                        ? invoice.customer.name
                        : ""}
                    </td>
                    <td className="td-center">{invoice.date}</td>
                    <td className="td-center">{invoice.due_date}</td>
                    <td className="td-center">
                      {currency?.symbol}
                      {invoice.payments &&
                        invoice.total_cost &&
                        invoice.total_tax &&
                        invoice.total_cost +
                          invoice.total_tax -
                          getTotalPayment(invoice.payments)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="dashboard-box dashboard-side">
            <h4 className="text-lighter dashboard-side-heading">
              Daily Analytics
            </h4>
            <div className="dashboard-side-analytics">
              <h4>Sales</h4>
              <h4>
                {currency?.symbol}
                {salesToday}
              </h4>
            </div>
            <div className="dashboard-side-analytics">
              <h4>Invoices</h4>
              <h4>{invoicesMadeToday}</h4>
            </div>
          </div>

          <MostSellingProducts />

          <TopCustomers />

          <div className="dashboard-box dashboard-side">
            <h4 className="text-lighter dashboard-side-heading">Updates</h4>
            <div className="dashboard-side-analytics">
              <h5>Coming soon...</h5>
              {/* <h5>
                Do you have any recommendations? We would love to hear that,
                Share your recommendations{" "}
                <Link className="link-primary" to="#">
                  here
                </Link>
                .
              </h5> */}
            </div>
          </div>

          <div className="dashboard-box dashboard-side">
            <h4 className="text-lighter dashboard-side-heading">Guide</h4>
            <div className="dashboard-side-analytics">
              <h5>
                Coming soon...
                {/* Got stuck or don’t know how to use this app. Click{" "}
                <Link className="link-primary" to="#">
                  here
                </Link>{" "}
                to check how to create your first invoice. */}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
