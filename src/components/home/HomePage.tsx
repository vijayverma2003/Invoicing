import Button from "../common/Button";

function HomePage(): JSX.Element {
  return (
    <main className="home-page">
      <header className="home-header">
        <h2>V Business</h2>
        <div>
          <a className="home-header-button" href="#">
            Login
          </a>
          <Button href="#" className="home-header-button">
            Join Now
          </Button>
        </div>
      </header>
      <section className="hero">
        <h1 className="hero-heading text-gradient">V Business</h1>
        <p className="hero-description">Invoicing Software</p>
      </section>
    </main>
  );
}

export default HomePage;
