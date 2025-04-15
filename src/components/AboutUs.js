import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-us-content">
        <h2>About ReText</h2>
        <p>
          ReText is a platform that helps students buy and sell textbooks within their college community. 
          We aim to reduce costs and promote sustainable book use by making textbook exchange effortless and local.
        </p>
        <button className="learn-more-btn">Learn More</button>
      </div>
      <div className="about-us-images">
        <img src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 1" />
        <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 2" />
        <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 3" />
        <img src="https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 4" />
      </div>
    </section>
  );
}

export default AboutUs;
