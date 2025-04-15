import HeroBanner from '../components/HeroBanner';
import BookGrid from '../components/BookGrid';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

function Home() {
  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      user = {
        id: payload.sub,
        email: payload.email,
        college: payload.college,
        first_name: payload.first_name
      };
    } catch (e) {
      console.error("Invalid token");
    }
  }

  return (
    <div>
      <HeroBanner user={user} />
      <BookGrid />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Home;
