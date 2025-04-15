import './HeroBanner.css';

function HeroBanner({ user }) {
    return (
        <div className="hero-wrapper">
            <div
                className="hero-banner"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            >
                <div className="hero-content">
                    {user && (
                        <div className="welcome-banner">
                            Welcome, {user.first_name} 👋
                        </div>
                    )}
                    <h1>Helping You Exchange <span>Knowledge</span></h1>
                    <p>Buy and sell textbooks easily within your college community.</p>
                </div>
            </div>

            {/* Decorative SVG Wave */}
            <svg className="hero-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                    fill="#ffffff"
                    d="M0,224L60,202.7C120,181,240,139,360,138.7C480,139,600,181,720,181.3C840,181,960,139,1080,117.3C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </svg>

        </div>
    );
}

export default HeroBanner;
