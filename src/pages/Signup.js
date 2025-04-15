import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        college: '',
        password: ''
      });      
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Account created!');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            console.error("Caught error:", err);
            setError('Something went wrong.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input type="text" name="first_name" onChange={handleChange} required />

                    <label>Last Name:</label>
                    <input type="text" name="last_name" onChange={handleChange} required />

                    <label>College Email:</label>
                    <input type="email" name="email" onChange={handleChange} required />

                    <label>University/College Name:</label>
                    <input type="text" name="college" onChange={handleChange} required />

                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required />

                    <button type="submit">Create Account</button>
                </form>
                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}
                <p className="login-link">Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
}

export default Signup;
