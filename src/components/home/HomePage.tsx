import { Link } from "react-router-dom";
import Button from "../common/Button";
import cardSVG from "../../svg/card.svg";
import invoiceSVG from "../../svg/invoice.svg";
import productSVG from "../../svg/product.svg";

function HomePage(): JSX.Element {
  return (
    <main className="home-page">
      <header className="home-header">
        <h3>V Business</h3>
        <div>
          <Link to="/login" className="home-header-button">
            Login
          </Link>
          <Button href="/register" className="home-header-button">
            Join Now
          </Button>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-heading text-gradient">V Business</h1>
        <p className="hero-description">Invoicing Software</p>
      </section>

      <section className="home-invoice-showcase">
        <h2>
          Create <span className="text-gradient">Invoices</span> in seconds
        </h2>

        <img
          id="home-invoice-1"
          className="home-invoice-image"
          src={require("../../images/inv1.png")}
          alt=""
        />
        <img
          id="home-invoice-2"
          className="home-invoice-image"
          src={require("../../images/inv1.png")}
          alt=""
        />
      </section>

      <section className="home-dashboard">
        <h1 className="home-dashboard-heading text-gradient">
          User Friendly Dashboard
        </h1>
        <img src={require("../../images/dashboard.png")} alt="" />
        <p className="home-dashboard-description">
          Easily manage your <span className="text-gradient">invoices</span>{" "}
          with our user-friendly dashboard. Stay organized and in control with
          real-time updates, all in one place.
        </p>
      </section>

      <section className="home-features">
        <h2 className="text-gradient">
          Empower your invoicing with comprehensive Features
        </h2>

        <div className="home-features-grid">
          <div className="home-feature-card">
            <img src={invoiceSVG} alt="" />
            <h4 className="home-feature-card-heading text-lighter text-secondary">
              Invoices
            </h4>
            <p className="home-feature-card-description">
              Create beautiful invoices in seconds with different templates for
              making it more attractive.
            </p>
          </div>
          <div className="home-feature-card">
            <img src={productSVG} alt="" />
            <h4 className="home-feature-card-heading text-lighter text-secondary">
              Inventory
            </h4>
            <p className="home-feature-card-description">
              Manage your inventory and sales. With graphical interface it’s
              easy to manage your sales and inventory.
            </p>
          </div>
          <div className="home-feature-card">
            <img src={cardSVG} alt="" />
            <h4 className="home-feature-card-heading text-lighter text-secondary">
              Dues & Reminders
            </h4>
            <p className="home-feature-card-description">
              Manage dues and for overdue, and send friendly reminders to your
              customers for payments with SMS
            </p>
          </div>
        </div>
      </section>

      <section className="home-more-features">
        <h2 className="text-lighter">More Features</h2>
        <ol className="home-more-features-list">
          <li>Add firm details and bank information for invoices.</li>
          <li>User can also add customers and transports.</li>
          <li>
            This apps also supports{" "}
            <span className="text-indian">GST Invoices</span> for Indians.
          </li>
        </ol>
      </section>

      <footer className="home-footer">
        <div>
          <a className="home-footer-link link-primary" href="#">
            Terms & Conditions
          </a>
          <a className="home-footer-link link-primary" href="#">
            Privacy Policy
          </a>
        </div>
        <div>
          <a className="home-footer-link text-right text-lighter" href="#">
            vbusinessapp@gmail.com
          </a>
          <a className="home-footer-link text-right text-lighter" href="#">
            &copy; Copyright by V Business
          </a>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
