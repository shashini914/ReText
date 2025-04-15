import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div className="footer-brand">
          <h3>ReText</h3>
          <p>Empowering student-to-student textbook exchange.</p>
        </div>

        <div>
          <h4>Pages</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>retext@support.edu</p>
          <p>123 College Ave</p>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} ReText — All rights reserved</small>
      </div>
    </footer>
  );
}

export default Footer;
